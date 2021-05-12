<template>
  <div>
    <div class="member" v-if="user.name">
      <Poptip trigger="hover" @on-popper-show="getUserInfo" width="300">
        <Avatar
          :icon="user.name ? '' : 'person'"
          :src="user.headPic"
          :size="size"
        >{{user.name ? user.name.substr(0, 2) : ''}}</Avatar>
        <div slot="title">
          <div class="selected-member-detail g-flex">
            <div class>
              <h3>{{userInfo.englishName}} - {{userInfo.positionName}}</h3>
              <p>Email: {{userInfo.companyEmail}}</p>
            </div>
          </div>
          <Spin fix v-if="!Object.keys(this.userInfo).length">
            <Icon type="load-c" size="40" class="position-chart-load"></Icon>
          </Spin>
        </div>
      </Poptip>
    </div>
  </div>
</template>

<script>
import { Hr } from "../../API/api.js";

export default {
  name: "depart-member",
  props: {
    user: {
      type: Object,
      default: function() {
        return {};
      }
    },
    size: {
      type: String,
      default: function() {
        return "default"
      }
    }
  },
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {
    getUserInfo() {
      if (this.user.id) this.$http
        .post(Hr.detailBasic, this.qs.stringify({ id: this.user.id }), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.userInfo = res.data.retData;
        });
    }
  }
};
</script>

<style scoped lang="less">
.member {
  display: inline-block;
  text-align: center;
  // margin-top: 5px;
  vertical-align: top;
  p {
    word-break: break-all;
    word-wrap: break-word;
  }
}
.selected-member-detail {
  white-space: normal;
  .ivu-avatar {
    margin-right: 12px;
  }
  h2 {
    color: #343a40;
    font-size: 18px;
    font-weight: normal;
    font-family: Abel;
  }
  p {
    color: #343a40;
    font-size: 10px;
    font-family: Abel;
  }
}
</style>
