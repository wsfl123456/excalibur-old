<template>
  <div class="find-password">
    <div class="content">
      <div class="logo">
        <img src="../../assets/svg/logo3.svg" alt>
      </div>
      <div class="box">
        <Tabs :animated="false">
          <TabPane label="手机找回密码" name="phone">
            <phone-find></phone-find>
          </TabPane>

          <TabPane label="邮箱找回密码" name="email">
              <email-find></email-find>
          </TabPane>
        </Tabs>
        <div class="go-login">
          <a href="javascript:;" @click="$router.push({ name: 'login' })">
            <span>返回登录</span>
            <img src="../../assets/images/ic_right_circle.svg" width="18" alt>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PhoneFind from "./phoneFind";
import EmailFind from "./emailFind"
export default {
  components: {
    PhoneFind,
    EmailFind,
  }
};
</script>

<style lang="less">
.find-password {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-image: url("../../assets/images/find_password.png");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  .content {
    position: absolute;
    width: 40vw;
    min-width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    .logo {
      text-align: center;
      img {
        height: 4vw;
        min-height: 40px;
      }
    }
    .box {
      margin-top: 25px;
      padding-bottom: 30px;
      background-color: #fff;
      border-radius: 12px;
      .go-login {
        margin-top: 20px;
        text-align: center;
        font-size: 14px;
        span,
        img {
          vertical-align: middle;
        }
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
          width: 50%;
          text-align: center;
          margin-right: 0;
          padding: 15px 0;
        }
        .ivu-tabs-tab-focused {
          border-bottom: 3px solid #2d8cf0;
        }
      }
      .ivu-input {
        border-radius: 24px;
        height: 40px;
        padding-left: 50px;
        font-size: 14px;
      }
    }
  }
}
</style>

