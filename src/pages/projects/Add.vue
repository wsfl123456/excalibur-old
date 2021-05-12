<template>
  <div class="edit-form">
    <Card class="form-card step1" :class="{hide: step !== 1}">
      <h2 slot="title">项目基本信息</h2>

      <i-form label-position="left" :label-width="88" class="default-form">
        <div class="form-group">
          <div >
            <FormItem  label="项目名称"  class="default-form-item" required>
              <i-input v-model="name" placeholder="项目名称应包含：Product_Campaign,如：Huafu_2H"></i-input>
            </FormItem>
          </div>
        </div>
      </i-form>

      <p>请在下面选择所属品牌</p>
      <div class="select-brand">
        <RadioGroup type="button" v-model="selectedBrand">
          <Radio v-for="(item, index) in brands" :key="'brands-' + index" :label="JSON.stringify(item)" >{{item.customerName}}</Radio>
        </RadioGroup>
      </div>

      <div>
        <i-form label-position="left" :label-width="88" class="default-form">
          <div class="form-group">
            <div >
              <FormItem  label="项目分级"  class="default-form-item" required>
                <RadioGroup size="large" class="default-form-radio-group" v-model="selectedLevel">
                  <Radio v-for="(radioItem, key) in levels" :key="key" :label="JSON.stringify({id: key, label: radioItem})" class="default-form-radio" style="width: 25%;">
                    {{radioItem + '级'}}
                  </Radio>
                </RadioGroup>
              </FormItem>
            </div>
          </div>
        </i-form>
      </div>

      <div>
        <i-form label-position="left" :label-width="88" class="default-form">
          <div class="form-group">
            <div>
              <Row>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="开始时间" class="default-form-item default-member-form" required>
                    <DatePicker transfer :options="dateOpts.startOpts" class="deadline" type="date" placeholder="选择开始时间" v-model="startTime" :clearable="false" ></DatePicker>

                  </FormItem>
                </i-col>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="结束时间" class="default-form-item default-member-form" required>
                    <DatePicker transfer :options="dateOpts.endOpts" class="deadline" type="date" placeholder="选择结束时间" v-model="endTime" :clearable="false" ></DatePicker>
                  </FormItem>
                </i-col>
              </Row>
            </div>
          </div>
        </i-form>
      </div>

      <div>
        <i-form label-position="left" :label-width="88" class="default-form">
          <div class="form-group">
            <div >
              <FormItem  label="项目类型"  class="default-form-item" required>
                <RadioGroup size="large" class="default-form-radio-group" v-model="selectedType">
                  <Radio v-for="(radioItem, key) in projectType" :key="key" :label="radioItem.name" class="default-form-radio" style="width: 50%;">
                    {{radioItem.label}}
                  </Radio>
                </RadioGroup>
              </FormItem>
            </div>
          </div>
        </i-form>
      </div>

      <div class="submit-btns">
        <Button type="primary" class="submit-btn form-default-btn hollow-default" size="large" @click.native="cancelAdd">取消</Button>
        <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="nextStep">下一步</Button>
      </div>
    </Card>

    <Card class="form-card step2" :class="{hide: step !== 2}">
      <h2 slot="title">PROJECT ASSESSMENT REQUEST （PAR)</h2>
      <div v-for="(item, idx) in parConf" :key="idx">
        <div class="title">
          <h3>{{item.title_zh}}</h3>
          <h3 v-if="item.title_en">{{item.title_en}}</h3>
        </div>
        <div v-if="item.displayType === 'table-noth'" class="table par-plate">
          <CheckboxGroup v-model="item.value">
            <Row>
              <i-col v-for="(radioItem, radioIdx) in item.td" :key="radioIdx" span="8">
                <Checkbox :label="radioItem.id" :title="radioItem.label">
                  <span>{{radioItem.label}}</span>
                  <!--<i-input v-if="radioItem.hasOwnProperty('ipt')" v-model="radioItem.ipt" placeholder="请备注"></i-input>-->
                </Checkbox>
              </i-col>
            </Row>
          </CheckboxGroup>
          <div v-if="item.value.indexOf('10') >= 0 || item.value.indexOf(10) >= 0">
            <i-form label-position="left" :label-width="140" class="default-form">
              <div class="form-group">
                <div>
                  <FormItem class="default-form-item default-member-form" label="其他 Other">
                    <i-input placeholder="请备注" v-model="item.otherIpt"></i-input>
                  </FormItem>
                </div>
              </div>
            </i-form>
          </div>
        </div>
        <p class="title-note" v-if="item.subTit">{{item.subTit}}</p>
        <Row v-if="item.displayType === 'table'" class="table par-plate">
          <i-col v-for="(_item, _idx) in item.th" :span="24/item.th.length" :key="'col-' + _idx">
            <h4>{{_item.tit}}</h4>
            <RadioGroup vertical v-model="_item.value" v-if="_item.type === 'radio'">
              <Radio label="apple" v-for="(radioItem, radioIdx) in _item.items" :key="radioIdx" :label="radioItem.id">
                <span>{{radioItem.label}}</span>
              </Radio>
            </RadioGroup>

            <CheckboxGroup vertical v-model="_item.value" v-if="_item.type === 'checkbox'">
              <Checkbox v-for="(radioItem, radioIdx) in _item.items" :key="radioIdx" :label="radioItem.id">
                <span>{{radioItem.label}}</span>
              </Checkbox>
            </CheckboxGroup>
          </i-col>
        </Row>

        <div v-if="item.displayType === 'list'" class="list par-plate">
          <CheckboxGroup v-model="item.value">
            <Checkbox v-for="(listItem, listIdx) in item.items" :key="'list-' + listIdx" :label="listItem.id">
              <span class="item-label">
                {{listItem.label}}
              </span>
              <span class="item-desc">
                {{listItem.desc}}
              </span>
            </Checkbox>
          </CheckboxGroup>
        </div>

        <div v-if="item.displayType === 'member'" class="members par-plate">
          <i-form label-position="left" :label-width="140" class="default-form">
            <div class="form-group">
              <div>
                <Row class="member-row">
                  <template v-for="(_item, _key, _idx) in item.values">
                    <i-col span="12" class="default-form-member-col" >
                      <FormItem class="default-form-item default-member-form">
                        <div slot="label" class="form-label">
                          <span v-if="_item.required" class="required-tag">*</span>
                          <div>
                            {{_item.label_zh}}
                            <br>
                            {{_item.label_en}}
                            {{_item.required}}
                          </div>
                        </div>
                        <div class="default-form-member-selection">
                          <project-member multi content="添加项目成员" @on-change="selectUser($event, _key, _item)" :users="_item.value"></project-member>
                        </div>
                      </FormItem>
                    </i-col>
                  </template>
                </Row>
              </div>
            </div>
          </i-form>
        </div>
      </div>

      <div class="submit-btns">
        <Button type="primary" class="submit-btn form-default-btn hollow-default" size="large" @click.native="prevStep">上一步</Button>
        <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="submitPreview">提交</Button>
      </div>
    </Card>
    <toast :msg="toastMsg" :status="toastStatus" :is-toast="isToast"></toast>

    <project-preview v-if="previewShow" :is-show="previewShow" :preview="postData" :par-conf="parConf" @on-close="closePreview" @on-submit="submitProject"></project-preview>
    <leave-modal :is-show="isLeaveConfirm"
                 @on-leave="leavePage"
                 @on-saveLeave="saveLeavePage"
                 @on-cancel="leaveCancel"
    ></leave-modal>
    <load-draft-modal :is-show="isDraft"
                      @on-load="loadDraft"
                      @on-cancel="cancelDraft"
    ></load-draft-modal>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import Toast from '../../components/popup/Toast'
  import {Project} from '../../API/api'
  import {PARConf} from '../../assets/conf/PAR.conf'
  import ProjectMember from '../../components/ProjectMember'
  import ProjectPreview from '../../components/popup/ProjectPreview'
  import LeaveModal from '../../components/popup/LeaveModal'
  import LoadDraftModal from '../../components/popup/LoadDraftModal'
  export default {
    name: 'add',
    components: {
      LoadDraftModal,
      LeaveModal,
      ProjectMember,
      BCrumb,
      Toast,
      ProjectPreview
    },
    data () {
      return {
        isSaved: false,
        isDraft: false,
        isLeaveConfirm: false,
        projectType: [
          {
            name: 'P',
            label: 'Campaign Project'
          },
          {
            name: 'R',
            label: 'Retainer Project'
          }
        ],
        submitBtn: '提交',
        crumb: [
          {
            label: '项目管理',
            url: '/projects/list'
          },
          {
            label: '新建项目'
          }
        ],
        canSubmit: true,
        previewShow: false,
        parConf: JSON.parse(JSON.stringify(PARConf)),
        step: 1,
        // step: 2,
        name: null,
        levels: {},
        brands: [],
        selectedLevel: null,
        selectedBrand: null,
        selectedType: null,
        startTime: null,
        endTime: null,
        toastMsg: null,
        toastStatus: null,
        isToast: false,
        postData: {},
        dateOpts: {
          startOpts: {
            disabledDate (date) {
              return date && date.valueOf() < Date.now() - 86400000
            }
          },
          endOpts: {
            disabledDate (date) {
              return date && date.valueOf() < Date.now() - 86400000
            }
          }
        }
      }
    },
    watch: {
      startTime: {
        handler (data) {
          this.dateOpts.endOpts = {
            disabledDate (date) {
              if (data) {
                return (date && date.valueOf() < Date.now() - 86400000) || date < data
              } else {
                return date && date.valueOf() < Date.now() - 86400000
              }
            }
          }
        }
      },
      endTime: {
        handler (data) {
          this.dateOpts.startOpts = {
            disabledDate (date) {
              if (data) {
                return date > data || (date && date.valueOf() < Date.now() - 86400000)
              } else {
                return date && date.valueOf() < Date.now() - 86400000
              }
            }
          }
        }
      },
      isSaved: {
        handler () {
          this.menuJump()
        },
        immediate: true
      }
    },
    computed: {
      currMenu () {
        return this.$store.state.index.currMenu
      }
    },
    methods: {
      menuJump () {
        this.$store.dispatch('toggleMenuJump', this.isSaved)
      },
      selectUser (e, key, item) {
        item.value = e
        // this.parConf[3].values[key] = e
      },
      closePreview () {
        this.previewShow = false
      },
      submitPreview () {
        let data = {
          name: this.name,
          customerId: JSON.parse(this.selectedBrand).id,
          startTime: this.startTime,
          endTime: this.endTime,
          periodType: this.selectedType,
          level: JSON.parse(this.selectedLevel).id,

          creativeRelated: this.parConf[0],
          mediaRelated: this.parConf[1],
          ipRelated: this.parConf[2],
          techRelated: this.parConf[3],
          dataRelated: this.parConf[4],

          projectLead: this.parConf[5].values.projectLead.value,

          projectManager: this.parConf[6].values.projectManager.value,
          creativePM: this.parConf[6].values.creativePM.value,
          mediaPM: this.parConf[6].values.mediaPM.value,
          ipProductPM: this.parConf[6].values.ipProductPM.value,
          technicalPM: this.parConf[6].values.technicalPM.value,
          dataPM: this.parConf[6].values.dataPM.value,

          // strategyPlanner: this.parConf[7].values.strategyPlanner.value,
          planner: this.parConf[7].values.planner.value,
          mediaPlanner: this.parConf[7].values.mediaPlanner.value,
          // mediaBuyer: this.parConf[7].values.mediaBuyer.value,
          IPPlanner: this.parConf[7].values.IPPlanner.value,
          technicalPlanner: this.parConf[7].values.technicalPlanner.value,
          creativePlanner: this.parConf[7].values.creativePlanner.value,

          creativeArt: this.parConf[8].values.creativeArt.value,
          creativeCopy: this.parConf[8].values.creativeCopy.value,
          photographProducer: this.parConf[8].values.photographProducer.value,
          // videoProducer: this.parConf[8].values.videoProducer.value,
          shootingProducer: this.parConf[8].values.shootingProducer.value,

          // FEProgramming: this.parConf[9].values.FEProgramming.value,
          technical: this.parConf[9].values.technical.value,
          BEProgramming: this.parConf[9].values.BEProgramming.value,
          DBADesign: this.parConf[9].values.DBADesign.value,
          domainServer: this.parConf[9].values.domainServer.value,
          maintenance: this.parConf[9].values.maintenance.value,

          dataAnalyst: this.parConf[10].values.dataAnalyst.value,
          dataMaintenance: this.parConf[10].values.dataMaintenance.value
        }

        if (!data.projectLead || data.projectLead.length === 0) {
          this.isToast = true
          this.toastStatus = null
          this.toastMsg = '请选择 Project Lead'
          setTimeout(() => {
            this.isToast = false
          }, 1500)

          return
        }

        if (!data.projectManager || data.projectManager.length === 0) {
          this.isToast = true
          this.toastStatus = null
          this.toastMsg = '请选择 Leading PM'
          setTimeout(() => {
            this.isToast = false
          }, 1500)

          return
        }

        this.postData = JSON.parse(JSON.stringify(data))
        this.postData.selectedLevel = JSON.parse(this.selectedLevel)
        this.postData.selectedBrand = JSON.parse(this.selectedBrand)
        this.previewShow = true
      },
      submitProject () {
        // this.previewShow = false
        if (this.canSubmit) {
          this.canSubmit = false
          let data = JSON.parse(JSON.stringify(this.postData))
          delete data.selectedLevel
          delete data.selectedBrand
          for (let i = 5; i <= 10; i++) {
            for (let key in this.parConf[i].values) {
              data[key] = this.parConf[i].values[key].value.map((item) => {
                return item.id
              })
            }
          }
          // data.planner = data.planner
          this.$http.post(Project.create, this.qs.stringify(data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
            let _data = res.data
            if (_data.retCode !== 0) {
              this.isToast = true
              this.toastMsg = _data.retMsg
            } else {
              this.isToast = true
              this.toastStatus = 'success'
              this.toastMsg = '提交成功'
              this.isSaved = true
              localStorage.removeItem('addProject')
            }
            setTimeout(() => {
              this.canSubmit = true
              this.isToast = false
              if (_data.retCode === 0) {
                // alert(this.loadedData.info.projectId)
                this.$router.push('/projects/list')
              } else if (_data.retCode === 100014) {
                this.$cookie.delete('token')

                this.$router.push('/')
              }
            }, 1500)
          })
        }
      },
      prevStep () {
        this.step = 1
      },
      cancelAdd () {
        this.$router.push('/projects/list')
      },
      nextStep () {
        let data = {
          name: this.name,
          brand: this.selectedBrand,
          level: this.selectedLevel,
          startTime: this.startTime,
          endTime: this.endTime,
          periodType: this.selectedType
        }
        localStorage.setItem('projectBasic', JSON.stringify(data))
        if (!this.selectedBrand || !this.selectedLevel) {
          this.toastMsg = '请选择品牌和等级'
          this.isToast = true
        } else if (!this.name || this.name.length === 0 || this.name === '') {
          this.toastMsg = '请填写项目名称'
          this.isToast = true
        } else if (!this.startTime || !this.endTime) {
          this.toastMsg = '请选择开始/结束时间'
          this.isToast = true
        } else if (!this.selectedType) {
          this.toastMsg = '请选择项目类型'
          this.isToast = true
        } else {
          this.step = 2
        }
        if (this.isToast) {
          setTimeout(() => {
            this.isToast = false
          }, 1500)
        }
      },
      getToolkit () {
        // this.$http.post(Project.toolkit, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
        // })
      },
      getIndex () {
        this.$http.post(Project.addIndex, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode !== 0 && _data.retCode !== 100014) {
            this.isToast = true
            this.toastMsg = _data.retMsg
          } else if (_data.retCode === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          } else {
            this.levels = _data.retData.projectLevel
            this.brands = _data.retData.outCustomer.concat(_data.retData.innerCustomer)
          }
          setTimeout(() => {
            this.isToast = false
          }, 1500)
        })
      },
      leaveConfirm (next) {
        if (!this.isSaved) {
          next(false)
          this.isLeaveConfirm = true
        } else {
          next()
        }
      },
      cacheMenu () {
        this.menu = this.currMenu
      },
      leaveCancel () {
        this.$store.dispatch('setCurrMenu', this.menu)
        sessionStorage.setItem('currMenu', this.menu)
        this.isLeaveConfirm = false
      },
      parserDraft () {
        this.isDraft = localStorage.hasOwnProperty('addProject')
      },
      loadDraft () {
        const _draft = localStorage.getItem('addProject')
        const draft = JSON.parse(_draft)
        this.name = draft.name
        this.selectedBrand = draft.brand
        this.selectedLevel = draft.level
        this.startTime = draft.startTime
        this.endTime = draft.endTime
        this.selectedType = draft.periodType
        this.parConf = draft.parConf

        this.cancelDraft()
      },
      cancelDraft () {
        this.isDraft = false
      },
      saveLeavePage () {
        let data = {
          name: this.name,
          brand: this.selectedBrand,
          level: this.selectedLevel,
          startTime: this.startTime,
          endTime: this.endTime,
          periodType: this.selectedType,

          parConf: this.parConf
        }
        const projectData = JSON.stringify(data)
        localStorage.setItem('addProject', projectData)
        this.isSaved = true
        this.$store.dispatch('toggleMenuJump', true)
        this.routerNext()
      },
      leavePage () {
        this.isSaved = true
        this.$store.dispatch('toggleMenuJump', true)
        this.routerNext()
      }
    },
    created () {
      this.getToolkit()
      this.getIndex()
      this.cacheMenu()
      this.$store.dispatch('selectCustomer', null)
      this.parserDraft()
      // this.menuJump()
    },
    beforeRouteLeave (to, from, next) {
      // next()
      this.leaveConfirm(next)
      this.routerNext = next
    }
  }
</script>

<style scoped lang="less">
  .edit-form {
    .par-plate {
      margin-bottom: 30px;
    }
    .title-note {
      color: #868e96;
      font-size: 14px;
    }
    .members {
      .member-row {
      }
    }
    .list {
      .ivu-checkbox-group {
        .ivu-checkbox-wrapper {
          display: block;
          border: 1px solid #ced4da;
          height: 48px;
          line-height: 48px;
          padding-left: 24px;
          font-size: 14px;
          color: #343a40;
          .item-label {
            border-right: 1px solid #ced4da;
            display: inline-block;
            width: 100px;
          }
          .item-desc {

          }
        }
      }
    }
    .table {
      h4 {
        border: 1px solid #ced4da;
        background-color: #fff9db;
        text-align: center;
        font-size: 14px;
        color: #343a40;
        height: 32px;
        line-height: 32px;
      }
      .ivu-checkbox-group {
        display: block;
        .ivu-checkbox-wrapper {
          display: block;
          border: 1px solid #ced4da;
          margin: -1px 0 0;
          height: 48px;
          line-height: 48px;
          font-size: 16px;
          color: #343a40;
          padding-left: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .ivu-radio-group {
        display: block;
        .ivu-radio-wrapper {
          border: 1px solid #ced4da;
          margin: -1px 0 0;
          height: 48px;
          line-height: 48px;
          font-size: 16px;
          color: #343a40;
          padding-left: 24px;
        }
      }
      .ivu-col {
        margin-left: -1px;
      }
    }
    .submit-btns {
      text-align: right;
      button {
        margin-left: 16px;
      }
      .hollow-default {
        background-color: #fff;
        color: #2d8ef8;
      }
    }


    .default-form {
      .default-form-radio-group {
        .default-form-radio {
          border-right: 1px solid #ced4da;
          &:nth-child(4n) {
            border-right: 0 none;
          }
        }
      }
    }
    .form-btns {
      position: absolute;
      left: 100%;
      bottom: 16px;
      margin-left: 32px;
    }
    .form-default-btn {
      margin-top: 16px;
      width: 120px;
    }
    .primary-hole {
      background-color: #fff;
      color: #2d8cf0;
    }
    .task-belong {
      a {
        text-decoration: underline;
      }
    }
    .task-form {
      position: relative;
    }
    .form-card {
      &.hide {
        display: none;
      }
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

  }
</style>
