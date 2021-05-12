<template>
  <div class="edit-form preview preview-project">

    <!-- 审核不通过理由  —— 开始 -->
    <Alert v-if="info.state === 2" type="error" class="nopass">
      <span class="alert-title">
        <Icon type="android-alert" size="20"></Icon>
        PAR不通过
      </span>
      <span class="alert-detail">
        <i-input type="textarea" autosize :value="info.parReason" disabled></i-input>
      </span>
    </Alert>
    <Alert v-if="info.state === 5" type="error" class="nopass">
      <span class="alert-title">
        <Icon type="android-alert" size="20"></Icon>
        PIB不通过
      </span>
      <span class="alert-detail">
        <i-input type="textarea" autosize :value="info.pibReason" disabled></i-input>
      </span>
    </Alert>
    <!-- 审核不通过理由  —— 结束 -->
    
    <div>

      <!-- 项目详情  ——  开始 -->
      <div class="project-info">
        <div  title="品牌图片">
          <img v-if="info.customerPicture" class="image" :src="info.customerPicture" width="150" height="150" alt="品牌图片">
          <div v-else class="no-customer-pic">暂无品牌图片</div>
        </div>
        <div class="content">
          <div>
            <span>项目名称：</span>
            <span>{{info.name}}</span>
          </div>
          <div>
            <span>项目分级：</span>
            <span>{{levels[info.level]}}</span>
          </div>
          <div>
            <span>开始时间：</span>
            <span>{{info.startTime}}</span>
          </div>
        </div>
        <div class="content">
          <div>
            <span>所属品牌：</span>
            <router-link :to="{ path: `/v2/resource/brand/${info.customerId}`}">{{info.customerName}}</router-link>
          </div>
          <div>
            <span>项目类型：</span>
            <span>{{projectTypePreview[info.periodType]}}</span>
          </div>
          <div>
            <span>结束时间：</span>
            <span>{{info.endTime}}</span>
          </div>
        </div>
      </div>
      <!-- 项目详情  ——  结束 -->

      
      <div class="project-par-pib" :class="{'no-pib': !pib}">
        <Tabs v-model="currTab" :animated="false">
          <!-- PAR  ——  开始 -->
          <TabPane label='PROJECT  ASSESSMENT  REQUEST (PAR)' name='par'>
            <div class="content">
              <project-par :info='par' :parStruct="parStruct" :projectMember="projectMember"></project-par>
            </div>
          </TabPane>
          <!-- PAR  ——  结束 -->

          <TabPane v-if="pib" label='PROJECT (DE) BRIEF SHEET (PIB)' name='pib'>
            <div class="content">
              <project-pib :info='pib'></project-pib>
            </div>
          </TabPane>
        </Tabs>
        <div class='btn-group'>
          <template v-if="role.parAudit === 'show' &&  currTab == 'par'">
            <Button type="primary" class="btn hollow-default" size="large" @click.native="showModal(2)">审核不通过</Button>
            <Button type="primary" class="btn" size="large" @click.native="audit(3)">审核通过</Button>
          </template>
          <template v-if="role.pibAudit === 'show'  &&  currTab == 'pib'">
            <Button type="primary" class="btn hollow-default" size="large" @click.native="showModal(5)">审核不通过</Button>
            <Button type="primary" class="btn" size="large" @click.native="audit(6)">审核通过</Button>
          </template>
  
          <template v-if="role.eidt === 'show' && currTab == 'par'">
            <Button type="primary" class="btn" size="large" @click.native="toEdit(info.id, 'par')">编辑PAR</Button>
          </template>
          <template v-if="role.editPib === 'show' && currTab == 'pib'">
            <Button type="primary" class="btn" size="large" @click.native="toEdit(info.id, 'pib')">编辑PIB</Button>
          </template>
          <template v-if="role.addPib === 'show'">
            <Button type="primary" class="btn" size="large" @click.native="toPib">添加PIB</Button>
          </template>
        </div>
      </div>


    </div>

   



    <Modal v-model="isModal" class-name="vertical-center-modal examine-modal" ok-text="提交" width="480px" :closable="false">
      <i-input type="textarea" v-model="modalValue" :autosize="{minRows: 5}" placeholder="填写不通过的理由"></i-input>
      <span class="words-count" :class="{'over-length': modalValue.length > 1000}">{{modalValue.length}}/1000</span>
      <div slot="footer" class="custom-footer">
        <Button type="primary" size="large" class="ok" @click.native="audit(nopassState, modalValue)" :disabled="modalValue.length > 1000">提交</Button>
      </div>
    </Modal>
    <Modal  v-model="isSubmit" class-name="vertical-center-modal submit-modal" ok-text="提交" width="480px" :closable="false" :mask-closable="false">
      <p>任务提交成功，是否提交任务给质检人进行质检？</p>
      <div slot="footer" class="custom-footer">
        <Button type="primary" size="large" class="cancel bc-transparent hollow-default" @click.native="audit()">取消</Button>
        <Button type="primary" size="large" class="ok" @click.native="audit()" >提交</Button>
      </div>
    </Modal>
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import Loading from './popup/Loading'
  import Toast from './popup/Toast'
  import {Project} from '../API/api'
  import projectPar from './projects/detail/par.vue'
  import projectPib from './projects/detail/pib.vue'

  export default {
    name: 'project-detail-display',
    components: {
      Toast,
      Loading,
      projectPar,
      projectPib
    },
    props: {
      info: {
        type: Object,
        default: function () {
          return {}
        }
      },
      pib: {
        type: [Object, String],
        default: function () {
          return ''
        }
      },
      par: {
        type: Object,
        default: function () {
          return {}
        }
      },
      parStruct: {
        type: [Array]
      },
      projectMember: {
        type: [Object]
      },
      role: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        projectTypePreview: {
          P: 'Campaign Project',
          R: 'Retainer Project'
        },
        currTab: 'par',
        nopassState: null,
        modalValue: '',
        isModal: false,
        isSubmit: false,
        isLoading: false,
        isToast: false,
        toastMsg: null,
        toastState: null,
        id: this.info.id,
        levels: {
          1: 'S级',
          2: 'A级',
          3: 'B级',
          4: 'C级'
        }
      }
    },
    watch: {
      pib: {
        handler (data) {
          if (this.info.state != 1 && this.info.state != 2) {
             this.currTab =  'pib'
          }
        }
      }
    },
    methods: {
      toEdit (id, type) {
        switch (type) {
          case 'par':
            this.$router.push('/projects/edit/' + id)
            break
          case 'pib':
            this.$router.push('/projects/editpib/' + id)
            break
        }
      },
      audit (state, reason) {
        let data = {
          id: this.info.id,
          state: state,
          reason: reason
        }
        this.isModal = false
        this.$http.post(Project.audit, this.qs.stringify(data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          this.isLoading = false
          if (_data.retCode !== 0) {
            this.isToast = true
            this.toastMsg = _data.retMsg
          } else {
            this.isToast = true
            this.toastMsg = '提交成功'
            this.toastState = 'success'
          }
          setTimeout(() => {
            this.isToast = false
            this.toastState = null
            this.$emit('on-audit')
          }, 1500)
        })
      },
      showModal (state) {
        // 1待PAR审核，2PAR审核不通过 3 PAR审核通过 4待PIB审核，5PIB审核不通过 6审核通过执行中
        this.isModal = true
        this.nopassState = state
      },
      toPib () {
        this.$router.push('/projects/addpib/' + this.info.id)
      }
    }
  }
</script>

<style scoped lang="less">
  .audit-btns {
    button {
      margin-left: 16px;
    }
  }
  .hollow-default {
    background-color: #fff;
    color: #2d8ef8;
  }
  .preview {
    > div:not(.nopass) {
      background-color: #fff;
      padding: 30px 0;
      width: 100%;
      height: 100%;
      overflow: auto;
    }

    .hollow-default {
      background-color: #fff;
      color: #2d8ef8;
    }
    .submit-btns {
      button {
        margin-left: 16px;
      }
    }
    h2 {
      height: 48px;
      line-height: 48px;
      background-color: #dde8f6;
      font-size: 14px;
      padding: 0 20px;
      margin-bottom: 30px;
      color: #343a40;
    }
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
        font-weight: normal;
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
          &+ span {
            color: #343a40;
          }
          .ivu-checkbox-disabled {
            .ivu-checkbox-inner {
              border-color: #2d8cf0;
              background-color: #fff;
            }
          }
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
          .ivu-radio-disabled {
            .ivu-radio-inner {
              border-color: #2d8cf0;
              background-color: #fff;
            }
          }
        }
      }
      .ivu-col {
        margin-left: -1px;
      }
    }

  }
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
  .project-info {
    display: flex;
    background: #F8F9FA;
    border: 1px solid #CED4DA;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 30px;
    font-size: 18px;
    color: #495057;
    letter-spacing: 0;
    .image {
      border-radius: 50%;
      object-fit: cover
    }
    .no-customer-pic {
      width: 148px;
      height: 148px;
      line-height: 148px;
      text-align: center;
      border-radius: 50%;
      background-color: #ced4da;
      color: white

    }
    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px 40px;
    }
  }
  .project-par-pib {
    border: 1px solid #CED4DA;
    .content {
      padding: 0 20px
    }
    .btn-group {
      margin-top: 20px;
      margin-bottom: 40px;
      text-align: center;
      .btn {
        margin-left: 10px
      }
    }
  }
</style>
<style lang="less">
.project-par-pib {
  .ivu-tabs-nav {
    .ivu-tabs-tab {
      width: 50%;
      color: white;
      background: #ced4da;
      border-bottom: none
    }
    .ivu-tabs-tab-active{ 
      background: #2d8cf0
    }
  }
  
}
.no-pib {
  .ivu-tabs-tab {
    width: 100% !important
  }
}
</style>

