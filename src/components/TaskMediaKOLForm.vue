<template>
  <div class="g-mb-16">
    <!--<pre>{{formValue}}</pre>-->
    <Collapse :value="openedRoot">
      <template v-for="panelItem in formValue">
        <Panel :name="panelItem.name">
          {{panelItem.title}}
          <div slot="content">
            <Collapse :value="openedSub">
              <template v-for="subPanelItem in panelItem.sub">
                <Panel :name="subPanelItem.name">
                  {{subPanelItem.label}}
                  <div slot="content">
                    <i-form label-position="left" :label-width="88" class="default-form">
                      <div class="form-group" >
                        <div v-for="(item, idx) in optConf[subPanelItem.name]"  :key="idx">
                          <FormItem :label="item.label" class="default-form-item">
                            <template v-if="typeof subPanelItem.opts.items[item.key] === 'object'">
                              <!--{{subPanelItem.opts.items}}-->
                              <CheckboxGroup size="large" class="default-form-chkbox-group" v-model="subPanelItem.opts.items[item.key]" >
                                <Checkbox :disabled="isDisplay" v-for="(chkboxItem, chkBoxIndex) in item.itemsConf" :key="chkBoxIndex" :label="chkboxItem.id" class="default-form-chkbox" style="width: 33.333%" >
                                  {{chkboxItem.label}}
                                </Checkbox>
                              </CheckboxGroup>
                            </template>
                            <template v-else>
                              <RadioGroup size="large" class="default-form-radio-group" v-model="subPanelItem.opts.items[item.key]">
                                <Radio :disabled="isDisplay" v-for="(radioItem, radioIndex) in item.itemsConf" :key="radioIndex" :label="radioItem.id" class="default-form-radio" style="width: 33.333%">
                                  {{radioItem.label}}
                                </Radio>
                              </RadioGroup>
                            </template>
                          </FormItem>
                        </div>
                      </div>
                    </i-form>
                  </div>
                </Panel>
              </template>

            </Collapse>
          </div>
        </Panel>
      </template>
    </Collapse>
  </div>
</template>

<script>
  export default {
    name: 'task-media-kol-form',
    props: {
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
      },
      isDisplay: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        openedRoot: [],
        openedSub: [],
        optConf: {
          image_noMan: [
            {
              label: '品牌露出',
              key: 'brandShow',
              itemsConf: [
                {
                  id: '1',
                  label: '门店全景'
                },
                {id: '2', label: '产品外包装'},
                {id: '3', label: '品牌Logo'},
                {id: '4', label: '产品全称'},
                {id: '5', label: '价格信息'},
                {id: '6', label: '其他'}
              ]
            },
            {
              label: '图片数量',
              key: 'imgCount',
              itemsConf: [
                {id: '1', label: '1-3'},
                {id: '2', label: '3-6'},
                {id: '3', label: '6-9'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '植入方式',
              key: 'implant',
              itemsConf: [
                {id: '1', label: '榜单植入'},
                {id: '2', label: '创意推荐'},
                {id: '3', label: '探店'}
              ]
            },
            {
              label: '外部链接',
              key: 'outerLink',
              itemsConf: [
                {id: '1', label: '阅读原文H5'},
                {id: '2', label: '微博网页链接'},
                {id: '3', label: '微博话题'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '图文导向',
              key: 'imgGuide',
              itemsConf: [
                {id: '1', label: '提升品牌好感'},
                {id: '2', label: '提高活动参与'},
                {id: '3', label: '提升销售'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '粉丝互动',
              key: 'fans',
              itemsConf: [
                {id: '1', label: '粉丝幸运抽奖'},
                {id: '2', label: '优惠券发放'},
                {id: '3', label: '其他'}
              ]
            }
          ],
          image_illustration: [
            {
              label: '品牌露出',
              key: 'brandShow',
              itemsConf: [
                {id: '1', label: '门店全景'},
                {id: '2', label: '产品外包装'},
                {id: '3', label: '品牌Logo'},
                {id: '4', label: '产品全称'},
                {id: '5', label: '价格信息'},
                {id: '6', label: '其他'}
              ]
            },
            {
              label: '外部链接',
              key: 'outerLink',
              itemsConf: [
                {id: '1', label: '阅读原文H5'},
                {id: '2', label: '微博网页链接'},
                {id: '3', label: '微博话题'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '创意方向',
              key: 'creative',
              itemsConf: [
                {id: '1', label: '热点事件'},
                {id: '2', label: '品牌事件'},
                {id: '3', label: '原创特色'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '粉丝互动',
              key: 'fans',
              itemsConf: [
                {id: '1', label: '粉丝幸运抽奖'},
                {id: '2', label: '优惠券发放'},
                {id: '3', label: '其他'}
              ]
            },
            {
              label: '插画导向',
              key: 'illustration',
              itemsConf: [
                {id: '1', label: '提升品牌好感'},
                {id: '2', label: '提高活动参与'},
                {id: '3', label: '提升销售'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '图片数量',
              key: 'imgCount',
              itemsConf: [
                {id: '1', label: '1-5'},
                {id: '2', label: '5-10'},
                {id: '3', label: '10-15'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '图片用途',
              key: 'imgUsage',
              itemsConf: [
                {id: '1', label: '品牌自媒体'},
                {id: '2', label: '电商运营'},
                {id: '3', label: '其他自媒体'}
              ]
            }
          ],
          image_man: [
            {
              label: '品牌露出',
              key: 'brandShow',
              itemsConf: [
                {id: '1', label: '门店全景'},
                {id: '2', label: '产品外包装'},
                {id: '3', label: '品牌Logo'},
                {id: '4', label: '产品全称'},
                {id: '5', label: '价格信息'},
                {id: '6', label: '其他'}
              ]
            },
            {
              label: 'KOL 出镜',
              key: 'KOL',
              itemsConf: [
                {id: '1', label: '是'},
                {id: '2', label: '否'}
              ]
            },
            {
              label: '结合方式',
              key: 'combine',
              itemsConf: [
                {id: '1', label: 'KOL手持产品同框'},
                {id: '2', label: 'KOL试(食)用产品'}
              ]
            },
            {
              label: '出镜要求',
              key: 'camera',
              itemsConf: [
                {id: '1', label: '局部特写'},
                {id: '2', label: '全身照'},
                {id: '3', label: '半身照'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '外部链接',
              key: 'outerLink',
              itemsConf: [
                {id: '1', label: '阅读原文H5'},
                {id: '2', label: '微博网页链接'},
                {id: '3', label: '微博话题'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '创意方向',
              key: 'creative',
              itemsConf: [
                {id: '1', label: '热点事件'},
                {id: '2', label: '品牌事件'},
                {id: '3', label: '原创特色'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '粉丝互动',
              key: 'fans',
              itemsConf: [
                {id: '1', label: '粉丝幸运抽奖'},
                {id: '2', label: '优惠券发放'},
                {id: '3', label: '其他'}
              ]
            },
            {
              label: '图文导向',
              key: 'imgGuide',
              itemsConf: [
                {id: '1', label: '提升品牌好感'},
                {id: '2', label: '提高活动参与'},
                {id: '3', label: '提升销售'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '图片数量',
              key: 'imgCount',
              itemsConf: [
                {id: '1', label: '1-3'},
                {id: '2', label: '3-6'},
                {id: '3', label: '6-9'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '图片用途',
              key: 'imgUsage',
              itemsConf: [
                {id: '1', label: '品牌自媒体'},
                {id: '2', label: '电商运营'},
                {id: '3', label: '其他自媒体'}
              ]
            }
          ],
          live_man: [
            {
              label: '品牌露出',
              key: 'brandShow',
              itemsConf: [
                {id: '1', label: '门店全景'},
                {id: '2', label: '产品外包装'},
                {id: '3', label: '品牌Logo'},
                {id: '4', label: '产品全称'},
                {id: '5', label: '价格信息'},
                {id: '6', label: '其他'}
              ]
            },
            {
              label: '创意方向',
              key: 'creative',
              itemsConf: [
                {id: '1', label: '热点事件'},
                {id: '2', label: '品牌事件'},
                {id: '3', label: 'KOL特色'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '植入方式',
              key: 'implant',
              itemsConf: [
                {id: '1', label: 'KOL口播'},
                {id: '2', label: '品牌定制物料'},
                {id: '3', label: 'KOL试(食)用产品'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '地点选择',
              key: 'place',
              itemsConf: [
                {id: '1', label: '指定地点'},
                {id: '2', label: '不指定'}
              ]
            },
            {
              label: '直播时长',
              key: 'duration',
              itemsConf: [
                {id: '1', label: '1-30'},
                {id: '2', label: '30-60'},
                {id: '3', label: '60-90'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '直播导向',
              key: 'liveGuide',
              itemsConf: [
                {id: '1', label: '提升品牌好感'},
                {id: '2', label: '提高活动参与'},
                {id: '3', label: '提升销售'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '直播角度',
              key: 'livePos',
              itemsConf: [
                {id: '1', label: '品牌方邀请'},
                {id: '2', label: 'KOL自发行为'}
              ]
            },
            {
              label: '素材用途',
              key: 'material',
              itemsConf: [
                {id: '1', label: '品牌自媒体'},
                {id: '2', label: '电商运营'},
                {id: '3', label: '其他自媒体'}
              ]
            }
          ],
          video_noMan: [
            {
              label: '品牌露出',
              key: 'brandShow',
              itemsConf: [
                {id: '1', label: '门店全景'},
                {id: '2', label: '产品外包装'},
                {id: '3', label: '品牌Logo'},
                {id: '4', label: '产品全称'},
                {id: '5', label: '价格信息'},
                {id: '6', label: '其他'}
              ]
            },
            {
              label: '创意方向',
              key: 'creative',
              itemsConf: [
                {id: '1', label: '既有栏目植入'},
                {id: '2', label: '独家定制主题视频'}
              ]
            },
            {
              label: '植入方式',
              key: 'implant',
              itemsConf: [
                {id: '1', label: '视频首尾冠名'},
                {id: '2', label: '全程Logo'},
                {id: '3', label: '内容植入'},
                {id: '4', label: '口播植入'},
                {id: '5', label: '品牌定制物料'}
              ]
            },
            {
              label: '地点选择',
              key: 'place',
              itemsConf: [
                {id: '1', label: '指定地点'},
                {id: '2', label: '不指定'}
              ]
            },
            {
              label: '视频时长',
              key: 'duration',
              itemsConf: [
                {id: '1', label: '1-5'},
                {id: '2', label: '5-10'},
                {id: '3', label: '10-15'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '视频导向',
              key: 'videoGuide',
              itemsConf: [
                {id: '1', label: '提升品牌好感'},
                {id: '2', label: '提高活动参与'},
                {id: '3', label: '提升销售'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '粉丝互动',
              key: 'fans',
              itemsConf: [
                {id: '1', label: '粉丝幸运抽奖'},
                {id: '2', label: '优惠券发放'},
                {id: '3', label: '其他'}
              ]
            },
            {
              label: '素材用途',
              key: 'material',
              itemsConf: [
                {id: '1', label: '品牌自媒体'},
                {id: '2', label: '电商运营'},
                {id: '3', label: '其他自媒体'}
              ]
            }
          ],
          video_man: [
            {
              label: '品牌露出',
              key: 'brandShow',
              itemsConf: [
                {id: '1', label: '门店全景'},
                {id: '2', label: '产品外包装'},
                {id: '3', label: '品牌Logo'},
                {id: '4', label: '产品全称'},
                {id: '5', label: '价格信息'},
                {id: '6', label: '其他'}
              ]
            },
            {
              label: '创意方向',
              key: 'creative',
              itemsConf: [
                {id: '1', label: '情景喜剧'},
                {id: '2', label: '原创特色'},
                {id: '3', label: '集合盘点'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '植入方式',
              key: 'implant',
              itemsConf: [
                {id: '1', label: '视频首尾冠名'},
                {id: '2', label: '全程Logo'},
                {id: '3', label: '内容植入'},
                {id: '4', label: '口播植入'},
                {id: '5', label: '品牌定制物料'}
              ]
            },
            {
              label: '视频时长',
              key: 'duration',
              itemsConf: [
                {id: '1', label: '1-5'},
                {id: '2', label: '5-10'},
                {id: '3', label: '10-15'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '视频导向',
              key: 'videoGuide',
              itemsConf: [
                {id: '1', label: '提升品牌好感'},
                {id: '2', label: '提高活动参与'},
                {id: '3', label: '提升销售'},
                {id: '4', label: '其他'}
              ]
            },
            {
              label: '粉丝互动',
              key: 'fans',
              itemsConf: [
                {id: '1', label: '粉丝幸运抽奖'},
                {id: '2', label: '优惠券发放'},
                {id: '3', label: '其他'}
              ]
            },
            {
              label: '素材用途',
              key: 'material',
              itemsConf: [
                {id: '1', label: '品牌自媒体'},
                {id: '2', label: '电商运营'},
                {id: '3', label: '其他自媒体'}
              ]
            }
          ]
        }
      }
    },
    created () {
      this.getOpenedPanel()
    },
    methods: {
      getOpenedPanel () {
        this.formValue.forEach((item) => {
          if (item.isChecked && item.isChecked === 'true') {
            this.openedRoot.push(item.name)
          }
          item.sub.forEach((subItem) => {
            if (subItem.opts.isChecked && subItem.opts.isChecked === 'true') {
              this.openedSub.push(subItem.name)
            }
          })
        })
      }
    }
  }
</script>

<style scoped lang="less">
</style>
