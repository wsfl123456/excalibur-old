<template>
    <div>
      <i-form label-position="left" :label-width="88" class="default-form">
        <div class="form-group"  >
          <template v-if="formValue.hasOwnProperty('frequency')">
            <div >
              <Row>
                <i-col span="24" class="default-form-member-col">
                  <FormItem label="任务频次" class="default-form-item " >
                    <CheckboxGroup  size="large" class="default-form-chkbox-group" v-model="formValue.frequency" >
                      <Checkbox :disabled="isDisplay" v-for="(chkboxItem, chkBoxIndex) in frequency" :key="chkBoxIndex" :label="chkboxItem.id" class="default-form-chkbox b-4n" style="width: 25%" >
                        {{chkboxItem.label}}
                      </Checkbox>
                    </CheckboxGroup>
                  </FormItem>
                </i-col>
              </Row>
            </div>
            <div v-if="formValue.frequency.indexOf('1') >= 0">
              <Row>
                <i-col span="24" class="default-form-member-col">
                  <FormItem label="日报" class="default-form-item " >
                    <DatePicker :readonly="isDisplay" transfer class="deadline" type="daterange"  placeholder="设置日报时间段" v-model="formValue.daily" :clearable="false"></DatePicker>
                  </FormItem>
                </i-col>
              </Row>
            </div>
            <div v-if="formValue.frequency.indexOf('2') >= 0">
              <Row>
                <i-col span="24" class="default-form-member-col">

                  <FormItem label="周报" class="default-form-item " >
                    <DatePicker :readonly="isDisplay" transfer class="deadline" type="daterange"  placeholder="设置周报时间段" v-model="formValue.weekly" :clearable="false"></DatePicker>
                  </FormItem>
                </i-col>
              </Row>
            </div>
            <div v-if="formValue.frequency.indexOf('4') >= 0">
              <Row>
                <i-col span="24" class="default-form-member-col">

                  <FormItem label="双周报" class="default-form-item " >
                    <DatePicker :readonly="isDisplay" transfer class="deadline" type="daterange"  placeholder="设置双周报时间段" v-model="formValue.weeklyD" :clearable="false"></DatePicker>
                  </FormItem>
                </i-col>
              </Row>
            </div>
            <div v-if="formValue.frequency.indexOf('3') >= 0">
              <Row>
                <i-col span="24" class="default-form-member-col">
                  <FormItem label="月报" class="default-form-item " >
                    <DatePicker :readonly="isDisplay" transfer class="deadline" type="daterange"  placeholder="设置月报时间段" v-model="formValue.monthly" :clearable="false"></DatePicker>
                  </FormItem>
                </i-col>
              </Row>
            </div>
          </template>

          <div>
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="数据监测" class="default-form-item " >
                  <CheckboxGroup  size="large" class="default-form-chkbox-group" v-model="formValue.medias" @on-change="changeType">
                    <Checkbox :disabled="isDisplay" v-for="(chkboxItem, chkBoxIndex) in media" :key="chkBoxIndex" :label="chkboxItem.id" class="default-form-chkbox b-2n" style="width: 50%;" >
                      {{chkboxItem.label}}
                    </Checkbox>
                  </CheckboxGroup>
                </FormItem>
              </i-col>
            </Row>
          </div>
        </div>
        <div class="form-group" v-if="formValue.medias.indexOf('1') >= 0">
          <div>
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="Social Media" class="default-form-item " >
                  <div class="default-form-member-selection">
                    <div >
                      <h5>自媒体-WEIBO</h5>
                      <CheckboxGroup  size="large" class="vertical-chk" v-model="formValue.weibo" >
                        <Checkbox :disabled="isDisplay" v-for="(chkboxItem, chkBoxIndex) in weibo" :key="chkBoxIndex" :label="chkboxItem.id" class="default-form-chkbox"  >
                          {{chkboxItem.label}}
                        </Checkbox>
                      </CheckboxGroup>
                      <h5>自媒体-WECHAT</h5>
                      <CheckboxGroup  size="large" class="vertical-chk" v-model="formValue.wechat" >
                        <Checkbox :disabled="isDisplay" v-for="(chkboxItem, chkBoxIndex) in wechat" :key="chkBoxIndex" :label="chkboxItem.id" class="default-form-chkbox"  >
                          {{chkboxItem.label}}
                        </Checkbox>
                      </CheckboxGroup>
                      <h5>购买媒体</h5>
                      <div>
                        <div class="platform">
                          <span>平台：</span>
                          <CheckboxGroup  size="large" class="" v-model="formValue.buyMedia" @on-change="changeBuyMedia" >
                            <Checkbox :disabled="isDisplay" v-for="(chkboxItem, chkBoxIndex) in buyMedia" :key="chkBoxIndex" :label="chkboxItem.id" class="default-form-chkbox" >
                              {{chkboxItem.label}}
                            </Checkbox>
                          </CheckboxGroup>
                        </div>
                        <div v-if="formValue.buyMedia.indexOf('1') >= 0 || formValue.buyMedia.indexOf('2') >= 0">
                          <CheckboxGroup v-model="buyMediaPost" size="large" class="" @on-change="toggleBuyMedia">
                            <Checkbox :disabled="isDisplay" label="1" class="default-form-chkbox" >
                              Post表现(阅读量/转评赞)
                            </Checkbox>
                          </CheckboxGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div v-if="formValue.buyMedia.indexOf('3') >= 0">
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="购买媒体" class="default-form-item " >
                  <i-input :readonly="isDisplay" v-model="formValue.otherIpt" placeholder="填写其他购买媒体"></i-input>

                </FormItem>
              </i-col>
            </Row>
          </div>
          <div >
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="数据时间段" class="default-form-item " >
                  <DatePicker :readonly="isDisplay" transfer class="deadline" type="daterange"  placeholder="设置日报时间段" v-model="formValue.dataTimerange" :clearable="false"></DatePicker>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div >
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="预算范围" class="default-form-item " >
                  <i-input :readonly="isDisplay" v-model="formValue.budget" placeholder="预算范围"></i-input>

                </FormItem>
              </i-col>
            </Row>
          </div>
        </div>
        <div class="form-group" v-if="formValue.medias.indexOf('2') >= 0">
          <div>
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="Video" class="default-form-item " >
                  <div class="default-form-member-selection">
                    <div >
                      <CheckboxGroup  size="large" class="vertical-chk" v-model="formValue.videoItem"  @on-change="changeVideo">
                        <Checkbox :disabled="isDisplay" v-for="(chkboxItem, chkBoxIndex) in video" :key="chkBoxIndex" :label="chkboxItem.id" class="default-form-chkbox"  >
                          {{chkboxItem.label}}
                        </Checkbox>
                      </CheckboxGroup>
                    </div>
                  </div>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div >
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="数据时间段" class="default-form-item " >
                  <DatePicker :readonly="isDisplay" transfer class="deadline" type="daterange"  placeholder="设置日报时间段" v-model="formValue.videoTimerange" :clearable="false"></DatePicker>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div >
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="预算范围" class="default-form-item " >
                  <i-input :readonly="isDisplay" v-model="formValue.videoBudget" placeholder="预算范围"></i-input>

                </FormItem>
              </i-col>
            </Row>
          </div>
        </div>
        <div class="form-group" v-if="formValue.medias.indexOf('3') >= 0">
          <div>
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="Programmatic Buying Media" class="default-form-item extra-label-form" >
                  <div slot="label" class="extra-label">
                    Programmatic Buying Media
                  </div>
                  <div class="default-form-member-selection">
                    <div >
                      <CheckboxGroup  size="large" class="vertical-chk" v-model="formValue.PBM"  @on-change="changeVideo">
                        <Checkbox :disabled="isDisplay" v-for="(chkboxItem, chkBoxIndex) in pbm" :key="chkBoxIndex" :label="chkboxItem.id" class="default-form-chkbox"  >
                          {{chkboxItem.label}}
                        </Checkbox>
                      </CheckboxGroup>
                    </div>
                  </div>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div >
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="数据时间段" class="default-form-item " >
                  <DatePicker :readonly="isDisplay" transfer class="deadline" type="daterange"  placeholder="设置日报时间段" v-model="formValue.PBMTimeRange" :clearable="false"></DatePicker>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div >
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="预算范围" class="default-form-item " >
                  <i-input :readonly="isDisplay" v-model="formValue.PBMBudget" placeholder="预算范围"></i-input>

                </FormItem>
              </i-col>
            </Row>
          </div>
        </div>
        <div class="form-group" v-if="formValue.medias.indexOf('4') >= 0">
          <div>
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="Site" class="default-form-item " >
                  <div class="default-form-member-selection">
                    <div >
                      <div>
                        <CheckboxGroup  size="large" class="vertical-chk" v-model="formValue.siteItem" >
                          <Checkbox :disabled="isDisplay" v-for="(chkboxItem, chkBoxIndex) in site" :key="chkBoxIndex" :label="chkboxItem.id" class="default-form-chkbox"  >
                            {{chkboxItem.label}}
                          </Checkbox>
                        </CheckboxGroup>
                      </div>
                      <div v-if="formValue.siteItem.indexOf('4') >= 0">
                        <p>用户参与表现</p>
                        <CheckboxGroup  size="large" class="vertical-chk" v-model="formValue.userPerformance" >
                          <Checkbox :disabled="isDisplay" v-for="(chkboxItem, chkBoxIndex) in performance" :key="chkBoxIndex" :label="chkboxItem.id" class="default-form-chkbox"  >
                            {{chkboxItem.label}}
                          </Checkbox>
                        </CheckboxGroup>
                      </div>
                    </div>
                  </div>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div v-if="formValue.userPerformance.indexOf('1') >= 0">
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="Button代码" class="default-form-item " >
                  <i-input :readonly="isDisplay" v-model="formValue.btnCode" placeholder="Button代码"></i-input>

                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="Tracking Map" class="default-form-item " >
                  <i-input :readonly="isDisplay" v-model="formValue.mapUrl" placeholder="填写项目Tracking Map公盘地址格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\"></i-input>

                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="检测工具" class="default-form-item " >
                  <CheckboxGroup  size="large" class="default-form-chkbox-group" v-model="formValue.tools">
                    <Checkbox :disabled="isDisplay" v-for="(chkboxItem, chkBoxIndex) in tools" :key="chkBoxIndex" :label="chkboxItem.id" class="default-form-chkbox b-4n" style="width: 25%;" >
                      {{chkboxItem.label}}
                    </Checkbox>
                  </CheckboxGroup>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div v-if="formValue.tools.indexOf('4') >= 0">
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="其他工具" class="default-form-item " >
                  <i-input :readonly="isDisplay" v-model="formValue.otherTool" placeholder="其他监测工具"></i-input>

                </FormItem>
              </i-col>
            </Row>
          </div>
          <div >
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="数据时间段" class="default-form-item " >
                  <DatePicker :readonly="isDisplay" transfer class="deadline" type="daterange"  placeholder="设置日报时间段" v-model="formValue.siteTimerange" :clearable="false"></DatePicker>
                </FormItem>
              </i-col>
            </Row>
          </div>
        </div>
      </i-form>
    </div>
</template>

<script>
    export default {
      name: 'taskDashboard',
      props: {
        isDisplay: {
          type: Boolean,
          default: false
        },
        formValue: {
          type: [Array, Object],
          default: function () {
            return {}
          }
        },
        formLabel: {
          type: [Array, Object],
          default: function () {
            return {}
          }
        }
      },
      data () {
        return {
          tools: [
            {id: '1', label: 'GA'},
            {id: '2', label: '秒针'},
            {id: '3', label: 'ADMASTER'},
            {id: '4', label: '其他'}
          ],
          media: [
            {id: '1', label: 'Social Media'},
            {id: '2', label: 'Video'},
            {id: '3', label: 'Programmatic Buying Media'},
            {id: '4', label: 'Site(H5/Application/Website/Mini Program)'}
          ],
          frequency: [
            {id: '1', label: '日报'},
            {id: '2', label: '周报'},
            {id: '4', label: '双周报'},
            {id: '3', label: '月报'}
          ],
          weibo: [
            {id: '1', label: '粉丝情况(增粉/取关/净增/粉丝总量/性别地域等属性)'},
            {id: '2', label: 'Post表现(阅读量/转评赞)'},
            {id: '3', label: '话题页(阅读量/讨论量)'}
          ],
          wechat: [
            {id: '1', label: '粉丝情况(增粉/取关/净增/粉丝总量/性别地域等属性)'},
            {id: '2', label: 'Post表现(阅读量/转评赞)'},
            {id: '3', label: '话题页(阅读量/讨论量)'}
          ],
          buyMedia: [
            {id: '1', label: 'WEIBO'},
            {id: '2', label: 'WEICHAT'},
            {id: '3', label: 'OTHERS'}
          ],
          buyMediaPost: ['1'],
          video: [
            {id: '1', label: '播放效果(Video View)'},
            {id: '2', label: '其他表现(转评赞)'}
          ],
          pbm: [
            {id: '1', label: '常规数据(Impression/Click/CTR)'},
            {id: '2', label: '独立表现(Unique Impression/Unique Clicker)'},
            {id: '3', label: '成本表现(CPM/CPC)'}
          ],
          site: [
            {id: '1', label: '总体流量表现（PV/Visits/UV/Bounce Rate/Time Spend）'},
            {id: '2', label: '页面表现（ PV/Visits/UV/Bounce Rate/Time Spend ）'},
            {id: '3', label: '用户点击行为（Button Click）'},
            {id: '4', label: '用户信息手机（PII/PN/Registration等）'}
          ],
          performance: [
            {id: '1', label: '以站点内button点击行为为准'},
            {id: '2', label: '后台数据库导出'}
          ]
        }
      },
      methods: {
        changeVideo (v) {

        },
        changeBuyMedia (v) {
          if (v.indexOf('2') >= 0 || v.indexOf('1') >= 0) {
            this.buyMediaPost = ['1']
          }
        },
        changeType (v) {
          this.$emit('on-select-type', v)
        },
        toggleBuyMedia (v) {
          if (v.length === 0) {
            let newbuy = []
            this.formValue.buyMedia.forEach(item => {
              if (+item !== 1 && +item !== 2) {
                newbuy.push(item)
              }
            })
            this.formValue.buyMedia = newbuy
          }
        }
      },
      created () {

      }
    }
</script>

<style scoped lang="less">
  .vertical-chk {
    label {
      display: block;
    }
  }
  .platform {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
</style>
