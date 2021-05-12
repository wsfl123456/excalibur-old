<template>
    <div>
      <!--<toolkit></toolkit>-->
      <b-crumb :list="crumb"></b-crumb>
      <div class="list-box" :class="{openDetail: taskDetailStatus}">
        <div class="list-box-list">
          <list-filter @on-change="changeFilter"></list-filter>
          <div class="list-box">
            <main-list :data="data"></main-list>
            <loading v-if="isLoading"></loading>
          </div>
        </div>
      </div>
      <toast :is-toast="isToast" msg="没有更多"></toast>
    </div>
</template>

<script>
  // import Toolkit from '../../components/Toolkit'
  import BCrumb from '../../components/BCrumb'
  import ListFilter from '../../components/ListFilter'
  import MainList from '../../components/MainList'
  import MainDetail from '../../components/popup/MainDetail'
  import TaskFormDetail from '../../components/TaskFormDetail'
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  export default {
    components: {
      Toast,
      Loading,
      MainDetail,
      MainList,
      ListFilter,
      BCrumb,
      // Toolkit,
      TaskFormDetail
    },
    name: 'list',
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
        return this.$route.params.id
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
      projectId: {
        immediate: true,
        handler () {
          let _data = {
            functionType: 0,
            state: 0,
            toolkitId: null,
            page: 1,
            page_size: 25,
            orderBy: 'createTime',
            asc: 'desc'
          }
          this.$store.dispatch('changeTaskDetailStatus', false)
          this.getListDatas(_data)
        }
      }
    },
    methods: {
      changeFilter (v) {
        this.isLoading = v
      },
      getListDatas (obj, cb) {
        this.isLoading = true
        let _cb = (data, code, allRes) => {
          this.isLoading = false
          // if (data.retCod)
          if (+code === 0) {
            this.currTask = allRes.projectInfo.projectName
            this.$store.dispatch('setBCrumb', {label: this.currTask, url: `/tasks/list/${allRes.projectInfo.projectId}`})
          }
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
        _data.projectId = parseInt(this.$route.params.id)
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
    /*transition: transform .2s ease;*/
    /*backface-visibility: hidden;*/
    /*&.openDetail {*/
      /*!*transform: rotateY(-180deg);*!*/
      /*.list-box-list {*/
        /*transform: rotateY(-180deg);*/
        /*position: absolute;*/
      /*}*/
      /*.list-box-detail {*/
        /*transform: rotateY(0deg);*/
        /*position: relative;*/
        /*!*display: block;*!*/
      /*}*/
    /*}*/
    .list-box-detail {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transform: rotateY(-180deg);
      background-color: #fff;
      transition: transform .2s ease;
      /*display: none;*/
      /*z-index: 1;*/
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
