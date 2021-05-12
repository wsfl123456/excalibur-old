<template>
  <div class="user-center">
    <div v-if="previewImg" id="cropper">
      <div class="crop-box g-mb-16">
        <vueCropper
          ref="cropper"
          :img="previewImg"
          :outputSize="1"
          outputType="png"
          info
          canScale
          autoCrop
          :autoCropWidth="200"
          :autoCropHeight="200"
          fixed
          full
          @realTime="realTime"
        ></vueCropper>
      </div>
      <div class="g-ta-r">
        <Button type="ghost" size="large" @click.native="cancelAvatar">取消</Button>
        <Button type="primary" size="large" @click.native="uploadAvatar">确定</Button>
      </div>
    </div>
    <div class="profile-box">
      <div class="avatar-box">
        <div class="user-avatar">
          <img :src="avatar" alt>
          <label for="selectImg" class="upload-mask">
            <input
              type="file"
              id="selectImg"
              accept="image/jpg, image/png, image/jpeg"
              @change="selectImg"
            >
            更换头像
          </label>
        </div>
        <p class>建议上传头像为正方形，不得大于800K</p>
      </div>

      <div class="mobile">
        <div>手机号</div>
        <div v-if="info.mobile">
          <span>{{ info.mobile }}</span>
          <a
            v-if="mobileAccount"
            href="javascript:;"
            class="opreate"
            @click="changePhone('修改')"
          >修改手机号</a>
          <a v-else href="javascript:;" class="opreate" @click="changePhone('认证')">去认证</a>
        </div>
        <a
          v-else
          href="javascript:;"
          class="opreate"
          @click="phoneText = '绑定';visibleModal = true;"
        >去绑定手机号</a>
      </div>
      <i-form label-position="top" class="profile-form">
        <FormItem label="微信号" style="width:60%">
          <i-input placeholder="请输入微信号" class="form-ipt" v-model="info.wechart"></i-input>
        </FormItem>

        <FormItem label="目前住址" style="width:80%">
          <Row>
            <i-col span="9">
              <Cascader
                :data="citys"
                v-model="selectedCity"
                placeholder="请选择省、市、区"
                class="form-ipt"
                @on-change="changeCity"
                :clearable="false"
              ></Cascader>
            </i-col>
            <i-col span="15">
              <div style="display:flex">
                <span style="margin: 0 8px;line-height:40px">—</span>
                <i-input placeholder="请填写详细地址（楼层号、门牌号）" class="form-ipt" v-model="info.address"></i-input>
              </div>
            </i-col>
          </Row>
        </FormItem>

        <FormItem label="开户银行" style="width:80%">
          <Row>
            <i-col span="9">
              <i-input placeholder="请填写开户银行" class="form-ipt" v-model="info.bankName"></i-input>
            </i-col>
            <i-col span="15">
              <div style="display:flex">
                <span style="margin: 0 8px;line-height:40px">—</span>
                <i-input placeholder="请填写银行账号" class="form-ipt" v-model="info.bankCardId"></i-input>
              </div>
            </i-col>
          </Row>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="save" size="large">保存</Button>
        </FormItem>
      </i-form>
    </div>
    <Modal class="user-center-modal" v-model="visibleModal" :mask-closable="false" width="600">
      <p slot="header" class="header">{{phoneText}}手机号</p>
      <div class="content">
        <i-form label-position="top">
          <FormItem label="手机号码">
            <div class="item">
              <i-input
                v-model="bindPhoneParams.mobile"
                placeholder="请输入手机号码"
                @input="phoneEmpty = true"
              ></i-input>
              <div v-show="!hidePhoneErrorTips" class="error-tips">请输入正确的手机号码</div>
              <div
                v-show="bindPhoneParams.mobile === '' && phoneEmpty === true"
                class="error-tips"
              >手机号码不能为空</div>
            </div>
          </FormItem>
          <FormItem label="图形验证码">
            <div class="flex">
              <div class="item">
                <i-input
                  v-model="bindPhoneParams.captchaCode"
                  placeholder="请输入图形验证码"
                  @input="phonecaptchaCodeEmpty = true"
                ></i-input>
                <div
                  v-show="bindPhoneParams.captchaCode === '' && phonecaptchaCodeEmpty === true"
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
          <FormItem label="验证码">
            <div class="flex">
              <div class="item">
                <i-input
                  v-model="bindPhoneParams.verification"
                  placeholder="请输入验证码"
                  @input="phoneverificationEmpty = true"
                ></i-input>
                <div
                  v-show="bindPhoneParams.verification === '' && phoneverificationEmpty === true"
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
        </i-form>
      </div>
      <div slot="footer" class="footer">
        <Button type="ghost" size="large" @click="visibleModal = false">取消</Button>
        <Button type="primary" size="large" @click="saveBindMobile">确定</Button>
      </div>
    </Modal>
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
import BCrumb from "../../components/BCrumb";
import Toast from "../../components/popup/Toast";
import VueCropper from "vue-cropper";
import { city } from "../../assets/conf/city.conf";
import { User, NewLogin } from "../../API/api";
import Loading from "../../components/popup/Loading";
import defaultAvatar from "../../assets/images/avatar.jpg";
import SubHeader from "../../components/SubHeader";
export default {
  name: "",
  components: { SubHeader, Loading, Toast, BCrumb, VueCropper },
  computed: {
    hidePhoneErrorTips() {
      return (
        /^1[3456789]\d{9}$/.test(this.bindPhoneParams.mobile) ||
        this.bindPhoneParams.mobile === ""
      );
    },
    showPhoneErrorTips() {
      return /^1[3456789]\d{9}$/.test(this.bindPhoneParams.mobile);
    }
  },
  data() {
    return {
      crumb: [{ label: "个人中心" }, { label: "个人信息管理" }],
      selectedCity: [],
      isLoading: false,
      info: {
        mobile: "",
        wechart: "",
        address: "",
        bankName: "",
        bankCardId: "",
        province: null, // 省
        city: null, // 市
        area: null // 区
      },
      citys: [],
      previews: {},
      previewImg: null,
      toastMsg: null,
      toastState: null,
      isToast: false,
      avatar:
        JSON.parse(localStorage.getItem("userInfo")).headPic || defaultAvatar,
      defaultAvatar: JSON.parse(localStorage.getItem("userInfo")).headPic,
      visibleModal: false,
      captchaCodeUrl: "",
      bindPhoneParams: {
        mobile: "",
        captchaCode: "",
        verification: ""
      },
      phoneEmpty: false,
      phonecaptchaCodeEmpty: false,
      phoneverificationEmpty: false,
      restSecond: 0,
      phoneText: "",
      mobileAccount: ""
    };
  },
  created() {
    this.getUserInfo(true);
  },
  mounted() {},
  methods: {
    refreshModal() {
      this.bindPhoneParams = {
        mobile: "",
        captchaCode: "",
        verification: ""
      };
      this.phoneEmpty = false;
      this.phonecaptchaCodeEmpty = false;
      this.phoneverificationEmpty = false;
      this.restSecond = 0;
      this.captchaCodeUrl = "";
    },
    changePhone(text) {
      this.phoneText = text;
      this.visibleModal = true;
      this.$nextTick(() => {
        this.bindPhoneParams.mobile = this.info.mobile;
      });
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
        typeId: 4, //注册
        mobile: this.bindPhoneParams.mobile,
        captchaCode: this.bindPhoneParams.captchaCode
      };

      let hasWrite = true;

      this.phoneEmpty = true;
      this.phonecaptchaCodeEmpty = true;

      if (
        this.bindPhoneParams.mobile === "" ||
        this.bindPhoneParams.captchaCode === ""
      )
        hasWrite = false;

      if (hasWrite) {
        this.$http
          .post(
            NewLogin.captchacodecheck,
            this.qs.stringify({
              captchaCode: this.bindPhoneParams.captchaCode
            }),
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
    saveBindMobile() {
      let canSave = true;

      this.phoneEmpty = true;
      this.phonecaptchaCodeEmpty = true;
      this.phoneverificationEmpty = true;

      if (
        this.bindPhoneParams.mobile === "" ||
        this.bindPhoneParams.captchaCode === "" ||
        this.phoneverificationEmpty === ""
      )
        canSave = false;

      if (canSave) {
        this.$http
          .post(
            NewLogin.userbindaccount,
            this.qs.stringify(this.bindPhoneParams),
            {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            }
          )
          .then(res => {
            if (res.data.retCode === 0) {
              switch (this.phoneText) {
                case "绑定":
                  this.toastMsg = "手机号绑定成功";
                  break;
                case "认证":
                  this.toastMsg = "手机号认证成功";
                  break;
                case "修改":
                  this.toastMsg = "手机号修改成功";
                  break;
              }
              this.isToast = true;
              this.info.mobile = this.bindPhoneParams.mobile;
              this.visibleModal = false;
              this.getUserInfo(true);
            } else {
              this.isToast = true;
              this.toastMsg = res.data.retMsg;
            }
            setTimeout(() => {
              this.isToast = false;
              this.toastMsg = "";
            }, 1500);
          });
      }
    },
    getCity() {
      this.citys = city;
      // item.loading = true
      // setTimeout(() => {
      //   this.citys = city
      //   item.loading = false
      //   // callback()
      // }, 500)
    },
    save() {
      this.isLoading = true;
      let canSave = true;
      for (let key in this.info) {
        let _v = this.info[key];
        if (_v && _v.indexOf("*") >= 0) {
          delete this.info[key];
        }
      }
      if (this.info.mobile && !/^\d{11}$/.test(this.info.mobile)) {
        this.isToast = true;
        this.toastMsg = "手机号码为11位数字";
        canSave = false;
      }
      if (this.info.bankCardId && !/^\d+$/.test(this.info.bankCardId)) {
        this.isToast = true;
        this.toastMsg = "银行卡号只能是数字";
        canSave = false;
      }
      if (!canSave) {
        this.isLoading = false;
        setTimeout(() => {
          this.isToast = false;
          this.toastMsg = null;
        }, 1500);
        return;
      }
      this.$http
        .post(User.saveInfo, this.qs.stringify(this.info), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          let _data = res.data;
          this.isLoading = false;
          if (_data.retCode === 0) {
            this.isToast = true;
            this.toastMsg = "保存成功";
            this.toastState = "success";
          } else {
            this.isToast = true;
            this.toastMsg = _data.retMsg;
            this.toastState = null;
          }
          setTimeout(() => {
            this.isToast = null;
            this.toastMsg = null;
            this.toastState = null;
            if (_data.retCode === 100014) {
              this.$cookie.delete("token");

              this.$router.push("/");
            }
            if (_data.retCode === 0) {
              this.getUserInfo();
            }
          }, 1500);
        });
    },
    changeCity(vArr) {
      this.info.province = vArr[0];
      this.info.city = vArr[1];
      this.info.area = vArr[2];
    },
    getUserInfo(needCity) {
      this.isLoading = true;
      this.$http
        .post(User.myInfo, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          if (needCity) {
            this.getCity();
          }
          this.isLoading = false;
          let _data = res.data;
          if (_data.retCode === 0) {
            this.mobileAccount = _data.retData.mobileAccount;
            this.avatar = _data.retData.headPic || defaultAvatar;
            this.info.mobile = _data.retData.mobile;
            this.info.wechart = _data.retData.wechart;
            this.info.address = _data.retData.address;
            this.info.bankName = _data.retData.bankName;
            this.info.bankCardId = _data.retData.bankCardId;
            this.info.province = _data.retData.province;
            this.info.city = _data.retData.city;
            this.info.area = _data.retData.area;
            this.selectedCity = [
              _data.retData.province,
              _data.retData.city,
              _data.retData.area
            ];
          } else {
            this.isToast = true;
            this.toastMsg = _data.retMsg;
          }
          setTimeout(() => {
            this.isToast = false;
            this.toastMsg = null;
            if (_data.retCode === 100014) {
              this.$cookie.delete("token");

              this.$router.push("/");
            }
          }, 1500);
        });
    },
    uploadAvatar() {
      let avatar = {
        myPic: this.avatar
      };
      this.isLoading = true;
      this.$http
        .post(User.uploadAvatar, this.qs.stringify(avatar), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.isLoading = false;
          let _data = res.data;
          if (_data.retCode === 0) {
            this.isToast = true;
            this.toastMsg = "上传成功";
            this.toastState = "success";
            this.previewImg = null;
          } else {
            this.isToast = true;
            this.toastMsg = _data.retMsg;
            this.toastState = null;
          }
          setTimeout(() => {
            this.isToast = false;
            this.toastMsg = null;
            this.toastState = null;
            if (_data.retCode === 100014) {
              this.$cookie.delete("token");

              this.$router.push("/");
            }
          }, 1500);
        });
    },
    cancelAvatar() {
      this.previewImg = null;
      this.avatar = this.defaultAvatar;
    },
    selectImg(e) {
      let file = e.target.files[0];
      if (this.checkOverSize(file.size)) {
        return;
      }
      let reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.previewImg = data;
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    checkOverSize(size) {
      let isOver = false;
      if (size / 1024 > 800) {
        this.isToast = true;
        this.toastMsg = "文件大小超过800K限制";
        setTimeout(() => {
          this.isToast = false;
          this.toastMsg = null;
          this.toastState = null;
        }, 1500);
        isOver = true;
      }
      return isOver;
    },
    realTime(data) {
      this.$refs.cropper.getCropData(data => {
        this.avatar = data;
      });
    }
  },
  watch: {
    visibleModal(bol) {
      if (bol) {
        this.refreshModal();
        this.getCaptchaCode();
      }
    }
  }
};
</script>

<style lang="less">
.user-center {
  .mobile {
    margin-bottom: 20px;
    font-size: 14px;
    div {
      &:first-child {
        font-weight: bold;
      }
    }
    .opreate {
      color: #2d8ef8;
      margin-top: 5px;
      display: inline-block;
    }
    span {
      margin-right: 50px;
    }
  }
}

.user-center-modal {
  .header {
    text-align: center;
    font-size: 20px;
  }

  .content {
    padding: 30px 40px;
    font-size: 14px;
    .ivu-form-item-label {
      font-size: 14px;
      margin-top: 10px;
      margin-bottom: 5px;
    }
    .item {
      position: relative;

      .ivu-input {
        height: 40px;
        font-size: 14px;
      }
      .error-tips {
        position: absolute;
        color: #e02020;
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
        margin-left: 10px;
        font-size: 15px;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    .ivu-btn {
      width: 120px;
      height: 48px;
    }
  }
}
</style>


<style scoped lang="less">
.profile-box {
  padding: 60px 30px;
}
.avatar-box {
  margin-bottom: 60px;
  display: flex;
  justify-content: left;
  align-items: center;
  p {
    margin-left: 16px;
  }
}
.user-avatar {
  width: 100px;
  height: 100px;
  position: relative;
  border-radius: 100%;
  overflow: hidden;
  img {
    max-width: 100%;
  }
  &:hover {
    .upload-mask {
      display: flex;
    }
  }
  .upload-mask {
    display: none;
    border-radius: 100%;
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    width: 100%;
    justify-content: center;
    align-items: center;
    color: #ced4da;
    background-color: rgba(52, 58, 64, 0.7);
    cursor: pointer;
    font-weight: bold;
  }
}
#selectImg {
  position: absolute;
  opacity: 0;
}
#cropper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  /*height: 600px;*/
  z-index: 7;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  .crop-box {
    height: 500px;
  }
}
</style>
