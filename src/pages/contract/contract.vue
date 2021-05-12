<template>
  <div>
    <div class="list-box" :class="{openDetail: taskDetailStatus}">
      <div class="list-box-list">
        <list-filter @on-change="changeFilter"></list-filter>
        <div class="list-box">
          <!--  仅当是财务工具包时显示财务表格  -->
          <contract-table :data="data"></contract-table>
        </div>
        <loading v-if="isLoading"></loading>
      </div>
    </div>
    <toast :is-toast="isToast" msg="没有更多"></toast>
  </div>
</template>

<script>
  import ListFilter from '../../components/ListFilter'
  import Loading from '../../components/popup/Loading';
  import Toast from '../../components/popup/Toast'
  import ContractTable from "./contractTable";

  import { mapMutations } from "vuex";

  export default {
    components: {
      ContractTable,
      Toast,
      Loading,
      ListFilter,
    },
    name: 'clientContract',
    computed: {
      crumb () {
        let arr = [
          {
            label: '项目管理'
          },
          {
            label: '我的任务'
          }
        ]
        let currPage = {label: this.$store.state.bcrumb.label || sessionStorage.getItem('task_bcrumb')}
        arr.push(currPage)
        return arr
      },
      selectedData () {
        return [this.$store.state.taskDetail]
      },
      taskDetail () {
        return this.$store.state.taskDetail
      },
      taskDetailStatus () {
        return this.$store.state.taskDetailStatus
      },
      data () {
        return this.$store.state.taskList
      },
      projectId () {
        return this.$store.state.tasks.currProject
      },
      listParams () {
        return this.$store.state.taskFilter
      }
    },
    data () {
      return {
        currTask: null,
        isToast: false,
        isLoading: false,
        page: 1,
        page_size: 25,
        orderBy: 'createTime',
        asc: 'desc',
        canLoadMore: true,
        dom: null,
        chDom: null
        // data: []
      }
    },
    watch: {
      $route() {
        this.getListDatas();
      }
    },
    methods: {
      ...mapMutations(['changeCurrentToolkitPackageId']),
      init () {
        this.setCurrPage()
      },
      setCurrPage () {
        this.$store.dispatch('setCurrPage', null)
      },
      changeFilter (v) {
        this.isLoading = v
      },
      getListDatas (obj, cb) {
        this.isLoading = true

        let _cb = (data, code, allRes) => {
          this.isLoading = false

          if (+code === 100014) {
            this.$cookie.delete('token')
            this.$router.push('/')
            return
          }
          if (+code === 100023) {
            this.isToast = true
            this.toastMsg = '没有操作权限'
          }
          if (!data) {
            this.isToast = true
            this.page--
            setTimeout(() => {
              this.isToast = false
            }, 2000)
          }
        }
        if (cb) {
          _cb = cb
        }
        let data = JSON.parse(JSON.stringify(this.listParams))
        let _data = obj ? this._.merge(data, obj) : data

        _data.toolkitId = 16;           // 仅查询客户合同数据
        /* 根据路由展示不同的合同数据 */
        let contractTypeId;

        switch (this.$route.name) {
          case 'clientContract':
            contractTypeId = 16;
            break;
          case 'supplierContract':
            contractTypeId = 15;
            break;
          case 'quotation':
            contractTypeId = 17;
        }

        _data.toolkitId = contractTypeId;
        this.$store.dispatch('setTaskList', {data: _data, cb: _cb})
      },
      scrollHandler () {
        if (this.canLoadMore && this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight && !this.isLoading && !this.taskDetailStatus) {
          // this.page = this.page + 1
          this.page++
          this.getListDatas(
            {page: this.page},
            (data, code) => {
              this.isLoading = false
              this.$store.dispatch('toggleLoading', false)

              if (code === 100014) {
                this.$cookie.delete('token')

                this.$router.push('/')
                return
              }
              if (!data || data.length === 0) {
                this.isToast = true
                this.page--
                setTimeout(() => {
                  this.isToast = false
                }, 2000)
              }
              if (code === 100023) {
                this.isToast = true
                this.toastMsg = '没有操作权限'
              }
            }
          )
        }
      },
      loadMore () {
        this.dom.addEventListener('scroll', this.scrollHandler)
      },
      unbindLoadMore () {
        this.dom.removeEventListener('scroll', this.scrollHandler)
      }
    },
    mounted () {
      this.dom = document.getElementById('main-pages')
      this.chDom = document.getElementById('main-content')
      this.loadMore()
    },
    created () {
      this.changeCurrentToolkitPackageId(7);          // 显示财务工具包筛选栏

      this.canLoadMore = true
      const initList = {
        state: 0,
        functionType: 0,
        page: 1,
        page_size: 25,
        orderBy: 'createTime',
        asc: 'desc'
      }
      this.getListDatas(initList)
      this.init()
    },
    beforeUpdate () {
    },
    updated () {
    },
    beforeDestroy () {
      // this.canLoadMore = false
      this.unbindLoadMore()
      this.$store.dispatch('changeTaskDetailStatus', false)
    }
  }
</script>

<style scoped lang="less">
  .list-box {
    position: relative;
    .list-box-detail {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transform: rotateY(-180deg);
      background-color: #fff;
      transition: transform .2s ease;
    }
    .list-box-list {
      background-color: #fff;
      backface-visibility: hidden;
      position: relative;
      z-index: 5;
      transition: transform .2s ease;

    }
  }
  .list-box {
    position: relative;
  }

</style>
