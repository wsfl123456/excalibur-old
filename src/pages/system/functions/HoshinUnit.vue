<template>
  <div>
    <div class="addBtn g-ta-r g-mb-32">
      <Button type="primary" @click="addUnit">
        <Icon type="plus-circled" size="20"></Icon>新增事业部
      </Button>
    </div>

    <div class="result-list">
      <div class="process-type">
        <ButtonGroup size="large">
          <Button
            v-for="(item, idx) in unitList"
            :key="item.id"
            :class="{active: currUnit === item.id}"
            @click="selectUnit(item.id)"
          >
            <template v-if="isEdit && currUnit === item.id">
              <i-input v-model="unitDetail.name" placeholder="事业部名称"></i-input>
            </template>
            <template v-else>{{item.name}}</template>
          </Button>
        </ButtonGroup>
      </div>
      <div class="detail">
        <loading v-if="isLoading"></loading>
        <div v-if="unitDetail">
          <div class="g-ta-r g-mb-16">
            <Button type="primary" size="large" @click="toggleEdit">{{isEdit ? '保存' : '编辑'}}</Button>
            <Button type="primary" size="large" @click="delUnitConfirm">删除</Button>
            <Button v-if="isEdit" type="primary" size="large" @click="cancelEdit">取消</Button>
          </div>
          <i-form label-position="left" :label-width="140" class="default-form">
            <div class="form-group">
              <div>
                <FormItem label="事业部类型" class="default-form-item">
                  <Select v-model="unitDetail.type" placeholder="选择事业部类型" :disabled="!isEdit"  class="display-select">
                    <Option value='1' >SHU</Option>
                    <Option value='2' >IHU</Option>
                  </Select>
                </FormItem>
              </div>
              <div>
                <FormItem label="事业部介绍" class="default-form-item">
                  <i-input
                    type="textarea"
                    v-model="unitDetail.description"
                    placeholder="填写事业部介绍"
                    :readonly="!isEdit"
                  ></i-input>
                </FormItem>
              </div>
              <div>
                <Row>
                  <i-col span="12" class="default-form-member-col">
                    <FormItem label="事业部Captain" class="default-form-item">
                      <div class="default-form-member-selection">
                        <common-member-ii
                          content="选择事业部Captain"
                          :is-edit="isEdit"
                          :users="[unitDetail.captain]"
                          @on-change="selectMember($event, 'captain')"
                        ></common-member-ii>
                      </div>
                    </FormItem>
                  </i-col>
                  <i-col span="12" class="default-form-member-col">
                    <FormItem label="事业部Chief Mate" class="default-form-item">
                      <div class="default-form-member-selection">
                        <common-member-ii
                          content="选择事业部Chief Mate"
                          :is-edit="isEdit"
                          :users="[unitDetail.chiefMate]"
                          @on-change="selectMember($event, 'chiefmate')"
                        ></common-member-ii>
                      </div>
                    </FormItem>
                  </i-col>
                </Row>
              </div>
              <div>
                <FormItem label="事业部成员" class="default-form-item">
                  <div class="default-form-member-selection">
                    <common-member-ii
                      content="选择事业部成员"
                      :is-edit="isEdit"
                      multi
                      :users="unitDetail.member_list"
                      @on-change="selectMember($event, 'member')"
                    ></common-member-ii>
                  </div>
                </FormItem>
              </div>
              <div>
                <FormItem label="事业部资料地址" class="default-form-item">
                  <i-input v-model="unitDetail.fileUrl" placeholder="填写事业部资料地址" :readonly="!isEdit"></i-input>
                </FormItem>
              </div>
              <div>
                <FormItem label="事业部工作说明地址" class="default-form-item">
                  <i-input
                    v-model="unitDetail.workUrl"
                    placeholder="填写事业部工作说明地址"
                    :readonly="!isEdit"
                  ></i-input>
                </FormItem>
              </div>
              <div>
                <Row>
                  <i-col span="12" class="default-form-member-col">
                    <FormItem label="事业部年度目标营收" class="default-form-item">
                      <i-input
                        v-model="unitDetail.target"
                        placeholder="填写事业部介绍"
                        :readonly="!isEdit"
                      ></i-input>
                    </FormItem>
                  </i-col>
                  <i-col span="12" class="default-form-member-col">
                    <FormItem label="事业部年度目标利润" class="default-form-item">
                      <i-input
                        v-model="unitDetail.profit"
                        placeholder="填写事业部介绍"
                        :readonly="!isEdit"
                      ></i-input>
                    </FormItem>
                  </i-col>
                </Row>
              </div>
            </div>
          </i-form>
        </div>
      </div>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
    <Modal
      v-model="isModalDel"
      ok-text="确定"
      cancel-text="取消"
      title="删除确认"
      @on-ok="delUnit"
      :closable="false"
    >
      <p>确定删除事业部？</p>
    </Modal>
  </div>
</template>

<script>
import BCrumb from "../../../components/BCrumb";
import { Hoshin } from "../../../API/api";
import Loading from "../../../components/popup/Loading";
import Toast from "../../../components/popup/Toast";
import CommonMemberIi from "../../../components/CommonMemberii";
export default {
  name: "",
  components: { CommonMemberIi, Toast, Loading, BCrumb },
  data() {
    return {
      crumb: [
        { label: "系统设置 " },
        { label: "功能配置管理" },
        { label: "公司事业部设置" }
      ],
      groupName: "",
      unitList: [],
      unitDetail: null,
      currUnit: null,
      isLoading: false,
      isToast: false,
      toastMsg: null,
      toastState: null,
      isEdit: false,
      isModal: false,
      editId: null,
      isModalDel: false,
      modalType: ""
    };
  },
  methods: {
    selectMember(v, key) {
      switch (key) {
        case "captain":
          this.unitDetail.captain = v;
          break;
        case "chiefmate":
          this.unitDetail.chiefMate = v;
          break;
        case "member":
          this.unitDetail.member_list = v;
          break;
      }
    },
    cancelEdit() {
      this.isEdit = false;
      if (this.currUnit === "new_add") {
        this.unitList.pop();
      }
      this.currUnit = null;
      this.unitDetail = null;
    },
    toggleEdit() {
      if (this.isEdit) {
        if (this.currUnit === "new_add") {
          let _data = {
            type : this.unitDetail.type,
            name: this.unitDetail.name,
            description: this.unitDetail.description,
            fileUrl: this.unitDetail.fileUrl,
            workUrl: this.unitDetail.workUrl,
            target: this.unitDetail.target,
            profit: this.unitDetail.profit
          };
          _data.captainId = this.unitDetail.captain.id;
          _data.chiefMateId = this.unitDetail.chiefMate.id;
          _data.members = this.unitDetail.member_list.map(item => {
            return item.id;
          });
          if (!_data.name) {
            this.isToast = true;
            this.toastMsg = "请填写事业部名称";
            setTimeout(() => {
              this.toastMsg = null;
              this.toastState = null;
              this.isToast = false;
            }, 1500);
            return;
          } else if (!_data.type) {
            this.isToast = true;
            this.toastMsg = "请选择事业部类型";
            setTimeout(() => {
              this.toastMsg = null;
              this.toastState = null;
              this.isToast = false;
            }, 1500);
            return;
          } else if (!_data.description) {
            this.isToast = true;
            this.toastMsg = "请填写事业部介绍";
            setTimeout(() => {
              this.toastMsg = null;
              this.toastState = null;
              this.isToast = false;
            }, 1500);
            return;
          } else if (!_data.captainId) {
            this.isToast = true;
            this.toastMsg = "请选择Captain";
            setTimeout(() => {
              this.toastMsg = null;
              this.toastState = null;
              this.isToast = false;
            }, 1500);
            return;
          } else if (
            _data.members.indexOf(_data.captainId) !== -1 ||
            _data.members.indexOf(_data.chiefMateId) !== -1
          ) {
            this.isToast = true;
            this.toastMsg = "事业部成员不能包含 Captain 或 Chief Mate";
            setTimeout(() => {
              this.toastMsg = null;
              this.toastState = null;
              this.isToast = false;
            }, 1500);
            return;
          }

          this.$http
            .post(Hoshin.add, this.qs.stringify(_data), {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            })
            .then(res => {
              const _data = res.data;
              this.isToast = true;
              if (_data.retCode === 0) {
                this.toastMsg = "保存成功";
                this.toastState = "success";
                this.getAllUnit();
                this.currUnit = _data.retData.id;
                this.getUnitDetail(_data.retData.id);
              } else {
                this.toastMsg = _data.retMsg;
                this.toastState = null;
              }
              setTimeout(() => {
                this.toastMsg = null;
                this.toastState = null;
                this.isToast = false;
                if (_data.retCode === 100014) {
                  this.$cookie.delete("token");
                  this.$router.push("/");
                }
              }, 1500);
            });
        } else {
          let _data = {
            id: this.unitDetail.id,
            type: this.unitDetail.type,
            name: this.unitDetail.name,
            description: this.unitDetail.description,
            fileUrl: this.unitDetail.fileUrl,
            workUrl: this.unitDetail.workUrl,
            target: this.unitDetail.target,
            profit: this.unitDetail.profit
          };
          _data.captainId = this.unitDetail.captain.id;
          _data.chiefMateId = this.unitDetail.chiefMate.id ? this.unitDetail.chiefMate.id : '';
          _data.members = this.unitDetail.member_list.map(item => {
            return item.id;
          });
          if (!_data.name) {
            this.isToast = true;
            this.toastMsg = "请填写事业部名称";
            setTimeout(() => {
              this.toastMsg = null;
              this.toastState = null;
              this.isToast = false;
            }, 1500);
            return;
          } else if (!_data.description) {
            this.isToast = true;
            this.toastMsg = "请填写事业部介绍";
            setTimeout(() => {
              this.toastMsg = null;
              this.toastState = null;
              this.isToast = false;
            }, 1500);
            return;
          } else if (!_data.captainId) {
            this.isToast = true;
            this.toastMsg = "请选择Captain";
            setTimeout(() => {
              this.toastMsg = null;
              this.toastState = null;
              this.isToast = false;
            }, 1500);
            return;
          } else if (
            _data.members.indexOf(_data.captainId) !== -1 ||
            _data.members.indexOf(_data.chiefMateId) !== -1
          ) {
            this.isToast = true;
            this.toastMsg = "事业部成员不能包含 Captain 或 Chief Mate";
            setTimeout(() => {
              this.toastMsg = null;
              this.toastState = null;
              this.isToast = false;
            }, 1500);
            return;
          }

          this.$http
            .post(Hoshin.edit, this.qs.stringify(_data), {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            })
            .then(res => {
              const _data = res.data;
              this.isToast = true;
              if (_data.retCode === 0) {
                this.toastMsg = "保存成功";
                this.toastState = "success";
                this.getAllUnit();
                this.getUnitDetail(this.currUnit);
              } else {
                this.toastMsg = _data.retMsg;
                this.toastState = null;
              }
              setTimeout(() => {
                this.toastMsg = null;
                this.toastState = null;
                this.isToast = false;
                if (_data.retCode === 100014) {
                  this.$cookie.delete("token");
                  this.$router.push("/");
                }
              }, 1500);
            });
        }
      }
      this.isEdit = !this.isEdit;
    },
    selectUnit(id) {
      if (this.currUnit === id) {
        return;
      }
      this.isEdit = false;
      this.currUnit = id;
      this.getUnitDetail(id);
    },
    addUnit() {
      const titTpl = {
        id: "new_add",
        name: "事业部名称"
      };
      const newDetail = {
        type: "",
        name: "",
        description: "",
        fileUrl: "",
        workUrl: "",
        captainId: null,
        captain: {},
        chiefMateId: null,
        chiefMate: {},
        target: null,
        profit: null,
        members: [],
        member_list: []
      };
      this.unitList.push(titTpl);

      this.editId = titTpl.id;
      this.currUnit = titTpl.id;
      this.isEdit = true;
      this.unitDetail = newDetail;
    },
    save() {},
    getAllUnit() {
      this.$http
        .post(Hoshin.list, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          let _data = res.data;
          if (_data.retCode === 0) {
            this.unitList = _data.retData.data;
            // this.getUnitDetail()
          }
        });
    },
    getUnitDetail(id) {
      this.isLoading = true;
      this.$http
        .post(Hoshin.detail, this.qs.stringify({ id: id }), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.isLoading = false;
          let _data = res.data;
          if (_data.retCode === 0) {
            this.unitDetail = _data.retData;
            this.unitDetail.type = String(this.unitDetail.type)
            if (!this.unitDetail.chiefMate.id) [
              this.unitDetail.chiefMate = {}
            ]
          }
        });
    },
    delUnit() {
      this.$http
        .post(Hoshin.del, this.qs.stringify({ id: this.currUnit }), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          this.isToast = true;

          if (_data.retCode === 0) {
            this.toastMsg = "删除成功";
            this.toastState = "success";
            this.getAllUnit();
            this.currUnit = null;
            this.unitDetail = null;
          } else {
            this.toastMsg = _data.retMsg;
            this.toastState = null;
          }
          setTimeout(() => {
            this.toastMsg = null;
            this.toastState = null;
            this.isToast = false;
          }, 1500);
        });
    },
    delUnitConfirm() {
      this.isModalDel = true;
    }
  },
  created() {
    this.getAllUnit();
  }
};
</script>

<style scoped lang="less">
.process-type {
  /*border-bottom: 1px solid #cccccc;*/
}
.ivu-btn-group {
  .ivu-btn {
    &.active {
      background-color: #2d8ef8;
      color: #fff;
    }
  }
}
.detail {
  position: relative;
  min-height: 300px;
  margin-top: 32px;
}
.process-detail-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .select-member {
    display: inline-block;
  }
  .add-auditor-node {
    margin-left: 36px;
  }
  span {
    margin-right: 16px;
  }
}
.default-form-tags {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  .tags-add-tip {
    line-height: 1;
    margin-left: 16px;
    cursor: pointer;
    .tags-add {
      line-height: 1;
    }
  }
  .default-form-tag {
    display: inline-block;
    padding: 0px 10px;
    background-color: #2d8ef8;
    color: #fff;
    margin: 5px;
    position: relative;
    span {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(30%, -30%);
      background-color: red;
      text-align: center;
      width: 12px;
      height: 12px;
      line-height: 12px;
      border-radius: 100%;
    }
    .del-tag-icon {
      line-height: 1;
    }
  }
}
</style>