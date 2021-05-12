<template>
  <div class="contract-table-wrapper">
    <p class="main-title" style="margin-top: -20px;">
      <span>上传财务凭证</span>
      <span class="minor">
        (
        <span class="red">注：</span>
        文件为jpg、jpeg、png或pdf格式，且文件小于10MB)
      </span>
    </p>
    <div class="image-wrapper">
      <div class="image-box">
        <div v-if="!formData.uploadImgUrl" class="camera-box">
          <Upload
            :show-upload-list="false"
            accept="image/*, .pdf"
            :format="['jpg','jpeg','png', 'pdf']"
            :on-success="handleSuccess"
            :on-format-error="handleError"
            :on-exceeded-size="handleMaxSizeError"
            :on-error="handleError"
            :max-size="1024*10"
            type="drag"
            action="/api/ueditor/index?action=uploadfile&encode=utf-8"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="camera" size="20"></Icon>
            </div>
          </Upload>
          <p class="font">上传财务凭证</p>
        </div>
        <div class="img-box" v-else>
          <Icon @click="resetUploadImg" class="close-icon" size="20" color="#868E96" type="close-round"></Icon>
          <img class="upload-img" :src="formData.uploadImgUrl">
        </div>
      </div>
    </div>

    <div class="certificate-table-wrapper">
      <p class="title">添加凭证信息</p>

      <i-form label-position="left" :label-width="120" class="default-form client-contract">
        <div class="contract-form-group">
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="凭证类型" class="default-form-item" required>
                <RadioGroup
                  size="large"
                  style="padding-left:24px"
                  :value="formData.certificateType"
                  @input="getContractList"
                >
                  <Row>
                    <i-col span="8">
                      <Radio :label="1" style="height:53px;line-height:53px">客户发票</Radio>
                    </i-col>
                    <i-col span="8">
                      <Radio :label="2" style="height:53px;line-height:53px">供应商发票</Radio>
                    </i-col>
                  </Row>
                </RadioGroup>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="凭证名称" class="default-form-item" required>
                <i-input v-model="formData.certificateName" placeholder="请输入凭证名称"></i-input>
              </FormItem>
            </i-col>
          </Row>
          <Row v-if="showRelatedContract">
            <i-col span="24" class="default-form-member-col">
              <FormItem label="关联合同" class="default-form-item" required>
                <el-select :value="formData.relatedContract" @input="selectContract" filterable placeholder="输入关键字选择合同">
                  <el-option v-for="item in contractList" :value="item.hetongId" :label="item.taskName"></el-option>
                </el-select>
              </FormItem>
            </i-col>
          </Row>
          <Row v-if="showRelatedContract">
            <i-col span="24" class="default-form-member-col">
              <FormItem label="关联付款" class="default-form-item">
                <el-select v-model="formData.fukuanId" multiple placeholder="请选择关联付款">
                  <el-option v-for="item in fukuanList" :value="item.kfId" :label="`${item.pmReason} - ${item.priceTotal}`"></el-option>
                </el-select>
              </FormItem>
            </i-col>
          </Row>
          <Row v-if="showRelatedContract">
            <i-col span="24" class="default-form-member-col">
              <FormItem label="关联项目结算单" class="default-form-item" required>
                <el-select v-model="formData.relatedQuotation" multiple placeholder="请选择关联项目结算单">
                  <el-option v-for="item in quotationList" :value="item.baojiadanId" :label="item.taskName"></el-option>
                </el-select>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="品牌信息" class="default-form-item" required>
                <i-input v-model="formData.brandInfo" placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="项目信息" class="default-form-item" required>
                <i-input v-model="formData.projectInfo" placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="发票号" class="default-form-item" required>
                <i-input v-model="formData.invoiceNo" placeholder="请输入发票号"></i-input>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="金额" class="default-form-item" required>
                <i-input :value="formatMoney(formData.money)" @input="moneyChange" placeholder="请输入金额"></i-input>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="开票日期" class="default-form-item" required>
                <DatePicker
                  transfer
                  class="deadline"
                  type="date"
                  placeholder="请选择开票日期"
                  format="yyyy-MM-dd"
                  :clearable="false"
                  v-model="formData.createDate"
                ></DatePicker>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="账期" class="default-form-item" required>
                <InputNumber
                  :min="0"
                  :step="1"
                  v-model="formData.endDate"
                  :formatter="value => `${value}（天）`"
                  :parser="value => value.replace('（天）', '')"
                  placeholder="请输入账期"
                ></InputNumber>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="文件名" class="default-form-item" required>
                <i-input v-model="formData.filename" placeholder="请输入文件名"></i-input>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="公盘地址" class="default-form-item" required>
                <i-input v-model="formData.fileDiskAddress" placeholder="请输入公盘地址"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
      </i-form>

      <Button type="primary" class="submit-btn" @click="addFinanceCertificate">提交</Button>
    </div>

    <toast :msg="toastMsg"  :is-toast="showToast"></toast>
  </div>
</template>

<script type="text/jsx">
  import './index.less';
  import { dateToYMD, thousandSplit } from '../../util/util';
  import Toast from "../../components/popup/Toast";
  import { Task } from "../../API/api";
import { type } from 'os';

  export default {
    name: "upload-certificate",
    created() {
      if (this.$route.name !== 'editFinanceCertificate') this.getContractList();

      /* 编辑页面信息时调用，填充信息 */
      if (this.$route.name === 'editFinanceCertificate') {
        this.isEditFile = true;

        this.$http.post(Task.getInvoice, this.qs.stringify({pinzhengType: 0, fuState: 0, pageSize: 1000}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
          .then(async res => {
            let _data = res.data;

            if (_data.retCode === 0) {
              let certificateId = this.$route.params.id;
              let currentFormData  = _data.retData.invoiceList.find(i => i.invoiceId == certificateId);

              this.formData.invoiceId = currentFormData.invoiceId;
              this.formData.uploadImgUrl = currentFormData.filePath;
              this.formData.certificateType = currentFormData.pinzhengType;
              this.formData.certificateName = currentFormData.invoiceTitle;
              this.formData.relatedContract = currentFormData.hetongId;
              this.formData.invoiceNo = currentFormData.invoiceNo;
              this.formData.money = currentFormData.price;
              this.formData.createDate = dateToYMD(currentFormData.kaipiaoDate);
              this.formData.endDate = currentFormData.zhangqi;
              this.formData.filename = currentFormData.fileName;
              this.formData.fileDiskAddress = currentFormData.fileAddress;

              let selectQutation = JSON.parse(currentFormData.baojiadanId).map(i => Number(i));
              let fukuanId = JSON.parse(currentFormData.fukuanId).map(i => Number(i));

              /* 同步项目信息 */
              await this.getContractList(currentFormData.pinzhengType);
              await this.selectContract(currentFormData.hetongId);
              this.formData.relatedQuotation = selectQutation
              this.formData.fukuanId = fukuanId
            }
          });
      }
    },
    data() {
      return {
        isEditFile: false,
        toastMsg: '',
        contractList: [],
        quotationList: [],
        showRelatedContract: true,
        showToast: false,
        fukuanList: [],
        formData: {
          invoiceId: undefined,
          customerId: undefined,            // 品牌ID
          projectId: undefined,
          uploadImgUrl: '',
          certificateType: 1,
          certificateName: '',
          relatedContract: undefined,       // 关联合同ID
          fukuanId: [],
          relatedQuotation: [],             // 关联项目结算单
          brandInfo: undefined,
          projectInfo: '',
          invoiceNo: '',
          money: '',
          createDate: '',
          endDate: '',
          filename: '',
          fileDiskAddress: ''
        },
      };
    },
    methods: {
      formatMoney(v) {
        let m = parseFloat(v)
        return isNaN(m) ? '' : thousandSplit(Math.round(m * 100) / 100 + '');
      },
      moneyChange(val) {
        const filterVal = val.replace(/[^\-?\d.]/g,'')     //只保留数字和.
        const twoDigitsVal = Math.round(filterVal * 100) / 100     //保留两位小数
        this.formData.money = twoDigitsVal
      },
      getQuotationList(id) {
        const formData = { hetongId: id };
        this.$http
          .post(Task.contactbaojiadanlist, this.qs.stringify(formData), {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          })
          .then(res => {
            this.quotationList = res.data.retData.data;
          });
      },
      getFukuanList(id) {
        const formData = { hetongId: id, flowState: 0 };
        this.$http
          .post(Task.getContactPayFile, this.qs.stringify(formData), {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          })
          .then(res => {
            this.fukuanList = res.data.retData.data;
          });
      },
      addFinanceCertificate() {
        const regexFormData = [
          {
            name: 'uploadImgUrl',
            errorMsg: '请上传财务凭证'
          },
          {
            name: 'certificateType',
            errorMsg: '请选择凭证类型'
          },
          {
            name: 'certificateName',
            errorMsg: '请输入凭证名称'
          },
          {
            name: 'relatedContract',
            errorMsg: '请选择关联合同'
          },
          {
            name: 'relatedQuotation',
            errorMsg: '请选择关联项目结算单'
          },
          {
            name: 'invoiceNo',
            errorMsg: '请输入发票号'
          },
          {
            name: 'money',
            errorMsg: '请输入金额'
          },
          {
            name: 'createDate',
            errorMsg: '请选择开票日期'
          },
          {
            name: 'endDate',
            errorMsg: '请输入帐期'
          },
          {
            name: 'filename',
            errorMsg: '请输入文件名'
          },
          {
            name: 'fileDiskAddress',
            errorMsg: '请输入公盘地址'
          }
        ];

        let checked = regexFormData.find(item => {
          if (Array.isArray(this.formData[item.name])) {
            if (!this.formData[item.name].length) {
              this.showToast = true;
              this.toastMsg = item.errorMsg;
              return true;
            }

          } else {
              if (!this.formData[item.name]) {
                this.showToast = true;
                this.toastMsg = item.errorMsg;
                return true;
              }
          }
        });
        if (checked) {
          setTimeout(() => {
            this.showToast = false;
          }, 1500);
        }else {
          let postData = {
            invoiceId: this.formData.invoiceId,
            customerId: this.formData.customerId,
            projectId: this.formData.projectId,
            hetongId: this.formData.relatedContract,
            fukuanId: this.formData.fukuanId,
            baojiadanId: this.formData.relatedQuotation,
            invoiceTitle: this.formData.certificateName,
            invoiceNo: this.formData.invoiceNo,
            price: this.formData.money,
            kaipiaoDate: dateToYMD(this.formData.createDate),
            zhangqi: this.formData.endDate,
            fileName: this.formData.filename,
            fileAddress: this.formData.fileDiskAddress,
            filePath: this.formData.uploadImgUrl,
            pinzhengType: this.formData.certificateType
          };

          this.$http.post(this.isEditFile ? Task.editinvoice : Task.addInvoice, this.qs.stringify(postData), {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          })
            .then(res => {
              let _data = res.data;

              if (_data.retCode !== 0) {
                this.showToast = true;
                this.toastMsg = _data.retMsg;
              } else if (_data.retCode === 100014) {
                this.$cookie.delete("token");

                this.$router.push("/");
              } else {
                this.showToast = true;
                this.toastStatus = "success";
                this.toastMsg = "提交成功";
              }

              setTimeout(() => {
                this.showToast = false;
                if (_data.retCode === 0) {
                  this.$router.push({
                    name: 'certificate'
                  });
                }
              }, 1500);
            });
        }
      },
      handleSuccess(url) {
        this.formData.uploadImgUrl = url;
      },
      resetUploadImg() {
        this.formData.uploadImgUrl = '';
      },
      handleError() {
        this.$Modal.info({
          width: 540,
          okText: '知道了',
          render() {
            return (
              <div class="upload-error-wrapper">
                <span class="upload-fail-img"></span>
                <p class="error-msg">很抱歉，您上传财务凭证失败了</p>
                <p class="error-msg">财务凭证文件格式为jpg、jpeg、png或pdf</p>
                <p class="error-msg">您可以重新上传</p>
              </div>
            );
          }
        });
      },
      handleMaxSizeError() {
        this.$Modal.info({
          width: 540,
          okText: '知道了',
          render() {
            return (
              <div class="upload-error-wrapper">
                <span class="upload-fail-img"></span>
                <p class="error-msg">很抱歉，凭证大小超过10MB,上传失败</p>
                <p class="error-msg">请重新上传</p>
              </div>
            );
          }
        });
      },
      selectContract(id) {
        this.formData.relatedContract = id;

        let selecedContract = this.contractList.find(i => i.hetongId === id);
        this.formData.brandInfo = selecedContract.customerName;
        this.formData.projectInfo = selecedContract.projectName;
        this.formData.customerId = selecedContract.customerId;
        this.formData.projectId = selecedContract.projectId;

        this.formData.relatedQuotation = []
        this.formData.fukuanId = []

        this.getQuotationList(id);
        this.getFukuanList(id);
      },
      getContractList(certificateType) {
        /* 当手动选择凭证类型时切换财务列表数据并清空当前选项 */
        this.formData.relatedContract = this.formData.brandInfo = this.formData.projectInfo ='';
        this.formData.customerId = this.formData.projectId = undefined;
        this.formData.relatedQuotation = [];
        this.formData.fukuanId = [];
        this.quotationList = [];
        this.fukuanList = [];

        if (certificateType) {
          this.formData.certificateType = certificateType;
        }

        /* 选择凭证类型时拉取相应合同数据 */
        let toolkitId = 16;
        switch (certificateType) {
          case 1:
            toolkitId = 16;           // 客户合同
            break;
          case 2:
            toolkitId = 15;           // 供应商合同
            break;
        }

        /* 当选择报销时无需关联合同 */
        this.showRelatedContract = certificateType !== 17;

        const postData = {
          forUserId: 1,                //传1取当前用户参与的,默认不传或者传0取所有
          toolkitId              
        }

        return this.$http.post(Task.contactlistnew, this.qs.stringify(postData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
          .then(res => {
            let _data = res.data;

            if (_data.retCode === 0) {
              this.contractList = _data.retData.data;
            }
          });
      }
    },
    components: {
      Toast
    }
  };
</script>
