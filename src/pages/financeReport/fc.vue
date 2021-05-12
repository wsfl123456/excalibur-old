<template>
  <div class="report-page">
    <div class="form-box-wrapper">
      <div class="form-box">
        <div class="input-item">
          <div class="input-inner">
            <el-date-picker
              v-model="searchParams.yearName"
              type="year"
              :clearable="false"
              placeholder="请选择年份"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="input-item">
          <div class="input-inner">
            <el-select
              placeholder="请选择公司"
              v-model="searchParams.zhutiTypeId"
              clearable
            >
              <el-option
                v-for="i in companyList"
                :value="i.id"
                :label="i.name"
                :key="i.id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <el-button type="primary" icon="el-icon-search" @click="getFcList()"
        >搜索</el-button
      >
      <el-button type="primary" icon="el-icon-edit" @click="showEditBtn = !showEditBtn"
        >{{ showEditBtn ? '取消' : '' }}编辑</el-button
      >
      <el-button type="primary" icon="el-icon-download" @click="exportList"
        >导出</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-view"
        @click="$router.push({ name: 'fcLog' })"
        >查看日志</el-button
      >
    </div>

    <div v-loading="isLoading">
      <div v-if="nodata" class="nodata">暂无数据</div>
      <div v-else>
        <!-- 初期余额 -->
        <div v-show="true" class="report-page-content">
          <div>
            <div class="report-page-content-title">初期余额</div>
            <div class="report-page-content-table">
              <div class="report-page-content-table-tr">
                <div
                  class="report-page-content-table-tr-td"
                  v-for="(i1, k1) in balanceTable"
                  :key="k1"
                >
                  <template v-if="!Array.isArray(i1.value)">
                    <div class="report-page-content-table-tr-td-no_month">
                      <!-- title -->
                      <div
                        class="report-page-content-table-tr-td-no_month-title"
                      >
                        <span
                          v-html="i1.value"
                          :style="{
                            'line-height':
                              i1.value.indexOf('占比') !== -1 && '20px',
                          }"
                        ></span>
                      </div>

                      <div
                        class="report-page-content-table-tr-td-no_month-value"
                        v-for="(i2, k2) in i1.children"
                        :key="k2"
                      >
                        <div
                          v-if="i1.value === '期初余额'"
                          @click="changeShowBalance(k2)"
                        >
                          <span
                            class="report-page-content-table-tr-td-no_month-value--gray"
                            >{{ i2.value
                            }}<Icon
                              type="chevron-up"
                              v-show="showBalance[k2] && i2.children.length"
                            ></Icon
                            ><Icon
                              type="chevron-down"
                              v-show="!showBalance[k2] && i2.children.length"
                            ></Icon
                          ></span>
                        </div>

                        <div
                          v-else
                          :class="{ is_editing: showEditBtn && i2.sheetTypeId }"
                          @click="visibleModal(i2)"
                        >
                          <span>{{ i2.value }}</span>
                        </div>

                        <template v-if="showBalance[k2]">
                          <div
                            class="report-page-content-table-tr-td-no_month-value-bank"
                            :class="{
                              is_editing: showEditBtn && i3.sheetTypeId,
                            }"
                            v-for="(i3, k3) in i2.children"
                            :key="k3"
                            @click="visibleModal(i3)"
                          >
                            <span>{{ i3.value }}</span>
                          </div>
                        </template>
                      </div>

                      <div
                        v-show="showBalanceTotal"
                        :class="{
                          'report-page-content-table-tr-td-no_month-title--primary':
                            i1.value === '期初余额',
                        }"
                      >
                        <span>{{ i1.total }}</span>
                      </div>
                    </div>
                  </template>

                  <!-- 月份模块 -->
                  <template v-else>
                    <div class="report-page-content-table-tr-td-month">
                      <!-- title -->
                      <div class="report-page-content-table-tr-td-month-title">
                        <span v-for="(month, monthK) in i1.value" :key="monthK">
                          {{ month }}
                        </span>
                      </div>

                      <div
                        class="report-page-content-table-tr-td-month-value"
                        v-for="(i2, k2) in i1.children"
                        :key="k2"
                      >
                        <!-- 合计 -->
                        <div>
                          <span
                            v-for="(val1, val1K) in i2.value"
                            :key="val1K"
                            :class="{
                              is_editing: showEditBtn && val1.sheetTypeId,
                            }"
                            @click="visibleModal(val1)"
                            >{{ val1.value }}</span
                          >
                        </div>

                        <!-- 单个 -->
                        <template v-if="showBalance[k2]">
                          <div v-for="(i3, k3) in i2.children" :key="k3">
                            <span
                              v-for="(val2, val2K) in i3.value"
                              :key="val2K"
                              :class="{
                                is_editing: showEditBtn && val2.sheetTypeId,
                              }"
                              @click="visibleModal(val2)"
                            >
                              {{ val2.value }}
                            </span>
                          </div>
                        </template>
                      </div>
                      <div
                        v-show="showBalanceTotal"
                        class="report-page-content-table-tr-td-month-total"
                      >
                        <span v-for="(total, totalK) in i1.total" :key="totalK">
                          {{ total }}
                        </span>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 主营业务收入 -->
        <div v-show="true" class="report-page-bussines">
          <div class="report-page-bussines-title">主营业务收入</div>
          <div class="report-page-bussines-table">
            <div class="report-page-bussines-table-tr">
              <div
                class="report-page-bussines-table-tr-td"
                v-for="(i1, k1) in businessTable"
                :key="k1"
              >
                <template v-if="!Array.isArray(i1.value)">
                  <div class="report-page-bussines-table-tr-td-no_month">
                    <div
                      class="report-page-bussines-table-tr-td-no_month-title"
                    >
                      <div
                        v-html="i1.value"
                        :style="{
                          'line-height':
                            i1.value.indexOf('占比') !== -1 && '20px',
                        }"
                      ></div>
                    </div>

                    <template v-if="i1.value === '主营业务'">
                      <div
                        class="report-page-bussines-table-tr-td-no_month-value"
                        v-for="(i2, k2) in i1.children"
                        :key="k2"
                      >
                        <div
                          class="report-page-bussines-table-tr-td-no_month-value-left"
                        >
                          {{ i2.value }}
                        </div>
                        <div
                          class="report-page-bussines-table-tr-td-no_month-value-right"
                        >
                          <div
                            v-for="(i3, k3) in i2.children"
                            :key="k3"
                            @click="toPush(i3)"
                            :style="{
                              color: i3.value == 'ACT' && '#2d8ef8',
                              cursor: 'pointer',
                            }"
                          >
                            {{ i3.value }}
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <div
                        class="report-page-bussines-table-tr-td-no_month-value"
                        v-for="(i2, k2) in i1.children"
                        :key="k2"
                      >
                        <div
                          class="report-page-bussines-table-tr-td-no_month-value-right"
                        >
                          <div
                            v-for="(i3, k3) in i2.children"
                            :key="k3"
                            :class="{
                              is_editing: showEditBtn && i3.sheetTypeId,
                              can_show_detail: i3.detailArr,
                            }"
                            @click="visibleModal(i3)"
                          >
                            {{ i3.value }}
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </template>
                <template v-else>
                  <div class="report-page-bussines-table-tr-td-month">
                    <div class="report-page-bussines-table-tr-td-month-title">
                      <span v-for="(month, monthK) in i1.value" :key="monthK">
                        {{ month }}
                      </span>
                    </div>

                    <div
                      class="report-page-bussines-table-tr-td-month-value"
                      v-for="(i2, k2) in i1.children"
                      :key="k2"
                    >
                      <div v-for="(i3, k3) in i2.children" :key="k3">
                        <span
                          v-for="(val, valK) in i3.value"
                          :key="valK"
                          :class="{
                            is_editing: showEditBtn && val.sheetTypeId,
                            can_show_detail: val.detailArr,
                          }"
                          @click="visibleModal(val)"
                          >{{ val.value }}</span
                        >
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- 回款 -->
        <div v-show="true" class="report-page-payback">
          <div class="report-page-payback-title">回款</div>
          <div class="report-page-payback-table">
            <div class="report-page-payback-table-tr">
              <div
                class="report-page-payback-table-tr-td"
                v-for="(i1, k1) in paybackTable"
                :key="k1"
              >
                <template v-if="!Array.isArray(i1.value)">
                  <div class="report-page-payback-table-tr-td-no_month">
                    <!-- title -->
                    <div class="report-page-payback-table-tr-td-no_month-title">
                      <div
                        v-html="i1.value"
                        :style="{
                          'line-height':
                            i1.value.indexOf('占比') !== -1 && '20px',
                        }"
                      ></div>
                    </div>

                    <template v-if="i1.value === '企业回款项目'">
                      <div
                        class="report-page-payback-table-tr-td-no_month-value"
                        v-for="(i2, k2) in i1.children"
                        :key="k2"
                      >
                        <div>
                          <div
                            class="report-page-payback-table-tr-td-no_month-value-left"
                          >
                            {{ i2.value }}
                          </div>
                          <div
                            class="report-page-payback-table-tr-td-no_month-value-right"
                          >
                            <div v-for="(i3, k3) in i2.children" :key="k3">
                              <template v-if="i3.children">
                                <div
                                  @click="changeShowPayback(k2)"
                                  class="report-page-payback-table-tr-td-no_month-value-right--gray"
                                >
                                  <span>{{ i3.value }}</span
                                  ><Icon
                                    type="chevron-up"
                                    v-show="showPayback[k2]"
                                  ></Icon
                                  ><Icon
                                    type="chevron-down"
                                    v-show="!showPayback[k2]"
                                  ></Icon>
                                </div>
                                <div
                                  v-show="showPayback[k2]"
                                  v-for="(i4, k4) in i3.children"
                                  :key="k4"
                                  :style="{
                                    color: '#2d8ef8',
                                    cursor: 'pointer',
                                  }"
                                  @click="toPush(i4)"
                                >
                                  {{ i4.value }}
                                </div>
                              </template>
                              <template v-else>
                                <div
                                  class="report-page-payback-table-tr-td-no_month-value-right--gray"
                                >
                                  {{ i3.value }}
                                </div>
                              </template>
                            </div>
                          </div>
                        </div>

                        <div>
                          {{ i2.total }}
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <div v-for="(i2, k2) in i1.children" :key="k2">
                        <div
                          class="report-page-payback-table-tr-td-no_month-list"
                          v-for="(i3, k3) in i2.children"
                          :key="k3"
                        >
                          <div
                            :class="{
                              is_editing: showEditBtn && i3.sheetTypeId,
                              can_show_detail: i3.detailArr,
                            }"
                            @click="visibleModal(i3)"
                          >
                            {{ i3.value }}
                          </div>
                          <template v-if="showPayback[k2]">
                            <div
                              v-for="(val, valK) in i3.children"
                              :class="{ can_show_detail: val.detailArr }"
                              @click="visibleModal(val)"
                              :key="valK"
                            >
                              {{ val.value }}
                            </div>
                          </template>
                        </div>

                        <div
                          class="report-page-payback-table-tr-td-no_month-total"
                        >
                          {{ i2.total }}
                        </div>
                      </div>
                    </template>

                    <div
                      v-show="showPaybackTotal"
                      class="report-page-payback-table-all"
                      :class="{
                        'report-page-payback-table-all--company':
                          i1.value === '企业回款项目',
                      }"
                    >
                      {{ i1.total }}
                    </div>
                  </div>
                </template>

                <template v-else>
                  <div class="report-page-payback-table-tr-td-month">
                    <div class="report-page-payback-table-tr-td-month-title">
                      <span v-for="(month, monthK) in i1.value" :key="monthK">
                        {{ month }}
                      </span>
                    </div>

                    <div
                      class="report-page-payback-table-tr-td-month-value"
                      v-for="(i2, k2) in i1.children"
                      :key="k2"
                    >
                      <div v-for="(i3, k3) in i2.children" :key="k3">
                        <div>
                          <span
                            v-for="(val, valK) in i3.value"
                            :key="valK"
                            :class="{
                              is_editing: showEditBtn && val.sheetTypeId,
                              can_show_detail: val.detailArr,
                            }"
                            @click="visibleModal(val)"
                            >{{ val.value }}</span
                          >
                        </div>
                        <template v-if="showPayback[k2]">
                          <div v-for="(i4, k4) in i3.children" :key="k4">
                            <span
                              v-for="(val2, val2K) in i4.value"
                              :class="{ can_show_detail: val2.detailArr }"
                              :key="val2K"
                              @click="visibleModal(val2)"
                            >
                              {{ val2.value }}
                            </span>
                          </div>
                        </template>
                      </div>

                      <div
                        class="report-page-payback-table-tr-td-month-value-total"
                      >
                        <span v-for="(total, totalK) in i2.total" :key="totalK">
                          {{ total }}
                        </span>
                      </div>
                    </div>

                    <div
                      v-show="showPaybackTotal"
                      class="report-page-payback-table-tr-td-month-value-total"
                    >
                      <span v-for="(total, totalK) in i1.total" :key="totalK">
                        {{ total }}
                      </span>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- 支出 -->
        <div class="report-page-payback">
          <div class="report-page-payback-title">支出</div>
          <div class="report-page-payback-table">
            <div class="report-page-payback-table-tr">
              <div
                class="report-page-payback-table-tr-td"
                v-for="(i1, k1) in expendTable"
                :key="k1"
              >
                <template v-if="!Array.isArray(i1.value)">
                  <div class="report-page-payback-table-tr-td-no_month">
                    <!-- title -->
                    <div class="report-page-payback-table-tr-td-no_month-title">
                      <div
                        v-html="i1.value"
                        :style="{
                          'line-height':
                            i1.value.indexOf('占比') !== -1 && '20px',
                        }"
                      ></div>
                    </div>

                    <template v-if="i1.value === '企业支出项目'">
                      <div
                        class="report-page-payback-table-tr-td-no_month-value"
                        v-for="(i2, k2) in i1.children"
                        :key="k2"
                      >
                        <div>
                          <div
                            class="report-page-payback-table-tr-td-no_month-value-left"
                          >
                            {{ i2.value }}
                          </div>
                          <div
                            class="report-page-payback-table-tr-td-no_month-value-right"
                          >
                            <div v-for="(i3, k3) in i2.children" :key="k3">
                              <template v-if="i3.children">
                                <div
                                  @click="changeShowExpend(k2, k3)"
                                  class="report-page-payback-table-tr-td-no_month-value-right--gray"
                                >
                                  <span>{{ i3.value }}</span
                                  ><Icon
                                    type="chevron-up"
                                    v-show="showExpend[k2][k3]"
                                  ></Icon
                                  ><Icon
                                    type="chevron-down"
                                    v-show="!showExpend[k2][k3]"
                                  ></Icon>
                                </div>
                                <template v-if="showExpend[k2][k3]">
                                  <div
                                    v-for="(i4, k4) in i3.children"
                                    :key="k4"
                                    @click="toPush(i4)"
                                    :style="{
                                      color:
                                        (i4.value == '办公运营支出' ||
                                          i4.value == '员工支出' ||
                                          i4.value == '项目开销' ||
                                          i4.value == '项目外发(已付)' ||
                                          i4.value == '项目外发(待付)') &&
                                        '#2d8ef8',
                                      cursor:
                                        (i4.value == '办公运营支出' ||
                                          i4.value == '员工支出' ||
                                          i4.value == '项目开销' ||
                                          i4.value == '项目外发(已付)' ||
                                          i4.value == '项目外发(待付)') &&
                                        'pointer',
                                    }"
                                  >
                                    {{ i4.value }}
                                  </div>
                                </template>
                              </template>
                              <template v-else>
                                <div
                                  class="report-page-payback-table-tr-td-no_month-value-right--gray"
                                >
                                  {{ i3.value }}
                                </div>
                              </template>
                            </div>
                          </div>
                        </div>

                        <div>
                          {{ i2.total }}
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <div v-for="(i2, k2) in i1.children" :key="k2">
                        <div
                          class="report-page-payback-table-tr-td-no_month-list"
                          v-for="(i3, k3) in i2.children"
                          :key="k3"
                        >
                          <div>{{ i3.value }}</div>
                          <template v-if="showExpend[k2][k3]">
                            <div
                              v-for="(val, valK) in i3.children"
                              :key="valK"
                              :class="{
                                is_editing: showEditBtn && val.sheetTypeId,
                                can_show_detail: val.detailArr,
                              }"
                              @click="visibleModal(val)"
                            >
                              {{ val.value }}
                            </div>
                          </template>
                        </div>

                        <div
                          class="report-page-payback-table-tr-td-no_month-total"
                        >
                          {{ i2.total }}
                        </div>
                      </div>
                    </template>

                    <div
                      v-show="showExpendTotal"
                      class="report-page-payback-table-all"
                      :class="{
                        'report-page-payback-table-all--company':
                          i1.value === '企业支出项目',
                      }"
                    >
                      {{ i1.total }}
                    </div>
                  </div>
                </template>

                <template v-else>
                  <div class="report-page-payback-table-tr-td-month">
                    <div class="report-page-payback-table-tr-td-month-title">
                      <span v-for="(month, monthK) in i1.value" :key="monthK">
                        {{ month }}
                      </span>
                    </div>

                    <div
                      class="report-page-payback-table-tr-td-month-value"
                      v-for="(i2, k2) in i1.children"
                      :key="k2"
                    >
                      <div v-for="(i3, k3) in i2.children" :key="k3">
                        <div>
                          <span v-for="(val, valK) in i3.value" :key="valK">{{
                            val
                          }}</span>
                        </div>
                        <template v-if="showExpend[k2][k3]">
                          <div v-for="(i4, k4) in i3.children" :key="k4">
                            <span
                              v-for="(val2, val2K) in i4.value"
                              :key="val2K"
                              :class="{
                                is_editing: showEditBtn && val2.sheetTypeId,
                                can_show_detail: val2.detailArr,
                              }"
                              @click="visibleModal(val2)"
                            >
                              {{ val2.value }}
                            </span>
                          </div>
                        </template>
                      </div>

                      <div
                        class="report-page-payback-table-tr-td-month-value-total"
                      >
                        <span v-for="(total, totalK) in i2.total" :key="totalK">
                          {{ total }}
                        </span>
                      </div>
                    </div>

                    <div
                      v-show="showExpendTotal"
                      class="report-page-payback-table-tr-td-month-value-total"
                    >
                      <span v-for="(total, totalK) in i1.total" :key="totalK">
                        {{ total }}
                      </span>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- 期末余额 -->
        <div v-show="true" class="report-page-content">
          <div>
            <div class="report-page-content-title">期末余额</div>
            <div class="report-page-content-table">
              <div class="report-page-content-table-tr">
                <div
                  class="report-page-content-table-tr-td"
                  v-for="(i1, k1) in endTable"
                  :key="k1"
                >
                  <template v-if="!Array.isArray(i1.value)">
                    <div class="report-page-content-table-tr-td-no_month">
                      <!-- title -->
                      <div
                        class="report-page-content-table-tr-td-no_month-title"
                      >
                        <span
                          v-html="i1.value"
                          :style="{
                            'line-height':
                              i1.value.indexOf('占比') !== -1 && '20px',
                          }"
                        ></span>
                      </div>

                      <div
                        class="report-page-content-table-tr-td-no_month-value"
                        v-for="(i2, k2) in i1.children"
                        :key="k2"
                      >
                        <div
                          v-if="i1.value === '期末余额'"
                          @click="changeShowEnd(k2)"
                        >
                          <span
                            class="report-page-content-table-tr-td-no_month-value--gray"
                            >{{ i2.value
                            }}<Icon
                              type="chevron-up"
                              v-show="showEnd[k2] && i2.children.length"
                            ></Icon
                            ><Icon
                              type="chevron-down"
                              v-show="!showEnd[k2] && i2.children.length"
                            ></Icon
                          ></span>
                        </div>

                        <div
                          v-else
                          :class="{ is_editing: showEditBtn && i2.sheetTypeId }"
                          @click="visibleModal(i2)"
                        >
                          <span>{{ i2.value }}</span>
                        </div>

                        <template v-if="showEnd[k2]">
                          <div
                            class="report-page-content-table-tr-td-no_month-value-bank"
                            :class="{
                              is_editing: showEditBtn && i3.sheetTypeId,
                            }"
                            v-for="(i3, k3) in i2.children"
                            :key="k3"
                            @click="visibleModal(i3)"
                          >
                            <span>{{ i3.value }}</span>
                          </div>
                        </template>
                      </div>

                      <div
                        v-show="showEndTotal"
                        :class="{
                          'report-page-content-table-tr-td-no_month-title--primary':
                            i1.value === '期末余额',
                        }"
                      >
                        <span>{{ i1.total }}</span>
                      </div>
                    </div>
                  </template>

                  <!-- 月份模块 -->
                  <template v-else>
                    <div class="report-page-content-table-tr-td-month">
                      <!-- title -->
                      <div class="report-page-content-table-tr-td-month-title">
                        <span v-for="(month, monthK) in i1.value" :key="monthK">
                          {{ month }}
                        </span>
                      </div>

                      <div
                        class="report-page-content-table-tr-td-month-value"
                        v-for="(i2, k2) in i1.children"
                        :key="k2"
                      >
                        <!-- 合计 -->
                        <div>
                          <span
                            v-for="(val1, val1K) in i2.value"
                            :key="val1K"
                            :class="{
                              is_editing: showEditBtn && val1.sheetTypeId,
                            }"
                            @click="visibleModal(val1)"
                            >{{ val1.value }}</span
                          >
                        </div>

                        <!-- 单个 -->
                        <template v-if="showEnd[k2]">
                          <div v-for="(i3, k3) in i2.children" :key="k3">
                            <span
                              v-for="(val2, val2K) in i3.value"
                              :key="val2K"
                              :class="{
                                is_editing: showEditBtn && val2.sheetTypeId,
                              }"
                              @click="visibleModal(val2)"
                            >
                              {{ val2.value }}
                            </span>
                          </div>
                        </template>
                      </div>
                      <div
                        v-show="showEndTotal"
                        class="report-page-content-table-tr-td-month-total"
                      >
                        <span v-for="(total, totalK) in i1.total" :key="totalK">
                          {{ total }}
                        </span>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="showEditModal"
      @close="beforCloseModal"
      width="540"
      class="dialog"
    >
      <div class="title" slot="title">编辑金额</div>
      <div class="content">
        <el-form
          ref="submitForm"
          :model="editParams"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="原金额">
            <el-input
              :value="itemParams.value"
              disabled
              placeholder="原金额"
            ></el-input>
          </el-form-item>
          <el-form-item label="现金额" prop="newValue">
            <el-input
              v-model="editParams.newValue"
              type="number"
              :step="1000"
              placeholder="请填写现金额"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="editParams.remark"
              placeholder="请填写备注"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="footer" slot="footer">
        <el-button @click="showEditModal = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">提 交</el-button>
      </div>
    </el-dialog>

    <fc-detail :showDetail.sync="showDetail" :detail="detailObj"></fc-detail>
  </div>
</template>
<script>
import "./index.less";
import { Task } from "../../API/api";
import {
  balanceTable,
  businessTable,
  paybackTable,
  expendTable,
  endTable,
} from "../../assets/conf/cwfc.conf";
import fcDetail from "./fcDetail.vue";
export default {
  name: "fc",
  components: { fcDetail },
  data() {
    return {
      searchParams: {
        yearName: new Date().getFullYear().toString(),
        zhutiTypeId: "",
      },
      showEditBtn: false,
      showEditModal: false,
      showDetail: false,
      detailObj: {},
      isLoading: true,
      itemParams: {},
      nodata: false,
      editParams: {
        newValue: "",
        remark: "",
      },
      rules: {
        newValue: [
          { required: true, message: "请填写现金额", trigger: "blur" },
        ],
        remark: [{ required: true, message: "请填写备注", trigger: "blur" }],
      },
      companyList: [
        {
          id: "",
          name: "全部",
        },
        {
          id: 1,
          name: "工匠",
        },
        {
          id: 2,
          name: "盖雅",
        },
        {
          id: 3,
          name: "酷拓",
        },
      ],
      showBalance: [],
      showBalanceTotal: false,
      showEnd: [],
      showEndTotal: false,
      showPayback: [],
      showPaybackTotal: false,
      showExpend: [],
      showExpendTotal: false,
      balanceTable: [],
      businessTable: [],
      paybackTable: [],
      expendTable: [],
      endTable: [],
    };
  },
  methods: {
    toPush(i) {
      let pathName = "";
      let pathQuery = {};
      switch (i.value) {
        case "办公运营支出":
          pathName = "fcOffice";
          break;
        case "员工支出":
          pathName = "fcStaff";
          break;
        case "项目开销":
          pathName = "fcOverhead";
          break;
        case "项目外发(待付)":
          pathName = "ap";
          pathQuery = {
            type: "nopay",
          };
          break;
        case "项目外发(已付)":
          pathName = "ap";
          pathQuery = {
            type: "haspay",
          };
          break;
        case "ACT":
          pathName = "ar";
          break;
        case "本年项目回款":
        case "历年项目回款":
          pathName = "ap";
          break;
        default:
          break;
      }

      !!pathName && this.$router.push({ name: pathName, query: pathQuery });
    },
    beforCloseModal() {
      this.editParams = {
        newValue: "",
        remark: "",
      };
      this.itemParams = {};
      this.$refs["submitForm"].resetFields();
    },
    visibleModal(item) {
      if (this.showEditBtn && item.sheetTypeId) {
        this.itemParams = item;
        this.showEditModal = true;
      }
      if (item.detailArr) {
        this.showDetail = true;
        this.detailObj = item;
      }
    },
    changeShowBalance(index) {
      this.showBalance.splice(index, 1, !this.showBalance[index]);
    },
    changeShowEnd(index) {
      this.showEnd.splice(index, 1, !this.showEnd[index]);
    },
    changeShowPayback(index) {
      this.showPayback.splice(index, 1, !this.showPayback[index]);
    },
    changeShowExpend(index1, index2) {
      this.showExpend[index1][index2] = !this.showExpend[index1][index2];
      this.showExpend.splice(index1, 1, this.showExpend[index1]);
    },
    async editSubmit() {
      this.$refs["submitForm"].validate((valid) => {
        if (valid) {
          (async () => {
            const params = {
              sheetTypeId: this.itemParams.sheetTypeId,
              zhutiTypeId: this.itemParams.zhutiTypeId,
              itemTypeId: this.itemParams.itemTypeId,
              yearName: new Date(this.searchParams.yearName).getFullYear(),
              monthName: this.itemParams.monthName,
              newValue: this.editParams.newValue,
              remark: this.editParams.remark,
            };
            const res = await this.$http.post(
              Task.cwfcset,
              this.qs.stringify(params),
              {
                headers: {
                  Authorization: "Bearer " + this.$cookie.get("token"),
                },
              }
            );
            !!(res.data.retCode === 0) &&
              (() => {
                this.showEditModal = false;
                this.$message.success("提交成功");
                this.getFcList();
              })();
          })();
        } else {
          return false;
        }
      });
    },
    async exportList() {
      const params = {
        yearName: new Date(this.searchParams.yearName).getFullYear(),
        zhutiTypeId: this.searchParams.zhutiTypeId,
        isExport: 1,
      };
      const res = await this.$http.post(
        Task.cwfclist,
        this.qs.stringify(params),
        { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
      );
      if (res.data.retData.download_url)
        window.open(res.data.retData.download_url);
    },
    async getFcList() {
      this.isLoading = true;
      this.balanceTable = JSON.parse(JSON.stringify(balanceTable));
      this.businessTable = JSON.parse(JSON.stringify(businessTable));
      this.paybackTable = JSON.parse(JSON.stringify(paybackTable));
      this.expendTable = JSON.parse(JSON.stringify(expendTable));
      this.endTable = JSON.parse(JSON.stringify(endTable));
      this.showBalance = [];
      this.showBalanceTotal = false;
      this.showEnd = [];
      this.showEndTotal = false;
      this.showPayback = [];
      this.showPaybackTotal = false;
      this.showExpend = [];
      this.showExpendTotal = false;
      this.nodata = false;

      const params = {
        yearName: new Date(this.searchParams.yearName).getFullYear(),
        zhutiTypeId: this.searchParams.zhutiTypeId,
      };
      const res = await this.$http.post(
        Task.cwfclist,
        this.qs.stringify(params),
        { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
      );

      this.isLoading = false;

      if (res.data.retCode === 0) {
        const sheet_1_body = res.data.retData.sheet_1_body;
        const sheet_1_xiaoji = res.data.retData.sheet_1_xiaoji;
        const sheet_2_body = res.data.retData.sheet_2_body;
        const sheet_3_body = res.data.retData.sheet_3_body;
        const sheet_3_xiaoji = res.data.retData.sheet_3_xiaoji;
        const sheet_4_body = res.data.retData.sheet_4_body;
        const sheet_4_xiaoji = res.data.retData.sheet_4_xiaoji;
        const sheet_5_body = res.data.retData.sheet_5_body;
        const sheet_5_xiaoji = res.data.retData.sheet_5_xiaoji;

        /* 初期余额 */
        Object.keys(sheet_1_xiaoji).length
          ? (this.showBalanceTotal = true)
          : (this.showBalanceTotal = false);
        sheet_1_body.map((e, k) => {
          this.showBalance.push(false);

          if (e.child && e.child.length) {
            this.balanceTable[2].children.push({
              value: [
                {
                  value: e.base.month_1,
                },
                {
                  value: e.base.month_2,
                },
                {
                  value: e.base.month_3,
                },
                {
                  value: e.base.month_4,
                },
                {
                  value: e.base.month_5,
                },
                {
                  value: e.base.month_6,
                },
                {
                  value: e.base.month_7,
                },
                {
                  value: e.base.month_8,
                },
                {
                  value: e.base.month_9,
                },
                {
                  value: e.base.month_10,
                },
                {
                  value: e.base.month_11,
                },
                {
                  value: e.base.month_12,
                },
              ],
              children: [],
            });
          } else {
            this.balanceTable[2].children.push({
              value: [
                {
                  value: e.base.month_1,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 1,
                },
                {
                  value: e.base.month_2,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 2,
                },
                {
                  value: e.base.month_3,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 3,
                },
                {
                  value: e.base.month_4,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 4,
                },
                {
                  value: e.base.month_5,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 5,
                },
                {
                  value: e.base.month_6,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 6,
                },
                {
                  value: e.base.month_7,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 7,
                },
                {
                  value: e.base.month_8,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 8,
                },
                {
                  value: e.base.month_9,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 9,
                },
                {
                  value: e.base.month_10,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 10,
                },
                {
                  value: e.base.month_11,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 11,
                },
                {
                  value: e.base.month_12,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 12,
                },
              ],
              children: [],
            });
          }

          this.balanceTable[0].children.push({
            value: e.base.zhutiTypeName,
            children: [],
          });
          /* 用于编辑 */
          if (e.child && e.child.length) {
            this.balanceTable[1].children.push({
              value: e.base.month_0,
              children: [],
            });
          } else {
            this.balanceTable[1].children.push({
              value: e.base.month_0,
              children: [],
              sheetTypeId: e.base.sheetTypeId,
              zhutiTypeId: e.base.zhutiTypeId,
              itemTypeId: e.base.itemTypeId,
              monthName: 0,
            });
          }

          if (e.child && e.child.length) {
            this.balanceTable[3].children.push({
              value: e.base.month_20,
              children: [],
            });
          } else {
            this.balanceTable[3].children.push({
              value: e.base.month_20,
              children: [],
              sheetTypeId: e.base.sheetTypeId,
              zhutiTypeId: e.base.zhutiTypeId,
              itemTypeId: e.base.itemTypeId,
              monthName: 20,
            });
          }
          this.balanceTable[4].children.push({
            value: e.base.month_30,
            children: [],
          });
          this.balanceTable[5].children.push({
            value: e.base.month_40,
            children: [],
          });
          this.balanceTable[6].children.push({
            value: e.base.month_50,
            children: [],
          });
          e.child &&
            e.child.map((i) => {
              this.balanceTable[2].children[k].children.push({
                value: [
                  {
                    value: i.month_1,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 1,
                  },
                  {
                    value: i.month_2,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 2,
                  },
                  {
                    value: i.month_3,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 3,
                  },
                  {
                    value: i.month_4,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 4,
                  },
                  {
                    value: i.month_5,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 5,
                  },
                  {
                    value: i.month_6,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 6,
                  },
                  {
                    value: i.month_7,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 7,
                  },
                  {
                    value: i.month_8,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 8,
                  },
                  {
                    value: i.month_9,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 9,
                  },
                  {
                    value: i.month_10,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 10,
                  },
                  {
                    value: i.month_11,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 11,
                  },
                  {
                    value: i.month_12,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 12,
                  },
                ],
              });
              this.balanceTable[0].children[k].children.push({
                value: i.itemTypeName,
              });
              this.balanceTable[1].children[k].children.push({
                value: i.month_0,
                sheetTypeId: i.sheetTypeId,
                zhutiTypeId: i.zhutiTypeId,
                itemTypeId: i.itemTypeId,
                monthName: 0,
              });
              this.balanceTable[3].children[k].children.push({
                value: i.month_20,
                sheetTypeId: i.sheetTypeId,
                zhutiTypeId: i.zhutiTypeId,
                itemTypeId: i.itemTypeId,
                monthName: 20,
              });
              this.balanceTable[4].children[k].children.push({
                value: i.month_30,
              });
              this.balanceTable[5].children[k].children.push({
                value: i.month_40,
              });
              this.balanceTable[6].children[k].children.push({
                value: i.month_50,
              });
            });
        });
        Object.keys(sheet_1_xiaoji).length &&
          (() => {
            this.balanceTable[1].total = sheet_1_xiaoji.month_0;
            this.balanceTable[2].total = this.balanceTable[2].value.map(
              (i, k) => {
                return sheet_1_xiaoji[`month_${k + 1}`];
              }
            );
            this.balanceTable[3].total = sheet_1_xiaoji.month_20;
            this.balanceTable[4].total = sheet_1_xiaoji.month_30;
            this.balanceTable[5].total = sheet_1_xiaoji.month_40;
            this.balanceTable[6].total = sheet_1_xiaoji.month_50;
          })();

        /* 期末余额 */
        Object.keys(sheet_5_xiaoji).length
          ? (this.showEndTotal = true)
          : (this.showEndTotal = false);
        sheet_5_body.map((e, k) => {
          this.showEnd.push(false);

          if (e.child && e.child.length) {
            this.endTable[2].children.push({
              value: [
                {
                  value: e.base.month_1,
                },
                {
                  value: e.base.month_2,
                },
                {
                  value: e.base.month_3,
                },
                {
                  value: e.base.month_4,
                },
                {
                  value: e.base.month_5,
                },
                {
                  value: e.base.month_6,
                },
                {
                  value: e.base.month_7,
                },
                {
                  value: e.base.month_8,
                },
                {
                  value: e.base.month_9,
                },
                {
                  value: e.base.month_10,
                },
                {
                  value: e.base.month_11,
                },
                {
                  value: e.base.month_12,
                },
              ],
              children: [],
            });
          } else {
            this.endTable[2].children.push({
              value: [
                {
                  value: e.base.month_1,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 1,
                },
                {
                  value: e.base.month_2,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 2,
                },
                {
                  value: e.base.month_3,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 3,
                },
                {
                  value: e.base.month_4,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 4,
                },
                {
                  value: e.base.month_5,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 5,
                },
                {
                  value: e.base.month_6,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 6,
                },
                {
                  value: e.base.month_7,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 7,
                },
                {
                  value: e.base.month_8,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 8,
                },
                {
                  value: e.base.month_9,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 9,
                },
                {
                  value: e.base.month_10,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 10,
                },
                {
                  value: e.base.month_11,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 11,
                },
                {
                  value: e.base.month_12,
                  sheetTypeId: e.base.sheetTypeId,
                  zhutiTypeId: e.base.zhutiTypeId,
                  itemTypeId: e.base.itemTypeId,
                  monthName: 12,
                },
              ],
              children: [],
            });
          }

          this.endTable[0].children.push({
            value: e.base.zhutiTypeName,
            children: [],
          });
          /* 用于编辑 */
          if (e.child && e.child.length) {
            this.endTable[1].children.push({
              value: e.base.month_0,
              children: [],
            });
          } else {
            this.endTable[1].children.push({
              value: e.base.month_0,
              children: [],
              sheetTypeId: e.base.sheetTypeId,
              zhutiTypeId: e.base.zhutiTypeId,
              itemTypeId: e.base.itemTypeId,
              monthName: 0,
            });
          }
          /* 用于编辑 */
          if (e.child && e.child.length) {
            this.endTable[3].children.push({
              value: e.base.month_20,
              children: [],
            });
          } else {
            this.endTable[3].children.push({
              value: e.base.month_20,
              children: [],
              sheetTypeId: e.base.sheetTypeId,
              zhutiTypeId: e.base.zhutiTypeId,
              itemTypeId: e.base.itemTypeId,
              monthName: 20,
            });
          }
          this.endTable[4].children.push({
            value: e.base.month_30,
            children: [],
          });
          this.endTable[5].children.push({
            value: e.base.month_40,
            children: [],
          });
          this.endTable[6].children.push({
            value: e.base.month_50,
            children: [],
          });
          e.child &&
            e.child.map((i) => {
              this.endTable[2].children[k].children.push({
                value: [
                  {
                    value: i.month_1,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 1,
                  },
                  {
                    value: i.month_2,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 2,
                  },
                  {
                    value: i.month_3,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 3,
                  },
                  {
                    value: i.month_4,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 4,
                  },
                  {
                    value: i.month_5,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 5,
                  },
                  {
                    value: i.month_6,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 6,
                  },
                  {
                    value: i.month_7,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 7,
                  },
                  {
                    value: i.month_8,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 8,
                  },
                  {
                    value: i.month_9,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 9,
                  },
                  {
                    value: i.month_10,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 10,
                  },
                  {
                    value: i.month_11,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 11,
                  },
                  {
                    value: i.month_12,
                    sheetTypeId: i.sheetTypeId,
                    zhutiTypeId: i.zhutiTypeId,
                    itemTypeId: i.itemTypeId,
                    monthName: 12,
                  },
                ],
              });
              this.endTable[0].children[k].children.push({
                value: i.itemTypeName,
              });
              this.endTable[1].children[k].children.push({
                value: i.month_0,
                sheetTypeId: i.sheetTypeId,
                zhutiTypeId: i.zhutiTypeId,
                itemTypeId: i.itemTypeId,
                monthName: 0,
              });
              this.endTable[3].children[k].children.push({
                value: i.month_20,
                sheetTypeId: i.sheetTypeId,
                zhutiTypeId: i.zhutiTypeId,
                itemTypeId: i.itemTypeId,
                monthName: 20,
              });
              // this.endTable[3].children[k].children.push({
              //   value: i.month_20,
              // });
              this.endTable[4].children[k].children.push({
                value: i.month_30,
              });
              this.endTable[5].children[k].children.push({
                value: i.month_40,
              });
              this.endTable[6].children[k].children.push({
                value: i.month_50,
              });
            });
        });
        Object.keys(sheet_5_xiaoji).length &&
          (() => {
            this.endTable[1].total = sheet_5_xiaoji.month_0;
            this.endTable[2].total = this.endTable[2].value.map((i, k) => {
              return sheet_5_xiaoji[`month_${k + 1}`];
            });
            this.endTable[3].total = sheet_5_xiaoji.month_20;
            this.endTable[4].total = sheet_5_xiaoji.month_30;
            this.endTable[5].total = sheet_5_xiaoji.month_40;
            this.endTable[6].total = sheet_5_xiaoji.month_50;
          })();

        /* 主营业务 */
        sheet_2_body.map((e, k) => {
          this.businessTable[0].children.push({
            value: e.base.zhutiTypeName,
            children: [],
          });
          this.businessTable[1].children.push({ value: "", children: [] });
          this.businessTable[2].children.push({ children: [] });
          this.businessTable[3].children.push({ value: "", children: [] });
          this.businessTable[4].children.push({ value: "", children: [] });
          this.businessTable[5].children.push({ value: "", children: [] });
          this.businessTable[6].children.push({ value: "", children: [] });
          for (let prop in e.child) {
            this.businessTable[0].children[k].children.push({
              value: e.child[prop].itemTypeName,
            });

            if (e.child[prop].sheetTypeId) {
              this.businessTable[1].children[k].children.push({
                value: e.child[prop].month_0,
                sheetTypeId: e.child[prop].sheetTypeId,
                zhutiTypeId: e.child[prop].zhutiTypeId,
                itemTypeId: e.child[prop].itemTypeId,
                monthName: 0,
              });
              this.businessTable[3].children[k].children.push({
                value: e.child[prop].month_20,
                sheetTypeId: e.child[prop].sheetTypeId,
                zhutiTypeId: e.child[prop].zhutiTypeId,
                itemTypeId: e.child[prop].itemTypeId,
                monthName: 20,
              });
              this.businessTable[4].children[k].children.push({
                value: e.child[prop].month_30,
              });
              this.businessTable[5].children[k].children.push({
                value: e.child[prop].month_40,
              });
              this.businessTable[6].children[k].children.push({
                value: e.child[prop].month_50,
              });
            } else {
               this.businessTable[1].children[k].children.push({
                value: e.child[prop].month_0,
              });
               this.businessTable[3].children[k].children.push({
                value: e.child[prop].month_20,
              });
               this.businessTable[4].children[k].children.push({
                value: e.child[prop].month_30,
              });
              this.businessTable[5].children[k].children.push({
                value: e.child[prop].month_40,
              });
              this.businessTable[6].children[k].children.push({
                value: e.child[prop].month_50,
              });
              // this.businessTable[1].children[k].children.push({
              //   value: e.child[prop].month_0,
              //   modalType: e.base.sheetTypeName,
              //   detailArr: e.child[prop].detailArr.month_0,
              // });
              // this.businessTable[3].children[k].children.push({
              //   value: e.child[prop].month_20,
              //   modalType: e.base.sheetTypeName,
              //   detailArr: e.child[prop].detailArr.month_20,
              // });
              // this.businessTable[4].children[k].children.push({
              //   value: e.child[prop].month_30,
              //   modalType: e.base.sheetTypeName,
              //   detailArr: e.child[prop].detailArr.month_30,
              // });
              // this.businessTable[5].children[k].children.push({
              //   value: e.child[prop].month_40,
              //   modalType: e.base.sheetTypeName,
              //   detailArr: e.child[prop].detailArr.month_40,
              // });
              // this.businessTable[6].children[k].children.push({
              //   value: e.child[prop].month_50,
              //   modalType: e.base.sheetTypeName,
              //   detailArr: e.child[prop].detailArr.month_50,
              // });
            }

            if (e.child[prop].sheetTypeId) {
              this.businessTable[2].children[k].children.push({
                value: [
                  {
                    value: e.child[prop].month_1,
                    sheetTypeId: e.child[prop].sheetTypeId,
                    zhutiTypeId: e.child[prop].zhutiTypeId,
                    itemTypeId: e.child[prop].itemTypeId,
                    monthName: 1,
                  },
                  {
                    value: e.child[prop].month_2,
                    sheetTypeId: e.child[prop].sheetTypeId,
                    zhutiTypeId: e.child[prop].zhutiTypeId,
                    itemTypeId: e.child[prop].itemTypeId,
                    monthName: 2,
                  },
                  {
                    value: e.child[prop].month_3,
                    sheetTypeId: e.child[prop].sheetTypeId,
                    zhutiTypeId: e.child[prop].zhutiTypeId,
                    itemTypeId: e.child[prop].itemTypeId,
                    monthName: 3,
                  },
                  {
                    value: e.child[prop].month_4,
                    sheetTypeId: e.child[prop].sheetTypeId,
                    zhutiTypeId: e.child[prop].zhutiTypeId,
                    itemTypeId: e.child[prop].itemTypeId,
                    monthName: 4,
                  },
                  {
                    value: e.child[prop].month_5,
                    sheetTypeId: e.child[prop].sheetTypeId,
                    zhutiTypeId: e.child[prop].zhutiTypeId,
                    itemTypeId: e.child[prop].itemTypeId,
                    monthName: 5,
                  },
                  {
                    value: e.child[prop].month_6,
                    sheetTypeId: e.child[prop].sheetTypeId,
                    zhutiTypeId: e.child[prop].zhutiTypeId,
                    itemTypeId: e.child[prop].itemTypeId,
                    monthName: 6,
                  },
                  {
                    value: e.child[prop].month_7,
                    sheetTypeId: e.child[prop].sheetTypeId,
                    zhutiTypeId: e.child[prop].zhutiTypeId,
                    itemTypeId: e.child[prop].itemTypeId,
                    monthName: 7,
                  },
                  {
                    value: e.child[prop].month_8,
                    sheetTypeId: e.child[prop].sheetTypeId,
                    zhutiTypeId: e.child[prop].zhutiTypeId,
                    itemTypeId: e.child[prop].itemTypeId,
                    monthName: 8,
                  },
                  {
                    value: e.child[prop].month_9,
                    sheetTypeId: e.child[prop].sheetTypeId,
                    zhutiTypeId: e.child[prop].zhutiTypeId,
                    itemTypeId: e.child[prop].itemTypeId,
                    monthName: 9,
                  },
                  {
                    value: e.child[prop].month_10,
                    sheetTypeId: e.child[prop].sheetTypeId,
                    zhutiTypeId: e.child[prop].zhutiTypeId,
                    itemTypeId: e.child[prop].itemTypeId,
                    monthName: 10,
                  },
                  {
                    value: e.child[prop].month_11,
                    sheetTypeId: e.child[prop].sheetTypeId,
                    zhutiTypeId: e.child[prop].zhutiTypeId,
                    itemTypeId: e.child[prop].itemTypeId,
                    monthName: 11,
                  },
                  {
                    value: e.child[prop].month_12,
                    sheetTypeId: e.child[prop].sheetTypeId,
                    zhutiTypeId: e.child[prop].zhutiTypeId,
                    itemTypeId: e.child[prop].itemTypeId,
                    monthName: 12,
                  },
                ],
              });
            } else if (e.child[prop].detailArr) {
              this.businessTable[2].children[k].children.push({
                value: [
                  {
                    value: e.child[prop].month_1,
                    modalType: e.base.sheetTypeName,
                    detailArr: e.child[prop].detailArr.month_1,
                    monthName: 1,
                  },
                  {
                    value: e.child[prop].month_2,
                    monthName: 2,
                    modalType: e.base.sheetTypeName,
                    detailArr: e.child[prop].detailArr.month_2,
                  },
                  {
                    value: e.child[prop].month_3,
                    monthName: 3,
                    modalType: e.base.sheetTypeName,
                    detailArr: e.child[prop].detailArr.month_3,
                  },
                  {
                    value: e.child[prop].month_4,
                    monthName: 4,
                    modalType: e.base.sheetTypeName,
                    detailArr: e.child[prop].detailArr.month_4,
                  },
                  {
                    value: e.child[prop].month_5,
                    monthName: 5,
                    modalType: e.base.sheetTypeName,
                    detailArr: e.child[prop].detailArr.month_5,
                  },
                  {
                    value: e.child[prop].month_6,
                    monthName: 6,
                    modalType: e.base.sheetTypeName,
                    detailArr: e.child[prop].detailArr.month_6,
                  },
                  {
                    value: e.child[prop].month_7,
                    monthName: 7,
                    modalType: e.base.sheetTypeName,
                    detailArr: e.child[prop].detailArr.month_7,
                  },
                  {
                    value: e.child[prop].month_8,
                    monthName: 8,
                    modalType: e.base.sheetTypeName,
                    detailArr: e.child[prop].detailArr.month_8,
                  },
                  {
                    value: e.child[prop].month_9,
                    monthName: 9,
                    modalType: e.base.sheetTypeName,
                    detailArr: e.child[prop].detailArr.month_9,
                  },
                  {
                    value: e.child[prop].month_10,
                    monthName: 10,
                    modalType: e.base.sheetTypeName,
                    detailArr: e.child[prop].detailArr.month_10,
                  },
                  {
                    value: e.child[prop].month_11,
                    monthName: 11,
                    modalType: e.base.sheetTypeName,
                    detailArr: e.child[prop].detailArr.month_11,
                  },
                  {
                    value: e.child[prop].month_12,
                    monthName: 12,
                    modalType: e.base.sheetTypeName,
                    detailArr: e.child[prop].detailArr.month_12,
                  },
                ],
              });
            }
          }
        });

        /* 回款 */
        Object.keys(sheet_3_xiaoji).length
          ? (this.showPaybackTotal = true)
          : (this.showPaybackTotal = false);

        sheet_3_body.map((e, k) => {
          this.showPayback.push(false);

          this.paybackTable[2].children.push({
            total: [
              e.base.xiaoji.month_1,
              e.base.xiaoji.month_2,
              e.base.xiaoji.month_3,
              e.base.xiaoji.month_4,
              e.base.xiaoji.month_5,
              e.base.xiaoji.month_6,
              e.base.xiaoji.month_7,
              e.base.xiaoji.month_8,
              e.base.xiaoji.month_9,
              e.base.xiaoji.month_10,
              e.base.xiaoji.month_11,
              e.base.xiaoji.month_12,
            ],
            children: [],
          });
          this.paybackTable[0].children.push({
            value: e.base.xiaoji.zhutiTypeName,
            total: "资金流入小计",
            children: [],
          });
          this.paybackTable[1].children.push({
            total: e.base.xiaoji.month_0,
            children: [],
          });
          this.paybackTable[3].children.push({
            total: e.base.xiaoji.month_20,
            children: [],
          });
          this.paybackTable[4].children.push({
            total: e.base.xiaoji.month_30,
            children: [],
          });
          this.paybackTable[5].children.push({
            total: e.base.xiaoji.month_40,
            children: [],
          });
          this.paybackTable[6].children.push({
            total: e.base.xiaoji.month_50,
            children: [],
          });
          Object.keys(e.child).length &&
            (() => {
              for (let prop in e.child) {
                if (e.child[prop].child && Object.keys(e.child[prop].child)) {
                  this.paybackTable[2].children[k].children.push({
                    value: [
                      {
                        value: e.child[prop].base.month_1,
                        monthName: 1,
                      },
                      {
                        value: e.child[prop].base.month_2,
                        monthName: 2,
                      },
                      {
                        value: e.child[prop].base.month_3,
                        monthName: 3,
                      },
                      {
                        value: e.child[prop].base.month_4,
                        monthName: 4,
                      },
                      {
                        value: e.child[prop].base.month_5,
                        monthName: 5,
                      },
                      {
                        value: e.child[prop].base.month_6,
                        monthName: 6,
                      },
                      {
                        value: e.child[prop].base.month_7,
                        monthName: 7,
                      },
                      {
                        value: e.child[prop].base.month_8,
                        monthName: 8,
                      },
                      {
                        value: e.child[prop].base.month_9,
                        monthName: 9,
                      },
                      {
                        value: e.child[prop].base.month_10,
                        monthName: 10,
                      },
                      {
                        value: e.child[prop].base.month_11,
                        monthName: 11,
                      },
                      {
                        value: e.child[prop].base.month_12,
                        monthName: 12,
                      },
                    ],
                    children: [],
                  });
                  this.paybackTable[0].children[k].children.push({
                    value: e.child[prop].base.itemTypeName,
                    children: [],
                  });
                  this.paybackTable[1].children[k].children.push({
                    value: e.child[prop].base.month_0,
                    children: [],
                  });
                  this.paybackTable[3].children[k].children.push({
                    value: e.child[prop].base.month_20,
                    children: [],
                  });
                  this.paybackTable[4].children[k].children.push({
                    value: e.child[prop].base.month_30,
                    children: [],
                  });
                  this.paybackTable[5].children[k].children.push({
                    value: e.child[prop].base.month_40,
                    children: [],
                  });
                  this.paybackTable[6].children[k].children.push({
                    value: e.child[prop].base.month_50,
                    children: [],
                  });
                  for (let child in e.child[prop].child) {
                    this.paybackTable[0].children[k].children
                      .find((i) => i.children)
                      .children.push({
                        value: e.child[prop].child[child].itemTypeName,
                      });
                    if (e.child[prop].child[child].detailArr) {
                      // this.paybackTable[1].children[k].children
                      //   .find((i) => i.children)
                      //   .children.push({
                      //     value: e.child[prop].child[child].month_0,
                      //     modalType: e.base.xiaoji.sheetTypeName,
                      //     detailArr:
                      //       e.child[prop].child[child].detailArr.month_0,
                      //   });
                      // this.paybackTable[3].children[k].children
                      //   .find((i) => i.children)
                      //   .children.push({
                      //     value: e.child[prop].child[child].month_20,
                      //     modalType: e.base.xiaoji.sheetTypeName,
                      //     detailArr:
                      //       e.child[prop].child[child].detailArr.month_20,
                      //   });
                      // this.paybackTable[4].children[k].children
                      //   .find((i) => i.children)
                      //   .children.push({
                      //     value: e.child[prop].child[child].month_30,
                      //     modalType: e.base.xiaoji.sheetTypeName,
                      //     detailArr:
                      //       e.child[prop].child[child].detailArr.month_30,
                      //   });
                      // this.paybackTable[5].children[k].children
                      //   .find((i) => i.children)
                      //   .children.push({
                      //     value: e.child[prop].child[child].month_40,
                      //     modalType: e.base.xiaoji.sheetTypeName,
                      //     detailArr:
                      //       e.child[prop].child[child].detailArr.month_40,
                      //   });
                      // this.paybackTable[6].children[k].children
                      //   .find((i) => i.children)
                      //   .children.push({
                      //     value: e.child[prop].child[child].month_50,
                      //     modalType: e.base.xiaoji.sheetTypeName,
                      //     detailArr:
                      //       e.child[prop].child[child].detailArr.month_50,
                      //   });
                       this.paybackTable[1].children[k].children
                        .find((i) => i.children)
                        .children.push({
                          value: e.child[prop].child[child].month_0,
                        });
                      this.paybackTable[3].children[k].children
                        .find((i) => i.children)
                        .children.push({
                          value: e.child[prop].child[child].month_20,
                        });
                      this.paybackTable[4].children[k].children
                        .find((i) => i.children)
                        .children.push({
                          value: e.child[prop].child[child].month_30,
                        });
                      this.paybackTable[5].children[k].children
                        .find((i) => i.children)
                        .children.push({
                          value: e.child[prop].child[child].month_40,
                        });
                      this.paybackTable[6].children[k].children
                        .find((i) => i.value === e.child[prop].base.month_50)
                        .children.push({
                          value: e.child[prop].child[child].month_50,
                        });
                      this.paybackTable[2].children[k].children
                        .find((i) => i.children)
                        .children.push({
                          value: [
                            {
                              value: e.child[prop].child[child].month_1,
                              modalType: e.base.xiaoji.sheetTypeName,
                              detailArr:
                                e.child[prop].child[child].detailArr.month_1,
                            },
                            {
                              value: e.child[prop].child[child].month_2,
                              modalType: e.base.xiaoji.sheetTypeName,
                              detailArr:
                                e.child[prop].child[child].detailArr.month_2,
                            },
                            {
                              value: e.child[prop].child[child].month_3,
                              modalType: e.base.xiaoji.sheetTypeName,
                              detailArr:
                                e.child[prop].child[child].detailArr.month_3,
                            },
                            {
                              value: e.child[prop].child[child].month_4,
                              modalType: e.base.xiaoji.sheetTypeName,
                              detailArr:
                                e.child[prop].child[child].detailArr.month_4,
                            },
                            {
                              value: e.child[prop].child[child].month_5,
                              modalType: e.base.xiaoji.sheetTypeName,
                              detailArr:
                                e.child[prop].child[child].detailArr.month_5,
                            },
                            {
                              value: e.child[prop].child[child].month_6,
                              modalType: e.base.xiaoji.sheetTypeName,
                              detailArr:
                                e.child[prop].child[child].detailArr.month_6,
                            },
                            {
                              value: e.child[prop].child[child].month_7,
                              modalType: e.base.xiaoji.sheetTypeName,
                              detailArr:
                                e.child[prop].child[child].detailArr.month_7,
                            },
                            {
                              value: e.child[prop].child[child].month_8,
                              modalType: e.base.xiaoji.sheetTypeName,
                              detailArr:
                                e.child[prop].child[child].detailArr.month_8,
                            },
                            {
                              value: e.child[prop].child[child].month_9,
                              modalType: e.base.xiaoji.sheetTypeName,
                              detailArr:
                                e.child[prop].child[child].detailArr.month_9,
                            },
                            {
                              value: e.child[prop].child[child].month_10,
                              modalType: e.base.xiaoji.sheetTypeName,
                              detailArr:
                                e.child[prop].child[child].detailArr.month_10,
                            },
                            {
                              value: e.child[prop].child[child].month_11,
                              modalType: e.base.xiaoji.sheetTypeName,
                              detailArr:
                                e.child[prop].child[child].detailArr.month_11,
                            },
                            {
                              value: e.child[prop].child[child].month_12,
                              modalType: e.base.xiaoji.sheetTypeName,
                              detailArr:
                                e.child[prop].child[child].detailArr.month_12,
                            },
                          ],
                        });
                    } else {
                      this.paybackTable[1].children[k].children
                        .find((i) => i.children)
                        .children.push({
                          value: e.child[prop].child[child].month_0,
                        });
                      this.paybackTable[3].children[k].children
                        .find((i) => i.children)
                        .children.push({
                          value: e.child[prop].child[child].month_20,
                        });
                      this.paybackTable[4].children[k].children
                        .find((i) => i.children)
                        .children.push({
                          value: e.child[prop].child[child].month_30,
                        });
                      this.paybackTable[5].children[k].children
                        .find((i) => i.children)
                        .children.push({
                          value: e.child[prop].child[child].month_40,
                        });
                      this.paybackTable[6].children[k].children
                        .find((i) => i.value === e.child[prop].base.month_50)
                        .children.push({
                          value: e.child[prop].child[child].month_50,
                        });
                      this.paybackTable[2].children[k].children
                        .find((i) => i.children)
                        .children.push({
                          value: [
                          ],
                        });
                    }
                  }
                } else {
                  if (e.child[prop].sheetTypeId) {
                    this.paybackTable[2].children[k].children.push({
                      value: [
                        {
                          value: e.child[prop].month_1,
                          sheetTypeId: e.child[prop].sheetTypeId,
                          zhutiTypeId: e.child[prop].zhutiTypeId,
                          itemTypeId: e.child[prop].itemTypeId,
                          monthName: 1,
                        },
                        {
                          value: e.child[prop].month_2,
                          sheetTypeId: e.child[prop].sheetTypeId,
                          zhutiTypeId: e.child[prop].zhutiTypeId,
                          itemTypeId: e.child[prop].itemTypeId,
                          monthName: 2,
                        },
                        {
                          value: e.child[prop].month_3,
                          sheetTypeId: e.child[prop].sheetTypeId,
                          zhutiTypeId: e.child[prop].zhutiTypeId,
                          itemTypeId: e.child[prop].itemTypeId,
                          monthName: 3,
                        },
                        {
                          value: e.child[prop].month_4,
                          sheetTypeId: e.child[prop].sheetTypeId,
                          zhutiTypeId: e.child[prop].zhutiTypeId,
                          itemTypeId: e.child[prop].itemTypeId,
                          monthName: 4,
                        },
                        {
                          value: e.child[prop].month_5,
                          sheetTypeId: e.child[prop].sheetTypeId,
                          zhutiTypeId: e.child[prop].zhutiTypeId,
                          itemTypeId: e.child[prop].itemTypeId,
                          monthName: 5,
                        },
                        {
                          value: e.child[prop].month_6,
                          sheetTypeId: e.child[prop].sheetTypeId,
                          zhutiTypeId: e.child[prop].zhutiTypeId,
                          itemTypeId: e.child[prop].itemTypeId,
                          monthName: 6,
                        },
                        {
                          value: e.child[prop].month_7,
                          sheetTypeId: e.child[prop].sheetTypeId,
                          zhutiTypeId: e.child[prop].zhutiTypeId,
                          itemTypeId: e.child[prop].itemTypeId,
                          monthName: 7,
                        },
                        {
                          value: e.child[prop].month_8,
                          sheetTypeId: e.child[prop].sheetTypeId,
                          zhutiTypeId: e.child[prop].zhutiTypeId,
                          itemTypeId: e.child[prop].itemTypeId,
                          monthName: 8,
                        },
                        {
                          value: e.child[prop].month_9,
                          sheetTypeId: e.child[prop].sheetTypeId,
                          zhutiTypeId: e.child[prop].zhutiTypeId,
                          itemTypeId: e.child[prop].itemTypeId,
                          monthName: 9,
                        },
                        {
                          value: e.child[prop].month_10,
                          sheetTypeId: e.child[prop].sheetTypeId,
                          zhutiTypeId: e.child[prop].zhutiTypeId,
                          itemTypeId: e.child[prop].itemTypeId,
                          monthName: 10,
                        },
                        {
                          value: e.child[prop].month_11,
                          sheetTypeId: e.child[prop].sheetTypeId,
                          zhutiTypeId: e.child[prop].zhutiTypeId,
                          itemTypeId: e.child[prop].itemTypeId,
                          monthName: 11,
                        },
                        {
                          value: e.child[prop].month_12,
                          sheetTypeId: e.child[prop].sheetTypeId,
                          zhutiTypeId: e.child[prop].zhutiTypeId,
                          itemTypeId: e.child[prop].itemTypeId,
                          monthName: 12,
                        },
                      ],
                    });
                  } else if (e.child[prop].detailArr) {
                    this.paybackTable[2].children[k].children.push({
                      value: [
                        {
                          value: e.child[prop].month_1,
                          modalType: e.base.xiaoji.sheetTypeName,
                          detailArr: e.child[prop].detailArr.month_1,
                        },
                        {
                          value: e.child[prop].month_2,
                          modalType: e.base.xiaoji.sheetTypeName,
                          detailArr: e.child[prop].detailArr.month_2,
                        },
                        {
                          value: e.child[prop].month_3,
                          modalType: e.base.xiaoji.sheetTypeName,
                          detailArr: e.child[prop].detailArr.month_3,
                        },
                        {
                          value: e.child[prop].month_4,
                          modalType: e.base.xiaoji.sheetTypeName,
                          detailArr: e.child[prop].detailArr.month_4,
                        },
                        {
                          value: e.child[prop].month_5,
                          modalType: e.base.xiaoji.sheetTypeName,
                          detailArr: e.child[prop].detailArr.month_5,
                        },
                        {
                          value: e.child[prop].month_6,
                          modalType: e.base.xiaoji.sheetTypeName,
                          detailArr: e.child[prop].detailArr.month_6,
                        },
                        {
                          value: e.child[prop].month_7,
                          modalType: e.base.xiaoji.sheetTypeName,
                          detailArr: e.child[prop].detailArr.month_7,
                        },
                        {
                          value: e.child[prop].month_8,
                          modalType: e.base.xiaoji.sheetTypeName,
                          detailArr: e.child[prop].detailArr.month_8,
                        },
                        {
                          value: e.child[prop].month_9,
                          modalType: e.base.xiaoji.sheetTypeName,
                          detailArr: e.child[prop].detailArr.month_9,
                        },
                        {
                          value: e.child[prop].month_10,
                          modalType: e.base.xiaoji.sheetTypeName,
                          detailArr: e.child[prop].detailArr.month_10,
                        },
                        {
                          value: e.child[prop].month_11,
                          modalType: e.base.xiaoji.sheetTypeName,
                          detailArr: e.child[prop].detailArr.month_11,
                        },
                        {
                          value: e.child[prop].month_12,
                          modalType: e.base.xiaoji.sheetTypeName,
                          detailArr: e.child[prop].detailArr.month_12,
                        },
                      ],
                    });
                  } else {
                    this.paybackTable[2].children[k].children.push({
                      value: [
                        {
                          value: e.child[prop].month_1,
                          monthName: 1,
                        },
                        {
                          value: e.child[prop].month_2,
                          monthName: 2,
                        },
                        {
                          value: e.child[prop].month_3,
                          monthName: 3,
                        },
                        {
                          value: e.child[prop].month_4,
                          monthName: 4,
                        },
                        {
                          value: e.child[prop].month_5,
                          monthName: 5,
                        },
                        {
                          value: e.child[prop].month_6,
                          monthName: 6,
                        },
                        {
                          value: e.child[prop].month_7,
                          monthName: 7,
                        },
                        {
                          value: e.child[prop].month_8,
                          monthName: 8,
                        },
                        {
                          value: e.child[prop].month_9,
                          monthName: 9,
                        },
                        {
                          value: e.child[prop].month_10,
                          monthName: 10,
                        },
                        {
                          value: e.child[prop].month_11,
                          monthName: 11,
                        },
                        {
                          value: e.child[prop].month_12,
                          monthName: 12,
                        },
                      ],
                    });
                  }

                  this.paybackTable[0].children[k].children.push({
                    value: e.child[prop].itemTypeName,
                  });

                  if (e.child[prop].sheetTypeId) {
                    this.paybackTable[1].children[k].children.push({
                      value: e.child[prop].month_0,
                      sheetTypeId: e.child[prop].sheetTypeId,
                      zhutiTypeId: e.child[prop].zhutiTypeId,
                      itemTypeId: e.child[prop].itemTypeId,
                      monthName: 0,
                    });
                  } 
                  // else if (e.child[prop].detailArr) {
                  //   this.paybackTable[1].children[k].children.push({
                  //     value: e.child[prop].month_0,
                  //     detailArr: e.child[prop].detailArr.month_0,
                  //     modalType: e.base.xiaoji.sheetTypeName,
                  //   });
                  // }
                   else {
                    this.paybackTable[1].children[k].children.push({
                      value: e.child[prop].month_0,
                    });
                  }

                  // if (e.child[prop].detailArr) {
                  //   this.paybackTable[4].children[k].children.push({
                  //     value: e.child[prop].month_30,
                  //     detailArr: e.child[prop].detailArr.month_30,
                  //     modalType: e.base.xiaoji.sheetTypeName,
                  //   });
                  //   this.paybackTable[5].children[k].children.push({
                  //     value: e.child[prop].month_40,
                  //     detailArr: e.child[prop].detailArr.month_40,
                  //     modalType: e.base.xiaoji.sheetTypeName,
                  //   });
                  //   this.paybackTable[6].children[k].children.push({
                  //     value: e.child[prop].month_50,
                  //     detailArr: e.child[prop].detailArr.month_50,
                  //     modalType: e.base.xiaoji.sheetTypeName,
                  //   });
                  // } else {
                    this.paybackTable[4].children[k].children.push({
                      value: e.child[prop].month_30,
                    });
                    this.paybackTable[5].children[k].children.push({
                      value: e.child[prop].month_40,
                    });
                    this.paybackTable[6].children[k].children.push({
                      value: e.child[prop].month_50,
                    });
                  // }

                  if (e.child[prop].sheetTypeId) {
                    this.paybackTable[3].children[k].children.push({
                      value: e.child[prop].month_20,
                      sheetTypeId: e.child[prop].sheetTypeId,
                      zhutiTypeId: e.child[prop].zhutiTypeId,
                      itemTypeId: e.child[prop].itemTypeId,
                      monthName: 20,
                    });
                  } 
                  // else if (e.child[prop].detailArr) {
                  //   this.paybackTable[3].children[k].children.push({
                  //     value: e.child[prop].month_20,
                  //     detailArr: e.child[prop].detailArr.month_20,
                  //     modalType: e.base.xiaoji.sheetTypeName,
                  //   });
                  // } 
                  else {
                    this.paybackTable[3].children[k].children.push({
                      value: e.child[prop].month_20,
                    });
                  }

                }
              }
            })();
        });

        !!sheet_3_xiaoji &&
          !!Object.keys(sheet_3_xiaoji).length &&
          (() => {
            this.paybackTable[1].total = sheet_3_xiaoji.month_0;
            this.paybackTable[2].total = this.paybackTable[2].value.map(
              (i, k) => {
                return sheet_3_xiaoji[`month_${k + 1}`];
              }
            );
            this.paybackTable[3].total = sheet_3_xiaoji.month_20;
            this.paybackTable[4].total = sheet_3_xiaoji.month_30;
            this.paybackTable[5].total = sheet_3_xiaoji.month_40;
            this.paybackTable[6].total = sheet_3_xiaoji.month_50;
          })();

        /* 支出 */
        Object.keys(sheet_4_xiaoji).length
          ? (this.showExpendTotal = true)
          : (this.showExpendTotal = false);

        sheet_4_body.map((e, k) => {
          this.showExpend.push([]);

          this.expendTable[2].children.push({
            total: [
              e.base.xiaoji.month_1,
              e.base.xiaoji.month_2,
              e.base.xiaoji.month_3,
              e.base.xiaoji.month_4,
              e.base.xiaoji.month_5,
              e.base.xiaoji.month_6,
              e.base.xiaoji.month_7,
              e.base.xiaoji.month_8,
              e.base.xiaoji.month_9,
              e.base.xiaoji.month_10,
              e.base.xiaoji.month_11,
              e.base.xiaoji.month_12,
            ],
            children: [],
          });
          this.expendTable[0].children.push({
            value: e.base.xiaoji.zhutiTypeName,
            total: "资金流出小计",
            children: [],
          });
          this.expendTable[1].children.push({
            total: e.base.xiaoji.month_0,
            children: [],
          });
          this.expendTable[3].children.push({
            total: e.base.xiaoji.month_20,
            children: [],
          });
          this.expendTable[4].children.push({
            total: e.base.xiaoji.month_30,
            children: [],
          });
          this.expendTable[5].children.push({
            total: e.base.xiaoji.month_40,
            children: [],
          });
          this.expendTable[6].children.push({
            total: e.base.xiaoji.month_50,
            children: [],
          });
          Object.keys(e.child).length &&
            (() => {
              Object.values(e.child).forEach((item, index) => {
                if (item.child && Object.keys(item.child)) {
                  this.showExpend[k].push(false);
                  this.expendTable[2].children[k].children.push({
                    value: [
                      item.base.month_1,
                      item.base.month_2,
                      item.base.month_3,
                      item.base.month_4,
                      item.base.month_5,
                      item.base.month_6,
                      item.base.month_7,
                      item.base.month_8,
                      item.base.month_9,
                      item.base.month_10,
                      item.base.month_11,
                      item.base.month_12,
                    ],
                    children: [],
                  });
                  this.expendTable[0].children[k].children.push({
                    value: item.base.itemTypeName,
                    children: [],
                  });
                  this.expendTable[1].children[k].children.push({
                    value: item.base.month_0,
                    children: [],
                  });
                  this.expendTable[3].children[k].children.push({
                    value: item.base.month_20,
                    children: [],
                  });
                  this.expendTable[4].children[k].children.push({
                    value: item.base.month_30,
                    children: [],
                  });
                  this.expendTable[5].children[k].children.push({
                    value: item.base.month_40,
                    children: [],
                  });
                  this.expendTable[6].children[k].children.push({
                    value: item.base.month_50,
                    children: [],
                  });
                  for (let child in item.child) {
                    if (item.child[child].sheetTypeId) {
                      this.expendTable[2].children[k].children[
                        index
                      ].children.push({
                        value: [
                          {
                            value: item.child[child].month_1,
                            sheetTypeId: item.child[child].sheetTypeId,
                            zhutiTypeId: item.child[child].zhutiTypeId,
                            itemTypeId: item.child[child].itemTypeId,
                            monthName: 1,
                          },
                          {
                            value: item.child[child].month_2,
                            sheetTypeId: item.child[child].sheetTypeId,
                            zhutiTypeId: item.child[child].zhutiTypeId,
                            itemTypeId: item.child[child].itemTypeId,
                            monthName: 2,
                          },
                          {
                            value: item.child[child].month_3,
                            sheetTypeId: item.child[child].sheetTypeId,
                            zhutiTypeId: item.child[child].zhutiTypeId,
                            itemTypeId: item.child[child].itemTypeId,
                            monthName: 3,
                          },
                          {
                            value: item.child[child].month_4,
                            sheetTypeId: item.child[child].sheetTypeId,
                            zhutiTypeId: item.child[child].zhutiTypeId,
                            itemTypeId: item.child[child].itemTypeId,
                            monthName: 4,
                          },
                          {
                            value: item.child[child].month_5,
                            sheetTypeId: item.child[child].sheetTypeId,
                            zhutiTypeId: item.child[child].zhutiTypeId,
                            itemTypeId: item.child[child].itemTypeId,
                            monthName: 5,
                          },
                          {
                            value: item.child[child].month_6,
                            sheetTypeId: item.child[child].sheetTypeId,
                            zhutiTypeId: item.child[child].zhutiTypeId,
                            itemTypeId: item.child[child].itemTypeId,
                            monthName: 6,
                          },
                          {
                            value: item.child[child].month_7,
                            sheetTypeId: item.child[child].sheetTypeId,
                            zhutiTypeId: item.child[child].zhutiTypeId,
                            itemTypeId: item.child[child].itemTypeId,
                            monthName: 7,
                          },
                          {
                            value: item.child[child].month_8,
                            sheetTypeId: item.child[child].sheetTypeId,
                            zhutiTypeId: item.child[child].zhutiTypeId,
                            itemTypeId: item.child[child].itemTypeId,
                            monthName: 8,
                          },
                          {
                            value: item.child[child].month_9,
                            sheetTypeId: item.child[child].sheetTypeId,
                            zhutiTypeId: item.child[child].zhutiTypeId,
                            itemTypeId: item.child[child].itemTypeId,
                            monthName: 9,
                          },
                          {
                            value: item.child[child].month_10,
                            sheetTypeId: item.child[child].sheetTypeId,
                            zhutiTypeId: item.child[child].zhutiTypeId,
                            itemTypeId: item.child[child].itemTypeId,
                            monthName: 10,
                          },
                          {
                            value: item.child[child].month_11,
                            sheetTypeId: item.child[child].sheetTypeId,
                            zhutiTypeId: item.child[child].zhutiTypeId,
                            itemTypeId: item.child[child].itemTypeId,
                            monthName: 11,
                          },
                          {
                            value: item.child[child].month_12,
                            sheetTypeId: item.child[child].sheetTypeId,
                            zhutiTypeId: item.child[child].zhutiTypeId,
                            itemTypeId: item.child[child].itemTypeId,
                            monthName: 12,
                          },
                        ],
                      });
                    } else if (item.child[child].detailArr) {
                       this.expendTable[2].children[k].children[
                        index
                      ].children.push({
                        value: [
                          {
                            value: item.child[child].month_1,
                          modalType: item.child[child].itemTypeName,
                          detailArr: item.child[child].detailArr.month_1
                          },
                          {
                            value: item.child[child].month_2,
                          modalType: item.child[child].itemTypeName,
                          detailArr: item.child[child].detailArr.month_2
                          },
                          {
                            value: item.child[child].month_3,
                          modalType: item.child[child].itemTypeName,
                          detailArr: item.child[child].detailArr.month_3
                          },
                          {
                            value: item.child[child].month_4,
                          modalType: item.child[child].itemTypeName,
                          detailArr: item.child[child].detailArr.month_4
                          },
                          {
                            value: item.child[child].month_5,
                          modalType: item.child[child].itemTypeName,
                          detailArr: item.child[child].detailArr.month_5
                          },
                          {
                            value: item.child[child].month_6,
                          modalType: item.child[child].itemTypeName,
                          detailArr: item.child[child].detailArr.month_6
                          },
                          {
                            value: item.child[child].month_7,
                          modalType: item.child[child].itemTypeName,
                          detailArr: item.child[child].detailArr.month_7
                          },
                          {
                            value: item.child[child].month_8,
                          modalType: item.child[child].itemTypeName,
                          detailArr: item.child[child].detailArr.month_8
                          },
                          {
                            value: item.child[child].month_9,
                          modalType: item.child[child].itemTypeName,
                          detailArr: item.child[child].detailArr.month_9
                          },
                          {
                            value: item.child[child].month_10,
                            modalType: item.child[child].itemTypeName,
                            detailArr: item.child[child].detailArr.month_10
                          },
                          {
                            value: item.child[child].month_11,
                            modalType: item.child[child].itemTypeName,
                            detailArr: item.child[child].detailArr.month_11
                          },
                          {
                            value: item.child[child].month_12,
                            modalType: item.child[child].itemTypeName,
                            detailArr: item.child[child].detailArr.month_12
                          },
                        ],
                      });
                    } else {
                      this.expendTable[2].children[k].children[
                        index
                      ].children.push({
                        value: [
                          {
                            value: item.child[child].month_1,
                            monthName: 1,
                          },
                          {
                            value: item.child[child].month_2,
                            monthName: 2,
                          },
                          {
                            value: item.child[child].month_3,
                            monthName: 3,
                          },
                          {
                            value: item.child[child].month_4,
                            monthName: 4,
                          },
                          {
                            value: item.child[child].month_5,
                            monthName: 5,
                          },
                          {
                            value: item.child[child].month_6,
                            monthName: 6,
                          },
                          {
                            value: item.child[child].month_7,
                            monthName: 7,
                          },
                          {
                            value: item.child[child].month_8,
                            monthName: 8,
                          },
                          {
                            value: item.child[child].month_9,
                            monthName: 9,
                          },
                          {
                            value: item.child[child].month_10,
                            monthName: 10,
                          },
                          {
                            value: item.child[child].month_11,
                            monthName: 11,
                          },
                          {
                            value: item.child[child].month_12,
                            monthName: 12,
                          },
                        ],
                      });
                    }

                    this.expendTable[0].children[k].children[
                      index
                    ].children.push({
                      value: item.child[child].itemTypeName,
                    });
                    if (item.child[child].sheetTypeId) {
                      this.expendTable[1].children[k].children[
                        index
                      ].children.push({
                        value: item.child[child].month_0,
                        sheetTypeId: item.child[child].sheetTypeId,
                        zhutiTypeId: item.child[child].zhutiTypeId,
                        itemTypeId: item.child[child].itemTypeId,
                        monthName: 0,
                      });
                      this.expendTable[3].children[k].children[
                        index
                      ].children.push({
                        value: item.child[child].month_20,
                        sheetTypeId: item.child[child].sheetTypeId,
                        zhutiTypeId: item.child[child].zhutiTypeId,
                        itemTypeId: item.child[child].itemTypeId,
                        monthName: 20,
                      });
                    } 
                    // else if (item.child[child].detailArr) {
                    //   this.expendTable[1].children[k].children[
                    //     index
                    //   ].children.push({
                    //     value: item.child[child].month_0,
                    //     modalType: item.child[child].itemTypeName,
                    //     detailArr: item.child[child].detailArr.month_0,
                    //   });
                    //   this.expendTable[3].children[k].children[
                    //     index
                    //   ].children.push({
                    //     value: item.child[child].month_20,
                    //     modalType: item.child[child].itemTypeName,
                    //     detailArr: item.child[child].detailArr.month_20,
                    //   });
                    // } 
                    else {
                      this.expendTable[1].children[k].children[
                        index
                      ].children.push({
                        value: item.child[child].month_0,
                      });
                      this.expendTable[3].children[k].children[
                        index
                      ].children.push({
                        value: item.child[child].month_20,
                      });
                    }

                    // if (item.child[child].detailArr) {
                    //   this.expendTable[4].children[k].children[
                    //     index
                    //   ].children.push({
                    //     value: item.child[child].month_30,
                    //     modalType: item.child[child].itemTypeName,
                    //     detailArr: item.child[child].detailArr.month_30,
                    //   });
                    //   this.expendTable[5].children[k].children[
                    //     index
                    //   ].children.push({
                    //     value: item.child[child].month_40,
                    //     modalType: item.child[child].itemTypeName,
                    //     detailArr: item.child[child].detailArr.month_40,
                    //   });
                    //   this.expendTable[6].children[k].children[
                    //     index
                    //   ].children.push({
                    //     value: item.child[child].month_50,
                    //     modalType: item.child[child].itemTypeName,
                    //     detailArr: item.child[child].detailArr.month_50,
                    //   });
                    // } else {
                      this.expendTable[4].children[k].children[
                        index
                      ].children.push({
                        value: item.child[child].month_30,
                      });
                      this.expendTable[5].children[k].children[
                        index
                      ].children.push({
                        value: item.child[child].month_40,
                      });
                      this.expendTable[6].children[k].children[
                        index
                      ].children.push({
                        value: item.child[child].month_50,
                      });
                    // }
                  }
                } else {
                  this.expendTable[2].children[k].children.push({
                    value: [
                      item.month_1,
                      item.month_2,
                      item.month_3,
                      item.month_4,
                      item.month_5,
                      item.month_6,
                      item.month_7,
                      item.month_8,
                      item.month_9,
                      item.month_10,
                      item.month_11,
                      item.month_12,
                    ],
                  });
                  this.expendTable[0].children[k].children.push({
                    value: item.itemTypeName,
                  });
                  this.expendTable[1].children[k].children.push({
                    value: item.month_0,
                  });
                  this.expendTable[3].children[k].children.push({
                    value: item.month_20,
                  });
                  this.expendTable[4].children[k].children.push({
                    value: item.month_30,
                  });
                  this.expendTable[5].children[k].children.push({
                    value: item.month_40,
                  });
                  this.expendTable[6].children[k].children.push({
                    value: item.month_50,
                  });
                }
              });
            })();
        });

        !!sheet_4_xiaoji &&
          !!Object.keys(sheet_4_xiaoji).length &&
          (() => {
            this.expendTable[1].total = sheet_4_xiaoji.month_0;
            this.expendTable[2].total = this.expendTable[2].value.map(
              (i, k) => {
                return sheet_4_xiaoji[`month_${k + 1}`];
              }
            );
            this.expendTable[3].total = sheet_4_xiaoji.month_20;
            this.expendTable[4].total = sheet_4_xiaoji.month_30;
            this.expendTable[5].total = sheet_4_xiaoji.month_40;
            this.expendTable[6].total = sheet_4_xiaoji.month_50;
          })();
      } else {
        this.nodata = true;
      }
    },
  },
  created() {
    this.getFcList();
  },
};
</script>