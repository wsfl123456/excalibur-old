<template>
  <Row>
    <i-col span="24" >
      <i-form label-position="left" :label-width="110" class="default-form" >
        <div class="form-group" >
          <template v-if="!isAdd">
            <div>
              <Row>
                <i-col span="24" class="default-form-member-col">
                  <FormItem label="姓名" class="default-form-item default-member-form">
                    <i-input readonly class="edit-disabled" v-model="formValue.userName"></i-input>
                  </FormItem>
                </i-col>
              </Row>
            </div>
            <div>
              <Row>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="员工ID" class="default-form-item default-member-form">
                    <i-input readonly class="edit-disabled" v-model="formValue.userCode"></i-input>
                  </FormItem>
                </i-col>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="部门" class="default-form-item default-member-form">
                    <i-input readonly class="edit-disabled" v-model="formValue.departmentName"></i-input>
                  </FormItem>
                </i-col>
              </Row>
            </div>
          </template>
          <template class="form-group" v-if="!isAdd">
            <div>
              <Row>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="职位" class="default-form-item default-member-form">
                    <i-input readonly class="edit-disabled" v-model="formValue.positionName"></i-input>
                  </FormItem>
                </i-col>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="职级" class="default-form-item default-member-form">
                    <i-input readonly class="edit-disabled" v-model="formValue.rankName"></i-input>
                  </FormItem>
                </i-col>
              </Row>
            </div>
          </template>
          <div>
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="性质" class="default-form-item default-member-form">
                  <RadioGroup v-model="formValue.state" size="large" class="default-form-radio-group row4" >
                    <Radio v-for="(radioItem, radioIndex) in opts.contractState" :key="radioIndex" :label="radioItem.id" class="default-form-radio" style="width: 25%">
                      {{radioItem.name}}
                    </Radio>
                  </RadioGroup>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col" v-if="!isAdd">
                <FormItem label="合同ID" class="default-form-item default-member-form">
                  <i-input readonly class="edit-disabled" v-model="formValue.contractCode"></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col" v-else>
                <FormItem label="员工" class="default-form-item default-member-form">
                  <div class="default-form-member-selection">
                    <common-member content="选择员工" @on-change="selectMember($event, 'uid')"></common-member>
                  </div>
                </FormItem>
              </i-col>
              <i-col :span="12" class="default-form-member-col">
                <FormItem label="签约日期" class="default-form-item default-member-form">
                  <DatePicker transfer class="deadline" type="date" placeholder="签约日期" :value="formValue.contractTime" confirm :clearable="false" @on-change="changeDate($event, 'contractTime')"></DatePicker>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="合同有效期" class="default-form-item default-member-form">
                    <i-input v-model="formValue.period" placeholder="合同有效期（年）"></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="到期日期" class="default-form-item default-member-form">
                  <DatePicker transfer class="deadline" type="date" placeholder="到期日期" :value="formValue.endTime" confirm :clearable="false" @on-change="changeDate($event, 'endTime')"></DatePicker>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <!--<div>-->
            <!--<Row>-->
              <!--<i-col span="12" class="default-form-member-col">-->
                <!--<FormItem label="交通补贴" class="default-form-item default-member-form">-->
                  <!--<i-input v-model="formValue.trafficAllowance" placeholder="交通补贴"></i-input>-->
                <!--</FormItem>-->
              <!--</i-col>-->
              <!--<i-col span="12" class="default-form-member-col">-->
                <!--<FormItem label="通讯补贴" class="default-form-item default-member-form">-->
                  <!--<i-input v-model="formValue.telAllowance" placeholder="通讯补贴"></i-input>-->
                <!--</FormItem>-->
              <!--</i-col>-->
            <!--</Row>-->
          <!--</div>-->
          <!--<div>-->
            <!--<Row>-->
              <!--<i-col span="12" class="default-form-member-col">-->
                <!--<FormItem label="基本薪资" class="default-form-item default-member-form">-->
                  <!--<i-input v-model="formValue.baseSalary" placeholder="基本薪资"></i-input>-->
                <!--</FormItem>-->
              <!--</i-col>-->
              <!--<i-col span="12" class="default-form-member-col">-->
                <!--<FormItem label="绩效奖金" class="default-form-item default-member-form">-->
                  <!--<i-input v-model="formValue.secondSalary" placeholder="绩效奖金"></i-input>-->
                <!--</FormItem>-->
              <!--</i-col>-->
            <!--</Row>-->
          <!--</div>-->
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="公积金开始日期" class="default-form-item default-member-form">
                  <DatePicker transfer class="deadline" type="date" placeholder="公积金开始日期" :value="formValue.fundStartTime" confirm :clearable="false" @on-change="changeDate($event, 'fundStartTime')"></DatePicker>

                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="社保开始日期" class="default-form-item default-member-form">
                  <DatePicker transfer class="deadline" type="date" placeholder="社保开始日期" :value="formValue.socialStartTime" confirm :clearable="false" @on-change="changeDate($event, 'socialStartTime')"></DatePicker>
                </FormItem>

              </i-col>
            </Row>
          </div>
          <!--<div>-->
            <!--<Row>-->
              <!--<i-col span="12" class="default-form-member-col">-->
                <!--<FormItem label="公积金基数" class="default-form-item default-member-form">-->
                  <!--<i-input v-model="formValue.fundBase" placeholder="公积金基数"></i-input>-->
                <!--</FormItem>-->
              <!--</i-col>-->
              <!--<i-col span="12" class="default-form-member-col">-->
                <!--<FormItem label="社保基数" class="default-form-item default-member-form">-->
                  <!--<i-input v-model="formValue.socialBase" placeholder="社保基数"></i-input>-->
                <!--</FormItem>-->
              <!--</i-col>-->
            <!--</Row>-->
          <!--</div>-->

        </div>
        <div class="form-group">
          <template v-for="(item, idx) in formValue.continueInfo">
            <div>
              <Row>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="续签日期" class="default-form-item default-member-form">
                    <DatePicker transfer class="deadline" type="date" placeholder="合同续签日期" :value="item.start" :clearable="false" confirm @on-change="_changeDate($event, 'continueInfo', idx, 'start')"></DatePicker>
                  </FormItem>
                </i-col>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="续签到期日期" class="default-form-item default-member-form">
                    <DatePicker transfer class="deadline" type="date" placeholder="合同续签到期日期" :value="item.end" :clearable="false" confirm @on-change="_changeDate($event, 'continueInfo', idx, 'end')"></DatePicker>
                  </FormItem>
                </i-col>
              </Row>
            </div>
          </template>
        </div>
        <div class="form-group">
          <template v-for="(item, idx) in formValue.probationInfo">
            <div>
              <Row>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="试用期开始日期" class="default-form-item default-member-form">
                    <DatePicker transfer class="deadline" type="date" placeholder="试用期开始日期" :value="item.start" :clearable="false" confirm @on-change="_changeDate($event, 'probationInfo', idx, 'start')"></DatePicker>
                  </FormItem>
                </i-col>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="试用期到期日期" class="default-form-item default-member-form">
                    <DatePicker transfer class="deadline" type="date" placeholder="试用期到期日期" :value="item.end" :clearable="false" confirm @on-change="_changeDate($event, 'probationInfo', idx, 'end')"></DatePicker>
                  </FormItem>
                </i-col>
              </Row>
            </div>
          </template>
        </div>
      </i-form>



    </i-col>

  </Row>
</template>

<script>
  import {Hr} from '../API/api'
  import CommonMember from './CommonMember'
  export default {
    components: {CommonMember},
    name: 'employee-contract-form',
    props: {
      formValue: {
        type: Object,
        default () {
          return {}
        }
      },
      isAdd: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        opts: {},
        rank: {
          1: '初级',
          2: '中级',
          3: '高级'
        }
      }
    },
    methods: {
      reformatValue () {
        const probationTpl = {
          start: null,
          end: null
        }
        const continueTpl = {
          start: null,
          end: null
        }
        if (this.formValue.probationInfo.length === 0) {
          this.formValue.probationInfo.push(probationTpl)
        }
        if (this.formValue.continueInfo.length === 0) {
          this.formValue.continueInfo.push(continueTpl)
        }
      },
      _changeDate (date, key, idx, subKey) {
        this.formValue[key][idx][subKey] = date
      },
      changeDate (date, key) {
        this.formValue[key] = date
      },
      selectMember (v, key, type = 'add') {
        switch (type) {
          case 'add':
            this.formValue[key] = v.id
            break
        }
      },
      getOpts () {
        this.$http.post(Hr.basicOpts, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.opts = _data.retData.data
          }
        })
      }
    },
    created () {
      this.getOpts()
      this.reformatValue()
    },
    updated () {
      this.reformatValue()
    },
    mounted () {
    }
  }
</script>

<style scoped lang="less">

</style>
