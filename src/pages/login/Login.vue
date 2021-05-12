<template>
  <div class="out-bg">
    <!--<div class="cloud" :style="{background: cloud}"></div>-->
    <div class="bg-box">
      <div class="bg">
        <div class="bg-form">

          <div class="bg-logo">
            <img src="../../assets/images/logo_new.png" alt="">
          </div>

          <go-login v-if="isLogin" @changeLoginStatus="isLogin = false"></go-login>

          <go-registered v-else @changeLoginStatus="isLogin = true"></go-registered>
 

        </div>

        <div class="bg-thumb g-fl">
          <div class="txt">
            <nslider :pages="slide" :sliderinit="sliderinit"></nslider>
          </div>
        </div>
      </div>
    </div>
    <div class="next-brief">
      <div class="introduce">
        <p class="title" style="margin-bottom:20px">Excalib<span style="border-bottom: solid 2px #000;padding-bottom:20px">ur项</span>目简介</p>
        <div class="int-box" style="margin-top:50px">
          <div class="int-l">
            <img src="../../assets/images/int-r.png">
          </div>
          <div class="int-r">
            <p>Excalibur平台项目由商业智能时代的领军者-盖雅科技自主研发；</p>
            <p>Excalibur作为面向创作型企业与创意精英的一体化赋能平台，架构协同创作流程，优化办公成本，自动化搭建知识体系；</p>
            <p>Excalibur采用人工智能算法分析商业经营，打造智慧企业大脑帮助创作型企业完善从创作到沉淀不断积累公司的护城河的路径，从而帮助企业实现智能化经营。</p>
          </div>
        </div>
      </div>
    </div>
    <div class="next-fun">
      <div class="function">
        <p class="title" style="color:#fff">Excalib<span style="border-bottom: solid 2px #fff;padding-bottom:20px">ur功</span>能介绍</p>
        <div class="fun-box" style="margin-top:80px">
          <div class="out-fun" style="margin-right:20px">
            <div class="in-fun">
              <p class="title">标准化作业模块</p>
              <div>
                <div class="icon">
                <img src="../../assets/images/fun02.svg">
              </div>
              <div class="word">
                <p>强大的SOP工具包覆盖各个创作流程，涵盖策
                  划、创意、数据、媒介、拍摄等，内嵌模板将引导创
                  作者快速创建和实施工作，以行业的知识积累帮助员
                  工快速标准的完成内容创作;</p>
                <p>
                  整合项目任务管理、知识库、审批流程、人事财
                  务报表、数据报表、客户和供应商库等模块，提升
                  跨职能协作效率，实现项目与公司资源的有效管理。
                </p>
              </div>
              </div>
            </div>
          </div>
          <div class="out-fun">
            <div class="in-fun">
              <p class="title">办公流程管控模块</p>
              <div>
                <div class="icon">
                <img src="../../assets/images/fun01.svg">
              </div>
              <div class="word">
                <p>建立以项目和任务为中心的高效协作机制，链接各
                  个相关系统，实时协作和推进任务；通过Dashboard快
                  速全面地了解个人和各个成员的成效，掌握工作的推进
                  情况，形成从管理任务目标、了解执行反馈和获取工作
                  总结以及评定工作绩效的管理闭环，服务于业务，提升
                  企业经营效率。
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fun-box">
          <div class="out-fun" style="margin-right:20px">
            <div class="in-fun">
              <p class="title">行业与企业知识库</p>
              <div>
                <div class="icon">
                <img src="../../assets/images/fun04.svg">
              </div>
              <div class="word">
                <p>通过在线云盘吸收团队所有的知识内容，积累创
                  作产出，记录创作过程，自动形成大数据包，并通过
                  人工智能算法挖掘数据关系，经工具包自动形成经验
                  库和知识库，以实现知识沉淀和共享；同时，允许用
                  户传播分享生成的经验库和知识库，实现知识体系变
                  现和商业经营，共同打造行业知识库和企业智本中
                  心。
                </p>
              </div>
              </div>
            </div>
          </div>
          <div class="out-fun">
            <div class="in-fun">
              <p class="title">商业智能分析模块</p>
              <div>
                <div class="icon">
                <img src="../../assets/images/fun03.svg">
              </div>
              <div class="word">
                <p>大数据拥抱云计算，人工智能拥抱大数据。用知识
                  数据训练人工智能，分析企业本身商业情况，对经营业
                  绩、运营管理等作出智能分析，打造智慧企业大脑，实
                  现企业商业经营一体化智能赋能。
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <div class="next-brief">
      <div class="introduce">
        <p class="title" style="margin-bottom:20px">盖雅<span style="border-bottom: solid 2px #000;padding-bottom:20px">科技</span>简介</p>
        <div class="int-box" style="margin-top:50px">
          <div class="int-l">
            <img src="../../assets/images/but-l.png">
          </div>
          <div class="int-r">
            <p>盖雅科技成立于2003年，总部设立于上海，是面向创作型企业的商业智能时代的领军者。</p>
            <p>盖雅科技致力于为创作型企业，如广告公司、公关公司、IP创意型公司、影视公司、自媒体公司、MCN机构等提供智能商业办公系统，服务上百家文创企业。盖雅拥有自主知识产权的协同管理软件系列产品。在2017年之后，建立了业内领先的Excalibur四位一体PC+移动办公云平台。</p>
            <p> 盖雅科技致力于为文化创意行业的伙伴搭建一个共享的作业网络、一个共享的知识平台、一个共享的交流社区，并在将来提供共享的产业园区，用人工智能孵化更多的创作企业，为提升行业的管理水平和竞争力做出自己的贡献！</p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="top" @click="backTop" v-show="showTop">
        <img src="../../assets/images/return.svg" alt="">
      </div>
      <div class="out-fo">
        <div class="fo-box">
          <div class="fo-l">
            <p class="top-title">联系我们</p>
            <p><img src="../../assets/images/call.png">021-5280-9679</p>
            <p><img src="../../assets/images/email.png">business@normcore.com</p>
            <p><img src="../../assets/images/location.png">上海市长宁区天山路1900号9层</p>
            <p>
              <span>Copyright @2019 EXCALIBUR.WORK</span>
              <a class="ip_a" href="http://www.miitbeian.gov.cn" target="_blank">沪ICP备15006750号-4</a>
            </p>
          </div>
          <!--<div class="fo-m">-->
            <!--<p class="top-title">服务条款</p>-->
            <!--<p>法务条款</p>-->
            <!--<p>使用条款</p>-->
            <!--<p>版权声明</p>-->
          <!--</div>-->
          <!--<div class="fo-r">-->
            <!--<p class="top-title">关于我们</p>-->
            <!--<p>公司介绍</p>-->
            <!--<p>加入我们</p>-->
          <!--</div>-->
          <div class="code">
            <p>扫码添加客服微信</p>
            <img src="../../assets/images/code.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import {Login} from '../../API/api'
  import iconBg from '../../assets/images/bg_icon.png'
  // import bg from '../../assets/images/bg.png'
  import bg from '../../assets/images/login_bg.png'
  import button from '../../assets/images/bot-bg.png'
  import logoImg from '../../assets/images/logo@2x.png'
  import Toast from '../../components/popup/Toast'
  import pic from '../../assets/images/pic.svg'
  import cloud from '../../assets/images/path-24.svg'
  import nslider from 'vue-concise-slider'
  import Cookies from 'js-cookie'
  import GoLogin from "./goLogin.vue"
  import GoRegistered from "./goRegistered.vue"


  export default {
    name: 'login',
    components: {Toast, nslider, GoLogin, GoRegistered},
    data () {
      return {
        isLogin: true,
        slide: [
          {
            html: '<div style="width: 100%;"><h1 style="font-size: 32px; color: #fff;">Make Things Happen</h1></div>',
            style: {
              'text-align': 'center'
            }
          },
          {
            html: '<div style="width: 100%;"><h1 style="font-size: 32px; color: #fff;">Get Things Done</h1></div>',
            style: {
              'text-align': 'center'
            }
          },
          {
            html: '<div style="width: 100%;"><h1 style="font-size: 32px; color: #fff;">Keep People Updated</h1></div>',
            style: {
              'text-align': 'center'
            }
          }
        ],
        sliderinit: {
          currentPage: 0,
          thresholdDistance: 500,
          thresholdTime: 100,
          autoplay: 2000,
          loop: true,
          direction: 'vertical',
          infinite: 1,
          slidesToScroll: 1,
          timingFunction: 'ease',
          duration: 300
        },
        email: '',
        copyLoop: 0,
        remember: false,
        isLogin: true,
        veriCode: '',
        pwd: '',
        repeatPwd: '',
        isToast: false,
        toastMsg: null,
        toastState: null,
        waitTime: 60,
        canSend: true,
        scrollTop: 0,
        veriBtnTxt: '获取验证码',
        bg: `url("${bg}") no-repeat center scroll transparent`,
        button: `url("${button}") repeat-x bottom scroll transparent`,
        cloud: `url("${cloud}") repeat center scroll transparent`,
        pic: `url("${pic}") repeat center scroll transparent`,
        iconBgStyle: `url("${iconBg}") repeat center scroll transparent`,
        logoStyle: `url("${logoImg}") no-repeat 0 0 / contain scroll transparent`
      }
    },
    created () {
      // this.checkLogin()
      this.$Notice.destroy()
      Cookies.remove('token')
    },
    computed: {
      showTop: function () {
        let value = this.scrollTop > 200
        return value
      }
    },
    mounted () {
      this.$Notice.destroy()
      window.addEventListener('scroll', this.ScrollToTop)
    },
    methods: {
      loginKeyDown (e) {
        if (e.keyCode === 13) {
          this.login()
        }
      },
      checkLogin () {
        // if (this.$cookie.)
        if (this.$cookie.get('token')) {
          this.$router.replace('/v2/home')
        }
      },
      backTop () {
        let that = this
        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      },
      ScrollToTop () {
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      },
      getVeriCode () {
        if (this.canSend) {
          if (!this.email) {
            this.isToast = true
            this.toastMsg = '请输入邮箱'
            setTimeout(() => {
              this.isToast = false
              this.toastMsg = null
            }, 1500)
            return
          }
          this.canSend = false
          let reSendTime = setInterval(() => {
            this.veriBtnTxt = this.waitTime + '后可重发'
            this.waitTime--
            if (this.waitTime <= 0) {
              this.canSend = true
              this.waitTime = 60
              clearInterval(reSendTime)
              this.veriBtnTxt = '获取验证码'
            }
          }, 1000)
          this.$http.post(Login.veriCode, this.qs.stringify({email: this.email})).then(res => {
            let _data = res.data
            this.isToast = true
            if (_data.retCode === 0) {
              this.toastMsg = '发送成功'
              this.toastState = 'success'
            } else {
              this.toastMsg = _data.retMsg
              this.toastState = null
              this.veriBtnTxt = '获取验证码'
              this.waitTime = 60
              this.canSend = true
              clearInterval(reSendTime)
            }
            setTimeout(() => {
              this.isToast = false
              this.toastMsg = null
              this.toastState = null
            }, 1500)
          })
        }
      },
      resetPwd () {
        if (this.pwd !== this.repeatPwd) {
          this.isToast = true
          this.toastMsg = '两次密码不一致'
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
          }, 1500)
          return
        }
        this.$http.post(Login.forgetPwd, this.qs.stringify({
          password: this.pwd,
          verification: this.veriCode,
          repeatPwd: this.repeatPwd,
          email: this.email
        })).then(res => {
          let _data = res.data
          this.isToast = true
          if (_data.retCode === 0) {
            this.toastMsg = '设置成功，返回登陆'
            this.toastState = 'success'
          } else {
            this.toastMsg = _data.retMsg
            this.toastState = null
          }
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            this.toastState = null
            this.isLogin = true
            this.pwd = ''
          }, 1500)
        })
      },
      toForget () {
        this.isLogin = !this.isLogin
      },
      login () {
        let data = {
          email: this.email,
          password: this.pwd,
          remember: this.remember ? 1 : 0
        }
        this.$http.post(Login.login, this.qs.stringify(data)).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            if (this.remember) {
              this.$cookie.set('token', _data.retData.token, 9999)
            } else {
              this.$cookie.set('token', _data.retData.token)
            }
            let userInfo = {
              userName: _data.retData.userName,
              id: _data.retData.id,
              headPic: _data.retData.headPic,
              mobile: _data.retData.mobile,
              teamName : _data.retData.teamName
            }
            this.$cookie.set('userInfo', JSON.stringify(userInfo));
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            sessionStorage.setItem('subMenu', 'home')
            this.$store.dispatch('setOpenedSub', 'tasks')
            sessionStorage.setItem('openedSub', 'tasks')
            // this.$router.push('/projects/list')
            this.$router.push('/v2/home')
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
          }, 1500)
        })
      }
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollToTop)
    }
  }
</script>
<style lang="less">
.out-bg {
 .bg {
    background-image: url('../../assets/images/login-bg-top.png');
    background-repeat: no-repeat;
    background-size: 100%;
    height: 66vw;
    position: relative;
    .bg-form {
      width: 30%;
      position: absolute;
      top: 60px;
      left: 13%;

      .ivu-tabs {
        overflow: visible
      }
      .ivu-tabs-nav {
        width: 100%;
        display: flex;
          .ivu-tabs-ink-bar {
            display: none;
          }
          .ivu-tabs-tab {
            font-size: 1.4vw;
            display: block;
            width:50%;
            text-align: center;
            margin-right: 0;
          }
          .ivu-tabs-tab-focused {
            border-bottom: 3px solid #2d8cf0;
          }
      }
      .bg-logo {
        text-align: center;
        margin-bottom: 20px;
        img {
          height: 4vw;
          min-height: 40px;
        }
      }
      .ivu-input {
        border-radius: 24px;
        height: 40px;
        padding-left: 50px;
        font-size: 14px;
      }

      .item {
        position: relative;
        .input-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%)
        }
        .error-tips {
          position: absolute;
          color: #E02020;
          line-height: 2;
          padding-left: 20px;
        }
      }

      .flex {
        display: flex;
        align-items: center;
        .item {
          flex: 1;
        }
        .get-code {
            width: 154px;
            height: 40px;
            border-radius: 24px;
            margin-left: 10px;
            font-size: 15px;
          }
      }

      .log-btn {
        width:100%;
        height: 40px;
        border-radius: 24px;
        font-size: 20px;
      }

      .forget-password {
        // display: flex;
        // justify-content: space-between
        text-align: right
      }

      .go-registered {
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        img,span {
          vertical-align: middle;
          margin-left: 5px;
        }
      }
      .go-login {
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        img,span {
          vertical-align: middle;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>

<style scoped lang="less">
  .out-bg {
    height: 100vh;
  }

  .bg-icon {
    width: 78%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .bg-thumb {
    width: 100%;
    position: absolute;
    bottom: 11vw;
    text-align: center;

    .img {
      width: 599px;
      height: 398px;
    }

    .txt {
      text-align: right;
      height: 87px;
      margin-top: -20px;

      h1 {
        font-size: 32px !important;
        color: #fff;
      }

      p {
        font-size: 26px;
        color: #fff;
      }
    }
  }

  .out-box {
    width: 380px;
    height: 433px;
    border: 1px solid #303030;
    background: #ED869C;

    .ipt-box {
      width: 359px;
      height: 412px;
      border: 1px solid #303030;
      background-color: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(134, 142, 150, 0.6);
      /*padding: 0 48px;*/
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10.5px;

      ul {
        margin-bottom: 48px;
      }

      .ipt {
        height: 42px;
        width: 278px;
        border-radius: 4px;
        border: 1px solid #303030;
        font-size: 14px;
        padding: 0 16px;

        &:focus {
          border-color: #57a3f3;
          outline: 0;
          box-shadow: 0 0 0 2px rgba(45, 140, 240, .2);
        }
      }

      input::-webkit-input-placeholder {
        color: #CED4DA;
        font-size: 14px;
      }

      .ipt-group {
        padding: 0;
        overflow: hidden;
        display: flex;

        button {
          height: 100%;
          border: 0 none;
          background-color: #2d8ef8;
          color: #fff;
          padding: 0 10px;
          transition: background-color .5s;

          &:hover {
            background-color: lighten(#2d8ef8, 10%);
          }

          &:active {
            background-color: darken(#2d8ef8, 10%);
          }
        }

        input {
          flex: 1;
          border: 0 none;
          height: 100%;
          padding: 0 16px;
        }
      }
    }
  }

  .next-brief {
    background-color: #fff;

    .introduce {
      margin: 60px auto;
      width: 90%;

      .title {
        font-size: 30px;
        color: #000000;
        text-align: center;
      }

      .int-box {
        display: flex;
        justify-content: space-around;
        width: 80%;
        margin: 0 auto;

        .int-l {
         flex:1;
          
        }

        .int-r {
          font-size: 16px;
          color: #666666;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 17px;
          color: #666666;
          p {
            margin-bottom: 20px;
            text-indent: 2em;
            &>:last-child {
              margin-bottom: 0
            }
          }
        }
      }
    }
  }

  .next-fun {
    background-image: url('../../assets/images/login-bg-center.png');
    background-repeat: no-repeat;
    // background-size: 100%;
    height: 1100px;
    
    .function {
      height: 80%;
      width: 72%;
      margin: 0 auto;

      .title {
        font-size: 30px;
        color: #000000;
        text-align: center;
        padding-top: 200px;
        margin-bottom: 30px;
      }

      .fun-box {
        display: flex;
        justify-content: space-around;

        .out-fun {
          flex: 1;
          // height: 280px;
          min-width: 536px;
          height: 255px;
          border: solid 1px #303030;
          border-radius: 4px;
          padding: 15px;
          background-color: #fff;
          margin-bottom: 20px;

          .in-fun {
            // width: 560px;
            // height: 250px;
            border: 1px dashed #303030;
            height: 100%;
            // clear: both;

            &>div {
              display: flex;
              
            }

            .title {
              font-size: 20px;
              color: #303030;
              padding-top: 10px;
              margin-bottom: 0;
            }

            .icon {
              // width: 205px;
              padding: 0 0 0 10px;
              
              

              img {
                display: block;
              }
            }

            .word {
              font-size: 14px;
              color: #666666;
              line-height: 22px;
              // padding: 30px 0;
              padding-top: 10px;
              padding-right: 10px;
              margin-left: 10px;

              p {
                margin-bottom: 10px;
                text-indent: 2em;
              }
            }
          }
        }
      }
    }
  }

  .next-stu {
    background: no-repeat;

    .stu {
      .title {
        font-size: 30px;
        color: #000000;
        text-align: center;
      }

      .stu-but {
        height: 420px;
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
      }

      .stu-l {
        width: 400px;
        margin-top: -30px;
      }

      .stu-r {
        margin: 20px 0;
        font-size: 16px;
        color: #666666;
        width: 700px;

        p {
          margin: 20px 0;
        }
      }
    }
  }

  .footer {
     background-image: url('../../assets/images/login-bg-bottom.png');
    background-repeat: no-repeat;
    // background-size: 100%;
    height: 313px;
    padding-top: 40px;
    

    .top {
      width: 88px;
      position: fixed;
      right: 40px;
      bottom: 270px;
      cursor: pointer;
    }

    .out-fo {
      width: 80%;
      margin: 0 auto;

      .fo-box {
        padding-top: 50px;
        display: flex;
        justify-content: space-around;
        font-size: 14px;
        color: #CDCDCD;

        .top-title {
          font-size: 16px;
          color: #FFFFFF;
          margin-bottom: 23px;
        }

        p {
          margin-bottom: 12px;

          img {
            padding: 0 8px 0 0;
          }
        }

        .code {
          p {
            font-size: 14px;
            color: #FFFFFF;
            text-align: center;
          }

          img {
            margin-top: -4px;
            width: 160px;
            padding-bottom: 20px;
          }
        }
      }
    }
  }


  .logo {
    width: 189px;
    height: 38px;
    margin-bottom: 48px;
  }

  .login-btn {
    width: 275px;
    height: 40px;
    /*border-radius: 4px;*/
    border: solid 1px #303030;
    background-color: #2d8ef8;
    color: #fff;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    box-shadow: 3px -3px 0px #ED869C;

    &:hover {
      background-color: lighten(#2d8ef8, 10%);
    }
  }

  .login-fn {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .other-login {
    text-align: center;

    h6 {
      position: relative;
      font-size: 12px;
      color: #ced4da;
    }
  }
  .ip_a {
    margin-left: 20px;
    color: #CDCDCD;
  }
  .ip_a:hover {
    color: #F89A7A
  }

</style>
