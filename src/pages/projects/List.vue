<template>
  <div>
    <div class="addBtn" v-if="canAdd">
      <router-link to="/projects/add" ><Icon type="plus-circled" size="20"></Icon> 新建项目</router-link>
    </div>
    <div class="list-box" :class="{openDetail: taskDetailStatus}">
      <div class="list-box-list">
        <project-filter @on-change="changeFilter"></project-filter>
        <div class="list-box">
          <projects-list :data="data"></projects-list>
          <loading v-if="isLoading"></loading>
        </div>
      </div>
      <!--<div class="list-box-detail">-->
        <!--<projects-list :data="selectedData" :can-sort="false"></projects-list>-->
      <!--</div>-->
    </div>
    <toast :is-toast="isToast" msg="没有更多"></toast>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import ProjectFilter from '../../components/ProjectFilter'
  import ProjectsList from '../../components/ProjectsList'
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  import {Project, Brand} from '../../API/api'
  import {ajax} from '../../util/util'

  export default {
    name: 'list',
    components: {
      Toast,
      Loading,
      ProjectsList,
      ProjectFilter,
      BCrumb},
    computed: {
      // selectedData () {
      //   return [this.$store.state.taskDetail]
      // },
      // taskDetail () {
      //   return this.$store.state.taskDetail
      // },
      taskDetailStatus () {
        return this.$store.state.projects.detailStatus
      },
      data () {
        return this.$store.state.projects.projectsList
      },
      ProjectListParams () {
        return this.$store.state.projects.filter
      },
      selectedCustomer () {
        return this.$store.state.tasks.currCustomer
      }
    },
    data () {
      return {
        crumb: [
          {
            label: '项目管理'
          }
        ],
        isToast: false,
        isLoading: false,
        page: 1,
        page_size: 25,
        orderBy: 'createTime',
        asc: 'desc',
        canLoadMore: true,
        dom: null,
        chDom: null,
        canAdd: false
      }
    },
    methods: {
      init () {
        this.getBrands({type: 'project'})
      },
      getBrands ({type}) {
        this.$store.dispatch('toggleLoading', true)
        this.$store.dispatch('toggleSubMenuLoading', true)

        const brandParams = {
          industry: 0,
          ncCompanyId: 0,
          state: 0,
          page: 1,
          perPage: 1000,
          pageSize: 1000,
          orderBy: 'customerName',
          asc: 'asc'
        }
        ajax.post(Brand.listByProject, brandParams).then(res => {
          const customers = res.customerList.data
          this.$store.dispatch('setCustomers', customers)
          if (type === 'project') {
            if (!this.$route.params.customerId) {
              this.$store.dispatch('selectCustomer', null)
            }
            this.$store.dispatch('toggleSubMenuLoading', false)
          }
        })
        this.getUrlParams()
      },
      getUrlParams () {
        this.customerId = this.$route.params.customerId

        this.$store.dispatch('selectCustomer', +this.customerId)
        this.getListDatas()
      },
      changeFilter (v) {
        this.isLoading = v
      },
      getAddRole () {
        this.$http.post(Project.role, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.canAdd = _data.retData.add
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }, 1500)
        })
      },
      getListDatas (obj, cb) {
        this.isLoading = true
        let _cb = (data, code) => {
          this.isLoading = false
          // if (data.retCod)
          if (code === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
            return
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
        let data = JSON.parse(JSON.stringify(this.ProjectListParams))
        let _data = obj ? this._.merge(data, obj) : data
        _data.customerId = this.$route.params.customerId
        console.log('参数', _data)
        this.$store.dispatch('setProjectsList', {data: _data, cb: _cb})
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
    watch: {
      '$route': {
        handler (data) {
          console.log('route', data)
          this.$store.dispatch('selectCustomer', +data.params.customerId)
          this.getListDatas({page: 1})
        }
      }
    },
    mounted () {
      this.dom = document.getElementById('main-pages')
      this.chDom = document.getElementById('main-content')
      this.loadMore()
    },
    created () {
      this.canLoadMore = true
      this.getAddRole()
      this.init()
    },
    beforeDestroy () {
      this.canLoadMore = false
      this.unbindLoadMore()
      // this.$store.dispatch('changeTaskDetailStatus', false)
    }
  }
</script>

<style scoped lang="less">
  .addBtn {
    text-align: right;
    margin-bottom: 16px;
    a {
      background-color: #2d8ef8;
      display: inline-block;
      width: 120px;
      height: 40px;
      border-radius: 4px;
      text-align: center;
      line-height: 40px;
      text-decoration: none;
      color: #fff;
      font-size: 14px;
    }
  }
  .list-box {
    position: relative;
  }
</style>
