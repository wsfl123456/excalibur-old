<template>
  <div class="dri-detail">
    <!-- intro - start -->
    <div class="intro">
      <div>
        <div class="filter">
          <Crumb :crumb="crumb" />

          <div class="date-pick">
            <div class="customer">
              <span>{{ curYear }}_DRI</span>
              <i class="el-icon-arrow-down"></i>
            </div>
            <el-date-picker
              v-model="curYear"
              value-format="yyyy"
              :clearable="false"
              @change="changeYear"
              :picker-options="pickerOptions"
              type="year"
              placeholder="选择年"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="list">
          <img v-if="driDetail.driUserNamePic" :src="driDetail.driUserNamePic" alt="" />
          <img v-else src="../../assets/images/dri/user.jpg" alt="">
          <div class="right">
            <h4>{{ this.crumb[this.crumb.length - 1] }}_{{ curYear }}DRI</h4>
            <div v-for="(row, key) in introList" :key="key">
              <div v-for="(i, k) in row" :key="k">
                <span>{{ i.label }} </span><span>{{ driDetail[i.prop] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- intro - end -->

    <!-- split -->
    <div class="split">
      <div>
        <!-- <p><i class="el-icon-warning"></i>红色字体代表达成情况</p> -->
        <p v-if="+driDetail.auditorStatus === 3">
          <i class="el-icon-error"></i>审核不通过：{{ driDetail.auditorReason }}
        </p>
      </div>
    </div>

    <!-- content - start -->
    <div class="info">
      <div>
        <!-- career - start -->
        <div class="grow">
          <div class="title">
            <div>
              HOSHIN
              <h2>事业成长</h2>
            </div>
            <p>
              事业成长是指无论我们这个大组织还是小到一个专业小组、事业部等，我们共同要走到的方向、我们要一起努力的目的，是我们这群人的最大交集
            </p>
          </div>
          <div class="list">
            <div class="item" v-for="(i, k) in careerList" :key="k">
              <div class="head">
                <span>{{ i.label }}:</span>
              </div>
              <template v-if="i.children">
                <p v-for="(goal, key) in i.children" :key="key">
                  <span class="radio"></span>
                  {{ +curYear + key }}年：<span v-html="driDetail[goal.prop]"></span>
                </p>
              </template>
              <template v-else>
                <p v-html="driDetail[i.prop]">
                </p>
              </template>
            </div>
          </div>
        </div>
        <!-- career - end -->

        <!-- 未达成 -->
        <template v-if="driDetail.auditorStatus !== 4">
          <div class="grow" v-for="(i1, k1) in goalReachList" :key="k1">
            <div class="title">
              <div>
                {{ i1.titleEN }}
                <h2>{{ i1.title }}</h2>
              </div>
              <p v-html="i1.intro"></p>
            </div>
            <div class="list" v-for="(i2, k2) in i1.children" :key="k2">
              <div
                class="item"
                v-if="
                  !(
                    driDetail.incomeQ1a === '[无查看权限]' &&
                    i2.title === '业务增长'
                  )
                "
              >
                <div class="head">
                  <span>{{ i2.title }}</span>
                  <el-tooltip
                    effect="dark"
                    placement="right"
                    v-if="i2.tips && !!i2.tips.length"
                  >
                    <div slot="content" class="dri-tips-list">
                      <p v-for="(tips, tipsK) in i2.tips" :key="tipsK">
                        {{ tips }}
                      </p>
                    </div>
                    <el-button type="text"
                      ><span class="tips-icon">?</span></el-button
                    >
                  </el-tooltip>
                </div>
                <div
                  class="goal-reach"
                  v-for="(i3, k3) in i2.children"
                  :key="k3"
                >
                  <div
                    v-if="
                      !(
                        driDetail.salaryQ1a === '[无查看权限]' &&
                        i3.title === '收入提升（目标）：'
                      )
                    "
                  >
                    <div class="caption">
                      <span>{{ i3.title }}</span>
                    </div>

                    <div class="value">
                      <div
                        class="quarter"
                        v-for="(i4, k4) in i3.children"
                        :key="k4"
                      >
                        <span :class="{ bold: i4.title === 'Total' }"
                          >{{ i4.title }}：</span
                        >
                        <div>
                          <div class="area">
                            <!-- 季度 - start -->
                            <template v-if="i4.title !== 'Total'">
                              <span v-if="i3.pattern !== 'taskNum'">
                                <span v-if="i3.pattern !== 'split'">
                                  <span v-if="i4.tgt">无TGT</span>

                                  <span
                                    v-else-if="
                                      driDetail[i4.goalValProp] &&
                                      driDetail[i4.goalValProp] !== 0
                                    "
                                    >{{ i3.thousandSplit ? thousandSplit(driDetail[i4.goalValProp]) : driDetail[i4.goalValProp]
                                  }}{{ i3.unit }}</span
                                  >
                                  <span v-else>--</span>
                                </span>

                                <!-- 硬核技能/技能证书 -> 目标 - start -->
                                <span v-else>
                                  <!-- 个数 -->
                                  <span
                                    >{{
                                      driDetail[i4.goalValProp]
                                        ? driDetail[i4.goalValProp].split("|")
                                            .length
                                        : 0
                                    }}{{ i3.unit }}</span
                                  >
                                  <!-- 具体内容 -->
                                  <template v-if="driDetail[i4.goalValProp]">
                                    （<span
                                      v-for="(item, index) in driDetail[
                                        i4.goalValProp
                                      ].split('|')"
                                      :key="index"
                                      >{{ item
                                      }}<template
                                        v-if="
                                          index !==
                                          driDetail[i4.goalValProp].split('|')
                                            .length -
                                            1
                                        "
                                        >;
                                      </template></span
                                    >）
                                  </template>
                                </span>
                                <!-- 硬核技能/技能证书 -> 目标 - end  -->
                              </span>
                              <span v-else>系统读取</span>
                            </template>
                            <!-- 季度 - end -->

                            <template
                              v-else-if="i4.reachValProp === 'accumulate'"
                            >
                              <template
                                v-if="
                                  i4.goalValProp === 'accumulate' &&
                                  i3.pattern !== 'taskNum'
                                "
                              >
                                <span class="bold" v-if="i3.pattern === 'split'"
                                  >{{
                                    i3.children
                                      .slice(0, 4)
                                      .map((i) =>
                                        driDetail[i.goalValProp]
                                          ? +driDetail[i.goalValProp].split("|")
                                              .length
                                          : 0
                                      )
                                      .reduce((curr, next) => curr + +next, 0)
                                  }}{{ i3.unit }}</span
                                >
                                <span v-else class="bold">
                                  {{
                                    i3.thousandSplit ? thousandSplit( i3.children
                                      .slice(0, 4)
                                      .map((i) =>
                                        driDetail[i.goalValProp]
                                          ? +driDetail[i.goalValProp]
                                          : 0
                                      )
                                      .reduce((curr, next) => curr + +next, 0)) 
                                      : i3.children
                                      .slice(0, 4)
                                      .map((i) =>
                                        driDetail[i.goalValProp]
                                          ? +driDetail[i.goalValProp]
                                          : 0
                                      )
                                      .reduce((curr, next) => curr + +next, 0)
                                   
                                  }}{{ i3.unit }}
                                </span>
                              </template>
                              <template v-else>
                                <span class="bold">系统读取</span>
                              </template>
                            </template>

                            <template v-else>
                              <span class="bold">--</span>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- 达成 -->
        <template v-else>
          <div class="grow" v-for="(i1, k1) in goalReachList" :key="k1">
            <div class="title">
              <div>
                {{ i1.titleEN }}
                <h2>{{ i1.title }}</h2>
              </div>
              <p v-html="i1.intro"></p>
            </div>
            <div class="title"></div>
            <div class="list" v-for="(i2, k2) in i1.children" :key="k2">
              <div
                class="item"
                v-if="
                  !(
                    driDetail.incomeQ1a === '[无查看权限]' &&
                    i2.title === '业务增长'
                  )
                "
              >
                <div class="head">
                  <span>{{ i2.title }}</span>
                  <el-tooltip
                    effect="dark"
                    placement="right"
                    v-if="i2.tips && !!i2.tips.length"
                  >
                    <div slot="content" class="dri-tips-list">
                      <p v-for="(tips, tipsK) in i2.tips" :key="tipsK">
                        {{ tips }}
                      </p>
                    </div>
                    <el-button type="text"
                      ><span class="tips-icon">?</span></el-button
                    >
                  </el-tooltip>
                </div>
                <div
                  class="goal-reach"
                  v-for="(i3, k3) in i2.children"
                  :key="k3"
                >
                  <div
                    v-if="
                      !(
                        driDetail.salaryQ1a === '[无查看权限]' &&
                        i3.title === '收入提升（目标）：'
                      )
                    "
                  >
                    <div class="caption">
                      <span>{{ i3.title2 }}</span>
                      <span
                        @click="visibleDetail(i3)"
                        v-if="
                          i2.title === '合规检查' ||
                          i3.title === '客户满意度（目标）：' ||
                          i3.title === '任务数量追踪：'
                        "
                        >{{
                          (showholdSystemScore &&
                            i3.title === "凌波创世使用（目标）：") ||
                          (showholdFlowScore &&
                            i3.title === "云舟使用（目标）：") ||
                          (showsurveyScore &&
                            i3.title === "客户满意度（目标）：") ||
                          (showTaskDetail && i3.title === "任务数量追踪：")
                            ? "关闭"
                            : "查看"
                        }}详情<i
                          v-if="
                            (showholdSystemScore &&
                              i3.title === '凌波创世使用（目标）：') ||
                            (showholdFlowScore &&
                              i3.title === '云舟使用（目标）：') ||
                            (showsurveyScore &&
                              i3.title === '客户满意度（目标）：') ||
                            (showTaskDetail && i3.title === '任务数量追踪：')
                          "
                          class="el-icon-arrow-up"
                        ></i
                        ><i v-else class="el-icon-arrow-down"></i>
                      </span>
                    </div>

                    <div class="value">
                      <div
                        class="quarter"
                        v-for="(i4, k4) in i3.children"
                        :key="k4"
                      >
                        <span :class="{ bold: i4.title === 'Total' }"
                          >{{ i4.title }}：</span
                        >
                        <div>
                          <div class="area">
                            <template v-if="i4.title !== 'Total'">
                              <!-- 季度目标  -->
                              <template v-if="i3.pattern !== 'split'">
                                <span v-if="i4.tgt">无TGT</span>
                                <span v-else-if="i3.pattern === 'taskNum'">
                                  <span
                                    v-if="
                                      !isCurrentYear ||
                                      +driDetail.currentQName > k4 + 1
                                    "
                                    >{{ driDetail[i4.goalValProp]
                                    }}{{ i3.unit }}</span
                                  ><span v-else>系统读取</span>
                                </span>
                                <span
                                  v-else-if="
                                    driDetail[i4.goalValProp] &&
                                    driDetail[i4.goalValProp] !== 0
                                  "
                                  >{{ i3.thousandSplit ? thousandSplit(driDetail[i4.goalValProp]) : driDetail[i4.goalValProp]
                                  }}{{ i3.unit }}</span
                                >
                                <span v-else>--</span>
                              </template>
                              <template v-else>
                                <span
                                  >{{
                                    driDetail[i4.goalValProp]
                                      ? driDetail[i4.goalValProp].split("|")
                                          .length
                                      : 0
                                  }}{{ i3.unit }}</span
                                > </template
                              ><span
                                v-if="
                                  (!isCurrentYear ||
                                    +driDetail.currentQName > k4 + 1) &&
                                  !i4.tgt &&
                                  i3.pattern !== 'other'
                                "
                                >/</span
                              ><span
                                class="reach"
                                v-if="
                                  !isCurrentYear ||
                                  +driDetail.currentQName > k4 + 1
                                "
                              >
                                <span v-if="!i4.tgt && i3.pattern !== 'other'">
                                  <span
                                    v-if="
                                      !driDetail[i4.reachValProp] &&
                                      driDetail[i4.reachValProp] !== 0
                                    "
                                    >--</span
                                  >
                                  <span v-else>
                                    <span v-if="i3.pattern !== 'split'">
                                      <span v-if="i3.pattern == 'halfSplit'">
                                        {{
                                          driDetail[i4.reachValProp]
                                            ? driDetail[i4.reachValProp].split(
                                                "|"
                                              ).length
                                            : 0
                                        }}{{ i3.unit }}
                                      </span>
                                      <span v-else>
                                        {{ i3.thousandSplit ? thousandSplit(driDetail[i4.reachValProp]) : driDetail[i4.reachValProp]
                                        }}{{ i3.unit }}</span
                                      ></span
                                    >

                                    <span v-else
                                      >{{
                                        driDetail[i4.reachValProp]
                                          ? driDetail[i4.reachValProp].split(
                                              "|"
                                            ).length
                                          : 0
                                      }}{{ i3.unit }}</span
                                    >
                                  </span>
                                </span>
                              </span>

                              <!-- <span v-else class="reach">
                                {{ driDetail[i4.reachValProp] }}
                              </span> -->

                              <!-- 图片 -->
                              <template
                                v-if="
                                  (i4.hasCustomerArr && !isCurrentYear) ||
                                  (+driDetail.currentQName > k4 + 1 &&
                                    customerArr[k4] &&
                                    customerArr[k4].length)
                                "
                              >
                                :<span
                                  class="customer-list"
                                  v-for="(customer, k) in customerArr[k4]"
                                  :key="k"
                                >
                                  <img
                                    v-if="customer.picture"
                                    :src="customer.picture"
                                    alt=""
                                  />
                                </span>
                              </template>
                              <!-- 图片 -->
                            </template>
                            <template
                              v-else-if="i4.reachValProp === 'accumulate'"
                            >
                              <template v-if="i4.goalValProp === 'accumulate'">
                                <template v-if="i3.pattern === 'split'">
                                  <span class="bold"
                                    >{{
                                      i3.children
                                        .slice(0, 4)
                                        .map((i) =>
                                          driDetail[i.goalValProp]
                                            ? +driDetail[i.goalValProp].split(
                                                "|"
                                              ).length
                                            : 0
                                        )
                                        .reduce(
                                          (curr, next) => curr + +next,
                                          0
                                        )
                                    }}{{ i3.unit
                                    }}<template
                                      v-if="
                                        !isCurrentYear ||
                                        +driDetail.currentQName > 1
                                      "
                                      >/</template
                                    ></span
                                  >
                                  <span
                                    v-if="
                                      !isCurrentYear ||
                                      +driDetail.currentQName > 1
                                    "
                                    class="bold reach"
                                    >{{
                                      i3.children
                                        .slice(0, (isCurrentYear ? Number(driDetail.currentQName) - 1 : 4))
                                        .map((i) =>
                                          driDetail[i.reachValProp]
                                            ? +driDetail[i.reachValProp].split(
                                                "|"
                                              ).length
                                            : 0
                                        )
                                        .reduce(
                                          (curr, next) => curr + +next,
                                          0
                                        )
                                    }}{{ i3.unit }}</span
                                  >
                                </template>
                                <template v-else-if="i3.pattern === 'taskNum'">
                                  <span class="bold">
                                    <span
                                      v-if="
                                        !isCurrentYear ||
                                        +driDetail.currentQName > 1
                                      "
                                    >
                                      {{
                                        i3.children
                                          .slice(0, (isCurrentYear ? Number(driDetail.currentQName) - 1 : 4))
                                          .map((i) => +driDetail[i.goalValProp])
                                          .reduce(
                                            (curr, next) => curr + +next,
                                            0
                                          )
                                      }}{{ i3.unit
                                      }}<template
                                        v-if="
                                          !isCurrentYear ||
                                          +driDetail.currentQName > 1
                                        "
                                        >/</template
                                      ></span
                                    >
                                    <span v-else>系统读取</span>
                                  </span>
                                  <span
                                    v-if="
                                      !isCurrentYear ||
                                      +driDetail.currentQName > 1
                                    "
                                    class="bold reach"
                                  >
                                    <span v-if="i3.pattern == 'halfSplit'">
                                      {{
                                        i3.children
                                          .slice(0, 4)
                                          .map((i) =>
                                            driDetail[i.reachValProp]
                                              ? +driDetail[
                                                  i.reachValProp
                                                ].split("|").length
                                              : 0
                                          )
                                          .reduce(
                                            (curr, next) => curr + +next,
                                            0
                                          )
                                      }}{{ i3.unit }}
                                    </span>
                                    <span v-else
                                      >{{
                                        i3.children
                                          .slice(0, (isCurrentYear ? Number(driDetail.currentQName) - 1 : 4))
                                          .map(
                                            (i) => +driDetail[i.reachValProp]
                                          )
                                          .reduce(
                                            (curr, next) => curr + +next,
                                            0
                                          )
                                      }}{{ i3.unit }}</span
                                    >
                                  </span>
                                </template>
                                <template v-else>
                                  <span class="bold">
                                    {{
                                      i3.thousandSplit ? (thousandSplit( i3.children
                                        .slice(0, 4)
                                        .map((i) => +driDetail[i.goalValProp])
                                        .reduce(
                                          (curr, next) => curr + +next,
                                          0
                                        ))) :  (i3.children
                                        .slice(0, 4)
                                        .map((i) => +driDetail[i.goalValProp])
                                        .reduce(
                                          (curr, next) => curr + +next,
                                          0
                                        ))
                                     
                                    }}{{ i3.unit
                                    }}<template
                                      v-if="
                                        !isCurrentYear ||
                                        +driDetail.currentQName > 1
                                      "
                                      >/</template
                                    >
                                  </span>
                                  <span
                                    v-if="
                                      !isCurrentYear ||
                                      +driDetail.currentQName > 1
                                    "
                                    class="bold reach"
                                  >
                                    <span v-if="i3.pattern == 'halfSplit'">
                                      {{
                                        i3.children
                                          .slice(0, 4)
                                          .map((i) =>
                                            driDetail[i.reachValProp]
                                              ? +driDetail[
                                                  i.reachValProp
                                                ].split("|").length
                                              : 0
                                          )
                                          .reduce(
                                            (curr, next) => curr + +next,
                                            0
                                          )
                                      }}{{ i3.unit }}
                                    </span>
                                    <span v-else
                                      >{{
                                        i3.thousandSplit ? thousandSplit(i3.children
                                          .slice(0, (isCurrentYear ? Number(driDetail.currentQName) - 1 : 4))
                                          .map(
                                            (i) => +driDetail[i.reachValProp]
                                          )
                                          .reduce(
                                            (curr, next) => curr + +next,
                                            0
                                          )) : (i3.children
                                          .slice(0, (isCurrentYear ? Number(driDetail.currentQName) - 1 : 4))
                                          .map(
                                            (i) => +driDetail[i.reachValProp]
                                          )
                                          .reduce(
                                            (curr, next) => curr + +next,
                                            0
                                          ))
                                        
                                      }}{{ i3.unit }}</span
                                    >
                                  </span>
                                </template>
                              </template>
                              <template v-else>
                                <span
                                  class="bold"
                                  v-if="
                                    isCurrentYear &&
                                    !(+driDetail.currentQName > 1)
                                  "
                                  >系统读取</span
                                >
                                <template v-else>
                                  <span class="bold reach"
                                    >{{
                                      i3.children
                                        .slice(0, 4)
                                        .map((i) =>
                                          driDetail[i.reachValProp]
                                            ? +driDetail[i.reachValProp].split(
                                                "|"
                                              ).length
                                            : 0
                                        )
                                        .reduce(
                                          (curr, next) => curr + +next,
                                          0
                                        )
                                    }}{{ i3.unit }}</span
                                  >
                                </template>
                              </template>
                            </template>
                            <template v-else>
                              <span class="bold"> -- </span>
                            </template>
                          </div>
                          <!-- 描述文字 -->
                          <div class="drisp">
                            <template v-if="i4.title !== 'Total'">
                              <template v-if="i3.pattern === 'split'">
                                <template v-if="driDetail[i4.goalValProp]">
                                  <span
                                    v-for="(item, index) in driDetail[
                                      i4.goalValProp
                                    ].split('|')"
                                    :key="index"
                                    >{{ item
                                    }}<template
                                      v-if="
                                        index !==
                                        driDetail[i4.goalValProp].split('|')
                                          .length -
                                          1
                                      "
                                      >;
                                    </template>
                                  </span>
                                </template>
                                <span
                                  v-if="
                                    !isCurrentYear ||
                                    +driDetail.currentQName > k4 + 1
                                  "
                                  >/</span
                                >

                                <template
                                  v-if="
                                    !isCurrentYear ||
                                    +driDetail.currentQName > k4 + 1
                                  "
                                >
                                  <template v-if="driDetail[i4.reachValProp]">
                                    <span
                                      class="reach"
                                      v-for="(item, index) in driDetail[
                                        i4.reachValProp
                                      ].split('|')"
                                      :key="index + 1"
                                      >{{ item
                                      }}<template
                                        v-if="
                                          index !==
                                          driDetail[i4.reachValProp].split('|')
                                            .length -
                                            1
                                        "
                                        >;
                                      </template>
                                    </span></template
                                  >
                                  <template v-else>
                                    <span class="reach">--</span>
                                  </template>
                                </template>
                              </template>
                              <template v-if="i3.pattern === 'finance'">
                                <template
                                  v-if="
                                    !isCurrentYear ||
                                    +driDetail.currentQName > k4 + 1
                                  "
                                >
                                  <template v-if="driDetail[i4.financeValProp]">
                                    <span class="reach"
                                      >ARP信息与实际信息金额比例为{{
                                        driDetail[i4.financeValProp]
                                      }}%</span
                                    >
                                  </template>
                                </template>
                              </template>
                              <template v-if="i3.pattern === 'halfSplit'">
                                <template
                                  v-if="
                                    !isCurrentYear ||
                                    +driDetail.currentQName > k4 + 1
                                  "
                                >
                                  <span
                                    class="reach"
                                    v-for="(i5, k5) in driDetail[
                                      i4.reachValProp
                                    ]
                                      ? driDetail[i4.reachValProp].split('|')
                                      : []"
                                    :key="k5"
                                    >{{ i5 }}<br
                                  /></span>
                                </template>
                              </template>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>

                    <HoldCheck
                      checkName="凌波创世使用"
                      :holdCheckList="holdCheckList"
                      v-if="
                        i3.title === '凌波创世使用（目标）：' &&
                        showholdSystemScore
                      "
                    />

                    <HoldFlow
                      checkName="云舟使用"
                      :holdCheckList="holdCheckList"
                      v-if="
                        i3.title === '云舟使用（目标）：' && showholdFlowScore
                      "
                    />

                    <DetailTabs
                      :currentQName="driDetail.currentQName"
                      :surveyScoreList="surveyScoreList"
                      v-if="
                        i3.title === '客户满意度（目标）：' && showsurveyScore
                      "
                    />

                    <TaskDetail
                      :taskDetailList="taskDetailList"
                      v-if="i3.title === '任务数量追踪：' && showTaskDetail"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- content - start -->

    <!-- btn__grounp - start -->
    <div class="btn-grounp">
      <div
        v-if="driDetail.btnAudit_visible === 'show'"
        class="dri__btn dri__btn--default"
        @click="showAuditModal = true"
      >
        审核不通过
      </div>
      <div
        v-if="driDetail.btnAudit_visible === 'show'"
        class="dri__btn dri__btn--primary"
        @click="auditDri(4)"
      >
        审核通过
      </div>
      <div
        v-if="driDetail.btnEdit_visible === 'show'"
        class="dri__btn dri__btn--primary"
        @click="
          $router.push({
            name: 'driCreate',
            query: { driUserId: driUserId, driObjectId: driDetail.id },
          })
        "
      >
        编辑修改DRI
      </div>

      <div
        class="dri__btn dri__btn--primary"
        v-if="driDetail.btnReach_visible === 'show'"
        @click="
          $router.push({ path: `/dri/createReach/${driDetail.id}/${curYear}` })
        "
      >
        填写达成情况
      </div>
      <div
        class="dri__btn dri__btn--disabled"
        v-else-if="driDetail.btnReach_visible === 'gray'"
      >
        填写达成情况
      </div>
    </div>
    <!-- btn__grounp - end -->

    <!-- audit__modal - start -->
    <el-dialog
      title="审核不通过"
      :visible.sync="showAuditModal"
      class="dri-modal"
    >
      <div class="dri-modal-content">
        <div class="label"><span>*</span>审核不通过原因</div>
        <el-input
          type="textarea"
          :rows="6"
          placeholder="填写具体原因"
          v-model="auditReason"
        >
        </el-input>
      </div>
      <div slot="footer">
        <el-button @click="closeAuditModal()">取 消</el-button>
        <el-button type="primary" @click="auditDri(3)">提 交</el-button>
      </div>
    </el-dialog>
    <!-- audit__modal - start -->
  </div>
</template>

<script type="text/jsx">
import "./Index.less";
import { Dri, CreateDri } from "@/API/api";
import Crumb from "@/components/Crumb";
import DetailTabs from "./DetailTabs";
import HoldCheck from "./HoldCheck";
import HoldFlow from "./HoldFlow";
import TaskDetail from "./TaskDetail";
import { Message } from "element-ui";
import { thousandSplit } from "../../util/util"

export default {
  name: "dri-detail",
  components: { Crumb, DetailTabs, HoldCheck, HoldFlow, TaskDetail },
  data() {
    return {
      crumb: ["成长计划", "DRI"],
      curYear: "",
      pickerOptions: {
        disabledDate(time) {
          return true;
        },
      },
      showAuditModal: false,
      auditReason: "",
      showholdSystemScore: false,
      showholdFlowScore: false,
      showsurveyScore: false,
      showTaskDetail: false,
      teamId: "",
      introList: [
        [
          {
            label: "DRI的ID:",
            prop: "driCode",
          },
          {
            label: "直属领导( N+1):",
            prop: "auditorNameEn",
          },
          {
            label: "子公司负责人:",
            prop: "sonCompanyUserNameEn",
          },
        ],
        [
          {
            label: "创建时间:",
            prop: "createTime",
          },
          {
            label: "副队长(Chief Mate):",
            prop: "teamChiefMateUserNameEn",
          },
          {
            label: "公司总经理: ",
            prop: "managerUserNameEn",
          },
        ],
        [
          {
            label: "审核状态:",
            prop: "auditorStatusName",
          },
          {
            label: "队长(Capital):",
            prop: "teamCaptainUserNameEn",
          },
          {
            label: "人力发展辅导员:",
            prop: "HrUserNameEn",
          },
        ],
        [
          {
            label: "审核人:",
            prop: "auditorNameEn",
          },
          {
            label: "事业群负责人:",
            prop: "teamGroupUserNameEn",
          },
          {
            label: "财务管理辅导员:",
            prop: "financeUserNameEn",
          },
        ],
      ],
      careerList: [
        {
          label: "组织定位",
          prop: "orgLoc",
        },
        {
          label: "子公司定位",
          prop: "sonCompanyLoc",
        },
        {
          label: "事业群定位",
          prop: "groupLoc",
        },
        {
          label: "事业部定位",
          prop: "teamLoc",
        },
        {
          label: "事业部未来三年发展目标",
          children: [
            {
              prop: "team3y1Obj",
            },
            {
              prop: "team3y2Obj",
            },
            {
              prop: "team3y3Obj",
            },
          ],
        },
        {
          label: "产品规划",
          prop: "productPlan",
        },
        {
          label: "客户规划",
          prop: "customerPlan",
        },
        {
          label: "个人定位",
          prop: "personPlan",
        },
        {
          label: "个人计划",
          prop: "personLoc",
        },
        {
          label: "个人三年发展目标",
          children: [
            {
              prop: "person3y1Obj",
            },
            {
              prop: "person3y2Obj",
            },
            {
              prop: "person3y3Obj",
            },
          ],
        },
        {
          label: "其他",
          prop: "personOther",
        },
      ],
      goalReachList: [
        {
          title: "业务成长",
          titleEN: "BUSINESS GROWTH",
          intro:
            "业务成长是我们是否可以生存发展的红线，是事业成长的基础，也是事业成长最重要评估指标",
          children: [
            {
              title: "业务增长",
              tips: [],
              children: [
                {
                  title2: "营收（目标/达成）：",
                  title: "营收（目标）：",
                  unit: "",
                  detail: [],
                  thousandSplit: true,
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "incomeQ1a",
                      reachValProp: "incomeQ1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "incomeQ2a",
                      reachValProp: "incomeQ2b",
                    },
                    {
                      title: "Q3",
                      goalValProp: "incomeQ3a",
                      reachValProp: "incomeQ3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "incomeQ4a",
                      reachValProp: "incomeQ4b",
                    },
                    {
                      title: "Total",
                      goalValProp: "accumulate",
                      reachValProp: "accumulate",
                    },
                  ],
                },
                {
                  title2: "净利润 (目标/达成) ：",
                  title: "净利润 (目标) ：",
                  unit: "",
                  detail: [],
                  thousandSplit: true,
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "profitQ1a",
                      reachValProp: "profitQ1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "profitQ2a",
                      reachValProp: "profitQ2b",
                    },
                    {
                      title: "Q3",
                      goalValProp: "profitQ3a",
                      reachValProp: "profitQ3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "profitQ4a",
                      reachValProp: "profitQ4b",
                    },
                    {
                      title: "Total",
                      goalValProp: "accumulate",
                      reachValProp: "accumulate",
                    },
                  ],
                },
              ],
            },
            {
              title: "业务情况",
              tips: [],
              children: [
                // {
                //   title2: "服务客户数 (目标/达成）：",
                //   title: "服务客户数 (目标）：",
                //   unit: "个",
                //   detail: [],
                //   children: [
                //     {
                //       title: "Q1",
                //       goalValProp: "customerNumQ1a",
                //       reachValProp: "customerNumQ1b",
                //       hasCustomerArr: true,
                //     },
                //     {
                //       title: "Q2",
                //       goalValProp: "customerNumQ2a",
                //       reachValProp: "customerNumQ2b",
                //       hasCustomerArr: true,
                //     },
                //     {
                //       title: "Q3",
                //       goalValProp: "customerNumQ3a",
                //       reachValProp: "customerNumQ3b",
                //       hasCustomerArr: true,
                //     },
                //     {
                //       title: "Q4",
                //       goalValProp: "customerNumQ4a",
                //       reachValProp: "customerNumQ4b",
                //       hasCustomerArr: true,
                //     },
                //     {
                //       title: "Total",
                //       goalValProp: "accumulate",
                //       reachValProp: "accumulate",
                //     },
                //   ],
                // },
                // {
                //   title2: "项目准时率（目标/达成）：",
                //   title: "项目准时率（目标）：",
                //   unit: "%",
                //   detail: [],
                //   children: [
                //     {
                //       title: "Q1",
                //       goalValProp: "projectPunctualityQ1a",
                //       reachValProp: "projectPunctualityQ1b",
                //     },
                //     {
                //       title: "Q2",
                //       goalValProp: "projectPunctualityQ2a",
                //       reachValProp: "projectPunctualityQ2b",
                //     },
                //     {
                //       title: "Q3",
                //       goalValProp: "projectPunctualityQ3a",
                //       reachValProp: "projectPunctualityQ3b",
                //     },
                //     {
                //       title: "Q4",
                //       goalValProp: "projectPunctualityQ4a",
                //       reachValProp: "projectPunctualityQ4b",
                //     },
                //     {
                //       title: "Total",
                //       goalValProp: "",
                //       reachValProp: "",
                //     },
                //   ],
                // },
                {
                  title2: "任务数量追踪 （提交/达成）：",
                  title: "任务数量追踪：",
                  unit: "个",
                  detail: [],
                  pattern: "taskNum",
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "taskNum1a",
                      reachValProp: "taskNum1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "taskNum2a",
                      reachValProp: "taskNum2b",
                    },
                    {
                      title: "Q3",
                      goalValProp: "taskNum3a",
                      reachValProp: "taskNum3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "taskNum4a",
                      reachValProp: "taskNum4b",
                    },
                    {
                      title: "Total",
                      reachValProp: "accumulate",
                      goalValProp: "accumulate",
                    },
                  ],
                },
              ],
            },
            {
              title: "合规检查",
              tips: [
                "系统使用合规：指事业部内所有人员按公司要求使用公司系统的情况：记录详实，内容清晰 - 100分；关键流程/任务完整，但文档记录缺漏- 60分；",
                "流程制度使用合规：指按PM book将所有内容存入公盘，项目结束后检查：完全符合要求 - 100分；缺少项目物料文件 - 60分；缺少关键文件或完全没有完成 - 0分；",
              ],
              children: [
                {
                  title2: "凌波创世使用（目标/达成）：",
                  title: "凌波创世使用（目标）：",
                  unit: "分",
                  detail: [],
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "holdSystemScoreQ1a",
                      reachValProp: "holdSystemScoreQ1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "holdSystemScoreQ2a",
                      reachValProp: "holdSystemScoreQ2b",
                    },
                    {
                      title: "Q3",
                      goalValProp: "holdSystemScoreQ3a",
                      reachValProp: "holdSystemScoreQ3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "holdSystemScoreQ4a",
                      reachValProp: "holdSystemScoreQ4b",
                    },
                    {
                      title: "Total",
                      goalValProp: "",
                      reachValProp: "",
                    },
                  ],
                },
                {
                  title2: "云舟使用（目标/达成）：",
                  title: "云舟使用（目标）：",
                  unit: "分",
                  detail: [],
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "holdFlowScoreQ1a",
                      reachValProp: "holdFlowScoreQ1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "holdFlowScoreQ2a",
                      reachValProp: "holdFlowScoreQ2b",
                    },
                    {
                      title: "Q3",
                      goalValProp: "holdFlowScoreQ3a",
                      reachValProp: "holdFlowScoreQ3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "holdFlowScoreQ4a",
                      reachValProp: "holdFlowScoreQ4b",
                    },
                    {
                      title: "Total",
                      goalValProp: "",
                      reachValProp: "",
                    },
                  ],
                },
              ],
            },
            {
              title: "财务考核",
              tips: [
                "回款率：指客户按期回款金额占总回款金额的比例，按比例折算评分；",
                "AR/AP金额差值：指填写的AR/AP信息与实际信息金额差值（适用于PO高于100W的项目）大于50W-0分， 小于50W大于10W-60分，低于10W-100分；",
                "AR/AP金额比例：指填写的AR/AP信息与实际信息金额比例（适用于PO低于100W的项目）大于20%-0分，介于10%-20%中间-60分，小于10%-100分；",
              ],
              children: [
                {
                  title2: "回款率（目标/达成）：",
                  title: "回款率（目标）：",
                  unit: "分",
                  detail: [],
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "incomeRateQ1a",
                      reachValProp: "incomeRateQ1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "incomeRateQ2a",
                      reachValProp: "incomeRateQ2b",
                    },
                    {
                      title: "Q3",
                      goalValProp: "incomeRateQ3a",
                      reachValProp: "incomeRateQ3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "incomeRateQ4a",
                      reachValProp: "incomeRateQ4b",
                    },
                    {
                      title: "Total",
                      goalValProp: "",
                      reachValProp: "",
                    },
                  ],
                },
                {
                  title2: "AR金额差值（目标/达成）：",
                  title: "AR金额差值（目标）：",
                  unit: "分",
                  detail: [],
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "ArMoveQ1a",
                      reachValProp: "ArMoveQ1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "ArMoveQ2a",
                      reachValProp: "ArMoveQ2b",
                    },
                    {
                      title: "Q3",
                      goalValProp: "ArMoveQ3a",
                      reachValProp: "ArMoveQ3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "ArMoveQ4a",
                      reachValProp: "ArMoveQ4b",
                    },
                    {
                      title: "Total",
                      goalValProp: "",
                      reachValProp: "",
                    },
                  ],
                },
                {
                  title2: "AR金额比例（目标/达成）：",
                  title: "AR金额比例（目标）：",
                  unit: "分",
                  detail: [],
                  pattern: "finance",
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "ArPercentQ1a",
                      reachValProp: "ArPercentQ1b",
                      financeValProp: "ArPercentQ1Score",
                    },
                    {
                      title: "Q2",
                      goalValProp: "ArPercentQ2a",
                      reachValProp: "ArPercentQ2b",
                      financeValProp: "ArPercentQ2Score",
                    },
                    {
                      title: "Q3",
                      goalValProp: "ArPercentQ3a",
                      reachValProp: "ArPercentQ3b",
                      financeValProp: "ArPercentQ3Score",
                    },
                    {
                      title: "Q4",
                      goalValProp: "ArPercentQ4a",
                      reachValProp: "ArPercentQ4b",
                      financeValProp: "ArPercentQ4Score",
                    },
                    {
                      title: "Total",
                      goalValProp: "",
                      reachValProp: "",
                    },
                  ],
                },
                {
                  title2: "AP金额差值（目标/达成）：",
                  title: "AP金额差值（目标）：",
                  unit: "分",
                  detail: [],
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "ApMoveQ1a",
                      reachValProp: "ApMoveQ1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "ApMoveQ2a",
                      reachValProp: "ApMoveQ2b",
                    },
                    {
                      title: "Q3",
                      goalValProp: "ApMoveQ3a",
                      reachValProp: "ApMoveQ3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "ApMoveQ4a",
                      reachValProp: "ApMoveQ4b",
                    },
                    {
                      title: "Total",
                      goalValProp: "",
                      reachValProp: "",
                    },
                  ],
                },
                {
                  title2: "AP金额比例（目标/达成）：",
                  title: "AP金额比例（目标）：",
                  unit: "分",
                  detail: [],
                  pattern: "finance",
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "ApPercentQ1a",
                      reachValProp: "ApPercentQ1b",
                      financeValProp: "ApPercentQ1Score",
                    },
                    {
                      title: "Q2",
                      goalValProp: "ApPercentQ2a",
                      reachValProp: "ApPercentQ2b",
                      financeValProp: "ApPercentQ2Score",
                    },
                    {
                      title: "Q3",
                      goalValProp: "ApPercentQ3a",
                      reachValProp: "ApPercentQ3b",
                      financeValProp: "ApPercentQ3Score",
                    },
                    {
                      title: "Q4",
                      goalValProp: "ApPercentQ4a",
                      reachValProp: "ApPercentQ4b",
                      financeValProp: "ApPercentQ4Score",
                    },
                    {
                      title: "Total",
                      goalValProp: "",
                      reachValProp: "",
                    },
                  ],
                },
              ],
            },
            {
              title: "与客户共赢",
              tips: [
                "客户满意度：包含项目执行、方案策划、创意服务、技术开发服务、效果满意度五方面的综合得分，分值1-5分；",
              ],
              children: [
                {
                  title2: "客户满意度（目标/达成）：",
                  title: "客户满意度（目标）：",
                  unit: "分",
                  detail: [],
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "surveyScoreQ1a",
                      reachValProp: "surveyScoreQ1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "surveyScoreQ2a",
                      reachValProp: "surveyScoreQ2b",
                    },
                    {
                      title: "Q3",
                      goalValProp: "surveyScoreQ3a",
                      reachValProp: "surveyScoreQ3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "surveyScoreQ4a",
                      reachValProp: "surveyScoreQ4b",
                    },
                    {
                      title: "Total",
                      goalValProp: "",
                      reachValProp: "",
                    },
                  ],
                },
                {
                  title2: "报奖计划（目标/达成）：",
                  title: "报奖计划（目标）：",
                  unit: "个",
                  detail: [],
                  pattern: "split",
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "gainPrizeQ1a",
                      reachValProp: "gainPrizeQ1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "gainPrizeQ2a",
                      reachValProp: "gainPrizeQ2b",
                    },
                    {
                      title: "Q3",
                      goalValProp: "gainPrizeQ3a",
                      reachValProp: "gainPrizeQ3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "gainPrizeQ4a",
                      reachValProp: "gainPrizeQ4b",
                    },
                    {
                      title: "Total",
                      goalValProp: "accumulate",
                      reachValProp: "accumulate",
                    },
                  ],
                },
                {
                  title2: "无重大事故（目标/达成）：",
                  title: "无重大事故（目标）：",
                  unit: "",
                  detail: [],
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "BigBugScoreQ1a",
                      reachValProp: "BigBugScoreQ1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "BigBugScoreQ2a",
                      reachValProp: "BigBugScoreQ2b",
                    },
                    {
                      title: "Q3",
                      goalValProp: "BigBugScoreQ3a",
                      reachValProp: "BigBugScoreQ3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "BigBugScoreQ4a",
                      reachValProp: "BigBugScoreQ4b",
                    },
                    {
                      title: "Total",
                      goalValProp: "",
                      reachValProp: "",
                    },
                  ],
                },
              ],
            },
            {
              title: "其他",
              tips: [],
              children: [
                {
                  title2: "其他：",
                  title: "其他：",
                  unit: "",
                  detail: [],
                  pattern: "other",
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "workOtherQ1a",
                      reachValProp: "workOtherQ1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "workOtherQ2a",
                      reachValProp: "workOtherQ2b",
                    },
                    {
                      title: "Q3",
                      goalValProp: "workOtherQ3a",
                      reachValProp: "workOtherQ3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "workOtherQ4a",
                      reachValProp: "workOtherQ4b",
                    },
                    {
                      title: "Total",
                      goalValProp: "",
                      reachValProp: "",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "人才成长",
          titleEN: "CHEER GROWTH",
          intro:
            "人才发展是我们组织的终极目的，因此个人成长是我们组织成长的最重要目标！<br>业务成长是事业成长的基础，而个人成长是业务成长的基础，因此每一个硬核少年的进步是组织对每一个少年负责的具体表现。",
          children: [
            {
              title: "个人成长",
              tips: [],

              children: [
                {
                  title2: "TGT规划（目标/达成）：",
                  title: "TGT规划（目标）：",
                  unit: "",
                  detail: [],
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "tgtQ1a",
                      reachValProp: "tgtQ1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "tgtQ2a",
                      reachValProp: "tgtQ2b",
                      tgt: true,
                    },
                    {
                      title: "Q3",
                      goalValProp: "tgtQ3a",
                      reachValProp: "tgtQ3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "tgtQ4a",
                      reachValProp: "tgtQ4b",
                      tgt: true,
                    },
                    {
                      title: "Total",
                      goalValProp: "",
                      reachValProp: "",
                    },
                  ],
                },
                // {
                //   title2: "收入提升（目标/达成）：",
                //   title: "收入提升（目标）：",
                //   unit: "元",
                //   detail: [],
                //   thousandSplit: true,
                //   children: [
                //     {
                //       title: "Q1",
                //       goalValProp: "salaryQ1a",
                //       reachValProp: "salaryQ1b",
                //     },
                //     {
                //       title: "Q2",
                //       goalValProp: "salaryQ2a",
                //       reachValProp: "salaryQ2b",
                //       tgt: true,
                //     },
                //     {
                //       title: "Q3",
                //       goalValProp: "salaryQ3a",
                //       reachValProp: "salaryQ3b",
                //     },
                //     {
                //       title: "Q4",
                //       goalValProp: "salaryQ4a",
                //       reachValProp: "salaryQ4b",
                //       tgt: true,
                //     },
                //     {
                //       title: "Total",
                //       goalValProp: "accumulate",
                //       reachValProp: "accumulate",
                //     },
                //   ],
                // },
                {
                  title2: "硬核技能提升-硬核技能（目标/达成）：",
                  title: "硬核技能提升-硬核技能（目标）：",
                  unit: "个",
                  detail: [],
                  pattern: "split",
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "skillQ1a",
                      reachValProp: "skillQ1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "skillQ2a",
                      reachValProp: "skillQ2b",
                    },
                    {
                      title: "Q3",
                      goalValProp: "skillQ3a",
                      reachValProp: "skillQ3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "skillQ4a",
                      reachValProp: "skillQ4b",
                    },
                    {
                      title: "Total",
                      goalValProp: "accumulate",
                      reachValProp: "accumulate",
                    },
                  ],
                },
                {
                  title2: "经验提炼与总结-经验文档（目标/达成）：",
                  title: "经验提炼与总结-经验文档（目标）：",
                  unit: "个",
                  detail: [],
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "expQ1a",
                      reachValProp: "expQ1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "expQ2a",
                      reachValProp: "expQ2b",
                    },
                    {
                      title: "Q3",
                      goalValProp: "expQ3a",
                      reachValProp: "expQ3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "expQ4a",
                      reachValProp: "expQ4b",
                    },
                    {
                      title: "Total",
                      goalValProp: "accumulate",
                      reachValProp: "accumulate",
                    },
                  ],
                },
                {
                  title2: "专业知识与方法论进阶-课程研发（目标/达成）：",
                  title: "专业知识与方法论进阶-课程研发（目标）：",
                  unit: "个",
                  detail: [],
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "courseQ1a",
                      reachValProp: "courseQ1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "courseQ2a",
                      reachValProp: "courseQ2b",
                    },
                    {
                      title: "Q3",
                      goalValProp: "courseQ3a",
                      reachValProp: "courseQ3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "courseQ4a",
                      reachValProp: "courseQ4b",
                    },
                    {
                      title: "Total",
                      goalValProp: "accumulate",
                      reachValProp: "accumulate",
                    },
                  ],
                },
                {
                  title2: "专业技能证书获取-技能证书（目标/达成）：",
                  title: "专业技能证书获取-技能证书（目标）：",
                  unit: "个",
                  detail: [],
                  pattern: "split",
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "certQ1a",
                      reachValProp: "certQ1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "certQ2a",
                      reachValProp: "certQ2b",
                    },
                    {
                      title: "Q3",
                      goalValProp: "certQ3a",
                      reachValProp: "certQ3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "certQ4a",
                      reachValProp: "certQ4b",
                    },
                    {
                      title: "Total",
                      goalValProp: "accumulate",
                      reachValProp: "accumulate",
                    },
                  ],
                },
                {
                  title2: "做有数字化发展意识的人才-凌波创识（大宝剑）使用反馈意见（目标/达成）：",
                  title: "做有数字化发展意识的人才-凌波创识（大宝剑）使用反馈意见（目标）：",
                  unit: "个",
                  detail: [],
                  pattern: "halfSplit",
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "sopQ1a",
                      reachValProp: "sopQ1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "sopQ2a",
                      reachValProp: "sopQ2b",
                    },
                    {
                      title: "Q3",
                      goalValProp: "sopQ3a",
                      reachValProp: "sopQ3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "sopQ4a",
                      reachValProp: "sopQ4b",
                    },
                    {
                      title: "Total",
                      goalValProp: "accumulate",
                      reachValProp: "accumulate",
                    },
                  ],
                },
                {
                  title2: "其他：",
                  title: "其他：",
                  unit: "",
                  detail: [],
                  pattern: "other",
                  children: [
                    {
                      title: "Q1",
                      goalValProp: "digitalQ1a",
                      reachValProp: "digitalQ1b",
                    },
                    {
                      title: "Q2",
                      goalValProp: "digitalQ2a",
                      reachValProp: "digitalQ2b",
                    },
                    {
                      title: "Q3",
                      goalValProp: "digitalQ3a",
                      reachValProp: "digitalQ3b",
                    },
                    {
                      title: "Q4",
                      goalValProp: "digitalQ4a",
                      reachValProp: "digitalQ4b",
                    },
                    {
                      title: "Total",
                      goalValProp: "",
                      reachValProp: "",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      driDetail: {},
      customerArr: [],
      surveyScoreList: new Array(4),
      holdCheckList: new Array(4),
      taskDetailList: new Array(4),
      isCurrentYear: true,
      iss: true,
    };
  },
  computed: {
    driUserId() {
      return this.$route.params.driUserId;
    },
  },
  methods: {
    thousandSplit(v) {
      let m = parseFloat(v)
      return isNaN(m) ? '' : thousandSplit(m + '');
    },
    visibleDetail(item) {
      switch (item.title) {
        case "客户满意度（目标）：":
          this.showsurveyScore = !this.showsurveyScore;
          break;
        case "任务数量追踪：":
          this.showTaskDetail = !this.showTaskDetail;
          break;
        case "凌波创世使用（目标）：":
          this.showholdSystemScore = !this.showholdSystemScore;
          break;
        case "云舟使用（目标）：":
          this.showholdFlowScore = !this.showholdFlowScore;
          break;
        default:
          break;
      }
    },
    /* dri详情 */
    getDriDetail() {
      return this.$http.post(
        Dri.driobjectgetuser,
        this.qs.stringify({
          yearName: this.curYear,
          driUserId: this.driUserId,
        }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    /* 业务情况达成情况 */
    getBussinessScore(qName) {
      return this.$http.post(
        Dri.dashboarduserexecmonthtasknumber,
        this.qs.stringify({
          yearName: this.curYear,
          qName,
          userId: this.driUserId,
        }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    /* 三大组织打分 */
    getTeamThreeScore() {
      return this.$http.post(
        Dri.drigetmyteamthreejobscore,
        this.qs.stringify({
          yearName: this.curYear,
          qName: "",
          teamId: this.teamId,
          dateType: "",
        }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    /* 问卷调查分数 */
    getSurveyscorelistproject(qName) {
      return this.$http.post(
        Dri.surveyscorelistproject,
        this.qs.stringify({
          yearName: this.curYear,
          qName,
          teamId: this.teamId,
        }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    /* 某个项目的问卷调查分数 */
    getsurveyscorebyproject(projectId) {
      return this.$http.post(
        Dri.surveyscorebyproject,
        this.qs.stringify({
          projectId,
        }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    closeAuditModal() {
      this.showAuditModal = false;
      this.auditReason = "";
    },
    /* 审核DRI */
    auditDri(auditorStatus) {
      if (auditorStatus === 3) {
        if (!this.auditReason) {
          Message.warning({
            message: "请输入具体原因",
            type: "warning",
          });
          return;
        }
      }
      this.$http
        .post(
          Dri.driobjectreview,
          this.qs.stringify({
            driObjectId: this.driDetail.id,
            auditorStatus,
            auditorReason: this.auditReason,
          }),
          {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") },
          }
        )
        .then((res) => {
          if (res.data.retCode === 0) {
            Message.success({
              message: "提交成功",
              type: "success",
            });
            this.closeAuditModal();
            this.$router.push({
              name: "driIndex",
            });
          } else {
            Message.error({
              message: res.data.retMsg,
              type: "error",
            });
          }
        });
    },
    async changeYear() {
      const res = await this.getDriDetail();
      this.driDetail = res.data.retData.objectInfo;
      this.isCurrentYear =
        this.driDetail.currentYearName == this.driDetail.yearName;
      this.loadInfo();
    },
    getDriList() {
      return this.$http.post(
        Dri.driobjectlist,
        this.qs.stringify({
          driUserId: this.driUserId,
          page: 1,
          pageSize: 9999,
        }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    // 获取用户信息
    getUserInfo() {
      return this.$http.post(
        Dri.userInfo,
        this.qs.stringify({ id: this.driUserId }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
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
            if (id === 1) {
              (this.driDetail.orgLoc = retData.objectInfo.orgLoc),
                (this.driDetail.sonCompanyLoc =
                  retData.objectInfo.sonCompanyLoc),
                (this.driDetail.groupLoc = retData.objectInfo.groupLoc);
            } else {
              (this.driDetail.teamLoc = retData.objectInfo.teamLoc),
                (this.driDetail.team3y1Obj = retData.objectInfo.team3y1Obj),
                (this.driDetail.team3y2Obj = retData.objectInfo.team3y2Obj),
                (this.driDetail.team3y3Obj = retData.objectInfo.team3y3Obj),
                (this.driDetail.productPlan = retData.objectInfo.productPlan),
                (this.driDetail.gainPrizeQ1a = retData.objectInfo.gainPrizeQ1a
                  ? retData.objectInfo.gainPrizeQ1a
                  : null),
                (this.driDetail.gainPrizeQ2a = retData.objectInfo.gainPrizeQ2a
                  ? retData.objectInfo.gainPrizeQ2a
                  : null),
                (this.driDetail.gainPrizeQ3a = retData.objectInfo.gainPrizeQ3a
                  ? retData.objectInfo.gainPrizeQ3a
                  : null),
                (this.driDetail.gainPrizeQ4a = retData.objectInfo.gainPrizeQ4a
                  ? retData.objectInfo.gainPrizeQ4a
                  : null),
                (this.driDetail.gainPrizeQ1b = retData.objectInfo.gainPrizeQ1b
                  ? retData.objectInfo.gainPrizeQ1b
                  : null),
                (this.driDetail.gainPrizeQ2b = retData.objectInfo.gainPrizeQ2b
                  ? retData.objectInfo.gainPrizeQ2b
                  : null),
                (this.driDetail.gainPrizeQ3b = retData.objectInfo.gainPrizeQ3b
                  ? retData.objectInfo.gainPrizeQ3b
                  : null),
                (this.driDetail.gainPrizeQ4b = retData.objectInfo.gainPrizeQ4b
                  ? retData.objectInfo.gainPrizeQ4b
                  : null),
                (this.driDetail.customerPlan = retData.objectInfo.customerPlan);
                 /* 合规检查 */
                (this.driDetail.holdSystemScoreQ1a = retData.objectInfo.holdSystemScoreQ1a ? retData.objectInfo.holdSystemScoreQ1a : null),
                (this.driDetail.holdSystemScoreQ2a = retData.objectInfo.holdSystemScoreQ2a  ? retData.objectInfo.holdSystemScoreQ2a : null),
                (this.driDetail.holdSystemScoreQ3a = retData.objectInfo.holdSystemScoreQ3a  ? retData.objectInfo.holdSystemScoreQ3a : null),
                (this.driDetail.holdSystemScoreQ4a = retData.objectInfo.holdSystemScoreQ4a  ? retData.objectInfo.holdSystemScoreQ4a : null),
                // (this.driDetail.holdSystemScoreQ1b = retData.objectInfo.holdSystemScoreQ1b  ? retData.objectInfo.holdSystemScoreQ1b : null),
                // (this.driDetail.holdSystemScoreQ2b = retData.objectInfo.holdSystemScoreQ2b  ? retData.objectInfo.holdSystemScoreQ2b : null),
                // (this.driDetail.holdSystemScoreQ3b = retData.objectInfo.holdSystemScoreQ3b  ? retData.objectInfo.holdSystemScoreQ3b : null),
                // (this.driDetail.holdSystemScoreQ4b = retData.objectInfo.holdSystemScoreQ4b  ? retData.objectInfo.holdSystemScoreQ4b : null),
                (this.driDetail.holdFlowScoreQ1a = retData.objectInfo.holdFlowScoreQ1a ? retData.objectInfo.holdFlowScoreQ1a : null),
                (this.driDetail.holdFlowScoreQ2a = retData.objectInfo.holdFlowScoreQ2a ? retData.objectInfo.holdFlowScoreQ2a : null),
                (this.driDetail.holdFlowScoreQ3a = retData.objectInfo.holdFlowScoreQ3a ? retData.objectInfo.holdFlowScoreQ3a : null),
                (this.driDetail.holdFlowScoreQ4a = retData.objectInfo.holdFlowScoreQ4a ? retData.objectInfo.holdFlowScoreQ4a : null),
                // (this.driDetail.holdFlowScoreQ1b = retData.objectInfo.holdFlowScoreQ1b ? retData.objectInfo.holdFlowScoreQ1b : null),
                // (this.driDetail.holdFlowScoreQ2b = retData.objectInfo.holdFlowScoreQ2b ? retData.objectInfo.holdFlowScoreQ2b : null),
                // (this.driDetail.holdFlowScoreQ3b = retData.objectInfo.holdFlowScoreQ3b ? retData.objectInfo.holdFlowScoreQ3b : null),
                // (this.driDetail.holdFlowScoreQ4b = retData.objectInfo.holdFlowScoreQ4b ? retData.objectInfo.holdFlowScoreQ4b : null),
                /* 财务考核 */
                (this.driDetail.incomeRateQ1a = retData.objectInfo.incomeRateQ1a ? retData.objectInfo.incomeRateQ1a : null),
                (this.driDetail.incomeRateQ2a = retData.objectInfo.incomeRateQ2a ? retData.objectInfo.incomeRateQ2a : null),
                (this.driDetail.incomeRateQ3a = retData.objectInfo.incomeRateQ3a ? retData.objectInfo.incomeRateQ3a : null),
                (this.driDetail.incomeRateQ4a = retData.objectInfo.incomeRateQ4a ? retData.objectInfo.incomeRateQ4a : null),
                // (this.driDetail.incomeRateQ1b = retData.objectInfo.incomeRateQ1b ? retData.objectInfo.incomeRateQ1b : null),
                // (this.driDetail.incomeRateQ2b = retData.objectInfo.incomeRateQ2b ? retData.objectInfo.incomeRateQ2b : null),
                // (this.driDetail.incomeRateQ3b = retData.objectInfo.incomeRateQ3b ? retData.objectInfo.incomeRateQ3b : null),
                // (this.driDetail.incomeRateQ4b = retData.objectInfo.incomeRateQ4b ? retData.objectInfo.incomeRateQ4b : null),
                (this.driDetail.ArMoveQ1a = retData.objectInfo.ArMoveQ1a ? retData.objectInfo.ArMoveQ1a : null),
                (this.driDetail.ArMoveQ2a = retData.objectInfo.ArMoveQ2a ? retData.objectInfo.ArMoveQ2a : null),
                (this.driDetail.ArMoveQ3a = retData.objectInfo.ArMoveQ3a ? retData.objectInfo.ArMoveQ3a : null),
                (this.driDetail.ArMoveQ4a = retData.objectInfo.ArMoveQ4a ? retData.objectInfo.ArMoveQ4a : null),
                // (this.driDetail.ArMoveQ1b = retData.objectInfo.ArMoveQ1b ? retData.objectInfo.ArMoveQ1b : null),
                // (this.driDetail.ArMoveQ2b = retData.objectInfo.ArMoveQ2b ? retData.objectInfo.ArMoveQ2b : null),
                // (this.driDetail.ArMoveQ3b = retData.objectInfo.ArMoveQ3b ? retData.objectInfo.ArMoveQ3b : null),
                // (this.driDetail.ArMoveQ4b = retData.objectInfo.ArMoveQ4b ? retData.objectInfo.ArMoveQ4b : null),
                (this.driDetail.ArPercentQ1a = retData.objectInfo.ArPercentQ1a ? retData.objectInfo.ArPercentQ1a : null),
                (this.driDetail.ArPercentQ2a = retData.objectInfo.ArPercentQ2a ? retData.objectInfo.ArPercentQ2a : null),
                (this.driDetail.ArPercentQ3a = retData.objectInfo.ArPercentQ3a ? retData.objectInfo.ArPercentQ3a : null),
                (this.driDetail.ArPercentQ4a = retData.objectInfo.ArPercentQ4a ? retData.objectInfo.ArPercentQ4a : null),
                // (this.driDetail.ArPercentQ1b = retData.objectInfo.ArPercentQ1b ? retData.objectInfo.ArPercentQ1b : null),
                // (this.driDetail.ArPercentQ2b = retData.objectInfo.ArPercentQ2b ? retData.objectInfo.ArPercentQ2b : null),
                // (this.driDetail.ArPercentQ3b = retData.objectInfo.ArPercentQ3b ? retData.objectInfo.ArPercentQ3b : null),
                // (this.driDetail.ArPercentQ4b = retData.objectInfo.ArPercentQ4b ? retData.objectInfo.ArPercentQ4b : null),
                (this.driDetail.ApMoveQ1a = retData.objectInfo.ApMoveQ1a ? retData.objectInfo.ApMoveQ1a : null),
                (this.driDetail.ApMoveQ2a = retData.objectInfo.ApMoveQ2a ? retData.objectInfo.ApMoveQ2a : null),
                (this.driDetail.ApMoveQ3a = retData.objectInfo.ApMoveQ3a ? retData.objectInfo.ApMoveQ3a : null),
                (this.driDetail.ApMoveQ4a = retData.objectInfo.ApMoveQ4a ? retData.objectInfo.ApMoveQ4a : null),
                // (this.driDetail.ApMoveQ1b = retData.objectInfo.ApMoveQ1b ? retData.objectInfo.ApMoveQ1b : null),
                // (this.driDetail.ApMoveQ2b = retData.objectInfo.ApMoveQ2b ? retData.objectInfo.ApMoveQ2b : null),
                // (this.driDetail.ApMoveQ3b = retData.objectInfo.ApMoveQ3b ? retData.objectInfo.ApMoveQ3b : null),
                // (this.driDetail.ApMoveQ4b = retData.objectInfo.ApMoveQ4b ? retData.objectInfo.ApMoveQ4b : null),
                (this.driDetail.ApPercentQ1a = retData.objectInfo.ApPercentQ1a ? retData.objectInfo.ApPercentQ1a : null),
                (this.driDetail.ApPercentQ2a = retData.objectInfo.ApPercentQ2a ? retData.objectInfo.ApPercentQ2a : null),
                (this.driDetail.ApPercentQ3a = retData.objectInfo.ApPercentQ3a ? retData.objectInfo.ApPercentQ3a : null),
                (this.driDetail.ApPercentQ4a = retData.objectInfo.ApPercentQ4a ? retData.objectInfo.ApPercentQ4a : null),
                // (this.driDetail.ApPercentQ1b = retData.objectInfo.ApPercentQ1b ? retData.objectInfo.ApPercentQ1b : null),
                // (this.driDetail.ApPercentQ2b = retData.objectInfo.ApPercentQ2b ? retData.objectInfo.ApPercentQ2b : null),
                // (this.driDetail.ApPercentQ3b = retData.objectInfo.ApPercentQ3b ? retData.objectInfo.ApPercentQ3b : null),
                // (this.driDetail.ApPercentQ4b = retData.objectInfo.ApPercentQ4b ? retData.objectInfo.ApPercentQ4b : null),
                (this.driDetail.surveyScoreQ1a = retData.objectInfo.surveyScoreQ1a ? retData.objectInfo.surveyScoreQ1a : null),
                (this.driDetail.surveyScoreQ2a = retData.objectInfo.surveyScoreQ2a ? retData.objectInfo.surveyScoreQ2a : null),
                (this.driDetail.surveyScoreQ3a = retData.objectInfo.surveyScoreQ3a ? retData.objectInfo.surveyScoreQ3a : null),
                (this.driDetail.surveyScoreQ4a = retData.objectInfo.surveyScoreQ4a ? retData.objectInfo.surveyScoreQ4a : null)
                // (this.driDetail.surveyScoreQ1b = retData.objectInfo.surveyScoreQ1b ? retData.objectInfo.surveyScoreQ1b : null),
                // (this.driDetail.surveyScoreQ2b = retData.objectInfo.surveyScoreQ2b ? retData.objectInfo.surveyScoreQ2b : null),
                // (this.driDetail.surveyScoreQ3b = retData.objectInfo.surveyScoreQ3b ? retData.objectInfo.surveyScoreQ3b : null),
                // (this.driDetail.surveyScoreQ4b = retData.objectInfo.surveyScoreQ4b ? retData.objectInfo.surveyScoreQ4b : null)
            }
          } else if (data.retCode === 100014) {
            this.$cookie.delete("token");
            this.$router.push("/");
          }
        });
    },
    async loadInfo() {
      const userInfo = await this.getUserInfo();

      await Promise.all([this.getDriDetail()]).then((res) => {
        this.driDetail = res[0].data.retData.objectInfo;
        this.crumb.push(this.driDetail.teamName, this.driDetail.driUserNameEn);
        this.teamId = this.driDetail.teamId;
        this.isCurrentYear =
          this.driDetail.currentYearName == this.driDetail.yearName;

        if (userInfo.data.retData.id !== 1) {
          if (userInfo.data.retData.isCaptain) this.getCompanyPosition(1);
          else {
            this.getCompanyPosition(1);
            this.getCompanyPosition(userInfo.data.retData.teamCaptainUserId);
          }
        }
      });

      Promise.all([this.getTeamThreeScore()]).then((res) => {
        const threeTeam = res[0].data.retData.threeJob;
        for (let Q in threeTeam) {
          this.holdCheckList.splice(+Q - 1, 1, threeTeam[Q][3]);
          for (let team in threeTeam[Q]) {
            switch (team) {
              case "3":
                this.driDetail[`holdSystemScoreQ${Q}b`] =
                  threeTeam[Q][team].holdSystemScore;
                this.driDetail[`holdFlowScoreQ${Q}b`] =
                  threeTeam[Q][team].holdFlowScore;
                break;
              case "1":
                this.driDetail[`incomeRateQ${Q}b`] =
                  threeTeam[Q][team].incomeRate;
                this.driDetail[`ArMoveQ${Q}b`] = threeTeam[Q][team].ArMove;
                this.driDetail[`ArPercentQ${Q}b`] =
                  threeTeam[Q][team].ArPercentScore;
                this.driDetail[`ArPercentQ${Q}Score`] =
                  threeTeam[Q][team].ArPercent;
                this.driDetail[`ApMoveQ${Q}b`] = threeTeam[Q][team].ApMove;
                this.driDetail[`ApPercentQ${Q}b`] =
                  threeTeam[Q][team].ApPercentScore;
                this.driDetail[`ApPercentQ${Q}Score`] =
                  threeTeam[Q][team].ApPercent;
                break;
              case "2":
                this.driDetail[`BigBugScoreQ${Q}b`] =
                  threeTeam[Q][team].BigBugScore;
                break;
              default:
                break;
            }
          }
        }
      });

      const QNameList = this.isCurrentYear
        ? new Array(+this.driDetail.currentQName - 1)
        : new Array(4);

      this.driDetail.taskNum1a = null;
      this.driDetail.taskNum1b = null;
      this.driDetail.taskNum2a = null;
      this.driDetail.taskNum2b = null;
      this.driDetail.taskNum3a = null;
      this.driDetail.taskNum3b = null;
      this.driDetail.taskNum4a = null;
      this.driDetail.taskNum4b = null;
      Promise.all(
        QNameList.fill(0).map((i, k) => this.getBussinessScore(k + 1))
      ).then((res) => {
        QNameList.forEach((i, k) => {
          this.driDetail[`customerNumQ${k + 1}b`] =
            res[k].data.retData.driCustomerTaskInfo.taskCustomerNum;
          this.driDetail[`projectPunctualityQ${k + 1}b`] =
            res[k].data.retData.driCustomerTaskInfo.taskCommenFinishPercent;
          this.driDetail[`taskNum${k + 1}a`] =
            res[k].data.retData.driCustomerTaskInfo.taskNum;
          this.driDetail[`taskNum${k + 1}b`] =
            res[k].data.retData.driCustomerTaskInfo.taskCommenFinishNum;

          this.taskDetailList.splice(k, 1, res[k].data.retData);
          this.customerArr.push(res[k].taskCustomerArr);
        });
      });

      Promise.all(
        QNameList.fill(0).map((i, k) => this.getSurveyscorelistproject(k + 1))
      ).then((res) => {
        QNameList.forEach((i, k) => {
          this.driDetail[`surveyScoreQ${k + 1}b`] =
            res[k].data.retData.project_HaveScore_avg;
          this.surveyScoreList.splice(k, 1, res[k].data.retData);
        });
      });
    },
  },
  async created() {
    document.documentElement
      ? (document.documentElement.scrollTop = 0)
      : (document.body.scrollTop = 0);
    const getSelectYearRes = await this.getDriList();
    const selectYear = getSelectYearRes.data.retData.objectList;
    this.curYear = selectYear[0].yearName;
    this.pickerOptions = {
      disabledDate(time) {
        return !selectYear.some((i) => i.yearName == time.getFullYear());
      },
    };

    this.loadInfo();
    // this.surveyScoreList.forEach(async (i, k) => {
    //   const res = await Promise.all(i.project_HaveScore_List.map(project => this.getsurveyscorebyproject(project.projectInfo.projectId)));
    //   i.project_HaveScore_List.forEach((i2, k2) => {
    //     this.surveyScoreList[k].project_HaveScore_List[k2].getSurveyScore.avgList = res[k].data.retData.getSurveyScore.avgList
    //   })
    // })
  },
};
</script>

<style scoped lang=""></style>
