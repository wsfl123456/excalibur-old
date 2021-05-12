<template>
  <div>
    <Tabs :animated="false">
      <!-- 手机注册 -->
      <TabPane label="手机注册" name="phone">
        <Form>
          <FormItem>
            <div class="item">
              <i-input
                v-model="phoneParams.phoneNumber"
                placeholder="请输入手机号"
                @input="phoneEmpty = true"
              ></i-input>
              <img src="../../assets/images/ic_iphone.svg" class="input-icon" alt>
              <div v-show="!hidePhoneErrorTips" class="error-tips">请输入正确的手机号码</div>
              <div
                v-show="phoneParams.phoneNumber === '' && phoneEmpty === true"
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
                  @input="phonecaptchaCodeEmpty = true"
                ></i-input>
                <img src="../../assets/images/ic_identifying code.svg" class="input-icon" alt>
                <div
                  v-show="phoneParams.captchaCode === '' && phonecaptchaCodeEmpty === true"
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
                  @input="phoneverificationEmpty = true"
                ></i-input>
                <img
                  src="../../assets/images/ic_dynamic password_iphone.svg"
                  class="input-icon"
                  alt
                >
                <div
                  v-show="phoneParams.verification === '' && phoneverificationEmpty === true"
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
            <div class="item">
              <i-input
                v-model="phoneParams.password"
                type="password"
                autocomplete="new-password"
                placeholder="请设置密码，6-16位字母/数字/符号组合"
                @input="phonepasswordEmpty = true"
              ></i-input>
              <img src="../../assets/images/ic_cipher.svg" class="input-icon" alt>

              <div v-show="!hidePasswordErrorTips" class="error-tips">请输入6-16位字母/数字/符号组合密码</div>

              <div
                v-show="phoneParams.password === '' && phonepasswordEmpty === true"
                class="error-tips"
              >密码不能为空</div>
            </div>
          </FormItem>
          <FormItem>
            <div class="item">
              <i-input
                v-model="phoneParams.secondPassword"
                type="password"
                autocomplete="new-password"
                placeholder="请再次输入密码"
                @input="phonesecondPasswordEmpty = true"
              ></i-input>
              <img src="../../assets/images/ic_cipher.svg" class="input-icon" alt>

              <div
                v-if="phoneParams.secondPassword === '' && phonesecondPasswordEmpty === true"
                class="error-tips"
              >密码不能为空</div>
              <div v-else>
                <div v-show="!hideSecondPasswordErrorTips" class="error-tips">两次输入的密码需一致</div>
              </div>
            </div>
          </FormItem>
          <FormItem>
            <Button type="primary" class="log-btn" @click="registered('phone')">注册</Button>
          </FormItem>
        </Form>
      </TabPane>

      <!-- 邮箱注册 -->
      <TabPane label="邮箱注册" name="email">
        <Form>
          <FormItem>
            <div class="item">
              <i-input
                v-model="emailParams.emailNumber"
                placeholder="请输入邮箱号码"
                @input="emailEmpty = true"
              ></i-input>
              <img src="../../assets/images/ic_postbox.svg" class="input-icon" alt>
              <div v-show="!hideEmailErrorTips" class="error-tips">请输入正确的邮箱号码</div>
              <div
                v-show="emailParams.emailNumber === '' && emailEmpty === true"
                class="error-tips"
              >邮箱号码不能为空</div>
            </div>
          </FormItem>
          <FormItem>
            <div class="flex">
              <div class="item">
                <i-input
                  v-model="emailParams.captchaCode"
                  placeholder="请输入图形验证码"
                  @input="emailcaptchaCodeEmpty = true"
                ></i-input>
                <img src="../../assets/images/ic_identifying code.svg" class="input-icon" alt>
                <div
                  v-show="emailParams.captchaCode === '' && emailcaptchaCodeEmpty === true"
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
                  v-model="emailParams.verification"
                  placeholder="请输入动态密码"
                  @input="emailverificationEmpty = true"
                ></i-input>
                <img
                  src="../../assets/images/ic_dynamic password_postbox.svg"
                  class="input-icon"
                  alt
                >
                <div
                  v-show="emailParams.verification === '' && emailverificationEmpty === true"
                  class="error-tips"
                >动态密码不能为空</div>
              </div>
              <Button
                type="primary"
                class="get-code"
                @click="getEmailVerification"
                :disabled="emailRestSecond !== 0"
              >
                <span v-if="emailRestSecond">{{emailRestSecond}} s</span>
                <span v-else>获取验证码</span>
              </Button>
            </div>
          </FormItem>
          <FormItem>
            <div class="item">
              <i-input
                v-model="emailParams.password"
                type="password"
                autocomplete="new-password"
                placeholder="请设置密码，6-16位字母/数字/符号组合"
                @input="emailpasswordEmpty = true"
              ></i-input>
              <img src="../../assets/images/ic_cipher.svg" class="input-icon" alt>

              <div v-show="!hideEmailPasswordErrorTips" class="error-tips">请输入6-16位字母/数字/符号组合密码</div>

              <div
                v-show="emailParams.password === '' && emailpasswordEmpty === true"
                class="error-tips"
              >密码不能为空</div>
            </div>
          </FormItem>
          <FormItem>
            <div class="item">
              <i-input
                v-model="emailParams.secondPassword"
                type="password"
                autocomplete="new-password"
                placeholder="请再次输入密码"
                @input="emailsecondPasswordEmpty = true"
              ></i-input>
              <img src="../../assets/images/ic_cipher.svg" class="input-icon" alt>

              <div
                v-if="emailParams.secondPassword === '' && emailsecondPasswordEmpty === true"
                class="error-tips"
              >密码不能为空</div>
              <div v-else>
                <div v-show="!hideEmailSecondPasswordErrorTips" class="error-tips">两次输入的密码需一致</div>
              </div>
            </div>
          </FormItem>
          <FormItem>
            <Button type="primary" class="log-btn" @click="registered('email')">注册</Button>
          </FormItem>
        </Form>
      </TabPane>
    </Tabs>
    <div class="go-login">
      已有账号，
      <a href="javascript:;" @click="$emit('changeLoginStatus')">
        <span>立即登录</span>
        <img src="../../assets/images/ic_right_circle.svg" width="18" alt>
      </a>
    </div>

    <toast :is-toast="isToast" :msg="toastMsg"></toast>

    <Spin fix v-if="spinShow">
      <Icon type="load-c" size="25" class="demo-spin-icon-load"></Icon>
      <div>注册成功，自动登录中...</div>
    </Spin>
  </div>
</template>
<script>
import { NewLogin, Login } from "../../API/api";
import Toast from "../../components/popup/Toast";
import { PasswordCheck } from "../../util/util.js";
import { type } from "os";

const phoneVerificationCheck = new Map([
  [["phoneParams", "phoneNumber"], "手机号码不能为空"],
  [["showPhoneErrorTips"], "请输入正确的手机号"],
  [["phoneParams", "captchaCode"], "请输入图形验证码"]
]);

const emailVerificationCheck = new Map([
  [["emailParams", "emailNumber"], "邮箱号码不能为空"],
  [["showEmailErrorTips"], "请输入正确的邮箱号码"],
  [["emailParams", "captchaCode"], "请输入图形验证码"]
]);

const phoneRegisteredCheck = new Map([
  [["phoneParams", "phoneNumber"], "手机号码不能为空"],
  [["phoneParams", "verification"], "请输入动态密码"],
  [["phoneParams", "password"], "请输入动态密码"],
  [["phoneParams", "password"], "请输入动态密码"]
]);

const emailRegisteredCheck = new Map([
  [["emailParams", "emailNumber"], "邮箱号码不能为空"],
  [["emailParams", "verification"], "请输入动态密码"],
  [["emailParams", "password"], "请输入动态密码"],
  [["emailParams", "password"], "请输入动态密码"]
]);

export default {
  components: { Toast },
  data() {
    return {
      isToast: false,
      toastMsg: null,
      spinShow: false,
      restSecond: 0,
      emailRestSecond: 0,
      captchaCodeUrl: "",
      phoneParams: {
        phoneNumber: "",
        captchaCode: "",
        verification: "",
        password: "",
        secondPassword: ""
      },
      phoneEmpty: false,
      phonecaptchaCodeEmpty: false,
      phoneverificationEmpty: false,
      phonepasswordEmpty: false,
      phonesecondPasswordEmpty: false,

      emailParams: {
        emailNumber: "",
        captchaCode: "",
        verification: "",
        password: "",
        secondPassword: ""
      },
      emailEmpty: false,
      emailcaptchaCodeEmpty: false,
      emailverificationEmpty: false,
      emailpasswordEmpty: false,
      emailsecondPasswordEmpty: false
    };
  },
  computed: {
    hidePhoneErrorTips() {
      return (
        /^1[3456789]\d{9}$/.test(this.phoneParams.phoneNumber) ||
        this.phoneParams.phoneNumber === ""
      );
    },
    showPhoneErrorTips() {
      return /^1[3456789]\d{9}$/.test(this.phoneParams.phoneNumber);
    },
    hidePasswordErrorTips() {
      return PasswordCheck(this.phoneParams.password);
    },
    hideSecondPasswordErrorTips() {
      return this.phoneParams.secondPassword
        ? this.phoneParams.password === this.phoneParams.secondPassword
        : true;
    },
    hideEmailErrorTips() {
      return (
        /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(
          this.emailParams.emailNumber
        ) || this.emailParams.emailNumber === ""
      );
    },
    showEmailErrorTips() {
      return /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(
        this.emailParams.emailNumber
      );
    },
    hideEmailPasswordErrorTips() {
      return PasswordCheck(this.emailParams.password);
    },
    hideEmailSecondPasswordErrorTips() {
      return this.emailParams.secondPassword
        ? this.emailParams.password === this.emailParams.secondPassword
        : true;
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
        typeId: 1, //注册
        mobile: this.phoneParams.phoneNumber,
        captchaCode: this.phoneParams.captchaCode
      };

      const hasWrite = this.regexCheck(phoneVerificationCheck);

      if (this.phoneParams.phoneNumber === "") this.phoneEmpty = true;
      if (this.phoneParams.captchaCode === "")
        this.phonecaptchaCodeEmpty = true;

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
    getEmailVerification() {
      const params = {
        typeId: 1, //注册
        mobile: this.emailParams.emailNumber,
        captchaCode: this.emailParams.captchaCode
      };

      const hasWrite = this.regexCheck(emailVerificationCheck);

      if (this.emailParams.emailNumber === "") this.emailEmpty = true;
      if (this.emailParams.captchaCode === "")
        this.emailcaptchaCodeEmpty = true;

      if (hasWrite) {
        this.$http
          .post(
            NewLogin.captchacodecheck,
            this.qs.stringify({ captchaCode: this.emailParams.captchaCode }),
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
                    this.toastMsg = "邮箱发送成功";
                    this.emailRestSecond = 60;
                    let reduceSecond = setInterval(() => {
                      if (this.emailRestSecond === 0)
                        clearInterval(reduceSecond);
                      else this.emailRestSecond--;
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
    login(type) {
      let data;
      switch (type) {
        case "phone":
          data = {
            email: this.phoneParams.phoneNumber,
            password: this.phoneParams.password,
            remember: 0
          };
          break;
        case "email":
          data = {
            email: this.emailParams.emailNumber,
            password: this.emailParams.password,
            remember: 0
          };
      }
      this.$http.post(Login.login, this.qs.stringify(data)).then(res => {
        let _data = res.data;
        if (_data.retCode === 0) {
          if (this.remember) {
            this.$cookie.set("token", _data.retData.token, 9999);
          } else {
            this.$cookie.set("token", _data.retData.token);
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

          this.spinShow = false;
          this.$router.push("/v2/home");
        } else {
          this.isToast = true;
          this.toastMsg = _data.retMsg;
        }
        setTimeout(() => {
          this.isToast = false;
          this.toastMsg = null;
        }, 1500);
      });
    },
    registered(type) {
      let params, canRegistered;
      if (type === "phone") {
        params = {
          mobileAccount: this.phoneParams.phoneNumber,
          verification: this.phoneParams.verification,
          pwd: this.phoneParams.password
        };

        canRegistered = this.regexCheck(phoneRegisteredCheck);
        if (this.phoneParams.phoneNumber === "") this.phoneEmpty = true;
        if (this.phoneParams.verification === "")
          this.phoneverificationEmpty = true;
        if (this.phoneParams.password === "") this.phonepasswordEmpty = true;
        if (this.phoneParams.secondPassword === "")
          this.phonesecondPasswordEmpty = true;
      } else if (type === "email") {
        params = {
          email: this.emailParams.emailNumber,
          verification: this.emailParams.verification,
          pwd: this.emailParams.password
        };

        canRegistered = this.regexCheck(emailRegisteredCheck);
        if (this.emailParams.emailNumber === "") this.emailEmpty = true;
        if (this.emailParams.verification === "")
          this.emailverificationEmpty = true;
        if (this.emailParams.password === "") this.emailpasswordEmpty = true;
        if (this.emailParams.secondPassword === "")
          this.emailsecondPasswordEmpty = true;
      }

      if (canRegistered) {
        this.$http
          .post(NewLogin.addaccount, this.qs.stringify(params), {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          })
          .then(res => {
            const _data = res.data;
            if (_data.retCode === 0) {
              this.spinShow = true;
              setTimeout(() => {
                this.login(type);
              }, 1000);
            } else {
              this.isToast = true;
              this.toastMsg = _data.retMsg;
              setTimeout(() => {
                this.isToast = false;
                this.toastMsg = null;
              }, 1500);
            }
          });
      }
    }
  },
  created() {
    this.getCaptchaCode();
  }
};
</script>

<style lang="less">
.demo-spin-col {
  height: 100px;
  position: fixed;
  border: 1px solid #eee;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>


