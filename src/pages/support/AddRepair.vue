<template>
  <div class="edit-form">
    <Card class="form-card">
      <h2 slot="title">报修申请</h2>
      <div>
        <Row>
          <i-col span="24">
            <i-form label-position="left" :label-width="100" class="default-form" >
              <div class="form-group">
                <div >
                  <FormItem label="申请类型" class="default-form-item" required>
                    <RadioGroup v-model="applyData.applyType" size="large" class="default-form-radio-group" >
                      <Radio v-for="(radioItem, radioIndex) in applyType" :key="radioIndex" :label="radioItem.id" style="width: 33.33%;" class="default-form-radio" >
                        {{radioItem.label}}
                      </Radio>
                    </RadioGroup>
                  </FormItem>
                </div>
                <div>
                  <FormItem label="设备选择" class="default-form-item" :required="applyData.applyType !== 3">
                    <div>
                      <!--<Select size="large" v-model="applyData.assetNo" placeholder="报修的设备" :disabled="applyData.applyType === 3" @on-change="selectDevice">-->
                      <Select transfer size="large" v-model="selectedDevice" placeholder="报修的设备" :disabled="applyData.applyType === 3" @on-change="selectDevice">
                        <Option v-for="item in myDevice" :value="JSON.stringify(item)" :key="'device-' + item.id">{{ item.model }}</Option>
                      </Select>
                    </div>
                    <div class="g-bt">
                      <Select transfer size="large" v-model="applyData.assetType"  placeholder="报修设备种类" :disabled="applyData.applyType === 3">
                        <Option v-for="item in deviceType" :value="item.id" :key="item.id">{{ item.label }}</Option>
                      </Select>
                    </div>

                  </FormItem>
                </div>

                <div>
                  <FormItem label="问题描述" class="default-form-item" required>
                    <i-input type="textarea" v-model="applyData.detail" :autosize="{minRows: 1, maxRows: 5}" placeholder="填写问题描述"></i-input>
                  </FormItem>
                </div>
                <div>
                  <FormItem label="期望结果" class="default-form-item" required>
                    <i-input type="textarea" v-model="applyData.expect" :autosize="{minRows: 1, maxRows: 5}" placeholder="填写期望结果"></i-input>
                  </FormItem>
                </div>
                <div>
                  <FormItem label="期望完成时间" class="default-form-item" required>
                    <DatePicker :value="applyData.expectTime" transfer class="deadline" type="date" placeholder="选择期望完成时间" :clearable="false" @on-change="selectTime"></DatePicker>

                  </FormItem>
                </div>
              </div>
            </i-form>
            <div class="g-ta-r">
              <Button type="primary" size="large" @click.native="submit">提交申请</Button>
            </div>
          </i-col>
        </Row>
      </div>
    </Card>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import {Support} from '../../API/api'
  import Toast from '../../components/popup/Toast'
  import Loading from '../../components/popup/Loading'
  import SubHeader from '../../components/SubHeader'
  export default {
    components: {
      SubHeader,
      Loading,
      Toast,
      BCrumb},
    name: 'add-repair',
    data () {
      return {
        selectedDevice: '',
        pageData: {
          page: 1,
          pageSize: 25,
          orderBy: 'createTime',
          asc: 'desc'
        },
        crumb: [
          {label: '所需支持'},
          {label: '我的设备'},
          {label: '设备清单', url: '/myDevice/list'},
          {label: '报修申请'}
        ],
        isLoading: false,
        isToast: false,
        toastMsg: null,
        toastState: null,
        applyData: {
          assetId: null,
          applyType: null,
          detail: null,
          expect: null,
          expectTime: null
        },
        myDevice: [],
        deviceType: [],
        applyType: [
          {id: 1, label: '报修'},
          {id: 2, label: '更换'},
          {id: 3, label: '新增申请'}
        ]
      }
    },
    methods: {
      selectDevice (data) {
        this.applyData.assetId = JSON.parse(data).id
        this.applyData.assetType = JSON.parse(data).assetType
      },
      selectTime (date) {
        this.applyData.expectTime = date
      },
      submit () {
        if (
          !this.applyData.applyType ||
          !this.applyData.detail ||
          !this.applyData.expect ||
          !this.applyData.expectTime
        ) {
          this.isToast = true
          this.toastMsg = '请填写所有必填项'
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
          }, 1500)
          return
        }

        if (this.applyData.applyType !== 3 && (!this.applyData.assetId)) {
          this.isToast = true
          this.toastMsg = '请填写所有必填项'
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
          }, 1500)
          return
        }
        this.isLoading = true
        this.$http.post(Support.apply, this.qs.stringify(this.applyData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            this.toastMsg = '提交成功'
            this.toastState = 'success'
          } else {
            this.toastMsg = _data.retMsg
            this.toastState = null
          }
          this.isToast = true
          setTimeout(() => {
            this.isToast = false
            this.toastState = null
            this.toastMsg = null
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
            if (_data.retCode === 0) {
              this.$router.push('/myDevice/list')
            }
          }, 1500)
        })
      },
      getMyDevice () {
        this.isLoading = true
        this.$http.post(Support.myDevice, this.qs.stringify(this.pageData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            if (_data.retData.data.length > 0) {
              _data.retData.data.forEach((item) => {
                this.myDevice.push(item)

                let notExist = true
                for (let i = 0; i < this.deviceType.length; i++) {
                  let _deviceType = this.deviceType[i]
                  if (this._.isEqual(_deviceType, {id: item.assetType, label: item.typeName})) {
                    notExist = false
                    break
                  }
                }
                if (notExist) {
                  this.deviceType.push({id: item.assetType, label: item.typeName})
                }
              })
            }
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }, 1500)
        })
      }
    },
    created () {
      this.getMyDevice()
    }
  }
</script>

<style scoped lang="less">
  .edit-form {
    .form-card {
      &:hover {
        box-shadow: 0 0 0;
      }
      .ivu-card-head {
        background-color: #f8f9fa;
        padding-left: 24px;
        padding-right: 24px;
        h2 {
          font-size: 14px;
          color: #343a40;
        }
      }
      .ivu-card-body {
        padding: 32px;
      }
    }
    .form-add {
      margin-bottom: 16px;
      a {
        margin-left: 16px;
      }
    }
    .type-select {
      .default-form-radio-group {
        width: 100%;
      }
    }
  }
</style>
