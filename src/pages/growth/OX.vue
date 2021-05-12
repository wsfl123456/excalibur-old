<template>
  <div>
    <div class="g-mb-32">
      <i-input placeholder="请输入查询姓名" v-model="searchValue" @on-keydown="searchUser">
        <span slot="prepend">
          <Icon type="ios-search-strong" size="20"></Icon>
        </span>
      </i-input>
    </div>
    <Tabs type="card" :animated="false" v-model="activeTab">
      <template v-for="(item, index) in oxshow">
        <template v-if="index == 0">
          <TabPane :label="item.title" :name="item.title" :key="index">
            <Tabs type="card" :animated="false" v-model="activeDepartTab">
              <TabPane
                v-for="_item in item.item"
                :key="_item.id"
                :label="_item.title"
                :name="_item.title"
              >
                <div class="depart-inner">
                  <ul class="rank-list">
                    <li v-for="_item_ in _item.item" :key="_item_.id" class="depart">
                      <div class="depart-position">
                        <span>{{_item_.title || '未设定'}}</span>
                      </div>
                      <div class="depart-member">
                        <depart-member :users="_item_.item"></depart-member>
                      </div>
                    </li>
                  </ul>
                </div>
              </TabPane>
            </Tabs>
          </TabPane>
        </template>
        <template v-else-if="index == 1">
          <TabPane :label="item.title" :name="item.title" :key="index">
            <Tabs type="card" :animated="false" v-model="activeCollegeTab">
              <TabPane
                v-for="_item in item.item"
                :key="_item.id"
                :label="_item.title"
                :name="_item.title"
              >
                <div class="depart-inner">
                  <ul class="rank-list">
                    <li v-for="_item_ in _item.item" :key="_item_.id" class="depart">
                      <div class="depart-position">
                        <span>{{_item_.title || '未设定'}}</span>
                      </div>
                      <div class="depart-member">
                        <depart-member :users="_item_.item"></depart-member>
                      </div>
                    </li>
                  </ul>
                </div>
              </TabPane>
            </Tabs>
          </TabPane>
        </template>
      </template>
    </Tabs>
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>
</template>

<script>
import { Growth, Task } from "../../API/api";
import BCrumb from "../../components/BCrumb";
import Loading from "../../components/popup/Loading";
import Toast from "../../components/popup/Toast";
import DepartMember from "../../components/DepartMember";
export default {
  components: {
    DepartMember,
    Toast,
    Loading,
    BCrumb
  },
  name: "ox",
  data() {
    return {
      isLoading: false,
      isToast: false,
      toastMsg: null,
      searchValue: "",
      allDepart: [],
      myDepart: {},
      selectedDepart: [],
      isInnerLoading: false,
      allTabs: "",
      oxshow: [],
      activeTab: "事业部",
      activeDepartTab: "SHU",
      activeCollegeTab: "技术"
    };
  },
  methods: {
    searchUser(e) {
      if (e.keyCode === 13) {
        let reg = new RegExp(this.searchValue, "i");
        let noName = true;
          try {
            this.oxshow[0].item.forEach(element => {
              element.item.forEach(ele => {
                ele.item && ele.item.forEach(userInfo => {
                  if (reg.test(userInfo.englishName)) {
                    noName = false;
                    this.activeDepartTab = element.title;
                    throw new Error("brack");
                  }
                });
              });
            });
          } catch (err) {}
          try {
            this.oxshow[1].item.forEach(element => {
              element.item.forEach(ele => {
                ele.item && ele.item.forEach(userInfo => {
                  if (reg.test(userInfo.englishName)) {
                    noName = false;
                    this.activeCollegeTab = element.title;
                    throw new Error("brack");
                  }
                });
              });
            });
          } catch (err) {}

        if (noName) {
          this.isToast = true;
          this.toastMsg = "该员工不存在";
          setTimeout(() => {
            this.isToast = false;
            this.toastMsg = null;
          }, 1500);
        }
      }
    },
    changeAll(v) {
      if (!this.selectedDepart[v]) {
        this.isInnerLoading = true;
        this.$http
          .post(Growth.OX, this.qs.stringify({ id: +v }), {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          })
          .then(res => {
            this.isInnerLoading = false;
            let _data = res.data;
            if (_data.retCode === 0) {
              this.selectedDepart[v] = _data.retData.data;
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
      }
    },
    getOxshow() {
      this.$http
        .post(Task.oxshow, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.oxshow = res.data.retData.oxdata;
        });
    },
    // allPosts () {
    //   this.isLoading = true
    //   let allPost = [this.getOX(), this.getAllDepart()]
    //   this.$http.all(allPost).then(this.$http.spread((myDepart, allDepart) => {
    //     this.isLoading = false
    //     let _myDepart = myDepart.data
    //     let _allDepart = allDepart.data
    //     if (_myDepart.retCode === 0) {
    //       this.myDepart = _myDepart.retData
    //     } else {
    //       this.isToast = true
    //       this.toastMsg = _myDepart.retMsg
    //     }
    //     if (_allDepart.retCode === 0) {
    //       this.allDepart = _allDepart.retData.data
    //       this.changeAll(this.allDepart[0].id)
    //     } else {
    //       this.isToast = true
    //       this.toastMsg = _allDepart.retMsg
    //     }

    //     setTimeout(() => {
    //       this.isToast = false
    //       this.toastMsg = null
    //       if (_allDepart.retCode === 100014 || _myDepart.retCode === 100014) {
    //         this.$cookie.delete('token')

    //         this.$router.push('/')
    //       }
    //     }, 1500)
    //   }))
    // },
    getAllDepart() {
      return this.$http.post(Growth.departAll, this.qs.stringify({}), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") }
      });
    },
    getOX() {
      return this.$http.post(Growth.OX, this.qs.stringify({}), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") }
      });
    }
  },
  created() {
    this.getOxshow();

    sessionStorage.setItem("subMenu", "OX/list");
    this.$store.dispatch("setCurrSubMenu", "OX/list");
    this.$store.dispatch("setOpenedSub", ["OX"]);
    sessionStorage.setItem("openedSub", '["OX"]');
  }
};
</script>

<style scoped lang="less">
.depart-info {
  border-collapse: collapse;
  width: 100%;
  th {
    padding: 10px;
    text-align: left;
    background-color: #fff9db;
    font-weight: normal;
    border: 1px solid #ced4da;
    width: 150px;
  }
  td {
    padding: 10px;
    border: 1px solid #ced4da;
  }
}

.rank-list {
  li {
    margin-bottom: 16px;
  }
}
.depart-inner {
  position: relative;
  min-height: 300px;
}
.ivu-tabs {
  overflow: visible !important;
}
.depart {
  display: flex;
  .depart-position {
    border: 1px solid #ced4da;
    background-color: #fff9db;
    padding: 5px 20px;
    width: 200px;
    min-height: 55px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .depart-member {
    flex: 1;
    margin-left: 20px;
  }
}
</style>
