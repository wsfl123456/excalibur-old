<template>
  <Row>
    <i-col span="24" >
      <i-form label-position="left" :label-width="100" class="default-form" >
        <div class="form-group">
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="姓名" class="default-form-item default-member-form">
                  <i-input v-model="formValue.userName"></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="英文名" class="default-form-item default-member-form">
                  <i-input v-model="formValue.englishName"></i-input>
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
                <FormItem label="手机号" class="default-form-item default-member-form">
                  <i-input v-model="formValue.mobile"></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="职级" class="default-form-item default-member-form">
                  <!--<i-input v-model="formValue.rankId"></i-input>-->
                  <Select transfer size="large" v-model="formValue.rankId" filterable>
                    <Option v-for="(item, key) in rank" :value="+key" :key="key">{{ item }}</Option>
                  </Select>

                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="职位" class="default-form-item default-member-form">
                  <!--<i-input v-model="formValue.positionId"></i-input>-->
                  <Select transfer v-if="!isLoading" size="large" v-model="formValue.positionId" filterable>
                    <template v-if="opts.position.length === 0">
                      <Option :value="formValue.positionId" disabled>没有职位</Option>
                    </template>
                    <template v-else>
                      <Option v-for="item in opts.position" :value="item.id.toString()" :key="item.id">{{ item.name }}</Option>
                    </template>
                  </Select>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="部门" class="default-form-item default-member-form">
                  <Select transfer size="large" v-model="formValue.departmentId" filterable @on-change="changeDepart">
                    <Option v-for="item in opts.department" :value="item.id" :key="item.id">{{ item.name }}</Option>
                  </Select>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="事业部" class="default-form-item default-member-form">
                  <i-input readonly class="edit-disabled" v-model="formValue.teamName"></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="学院" class="default-form-item default-member-form">
                  <Select transfer size="large" v-model="formValue.collegeId" placeholder="请选择学院">
                    <Option v-for="item in collegeList" :value="Number(item.collegeId)" :key="item.collegeId">{{ item.title }}</Option>
                  </Select>
                </FormItem>
              </i-col>
               <i-col span="12" class="default-form-member-col">
                <FormItem label="专业" class="default-form-item default-member-form">
                  <Select transfer size="large" v-model="formValue.studyId"  placeholder="请选择专业">
                    <template v-if="formValue.collegeId">
                      <Option v-for="item in studyList" :value="Number(item.studyId)" :key="item.id">{{ item.title }}</Option>
                    </template>
                    <template v-else>
                      <Option :value='0' disabled>请先选择学院</Option>
                    </template>
                  </Select>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="状态" class="default-form-item default-member-form">
                  <RadioGroup v-model="formValue.status" size="large" class="default-form-radio-group" >
                    <Radio v-for="(radioItem, radioIndex) in opts.stateList" :key="radioIndex" :label="radioItem.id" class="default-form-radio" style="width: 33.333%">
                      {{radioItem.name}}
                    </Radio>
                  </RadioGroup>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div v-show="formValue.status == 2">
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="离职日期" class="default-form-item default-member-form">
                  <DatePicker transfer class="deadline" type="date" placeholder="离职日期" :value="formValue.lastDay" :clearable="false" @on-change="changeLastDay"></DatePicker>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="24" class="default-form-member-col" v-if="formValue.contractId">
                <FormItem label="性质" class="default-form-item default-member-form">
                  <RadioGroup v-model="formValue.contractState" size="large" class="default-form-radio-group row4" >
                    <Radio v-for="(radioItem, radioIndex) in opts.contractState" :key="radioIndex" :label="radioItem.id" class="default-form-radio" style="width: 33.333%">
                      {{radioItem.name}}
                    </Radio>
                  </RadioGroup>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <!--{{formValue.n1Info ? true : false}}-->
                <FormItem label="N+1" class="default-form-item default-member-form">
                  <div class="default-form-member-selection">
                    <template v-if="formValue.n1Info && formValue.n1Info.id">
                      <common-member content="选择 N+1" :users="[formValue.n1Info]" @on-change="selectMember($event, 'N1Id', 'edit')"></common-member>
                    </template>
                    <template v-else>
                      <common-member content="选择 N+1" @on-change="selectMember($event, 'N1Id')"></common-member>
                    </template>
                  </div>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <!--{{formValue.n2Info}}-->

                <FormItem label="N+2" class="default-form-item default-member-form">
                  <div class="default-form-member-selection">
                    <template v-if="formValue.n2Info && formValue.n2Info.id">

                      <common-member content="选择 N+2" :users="[formValue.n2Info]" @on-change="selectMember($event, 'N2Id', 'edit')"></common-member>
                    </template>
                    <template v-else>
                      <common-member content="选择 N+2" @on-change="selectMember($event, 'N2Id')"></common-member>
                    </template>
                  </div>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="生日" class="default-form-item default-member-form">
                  <DatePicker transfer class="deadline" type="date" placeholder="生日" :value="formValue.birthDay" :clearable="false" @on-change="changeBirthday"></DatePicker>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="星座" class="default-form-item default-member-form">
                  <i-input v-model="formValue.constellation"></i-input>
                </FormItem>
              </i-col>

            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="微信号" class="default-form-item default-member-form">
                  <i-input v-model="formValue.wechart"></i-input>
                </FormItem>
              </i-col>

              <i-col span="12" class="default-form-member-col">
                <FormItem label="学历" class="default-form-item default-member-form">
                  <i-input v-model="formValue.highestEducation"></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="毕业院校" class="default-form-item default-member-form">
                  <i-input v-model="formValue.school"></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="专业" class="default-form-item default-member-form">
                  <i-input v-model="formValue.major"></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="个人邮箱" class="default-form-item default-member-form">
                  <i-input v-model="formValue.email"></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="企业邮箱" class="default-form-item default-member-form">
                  <i-input readonly class="edit-disabled" v-model="formValue.companyEmail"></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="证件类型" class="default-form-item default-member-form">
                  <Select transfer size="large" v-model="formValue.cardType" filterable>
                    <Option v-for="item in opts.cardType" :value="item.id" :key="item.id">{{ item.name }}</Option>
                  </Select>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="证件号" class="default-form-item default-member-form">
                  <i-input v-model="formValue.identityCard"></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="开户行信息" class="default-form-item default-member-form">
                  <i-input v-model="formValue.bankName"></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="银行账号" class="default-form-item default-member-form">
                  <i-input v-model="formValue.bankCardId"></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="公积金账号" class="default-form-item default-member-form">
                  <i-input v-model="formValue.fundId"></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="初始年假天数" class="default-form-item default-member-form">
                  <i-input v-model="formValue.holidayDay"></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="户口所在地" class="default-form-item default-member-form">
                  <i-input v-model="formValue.permanentAddress"></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="通讯地址" class="default-form-item default-member-form">
                  <i-input v-model="formValue.address"></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="紧急联系人" class="default-form-item default-member-form">
                  <i-input v-model="formValue.linkmanInfo[0].name"></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="手机号" class="default-form-item default-member-form">
                  <i-input v-model="formValue.linkmanInfo[0].mobile"></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="紧急联系人" class="default-form-item default-member-form">
                  <i-input v-model="formValue.linkmanInfo[1].name"></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="手机号" class="default-form-item default-member-form">
                  <i-input v-model="formValue.linkmanInfo[1].mobile"></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="简介" class="default-form-item default-member-form">
                  <i-input v-model="formValue.resume" type="textarea"></i-input>
                </FormItem>
              </i-col>

            </Row>
          </div>
        </div>

      </i-form>
    </i-col>
  </Row>
</template>

<script>
  import { Hr, Task } from '../API/api'
  import CommonMember from './CommonMember'

  export default {
    components: {CommonMember},
    name: 'employee-form',
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
        isLoading: true,
        opts: {
          position: [],
          group: [],
          stateList: [],
          contractState: []
        },
        rank: {
          1: '初级',
          2: '中级',
          3: '高级'
        },
        collegeList: [],
        studyList: []
      }
    },
    computed: {
      listenCollege() {
        return this.formValue.collegeId
      }
    },
    methods: {
      changeDepart (id) {
        this.$http.post(Hr.groupNposition, this.qs.stringify({id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          const _data = res.data
          if (_data.retCode === 0) {
            this.opts.group = _data.retData.group
            this.opts.position = _data.retData.position
          }
        })
      },
      reformatFormValue () {
        this.formValue.n1Info.name = this.formValue.n1Info.name || this.formValue.n1Info.userName
        this.formValue.n2Info.name = this.formValue.n2Info.name || this.formValue.n2Info.userName
      },
      reformatLinkMan () {
        if (!this.formValue.linkmanInfo || !(this.formValue.linkmanInfo instanceof Array)) {
          this.formValue.linkmanInfo = [
            {name: '', mobile: ''},
            {name: '', mobile: ''}
          ]
        }
        for (let i = 0; i < 2; i++) {
          if (!this.formValue.linkmanInfo[i]) {
            this.formValue.linkmanInfo.push({name: '', mobile: ''})
          }
        }
      },
      changeLastDay (date) {
        this.formValue.lastDay = date
      },
      changeBirthday (date) {
        this.formValue.birthDay = date
      },
      selectMember (v, key, type = 'add') {
        switch (type) {
          case 'add':
            this.formValue[key] = v.id
            break
          case 'edit':
            if (key === 'N1Id') {
              if (this._.isEmpty(v)) {
                this.formValue.n1Info = {}
              } else {
                this.formValue.n1Info = {
                  id: v.id,
                  userName: v.userName,
                  headPic: v.headPic
                }
              }
            } else if (key === 'N2Id' && !this._.isEmpty(v)) {
              if (this._.isEmpty(v)) {
                this.formValue.n2Info = {}
              } else {
                this.formValue.n2Info = {
                  id: v.id,
                  userName: v.userName,
                  headPic: v.headPic
                }
              }
            }
            this.formValue[key] = v.id
        }
      },
      getOpts () {
        this.isLoading = true
        this.$http.post(Hr.basicOpts, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.opts = _data.retData.data
            if (this.formValue.departmentId) {
              this.changeDepart(this.formValue.departmentId)
            }
            if (this.isAdd) {
              this.formValue.userCode = this.opts.userCode
            }
          }
        })
      },
      getCollegeList() {
         this.$http.post(Task.collegelist, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
           this.collegeList = res.data.retData.data
         })
      },
      getStudyList(collegeId) {
        if (collegeId) this.$http.post(Task.collegestudylist, this.qs.stringify({collegeId}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
           this.studyList = res.data.retData.data
         })
      }
    },
    created () {
      this.getOpts()
      this.reformatLinkMan()
      this.reformatFormValue()
      this.getCollegeList()
      this.getStudyList(this.formValue.collegeId)
    },
    watch: {
      listenCollege: {
        handler(val) {
          this.formValue.studyId = ''
          this.getStudyList(val)
        },
      }
    }
  }
</script>

<style scoped lang="">

</style>
