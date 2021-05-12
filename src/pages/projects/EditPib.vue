<template>
  <div class="pib-edit">
    <Card class="pib-card">
      <h2 slot="title">PROJECT (DE)BRIEF SHEET （PIB)</h2>

      <h2>I. 简报核心_CORE BRIEF</h2>
      <div class="vertical">
        <h3>
          <span class="required-tag">*</span>
          1.是什么背景与市场情况会提出这个项目？What market situation has prompted this project?
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <i-input
              type="textarea"
              v-model="pibValue.I_1"
              :autosize="{minRows: 2, maxRows: 7}"
              placeholder="PEST情况、
市场情况、
内部情况"
            ></i-input>
          </li>
        </ul>
      </div>
      <div class="vertical">
        <h3>
          <span class="required-tag">*</span>
          2. 市场竞争情况如何？What is the competitive context?
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <i-input
              type="textarea"
              v-model="pibValue.I_2"
              :autosize="{minRows: 2, maxRows: 7}"
              placeholder="请使用分析表格或者SWOT进行收集整理"
            ></i-input>
          </li>
        </ul>
      </div>
      <div>
        <h3>
          <span class="required-tag">*</span>
          3. 我们提供的产品的“消费者价值”是什么？ What’s Customer Value about the product what we’re selling?
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <h4>
              (a)  品牌与产品主张是什么？What’s the brand claim? 
            </h4>
            <i-input type="textarea" v-model="pibValue.I_a3"
                     :autosize="{minRows: 2, maxRows: 7}"
                     placeholder="请在此说明产品的USP&RTB"></i-input>
          </li>
          <li class="g-fl">
            <h4>
              (b)  品牌的宣传口号是什么？What’s the brand slogan?
            </h4>
            <i-input type="textarea" v-model="pibValue.I_b3"
                     :autosize="{minRows: 2, maxRows: 7}"
                     placeholder="请在此说明产品的Slogan"></i-input>
          </li>
        </ul>
      </div>

      <div class="vertical">
        <h3>
          <span class="required-tag">*</span>
          4. 我们的消费者到底是谁？Target Audience - Who are we trying to influence?
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <i-input
              type="textarea"
              v-model="pibValue.I_4"
              :autosize="{minRows: 2, maxRows: 7}"
              placeholder="请尽可能详细的说明其年龄、性别、地域、经济收入等特征以帮助创意人员了解"
            ></i-input>
          </li>
        </ul>
      </div>
      <div class="vertical">
        <h3>
          <span class="required-tag">*</span>
          5. 客户是否已经签约某个IP或者明星代言？ Any IP/Celebrity has booked? 
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <i-input
              type="textarea"
              v-model="pibValue.I_5"
              :autosize="{minRows: 2, maxRows: 7}"
              placeholder=""
            ></i-input>
          </li>
        </ul>
      </div>
      <div class="vertical">
        <h3>
          <span class="required-tag">*</span>
          6. 本次活动是否有任何地域限制？ What Geographies are we talking about?
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <i-input
              type="textarea"
              v-model="pibValue.I_6"
              :autosize="{minRows: 2, maxRows: 7}"
              placeholder="请提供地域限制信息"
            ></i-input>
          </li>
        </ul>
      </div>

      <h2>II. 目的目标策略测量_OGSM</h2>
      <div class="vertical">
        <h3>
          <span class="required-tag">*</span>
          1. 本次活动的目的是？What are the total campaign objectives?
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <i-input
              type="textarea"
              v-model="pibValue.II_1"
              :autosize="{minRows: 2, maxRows: 7}"
              placeholder="一阵见血的说明本次活动的目的，请依据重要性有效排序"
            ></i-input>
          </li>
        </ul>
      </div>
      <div class="vertical">
        <h3>
          <span class="required-tag">*</span>
          2. 本次活动的战略目标是？ What is the goal of the campaign?
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <i-input
              type="textarea"
              v-model="pibValue.II_2"
              :autosize="{minRows: 2, maxRows: 7}"
              placeholder="请依据重要性有效排序"
            ></i-input>
          </li>
        </ul>
      </div>
      <div class="vertical">
        <h3>
          <span class="required-tag">*</span>
          3. 本次活动的预算是多少？What are the budgets?
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <i-input
              type="textarea"
              v-model="pibValue.II_3"
              :autosize="{minRows: 2, maxRows: 7}"
              placeholder="如果预算已经有初步划分，请将划分的金额也列在该处"
            ></i-input>
          </li>
        </ul>
      </div>
      <div class="">
        <h3>
          <span class="required-tag">*</span>
          4. 本次活动的KPI是什么？How will Campaign goal be tracked? 
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <h4>(a) 定量KPI Quantitatively:</h4>
            <i-input type="textarea" :autosize="{minRows: 2, maxRows: 7}" v-model="pibValue.II_a4"></i-input>
          </li>
          <li class="g-fl">
            <h4>(b) 定性KPI Qualitatively:</h4>
            <i-input type="textarea" :autosize="{minRows: 2, maxRows: 7}" v-model="pibValue.II_b4"></i-input>
          </li>
          <li class="g-fl">
            <h4>(c) 历史表现数据整理 Are there any historical results we should consider:</h4>
            <i-input type="textarea" :autosize="{minRows: 2, maxRows: 7}" v-model="pibValue.II_c4" placeholder="请将历史表现数据或行业benchmark数据的文件路径置于该处"></i-input>
          </li>
        </ul>
      </div>
      <div class="vertical">
        <h3>
          <span class="required-tag">*</span>
          5. 客户提供的Brief文件 Client Brief Deck and Materials
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <i-input
              type="textarea"
              v-model="pibValue.II_5"
              :autosize="{minRows: 2, maxRows: 7}"
              placeholder="Brief文件路径"
            ></i-input>
          </li>
        </ul>
      </div>

      <h2>III. 交付_DELIVERABLES</h2>
      <div class="">
        <h3>
          <span class="required-tag">*</span>
          1. 上线日期及其他重要活动日期 What are the key campaign dates? 
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <h4>(a) 上线日期 Launch date:</h4>
            <i-input type="textarea" :autosize="{minRows: 2, maxRows: 7}" v-model="pibValue.III_a1"></i-input>
          </li>
          <li class="g-fl">
            <h4>(b) 重要日期 Other key dates:</h4>
            <i-input type="textarea" :autosize="{minRows: 2, maxRows: 7}" v-model="pibValue.III_b1"></i-input>
          </li>
        </ul>
      </div>
      <div class="">
        <h3>
          <span class="required-tag">*</span>
          2. 需要考虑的各渠道的交付物 Channel deliverables:
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <h4>电视及OTT、OTV、LED/LCD渠道 TVC channel </h4>
            <i-input type="textarea" v-model="pibValue.III_a2"></i-input>
          </li>
          <li class="g-fl">
            <h4>户外公交、地铁等渠道 OOH channel</h4>
            <i-input type="textarea" v-model="pibValue.III_b2"></i-input>
          </li>
          <li class="g-fl">
            <h4>社交媒体渠道 Social channel</h4>
            <i-input type="textarea" v-model="pibValue.III_c2"></i-input>
          </li>
          <li class="g-fl">
            <h4>线下渠道及路演、活动 Offline channel</h4>
            <i-input type="textarea" v-model="pibValue.III_d2"></i-input>
          </li>
          <li class="g-fl">
            <h4>周边物料 Peripherals </h4>
            <i-input type="textarea" v-model="pibValue.III_e2"></i-input>
          </li>
          <li class="g-fl">
            <h4>其他 Others</h4>
            <i-input type="textarea" v-model="pibValue.III_f2"></i-input>
          </li>
        </ul>
      </div>

      <h2>IV. 指导与限制原则_MANDATORIES & GUIDELINES</h2>
      <div class="vertical">
        <h3>
          <span class="required-tag">*</span>
        技术限制  Technical
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <i-input
              type="textarea"
              v-model="pibValue.IV_1"
              :autosize="{minRows: 2, maxRows: 7}"
              placeholder="如：客户是否需要PII信息限制，服务器是否有特殊要求"
            ></i-input>
          </li>
        </ul>
      </div>
      <div class="vertical">
        <h3>
          <span class="required-tag">*</span>
        法律提醒  Legal 
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <i-input
              type="textarea"
              v-model="pibValue.IV_2"
              :autosize="{minRows: 2, maxRows: 7}"
              placeholder="该品类是否有法律进去或过往法务纠纷"
            ></i-input>
          </li>
        </ul>
      </div>
      <div class="vertical">
        <h3>
          <span class="required-tag">*</span>
        创意要求  Creative 
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <i-input
              type="textarea"
              v-model="pibValue.IV_3"
              :autosize="{minRows: 2, maxRows: 7}"
              placeholder="客户的品牌创意方向与风格"
            ></i-input>
          </li>
        </ul>
      </div>
      <div class="vertical">
        <h3>
          <span class="required-tag">*</span>
        授权字体  Font 
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <i-input
              type="textarea"
              v-model="pibValue.IV_4"
              :autosize="{minRows: 2, maxRows: 7}"
              placeholder=""
            ></i-input>
          </li>
        </ul>
      </div>
      <div class="vertical">
        <h3>
          <span class="required-tag">*</span>
        品牌调性  Brand Guidelines 
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <i-input
              type="textarea"
              v-model="pibValue.IV_5"
              :autosize="{minRows: 2, maxRows: 7}"
              placeholder="品牌VI手册、logo、标准色"
            ></i-input>
          </li>
        </ul>
      </div>
      <div class="vertical">
        <h3>
          <span class="required-tag">*</span>
        其他  Others 
        </h3>
        <ul class="f-clearfix">
          <li class="g-fl">
            <i-input
              type="textarea"
              v-model="pibValue.IV_6"
              :autosize="{minRows: 2, maxRows: 7}"
              placeholder=""
            ></i-input>
          </li>
        </ul>
      </div>

      <h2>V. 项目组花名册_PAN TEAM ROSTER</h2>
      <div class="vertical">
        <ul class="f-clearfix">
          <li class="g-fl">
            <i-input
              type="textarea"
              v-model="pibValue.V"
              :autosize="{minRows: 5, maxRows: 7}"
              placeholder="公司Party、姓名Name、职务Position、手机Mob、座机Ext、邮箱Email、微信WeChat
请提供客户及合作供应商的联系信息以便处理紧急事宜"
            ></i-input>
          </li>
        </ul>
      </div>
      <div class="submit-btns">
        <Button type="primary" class="submit-btn form-default-btn hollow-default" size="large" @click.native="cancelEdit">取消</Button>
        <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="toPreview">提交</Button>
      </div>
      
    </Card>
    
    <toast :msg="toastMsg" :status="toastStatus" :is-toast="isToast"></toast>
    <project-preview :is-show="previewShow" type="pib" :pib-value="pibValue" @on-close="closePreview" @on-submit="submit"></project-preview>
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
  import ProjectPreview from '../../components/popup/ProjectPreview'
  import { Project } from '../../API/api'
  import Toast from '../../components/popup/Toast'
  import LeaveModal from '../../components/popup/LeaveModal'
  import LoadDraftModal from '../../components/popup/LoadDraftModal'

  export default {
    components: {
      Toast,
      LeaveModal,
      LoadDraftModal,
      ProjectPreview},
    name: 'edit-pib',
    data () {
      return {
        menu: null,
        isSaved: false,
        isDraft: false,
        isLeaveConfirm: false,
        crumb: [
          {
            label: '项目管理',
            url: '/projects/list'
          },
          {
            label: '编辑PIB'
          }
        ],
        toastMsg: null,
        toastStatus: null,
        isToast: false,
        previewShow: false,
        id: this.$route.params.projectId,
        pibConf: [],
        pibValue: {
          I_1: null,
          I_2: null,
          I_4: null,
          I_5: null,
          I_6: null,
          I_a3: null,
          I_b3: null,

          II_1: null,
          II_2: null,
          II_3: null,
          II_5: null,
          II_a4: null,
          II_b4: null,
          II_c4: null,

          III_a1: null,
          III_b1: null,
          III_a2: null,
          III_b2: null,
          III_c2: null,
          III_d2: null,
          III_e2: null,
          III_f2: null,

          IV_1: null,
          IV_2: null,
          IV_3: null,
          IV_4: null,
          IV_5: null,
          IV_6: null,

          V: null
        }
      }
    },
    methods: {
      submit () {
        let data = {
          projectId: this.id,
          pib: this.pibValue
        }
        this.$http.post(Project.pibEditSave, this.qs.stringify(data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          this.previewShow = false
          let _data = res.data
          if (_data.retCode !== 0) {
            this.isToast = true
            this.toastMsg = _data.retMsg
          } else {
            this.isToast = true
            this.toastStatus = 'success'
            this.toastMsg = '提交成功'
            this.isSaved = true
            localStorage.removeItem('editPib')
          }
          setTimeout(() => {
            this.isToast = false
            this.toastStatus = null

            if (_data.retCode === 0) {
              // alert(this.loadedData.info.projectId)
              this.$router.push('/projects/list')
            } else if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }, 1500)
        })
      },
      toPreview () {
        let notFull = false
        for (let key in this.pibValue) {
          if (!this.pibValue[key] || this.pibValue[key] === '') {
            notFull = true
          }
        }
        if (notFull) {
          this.isToast = true
          this.toastMsg = '请填写所有带 * 的必填项'
          setTimeout(() => {
            this.isToast = false
          }, 1500)
          return
        }
        this.previewShow = true
      },
      closePreview () {
        this.previewShow = false
      },
      getPib () {
        this.$http.post(Project.pibEditIndex, this.qs.stringify({projectId: this.id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode !== 0 && _data.retCode !== 100014) {
            this.isToast = true
            this.toastMsg = _data.retMsg
          } else if (_data.retCode === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          } else {
            this.pibValue = _data.retData.data.projectPib
          }
          setTimeout(() => {
            this.isToast = false
            this.toastStatus = null
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
        this.isDraft = localStorage.hasOwnProperty('editPib')
      },
      loadDraft () {
        const _draft = localStorage.getItem('editPib')
        const draft = JSON.parse(_draft)
        this.pibValue = draft.pib

        this.cancelDraft()
      },
      cancelDraft () {
        this.isDraft = false
      },
      saveLeavePage () {
        let data = {
          pib: this.pibValue
        }
        const pibData = JSON.stringify(data)
        localStorage.setItem('editPib', pibData)
        this.isSaved = true
        this.$store.dispatch('toggleMenuJump', true)
        this.routerNext()
      },
      leavePage () {
        this.isSaved = true
        this.$store.dispatch('toggleMenuJump', true)
        this.routerNext()
      },
      cancelEdit() {
        this.isSaved = true
        this.$router.go(-1)
      }
    },
    created () {
      this.getPib()
      this.parserDraft()
      this.cacheMenu()
    },
    beforeRouteLeave (to, from, next) {
      // next()
      this.leaveConfirm(next)
      this.routerNext = next
    }
  }
</script>

<style scoped lang="less">
  .pib-edit {
    .pib-card {
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
          margin: 0;
          font-weight: normal;

        }
      }
      .ivu-card-body {
        padding: 32px;
      }
    }
    h2 {
      font-size: 14px;
      color: #343a40;
      margin-bottom: 30px;
      font-weight: normal;

    }
    .submit-btns {
      text-align: right;
      button {
        margin-left: 16px;
      }
    }
    .ivu-card-body {
      > div {
        margin-bottom: 16px;
        &.vertical {
          ul {
            li {
              width: 100%;
            }
          }
        }
        h3 {
          height: 32px;
          line-height: 32px;
          background-color: #fff9db;
          font-size: 14px;
          color: #343a40;
          border: 1px solid #ced4da;
          padding-left: 16px;
          font-weight: normal;

        }
        ul {
          li {
            width: 50%;
            h4 {
              background-color: #f8f9fa;
              font-size: 16px;
              height: 48px;
              line-height: 48px;
              color: #343a40;
              border: 1px solid #ced4da;
              padding-left: 16px;
              font-weight: normal;
            }
            .input{
              height: 48px;
            }

          }
        }
      }
    }

  }
  .hollow-default {
    background-color: #fff;
    color: #2d8ef8;
  }
</style>
