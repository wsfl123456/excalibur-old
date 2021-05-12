<template>
  <div>
    <Tabs :animated="false">
      <TabPane label="手机快捷登陆" name="phone">
        <Form>
          <FormItem>
            <div class="item">
              <i-input v-model="phoneParams.mobile" placeholder="请输入手机号" @input="phoneEmpty = true"></i-input>
              <img src="../../assets/images/ic_iphone.svg" class="input-icon" alt>
              <div v-show="!hideErrorTips" class="error-tips">请输入正确的手机号码</div>
              <div
                v-show="phoneParams.mobile === '' && phoneEmpty === true"
                class="error-tips"
              >手机号码不能为空</div>
            </div>
          </FormItem>
          <FormItem>
            <div class="flex">
              <div class="item">
                <i-input
                  v-model="phoneParams.captchaCode"
                  placeholder="请输入图形验证码"
                  @input="captchaCodeEmpty = true"
                ></i-input>
                <img src="../../assets/images/ic_identifying code.svg" class="input-icon" alt>
                <div
                  v-show="phoneParams.captchaCode === '' && captchaCodeEmpty === true"
                  class="error-tips"
                >图形验证码不能为空</div>
              </div>
              <img
                :src="captchaCodeUrl"
                alt="验证码"
                width="120"
                height="40"
                style="margin-left:10px;object-fill:cover"
              >
              <img
                src="../../assets/images/ic_renovate.svg"
                alt="刷新"
                @click="getCaptchaCode"
                style="margin-left:10px;cursor:pointer"
              >
            </div>
          </FormItem>
          <FormItem>
            <div class="flex">
              <div class="item">
                <i-input
                  v-model="phoneParams.verification"
                  placeholder="请输入动态密码"
                  @input="verificationEmpty = true"
                ></i-input>
                <img
                  src="../../assets/images/ic_dynamic password_iphone.svg"
                  class="input-icon"
                  alt
                >
                <div
                  v-show="phoneParams.verification === '' && verificationEmpty === true"
                  class="error-tips"
                >动态密码不能为空</div>
              </div>
              <Button
                type="primary"
                class="get-code"
                @click="getVerification"
                :disabled="restSecond !== 0"
              >
                <span v-if="restSecond">{{restSecond}} s</span>
                <span v-else>获取验证码</span>
              </Button>
            </div>
          </FormItem>
          <FormItem>
            <Button type="primary" class="log-btn" @click="phoneLogin">登录</Button>
          </FormItem>
        </Form>
      </TabPane>

      <TabPane label="账号密码登陆" name="account">
        <Form>
          <FormItem>
            <div class="item">
              <i-input
                v-model="accountParams.email"
                placeholder="请输入登陆账号"
                @input="accountEmpty = true"
              ></i-input>
              <img src="../../assets/images/ic_user.svg" class="input-icon" alt>
              <div
                v-show="accountParams.email === '' && accountEmpty === true"
                class="error-tips"
              >账号不能为空</div>
            </div>
          </FormItem>
          <FormItem>
            <div class="item">
              <i-input
                v-model="accountParams.password"
                type="password"
                autocomplete="new-password"
                placeholder="请输入密码"
                @input="passwordEmpty = true"
              ></i-input>
              <img src="../../assets/images/ic_cipher.svg" class="input-icon" alt>
              <div
                v-show="accountParams.password === '' && passwordEmpty === true"
                class="error-tips"
              >密码不能为空</div>
            </div>
          </FormItem>
          <FormItem>
            <div class="forget-password">
              <!-- <Checkbox
                v-model="accountParams.remember"
                :true-value="1"
                :false-value="0"
                style="font-size:14px"
              >自动登录</Checkbox> -->
              <a
                href="javascript:;"
                style="font-size:14px"
                @click="$router.push({ name: 'findPassword'})"
              >忘记密码？</a>
            </div>
          </FormItem>
          <FormItem>
            <Button type="primary" class="log-btn" @click="accoutLogin">登录</Button>
          </FormItem>

          <div class="go-registered">
            还没有账号？
            <a href="javascript:;" @click="$emit('changeLoginStatus')">
              <span>免费注册</span>
              <img src="../../assets/images/ic_right_circle.svg" width="18" alt>
            </a>
          </div>
        </Form>
      </TabPane>
    </Tabs>
    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>
</template>
<script>
import { NewLogin, Login } from "../../API/api";
import Toast from "../../components/popup/Toast";

const verificationCheck = new Map([
  [["phoneParams", "mobile"], "手机号码不能为空"],
  [["showErrorTips"], "请输入正确的手机号"],
  [["phoneParams", "captchaCode"], "请输入图形验证码"]
]);

const phoneLoginCheck = new Map([
  [["phoneParams", "mobile"], "手机号码不能为空"],
  [["phoneParams", "verification"], "动态密码不能为空"]
]);

const accountLoginCheck = new Map([
  [["accountParams", "email"], "登录账号不能为空"],
  [["accountParams", "password"], "密码不能为空"]
]);

export default {
  components: { Toast },
  data() {
    return {
      phoneParams: {
        mobile: "",
        captchaCode: "",
        verification: ""
      },
      accountParams: {
        email: "",
        password: "",
        remember: 0
      },
      captchaCodeUrl: "",
      autoLogin: true,
      restSecond: 0,
      isToast: false,
      toastMsg: "",
      phoneEmpty: false,
      captchaCodeEmpty: false,
      verificationEmpty: false,
      accountEmpty: false,
      passwordEmpty: false
    };
  },
  computed: {
    hideErrorTips() {
      return (
        /^1[3456789]\d{9}$/.test(this.phoneParams.mobile) ||
        this.phoneParams.mobile === ""
      );
    },
    showErrorTips() {
      return /^1[3456789]\d{9}$/.test(this.phoneParams.mobile);
    }
  },
  methods: {
    regexCheck(val) {
      let check = true;

      try {
        val.forEach((value, key) => {
          let vm = this;
          key.forEach(ele => {
            vm = vm[ele];
          });
          if ((!vm && vm !== 0) || (Array.isArray(vm) && vm.length === 0)) {
            check = false;
            throw new Error("break");
          }
        });
      } catch (err) {
        console.log(err);
      }

      return check;
    },

    getCaptchaCode() {
      const params = {
        curTime: new Date().getTime()
      };
      this.$http
        .post(NewLogin.getCaptchaCode, this.qs.stringify(params), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
          responseType: "blob", //二进制数据
          emulateJSON: true
        })
        .then(res => {
          this.captchaCodeUrl = window.URL.createObjectURL(res.data); //转换blob
        });
    },

    getVerification() {
      const params = {
        typeId: 2, //登录
        mobile: this.phoneParams.mobile,
        captchaCode: this.phoneParams.captchaCode
      };

      const hasWrite = this.regexCheck(verificationCheck);

      if (this.phoneParams.mobile === "") this.phoneEmpty = true;
      if (this.phoneParams.captchaCode === "") this.captchaCodeEmpty = true;
      this.verificationEmpty = false;

      if (hasWrite) {
        this.$http
          .post(
            NewLogin.captchacodecheck,
            this.qs.stringify({ captchaCode: this.phoneParams.captchaCode }),
            {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            }
          )
          .then(res => {
            if (res.data.retCode === 0) {
              this.$http
                .post(NewLogin.getVerification, this.qs.stringify(params), {
                  headers: {
                    Authorization: "Bearer " + this.$cookie.get("token")
                  }
                })
                .then(res => {
                  const _data = res.data;

                  if (_data.retCode === 0) {
                    this.isToast = true;
                    this.toastMsg = "短信发送成功";
                    this.restSecond = 60;
                    let reduceSecond = setInterval(() => {
                      if (this.restSecond === 0) clearInterval(reduceSecond);
                      else this.restSecond--;
                    }, 1000);
                  } else {
                    this.isToast = true;
                    this.toastMsg = _data.retMsg;
                  }
                  setTimeout(() => {
                      this.isToast = false;
                      this.toastMsg = "";
                    }, 1500);
                });
            } else {
              this.isToast = true;
              this.toastMsg = res.data.retMsg;
              setTimeout(() => {
                this.isToast = false;
                this.toastMsg = "";
              }, 1500);
            }
          });
      }
    },
    phoneLogin() {
      if (this.phoneParams.mobile === "") this.phoneEmpty = true;
      if (this.phoneParams.captchaCode === "") this.captchaCodeEmpty = true;
      if (this.phoneParams.verification === "") this.verificationEmpty = true;

      const canLogin = this.regexCheck(phoneLoginCheck);

      if (canLogin) {
        this.$http
          .post(
            NewLogin.userloginverification,
            this.qs.stringify(this.phoneParams)
          )
          .then(res => {
            let _data = res.data;
            if (_data.retCode === 0) {
              this.$cookie.set("token", _data.retData.token, { expires: '1D'});
              let userInfo = {
                userName: _data.retData.userName,
                id: _data.retData.id,
                headPic: _data.retData.headPic,
                mobile: _data.retData.mobile,
                teamName: _data.retData.teamName
              };
              this.$cookie.set("userInfo", JSON.stringify(userInfo));
              localStorage.setItem("userInfo", JSON.stringify(userInfo));
              sessionStorage.setItem("subMenu", "home");
              this.$store.dispatch("setOpenedSub", "tasks");
              sessionStorage.setItem("openedSub", "tasks");
              // this.$router.push("/v2/home");
              if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect)
              } else {
                this.$router.push("/v2/home");
              }
            } else {
              this.isToast = true;
              this.toastMsg = _data.retMsg;
            }
            setTimeout(() => {
              this.isToast = false;
              this.toastMsg = null;
            }, 1500);
          });
      }
    },
    accoutLogin() {
      if (this.accountParams.email === "") this.accountEmpty = true;
      if (this.accountParams.password === "") this.passwordEmpty = true;

      const canLogin = this.regexCheck(accountLoginCheck);

      if (canLogin) {
        this.$http
          .post(Login.login, this.qs.stringify(this.accountParams))
          .then(res => {
            let _data = res.data;
            if (_data.retCode === 0) {
              if (this.remember) {
                // this.$cookie.set("token", _data.retData.token, 9999);
              } else {
                this.$cookie.set("token", _data.retData.token, { expires: '1D'});
              }
              let userInfo = {
                userName: _data.retData.userName,
                id: _data.retData.id,
                headPic: _data.retData.headPic,
                mobile: _data.retData.mobile,
                teamName: _data.retData.teamName
              };
              this.$cookie.set("userInfo", JSON.stringify(userInfo));
              localStorage.setItem("userInfo", JSON.stringify(userInfo));
              sessionStorage.setItem("subMenu", "home");
              this.$store.dispatch("setOpenedSub", "tasks");
              sessionStorage.setItem("openedSub", "tasks");
              // this.$router.push("/v2/home");
              if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect)
              } else {
                this.$router.push("/v2/home");
              }
            } else {
              this.isToast = true;
              this.toastMsg = _data.retMsg;
            }
            setTimeout(() => {
              this.isToast = false;
              this.toastMsg = null;
            }, 1500);
          });
      }
    }
  },
  created() {
    this.getCaptchaCode();
  }
};
</script>

