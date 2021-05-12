<template>
  <div v-if="type === 'pib'" class="edit-form preview preview-project pib-preview" :class="{show: isShow}">
    <div class="pib-edit">
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
      <!--<pre>-->
        <!--{{parConf[3]}}-->
      <!--</pre>-->
      <div class="submit-btns g-ta-r">
        <Button type="primary" class="submit-btn form-default-btn hollow-default" size="large" @click.native="backEdit">返回编辑</Button>
        <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="submit">确认提交</Button>
      </div>
    </div>
  </div>
    <div class="edit-form preview preview-project" :class="{show: isShow}" v-else>
    <div>
      <i-form label-position="left" :label-width="88" class="default-form">
        <div class="form-group">
          <div >
            <FormItem  label="项目名称"  class="default-form-item">
              <i-input readonly v-model="preview.name" placeholder="填写项目名称（必填）"></i-input>
            </FormItem>
          </div>
          <div>
            <Row class="member-row">
              <i-col span="12" class="default-form-member-col">
                <FormItem label="项目分级" class="default-form-item default-member-form">
                  <i-input readonly :value="preview.selectedLevel.label + '级'"></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="所属品牌" class="default-form-item default-member-form">
                  <i-input readonly :value="preview.selectedBrand.customerName"></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row class="member-row">
              <i-col span="12" class="default-form-member-col">
                <FormItem label="开始时间" class="default-form-item default-member-form">
                  <DatePicker transfer readonly class="deadline" type="date" placeholder="选择开始时间" :value="preview.startTime" :clearable="false" ></DatePicker>

                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="结束时间" class="default-form-item default-member-form">
                  <DatePicker transfer readonly class="deadline" type="date" placeholder="选择开始时间" :value="preview.endTime" :clearable="false" ></DatePicker>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div >
            <FormItem  label="项目类型"  class="default-form-item">
              <i-input readonly v-model="projectTypePreview[preview.periodType]"></i-input>
            </FormItem>
          </div>
        </div>
      </i-form>

      <h2>PROJECT ASSESSMENT REQUEST （PAR)</h2>

      <div v-for="(item, idx) in parConf" :key="idx">
        <div class="title">
          <h3>{{item.title_zh}}</h3>
          <h3 v-if="item.title_en">{{item.title_en}}</h3>
        </div>
        <!--<p class="title-note">{{item.subTit}}</p>-->

        <div v-if="item.displayType === 'table-noth'" class="table par-plate">
          <CheckboxGroup v-model="item.value">
            <Row>
              <i-col v-for="(radioItem, radioIdx) in item.td" :key="radioIdx" span="8">
                <Checkbox disabled :label="radioItem.id" :title="radioItem.label">
                  <span>{{radioItem.label}}</span>
                </Checkbox>
              </i-col>
            </Row>
          </CheckboxGroup>
          <div v-if="item && item.value && (item.value.indexOf('10') >= 0 || item.value.indexOf(10) >= 0)">
            <i-form label-position="left" :label-width="140" class="default-form">
              <div class="form-group">
                <div>
                  <FormItem class="default-form-item default-member-form" label="其他 Other">
                    <i-input readonly placeholder="请备注" v-model="item.otherIpt"></i-input>
                  </FormItem>
                </div>
              </div>
            </i-form>
          </div>
        </div>

        <Row v-if="item.displayType === 'table'" class="table par-plate">
          <i-col v-for="(_item, _idx) in item.th" :span="24/item.th.length" :key="'col-' + _idx">
            <h4>{{_item.tit}}</h4>
            <RadioGroup vertical v-model="_item.value" v-if="_item.type === 'radio'">
              <Radio disabled  v-for="(radioItem, radioIdx) in _item.items" :key="radioIdx" :label="radioItem.id">
                <span>{{radioItem.label}}</span>
              </Radio>
            </RadioGroup>

            <CheckboxGroup vertical v-model="_item.value" v-if="_item.type === 'checkbox'">
              <Checkbox disabled  v-for="(radioItem, radioIdx) in _item.items" :key="radioIdx" :label="radioItem.id">
                <span>{{radioItem.label}}</span>
              </Checkbox>
            </CheckboxGroup>
          </i-col>
        </Row>

        <div v-if="item.displayType === 'list'" class="list par-plate">
          <CheckboxGroup v-model="item.value">
            <Checkbox disabled v-for="(listItem, listIdx) in item.items" :key="'list-' + listIdx" :label="listItem.id">
              <span class="item-label">{{listItem.label}}</span>
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
                          <div>
                            {{_item.label_zh}}
                            <br>
                            {{_item.label_en}}
                          </div>
                        </div>
                        <div class="default-form-member-selection">
                          <project-member :is-edit="false" multi content="添加项目成员" :users="_item.value"></project-member>
                        </div>
                      </FormItem>
                    </i-col>
                  </template>
                </Row>
              </div>
            </div>
          </i-form>
        </div>

        <!--<div v-if="item.displayType === 'member'" class="members par-plate">-->
          <!--<i-form label-position="left" :label-width="140" class="default-form" >-->
            <!--<div class="form-group">-->
              <!--<div>-->
                <!--<Row class="member-row">-->
                  <!--<i-col span="12" class="default-form-member-col">-->
                    <!--<FormItem label="Project Lead" class="default-form-item default-member-form">-->
                      <!--<div class="default-form-member-selection">-->
                        <!--<project-member :is-edit="false" content="添加项目成员" :users="parConf[3].values.projectLead"></project-member>-->
                      <!--</div>-->
                    <!--</FormItem>-->
                  <!--</i-col>-->
                  <!--<i-col span="12" class="default-form-member-col">-->
                    <!--<FormItem label="Leading PM" class="default-form-item default-member-form">-->
                      <!--<div class="default-form-member-selection">-->
                        <!--<project-member :is-edit="false" content="添加项目成员"  :users="parConf[3].values.projectManager"></project-member>-->
                      <!--</div>-->
                    <!--</FormItem>-->
                  <!--</i-col>-->

                <!--</Row>-->
              <!--</div>-->
              <!--<div>-->
                <!--<Row class="member-row">-->
                  <!--<i-col span="12" class="default-form-member-col">-->
                    <!--<FormItem label="Creative PM" class="default-form-item default-member-form">-->
                      <!--<div class="default-form-member-selection">-->
                        <!--<project-member :is-edit="false" content="添加项目成员" :users="parConf[3].values.creativePM"></project-member>-->
                      <!--</div>-->
                    <!--</FormItem>-->
                  <!--</i-col>-->
                  <!--<i-col span="12" class="default-form-member-col">-->
                    <!--<FormItem label="Technical PM" class="default-form-item default-member-form">-->
                      <!--<div class="default-form-member-selection">-->
                        <!--<project-member :is-edit="false" content="添加项目成员" :users="parConf[3].values.technicalPM"></project-member>-->
                      <!--</div>-->
                    <!--</FormItem>-->
                  <!--</i-col>-->
                <!--</Row>-->
              <!--</div>-->
              <!--<div>-->
                <!--<Row class="member-row">-->
                  <!--<i-col span="12" class="default-form-member-col">-->
                    <!--<FormItem label="Media PM" class="default-form-item default-member-form">-->
                      <!--<div class="default-form-member-selection">-->
                        <!--<project-member :is-edit="false" content="添加项目成员" :users="parConf[3].values.mediaPM"></project-member>-->
                      <!--</div>-->
                    <!--</FormItem>-->
                  <!--</i-col>-->
                  <!--<i-col span="12" class="default-form-member-col">-->
                    <!--<FormItem label="IP PM" class="default-form-item default-member-form">-->
                      <!--<div class="default-form-member-selection">-->
                        <!--<project-member :is-edit="false" content="添加项目成员" :users="parConf[3].values.ipProductPM"></project-member>-->
                      <!--</div>-->
                    <!--</FormItem>-->
                  <!--</i-col>-->
                <!--</Row>-->
              <!--</div>-->

              <!--<div>-->
                <!--<Row class="member-row">-->
                  <!--<i-col span="12" class="default-form-member-col">-->
                    <!--<FormItem label="Data PM" class="default-form-item default-member-form">-->
                      <!--<div class="default-form-member-selection">-->
                        <!--<project-member :is-edit="false" content="添加项目成员" :users="parConf[3].values.dataPM"></project-member>-->
                      <!--</div>-->
                    <!--</FormItem>-->
                  <!--</i-col>-->
                  <!--<i-col span="12" class="default-form-member-col">-->
                    <!--<FormItem label="Photograph Producer" class="default-form-item default-member-form">-->
                      <!--<div class="default-form-member-selection">-->
                        <!--<project-member :is-edit="false" content="添加项目成员" :users="parConf[3].values.photographProducer"></project-member>-->
                      <!--</div>-->
                    <!--</FormItem>-->
                  <!--</i-col>-->
                <!--</Row>-->
              <!--</div>-->
              <!--<div>-->
                <!--<Row class="member-row">-->
                  <!--<i-col span="12" class="default-form-member-col">-->
                    <!--<FormItem label="Creative - Copy" class="default-form-item default-member-form">-->
                      <!--<div class="default-form-member-selection">-->
                        <!--<project-member :is-edit="false" content="添加项目成员"  :users="parConf[3].values.creativeCopy"></project-member>-->
                      <!--</div>-->
                    <!--</FormItem>-->
                  <!--</i-col>-->
                  <!--<i-col span="12" class="default-form-member-col">-->
                    <!--<FormItem label="Creative - Art" class="default-form-item default-member-form">-->
                      <!--<div class="default-form-member-selection">-->
                        <!--<project-member :is-edit="false" content="添加项目成员"  :users="parConf[3].values.creativeArt"></project-member>-->
                      <!--</div>-->
                    <!--</FormItem>-->
                  <!--</i-col>-->

                <!--</Row>-->
              <!--</div>-->


              <!--<div>-->
                <!--<Row class="member-row">-->
                  <!--<i-col span="12" class="default-form-member-col">-->
                    <!--<FormItem label="Media Planner" class="default-form-item default-member-form">-->
                      <!--<div class="default-form-member-selection">-->
                        <!--<project-member :is-edit="false" content="添加项目成员" :users="parConf[3].values.mediaPlanner"></project-member>-->
                      <!--</div>-->
                    <!--</FormItem>-->
                  <!--</i-col>-->
                  <!--<i-col span="12" class="default-form-member-col">-->
                    <!--<FormItem label="Shooting Producer" class="default-form-item default-member-form">-->
                      <!--<div class="default-form-member-selection">-->
                        <!--<project-member :is-edit="false" content="添加项目成员" :users="parConf[3].values.shootingProducer"></project-member>-->
                      <!--</div>-->
                    <!--</FormItem>-->
                  <!--</i-col>-->
                <!--</Row>-->
              <!--</div>-->
              <!--<div>-->
                <!--<Row class="member-row">-->
                  <!--<i-col span="12" class="default-form-member-col">-->
                    <!--<FormItem label="Media Buyer" class="default-form-item default-member-form">-->
                      <!--<div class="default-form-member-selection">-->
                        <!--<project-member :is-edit="false" content="添加项目成员" :users="parConf[3].values.mediaBuyer"></project-member>-->
                      <!--</div>-->
                    <!--</FormItem>-->
                  <!--</i-col>-->
                  <!--<i-col span="12" class="default-form-member-col">-->
                    <!--<FormItem label="Technical" class="default-form-item default-member-form">-->
                      <!--<div class="default-form-member-selection">-->
                        <!--<project-member :is-edit="false" content="添加项目成员" :users="parConf[3].values.technical"></project-member>-->
                      <!--</div>-->
                    <!--</FormItem>-->
                  <!--</i-col>-->
                <!--</Row>-->
              <!--</div>-->
              <!--<div>-->
                <!--<Row class="member-row">-->
                  <!--<i-col span="12" class="default-form-member-col">-->
                    <!--<FormItem label="Planner" class="default-form-item default-member-form">-->
                      <!--<div class="default-form-member-selection">-->
                        <!--<project-member :is-edit="false" content="添加项目成员"  :users="parConf[3].values.planner"></project-member>-->
                      <!--</div>-->
                    <!--</FormItem>-->
                  <!--</i-col>-->
                  <!--<i-col span="12" class="default-form-member-col">-->
                    <!--<FormItem label="" class="default-form-item default-member-form">-->
                      <!--<div class="default-form-member-selection">-->
                        <!--<i-input readonly></i-input>-->
                      <!--</div>-->
                    <!--</FormItem>-->
                  <!--</i-col>-->
                <!--</Row>-->
              <!--</div>-->
            <!--</div>-->
          <!--</i-form>-->
        <!--</div>-->
      </div>
      <!--<pre>-->
        <!--{{parConf[3]}}-->
      <!--</pre>-->
      <div class="submit-btns g-ta-r">
        <Button type="primary" class="submit-btn form-default-btn hollow-default" size="large" @click.native="backEdit">返回编辑</Button>
        <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="submit">确认提交</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import ProjectMember from '../ProjectMember'

  export default {
    name: 'project-preview',
    components: {
      ProjectMember
    },
    props: {
      pibValue: {
        type: Object,
        default: function () {
          return {}
        }
      },
      type: {
        type: String,
        default: 'par'
      },
      isShow: {
        type: Boolean,
        default: false
      },
      parConf: {
        type: Array,
        default: function () {
          return []
        }
      },
      preview: {
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
        }
      }
    },
    methods: {
      backEdit () {
        this.$emit('on-close')
      },
      submit () {
        this.$emit('on-submit')
      }
    }
  }
</script>

<style scoped lang="less">
  .preview {
    display: none;
    position: absolute;
    background-color: rgba(0, 0, 0, .7);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 40px 20px;
    justify-content: center;
    align-items: center;
    &.show {
      display: flex;
    }
    &.pib-preview {
      h2 {
        font-size: 14px;
        color: #343a40;
        margin-bottom: 30px;
        font-weight: normal;
      }
      .pib-edit {
        .submit-btns {
          text-align: right;
          margin-top: 16px;
          button {
            margin-left: 16px;
          }
        }
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
              .input {
                height: 48px;
              }

            }
          }
        }
      }
      .hollow-default {
        background-color: #fff;
        color: #2d8ef8;
      }
    }
    > div:not(.pass) {
      background-color: #fff;
      padding: 30px;
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
</style>
