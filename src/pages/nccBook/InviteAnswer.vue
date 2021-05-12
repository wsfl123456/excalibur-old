
<template>
  <div class="invite-answer">
    <div class="invite-answer__area">
      <div class="invite-answer__area__header">
        <h4>你可以邀请以下用户，快速获得回答</h4>
        <div>
          <el-input
            placeholder="搜索你想要邀请的人"
            suffix-icon="el-icon-search"
            v-model="searchValue"
            @input="searchInput"
          >
          </el-input>
          <i class="el-icon-close" @click="$emit('update:inviteQuestionId', null)"></i>
        </div>
      </div>
      <div class="invite-answer__area__body">
        <div v-for="(i, k) in searchUser" :key="k">
          <div class="left">
            <member-header
              :user="{
                id: i.id,
                name: i.englishName,
                headPic: i.headPic,
              }"
              size="large"
            ></member-header>
            <div class="user">
              <span>{{ i.englishName }}</span>
              <span>{{ i.teamName }}</span>
            </div>
          </div>
          <div class="right" @click="invite(i.id)">邀请回答</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Index, NccBook } from "@/API/api";
import MemberHeader from "../../components/popup/MemberHeader";
import { Message } from "element-ui";

export default {
  name: "VisibleInvite",
  components: { MemberHeader },
  props: {
    inviteQuestionId: {
      type: Number || null,
    },
  },
  data() {
    return {
      allUser: [],
      searchUser: [],
      searchValue: "",
    };
  },
  async created() {
    await Promise.all([
      (async () => {
        const {
          data: {
            retData: { data },
          },
        } = await this.getAllUser();
        this.allUser = data;
        this.searchInput("");
      })(),
    ]);
  },
  methods: {
    getAllUser() {
      return this.$http.post(Index.allUsers, this.qs.stringify(), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") },
      });
    },
    searchInput(e) {
      const reg = new RegExp(e, "ig");
      this.searchUser = this.allUser.filter((e) => reg.test(e.englishName));
    },
    async invite(userAttend) {
      const params = {
        tiwenId: this.inviteQuestionId,
        userAttend, // 多个使用,分割
      };
      const {
        data: { retMsg, retCode },
      } = await this.$http.post(NccBook.tiweninvit, this.qs.stringify(params), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") },
      });

      if (+retCode === 0) {
        Message.success({
          message: "邀请成功",
        });
      } else {
        Message.error({
          message: retMsg,
        });
      }
    },
  },
};
</script>