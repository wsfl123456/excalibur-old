<template>
  <div class="phone-find-password">
    <el-steps :active="currentStep" process-status="finish">
      <el-step title="填写账号"></el-step>
      <el-step title="验证身份"></el-step>
      <el-step title="设置密码"></el-step>
    </el-steps>

    <div v-if="currentStep === 0">
      <div class="item">
        <i-input v-model="phoneParams.mobile" placeholder="请输入手机号" @input="phoneEmpty = true"></i-input>
        <img src="../../assets/images/ic_iphone.svg" class="input-icon" alt>
        <div v-show="!hideErrorTips" class="error-tips">请输入正确的手机号码</div>
        <div v-show="phoneParams.mobile === '' && phoneEmpty === true" class="error-tips">手机号码不能为空</div>
      </div>
      <div class="pic-code">
        <div class>
          <i-input
            v-model="phoneParams.captchaCode"
            placeholder="请输入图形验证码"
            @input="phoneCaptchaCodeEmpty = true"
          ></i-input>
          <img src="../../assets/images/ic_identifying code.svg" class="input-icon" alt>
          <div
            v-show="phoneParams.captchaCode === '' && phoneCaptchaCodeEmpty === true"
            class="error-tips"
          >图形验证码不能为空</div>
        </div>
        <img :src="captchaCodeUrl" alt="验证码" width="120" height="40" style="margin-left:10px">
        <img
          src="../../assets/images/ic_renovate.svg"
          alt="刷新"
          @click="getCaptchaCode"
          style="margin-left:10px;cursor:pointer"
        >
      </div>
    </div>

    <div v-else-if="currentStep === 1">
      <div class="current-phone">
        <div>
          <span>验证当前账号绑定的手机号码：</span>
          <span>{{this.phoneParams.mobile}}</span>
        </div>
        <a href="javascript:;" @click="currentStep = 0">更换手机号</a>
      </div>

      <div class="pic-code">
        <div>
          <i-input
            v-model="phoneParams.captchaCode"
            placeholder="请输入图形验证码"
            @input="secondPhoneCaptchaCodeEmpty = true"
          ></i-input>
          <img src="../../assets/images/ic_identifying code.svg" class="input-icon" alt>
          <div
            v-show="phoneParams.captchaCode === '' && secondPhoneCaptchaCodeEmpty === true"
            class="error-tips"
          >图形验证码不能为空</div>
        </div>
        <img :src="captchaCodeUrl" alt="验证码" width="120" height="40" style="margin-left:10px">
        <img
          src="../../assets/images/ic_renovate.svg"
          alt="刷新"
          @click="getCaptchaCode"
          style="margin-left:10px;cursor:pointer"
        >
      </div>

      <div class="pic-code">
        <div>
          <i-input
            v-model="phoneParams.verification"
            placeholder="请输入动态密码"
            @input="verificationEmpty = true"
          ></i-input>
          <img src="../../assets/images/ic_dynamic password_iphone.svg" class="input-icon" alt>
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
    </div>

    <div v-else>
      <div style="margin-top:30px;font-size:14px">请输入你需要设置的新密码：</div>
      <div class="item">
        <i-input
          v-model="phoneParams.password"
          type="password"
          autocomplete="new-password"
          placeholder="请输入新密码，6-16位字母/数字/符号组合"
          @input="phonepasswordEmpty = true"
        ></i-input>
        <img src="../../assets/images/ic_cipher.svg" class="input-icon" alt>
        <div v-show="!hidePasswordErrorTips" class="error-tips">请输入6-16位字母/数字/符号组合密码</div>

        <div
          v-show="phoneParams.password === '' && phonepasswordEmpty === true"
          class="error-tips"
        >密码不能为空</div>
      </div>
      <div class="item">
        <i-input
          v-model="phoneParams.secondPassword"
          type="password"
          autocomplete="new-password"
          placeholder="请重复输入的密码"
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
    </div>

    <Button type="primary" class="next-btn" v-if="currentStep === 2" @click="forgetpassword">确定</Button>
    <Button type="primary" class="next-btn" @click="nextStep" v-else>下一步</Button>

    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>
</template>
<script>
import { NewLogin, Login } from "../../API/api";
import Toast from "../../components/popup/Toast";
import { PasswordCheck } from "../../util/util.js";
import { type } from "os";

export default {
  components: {
    Toast
  },
  data() {
    return {
      currentStep: 0,
      captchaCodeUrl: "",
      isToast: false,
      toastMsg: "",
      restSecond: 0,
      phoneParams: {
        mobile: "",
        captchaCode: "",
        verification: "",
        password: "",
        secondPassword: ""
      },
      phoneEmpty: false,
      phoneCaptchaCodeEmpty: false,
      secondPhoneCaptchaCodeEmpty: false,
      verificationEmpty: false,
      phonepasswordEmpty: false,
      phonesecondPasswordEmpty: false
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
    },
    hidePasswordErrorTips() {
      return PasswordCheck(this.phoneParams.password);
    },
    hideSecondPasswordErrorTips() {
      return this.phoneParams.secondPassword
        ? this.phoneParams.password === this.phoneParams.secondPassword
        : true;
    }
  },
  methods: {
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
    checkCaptchacode() {
      this.$http
        .post(
          NewLogin.captchacodecheck,
          this.qs.stringify({ captchaCode: this.phoneParams.captchaCode }),
          {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          }
        )
        .then(res => {
          const _data = res.data;
          if (_data.retCode === 0) {
            this.currentStep++;
          } else {
            this.isToast = true;
            this.toastMsg = _data.retMsg;
          }
          setTimeout(() => {
            this.isToast = false;
            this.toastMsg = "";
          }, 1500);
        });
    },
    checkVerification() {
      const params = {
        typeId: 3,
        mobile: this.phoneParams.mobile,
        verification: this.phoneParams.verification
      };
      this.$http
        .post(NewLogin.userverification, this.qs.stringify(params), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          if (_data.retCode === 0) {
            this.currentStep++;
          } else {
            this.isToast = true;
            this.toastMsg = _data.retMsg;
          }
          setTimeout(() => {
            this.isToast = false;
            this.toastMsg = "";
          }, 1500);
        });
    },
    getVerification() {
      const params = {
        typeId: 3, //登录
        mobile: this.phoneParams.mobile,
        captchaCode: this.phoneParams.captchaCode
      };

      let hasWrite = true;

      if (this.phoneParams.captchaCode == "") {
        this.secondPhoneCaptchaCodeEmpty = true;
        hasWrite = false;
      }

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
    nextStep() {
      let canNext = true;
      switch (this.currentStep) {
        case 0:
          if (this.phoneParams.mobile === "" || !this.showErrorTips) {
            this.phoneEmpty = true;
            canNext = false;
          }
          if (this.phoneParams.captchaCode === "") {
            this.phoneCaptchaCodeEmpty = true;
            canNext = false;
          }

          if (canNext) this.checkCaptchacode();

          break;
        case 1:
          if (this.phoneParams.captchaCode === "") {
            this.secondPhoneCaptchaCodeEmpty = true;
            canNext = false;
          }
          if (this.phoneParams.verification === "") {
            this.verificationEmpty = true;
            canNext = false;
          }

          if (canNext) this.checkVerification();
      }
    },
    forgetpassword() {
      let canSubmit = true;
      this.phonepasswordEmpty = true;
      this.phonesecondPasswordEmpty = true;
      if (
        this.phoneParams.password === "" ||
        this.phoneParams.password !== this.phoneParams.secondPassword
      )
        canSubmit = false;
      if (canSubmit) {
        const params = {
          mobile: this.phoneParams.mobile,
          captchaCode: this.phoneParams.captchaCode,
          verification: this.phoneParams.verification,
          password: this.phoneParams.password
        };
        this.$http
          .post(NewLogin.userforgetpassword, this.qs.stringify(params), {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          })
          .then(res => {
            const _data = res.data;
            if (_data.retCode === 0) {
              this.toastMsg = "密码修改成功";
              this.isToast = true;
              setTimeout(() => {
                this.toastMsg = "";
                this.isToast = false;
                this.$router.push("/");
              }, 1500);
            } else {
              this.toastMsg = _data.retMsg;
              this.isToast = true;
              setTimeout(() => {
                this.toastMsg = "";
                this.isToast = false;
              }, 1500);
            }
          });
      }
    }
  },
  created() {
    this.getCaptchaCode();
  },
  watch: {
    currentStep: {
      handler(step) {
        if (step !== 2) {
          this.getCaptchaCode();
          this.phoneParams.captchaCode = "";
        }
      }
    }
  }
};
</script>

<style lang="less">
.phone-find-password {
  padding: 10px 40px;
  .item {
    position: relative;
    margin-top: 30px;
    .input-icon {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
    .error-tips {
      position: absolute;
      color: #e02020;
      line-height: 2;
      padding-left: 20px;
    }
  }
  .pic-code {
    display: flex;
    align-items: center;
    margin-top: 30px;
    > div {
      flex: 1;
      position: relative;
      .input-icon {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .get-code {
      width: 154px;
      height: 40px;
      border-radius: 24px;
      margin-left: 10px;
      font-size: 15px;
    }
    .error-tips {
      position: absolute;
      color: #e02020;
      line-height: 2;
      padding-left: 20px;
    }
  }

  .current-phone {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    font-size: 14px;
    span {
      &:last-child {
        color: #fa9493;
      }
    }
  }

  .next-btn {
    margin-top: 30px;
    width: 100%;
    height: 40px;
    border-radius: 24px;
    font-size: 20px;
  }
}
</style>

