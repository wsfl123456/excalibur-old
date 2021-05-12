<template>
  <div>
    <i-form label-position="left" :label-width="88" class="default-form">
      <!-- 基础信息 -->
      <div class="form-group">
        <div v-if="isDisplay">
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="编辑时间" class="default-form-item">
                <i-input v-model="verTime" readonly></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="需求类型" class="default-form-item" :required="!isDisplay">
                <i-input v-model="formValue.type" :readonly="isDisplay" placeholder="请输入需求类型"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div style="position:relative">
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="任务资料" class="default-form-item">
                <i-input
                  v-model="formValue.material"
                  :readonly="isDisplay"
                  placeholder="填写任务资料附件名称"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
              <template v-for="(tipsItem, index) in tips">
                <div v-if="tipsItem.name == '任务资料'" class="group-tips" :key="index">
                  <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
                  <div class="tips-pop">
                    <div class="tips-head">
                      {{tipsItem.name}}
                      <router-link :to="'/study/tips/' + tipsItem.tipsId" target="_blank">
                        <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                      </router-link>
                    </div>
                    <div class="tips-body">
                      <div v-html="tipsItem.content"></div>
                    </div>
                  </div>
                </div>
              </template>
        </div>
        <div v-if="!isDisplay">
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="公盘地址" class="default-form-item">
                <i-input
                  v-model="formValue.address"
                  placeholder="上传到公盘后粘贴地址 格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
           <template v-for="(tipsItem, index) in tips">
                <div v-if="tipsItem.name == '公盘地址'" class="group-tips"  :key="index">
                  <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
                  <div class="tips-pop">
                    <div class="tips-head">
                      {{tipsItem.name}}
                      <router-link :to="'/study/tips/' + tipsItem.tipsId" target="_blank">
                        <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                      </router-link>
                    </div>
                    <div class="tips-body">
                      <div v-html="tipsItem.content"></div>
                    </div>
                  </div>
                </div>
              </template>
        </div>
        <div v-else>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="公盘地址" class="default-form-item">
                <div class="default-form-member-selection">
                  <a :href="formValue.address" target="_blank">{{formValue.address}}</a>
                </div>
              </FormItem>
            </i-col>
          </Row>
           <template v-for="(tipsItem, index) in tips">
                <div v-if="tipsItem.name == '公盘地址'" class="group-tips"  :key="index">
                  <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
                  <div class="tips-pop">
                    <div class="tips-head">
                      {{tipsItem.name}}
                      <router-link :to="'/study/tips/' + tipsItem.tipsId" target="_blank">
                        <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                      </router-link>
                    </div>
                    <div class="tips-body">
                      <div v-html="tipsItem.content"></div>
                    </div>
                  </div>
                </div>
              </template>
        </div>
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="备注" class="default-form-item" >
                <i-input v-model="formValue.remark" :readonly="isDisplay" placeholder="请输入备注"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
      </div>
    </i-form>
  </div>
</template>
<script>
export default {
  props: {
    verTime: {},
    formValue: {
      type: [Object, Array],
      default: function() {
        return {};
      }
    },
    isDisplay: {
      type: [Boolean]
    },
    tips: {}
  }
};
</script>

