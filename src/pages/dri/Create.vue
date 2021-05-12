y<template>
  <div class="dri-create">
    <div class="create-welcome">
      <img src="../../assets/images/dri/banner-new.jpg" alt="" />
      <div>
        <p>少年们，</p>
        <p>
          打造每一位少年的硬核是我们组织培养人才的使命，NHU+TGT+DRI是我们落地的方法。
        </p>
        <p>
          DRI-Direct Responsible
          Individual直接负责人制度，是帮助每一位少年寻找、发现、成长自己硬核的最直接工具，要准备练好自己的“几把刷子”，让自己更有能量、更上层楼！
        </p>
        <p>
          “天下大事必作于细，天下难事必作于易”理念再好，也需要方法落地；愿景再大，也需要从小做起。而这一份DRI的拆解工具就是帮助大家把事情做细落地的一个“拐棍”，是依据金字塔原理和OGSM工具制作的，希望能够作为一个有价值的工作帮助大家做好一年的计划，春华秋实，在辛丑牛年终获丰收！
        </p>
        <p>
          也相信，少年负壮气，奋烈自有时！<br />
          乐见各位怒马鲜衣美少年，终将一鸣惊人。
        </p>
      </div>
    </div>

    <div class="title">
      CREATE A NEW DRI
      <h2>创建DRI</h2>
    </div>

    <div class="create-container">
      <el-form ref="driForm" :model="formData" :rules="rules">
        <!-- 事业成长 -->
        <div class="create-career create-total-info">
          <div class="grow-title">
            <h3>事业成长</h3>
            <p>
              事业成长是指无论我们这个大组织还是小到一个专业小组、事业部等，我们共同要走到的方向、我们要一起努力的目的，是我们这群人的最大交集
            </p>
          </div>
          <el-form-item label="组织定位" prop="orgLoc">
            <el-input
              v-model="formData.orgLoc"
              type="textarea"
              :disabled="userInfo.id !== 1"
              :autosize="{ minRows: 2 }"
              maxlength="500"
              placeholder="请在此输入整个组织的战略定位，包含组织的愿景、使命，现阶段定位，未来定位，以及发展战略。 该部分由总经理负责填写。"
            ></el-input>
          </el-form-item>
          <el-form-item label="子公司定位" prop="sonCompanyLoc">
            <el-input
              v-model="formData.sonCompanyLoc"
              type="textarea"
              :disabled="userInfo.id !== 1"
              :autosize="{ minRows: 2 }"
              maxlength="500"
              placeholder="请在此输入组织的定位，包含组织的愿景、使命，现阶段定位，未来5年的定位，以及发展战略，包含核心竞争力打造，业务战略与组织战略，及数字化发展战略。 其中核心竞争力打造需要包括团队的核心见识、能力、方法等； 业务战略包括产品规划、客户规划、市场路径等； 组织战略包括组织发展、组织文化、组织制度等； 数字化发展战略包括数字化技能的掌握、凌波创识的推进等。 该部分由子公司总经理负责填写。"
            ></el-input>
          </el-form-item>
          <el-form-item label="事业群定位" prop="groupLoc">
            <el-input
              v-model="formData.groupLoc"
              type="textarea"
              :disabled="userInfo.id !== 1"
              :autosize="{ minRows: 2 }"
              maxlength="500"
              placeholder="请在此输入事业群的定位，包含事业群的愿景、使命，现阶段定位，未来3-5年的定位，以及发展战略，包含核心竞争力打造，业务战略与组织战略，及数字化发展战略。 其中核心竞争力打造需要包括团队的核心见识、能力、方法等； 业务战略包括产品规划、客户规划、市场路径等； 组织战略包括组织发展、组织文化、组织制度等； 数字化发展战略包括数字化技能的掌握、凌波创识的推进等。 该部分由事业群负责人负责填写（若无则与事业部保持一致信息）。"
            ></el-input>
          </el-form-item>
          <el-form-item label="事业部定位" prop="teamLoc">
            <el-input
              v-model="formData.teamLoc"
              type="textarea"
              :disabled="!userInfo.isCaptain"
              :autosize="{ minRows: 2 }"
              maxlength="500"
              placeholder="请在此输入事业部的定位，包含事业部的愿景、使命，现阶段定位，未来3-5年的定位，以及发展战略，包含核心竞争力打造，业务战略与组织战略，及数字化发展战略。 其中核心竞争力打造需要包括团队的核心见识、能力、方法等； 业务战略包括产品规划、客户规划、市场路径等； 组织战略包括组织发展、组织文化、组织制度等； 数字化发展战略包括数字化技能的掌握、凌波创识的推进等。 该部分由事业部负责人或指定负责人填写。"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="事业部未来三年发展目标"
            :required="userInfo.id === 1 || (userInfo.isCaptain && 'required')"
            class="flex-form-item"
          >
            <div class="item-flex form-item-textarea">
              <el-form-item prop="team3y1Obj">
                <el-input
                  type="textarea"
                  v-model="formData.team3y1Obj"
                  class="resizeNone"
                  :disabled="!userInfo.isCaptain"
                  :autosize="{ minRows: 3 }"
                  placeholder="第一年。请在此填写当年的发展目标，要符合SMART原则，需要包含上述定位在今年的落地计划，包括核心竞争力发展程度、业务与财务指标、组织成长目标、数字化落地指标等。该部分由事业部负责人或指定负责人填写。 备注：SMART原则，S-Specific，指目标要具体、特定，不能笼统；M-Measurable，指目标是数量化或者可衡量的，验证这些绩效指标的数据或者信息是可以获得的，而不是概念的或者想象的；A-Attainable，指目标在付出努力的情况下可以实现，避免设立过高或过低的目标；R-Relevant，指目标与核心目的是关联的，而不是与目的无关的；T-Timebound，指目标的完成要有具体的时间周期、时间表、截止日期。"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="team3y2Obj">
                <el-input
                  type="textarea"
                  v-model="formData.team3y2Obj"
                  class="resizeNone"
                  :disabled="!userInfo.isCaptain"
                  :autosize="{ minRows: 3 }"
                  placeholder="第二年。请在此填写当年的发展目标，要符合SMART原则，需要包含上述定位在今年的落地计划，包括核心竞争力发展程度、业务与财务指标、组织成长目标、数字化落地指标等。该部分由事业部负责人或指定负责人填写。 备注：SMART原则，S-Specific，指目标要具体、特定，不能笼统；M-Measurable，指目标是数量化或者可衡量的，验证这些绩效指标的数据或者信息是可以获得的，而不是概念的或者想象的；A-Attainable，指目标在付出努力的情况下可以实现，避免设立过高或过低的目标；R-Relevant，指目标与核心目的是关联的，而不是与目的无关的；T-Timebound，指目标的完成要有具体的时间周期、时间表、截止日期。"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="team3y3Obj">
                <el-input
                  type="textarea"
                  v-model="formData.team3y3Obj"
                  class="resizeNone"
                  :disabled="!userInfo.isCaptain"
                  :autosize="{ minRows: 3 }"
                  placeholder="第三年。请在此填写当年的发展目标，要符合SMART原则，需要包含上述定位在今年的落地计划，包括核心竞争力发展程度、业务与财务指标、组织成长目标、数字化落地指标等。该部分由事业部负责人或指定负责人填写。 备注：SMART原则，S-Specific，指目标要具体、特定，不能笼统；M-Measurable，指目标是数量化或者可衡量的，验证这些绩效指标的数据或者信息是可以获得的，而不是概念的或者想象的；A-Attainable，指目标在付出努力的情况下可以实现，避免设立过高或过低的目标；R-Relevant，指目标与核心目的是关联的，而不是与目的无关的；T-Timebound，指目标的完成要有具体的时间周期、时间表、截止日期。"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="产品规划" prop="productPlan">
            <el-input
              v-model="formData.productPlan"
              type="textarea"
              :disabled="!userInfo.isCaptain"
              :autosize="{ minRows: 2 }"
              placeholder="根据事业部定位，请列出事业部面向市场的产品、服务的名称，并简述该产品的内涵以及需要的核心技能、能力等。该部分由事业部负责人或指定负责人填写。"
            ></el-input>
          </el-form-item>
          <el-form-item label="客户规划" prop="customerPlan">
            <el-input
              v-model="formData.customerPlan"
              type="textarea"
              :disabled="!userInfo.isCaptain"
              :autosize="{ minRows: 2 }"
              placeholder="根据事业部定位和产品规划，请列出事业部面向市场的客户/用户，并描述用户的画像，列出具体的用户清单等。该部分由事业部负责人或指定负责人填写。"
            ></el-input>
          </el-form-item>
          <el-form-item label="个人定位" prop="personPlan">
              <el-input
                v-model="formData.personPlan"
                type="textarea"
                :autosize="{ minRows: 2 }"
                autosizevmaxlength="500"
              placeholder="根据公司、子公司、事业部群、事业部的发展目的、目标以及个人的长期愿景，设定自己的定位。尽可能简短的名词描述清楚并辅助部分文字说明。推荐使用“定位理论”进行设计。"
              ></el-input>
          </el-form-item>
          <el-form-item label="个人计划" prop="personLoc">
            <el-input
              v-model="formData.personLoc"
              type="textarea"
              :autosize="{ minRows: 2 }"
                placeholder="根据公司、子公司、事业部群、事业部的发展目的、目标，策划自己阶段性的发展目标，要符合OGSM和MECE的方法论，符合SMART原则，建议从真正打造自己硬核的“几把刷子”的角度进行计划。该部分由每个人在事业部负责人或指定负责人指导下填写。"

            ></el-input>
          </el-form-item>
          <el-form-item
            label="个人未来三年发展目标"
            required
            class="flex-form-item"
          >
            <div class="item-flex form-item-textarea">
              <el-form-item prop="person3y1Obj">
                <el-input
                  type="textarea"
                  v-model="formData.person3y1Obj"
                  class="resizeNone"
                  :autosize="{ minRows: 3 }"
                  placeholder="第一年。根据公司、子公司、事业部群、事业部的发展目的、目标，在此填写自己当年的发展目标，要符合SMART原则，需要包含上述定位在今年的落地计划。该部分由每个人在事业部负责人或指定负责人指导下填写。 备注：SMART原则，S-Specific，指目标要具体、特定，不能笼统；M-Measurable，指目标是数量化或者可衡量的，验证这些绩效指标的数据或者信息是可以获得的，而不是概念的或者想象的；A-Attainable，指目标在付出努力的情况下可以实现，避免设立过高或过低的目标；R-Relevant，指目标与核心目的是关联的，而不是与目的无关的；T-Timebound，指目标的完成要有具体的时间周期、时间表、截止日期。"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="person3y2Obj">
                <el-input
                  type="textarea"
                  v-model="formData.person3y2Obj"
                  class="resizeNone"
                  :autosize="{ minRows: 3 }"
                  placeholder="第二年。根据公司、子公司、事业部群、事业部的发展目的、目标，在此填写自己当年的发展目标，要符合SMART原则，需要包含上述定位在今年的落地计划。该部分由每个人在事业部负责人或指定负责人指导下填写。 备注：SMART原则，S-Specific，指目标要具体、特定，不能笼统；M-Measurable，指目标是数量化或者可衡量的，验证这些绩效指标的数据或者信息是可以获得的，而不是概念的或者想象的；A-Attainable，指目标在付出努力的情况下可以实现，避免设立过高或过低的目标；R-Relevant，指目标与核心目的是关联的，而不是与目的无关的；T-Timebound，指目标的完成要有具体的时间周期、时间表、截止日期。"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="person3y3Obj">
                <el-input
                  type="textarea"
                  v-model="formData.person3y3Obj"
                  class="resizeNone"
                  :autosize="{ minRows: 3 }"
                  placeholder="第三年。根据公司、子公司、事业部群、事业部的发展目的、目标，在此填写自己当年的发展目标，要符合SMART原则，需要包含上述定位在今年的落地计划。该部分由每个人在事业部负责人或指定负责人指导下填写。 备注：SMART原则，S-Specific，指目标要具体、特定，不能笼统；M-Measurable，指目标是数量化或者可衡量的，验证这些绩效指标的数据或者信息是可以获得的，而不是概念的或者想象的；A-Attainable，指目标在付出努力的情况下可以实现，避免设立过高或过低的目标；R-Relevant，指目标与核心目的是关联的，而不是与目的无关的；T-Timebound，指目标的完成要有具体的时间周期、时间表、截止日期。"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="其他">
            <el-input
              v-model="formData.personOther"
              type="textarea"
              :autosize="{ minRows: 2 }"
              placeholder="请填写其他未尽事宜"
            ></el-input>
          </el-form-item>
        </div>

        <!-- 业务成长 -->
        <div class="create-business create-total-info">
          <div class="grow-title">
            <h3>业务成长</h3>
            <p>
              业务成长是我们是否可以生存发展的红线，是事业成长的基础，也是事业成长最重要评估指标
            </p>
          </div>
          <!-- 业务增长 -->
          <div class="business-title">业务增长</div>
          <el-form-item label="营收目标" required class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="incomeQ1a">
                <el-input
                  v-model="formData.incomeQ1a"
                  step="10000"
                  type="number"
                  autosize
                  class="resizeNone"
                  placeholder="Q1营收目标"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="incomeQ2a">
                <el-input
                  v-model="formData.incomeQ2a"
                  step="10000"
                  type="number"
                  autosize
                  class="resizeNone"
                  placeholder="Q2营收目标"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="incomeQ3a">
                <el-input
                  v-model="formData.incomeQ3a"
                  step="10000"
                  type="number"
                  autosize
                  class="resizeNone"
                  placeholder="Q3营收目标"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="incomeQ4a">
                <el-input
                  v-model="formData.incomeQ4a"
                  step="10000"
                  type="number"
                  autosize
                  class="resizeNone"
                  placeholder="Q4营收目标"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="净利润目标" required class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="profitQ1a">
                <el-input
                  v-model="formData.profitQ1a"
                  class="resizeNone"
                  step="10000"
                  type="number"
                  autosize
                  placeholder="Q1净利润目标"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="profitQ2a">
                <el-input
                  v-model="formData.profitQ2a"
                  class="resizeNone"
                  step="10000"
                  type="number"
                  autosize
                  placeholder="Q2净利润目标"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="profitQ3a">
                <el-input
                  v-model="formData.profitQ3a"
                  class="resizeNone"
                  step="10000"
                  type="number"
                  autosize
                  placeholder="Q3净利润目标"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="profitQ4a">
                <el-input
                  v-model="formData.profitQ4a"
                  class="resizeNone"
                  step="10000"
                  type="number"
                  autosize
                  placeholder="Q4净利润目标"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <!-- 业务情况 -->
          <div class="business-title">业务情况</div>
          <!-- <el-form-item label="服务客户数目标" required class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="customerNumQ1a">
                <el-input
                  v-model="formData.customerNumQ1a"
                  class="resizeNone"
                  :disabled="!userInfo.isCaptain"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q1服务客户目标数"
                >
                  <template slot="append">个</template>
                </el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="customerNumQ2a">
                <el-input
                  v-model="formData.customerNumQ2a"
                  class="resizeNone"
                  :disabled="!userInfo.isCaptain"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q2服务客户目标数"
                >
                  <template slot="append">个</template>
                </el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="customerNumQ3a">
                <el-input
                  v-model="formData.customerNumQ3a"
                  class="resizeNone"
                  :disabled="!userInfo.isCaptain"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q3服务客户目标数"
                >
                  <template slot="append">个</template>
                </el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="customerNumQ4a">
                <el-input
                  v-model="formData.customerNumQ4a"
                  class="resizeNone"
                  :disabled="!userInfo.isCaptain"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q4服务客户目标数"
                >
                  <template slot="append">个</template>
                </el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="项目准时率目标" required class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="projectPunctualityQ1a">
                <el-input
                  v-model="formData.projectPunctualityQ1a"
                  class="resizeNone"
                  :disabled="!userInfo.isCaptain"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q1项目准时率目标"
                >
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="projectPunctualityQ2a">
                <el-input
                  v-model="formData.projectPunctualityQ2a"
                  class="resizeNone"
                  :disabled="!userInfo.isCaptain"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q2项目准时率目标"
                >
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="projectPunctualityQ3a">
                <el-input
                  v-model="formData.projectPunctualityQ3a"
                  class="resizeNone"
                  :disabled="!userInfo.isCaptain"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q3项目准时率目标"
                >
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="projectPunctualityQ4a">
                <el-input
                  v-model="formData.projectPunctualityQ4a"
                  class="resizeNone"
                  :disabled="!userInfo.isCaptain"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q4项目准时率目标"
                >
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
            </div>
          </el-form-item> -->
          <el-form-item label="任务数量目标" class="flex-form-item">
            <div class="item-flex">
              <el-input
                class="resizeNone"
                disabled
                autosize
                placeholder="Q1直接读取系统中提交的任务数量"
              ></el-input>
              <div class="line"></div>
              <el-input
                class="resizeNone"
                disabled
                autosize
                placeholder="Q2直接读取系统中提交的任务数量"
              ></el-input>
              <div class="line"></div>
              <el-input
                class="resizeNone"
                disabled
                autosize
                placeholder="Q3直接读取系统中提交的任务数量"
              ></el-input>
              <div class="line"></div>
              <el-input
                class="resizeNone"
                disabled
                autosize
                placeholder="Q4直接读取系统中提交的任务数量"
              ></el-input>
            </div>
          </el-form-item>
          <!-- 合规检查 -->
          <div class="business-title">合规检查</div>
          <div class="comments-gray">
            <span>
              <span v-if="userInfo.id === 1 || userInfo.isCaptain">*</span
              >凌波创识使用目标分
            </span>
            （注：指事业部内所有人员按公司要求使用凌波创识的情况：记录详实，内容清晰
            -
            100分；（PIB/PAR是否记录详实清晰，根据PIB的内容及PAR的职能检查是否有相关任务列表，关键流程/任务/文档记录均完整记录）;关键流程/任务完整，但文档记录缺漏-
            60分；关键流程/任务/文档记录均缺漏 -
            0分；关键任务/流程：PIB/PAR/合同/报价单
            （缺一即为0分）；文档记录：按照报价单交付物对应的物料final版本的公盘地址是否上传完毕
            ；取当季度内所有项目平均分）
          </div>
          <el-form-item required class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="holdSystemScoreQ1a">
                <el-input
                  v-model="formData.holdSystemScoreQ1a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q1凌波创识使用目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="holdSystemScoreQ2a">
                <el-input
                  v-model="formData.holdSystemScoreQ2a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q2凌波创识使用目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="holdSystemScoreQ3a">
                <el-input
                  v-model="formData.holdSystemScoreQ3a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q3凌波创识使用目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="holdSystemScoreQ4a">
                <el-input
                  v-model="formData.holdSystemScoreQ4a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q4凌波创识使用目标分"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <div class="comments-gray">
            <span>
              <span v-if="userInfo.id === 1 || userInfo.isCaptain">*</span
              >云舟使用目标分
            </span>
            （注：按PM book将所有内容存入云舟，项目结束后检查：完全符合要求 -
            100分；缺少项目物料文件 - 60分；缺少关键文件或完全没有完成 - 0分）
          </div>
          <el-form-item required class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="holdFlowScoreQ1a">
                <el-input
                  v-model="formData.holdFlowScoreQ1a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q1云舟使用目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="holdFlowScoreQ2a">
                <el-input
                  v-model="formData.holdFlowScoreQ2a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q2云舟使用目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="holdFlowScoreQ3a">
                <el-input
                  v-model="formData.holdFlowScoreQ3a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q3云舟使用目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="holdFlowScoreQ4a">
                <el-input
                  v-model="formData.holdFlowScoreQ4a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q4云舟使用目标分"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <!-- 财务考核 -->
          <div class="business-title">财务考核</div>
          <div class="comments-gray">
            <span>
              <span v-if="userInfo.id === 1 || userInfo.isCaptain">*</span
              >回款率目标分
            </span>
            (注：指客户按期回款金额占总回款金额的比例，按比例折算评分)
          </div>
          <el-form-item required class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="incomeRateQ1a">
                <el-input
                  v-model="formData.incomeRateQ1a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q1回款率目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="incomeRateQ2a">
                <el-input
                  v-model="formData.incomeRateQ2a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q2回款率目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="incomeRateQ3a">
                <el-input
                  v-model="formData.incomeRateQ3a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q3回款率目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="incomeRateQ4a">
                <el-input
                  v-model="formData.incomeRateQ4a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q4回款率目标分"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <div class="comments-gray">
            <span>
              <span v-if="userInfo.id === 1 || userInfo.isCaptain">*</span
              >AR金额差值目标分
            </span>
            （注：指填写的AR信息与实际信息金额差值（适用于PO高于100W的项目）大于50W-0分，
            小于50W大于10W-60分，低于10W-100分）
          </div>
          <el-form-item required class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="ArMoveQ1a">
                <el-input
                  v-model="formData.ArMoveQ1a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q1AR金额差值目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="ArMoveQ2a">
                <el-input
                  v-model="formData.ArMoveQ2a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q2AR金额差值目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="ArMoveQ3a">
                <el-input
                  v-model="formData.ArMoveQ3a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q3AR金额差值目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="ArMoveQ4a">
                <el-input
                  v-model="formData.ArMoveQ4a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q4AR金额差值目标分"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <div class="comments-gray">
            <span>
              <span v-if="userInfo.id === 1 || userInfo.isCaptain">*</span
              >AR金额比例目标分
            </span>
            （注：指填写的AR信息与实际信息金额比例（适用于PO低于100W的项目）大于20%-0分，介于10%-20%中间-60分，小于10%-100分）
          </div>
          <el-form-item required class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="ArPercentQ1a">
                <el-input
                  v-model="formData.ArPercentQ1a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q1AR金额比例目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="ArPercentQ2a">
                <el-input
                  v-model="formData.ArPercentQ2a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q2AR金额比例目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="ArPercentQ3a">
                <el-input
                  v-model="formData.ArPercentQ3a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q3AR金额比例目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="ArPercentQ4a">
                <el-input
                  v-model="formData.ArPercentQ4a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q4AR金额比例目标分"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <div class="comments-gray">
            <span>
              <span v-if="userInfo.id === 1 || userInfo.isCaptain">*</span
              >AP金额差值目标分
            </span>
            （注：指填写的AP信息与实际信息金额差值（适用于PO高于100W的项目）大于50W-0分，
            小于50W大于10W-60分，低于10W-100分）
          </div>
          <el-form-item required class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="ApMoveQ1a">
                <el-input
                  v-model="formData.ApMoveQ1a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q1AP金额差值目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="ApMoveQ2a">
                <el-input
                  v-model="formData.ApMoveQ2a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q2AP金额差值目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="ApMoveQ3a">
                <el-input
                  v-model="formData.ApMoveQ3a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q3AP金额差值目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="ApMoveQ4a">
                <el-input
                  v-model="formData.ApMoveQ4a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q4AP金额差值目标分"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <div class="comments-gray">
            <span>
              <span v-if="userInfo.id === 1 || userInfo.isCaptain">*</span
              >AP金额比例目标分
            </span>
            （注：指填写的AP信息与实际信息金额比例（适用于PO低于100W的项目）大于20%-0分，介于10%-20%中间-60分，小于10%-100分）
          </div>
          <el-form-item required class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="ApPercentQ1a">
                <el-input
                  v-model="formData.ApPercentQ1a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q1AP金额比例目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="ApPercentQ2a">
                <el-input
                  v-model="formData.ApPercentQ2a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q2AP金额比例目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="ApPercentQ3a">
                <el-input
                  v-model="formData.ApPercentQ3a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q3AP金额比例目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="ApPercentQ4a">
                <el-input
                  v-model="formData.ApPercentQ4a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q4AP金额比例目标分"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <!-- 与客户共赢 -->
          <div class="business-title">与客户共赢</div>
          <div class="comments-satisfied">
            <div>
              <div>
                <span
                  v-if="userInfo.id === 1 || userInfo.isCaptain"
                  class="comments-satisfied-required"
                  >*</span
                >客户满意度目标分<span
                  >（注：评分标准：5分-非常满意；4分-比较满意；3分-满意；2分-不满意；1分-非常不满意）</span
                >
              </div>
            </div>
            <div>
              <div><span>项目满意度包含：</span></div>
              <div>
                <p>
                  项目执行 ： 1、团队的服务态度和及时性； 2、团队沟通协调能力；
                  3、团队时间把控程度； 4、突发状况应变能力；
                </p>
                <p>
                  方案策划 ：1、策划能力（分析、逻辑性等）；
                  2、提案能力（表达流畅、条理等）； 3、方案可行性、落地性；
                </p>
                <p>
                  创意服务 ：1、核心创意的表现力； 2、美术的表现力；
                  3、文案的表现力； 4、动画制作的表现力； 5、拍摄效果的满意度；
                </p>
                <p>
                  技术开发服务 ：1、技术策划能力； 2、项目管理能力；
                  3、设计和视觉效果； 4、用户体验； 5、问题响应和处理；
                </p>
                <p>效果满意度 ：1、传播效果评价； 2、ROI评价；</p>
              </div>
            </div>
          </div>
          <el-form-item required class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="surveyScoreQ1a">
                <el-input
                  v-model="formData.surveyScoreQ1a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q1客户满意度目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="surveyScoreQ2a">
                <el-input
                  v-model="formData.surveyScoreQ2a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q2客户满意度目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="surveyScoreQ3a">
                <el-input
                  v-model="formData.surveyScoreQ3a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q3客户满意度目标分"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="surveyScoreQ4a">
                <el-input
                  v-model="formData.surveyScoreQ4a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  :disabled="!userInfo.isCaptain"
                  placeholder="Q4客户满意度目标分"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <div class="comments-gray">
            <span>
              <span v-if="userInfo.id === 1 || userInfo.isCaptain">*</span
              >报奖计划目标
            </span>
          </div>
          <el-form-item class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="gainPrizeQ1a">
                <el-input
                  v-model="formData.gainPrizeQ1a"
                  class="resizeNone"
                  :disabled="!userInfo.isCaptain"
                  autosize
                  placeholder="奖项1-数量|奖项2-数量"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="gainPrizeQ2a">
                <el-input
                  v-model="formData.gainPrizeQ2a"
                  class="resizeNone"
                  :disabled="!userInfo.isCaptain"
                  autosize
                  placeholder="奖项1-数量|奖项2-数量"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="gainPrizeQ3a">
                <el-input
                  v-model="formData.gainPrizeQ3a"
                  class="resizeNone"
                  :disabled="!userInfo.isCaptain"
                  autosize
                  placeholder="奖项1-数量|奖项2-数量"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="gainPrizeQ4a">
                <el-input
                  v-model="formData.gainPrizeQ4a"
                  class="resizeNone"
                  :disabled="!userInfo.isCaptain"
                  autosize
                  placeholder="奖项1-数量|奖项2-数量"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <div class="comments-gray">
            <span> <span>*</span>无重大事故</span>
            （重大事故主要指信息传递错误导致项目事故、客户投诉、知识产权侵权、财务虚报等直接或者间接导致团队利益受损的行为）
          </div>
          <el-form-item class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="BigBugScoreQ1a">
                <el-select
                  v-model="formData.BigBugScoreQ1a"
                  placeholder="请选择"
                  class="resizeNone"
                >
                  <el-option label="有重大事故" value="有"> </el-option>
                  <el-option label="无重大事故" value="无"> </el-option>
                </el-select>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="BigBugScoreQ2a">
                <el-select
                  v-model="formData.BigBugScoreQ2a"
                  placeholder="请选择"
                  class="resizeNone"
                >
                  <el-option label="有重大事故" value="有"> </el-option>
                  <el-option label="无重大事故" value="无"> </el-option>
                </el-select>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="BigBugScoreQ3a">
                <el-select
                  v-model="formData.BigBugScoreQ3a"
                  placeholder="请选择"
                  class="resizeNone"
                >
                  <el-option label="有重大事故" value="有"> </el-option>
                  <el-option label="无重大事故" value="无"> </el-option>
                </el-select>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="BigBugScoreQ4a">
                <el-select
                  v-model="formData.BigBugScoreQ4a"
                  placeholder="请选择"
                  class="resizeNone"
                >
                  <el-option label="有重大事故" value="有"> </el-option>
                  <el-option label="无重大事故" value="无"> </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form-item>
          <div class="business-title">其他</div>
          <div class="comments-gray">
            <span>其他 </span>
          </div>
          <el-form-item class="flex-form-item">
            <div class="item-flex">
              <el-form-item>
                <el-input
                  v-model="formData.workOtherQ1a"
                  class="resizeNone"
                  autosize
                  placeholder="Q1请填写其他事宜"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item>
                <el-input
                  v-model="formData.workOtherQ2a"
                  class="resizeNone"
                  autosize
                  placeholder="Q2请填写其他事宜"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item>
                <el-input
                  v-model="formData.workOtherQ3a"
                  class="resizeNone"
                  autosize
                  placeholder="Q3请填写其他事宜"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item>
                <el-input
                  v-model="formData.workOtherQ4a"
                  class="resizeNone"
                  autosize
                  placeholder="Q4请填写其他事宜"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
        </div>

        <!-- 个人成长 -->
        <div class="create-personal create-total-info">
          <div class="grow-title">
            <h3>个人成长</h3>
            <p>
              人才发展是我们组织的终极目的，因此个人成长是我们组织成长的最重要目标！
              <br />
              业务成长是事业成长的基础，而个人成长是业务成长的基础，因此每一个硬核少年的进步是组织对每一个少年负责的具体表现。
            </p>
          </div>
          <el-form-item label="TGT规划目标" required class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="tgtQ1a">
                <el-input
                  v-model="formData.tgtQ1a"
                  class="resizeNone"
                  autosize
                  :disabled="
                    formData.currentYearName == 2021 || currentYear == 2021
                  "
                  placeholder="Q1TGT是否参加？目标是？"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item>
                <el-input
                  disabled
                  v-model="formData.tgtQ2a"
                  class="resizeNone"
                  autosize
                  placeholder="Q2无TGT"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="tgtQ3a">
                <el-input
                  v-model="formData.tgtQ3a"
                  class="resizeNone"
                  autosize
                  placeholder="Q3TGT是否参加？目标是？"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item>
                <el-input
                  disabled
                  v-model="formData.tgtQ4a"
                  class="resizeNone"
                  autosize
                  placeholder="Q4无TGT"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <!-- <div class="comments-gray">
            <span> <span>*</span>收入提升目标 </span>
            （注：请在此列入您期望在TGT中通过理论学习和工作实践的努力进步后的经济效益期望）
          </div>
          <el-form-item required class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="salaryQ1a">
                <el-input
                  v-model="formData.salaryQ1a"
                  class="resizeNone"
                  step="1000"
                  type="number"
                  autosize
                  :disabled="
                    formData.currentYearName == 2021 || currentYear == 2021
                  "
                  placeholder="Q1增长目标：具体金额/人民币"
                >
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item>
                <el-input
                  v-model="formData.salaryQ2a"
                  disabled
                  class="resizeNone"
                  step="1000"
                  autosize
                  placeholder="Q2无TGT"
                >
                </el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="salaryQ3a">
                <el-input
                  v-model="formData.salaryQ3a"
                  class="resizeNone"
                  step="1000"
                  type="number"
                  autosize
                  placeholder="Q3增长目标：具体金额/人民币"
                >
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item>
                <el-input
                  v-model="formData.salaryQ4a"
                  disabled
                  class="resizeNone"
                  step="1000"
                  autosize
                  placeholder="Q4无TGT"
                >
                </el-input>
              </el-form-item>
            </div>
          </el-form-item> -->
          <div class="comments-gray have-add-button">
            <div>
              <span> <span>*</span>硬核技能提升-硬核技能目标 </span
              >（注：请在此列出您今年要达成的可以被评估的核心能力，该技能也将作为TGT的重要参考）
            </div>
            <div class="comments-gray-btn" @click="addItems('coreSkill')">
              <Icon type="plus-circled" size="16"></Icon>
              继续添加
            </div>
          </div>
          <el-form-item prop="coreSkills" class="flex-form-item">
            <div
              v-for="(item, index) in formData.coreSkills"
              :key="index"
              class="item-flex item-flex--add"
            >
              <el-input
                v-model="item.skillQ1a"
                class="resizeNone input-bottom"
                autosize
                placeholder="Q1硬核技能是？"
              ></el-input>
              <div class="line"></div>
              <el-input
                v-model="item.skillQ2a"
                class="resizeNone input-bottom"
                autosize
                placeholder="Q2硬核技能是？"
              ></el-input>
              <div class="line"></div>
              <el-input
                v-model="item.skillQ3a"
                class="resizeNone input-bottom"
                autosize
                placeholder="Q3硬核技能是？"
              ></el-input>
              <div class="line"></div>
              <el-input
                v-model="item.skillQ4a"
                class="resizeNone input-bottom"
                autosize
                placeholder="Q4硬核技能是？"
              ></el-input>
              <el-button
                v-if="
                  formData.coreSkills.length > 1 &&
                  formData.coreSkills.length === index + 1
                "
                type="text"
                class="have-add-button"
                @click="removeItems(index, 'coreSkill')"
              >
                <slot
                  ><img
                    class="add-img"
                    src="@/assets/images/dri/close_red@2x.png"
                /></slot>
              </el-button>
            </div>
          </el-form-item>
          <div class="comments-gray have-add-button">
            <div>
              <span> <span>*</span>经验提炼与总结-经验文档目标 </span>
              （注：经验文档是TGT的一个重要工具，借助工作中出现的问题进行总结提炼，提升自己，警示同事。请使用<span>经验文档模板</span>记录与提交）
            </div>
            <div class="comments-gray-btn">
              <Icon type="android-download" size="16"></Icon>
              <a href="/tpl/ExpTpl.docx" download>下载模版</a>
            </div>
          </div>
          <el-form-item required class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="expQ1a">
                <el-input
                  v-model="formData.expQ1a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q1撰写经验文档目标：数量/个"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="expQ2a">
                <el-input
                  v-model="formData.expQ2a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q2撰写经验文档目标：数量/个"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="expQ3a">
                <el-input
                  v-model="formData.expQ3a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q3撰写经验文档目标：数量/个"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="expQ4a">
                <el-input
                  v-model="formData.expQ4a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q4撰写经验文档目标：数量/个"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <div class="comments-gray">
            <span> <span>*</span>专业知识与方法论进阶-课程研发目标 </span>
            （注：通过总结经验梳理流程等，提出相关理论、模型、方法论，用于指导未来的工作，并贯彻落实）
          </div>
          <el-form-item required class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="courseQ1a">
                <el-input
                  v-model="formData.courseQ1a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q1课程研发目标：数量/个"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="courseQ2a">
                <el-input
                  v-model="formData.courseQ2a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q2课程研发目标：数量/个"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="courseQ3a">
                <el-input
                  v-model="formData.courseQ3a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q3课程研发目标：数量/个"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="courseQ4a">
                <el-input
                  v-model="formData.courseQ4a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q4课程研发目标：数量/个"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <div class="comments-gray have-add-button">
            <div>
              <span>专业技能证书获取-技能证书目标 </span
              >（注：获得与工作专业相关的相关国家、行业的认证的相关证书）
            </div>
            <div class="comments-gray-btn" @click="addItems('skillBooks')">
              <Icon type="plus-circled" size="16"></Icon>
              继续添加
            </div>
            <!-- <el-button type="text" @click="addItems('skillBooks')">
              <slot
                ><img class="add-img" src="@/assets/images/dri/add.png" /></slot
              >继续添加
            </el-button> -->
          </div>
          <!-- <el-form-item prop="skillBooks" class="flex-form-item"> -->
          <el-form-item class="flex-form-item">
            <div
              v-for="(item, index) in formData.skillBooks"
              :key="index"
              class="item-flex item-flex--add"
            >
              <el-input
                v-model="item.certQ1a"
                class="resizeNone input-bottom"
                autosize
                placeholder="Q1技能证书是？"
              ></el-input>
              <div class="line"></div>
              <el-input
                v-model="item.certQ2a"
                class="resizeNone input-bottom"
                autosize
                placeholder="Q2技能证书是？"
              ></el-input>
              <div class="line"></div>
              <el-input
                v-model="item.certQ3a"
                class="resizeNone input-bottom"
                autosize
                placeholder="Q3技能证书是？"
              ></el-input>
              <div class="line"></div>
              <el-input
                v-model="item.certQ4a"
                class="resizeNone input-bottom"
                autosize
                placeholder="Q4技能证书是？"
              ></el-input>
              <el-button
                v-if="
                  formData.skillBooks.length > 1 &&
                  formData.skillBooks.length === index + 1
                "
                type="text"
                class="have-add-button"
                @click="removeItems(index, 'skillBooks')"
              >
                <slot
                  ><img
                    class="add-img"
                    src="@/assets/images/dri/close_red@2x.png"
                /></slot>
              </el-button>
            </div>
          </el-form-item>
          <div class="comments-gray">
            <span>
              <span>*</span
              >做有数字化发展意识的人才-凌波创识（大宝剑）使用反馈建议
            </span>
            （注：即对凌波创识的使用提出宝贝的使用建议，反馈入口<a
              href="javascript:;"
              @click="showFeedBackModal = true"
              >请点击</a
            >）
          </div>
          <el-form-item required class="flex-form-item">
            <div class="item-flex">
              <el-form-item prop="sopQ1a">
                <el-input
                  v-model="formData.sopQ1a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q1计划建议数量：数量/个"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="sopQ2a">
                <el-input
                  v-model="formData.sopQ2a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q2计划建议数量：数量/个"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="sopQ3a">
                <el-input
                  v-model="formData.sopQ3a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q3计划建议数量：数量/个"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item prop="sopQ4a">
                <el-input
                  v-model="formData.sopQ4a"
                  class="resizeNone"
                  step="1"
                  type="number"
                  autosize
                  placeholder="Q4计划建议数量：数量/个"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <div class="comments-gray">
            <span>其他 </span>
          </div>
          <el-form-item class="flex-form-item">
            <div class="item-flex">
              <el-form-item>
                <el-input
                  v-model="formData.digitalQ1a"
                  class="resizeNone"
                  autosize
                  placeholder="Q1请填写其他事宜"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item>
                <el-input
                  v-model="formData.digitalQ2a"
                  class="resizeNone"
                  autosize
                  placeholder="Q2请填写其他事宜"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item>
                <el-input
                  v-model="formData.digitalQ3a"
                  class="resizeNone"
                  autosize
                  placeholder="Q3请填写其他事宜"
                ></el-input>
              </el-form-item>
              <div class="line"></div>
              <el-form-item>
                <el-input
                  v-model="formData.digitalQ4a"
                  class="resizeNone"
                  autosize
                  placeholder="Q4请填写其他事宜"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
        </div>

        <!-- <div class="agree-dri" v-if="role.btnApply_visible === 'show'"> -->
        <div class="agree-dri">
          <el-checkbox v-model="agreeDri">
            我已阅读并同意创建
            <a href="javascript:;" @click="showAgreeModal = true"
              >DRI相关事宜</a
            >
          </el-checkbox>
        </div>

        <!-- 操作按钮 -->
        <div class="operator-button">
          <el-button
            v-if="role.btnSave_visible === 'show'"
            @click="judgeForm(1)"
            >保存</el-button
          >
          <el-button
            v-if="role.btnApply_visible === 'show'"
            type="primary"
            @click="judgeForm(2)"
            >提交审核</el-button
          >
        </div>
      </el-form>
    </div>
    <el-dialog :visible.sync="showAgreeModal" width="700" center title="">
      <div class="dri-dialog-agree">
        <h2>
          <div>诺锞传媒事业部目标责任书</div>
          <div>Directly Responsible Individual of NORMCORE Hoshin Unit</div>
        </h2>

        <div
          class="dri-dialog-agree-item"
          v-for="(i1, k1) in responsibleList"
          :key="k1"
        >
          <h3>{{ k1 + 1 }}、{{ i1.title }}</h3>
          <div v-for="(i2, k2) in i1.children" :key="k2">
            {{ k1 + 1 }}.{{ k2 + 1 }}、{{ i2.label }}
            <div v-for="(i3, k3) in i2.children" :key="k3">
              {{ k1 + 1 }}.{{ k2 + 1 }}.{{ k3 + 1 }}、{{ i3.label }}
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="showFeedBackModal"
      width="700"
      center
      title="反馈意见"
    >
      <el-input
        type="textarea"
        :rows="6"
        placeholder="请输入反馈意见"
        v-model="feedBackVal"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearFeedBack">取 消</el-button>
        <el-button type="primary" @click="submitFeedBack">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/jsx">
import { CreateDri, Dri } from "@/API/api";
import "./Index.less";
import { Message } from "element-ui";

export default {
  name: "dri-create",
  data() {
    return {
      feedBackVal: "",
      showFeedBackModal: false,
      showAgreeModal: false,
      agreeDri: false,
      isCreate: true,
      isBoss: true,
      isCaptain: false,
      userInfo: {},
      driUserId: "",
      driObjectId: "",
      currentYear: new Date().getFullYear(),
      role: {
        btnSave_visible: "show",
        btnApply_visible: "show",
      },
      formData: {
        /* 事业成长 */
        orgLoc: "",
        sonCompanyLoc: "",
        groupLoc: "",
        teamLoc: "",
        team3y1Obj: "",
        team3y2Obj: "",
        team3y3Obj: "",
        productPlan: "",
        customerPlan: "",
        personLoc: "",
        personPlan: "",
        person3y1Obj: "",
        person3y2Obj: "",
        person3y3Obj: "",
        personOther: "",
        /* 业务成长 */
        // 业务增长 -> 营收目标
        incomeQ1a: "",
        incomeQ2a: "",
        incomeQ3a: "",
        incomeQ4a: "",
        // 业务增长 -> 净利润目标
        profitQ1a: "",
        profitQ2a: "",
        profitQ3a: "",
        profitQ4a: "",
        // 业务情况 -> 服务客户数目标
        // customerNumQ1a: "",
        // customerNumQ2a: "",
        // customerNumQ3a: "",
        // customerNumQ4a: "",
        // 业务情况 -> 项目准时率目标
        // projectPunctualityQ1a: "",
        // projectPunctualityQ2a: "",
        // projectPunctualityQ3a: "",
        // projectPunctualityQ4a: "",
        // 业务情况 -> 任务数量目标 - 暂无字段
        // 合规检查 -> 系统使用合规目标分
        holdSystemScoreQ1a: "",
        holdSystemScoreQ2a: "",
        holdSystemScoreQ3a: "",
        holdSystemScoreQ4a: "",
        // 合规检查 -> 流程制度使用合规目标分
        holdFlowScoreQ1a: "",
        holdFlowScoreQ2a: "",
        holdFlowScoreQ3a: "",
        holdFlowScoreQ4a: "",
        // 财务考核 -> 回款率目标分
        incomeRateQ1a: "",
        incomeRateQ2a: "",
        incomeRateQ3a: "",
        incomeRateQ4a: "",
        // 财务考核 -> AR金额差值目标分
        ArMoveQ1a: "",
        ArMoveQ2a: "",
        ArMoveQ3a: "",
        ArMoveQ4a: "",
        // 财务考核 -> AP金额差值目标分
        ApMoveQ1a: "",
        ApMoveQ2a: "",
        ApMoveQ3a: "",
        ApMoveQ4a: "",
        // 财务考核 -> AR金额比例目标分
        ArPercentQ1a: "",
        ArPercentQ2a: "",
        ArPercentQ3a: "",
        ArPercentQ4a: "",
        // 财务考核 -> AP金额比例目标分
        ApPercentQ1a: "",
        ApPercentQ2a: "",
        ApPercentQ3a: "",
        ApPercentQ4a: "",
        // 与客户共赢 -> 客户满意度目标分
        surveyScoreQ1a: "",
        surveyScoreQ2a: "",
        surveyScoreQ3a: "",
        surveyScoreQ4a: "",
        // 与客户共赢 -> 报奖目标分
        gainPrizeQ1a: "",
        gainPrizeQ2a: "",
        gainPrizeQ3a: "",
        gainPrizeQ4a: "",
        // 与客户共赢 -> 无重大事故目标分
        BigBugScoreQ1a: "无",
        BigBugScoreQ2a: "无",
        BigBugScoreQ3a: "无",
        BigBugScoreQ4a: "无",
        // 其他
        workOtherQ1a: "",
        workOtherQ2a: "",
        workOtherQ3a: "",
        workOtherQ4a: "",
        /* 个人成长 */
        // 硬核技能目标
        coreSkills: [
          { skillQ1a: "", skillQ2a: "", skillQ3a: "", skillQ4a: "" },
        ],
        skillQ1a: "",
        skillQ2a: "",
        skillQ3a: "",
        skillQ4a: "",
        // 诺锞经验文档目标
        expQ1a: "",
        expQ2a: "",
        expQ3a: "",
        expQ4a: "",
        // 凌波创识使用反馈意见
        sopQ1a: "",
        sopQ2a: "",
        sopQ3a: "",
        sopQ4a: "",
        // 课程输出量目标
        courseQ1a: "",
        courseQ2a: "",
        courseQ3a: "",
        courseQ4a: "",
        // 技能证书目标
        skillBooks: [{ certQ1a: "", certQ2a: "", certQ3a: "", certQ4a: "" }],
        certQ1a: "",
        certQ2a: "",
        certQ3a: "",
        certQ4a: "",
        // TGT规划目标
        tgtQ1a: "",
        tgtQ2a: "",
        tgtQ3a: "",
        tgtQ4a: "",
        // 收入提升目标
        salaryQ1a: "",
        salaryQ2a: "",
        salaryQ3a: "",
        salaryQ4a: "",
        // 个人成长其他
        digitalQ1a: "",
        digitalQ2a: "",
        digitalQ3a: "",
        digitalQ4a: "",
      },
      rules: {
        /* 事业成长 */
        orgLoc: [
          {
            required: true,
            message: "请输入组织定位（500字内）",
            trigger: "blur",
          },
        ],
        sonCompanyLoc: [
          {
            required: true,
            message: "请输入子公司定位（500字内）",
            trigger: "blur",
          },
        ],
        groupLoc: [
          {
            required: true,
            message: "请输入事业群定位（500字内）",
            trigger: "blur",
          },
        ],
        teamLoc: [
          {
            required: true,
            message: "请输入事业部定位（500字内）",
            trigger: "blur",
          },
        ],
        team3y1Obj: [
          {
            required: true,
            message: `请输入第一年（${new Date().getFullYear()}年）发展目标`,
            trigger: "blur",
          },
        ],
        team3y2Obj: [
          {
            required: true,
            message: `请输入第二年（${
              new Date().getFullYear() + 1
            }年）发展目标`,
            trigger: "blur",
          },
        ],
        team3y3Obj: [
          {
            required: true,
            message: `请输入第三年（${
              new Date().getFullYear() + 2
            }年）发展目标`,
            trigger: "blur",
          },
        ],
        productPlan: [
          { required: true, message: "请输入你的产品规划", trigger: "blur" },
        ],
        customerPlan: [
          { required: true, message: "请输入你的客户规划", trigger: "blur" },
        ],
        personLoc: [
          {
            required: true,
            message: "请输入你的个人年度工作计划",
            trigger: "blur",
          },
        ],
        personPlan: [
          {
            required: true,
            message: "请输入你的个人定位(500字内)",
            trigger: "blur",
          },
        ],
        person3y1Obj: [
          {
            required: true,
            message: `请输入第一年（${new Date().getFullYear()}年）发展目标`,
            trigger: "blur",
          },
        ],
        person3y2Obj: [
          {
            required: true,
            message: `请输入第二年（${
              new Date().getFullYear() + 1
            }年）发展目标`,
            trigger: "blur",
          },
        ],
        person3y3Obj: [
          {
            required: true,
            message: `请输入第三年（${
              new Date().getFullYear() + 2
            }年）发展目标`,
            trigger: "blur",
          },
        ],
        /* 业务成长 */
        // 业务增长 -> 营收目标
        incomeQ1a: [
          { required: true, message: "请输入Q1营收目标", trigger: "blur" },
        ],
        incomeQ2a: [
          { required: true, message: "请输入Q2营收目标", trigger: "blur" },
        ],
        incomeQ3a: [
          { required: true, message: "请输入Q3营收目标", trigger: "blur" },
        ],
        incomeQ4a: [
          { required: true, message: "请输入Q4营收目标", trigger: "blur" },
        ],
        // 业务增长 -> 净利润目标
        profitQ1a: [
          { required: true, message: "请输入Q1净利润目标", trigger: "blur" },
        ],
        profitQ2a: [
          { required: true, message: "请输入Q2净利润目标", trigger: "blur" },
        ],
        profitQ3a: [
          { required: true, message: "请输入Q3净利润目标", trigger: "blur" },
        ],
        profitQ4a: [
          { required: true, message: "请输入Q4净利润目标", trigger: "blur" },
        ],
        // 业务情况 -> 服务客户数目标
        // customerNumQ1a: [
        //   {
        //     required: true,
        //     message: "请输入Q1服务客户目标数",
        //     trigger: "blur",
        //   },
        //   {
        //     pattern: /^[0-9]*$/,
        //     message: "Q1服务客户目标数需为整数",
        //     trigger: "blur",
        //   },
        // ],
        // customerNumQ2a: [
        //   {
        //     required: true,
        //     message: "请输入Q2服务客户目标数",
        //     trigger: "blur",
        //   },
        //   {
        //     pattern: /^[0-9]*$/,
        //     message: "Q2服务客户目标数需为整数",
        //     trigger: "blur",
        //   },
        // ],
        // customerNumQ3a: [
        //   {
        //     required: true,
        //     message: "请输入Q3服务客户目标数",
        //     trigger: "blur",
        //   },
        //   {
        //     pattern: /^[0-9]*$/,
        //     message: "Q3服务客户目标数需为整数",
        //     trigger: "blur",
        //   },
        // ],
        // customerNumQ4a: [
        //   {
        //     required: true,
        //     message: "请输入Q4服务客户目标数",
        //     trigger: "blur",
        //   },
        //   {
        //     pattern: /^[0-9]*$/,
        //     message: "Q4l服务客户目标数需为整数",
        //     trigger: "blur",
        //   },
        // ],
        // 业务情况 -> 项目准时率目标
        // projectPunctualityQ1a: [
        //   {
        //     required: true,
        //     message: "请输入Q1项目准时率目标",
        //     trigger: "blur",
        //   },
        // ],
        // projectPunctualityQ2a: [
        //   {
        //     required: true,
        //     message: "请输入Q2项目准时率目标",
        //     trigger: "blur",
        //   },
        // ],
        // projectPunctualityQ3a: [
        //   {
        //     required: true,
        //     message: "请输入Q3项目准时率目标",
        //     trigger: "blur",
        //   },
        // ],
        // projectPunctualityQ4a: [
        //   {
        //     required: true,
        //     message: "请输入Q4项目准时率目标",
        //     trigger: "blur",
        //   },
        // ],
        // 业务情况 -> 任务数量目标 - 暂无字段
        // 合规检查 -> 系统使用合规目标分
        holdSystemScoreQ1a: [
          {
            required: true,
            message: "请输入Q1凌波创识使用目标分",
            trigger: "blur",
          },
        ],
        holdSystemScoreQ2a: [
          {
            required: true,
            message: "请输入Q2凌波创识使用目标分",
            trigger: "blur",
          },
        ],
        holdSystemScoreQ3a: [
          {
            required: true,
            message: "请输入Q3凌波创识使用目标分",
            trigger: "blur",
          },
        ],
        holdSystemScoreQ4a: [
          {
            required: true,
            message: "请输入Q4凌波创识使用目标分",
            trigger: "blur",
          },
        ],
        // 合规检查 -> 流程制度使用合规目标分
        holdFlowScoreQ1a: [
          {
            required: true,
            message: "请输入Q1云舟使用目标分",
            trigger: "blur",
          },
        ],
        holdFlowScoreQ2a: [
          {
            required: true,
            message: "请输入Q2云舟使用目标分",
            trigger: "blur",
          },
        ],
        holdFlowScoreQ3a: [
          {
            required: true,
            message: "请输入Q3云舟使用目标分",
            trigger: "blur",
          },
        ],
        holdFlowScoreQ4a: [
          {
            required: true,
            message: "请输入Q4云舟使用目标分",
            trigger: "blur",
          },
        ],
        // 财务考核 -> 回款率目标分
        incomeRateQ1a: [
          { required: true, message: "请输入Q1回款率目标分", trigger: "blur" },
        ],
        incomeRateQ2a: [
          { required: true, message: "请输入Q2回款率目标分", trigger: "blur" },
        ],
        incomeRateQ3a: [
          { required: true, message: "请输入Q3回款率目标分", trigger: "blur" },
        ],
        incomeRateQ4a: [
          { required: true, message: "请输入Q4回款率目标分", trigger: "blur" },
        ],
        // 财务考核 -> AR金额差值目标分
        ArMoveQ1a: [
          {
            required: true,
            message: "请输入Q1AR金额差值目标分",
            trigger: "blur",
          },
        ],
        ArMoveQ2a: [
          {
            required: true,
            message: "请输入Q2AR金额差值目标分",
            trigger: "blur",
          },
        ],
        ArMoveQ3a: [
          {
            required: true,
            message: "请输入Q3AR金额差值目标分",
            trigger: "blur",
          },
        ],
        ArMoveQ4a: [
          {
            required: true,
            message: "请输入Q4AR金额差值目标分",
            trigger: "blur",
          },
        ],
        // 财务考核 -> AR金额比例目标分
        ArPercentQ1a: [
          {
            required: true,
            message: "请输入Q1AR金额比例目标分",
            trigger: "blur",
          },
        ],
        ArPercentQ2a: [
          {
            required: true,
            message: "请输入Q1AR金额比例目标分",
            trigger: "blur",
          },
        ],
        ArPercentQ3a: [
          {
            required: true,
            message: "请输入Q1AR金额比例目标分",
            trigger: "blur",
          },
        ],
        ArPercentQ4a: [
          {
            required: true,
            message: "请输入Q1AR金额比例目标分",
            trigger: "blur",
          },
        ],
        // 财务考核 -> AP金额差值目标分
        ApMoveQ1a: [
          {
            required: true,
            message: "请输入Q1AP金额差值目标分",
            trigger: "blur",
          },
        ],
        ApMoveQ2a: [
          {
            required: true,
            message: "请输入Q2AP金额差值目标分",
            trigger: "blur",
          },
        ],
        ApMoveQ3a: [
          {
            required: true,
            message: "请输入Q3AP金额差值目标分",
            trigger: "blur",
          },
        ],
        ApMoveQ4a: [
          {
            required: true,
            message: "请输入Q4AP金额差值目标分",
            trigger: "blur",
          },
        ],
        // 财务考核 -> AP金额比例目标分
        ApPercentQ1a: [
          {
            required: true,
            message: "请输入Q1AP金额比例目标分",
            trigger: "blur",
          },
        ],
        ApPercentQ2a: [
          {
            required: true,
            message: "请输入Q2AP金额比例目标分",
            trigger: "blur",
          },
        ],
        ApPercentQ3a: [
          {
            required: true,
            message: "请输入Q4AP金额比例目标分",
            trigger: "blur",
          },
        ],
        ApPercentQ4a: [
          {
            required: true,
            message: "请输入Q5AP金额比例目标分",
            trigger: "blur",
          },
        ],
        // 与客户共赢 -> 客户满意度目标分
        surveyScoreQ1a: [
          {
            required: true,
            message: "请输入Q1客户满意度目标分",
            trigger: "blur",
          },
        ],
        surveyScoreQ2a: [
          {
            required: true,
            message: "请输入Q2客户满意度目标分",
            trigger: "blur",
          },
        ],
        surveyScoreQ3a: [
          {
            required: true,
            message: "请输入Q3客户满意度目标分",
            trigger: "blur",
          },
        ],
        surveyScoreQ4a: [
          {
            required: true,
            message: "请输入Q4客户满意度目标分",
            trigger: "blur",
          },
        ],
        // 与客户共赢 -> 报奖计划目标
        gainPrizeQ1a: [
          {
            required: true,
            message: "请输入Q1报奖计划目标",
            trigger: "blur",
          },
        ],
        gainPrizeQ2a: [
          {
            required: true,
            message: "请输入Q2报奖计划目标",
            trigger: "blur",
          },
        ],
        gainPrizeQ3a: [
          {
            required: true,
            message: "请输入Q3报奖计划目标",
            trigger: "blur",
          },
        ],
        gainPrizeQ4a: [
          {
            required: true,
            message: "请输入Q4报奖计划目标",
            trigger: "blur",
          },
        ],
        // 与客户共赢 -> 无重大事故目标分
        BigBugScoreQ1a: [
          {
            required: true,
            message: "请输入Q1无重大事故目标分",
            trigger: "blur",
          },
        ],
        BigBugScoreQ2a: [
          {
            required: true,
            message: "请输入Q2无重大事故目标分",
            trigger: "blur",
          },
        ],
        BigBugScoreQ3a: [
          {
            required: true,
            message: "请输入Q3无重大事故目标分",
            trigger: "blur",
          },
        ],
        BigBugScoreQ4a: [
          {
            required: true,
            message: "请输入Q4无重大事故目标分",
            trigger: "blur",
          },
        ],
        /* 个人成长 */
        // 硬核技能目标
        coreSkills: [
          {
            required: true,
            validator: (_, val, callback) => {
              if (
                this.formData.coreSkills[this.formData.coreSkills.length - 1]
                  .skillQ1a === "" ||
                this.formData.coreSkills[this.formData.coreSkills.length - 1]
                  .skillQ2a === "" ||
                this.formData.coreSkills[this.formData.coreSkills.length - 1]
                  .skillQ3a === "" ||
                this.formData.coreSkills[this.formData.coreSkills.length - 1]
                  .skillQ4a === ""
              ) {
                callback("请完善硬核技能指标");
              } else callback();
            },
            trigger: "blur",
          },
        ],
        // 诺锞经验文档目标
        expQ1a: [
          {
            required: true,
            message: "请输入Q1经验文档目标",
            trigger: "blur",
          },
          {
            pattern: /^[0-9]*$/,
            message: "Q1经验文档目标需为整数",
            trigger: "blur",
          },
        ],
        expQ2a: [
          {
            required: true,
            message: "请输入Q2经验文档目标",
            trigger: "blur",
          },
          {
            pattern: /^[0-9]*$/,
            message: "Q2经验文档目标需为整数",
            trigger: "blur",
          },
        ],
        expQ3a: [
          {
            required: true,
            message: "请输入Q3经验文档目标",
            trigger: "blur",
          },
          {
            pattern: /^[0-9]*$/,
            message: "Q3经验文档目标需为整数",
            trigger: "blur",
          },
        ],
        expQ4a: [
          {
            required: true,
            message: "请输入Q4经验文档目标",
            trigger: "blur",
          },
          {
            pattern: /^[0-9]*$/,
            message: "Q4经验文档目标需为整数",
            trigger: "blur",
          },
        ],
        // 反馈意见
        sopQ1a: [
          {
            required: true,
            message: "请输入Q1计划建议数量",
            trigger: "blur",
          },
        ],
        sopQ2a: [
          {
            required: true,
            message: "请输入Q2计划建议数量",
            trigger: "blur",
          },
        ],
        sopQ3a: [
          {
            required: true,
            message: "请输入Q3计划建议数量",
            trigger: "blur",
          },
        ],
        sopQ4a: [
          {
            required: true,
            message: "请输入Q4计划建议数量",
            trigger: "blur",
          },
        ],
        // 课程输出量目标
        courseQ1a: [
          {
            required: true,
            message: "请输入Q1课程研发目标",
            trigger: "blur",
          },
          {
            pattern: /^[0-9]*$/,
            message: "Q1课程研发目标需为整数",
            trigger: "blur",
          },
        ],
        courseQ2a: [
          {
            required: true,
            message: "请输入Q2课程研发目标",
            trigger: "blur",
          },
          {
            pattern: /^[0-9]*$/,
            message: "Q2课程研发目标需为整数",
            trigger: "blur",
          },
        ],
        courseQ3a: [
          {
            required: true,
            message: "请输入Q3课程研发目标",
            trigger: "blur",
          },
          {
            pattern: /^[0-9]*$/,
            message: "Q3课程研发目标需为整数",
            trigger: "blur",
          },
        ],
        courseQ4a: [
          {
            required: true,
            message: "请输入Q4课程研发目标",
            trigger: "blur",
          },
          {
            pattern: /^[0-9]*$/,
            message: "Q4课程研发目标需为整数",
            trigger: "blur",
          },
        ],
        // 技能证书目标
        skillBooks: [
          {
            required: true,
            validator: (_, val, callback) => {
              if (
                this.formData.skillBooks[this.formData.skillBooks.length - 1]
                  .certQ1a === "" ||
                this.formData.skillBooks[this.formData.skillBooks.length - 1]
                  .certQ2a === "" ||
                this.formData.skillBooks[this.formData.skillBooks.length - 1]
                  .certQ3a === "" ||
                this.formData.skillBooks[this.formData.skillBooks.length - 1]
                  .certQ4a === ""
              ) {
                callback("请完善技能证书是？");
              } else callback();
            },
            trigger: "blur",
          },
        ],
        // TGT规划目标
        tgtQ1a: [],
        // tgtQ2a: [
        //   {
        //     required: true,
        //     message: "请输入Q2TGT是否参加？目标是？",
        //     trigger: "blur",
        //   },
        // ],
        tgtQ3a: [
          {
            required: true,
            message: "请输入Q3TGT是否参加？目标是？",
            trigger: "blur",
          },
        ],
        // tgtQ4a: [
        //   {
        //     required: true,
        //     message: "请输入Q4TGT是否参加？目标是？",
        //     trigger: "blur",
        //   },
        // ],
        // 收入提升目标
        salaryQ1a: [],
        // salaryQ2a: [
        //   {
        //     required: true,
        //     message: "请输入Q2增长目标：具体金额/人民币",
        //     trigger: "blur",
        //   },
        // ],
        salaryQ3a: [
          // {
          //   required: true,
          //   message: "请输入Q3增长目标：具体金额/人民币",
          //   trigger: "blur",
          // },
        ],
        // salaryQ4a: [
        //   {
        //     required: true,
        //     message: "请输入Q4增长目标：具体金额/人民币",
        //     trigger: "blur",
        //   },
        // ],
      },
      responsibleList: [
        {
          title: "目的与目标",
          children: [
            {
              label:
                "为了对事业部所有成员的业绩、能力、态度进行客观评价，达到事业部成员（Mate）与事业部共赢，以达成公司成长与培养业务人才尤其是领导人才之目的，特制定《诺锞传媒事业部目标责任书》（<Directly Responsible Individual of NORMCORE Hoshin Units>，以下简称DRI）。",
            },
          ],
        },
        {
          title: "适用范围",
          children: [
            {
              label: "事业部所有成员",
            },
          ],
        },
        {
          title: "事业部的责任与考核原则",
          children: [
            {
              label:
                "全面与公开原则。事业部应根据各岗位、职位的不同，确定相应的考核规程与评价标准，并对事业部成员（Mate）公开。",
            },
            {
              label:
                "客观与公正原则。对事业部成员（Mate）的任何考核都有明确的考核标准，以数据为依据，客观反应事业部成员（Mate）的实际情况，同岗位同标准，避免因个人或者其他主观因素影响考核结果。",
            },
          ],
        },
        {
          title: "考核周期",
          children: [
            {
              label: "公司将以自然年为单位对事业部进行考核。",
            },
          ],
        },
        {
          title: "DRI的评估",
          children: [
            {
              label:
                "DRI的评定方案与结果由事业部队长（Captain）提出，报SDC复核确认，确认后执行；",
            },
            {
              label: "DRI的评定由各个事业部队长（Captain）负责。",
            },
          ],
        },
        {
          title: "事业部成员（Mate）须知",
          children: [
            {
              label: "事业部成员（Mate）接受队长（Captain）的管理；",
            },
            {
              label:
                "事业部成员（Mate）签署《诺锞传媒事业部目标责任书》（<Directly Responsible Individual of NORMCORE Hoshin Units>，简称DRI，按照DRI之规定履职，接受队长（Captain）的考核，该DRI经队长（Captain）汇报至SDC，经SDC确认后生效；",
            },
            {
              label:
                "事业部成员（Mate）职级、薪酬由NCC-SHU组建专业委员会进行评估；",
            },
            {
              label: "事业部成员（Mate）享受事业部奖金制；",
            },
            {
              label:
                "事业部成员（Mate）若感受到任何不公正待遇，可以向SDC提出投诉，SDC将赋权合适人选进行处理；",
            },
            {
              label: "保密与竞业限制规则",
              children: [
                {
                  label:
                    "事业部所有成员承诺对协议信息的严格保密。未经公司事先书面许可，不得以任何方式或形式复制或散布，或向任何其他人披露部分或全部信息，但在必要的情况下，向相关法律顾问、SDC披露除外。",
                },
                {
                  label:
                    "事业部所有成员自离职之日起2年内不直接或间接地聘用或企图聘用本公司员工，除非另有书面约定；",
                },
                {
                  label:
                    "事业部所有成员在离开事业部2年之内，不得单方面与本公司任何客户发生任何形式（包括直接/间接）的商务合作，除非另有书面约定；",
                },
                {
                  label:
                    "任何一方违反本协议约定内容，守约方有权要求违约方支付违约金人民币壹佰万元整（RMB 1,000,000）元 。",
                },
              ],
            },
          ],
        },
        {
          title: "其他",
          children: [
            {
              label:
                "未尽事宜将通过文件增补、邮件以及Excalibur（公司运营系统）公告等方式进行通知；",
            },
            {
              label: "本文件解释权归SDC所有。",
            },
          ],
        },
      ],
    };
  },
  created() {
    document.documentElement
      ? (document.documentElement.scrollTop = 0)
      : (document.body.scrollTop = 0);
    this.getUserInfo();
  },
  methods: {
    clearFeedBack() {
      this.feedBackVal = "";
      this.showFeedBackModal = false;
    },
    submitFeedBack() {
      if (!this.feedBackVal) {
        Message.warning({
          message: "请输入反馈意见",
        });
        return;
      }
      this.$http
        .post(
          Dri.toolkitremark,
          this.qs.stringify({ typeId: 99, content: this.feedBackVal }),
          {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") },
          }
        )
        .then((res) => {
          const { data } = res;
          if (data.retCode === 0) {
            Message.success({
              message: "提交成功",
            });
            this.clearFeedBack();
          } else {
            Message.error({
              message: data.retMsg,
            });
          }
        });
    },
    // 获取用户信息
    getUserInfo() {
      this.driUserId = this.$route.query.driUserId;
      this.driObjectId = this.$route.query.driObjectId;
      if (this.driUserId && this.driUserId !== undefined) {
        this.isCreate = false;
      } else {
        this.isCreate = true;
      }
      this.$http
        .post(CreateDri.userInfo, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          const { data } = res;
          if (data.retCode === 0) {
            this.userInfo = { ...data.retData };
            /* 判断是否为必填项 */
            if (this.userInfo.id !== 1) {
              if (this.userInfo.isCaptain) {
                this.rules.orgLoc = [];
                this.rules.sonCompanyLoc = [];
                this.rules.groupLoc = [];
              } else {
                this.rules.orgLoc = [];
                this.rules.sonCompanyLoc = [];
                this.rules.groupLoc = [];
                this.rules.teamLoc = [];
                this.rules.team3y1Obj = [];
                this.rules.team3y2Obj = [];
                this.rules.team3y3Obj = [];
                this.rules.productPlan = [];
                this.rules.customerPlan = [];
                this.rules.gainPrizeQ1a = [];
                this.rules.gainPrizeQ2a = [];
                this.rules.gainPrizeQ3a = [];
                this.rules.gainPrizeQ4a = [];
                this.rules.holdSystemScoreQ1a = [];
                this.rules.holdSystemScoreQ2a = [];
                this.rules.holdSystemScoreQ3a = [];
                this.rules.holdSystemScoreQ4a = [];
                this.rules.holdFlowScoreQ1a = [];
                this.rules.holdFlowScoreQ2a = [];
                this.rules.holdFlowScoreQ3a = [];
                this.rules.holdFlowScoreQ4a = [];
                this.rules.incomeRateQ1a = [];
                this.rules.incomeRateQ2a = [];
                this.rules.incomeRateQ3a = [];
                this.rules.incomeRateQ4a = [];
                this.rules.ArMoveQ1a = [];
                this.rules.ArMoveQ2a = [];
                this.rules.ArMoveQ3a = [];
                this.rules.ArMoveQ4a = [];
                this.rules.ArPercentQ1a = [];
                this.rules.ArPercentQ2a = [];
                this.rules.ArPercentQ3a = [];
                this.rules.ArPercentQ4a = [];
                this.rules.ApMoveQ1a = [];
                this.rules.ApMoveQ2a = [];
                this.rules.ApMoveQ3a = [];
                this.rules.ApMoveQ4a = [];
                this.rules.ApPercentQ1a = [];
                this.rules.ApPercentQ2a = [];
                this.rules.ApPercentQ3a = [];
                this.rules.ApPercentQ4a = [];
                this.rules.surveyScoreQ1a = [];
                this.rules.surveyScoreQ2a = [];
                this.rules.surveyScoreQ3a = [];
                this.rules.surveyScoreQ4a = [];
              }
            }

            // if (this.isCreate) {
            //   if (this.userInfo.id !== 1) {
            //     if (this.userInfo.isCaptain) this.getCompanyPosition(1)
            //     else this.getCompanyPosition(1); this.getCompanyPosition(this.userInfo.teamCaptainUserId)
            //   }
            // } else {
            //   this.getDriInfo(this.userInfo.id)
            // }
            this.getDriInfo(this.userInfo.id);
          } else if (data.retCode === 100014) {
            this.$cookie.delete("token");
            this.$router.push("/");
          }
        });
    },
    // 根据id分别获取（组织/子公司/事业群定位） - （事业部/事业部未来三年计划/产品规划/客户规划定位）
    getCompanyPosition(id) {
      this.$http
        .post(
          CreateDri.driObjectGetuser,
          this.qs.stringify({ driUserId: id }),
          {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") },
          }
        )
        .then((res) => {
          const { data } = res;
          const { retData } = data;
          if (data.retCode === 0) {
            if (this.userInfo.teamCaptainUserId === 1) {
              // captain和boss为同一人
              (this.formData.orgLoc = retData.objectInfo.orgLoc),
                (this.formData.sonCompanyLoc =
                  retData.objectInfo.sonCompanyLoc),
                (this.formData.groupLoc = retData.objectInfo.groupLoc),
                (this.formData.teamLoc = retData.objectInfo.teamLoc),
                (this.formData.team3y1Obj = retData.objectInfo.team3y1Obj),
                (this.formData.team3y2Obj = retData.objectInfo.team3y2Obj),
                (this.formData.team3y3Obj = retData.objectInfo.team3y3Obj),
                (this.formData.productPlan = retData.objectInfo.productPlan),
                (this.formData.customerPlan = retData.objectInfo.customerPlan),
                (this.formData.gainPrizeQ1a = retData.objectInfo.gainPrizeQ1a),
                (this.formData.gainPrizeQ2a = retData.objectInfo.gainPrizeQ2a),
                (this.formData.gainPrizeQ3a = retData.objectInfo.gainPrizeQ3a),
                (this.formData.gainPrizeQ4a = retData.objectInfo.gainPrizeQ4a),
                (this.formData.gainPrizeQ1b = retData.objectInfo.gainPrizeQ1b),
                (this.formData.gainPrizeQ2b = retData.objectInfo.gainPrizeQ2b),
                (this.formData.gainPrizeQ3b = retData.objectInfo.gainPrizeQ3b),
                (this.formData.gainPrizeQ4b = retData.objectInfo.gainPrizeQ4b),
                /* 合规检查 */
                (this.formData.holdSystemScoreQ1a =
                  retData.objectInfo.holdSystemScoreQ1a),
                (this.formData.holdSystemScoreQ2a =
                  retData.objectInfo.holdSystemScoreQ2a),
                (this.formData.holdSystemScoreQ3a =
                  retData.objectInfo.holdSystemScoreQ3a),
                (this.formData.holdSystemScoreQ4a =
                  retData.objectInfo.holdSystemScoreQ4a),
                (this.formData.holdSystemScoreQ1b =
                  retData.objectInfo.holdSystemScoreQ1b),
                (this.formData.holdSystemScoreQ2b =
                  retData.objectInfo.holdSystemScoreQ2b),
                (this.formData.holdSystemScoreQ3b =
                  retData.objectInfo.holdSystemScoreQ3b),
                (this.formData.holdSystemScoreQ4b =
                  retData.objectInfo.holdSystemScoreQ4b),
                (this.formData.holdFlowScoreQ1a =
                  retData.objectInfo.holdFlowScoreQ1a),
                (this.formData.holdFlowScoreQ2a =
                  retData.objectInfo.holdFlowScoreQ2a),
                (this.formData.holdFlowScoreQ3a =
                  retData.objectInfo.holdFlowScoreQ3a),
                (this.formData.holdFlowScoreQ4a =
                  retData.objectInfo.holdFlowScoreQ4a),
                (this.formData.holdFlowScoreQ1b =
                  retData.objectInfo.holdFlowScoreQ1b),
                (this.formData.holdFlowScoreQ2b =
                  retData.objectInfo.holdFlowScoreQ2b),
                (this.formData.holdFlowScoreQ3b =
                  retData.objectInfo.holdFlowScoreQ3b),
                (this.formData.holdFlowScoreQ4b =
                  retData.objectInfo.holdFlowScoreQ4b),
                /* 财务考核 */
                (this.formData.incomeRateQ1a =
                  retData.objectInfo.incomeRateQ1a),
                (this.formData.incomeRateQ2a =
                  retData.objectInfo.incomeRateQ2a),
                (this.formData.incomeRateQ3a =
                  retData.objectInfo.incomeRateQ3a),
                (this.formData.incomeRateQ4a =
                  retData.objectInfo.incomeRateQ4a),
                (this.formData.incomeRateQ1b =
                  retData.objectInfo.incomeRateQ1b),
                (this.formData.incomeRateQ2b =
                  retData.objectInfo.incomeRateQ2b),
                (this.formData.incomeRateQ3b =
                  retData.objectInfo.incomeRateQ3b),
                (this.formData.incomeRateQ4b =
                  retData.objectInfo.incomeRateQ4b),
                (this.formData.ArMoveQ1a = retData.objectInfo.ArMoveQ1a),
                (this.formData.ArMoveQ2a = retData.objectInfo.ArMoveQ2a),
                (this.formData.ArMoveQ3a = retData.objectInfo.ArMoveQ3a),
                (this.formData.ArMoveQ4a = retData.objectInfo.ArMoveQ4a),
                (this.formData.ArMoveQ1b = retData.objectInfo.ArMoveQ1b),
                (this.formData.ArMoveQ2b = retData.objectInfo.ArMoveQ2b),
                (this.formData.ArMoveQ3b = retData.objectInfo.ArMoveQ3b),
                (this.formData.ArMoveQ4b = retData.objectInfo.ArMoveQ4b),
                (this.formData.ArPercentQ1a = retData.objectInfo.ArPercentQ1a),
                (this.formData.ArPercentQ2a = retData.objectInfo.ArPercentQ2a),
                (this.formData.ArPercentQ3a = retData.objectInfo.ArPercentQ3a),
                (this.formData.ArPercentQ4a = retData.objectInfo.ArPercentQ4a),
                (this.formData.ArPercentQ1b = retData.objectInfo.ArPercentQ1b),
                (this.formData.ArPercentQ2b = retData.objectInfo.ArPercentQ2b),
                (this.formData.ArPercentQ3b = retData.objectInfo.ArPercentQ3b),
                (this.formData.ArPercentQ4b = retData.objectInfo.ArPercentQ4b),
                (this.formData.ApMoveQ1a = retData.objectInfo.ApMoveQ1a),
                (this.formData.ApMoveQ2a = retData.objectInfo.ApMoveQ2a),
                (this.formData.ApMoveQ3a = retData.objectInfo.ApMoveQ3a),
                (this.formData.ApMoveQ4a = retData.objectInfo.ApMoveQ4a),
                (this.formData.ApMoveQ1b = retData.objectInfo.ApMoveQ1b),
                (this.formData.ApMoveQ2b = retData.objectInfo.ApMoveQ2b),
                (this.formData.ApMoveQ3b = retData.objectInfo.ApMoveQ3b),
                (this.formData.ApMoveQ4b = retData.objectInfo.ApMoveQ4b),
                (this.formData.ApPercentQ1a = retData.objectInfo.ApPercentQ1a),
                (this.formData.ApPercentQ2a = retData.objectInfo.ApPercentQ2a),
                (this.formData.ApPercentQ3a = retData.objectInfo.ApPercentQ3a),
                (this.formData.ApPercentQ4a = retData.objectInfo.ApPercentQ4a),
                (this.formData.ApPercentQ1b = retData.objectInfo.ApPercentQ1b),
                (this.formData.ApPercentQ2b = retData.objectInfo.ApPercentQ2b),
                (this.formData.ApPercentQ3b = retData.objectInfo.ApPercentQ3b),
                (this.formData.ApPercentQ4b = retData.objectInfo.ApPercentQ4b),
                (this.formData.surveyScoreQ1a =
                  retData.objectInfo.surveyScoreQ1a),
                (this.formData.surveyScoreQ2a =
                  retData.objectInfo.surveyScoreQ2a),
                (this.formData.surveyScoreQ3a =
                  retData.objectInfo.surveyScoreQ3a),
                (this.formData.surveyScoreQ4a =
                  retData.objectInfo.surveyScoreQ4a),
                (this.formData.surveyScoreQ1b =
                  retData.objectInfo.surveyScoreQ1b),
                (this.formData.surveyScoreQ2b =
                  retData.objectInfo.surveyScoreQ2b),
                (this.formData.surveyScoreQ3b =
                  retData.objectInfo.surveyScoreQ3b),
                (this.formData.surveyScoreQ4b =
                  retData.objectInfo.surveyScoreQ4b),
                console.log("captain和boss为同一人", this.formData);
            } else {
              if (id === 1) {
                (this.formData.orgLoc = retData.objectInfo.orgLoc),
                  (this.formData.sonCompanyLoc =
                    retData.objectInfo.sonCompanyLoc),
                  (this.formData.groupLoc = retData.objectInfo.groupLoc),
                  console.log("获取集团信息", this.formData);
              } else {
                (this.formData.teamLoc = retData.objectInfo.teamLoc),
                  (this.formData.team3y1Obj = retData.objectInfo.team3y1Obj),
                  (this.formData.team3y2Obj = retData.objectInfo.team3y2Obj),
                  (this.formData.team3y3Obj = retData.objectInfo.team3y3Obj),
                  (this.formData.productPlan = retData.objectInfo.productPlan),
                  (this.formData.gainPrizeQ1a =
                    retData.objectInfo.gainPrizeQ1a),
                  (this.formData.gainPrizeQ2a =
                    retData.objectInfo.gainPrizeQ2a),
                  (this.formData.gainPrizeQ3a =
                    retData.objectInfo.gainPrizeQ3a),
                  (this.formData.gainPrizeQ4a =
                    retData.objectInfo.gainPrizeQ4a),
                  (this.formData.gainPrizeQ1b =
                    retData.objectInfo.gainPrizeQ1b),
                  (this.formData.gainPrizeQ2b =
                    retData.objectInfo.gainPrizeQ2b),
                  (this.formData.gainPrizeQ3b =
                    retData.objectInfo.gainPrizeQ3b),
                  (this.formData.gainPrizeQ4b =
                    retData.objectInfo.gainPrizeQ4b),
                  (this.formData.customerPlan =
                    retData.objectInfo.customerPlan),
                  /* 合规检查 */
                  (this.formData.holdSystemScoreQ1a =
                    retData.objectInfo.holdSystemScoreQ1a),
                  (this.formData.holdSystemScoreQ2a =
                    retData.objectInfo.holdSystemScoreQ2a),
                  (this.formData.holdSystemScoreQ3a =
                    retData.objectInfo.holdSystemScoreQ3a),
                  (this.formData.holdSystemScoreQ4a =
                    retData.objectInfo.holdSystemScoreQ4a),
                  // (this.formData.holdSystemScoreQ1b = retData.objectInfo.holdSystemScoreQ1b),
                  // (this.formData.holdSystemScoreQ2b = retData.objectInfo.holdSystemScoreQ2b),
                  // (this.formData.holdSystemScoreQ3b = retData.objectInfo.holdSystemScoreQ3b),
                  // (this.formData.holdSystemScoreQ4b = retData.objectInfo.holdSystemScoreQ4b),
                  (this.formData.holdFlowScoreQ1a =
                    retData.objectInfo.holdFlowScoreQ1a),
                  (this.formData.holdFlowScoreQ2a =
                    retData.objectInfo.holdFlowScoreQ2a),
                  (this.formData.holdFlowScoreQ3a =
                    retData.objectInfo.holdFlowScoreQ3a),
                  (this.formData.holdFlowScoreQ4a =
                    retData.objectInfo.holdFlowScoreQ4a),
                  // (this.formData.holdFlowScoreQ1b = retData.objectInfo.holdFlowScoreQ1b),
                  // (this.formData.holdFlowScoreQ2b = retData.objectInfo.holdFlowScoreQ2b),
                  // (this.formData.holdFlowScoreQ3b = retData.objectInfo.holdFlowScoreQ3b),
                  // (this.formData.holdFlowScoreQ4b = retData.objectInfo.holdFlowScoreQ4b),
                  /* 财务考核 */
                  (this.formData.incomeRateQ1a =
                    retData.objectInfo.incomeRateQ1a),
                  (this.formData.incomeRateQ2a =
                    retData.objectInfo.incomeRateQ2a),
                  (this.formData.incomeRateQ3a =
                    retData.objectInfo.incomeRateQ3a),
                  (this.formData.incomeRateQ4a =
                    retData.objectInfo.incomeRateQ4a),
                  // (this.formData.incomeRateQ1b = retData.objectInfo.incomeRateQ1b),
                  // (this.formData.incomeRateQ2b = retData.objectInfo.incomeRateQ2b),
                  // (this.formData.incomeRateQ3b = retData.objectInfo.incomeRateQ3b),
                  // (this.formData.incomeRateQ4b = retData.objectInfo.incomeRateQ4b),
                  (this.formData.ArMoveQ1a = retData.objectInfo.ArMoveQ1a),
                  (this.formData.ArMoveQ2a = retData.objectInfo.ArMoveQ2a),
                  (this.formData.ArMoveQ3a = retData.objectInfo.ArMoveQ3a),
                  (this.formData.ArMoveQ4a = retData.objectInfo.ArMoveQ4a),
                  // (this.formData.ArMoveQ1b = retData.objectInfo.ArMoveQ1b),
                  // (this.formData.ArMoveQ2b = retData.objectInfo.ArMoveQ2b),
                  // (this.formData.ArMoveQ3b = retData.objectInfo.ArMoveQ3b),
                  // (this.formData.ArMoveQ4b = retData.objectInfo.ArMoveQ4b),
                  (this.formData.ArPercentQ1a =
                    retData.objectInfo.ArPercentQ1a),
                  (this.formData.ArPercentQ2a =
                    retData.objectInfo.ArPercentQ2a),
                  (this.formData.ArPercentQ3a =
                    retData.objectInfo.ArPercentQ3a),
                  (this.formData.ArPercentQ4a =
                    retData.objectInfo.ArPercentQ4a),
                  // (this.formData.ArPercentQ1b = retData.objectInfo.ArPercentQ1b),
                  // (this.formData.ArPercentQ2b = retData.objectInfo.ArPercentQ2b),
                  // (this.formData.ArPercentQ3b = retData.objectInfo.ArPercentQ3b),
                  // (this.formData.ArPercentQ4b = retData.objectInfo.ArPercentQ4b),
                  (this.formData.ApMoveQ1a = retData.objectInfo.ApMoveQ1a),
                  (this.formData.ApMoveQ2a = retData.objectInfo.ApMoveQ2a),
                  (this.formData.ApMoveQ3a = retData.objectInfo.ApMoveQ3a),
                  (this.formData.ApMoveQ4a = retData.objectInfo.ApMoveQ4a),
                  // (this.formData.ApMoveQ1b = retData.objectInfo.ApMoveQ1b),
                  // (this.formData.ApMoveQ2b = retData.objectInfo.ApMoveQ2b),
                  // (this.formData.ApMoveQ3b = retData.objectInfo.ApMoveQ3b),
                  // (this.formData.ApMoveQ4b = retData.objectInfo.ApMoveQ4b),
                  (this.formData.ApPercentQ1a =
                    retData.objectInfo.ApPercentQ1a),
                  (this.formData.ApPercentQ2a =
                    retData.objectInfo.ApPercentQ2a),
                  (this.formData.ApPercentQ3a =
                    retData.objectInfo.ApPercentQ3a),
                  (this.formData.ApPercentQ4a =
                    retData.objectInfo.ApPercentQ4a),
                  // (this.formData.ApPercentQ1b = retData.objectInfo.ApPercentQ1b),
                  // (this.formData.ApPercentQ2b = retData.objectInfo.ApPercentQ2b),
                  // (this.formData.ApPercentQ3b = retData.objectInfo.ApPercentQ3b),
                  // (this.formData.ApPercentQ4b = retData.objectInfo.ApPercentQ4b),
                  (this.formData.surveyScoreQ1a =
                    retData.objectInfo.surveyScoreQ1a),
                  (this.formData.surveyScoreQ2a =
                    retData.objectInfo.surveyScoreQ2a),
                  (this.formData.surveyScoreQ3a =
                    retData.objectInfo.surveyScoreQ3a),
                  (this.formData.surveyScoreQ4a =
                    retData.objectInfo.surveyScoreQ4a),
                  // (this.formData.surveyScoreQ1b = retData.objectInfo.surveyScoreQ1b),
                  // (this.formData.surveyScoreQ2b = retData.objectInfo.surveyScoreQ2b),
                  // (this.formData.surveyScoreQ3b = retData.objectInfo.surveyScoreQ3b),
                  // (this.formData.surveyScoreQ4b = retData.objectInfo.surveyScoreQ4b),
                  console.log("获取事业部的信息", this.formData);
              }
            }
          } else if (data.retCode === 100014) {
            this.$cookie.delete("token");
            this.$router.push("/");
          }
        });
    },
    getDriInfo(id) {
      this.$http
        .post(
          CreateDri.driObjectGetuser,
          this.qs.stringify({ driUserId: id }),
          {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") },
          }
        )
        .then((res) => {
          const { data } = res;
          if (data.retCode === 0) {
            if (this.userInfo.id !== 1) {
              if (this.userInfo.isCaptain) this.getCompanyPosition(1);
              else this.getCompanyPosition(1);
              this.getCompanyPosition(this.userInfo.teamCaptainUserId);
            }
            if (!Array.isArray(data.retData.objectInfo)) {
              this.formData = { ...data.retData.objectInfo };
              this.$set(
                this.formData,
                "coreSkills",
                this.splitData(
                  "coreSkills",
                  this.formData.skillQ1a,
                  this.formData.skillQ2a,
                  this.formData.skillQ3a,
                  this.formData.skillQ4a
                )
              );
              this.$set(
                this.formData,
                "skillBooks",
                this.splitData(
                  "skillBooks",
                  this.formData.certQ1a,
                  this.formData.certQ2a,
                  this.formData.certQ3a,
                  this.formData.certQ4a
                )
              );
              this.role.btnSave_visible =
                data.retData.objectInfo.btnSave_visible;
              this.role.btnApply_visible =
                data.retData.objectInfo.btnApply_visible;

              if (this.formData.currentYearName != "2021") {
                // this.rules.salaryQ1a.push({
                //   required: true,
                //   message: "请输入Q1增长目标：具体金额/人民币",
                //   trigger: "blur",
                // });
                this.rules.tgtQ1a.push({
                  required: true,
                  message: "请输入Q1TGT是否参加？目标是？",
                  trigger: "blur",
                });
              }
            } else {
              if (this.currentYear != "2021") {
                // this.rules.salaryQ1a.push({
                //   required: true,
                //   message: "请输入Q1增长目标：具体金额/人民币",
                //   trigger: "blur",
                // });
                this.rules.tgtQ1a.push({
                  required: true,
                  message: "请输入Q1TGT是否参加？目标是？",
                  trigger: "blur",
                });
              }
            }
          } else if (data.retCode === 100014) {
            this.$cookie.delete("token");
            this.$router.push("/");
          }
        });
    },
    // 新增一条数据
    addItems(key) {
      if (key === "coreSkill") {
        if (
          this.formData.coreSkills[this.formData.coreSkills.length - 1]
            .skillQ1a === "" ||
          this.formData.coreSkills[this.formData.coreSkills.length - 1]
            .skillQ2a === "" ||
          this.formData.coreSkills[this.formData.coreSkills.length - 1]
            .skillQ3a === "" ||
          this.formData.coreSkills[this.formData.coreSkills.length - 1]
            .skillQ4a === ""
        ) {
          this.$notify({
            title: "失败",
            message: "请先完成之前的操作",
            type: "error",
            duration: 2000,
          });
          return;
        }
      }
      if (key === "skillBooks") {
        if (
          this.formData.skillBooks[this.formData.skillBooks.length - 1]
            .certQ1a === "" ||
          this.formData.skillBooks[this.formData.skillBooks.length - 1]
            .certQ2a === "" ||
          this.formData.skillBooks[this.formData.skillBooks.length - 1]
            .certQ3a === "" ||
          this.formData.skillBooks[this.formData.skillBooks.length - 1]
            .certQ4a === ""
        ) {
          this.$notify({
            title: "失败",
            message: "请先完成之前的操作",
            type: "error",
            duration: 2000,
          });
          return;
        }
      }

      if (key === "coreSkill") {
        this.formData.coreSkills.push({
          skillQ1a: "",
          skillQ2a: "",
          skillQ3a: "",
          skillQ4a: "",
        });
      } else if (key === "skillBooks") {
        this.formData.skillBooks.push({
          certQ1a: "",
          certQ2a: "",
          certQ3a: "",
          certQ4a: "",
        });
      }
      this.$forceUpdate();
      this.$set(this.formData);
    },
    // 移除一条数据
    removeItems(index, key) {
      if (key === "coreSkill") {
        this.formData.coreSkills.splice(index, 1);
      } else if (key === "skillBooks") {
        this.formData.skillBooks.splice(index, 1);
      }
      this.$forceUpdate();
      this.$set(this.formData);
    },
    // 校验表单信息
    judgeForm(opType) {
      this.mergeData();
      this.$refs["driForm"].validate((vaild, obj) => {
        if (vaild) {
          this.saveDriInfo(opType);
        } else {
          for (const prop in obj) {
            if (!this.formData[prop]) {
              Message.warning({
                message: obj[prop][0].message,
              });
              break;
            }
          }
        }
      });
    },
    // 保存新增/编辑的dri信息
    saveDriInfo(opType) {
      if (!this.agreeDri && opType === 2) {
        Message.warning({
          message: "请先同意创建DRI事宜",
        });
        return;
      }

      for (const prop in this.formData) {
        if (typeof this.formData[prop] === "string") {
          this.formData[prop] = this.formData[prop].replace(/\n/g, "<br/>")
        }
      }
      const params = {
        ...this.formData,
        driObjectId: "",
        opType: opType, // 1仅保存不申请审核、2保存并且申请审核
      };
      // if (!this.isCreate) {
      params.driObjectId = this.formData.id;

      // for (const prop in params) {
      //   if (typeof params[prop] === "string") params[prop].replace(/\n/g, "<br/>")
      // }
      // }
      this.$http
        .post(CreateDri.driobjectset, this.qs.stringify({ ...params }), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          const { data } = res;
          if (data.retCode === 0) {
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000,
            });
            this.$router.back(-1);
          } else if (data.retCode === 100014) {
            this.$cookie.delete("token");
            this.$router.push({
              name: "driIndex",
            });
          } else {
            this.$notify({
              title: "失败",
              message: data.retMsg,
              type: "error",
              duration: 2000,
            });
          }
        });
    },
    // 数据拆分
    splitData(key, d1, d2, d3, d4) {
      const d1Sp = d1.split("|");
      const d2Sp = d2.split("|");
      const d3Sp = d3.split("|");
      const d4Sp = d4.split("|");

      let arr = [];
      if (key === "coreSkills") {
        d1Sp.forEach((item, index) => {
          arr.push({
            skillQ1a: item,
            skillQ2a: d2Sp[index],
            skillQ3a: d3Sp[index],
            skillQ4a: d4Sp[index],
          });
        });
      } else if (key === "skillBooks") {
        d1Sp.forEach((item, index) => {
          arr.push({
            certQ1a: item,
            certQ2a: d2Sp[index],
            certQ3a: d3Sp[index],
            certQ4a: d4Sp[index],
          });
        });
      }
      return arr;
    },
    // 数据合并
    mergeData() {
      // 硬核技能
      this.formData.skillQ1a = this.formData.coreSkills
        .map((item) => item.skillQ1a)
        .join("|");
      this.formData.skillQ2a = this.formData.coreSkills
        .map((item) => item.skillQ2a)
        .join("|");
      this.formData.skillQ3a = this.formData.coreSkills
        .map((item) => item.skillQ3a)
        .join("|");
      this.formData.skillQ4a = this.formData.coreSkills
        .map((item) => item.skillQ4a)
        .join("|");
      // 技能证书s
      this.formData.certQ1a = this.formData.skillBooks
        .map((item) => item.certQ1a)
        .join("|");
      this.formData.certQ2a = this.formData.skillBooks
        .map((item) => item.certQ2a)
        .join("|");
      this.formData.certQ3a = this.formData.skillBooks
        .map((item) => item.certQ3a)
        .join("|");
      this.formData.certQ4a = this.formData.skillBooks
        .map((item) => item.certQ4a)
        .join("|");
    },
  },
};
</script>
<style lang="less" scoped>
.dri-dialog-agree {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  height: 600px;
  overflow: scroll;
  h2 {
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
    line-height: 25px;
    text-align: center;
    margin-bottom: 25px;
  }
  &-item {
    margin-top: 15px;
    line-height: 22px;
    h3 {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 22px;
    }
    > div {
      text-indent: 2em;
      > div {
        text-indent: 4em;
      }
    }
  }
}
</style>
