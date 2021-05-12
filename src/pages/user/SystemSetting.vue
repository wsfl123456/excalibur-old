<template>
  <div>
    <div class="profile-box">
      <Row>
        <i-col span="11">
          <h3>系统登录密码</h3>
          <i-form class="profile-form row-label" label-position="left" :label-width="80">
            <FormItem label="原密码">
              <div class="form-ipt">
                <i-input :type="pwdConf.oldPwdType" v-model="pwd.oldPassWord" placeholder="请输入原密码"></i-input>
                <Icon :type="pwdConf.oldIconType" class="pwdToggleIcon" size="22" @click.native="displayTxt('pwdConf', 'oldPwdType', 'oldIconType')"></Icon>
              </div>
            </FormItem>
            <FormItem label="新密码">
              <div class="form-ipt">
                <i-input :type="pwdConf.newPwdType" v-model="pwd.newPassWord" placeholder="请输入新密码"></i-input>
                <Icon :type="pwdConf.newIconType" class="pwdToggleIcon" size="22" @click.native="displayTxt('pwdConf', 'newPwdType', 'newIconType')"></Icon>
              </div>
            </FormItem>
            <FormItem label="重复新密码">
              <div class="form-ipt">
                <i-input :type="pwdConf.newPwdType" v-model="pwd.repeatNewPassWord" placeholder="重复新密码"></i-input>
                <Icon :type="pwdConf.newIconType" class="pwdToggleIcon" size="22" @click.native="displayTxt('pwdConf', 'newPwdType', 'newIconType')"></Icon>
              </div>
            </FormItem>
            <FormItem label="">
              <Button type="primary" size="large" @click="changePwd">更改密码</Button>
              <Button type="ghost" size="large" @click="resetModal('login')">忘记密码</Button>
            </FormItem>
          </i-form>
        </i-col>
        <!--<i-col span="11" offset="1" v-if="isAdmin">-->
          <!--<h3>管理者密码</h3>-->

          <!--<i-form class="profile-form row-label" label-position="left" :label-width="80">-->

            <!--<FormItem label="原密码">-->
              <!--<div class="form-ipt">-->
                <!--<i-input :type="adminPwdConf.oldPwdType" v-model="adminPwd.oldPassWord" placeholder="请输入原密码"></i-input>-->
                <!--<Icon :type="adminPwdConf.oldIconType" class="pwdToggleIcon" size="22" @click.native="displayTxt('adminPwdConf', 'oldPwdType', 'oldIconType')"></Icon>-->
              <!--</div>-->
            <!--</FormItem>-->
            <!--<FormItem label="新密码">-->
              <!--<div class="form-ipt">-->
                <!--<i-input :type="adminPwdConf.newPwdType" v-model="adminPwd.newPassWord" placeholder="请输入新密码"></i-input>-->
                <!--<Icon :type="adminPwdConf.newIconType" class="pwdToggleIcon" size="22" @click.native="displayTxt('adminPwdConf', 'newPwdType', 'newIconType')"></Icon>-->
              <!--</div>-->
            <!--</FormItem>-->
            <!--<FormItem label="重复新密码">-->
              <!--<div class="form-ipt">-->
                <!--<i-input :type="adminPwdConf.newPwdType" v-model="adminPwd.repeatNewPassWord" placeholder="重复新密码"></i-input>-->
                <!--<Icon :type="adminPwdConf.newIconType" class="pwdToggleIcon" size="22" @click.native="displayTxt('adminPwdConf', 'newPwdType', 'newIconType')"></Icon>-->
              <!--</div>-->
            <!--</FormItem>-->
            <!--<FormItem label="">-->
              <!--<Button type="primary" size="large" @click="changeAdminPwd">更改密码</Button>-->
              <!--<Button type="ghost" size="large" @click="resetModal('admin')">忘记密码</Button>-->
            <!--</FormItem>-->
          <!--</i-form>-->
        <!--</i-col>-->
      </Row>

      <Row>
        <i-col span="11">
          <h3>薪资查询密码</h3>

          <i-form class="profile-form row-label" label-position="left" :label-width="80">
            <FormItem label="原密码">
              <div class="form-ipt">
                <i-input :type="salaryPwdConf.oldPwdType" v-model="salaryPwd.oldPassWord" placeholder="请输入原密码"></i-input>
                <Icon :type="salaryPwdConf.oldIconType" class="pwdToggleIcon" size="22" @click.native="displayTxt('salaryPwdConf', 'oldPwdType', 'oldIconType')"></Icon>
              </div>
            </FormItem>
            <FormItem label="新密码">
              <div class="form-ipt">
                <i-input :type="salaryPwdConf.newPwdType" v-model="salaryPwd.newPassWord" placeholder="请输入新密码"></i-input>
                <Icon :type="salaryPwdConf.newIconType" class="pwdToggleIcon" size="22" @click.native="displayTxt('salaryPwdConf', 'newPwdType', 'newIconType')"></Icon>
              </div>
            </FormItem>
            <FormItem label="重复新密码">
              <div class="form-ipt">
                <i-input :type="salaryPwdConf.newPwdType" v-model="salaryPwd.repeatNewPassWord" placeholder="重复新密码"></i-input>
                <Icon :type="salaryPwdConf.newIconType" class="pwdToggleIcon" size="22" @click.native="displayTxt('salaryPwdConf', 'newPwdType', 'newIconType')"></Icon>
              </div>
            </FormItem>
            <FormItem label="">
              <Button type="primary" size="large" @click="changeSalaryPwd">更改密码</Button>
              <Button type="ghost" size="large" @click="resetModal('salary')">忘记密码</Button>
            </FormItem>
          </i-form>
        </i-col>


        <!--<i-col span="11" offset="1" v-if="+myId === 1 || +myId === 66 || +myId === 74 || +myId === 82">-->
          <!--<h3>人事查询密码</h3>-->

          <!--<i-form class="profile-form row-label" label-position="left" :label-width="80">-->

            <!--<FormItem label="菜单选择">-->
              <!--<div class="form-ipt">-->
                <!--<i-select v-model="hrPwd.opType">-->
                  <!--<i-option v-for="(item, key) in hrOpTypeConf" :key="key" :value="key">{{item}}</i-option>-->
                <!--</i-select>-->
              <!--</div>-->
            <!--</FormItem>-->
            <!--<FormItem label="原密码">-->
              <!--<div class="form-ipt">-->
                <!--<i-input :type="hrPwdConf.oldPwdType" v-model="hrPwd.oldPassWord" placeholder="请输入原密码"></i-input>-->
                <!--<Icon :type="hrPwdConf.oldIconType" class="pwdToggleIcon" size="22" @click.native="displayTxt('hrPwdConf', 'oldPwdType', 'oldIconType')"></Icon>-->
              <!--</div>-->
            <!--</FormItem>-->
            <!--<FormItem label="新密码">-->
              <!--<div class="form-ipt">-->
                <!--<i-input :type="hrPwdConf.newPwdType" v-model="hrPwd.newPassWord" placeholder="请输入新密码"></i-input>-->
                <!--<Icon :type="hrPwdConf.newIconType" class="pwdToggleIcon" size="22" @click.native="displayTxt('hrPwdConf', 'newPwdType', 'newIconType')"></Icon>-->
              <!--</div>-->
            <!--</FormItem>-->
            <!--<FormItem label="重复新密码">-->
              <!--<div class="form-ipt">-->
                <!--<i-input :type="hrPwdConf.newPwdType" v-model="hrPwd.repeatNewPassWord" placeholder="重复新密码"></i-input>-->
                <!--<Icon :type="hrPwdConf.newIconType" class="pwdToggleIcon" size="22" @click.native="displayTxt('hrPwdConf', 'newPwdType', 'newIconType')"></Icon>-->
              <!--</div>-->
            <!--</FormItem>-->
            <!--<FormItem label="">-->
              <!--<Button type="primary" size="large" @click="changehrPwd">更改密码</Button>-->
              <!--<Button type="ghost" size="large" @click="resetModal('hr')">忘记密码</Button>-->
            <!--</FormItem>-->
          <!--</i-form>-->
        <!--</i-col>-->
      </Row>
    </div>
    <Modal v-model="isModal" class-name="reset-modal" ok-text="完成" width="480px">
      <h3>设置新密码</h3>
      <ul>
        <li class="g-mb-16" v-if="reset.type === 'hr'">
          <i-select v-model="reset.opType" placeholder="选择菜单">
            <i-option v-for="(item, key) in hrOpTypeConf" :key="key" :value="key">{{item}}</i-option>
          </i-select>
        </li>
        <li class="g-mb-16">
          <input type="text" v-model="reset.email" class="ipt" placeholder="输入绑定的邮箱">
        </li>
        <li class="g-mb-16">
          <div class="ipt ipt-group">
            <input type="text" v-model="reset.verification" class="" placeholder="输入邮箱验证码">
            <button type="button" @click="getVeriCode">{{veriBtnTxt}}</button>
          </div>
        </li>
        <li class="g-mb-16">
          <input type="password" v-model="reset.password" class="ipt" placeholder="新密码">
        </li>
        <li class="g-mb-16">
          <input type="password" v-model="reset.repeatPwd" class="ipt" placeholder="重复新密码">
        </li>
      </ul>
      <div slot="footer" class="custom-footer">
        <Button type="primary" size="large" class="ok" @click="submitReset">完成</Button>
      </div>
    </Modal>
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import {User} from '../../API/api'
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  import SubHeader from '../../components/SubHeader'
  export default {
    name: '',
    components: {SubHeader, Toast, Loading, BCrumb},
    data () {
      return {
        crumb: [
          {label: '个人中心'},
          {label: '系统安全设置'}
        ],
        reset: {
          opType: null,
          type: '',
          email: '',
          password: '',
          repeatPwd: '',
          verification: ''
        },
        myId: '',
        canSend: true,
        waitTime: 60,
        veriBtnTxt: '获取验证码',
        isLoading: false,
        isToast: false,
        toastMsg: null,
        toastState: null,
        isAdmin: false,
        pwd: {
          oldPassWord: '',
          newPassWord: '',
          repeatNewPassWord: ''
        },
        isModal: false,
        pwdConf: {
          oldPwdType: 'password',
          newPwdType: 'password',
          oldIconType: 'eye',
          newIconType: 'eye'
        },
        adminPwd: {
          oldPassWord: '',
          newPassWord: '',
          repeatNewPassWord: ''

        },
        adminPwdConf: {
          oldPwdType: 'password',
          newPwdType: 'password',
          oldIconType: 'eye',
          newIconType: 'eye'
        },
        salaryPwd: {
          oldPassWord: '',
          newPassWord: '',
          repeatNewPassWord: ''
        },
        salaryPwdConf: {
          oldPwdType: 'password',
          newPwdType: 'password',
          oldIconType: 'eye',
          newIconType: 'eye'
        },
        hrPwd: {
          opType: null,
          oldPassWord: '',
          newPassWord: '',
          repeatNewPassWord: '',
          isInit: '0'
        },
        hrPwdConf: {
          oldPwdType: 'password',
          newPwdType: 'password',
          oldIconType: 'eye',
          newIconType: 'eye'
        },
        hrOpTypeConf: {
          1: '基本信息查看密码',
          2: '合同信息查看密码',
          3: '薪资管理信息查看密码',
          4: '奖金管理查看密码',
          5: '考勤查看密码',
          6: '假期信息查看密码'
        }
      }
    },
    methods: {
      submitReset () {
        if (
          !this.reset.email ||
          !this.reset.verification ||
          !this.reset.password ||
          !this.reset.repeatPwd
        ) {
          this.isToast = true
          this.toastMsg = '请填写所有内容'
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
          }, 1500)
          return
        }

        if (this.reset.password !== this.reset.repeatPwd) {
          this.isToast = true
          this.toastMsg = '两次密码不一致'
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
          }, 1500)
          return
        }

        this.isLoading = true

        let api
        switch (this.reset.type) {
          case 'login':
            api = User.saveForgetPwd
            break
          case 'admin':
            api = User.saveForgetAdmin
            break
          case 'salary':
            api = User.saveForgetSalary
            break
          case 'hr':
            api = User.saveForgetQueryPwd
            break
        }

        this.$http.post(api, this.qs.stringify(this.reset), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          this.isLoading = false
          this.isToast = true
          if (_data.retCode === 0) {
            this.toastMsg = '修改成功'
            this.toastState = 'success'
            this.isModal = false
          } else {
            this.toastMsg = _data.retMsg
            this.toastState = null
          }
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            this.toastState = null
            if (_data.retCode === 100014 || (this.reset.type === 'login' && _data.retCode === 0)) {
              this.$cookie.delete('token')
              this.$router.push('/')
            }
            this.reset = {
              type: '',
              email: '',
              password: '',
              repeatPwd: '',
              verification: ''
            }
          }, 1500)
        })
      },
      getVeriCode () {
        if (this.canSend) {
          if (!this.reset.email) {
            this.isToast = true
            this.toastMsg = '请输入邮箱'
            setTimeout(() => {
              this.isToast = false
              this.toastMsg = null
            }, 1500)
            return
          }
          this.canSend = false
          let data = {}
          data.email = this.reset.email
          data.type = this.reset.type === 'login' ? 1 : this.reset.type === 'salary' ? 3 : 2
          let api = User.getVeriCode
          if (this.reset.type === 'hr') {
            if (!this.reset.opType) {
              this.isToast = true
              this.toastMsg = '请选择菜单'
              setTimeout(() => {
                this.isToast = false
                this.toastMsg = null
              }, 1500)
              return
            }
            data.opType = this.reset.opType
            api = User.getQueryVeriCode
          } else {

          }

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

          this.$http.post(api, this.qs.stringify(data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
            let _data = res.data
            this.isToast = true
            if (_data.retCode === 0) {
              this.toastMsg = '验证码已发送'
            } else {
              this.toastMsg = _data.retMsg
              this.veriBtnTxt = '获取验证码'
              this.waitTime = 60
              this.canSend = true
              clearInterval(reSendTime)
            }
            setTimeout(() => {
              this.isToast = false
              this.toastMsg = null
            }, 1500)
          })
        }
      },
      resetModal (type) {
        this.reset.type = type
        this.isModal = true
      },
      changehrPwd () {
        this.isLoading = true
        if (!this.hrPwd.oldPassWord || !this.hrPwd.newPassWord) {
          this.isToast = true
          this.toastMsg = '请输入人事管理原密码或新密码'
          this.isLoading = false
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
          }, 1500)
          return
        }
        if (this.hrPwd.newPassWord !== this.hrPwd.repeatNewPassWord) {
          this.isToast = true
          this.toastMsg = '人事管理新密码两次不一致'
          this.isLoading = false
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
          }, 1500)
          return
        }
        let data = {
          prePwd: this.hrPwd.oldPassWord,
          isInit: this.hrPwd.isInit,
          pwd: this.hrPwd.newPassWord,
          opType: this.hrPwd.opType
        }
        this.$http.post(User.queryPwd, this.qs.stringify(data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          this.isLoading = false

          if (_data.retCode === 0) {
            this.toastMsg = '修改成功'
            this.toastState = 'success'
          } else {
            this.toastMsg = _data.retMsg
            this.toastState = null
          }
          this.isToast = true
          setTimeout(() => {
            this.isToast = false
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')
              this.$router.push('/')
            }
          }, 1500)
        })
      },
      changePwd () {
        this.isLoading = true
        if (!this.pwd.oldPassWord || !this.pwd.newPassWord) {
          this.isToast = true
          this.toastMsg = '请输入系统登录原密码或新密码'
          this.isLoading = false
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
          }, 1500)
          return
        }
        if (this.pwd.newPassWord !== this.pwd.repeatNewPassWord) {
          this.isToast = true
          this.toastMsg = '系统登录新密码两次不一致'
          this.isLoading = false
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
          }, 1500)
          return
        }
        this.$http.post(User.changePwd, this.qs.stringify(this.pwd), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          this.isLoading = false

          if (_data.retCode === 0) {
            this.toastMsg = '修改成功'
            this.toastState = 'success'
          } else {
            this.toastMsg = _data.retMsg
            this.toastState = null
          }
          this.isToast = true
          setTimeout(() => {
            this.isToast = false
            if (_data.retCode === 0) {
              this.$cookie.delete('token')
              localStorage.clear()
              sessionStorage.clear()
              this.$store.dispatch('setPrimaryMenu', '1')
              this.$router.push('/')
            }
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }, 1500)
        })
      },
      changeAdminPwd () {
        this.isLoading = true
        if (!this.adminPwd.oldPassWord || !this.adminPwd.newPassWord) {
          this.isToast = true
          this.toastMsg = '请输入管理者原密码或新密码'
          this.isLoading = false
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
          }, 1500)
          return
        }
        if (this.adminPwd.newPassWord !== this.adminPwd.repeatNewPassWord) {
          this.isToast = true
          this.toastMsg = '管理员新密码两次不一致'
          this.isLoading = false
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
          }, 1500)
          return
        }

        this.$http.post(User.changeManagePwd, this.qs.stringify(this.adminPwd), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          this.isLoading = false

          if (_data.retCode === 0) {
            this.toastMsg = '修改成功'
            this.toastState = 'success'
          } else {
            this.toastMsg = _data.retMsg
            this.toastState = null
          }
          this.isToast = true
          setTimeout(() => {
            this.isToast = false
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }, 1500)
        })
      },
      changeSalaryPwd () {
        this.isLoading = true
        if (!this.salaryPwd.oldPassWord || !this.salaryPwd.newPassWord) {
          this.isToast = true
          this.toastMsg = '请输入薪资查询原密码或新密码'
          this.isLoading = false
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
          }, 1500)
          return
        }
        if (this.salaryPwd.newPassWord !== this.salaryPwd.repeatNewPassWord) {
          this.isToast = true
          this.toastMsg = '薪资查询新密码两次不一致'
          this.isLoading = false
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
          }, 1500)
          return
        }
        this.$http.post(User.changeQueryPwd, this.qs.stringify(this.salaryPwd), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          this.isLoading = false

          if (_data.retCode === 0) {
            this.toastMsg = '修改成功'
            this.toastState = 'success'
          } else {
            this.toastMsg = _data.retMsg
            this.toastState = null
          }
          this.isToast = true
          setTimeout(() => {
            this.isToast = false
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }, 1500)
        })
      },
      displayTxt (rootKey, key, iconKey) {
        let type = this[rootKey][key]
        this[rootKey][key] = type === 'password' ? 'text' : 'password'
        this[rootKey][iconKey] = type === 'password' ? 'eye-disabled' : 'eye'
      },
      checkRole () {
        this.$http.post(User.role, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.isAdmin = _data.retData.adminPassWord
          }
        })
      }
    },
    created () {
      this.checkRole()
      this.myId = JSON.parse(localStorage.getItem('userInfo')).id
      switch (+this.myId) {
        case 82:
          delete this.hrOpTypeConf[3]
          delete this.hrOpTypeConf[4]
          break
        case 74:
          delete this.hrOpTypeConf[1]
          delete this.hrOpTypeConf[2]
          delete this.hrOpTypeConf[3]
          delete this.hrOpTypeConf[4]
          break
      }
    }
  }
</script>

<style scoped lang="less">
  .profile-box {
    padding: 60px 30px;
    h3 {
      font-size: 16px;
      color: #6b7177;
      margin-bottom: 32px;
    }
  }
  .reset-modal {
    .ok {
      display: block;
      width: 100%;
    }
    h3 {
      color: #495057;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 24px;
    }
    ul {
      li {
        .ipt {
          height: 48px;
          width: 100%;
          border-radius: 4px;
          border: 1px solid #ced4da;
          font-size: 14px;
          padding: 0 16px;
          &:focus {
            border-color: #57a3f3;
            outline: 0;
            box-shadow: 0 0 0 2px rgba(45,140,240,.2);
          }
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
  }
</style>
