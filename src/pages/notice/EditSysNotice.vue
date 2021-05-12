<template>
  <div>
    <!--<div v-if="!isLoading">-->
    <div>
      <!--<sys-notice-form ref="noticeForm" :form-data="detail"></sys-notice-form>-->
      <div>
        <i-form label-position="left" :label-width="100" class="default-form" >
          <div class="form-group">
            <FormItem label="公告类型" class="default-form-item default-member-form" required>
              <Select transfer v-model="formData.typeId" >
                <template v-for="(item) in typeConf">
                  <Option :key="item.id" :value="item.id">{{ item.label }}</Option>
                </template>
              </Select>
            </FormItem>
            <FormItem label="公告标题" class="default-form-item default-member-form" required>
              <i-input v-model="formData.title" placeholder="请输入公告标题"></i-input>
            </FormItem>
            <FormItem label="关联工具包" class="default-form-item">
              <Select transfer v-model="formData.task_toolkit_id" >
                <template v-if="allToolkit.length > 0">
                  <OptionGroup :label="toolkitItem.productName" v-for="(toolkitItem, key) in allToolkit" :key="toolkitItem.productId">
                    <Option v-for="(_toolkitItem, key) in toolkitItem.child" :value="_toolkitItem.toolkitId" :key="_toolkitItem.toolkitId">{{ _toolkitItem.toolkitName }}</Option>
                  </OptionGroup>
                </template>
              </Select>
            </FormItem>
            <FormItem label="缩略图" class="default-form-item default-member-form">
              <div class="thumb-area">
                <div class="demo-upload-list" v-for="item in uploadList">
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                      <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                  </template>
                  <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                  </template>
                </div>
                <Upload
                  v-show="uploadList.length <= 0"
                  :default-file-list="defaultImgs"
                  ref="upload"
                  :show-upload-list="false"
                  accept="image/*"
                  :on-success="handleSuccess"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  type="drag"
                  :action="baseUrl + '/api/ueditor/index?action=uploadfile&encode=utf-8'"
                  style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                  </div>
                </Upload>
                <Modal title="View Image" v-model="visible">
                  <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                </Modal>
              </div>
            </FormItem>
            <FormItem label="公告内容" class="default-form-item default-member-form" required>
              <quillEditor id="editor" ref="editor" v-model="formData.content" ></quillEditor>
            </FormItem>
            <FormItem  label="状态" class="default-form-item" required>
              <div class="default-form-member-selection">
                <i-switch v-model="switchState" @on-change="changeState">
                  <span slot="open">开</span>
                  <span slot="close">关</span>
                </i-switch>
              </div>
            </FormItem>
          </div>
        </i-form>
      </div>
      <div class="g-ta-r">
        <Button type="primary" size="large" @click="save" :loading="isSaving">修改</Button>
      </div>
    </div>
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
  import BCrumb from '../../components/BCrumb'
  import SysNoticeForm from '../../components/SysNoticeForm'
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  import {Index, Sys} from '../../API/api'
  import SubHeader from '../../components/SubHeader'
  const { quillEditor } = require('vue-quill-editor');


  export default {
    name: '',
    components: {SubHeader, Toast, Loading, SysNoticeForm, BCrumb, quillEditor},
    data () {
      return {
        crumb: [
          {
            label: '系统公告'
          },
          {
            label: '公告列表',
            url: '/sysNotice/list'
          },
          {
            label: '编辑公告'
          }
        ],
        isSaving: false,
        isLoading: false,
        isToast: false,
        toastMsg: '',
        toastState: null,
        id: this.$route.params.id,
        formData: {},
        typeConf: [
          {
            id: 1,
            label: 'EXCALIBUR'
          },
          {
            id: 2,
            label: '人事部通知'
          },
          {
            id: 3,
            label: '行政部通知'
          },
          {
            id: 4,
            label: 'SDC通知'
          },
          {
            id :5,
            label : 'NCC通知'
          },
          {
            id: 6,
            label: 'NHU通知'
          }
        ],
        uploadList: [],
        imgName: '',
        visible: false,
        baseUrl: '',
        allToolkit: [],
        switchState: false,
        defaultImgs: [
          // {
          //   url: '1234321.jpg',
          //   name: '1234321'
          // }
        ]
      }
    },
    methods: {
      init () {
        this.getDetail()

        this.getAllToolkitNBrand()
      },
      getDetail () {
        this.isLoading = true

        this.$http.post(Index.sysNoticeDetail, this.qs.stringify({declareId: this.$route.params.id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          const _data = res.data
          if (_data.retCode === 0) {
            this.formData = _data.retData
            if (_data.retData.picture) {
              this.uploadList.push({
                url: _data.retData.picture,
                name: '1',
                status: 'finished',
                percentage: 100
              })
            }
            this.setDefault()
            this.setState()
          }
        }).catch(() => {
          this.isLoading = false
          this.isToast = true
          this.toastMsg = '网络错误'
          this.toastState = null
          setTimeout(() => {
            this.isToast = false
          })
        })
      },
      save () {
        this.isSaving = true
        // this.formData.content = this.$refs.editor.getContent()

        this.$http.post(Index.editSysNotice, this.qs.stringify(this.formData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          this.isToast = true
          if (_data.retCode === 0) {
            this.toastState = 'success'
            this.toastMsg = '修改成功'
          } else {
            this.toastState = null
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            this.isSaving = false

            if (_data.retCode === 0) {
              this.$router.push('/sysNotice/list')
            }
          }, 1500)
        }).catch(() => {
          this.isSaving = false
          this.isToast = true
          this.toastMsg = '网络错误'
          this.toastState = null
          setTimeout(() => {
            this.isToast = false
          }, 1500)
        })
      },

      setState () {
        this.switchState = this.formData.state === 1
      },
      changeState (e) {
        this.formData.state = e ? 1 : 2
      },
      setDefault () {
        // if (!this.isDisplay) {
        //   this.$refs.editor.setContent(this.formData.content)
        // }
      },
      getAllToolkitNBrand () {
        this.$http.post(Sys.tipsBrands, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          if (_data.retCode === 0) {
            this.allBrand = [{id: '0', customerName: '全部品牌'}].concat(_data.retData.custom)
            this.allToolkit = this.allToolkit.concat(_data.retData.toolkit)
          }
        })
      },
      handleView (name) {
        this.imgName = name
        this.visible = true
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
        this.formData.picture = ''
      },
      handleSuccess (res, file, fileList) {
        file.url = res
        file.name = ''
        this.formData.picture = res
      },
      handleFormatError (file) {
        // this.$Notice.warning({
        //   title: 'The file format is incorrect',
        //   desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        // })
      },
      handleMaxSize (file) {
        // this.$Notice.warning({
        //   title: 'Exceeding file size limit',
        //   desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        // })
      },
      handleBeforeUpload () {
        // const check = this.uploadList.length < 1
        // if (!check) {
        //   this.$Notice.warning({
        //     title: 'Up to five pictures can be uploaded.'
        //   })
        // }
        // return check
      }
    },
    created () {
      this.init()
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList
    }
  }
</script>

<style scoped lang="less">
  #editor {
    height: 400px;
    overflow: hidden;

  }

  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  .thumb-area {
    padding: 16px 24px;
    line-height: 0;
  }
</style>
