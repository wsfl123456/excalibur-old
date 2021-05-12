<template>
  <div class="report-page">
    <div class="form-box-wrapper">
      <div class="form-box">
        <div class="input-item">
          <p class="name">事业部</p>
          <div class="input-inner">
            <el-select v-model="searchParams.department" filterable placeholder="请选择事业部">
              <el-option v-for="item in departments" :key="item.teamId" :value="item.teamId" :label="item.teamName"></el-option>
            </el-select>
          </div>
        </div>
        <div class="input-item">
          <p class="name">时间</p>
          <div class="input-inner">
            <el-date-picker
              type="year"
              v-model="searchParams.year"
              placeholder="请选择年份">
            </el-date-picker>
          </div>
        </div>
      </div>

      <el-button type="primary" icon="el-icon-search" @click="queryTableData">搜索</el-button>
      <el-button type="primary" icon="el-icon-download" @click="queryTableData(true)">导出</el-button>
    </div>

    <ce-table
      border
      :data="tableData"
      row-class-name="colorful"
      class="ce-report-table"
      v-loading="tableLoading">
    </ce-table>
  </div>
</template>

<script type="text/jsx">
  import './index.less';
  import { Create } from 'vuejs2-datatable';
  import { Task } from "../../API/api";
  import { thousandSplit } from "../../util/util";

  function renderPopoverFactory(month) {
    return function (h, i, v) {
      const popoverConst = {
        0: 'colEarning',
        1: 'colOutsourcing',
        2: 'costMX_方案',
        3: 'costMX_方案_整合方案',
        4: 'costMX_方案_策略方案',
        5: 'costMX_方案_创意方案',
        6: 'costMX_方案_传播方案',
        7: 'costMX_方案_技术方案',
        8: 'costMX_方案_媒介方案',
        9: 'costMX_方案_IP方案',
        10: 'costMX_项目管理',
        11: 'costMX_项目管理_创意项目管理',
        12: 'costMX_项目管理_技术项目管理',
        13: 'costMX_项目管理_媒介项目管理',
        14: 'costMX_项目管理_IP项目管理',
        15: 'costMX_项目管理_数据项目管理',
        16: 'costMX_创意执行',
        17: 'costMX_创意执行_文案撰写',
        18: 'costMX_创意执行_美术设计',
        19: 'costMX_创意执行_插画',
        20: 'costMX_创意执行_视频制作',
        21: 'costMX_创意执行_模特费用',
        22: 'costMX_创意执行_平面拍摄',
        23: 'costMX_创意执行_精修图片',
        24: 'costMX_创意执行_其他',
        25: 'costMX_媒介执行',
        26: 'costMX_媒介执行_媒介采购',
        27: 'costMX_媒介执行_其他',
        28: 'costMX_IP执行',
        29: 'costMX_IP执行_IP采购',
        30: 'costMX_IP执行_KOL采购',
        31: 'costMX_IP执行_其他',
        32: 'costMX_技术执行',
        33: 'costMX_技术执行_UI制作',
        34: 'costMX_手动类别',
        35: 'costMX_手动类别_其他',
        36: 'colBaoxiao',
        37: 'baoxiaoMingXi14',
        38: 'baoxiaoMingXi7',
        39: 'baoxiaoMingXi13',
        40: 'baoxiaoMingXi5',
        41: 'baoxiaoMingXi3',
        42: 'baoxiaoMingXi4',
        43: 'baoxiaoMingXi2',
        44: 'baoxiaoMingXi11',
        45: 'baoxiaoMingXi6',
        46: 'baoxiaoMingXi8',
        47: 'baoxiaoMingXi9',
        48: 'baoxiaoMingXi10',
        49: 'baoxiaoMingXi12',
        50: 'baoxiaoMingXi1',
        51: 'baoxiaoMingXi15',
        52: 'colCostTotal',
        55: 'marginInfo',
        57: 'arInfo',
        58: 'apInfo',
      };  // 0: 营业收入, 1: 外发成本, 以此类推

      const normalTable = [
        {
          width: '400',
          prop: 'projectName',
          label: '项目名称'
        },
        {
          width: '120',
          prop: 'price',
          label: '金额'
        }
      ];
      const popoverTypeColumnList = {
        colEarning: [
          {
            width: '80',
            prop: 'customerName',
            label: '品牌名称 '
          },
          {
            width: '300',
            prop: 'projectName',
            label: '项目名称'
          },
          {
            width: '400',
            prop: 'contactsName',
            label: '合同名称'
          },
          {
            width: '120',
            prop: 'price',
            label: '金额 '
          }
        ],
        colOutsourcing: [
          {
            width: '180',
            prop: 'supplierName',
            label: '供应商名称'
          },
          {
            width: '300',
            prop: 'projectName',
            label: '项目名称'
          },
          {
            width: '400',
            prop: 'contactsName',
            label: '合同名称'
          },
          {
            width: '120',
            prop: 'price',
            label: '金额'
          }
        ],
        colBaoxiao: normalTable,
        colCostTotal: normalTable,
        marginInfo: normalTable,
        arInfo: normalTable,
        apInfo: normalTable,
        'costMX_方案': normalTable,
        'costMX_方案_整合方案': normalTable,
        'costMX_方案_策略方案': normalTable,
        'costMX_方案_创意方案': normalTable,
        'costMX_方案_传播方案': normalTable,
        'costMX_方案_技术方案': normalTable,
        'costMX_方案_媒介方案': normalTable,
        'costMX_方案_IP方案': normalTable,
        'costMX_项目管理': normalTable,
        'costMX_项目管理_创意项目管理': normalTable,
        'costMX_项目管理_技术项目管理': normalTable,
        'costMX_项目管理_媒介项目管理': normalTable,
        'costMX_项目管理_IP项目管理': normalTable,
        'costMX_项目管理_数据项目管理': normalTable,
        'costMX_创意执行': normalTable,
        'costMX_创意执行_文案撰写': normalTable,
        'costMX_创意执行_美术设计': normalTable,
        'costMX_创意执行_插画': normalTable,
        'costMX_创意执行_视频制作': normalTable,
        'costMX_创意执行_模特费用': normalTable,
        'costMX_创意执行_平面拍摄': normalTable,
        'costMX_创意执行_精修图片': normalTable,
        'costMX_创意执行_其他': normalTable,
        'costMX_媒介执行': normalTable,
        'costMX_媒介执行_媒介采购': normalTable,
        'costMX_媒介执行_其他': normalTable,
        'costMX_IP执行': normalTable,
        'costMX_IP执行_IP采购': normalTable,
        'costMX_IP执行_KOL采购': normalTable,
        'costMX_IP执行_其他': normalTable,
        'costMX_技术执行': normalTable,
        'costMX_技术执行_UI制作': normalTable,
        'costMX_手动类别': normalTable,
        'costMX_手动类别_其他': normalTable,
        'baoxiaoMingXi14': normalTable,
        'baoxiaoMingXi7': normalTable,
        'baoxiaoMingXi13': normalTable,
        'baoxiaoMingXi5': normalTable,
        'baoxiaoMingXi3': normalTable,
        'baoxiaoMingXi4': normalTable,
        'baoxiaoMingXi2': normalTable,
        'baoxiaoMingXi11': normalTable,
        'baoxiaoMingXi6': normalTable,
        'baoxiaoMingXi8': normalTable,
        'baoxiaoMingXi9': normalTable,
        'baoxiaoMingXi10': normalTable,
        'baoxiaoMingXi12': normalTable,
        'baoxiaoMingXi1': normalTable,
        'baoxiaoMingXi15': normalTable,
      };

      const popoverType = popoverConst[i];
      const popoverTypeColumn = popoverTypeColumnList[popoverType];
      const vm = this.$parent;

      const popoverHover = () => {
        const params = {
          lineName: popoverType,
          month: month,
          year: new Date(vm.searchParams.year).getFullYear(),
          teamId: vm.searchParams.department
        };

        vm.popoverParams.isLoading = true;
        this.$http.post(Task.cwcelistinfo, this.qs.stringify(params), {headers: {Authorization: "Bearer " + this.$cookie.get("token")}})
          .then(res => {
            const data = res.data.retData.listInfo;
            data.forEach(i => {
              const m = parseFloat(i.price);
              i.price = isNaN(m) ? '' : thousandSplit(m.toFixed(2) + '');
            });
            vm.popoverParams.tableData = data;
          })
          .catch(() => {
            vm.popoverParams.tableData = [];
          })
          .finally(() => {
            vm.popoverParams.isLoading = false;
          })
      };
      const directives = [
        { name: 'loading', value: vm.popoverParams.isLoading }
      ];

      if (popoverType) {
        return (
          <el-popover trigger="click" placement="right" onShow={popoverHover}>
            <el-table ref="popoverTable" data={vm.popoverParams.tableData} {...{directives}} max-height="550">
              { popoverTypeColumn.map(item => (<el-table-column width={item.width} prop={item.prop} label={item.label}></el-table-column>))}
            </el-table>
            <span slot="reference">{v}</span>
          </el-popover>
        );
      }else {
        return v;
      }
    };
  }

  const CeTable = Create([
    {
      width: 120,
      label: 'ITEM',
      prop: 'name',
      render(h, i, v) {
        return v.split(',').map(str => h('p', str));
      }
    },
    {
      width: 80,
      label: 'JAN',
      prop: 'jan',
      render: renderPopoverFactory(1)
    },
    {
      width: 80,
      label: 'FEB',
      prop: 'feb',
      render: renderPopoverFactory(2)
    },
    {
      width: 80,
      label: 'MAR',
      prop: 'mar',
      render: renderPopoverFactory(3)
    },
    {
      width: 80,
      label: 'ARP',
      prop: 'arp',
      render: renderPopoverFactory(4)
    },
    {
      width: 80,
      label: 'MAY',
      prop: 'may',
      render: renderPopoverFactory(5)
    },
    {
      width: 80,
      label: 'JUN',
      prop: 'jun',
      render: renderPopoverFactory(6)
    },
    {
      width: 80,
      label: 'JUL',
      prop: 'jul',
      render: renderPopoverFactory(7)
    },
    {
      width: 80,
      label: 'AUG',
      prop: 'aug',
      render: renderPopoverFactory(8)
    },
    {
      width: 80,
      label: 'SEP',
      prop: 'sep',
      render: renderPopoverFactory(9)
    },
    {
      width: 80,
      label: 'OCT',
      prop: 'oct',
      render: renderPopoverFactory(10)
    },
    {
      width: 80,
      label: 'NOV',
      prop: 'nov',
      render: renderPopoverFactory(11)
    },
    {
      width: 80,
      label: 'DEC',
      prop: 'dec',
      render: renderPopoverFactory(12)
    },
    {
      width: 80,
      label: 'TOTAL',
      prop: 'total',
      render: renderPopoverFactory('total')
    }
  ]);

  export default {
    name: 'ce',
    created() {
      this.queryTableData();
      this.getDepartments();
    },
    data() {
      return {
        popoverParams: {
          isLoading: false,
          tableData: [],
        },
        tableLoading: false,
        searchParams: {
          department: '',
          year: new Date()
        },
        tableData: [],
        departments: [{teamName: '全部'}],
        reportData: {
          /* 不要问我为什么格式是这样的。。。 */
          colEarning: {
            name: '营业收入'
          },
          colOutsourcing: {
            name: '外发成本'
          },
          'costMX_方案': {
            name: '方案'
          },
          'costMX_方案_整合方案': {
            name: '整合方案'
          },
          'costMX_方案_策略方案': {
            name: '策略方案'
          },
          'costMX_方案_创意方案': {
            name: '创意方案'
          },
          'costMX_方案_传播方案': {
            name: '传播方案'
          },
          'costMX_方案_技术方案': {
            name: '技术方案'
          },
          'costMX_方案_媒介方案': {
            name: '媒介方案'
          },
          'costMX_方案_IP方案': {
            name: 'IP方案'
          },
          'costMX_项目管理': {
            name: '项目管理'
          },
          'costMX_项目管理_创意项目管理': {
            name: '创意项目管理'
          },
          'costMX_项目管理_技术项目管理': {
            name: '技术项目管理'
          },
          'costMX_项目管理_媒介项目管理': {
            name: '媒介项目管理'
          },
          'costMX_项目管理_IP项目管理': {
            name: 'IP项目管理'
          },
          'costMX_项目管理_数据项目管理': {
            name: '数据项目管理'
          },
          'costMX_创意执行': {
            name: '创意执行'
          },
          'costMX_创意执行_文案撰写': {
            name: '文案撰写'
          },
          'costMX_创意执行_美术设计': {
            name: '美术设计'
          },
          'costMX_创意执行_插画': {
            name: '插画'
          },
          'costMX_创意执行_视频制作': {
            name: '视频制作'
          },
          'costMX_创意执行_模特费用': {
            name: '模特费用'
          },
          'costMX_创意执行_平面拍摄': {
            name: '平面拍摄'
          },
          'costMX_创意执行_精修图片': {
            name: '精修图片'
          },
          'costMX_创意执行_其他': {
            name: '其他'
          },
          'costMX_媒介执行': {
            name: '媒介执行'
          },
          'costMX_媒介执行_媒介采购': {
            name: '媒介采购'
          },
          'costMX_媒介执行_其他': {
            name: '其他'
          },
          'costMX_IP执行': {
             name: 'IP执行'
          },
          'costMX_IP执行_IP采购': {
            name: 'IP采购'
          },
          'costMX_IP执行_KOL采购': {
            name: 'KOL采购'
          },
          'costMX_IP执行_其他': {
            name: '其他'
          },
          'costMX_技术执行': {
            name: '技术执行'
          },
          'costMX_技术执行_UI制作': {
            name: 'UI制作'
          },
          'costMX_手动类别': {
            name: '手动类别'
          },
          'costMX_手动类别_其他': {
            name: '其他'
          },
          colBaoxiao: {
            name: '项目报销'
          },
          baoxiaoMingXi14: {
            name: '加班餐补'
          },
          baoxiaoMingXi7: {
            name: '差旅费'
          },
          baoxiaoMingXi13: {
            name: '固定资产'
          },
          baoxiaoMingXi5: {
            name: '低值易耗品'
          },
          baoxiaoMingXi3: {
            name: '业务招待费'
          },
          baoxiaoMingXi4: {
            name: '市内交通费'
          },
          // {
          //   name: '通讯费,Mobile Fee'
          // },
          baoxiaoMingXi2: {
            name: '快递费'
          },
          baoxiaoMingXi11: {
            name: '会务费'
          },
          baoxiaoMingXi6: {
            name: '服务费'
          },
          baoxiaoMingXi8: {
            name: '咨询费'
          },
          baoxiaoMingXi9: {
            name: '员工福利'
          },
          baoxiaoMingXi10: {
            name: '教育经费'
          },
          baoxiaoMingXi12: {
            name: '培训费'
          },
          baoxiaoMingXi1: {
            name: '办公费'
          },
          baoxiaoMingXi15: {
            name: '其他'
          },
          colCostTotal: {
            name: '总成本'
          },
          employeesInfo: {
            name: '员工数量'
          },
          costPerCapitaInfo: {
            name: '人均成本(元/人）'
          },
          marginInfo: {
            name: '毛利'
          },
          receiptInfo: {
            name: '发票开立'
          },
          arInfo: {
            name: '应收账款'
          },
          apInfo: {
            name: '应付账款'
          }
        }
      };
    },
    methods: {
      async getDepartments() {
        const res = await this.$http.post(Task.userteamlist, this.qs.stringify({powerType: 1}), {headers: {Authorization: "Bearer " + this.$cookie.get("token")}});
        const departments = res.data.retData.data;

        if (Array.isArray(departments)) this.departments = [...this.departments, ...departments];
      },
      async queryTableData(isExport) {
        this.tableLoading = true;

        const queryParams = {
          year: new Date(this.searchParams.year).getFullYear(),
          teamId: this.searchParams.department,
          isExport: isExport === true ? 1 : 0
        };
        const res = await this.$http.post(Task.cwcelist, this.qs.stringify(queryParams), {headers: {Authorization: "Bearer " + this.$cookie.get("token")}});

        /* 导出则打开窗口导出 */
        if (isExport === true) {
          const url = res.data.retData.download_url;
          window.open(url);
          return this.tableLoading = false;
        }

        /* 将业务对象数据转换成表格数组 */
        this.toTableDataFormat(res.data.retData);
        this.tableLoading = false;
      },
      toTableDataFormat(data) {
        let tableData = [];
        const months = ['jan', 'feb', 'mar', 'arp', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

        Object.keys(this.reportData).forEach(prop => {
          let tableItem = this.reportData[prop];

          months.forEach((m, i) => {
            /* 很无语的先转数字固定小数，再转字符加千分位分隔符 */
            const v = parseFloat(data[prop].month[i+1]);
            tableItem[m] = isNaN(v) ? '' : thousandSplit(v.toFixed(2) + '');
          });

          const total = parseFloat(data[prop].total);
          tableItem['total'] = isNaN(total) ? '' : thousandSplit(total.toFixed(2) + '');
          tableData.push(tableItem);
        });
        this.tableData = tableData;
      }
    },
    components: {
      CeTable
    }
  };
</script>
