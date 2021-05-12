<template>
  <div class="sysNoticeForm">
    <i-form label-position="left" :label-width="100" class="default-form">
      <div class="form-group">
        <FormItem label="公告类型" class="default-form-item default-member-form" required>
          <Select
            :disabled="isDisplay"
            transfer
            v-model="formData.typeId"
            :class="{'display-select': isDisplay}"
          >
            <template v-for="(item) in typeConf">
              <Option :key="item.id" :value="item.id">{{ item.label }}</Option>
            </template>
          </Select>
        </FormItem>
        <FormItem label="公告标题" class="default-form-item default-member-form" required>
          <i-input :readonly="isDisplay" v-model="formData.title" placeholder="请输入公告标题"></i-input>
        </FormItem>
        <FormItem label="关联工具包" class="default-form-item">
          <Select
            :disabled="isDisplay"
            transfer
            v-model="formData.task_toolkit_id"
            :class="{'display-select': isDisplay}"
            clearable
          >
            <template v-if="allToolkit.length > 0">
              <OptionGroup
                :label="toolkitItem.productName"
                v-for="(toolkitItem, key) in allToolkit"
                :key="toolkitItem.productId"
              >
                <Option
                  v-for="(_toolkitItem, key) in toolkitItem.child"
                  :value="_toolkitItem.toolkitId"
                  :key="_toolkitItem.toolkitId"
                >{{ _toolkitItem.toolkitName }}</Option>
              </OptionGroup>
            </template>
          </Select>
        </FormItem>
        <FormItem label="缩略图" class="default-form-item default-member-form">
          <div v-if="isDisplay" class="thumb-area">
            <div class="demo-upload-list" v-for="item in defaultList">
              <img :src="item.url" />
            </div>
          </div>
          <div v-else class="thumb-area">
            <div class="demo-upload-list" v-for="item in uploadList">
              <template v-if="item.status === 'finished'">
                <img :src="item.url" />
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
              style="display: inline-block;width:58px;"
            >
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
            <Modal title="View Image" v-model="visible">
              <img
                :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
                v-if="visible"
                style="width: 100%"
              />
            </Modal>
          </div>
        </FormItem>
        <FormItem label="公告内容" class="default-form-item default-member-form hide-upload" required>
          <Upload
            :show-upload-list="false"
            :on-success="handleEditSuccess"
            :format="['jpg','jpeg','png','gif']"
            multiple
            action="/api/ueditor/index?action=uploadfile&encode=utf-8"
          >
            <Button icon="ios-cloud-upload-outline"></Button>
          </Upload>
          <div v-if="isDisplay" class="default-form-member-selection">
            <div v-html="formData.content"></div>
          </div>
          <quillEditor
            v-else
            id="editor"
            ref="QuillEditors"
            :options="editorOptions"
            v-model="formData.content"
          ></quillEditor>
        </FormItem>
        <FormItem v-if="!isDisplay" label="状态" class="default-form-item" required>
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
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { Sys } from "../API/api";
const { quillEditor } = require("vue-quill-editor");

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image", "video"],
  ["clean"] // remove formatting button
];
export default {
  name: "sys-notice-form",
  components: { quillEditor },
  props: {
    formData: {
      type: Object,
      default() {
        return {};
      }
    },
    isDisplay: {
      type: Boolean,
      default: false
    }
    // defaultList: {
    //   type: Array,
    //   default () {
    //     return []
    //   }
    // }
  },
  data() {
    return {
      editorOptions: {
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  // 调用iview图片上传
                  document
                    .querySelector(".hide-upload .ivu-upload .ivu-btn")
                    .click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      typeConf: [
        {
          id: 1,
          label: "EXCALIBUR"
        },
        {
          id: 2,
          label: "人事部通知"
        },
        {
          id: 3,
          label: "行政部通知"
        },
        {
          id: 4,
          label: "SDC通知"
        },
        {
          id: 5,
          label: "NCC通知"
        },
        {
          id: 6,
          label: "NHU通知"
        }
      ],
      uploadList: [],
      imgName: "",
      visible: false,
      baseUrl: "",
      allToolkit: [],
      switchState: false,
      defaultList: []
    };
  },
  computed: {
    // defaultList () {
    //   if (this.formData.picture) {
    //     const data = [
    //       {
    //         'url': this.formData.picture,
    //         'name': ''
    //       }
    //     ]
    //     return data
    //   } else {
    //     return []
    //   }
    // }
  },
  methods: {
    init() {
      this.getAllToolkitNBrand();
      this.setState();
      this.setDefault();
    },
    handleEditSuccess(res) {
      // 获取富文本组件实例
      console.log(this.$refs.QuillEditors)
      let quill = this.$refs.QuillEditors.quill;

      this.$nextTick(() => {
        // 如果上传成功
        if (res) {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片，res为服务器返回的图片链接地址
          quill.insertEmbed(length, "image", window.location.origin + res);
          // 调整光标到最后
          quill.setSelection(length + 1);
        } else {
          // 提示信息，需引入Message
          Message.error("图片插入失败");
        }
      });
    },
    setState() {
      this.switchState = this.formData.state === 1;
    },
    changeState(e) {
      this.formData.state = e ? 1 : 2;
    },
    setDefault() {
      if (this.formData.picture) {
        this.defaultList.push({
          url: this.formData.picture,
          name: "1234"
        });
      }
      if (!this.isDisplay) {
        // this.$refs.editor.setContent(this.formData.content)
      }
    },
    getAllToolkitNBrand() {
      this.$http
        .post(Sys.tipsBrands, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          if (_data.retCode === 0) {
            this.allBrand = [{ id: "0", customerName: "全部品牌" }].concat(
              _data.retData.custom
            );
            this.allToolkit = this.allToolkit.concat(_data.retData.toolkit);
          }
        });
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      this.formData.picture = "";
    },
    handleSuccess(res, file, fileList) {
      file.url = res;
      file.name = "";
      this.formData.picture = res;
    },
    handleFormatError(file) {
      // this.$Notice.warning({
      //   title: 'The file format is incorrect',
      //   desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      // })
    },
    handleMaxSize(file) {
      // this.$Notice.warning({
      //   title: 'Exceeding file size limit',
      //   desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      // })
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    }
  },
  created() {
    this.init();
  },
  beforeMount() {},
  updated() {},
  mounted() {
    if (!this.isDisplay) {
      this.uploadList = this.$refs.upload.fileList;
    }
  }
};
</script>

<style scoped lang="less">
#editor {
  height: 400px;
  overflow: hidden;
}

.demo-upload-list {
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
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
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
<style lang="less">
.sysNoticeForm {
  .hide-upload {
    .ivu-upload {
      display: none;
    }
  }
}
</style>
