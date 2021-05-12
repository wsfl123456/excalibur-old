<template>
  <div>
    <i-form label-position="left" :label-width="88" class="default-form">
      <div class="form-group">
        <FormItem label="品牌" class="default-form-item" required>
          <Select transfer v-model="addData.customer_id" >
            <Option v-for="(item, key) in allBrand" :value="+item.id" :key="item.id">{{ item.customerName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="工具包" class="default-form-item" required>
          <Select transfer v-model="addData.task_toolkit_id" @on-change="changeToolkit">
            <template v-if="allToolkit.length > 0">
              <OptionGroup :label="toolkitItem.productName" v-for="(toolkitItem, key) in allToolkit" :key="toolkitItem.productId">
                <Option v-for="(_toolkitItem, key) in toolkitItem.child" :value="_toolkitItem.toolkitId" :key="_toolkitItem.toolkitId">{{ _toolkitItem.toolkitName }}</Option>
              </OptionGroup>
            </template>
          </Select>
        </FormItem>
        <FormItem label="标签" class="default-form-item" required>
          <Select transfer v-model="addData.name">
            <template v-if="formDataLabel[addData.task_toolkit_id] && formDataLabel[addData.task_toolkit_id].length === 0">
              <Option value="0" disabled>无可用标签</Option>
            </template>
            <template v-else>
              <template v-for="(formItem, key) in (formDataLabel[addData.task_toolkit_id] || formDataLabel['default']) ">
                <Option :value="formItem.label">{{ formItem.label }}</Option>
              </template>
            </template>
          </Select>
        </FormItem>
        <FormItem label="标题" class="default-form-item" required>
          <i-input placeholder="填写标题" v-model="addData.title"></i-input>
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
              ref="upload"
              :show-upload-list="false"
              accept="image/*"
              :default-file-list="defaultList"
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
        <FormItem label="内容" class="default-form-item" required>
          <Vueditor id="editor" ref="editor"></Vueditor>
        </FormItem>
        <FormItem label="状态" class="default-form-item" required>
          <div class="default-form-member-selection">
            <i-switch v-model="switchState" @on-change="changeState">
              <span slot="open">开</span>
              <span slot="close">关</span>
            </i-switch>
          </div>

        </FormItem>
      </div>
    </i-form>
    <div class="g-ta-r">
      <Button type="primary" size="large" @click="save">确定</Button>
    </div>
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import {Sys} from '../../../API/api'
  import {formTips} from '../../../assets/conf/formDataTips.conf'
  import 'vueditor/dist/style/vueditor.min.css'
  import BCrumb from '../../../components/BCrumb'
  import Loading from '../../../components/popup/Loading'
  import Toast from '../../../components/popup/Toast'
  import SubHeader from '../../../components/SubHeader'
  export default {
    name: '',
    components: {SubHeader, Toast, Loading, BCrumb},
    data () {
      return {
        isLoading: false,
        isToast: false,
        toastMsg: null,
        toastState: null,
        crumb: [
          {label: '系统设置 '},
          {label: '功能配置管理'},
          {label: '品牌工具包Tips', url: '/functionManage/tips'},
          {label: '编辑工具包Tips'}
        ],
        addData: {
          customer_id: null,
          task_toolkit_id: null,
          name: '',
          content: '',
          state: 2,
          functionId: 0,
          title: null,
          picture: ''
        },
        formDataLabel: formTips,
        allBrand: [],
        allToolkit: [],
        functionList: [],
        switchState: false,
        uploadList: [],
        imgName: '',
        visible: false,
        baseUrl: '',
        defaultList: []
      }
    },
    methods: {
      getTips () {
        this.isLoading = true
        this.$http.post(Sys.tipDetail, this.qs.stringify({tipsId: this.$route.params.tipId}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          const _data = res.data
          if (_data.retCode === 0) {
            this.getFunction(_data.retData.task_toolkit_id)
            this.addData.functionId = _data.retData.functionId
            this.addData.state = _data.retData.state
            this.addData.customer_id = _data.retData.customer_id
            this.addData.task_toolkit_id = _data.retData.task_toolkit_id
            this.addData.name = _data.retData.name
            this.addData.content = _data.retData.content
            this.addData.title = _data.retData.title
            this.addData.picture = _data.retData.picture
            this.switchState = _data.retData.state === 1

            this.$refs.editor.setContent(_data.retData.content)
            if (_data.retData.picture) {
              this.uploadList.push({
                url: _data.retData.picture,
                name: '1',
                status: 'finished',
                percentage: 100
              })
            }
          }
        })
      },
      changeToolkit (e) {
        this.getFunction(e)
      },
      getFunction (id) {
        this.$http.post(Sys.toolkitfunction, this.qs.stringify({toolkitId: id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          if (_data.retCode === 0) {
            this.functionList = _data.retData.data
          }
        })
      },
      changeState (e) {
        this.addData.state = e ? 1 : 2
      },
      getAllToolkitNBrand () {
        this.$http.post(Sys.tipsBrands, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          if (_data.retCode === 0) {
            this.allBrand = [{id: '0', customerName: '全部品牌'}].concat(_data.retData.custom)
            this.allToolkit = _data.retData.toolkit
          }
          this.getTips()
        })
      },
      save () {
        this.isLoading = true
        const content = this.$refs.editor.getContent()
        this.addData.content = content
        this.addData.id = this.$route.params.tipId
        this.$http.post(Sys.editTips, this.qs.stringify(this.addData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          const _data = res.data
          if (_data.retCode === 0) {
            this.isToast = true
            this.toastState = 'success'
            this.toastMsg = '保存成功'

            setTimeout(() => {
              this.isToast = false
              this.$router.back()
            }, 1500)
          } else {
            this.isToast = true
            this.toastState = null
            this.toastMsg = _data.retMsg
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
        this.addData.picture = ''
      },
      handleSuccess (res, file, fileList) {
        file.url = res
        file.name = ''
        this.addData.picture = res
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
        const check = this.uploadList.length < 1
        if (!check) {
          this.$Notice.warning({
            title: 'Up to five pictures can be uploaded.'
          })
        }
        return check
      }
    },
    created () {
      this.getAllToolkitNBrand()
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList
    }
  }
</script>

<style scoped lang="less">
  #editor {
    height: 300px;
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
