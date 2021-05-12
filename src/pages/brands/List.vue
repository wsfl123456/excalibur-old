<template>
  <div>
    <div class="addBtn" v-if="canAdd">
      <router-link to="/brands/add" ><Icon type="plus-circled" size="20" @click.native="showPicClick"></Icon> 新建品牌</router-link>
    </div>
    <div v-if="showPic">
        <img src="../../assets/images/email_one.png" alt="">
        <img src="../../assets/images/email_one_border.png" alt="">
        <img src="../../assets/images/email_two.png" alt="">
        <img src="../../assets/images/email_three.png" alt="">
        <img src="../../assets/images/email_four.png" alt="">
        <img src="../../assets/images/email_five.png" alt="">
        <img src="../../assets/images/email.png" alt="">
      </div>
    <div class="list-box" :class="{openDetail: taskDetailStatus}">
      <div class="list-box-list">
        <brand-filter @on-change="changeFilter"></brand-filter>
        <div class="list-box">
          <brands-list :data="data"></brands-list>
          <loading v-if="isLoading"></loading>
        </div>
        <!--<project-filter></project-filter>-->
        <!--<projects-list :data="data"></projects-list>-->
      </div>
    </div>
    <toast :is-toast="isToast" msg="没有更多"></toast>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  import BrandFilter from '../../components/BrandFilter'
  import BrandsList from '../../components/BrandsList'
  import {Brand} from '../../API/api'

  export default {
    components: {
      BrandsList,
      BrandFilter,
      Toast,
      Loading,
      BCrumb},
    name: 'list',
    data () {
      return {
        showPic: false,
        crumb: [
          {
            label: '品牌管理'
          }
        ],
        isLoading: false,
        isToast: false,
        canLoadMore: true,
        dom: null,
        chDom: null,
        page: 1,
        perPage: 25,
        orderBy: 'createTime',
        asc: 'desc',
        canAdd: false
      }
    },
    computed: {
      taskDetailStatus () {
        return this.$store.state.brands.detailStatus
      },
      data () {
        return this.$store.state.brands.list
      },
      brandListParams () {
        return this.$store.state.brands.filter
      }
    },
    methods: {
      showPicClick() {
        this.showPic = true
      },
      changeFilter (v) {
        this.isLoading = v
      },
      getAddRole () {
        this.$http.post(Brand.role, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
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
        let data = JSON.parse(JSON.stringify(this.brandListParams))
        let _data = obj ? this._.merge(data, obj) : data

        this.$store.dispatch('setBrandsList', {data: _data, cb: _cb})
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
              if (!data.data || data.data.length === 0) {
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
      this.canLoadMore = true

      sessionStorage.setItem('subMenu', 'brands/list/')
      this.$store.dispatch('setCurrSubMenu', 'brands/list/')
      this.$store.dispatch('setOpenedSub', ['brands'])
      sessionStorage.setItem('openedSub', '["brands"]')

      const initList = {
        page: 1,
        industry: 0,
        ncCompanyId: 0,
        state: 0,
        orderBy: 'createTime',
        asc: 'desc'
      }
      this.getList(initList)
      this.getAddRole()
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
