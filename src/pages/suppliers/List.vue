<template>
  <div>
    <div class="addBtn">
      <router-link to="/suppliers/add" ><Icon type="plus-circled" size="20"></Icon> 新建供应商</router-link>
    </div>
    <div class="list-box" :class="{openDetail: taskDetailStatus}">
      <div class="list-box-list">
        <supplier-filter @on-change="changeFilter"></supplier-filter>
        <div class="list-box">
          <suppliers-list :data="data"></suppliers-list>
          <loading v-if="isLoading"></loading>

        </div>
      </div>
    </div>
    <toast :is-toast="isToast" msg="没有更多"></toast>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  import SupplierFilter from '../../components/SupplierFilter'
  import SuppliersList from '../../components/SuppliersList'
  import SubHeader from '../../components/SubHeader'
  export default {
    name: 'list',
    components: {
      SubHeader,
      BCrumb,
      Loading,
      Toast,
      SupplierFilter,
      SuppliersList
    },
    data () {
      return {
        crumb: [
          {
            label: '供应商管理',
            url: '/v2/resource/supplier'

          }
        ],
        isLoading: false,
        isToast: false,
        canLoadMore: true,
        dom: null,
        chDom: null,
        page: 1,
        page_size: 25,
        orderBy: 'createTime',
        asc: 'desc'
      }
    },
    computed: {
      taskDetailStatus () {
        return this.$store.state.supply.detailStatus
      },
      data () {
        return this.$store.state.supply.list
      },
      SupplierlistParams () {
        return this.$store.state.supply.filter
      }
    },
    methods: {
      changeFilter (v) {
        this.isLoading = v
      },
      getList (obj, cb) {
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
        let data = JSON.parse(JSON.stringify(this.SupplierlistParams))
        let _data = obj ? this._.merge(data, obj) : data

        this.$store.dispatch('setSuppliersList', {data: _data, cb: _cb})
      },
      scrollHandler () {
        if (this.canLoadMore && this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight && !this.isLoading && !this.taskDetailStatus) {
          // this.page = this.page + 1
          this.page++
          this.getList(
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
    created () {
      sessionStorage.setItem('subMenu', 'suppliers/list/')
      this.$store.dispatch('setCurrSubMenu', 'suppliers/list/')
      this.$store.dispatch('setOpenedSub', ['suppliers'])
      sessionStorage.setItem('openedSub', '["suppliers"]')

      this.canLoadMore = true
      const initList = {
        serviceType: 0,
        signCompanyId: 0,
        workState: 0,
        page: 1,
        perPage: 25,
        orderBy: 'createTime',
        asc: 'desc'
      }
      this.getList(initList)
    },
    beforeDestroy () {
      this.canLoadMore = false
      this.unbindLoadMore()
      // this.$store.dispatch('changeTaskDetailStatus', false)
    },
    mounted () {
      this.dom = document.getElementById('main-pages')
      this.chDom = document.getElementById('main-content')
      this.loadMore()
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
