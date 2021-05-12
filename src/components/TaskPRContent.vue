<template>
  <div>
    <div class="g-mb-16" v-if="isFromMenu">
      <div>请选择项目信息</div>
      <Row>
        <i-col span="12">
          <Select transfer v-model="idParams.customerId" placeholder="请选择所属品牌" @on-change="getProject"
            style="font-size: 14px;" size="large">
            <Option v-for="(assetItem, key) in customers" :value="assetItem.id" :key="assetItem.id">
              {{ assetItem.customerName }}</Option>
          </Select>
        </i-col>
        <i-col span="12">
          <Select transfer v-model="idParams.projectId" placeholder="请选择所属项目" style="font-size: 14px;" size="large"
            @on-change="changeProject">
            <Option v-for="(assetItem, key) in projects" :value="assetItem.id" :key="assetItem.id">{{ assetItem.name }}
            </Option>
          </Select>
        </i-col>
      </Row>
    </div>
    <div class="g-mb-16">
      <template v-if="!isDisplay">
        添加
      </template>
      任务资料的公盘地址：
    </div>
    <i-form label-position="left" :label-width="88" class="default-form">
      <template v-for="(item, idx) in formValue.info">
        <div class="form-group" :key="idx">
          <FormItem label="结案报告" class="default-form-item" v-if="item.hasOwnProperty('report')">
            <i-input v-if="!isDisplay" v-model="item.report"></i-input>
            <div v-else class="default-form-member-selection">
              <a :href="item.report | parseFileAddress">{{item.report}}</a>
            </div>
          </FormItem>
          <FormItem label="相关物料" class="default-form-item">
            <i-input v-if="!isDisplay" v-model="item.material"></i-input>
            <div v-else class="default-form-member-selection">
              <a :href="item.material | parseFileAddress">{{item.material}}</a>
            </div>
          </FormItem>
        </div>
      </template>
    </i-form>
    <div class="g-ta-r g-mb-16" v-if="!isDisplay">
      <a href="javascript:;" @click="delInfo" v-if="formValue.info.length > 1">
        <Icon type="minus"></Icon>
        删除任务资料
      </a>

      <a href="javascript:;" @click="addInfo" class="ml-16">
        <Icon type="plus"></Icon>
        添加任务资料
      </a>
    </div>
    <div class="g-mb-16" v-if="+toolkitId === 451">
      公关稿的要求：
    </div>
    <i-form label-position="left" :label-width="88" class="default-form">
      <div class="form-group">
        <FormItem label="任务描述" class="default-form-item">
          <i-input :readonly="isDisplay" type="textarea" v-model="formValue.report"
            :autosize="{minRows: 1, maxRows: 7}"></i-input>
        </FormItem>
      </div>
    </i-form>
    <template v-if="+toolkitId === 451">
      <div class="g-mb-16">
        是否需要采买媒体发布：
        <i-switch v-model="formValue.mediaRelease" v-if="!isDisplay">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
        <span v-else>{{formValue.mediaRelease ? '是' : '否'}}</span>
      </div>

      <template v-if="formValue.mediaRelease">
        <div class="g-mb-16">
          采买费用是否含在客户报价中：
          <i-switch v-model="formValue.mediaQuote" v-if="!isDisplay">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
          <span v-else>{{formValue.mediaQuote ? '是' : '否'}}</span>
        </div>
        <i-form v-if="!isDisplay" label-position="left" :label-width="88" class="default-form" v-for="(item, index) in formValue.spotplan"
          :key='index'>
          <div class="form-group">
            <div>
              <Row>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="spotplan执行" class="default-form-item">
                    <div class="default-form-member-selection">
                      <template>
                        <member-add :is-edit="!isDisplay"  content="添加项目成员"
                          @on-change="selectUser($event, 'operationId' , index)"></member-add>
                      </template>
                    </div>
                  </FormItem>
                </i-col>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="任务质检" class="default-form-item">
                    <div class="default-form-member-selection">
                      <template>
                        <member-add :is-edit="!isDisplay"  content="添加项目成员"
                          @on-change="selectUser($event, 'inspectorId', index)"></member-add>
                      </template>
                    </div>
                  </FormItem>
                </i-col>
              </Row>

            </div>

          </div>
          <Row class="form-fn">

            <i-col span="24" class="operation-fn">

              <div class="form-del">
                <a href="javascript:;" @click="removeSpotplan" v-if="formValue.spotplan.length > 1">
                  <Icon type="minus"></Icon>
                  删除spotplan执行
                </a>
              </div>
              <div class="form-add">
                <!--<a href="javascript:;" @click="removeFormItem(formLabel)">-->
                <!--<Icon type="minus"></Icon>-->
                <!--删除{{formLabel.content.title + '执行'}}-->
                <!--</a>-->
                <a href="javascript:;" @click="addSpotplan">
                  <Icon type="plus"></Icon>
                  添加spotplan执行
                </a>
              </div>
            </i-col>
          </Row>
        </i-form>
      </template>
      <div class="g-mb-16">
        撰稿费用是否含在客户报价中：
        <i-switch v-model="formValue.writingFee" v-if="!isDisplay">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
        <span v-else>{{formValue.writingFee ? '是' : '否'}}</span>

      </div>
    </template>

  </div>
</template>

<script>
  import MemberAdd from './MemberAdd'
  import { ajax } from '../util/util'
  import { Brand, Schedule } from '../API/api'

  export default {
    name: 'TaskPRContent',
    components: { MemberAdd },
    props: {
      isDisplay: {
        type: Boolean,
        default: false
      },
      isFromMenu: {
        type: Boolean,
        default: false
      },
      idParams: {
        type: Object,
        default() {
          return {}
        }
      },
      projectId: {
        type: [Number, String]
      },
      customerId: {
        type: [Number, String]
      },
      customerName: {
        type: String
      },
      toolkitId: {
        type: [Number, String]
      },
      formValue: {
        type: [Array, Object],
        default: function () {
          return {}
        }
      },
      tips: {
        type: Array,
        default() {
          return []
        }
      },
      formLabel: {
        type: [Array, Object],
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        infoTpl: {
          report: '',
          material: ''
        },
        customers: [],
        projects: []
      }
    },
    methods: {
      init() {
        this.reformatValue()
        this.getBrand()
      },
      getBrand() {
        if (this.isFromMenu) {
          ajax.post(Brand.listAll, { pageSize: 1000 })
            .then(res => {
              this.customers = res.customer_list.data
            })
            .catch(() => { })
            .finally(() => { })

          if (this.idParams.customerId) {
            this.getProject(this.idParams.customerId)
          }
        }
      },

      getProject(e) {
        console.log(e)
        const params = {
          customerId: e,
          page: 1,
          page_size: 1000
        }
        ajax.post(Schedule.allProject, params)
          .then(res => {
            this.projects = res.project_list
          })
      },
      changeProject(e) {
        this.$emit('on-change', e)
      },
      selectUser(v, key ,index) {
        console.log(v, key)
        this.formValue.spotplan[index][key] = v.id
      },
      delInfo() {
        this.formValue.info.pop()
      },
      addInfo() {
        if (+this.toolkitId === 453) {
          delete this.infoTpl.report
        }
        this.formValue.info.push(this.infoTpl)
      },
      reformatValue() {
        if (this.formValue.mediaRelease) {
          switch (this.formValue.mediaRelease) {
            case 'true':
              this.formValue.mediaRelease = true
              break
            case 'false':
              this.formValue.mediaRelease = false
              break
          }
        }
        if (this.formValue.mediaQuote) {
          switch (this.formValue.mediaQuote) {
            case 'true':
              this.formValue.mediaQuote = true
              break
            case 'false':
              this.formValue.mediaQuote = false
              break
          }
        }
        if (this.formValue.writingFee) {
          switch (this.formValue.writingFee) {
            case 'true':
              this.formValue.writingFee = true
              break
            case 'false':
              this.formValue.writingFee = false
              break
          }
        }
      },
      addSpotplan() {
        this.formValue.spotplan.push(
          {
            inspectorId: null,
            operationId: null,
            content: {
              title: 'spotplan',
              canMore: true
            }
          }
        )
      },
      removeSpotplan() {
        this.formValue.spotplan.pop(
          {
            inspectorId: null,
            operationId: null,
            content: {
              title: 'spotplan',
              canMore: true
            }
          }
        )
      }
    },
    created() {
      this.init()
    }
  }
</script>

<style scoped lang="less">
  .ml-16 {
    margin-left: 16px;
  }

  .form-add {
    >a {
      margin-left: 16px;
    }
  }

  .form-fn {
    margin-bottom: 16px;
  }

  .operation-fn {
    display: flex;
    align-items: center;
    justify-content: flex-end;

  }
</style>