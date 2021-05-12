<template>
  <div class="oa-sys-notice">
    <div class="wrapper">
      <div class="notice-contain">
        <router-link :to="`/sysNotice/detail/${list[0].id}`" target="_blank">【{{typeConf[list[0].typeId]}}】{{list[0].title}} <span class="new-notice-tag" v-if="isNew"></span></router-link>

        <!--<ul class="notice-list">-->
          <!--<template v-for="item in list">-->
            <!--<li :key="item.id">-->
              <!--<router-link :to="`/sysNotice/detail/${item.id}`">{{item.title}}</router-link>-->
            <!--</li>-->
          <!--</template>-->
        <!--</ul>-->
      </div>
      <div class="notice-more">
        <!--<router-link to="/sysNotice/list" @click.stop="toNotice">更多通知 ></router-link>-->
        <a href="javascript:;" @click.stop="toNotice">更公告 ></a>
      </div>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>
</template>

<script>
  import {Index} from '../API/api'
  import Toast from './popup/Toast'

  export default {
    name: 'sys-notice',
    components: {Toast},
    data () {
      return {
        list: [],
        typeConf: {
          1: 'EXCALIBUR',
          2: '人事部通知',
          3: '行政部通知',
          4: 'SDC通知',
          5 : 'NCC通知',
          6: 'NHU通知'
        },
        isNew: false,
        isToast: false,
        toastMsg: ''
      }
    },
    methods: {
      init () {
        this.getNotice()
      },
      toNotice () {
        sessionStorage.setItem('primaryMenu', 'profile')
        sessionStorage.setItem('subMenu', 'sysNotice/list/')
        this.$store.dispatch('setPrimaryMenu', 'profile')
        this.$router.push('/sysNotice/list')
      },
      getNotice () {
        this.$http.post(Index.sysNoticeList, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          if (_data.retCode === 0) {
            this.list = _data.retData.data
            if (new Date().getTime() - new Date(this.list[0].createTime).getTime() > 518400000) {
              this.isNew = false
            } else {
              this.isNew = true
            }
          } else if (_data.retCode === 100023) {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
          }, 1500)
        })
      }
    },
    created () {
      this.init()
    }
  }
</script>

<style scoped lang="less">
  .oa-sys-notice {
    height: 48px;
    border: 1px solid #dddee1;
    border-radius: 5px;
    margin-bottom: 16px;
    .wrapper {
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      .notice-contain {
        max-width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: relative;
        a {
          color: #343a40;
          margin-right: 20px;
          text-decoration: underline;
          &:hover {
            color: #2d8ef8;
          }
        }
      }
      .notice-more {
        /*flex: 1;*/
      }
      .notice-list {
        display: flex;
        align-items: center;
        li {
          text-decoration: underline;
          margin-right: 20px;
          color: #343a40;
          list-style: disc inside;
          a {
            color: #343a40;
            &:hover {
              color: #2d8ef8;
            }
          }
        }
      }
    }
  }
</style>
