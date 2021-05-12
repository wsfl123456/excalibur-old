export const formTips = {
  default: [
    {
      label: '基础Tips'
    },
    {
      label: '任务资料',
      type: 'input',
      name: 'task_info'
    },
    {
      label: '公盘地址',
      type: 'input',
      name: 'addr'
    },
    {
      label: '任务描述',
      type: 'textarea',
      name: 'task_desc'
    }
  ],
  451: [
    {
      label: ''
    }
  ],
  10: [
    {
      label: '基础Tips',
      name: 'base_tips'
    },
    {
      label: 'Mechanism',
      type: 'checkbox'
    },
    {
      label: 'Programming Requirements',
      type: 'checkbox'
    },
    {
      label: 'Video',
      type: 'checkbox'
    },
    {
      label: 'Versions',
      type: 'checkbox'
    },
    {
      label: 'Operation System',
      type: 'checkbox'
    },
    {
      label: 'Host',
      type: 'checkbox'
    },
    {
      label: 'Domain Name',
      type: 'checkbox'
    },
    {
      label: 'Tracking Agency',
      type: 'checkbox'
    },
    {
      label: 'Traffic',
      type: 'checkbox'
    },
    {
      label: 'Media',
      type: 'checkbox'
    },
    {
      label: 'Launch Time',
      type: 'datetime'
    },
    {
      label: 'Offline Time',
      type: 'datetime'
    },
    {
      label: 'Participant Info',
      type: 'checkbox'
    },
    {
      label: 'Incentive',
      type: 'textarea'
    }
  ],
  314: [
    {
      label: '基础Tips'
    }
  ],
  // 数据 - dashboard
  311: [
    {
      label: '基础Tips'
    },
    {
      label: '数据监测',
      type: 'input',
      name: 'project target'
    },
    {
      label: '定稿Layout',
      type: 'input',
      name: 'layout'
    },
    {
      label: '监测工具',
      type: 'input',
      name: 'monitor'
    },
    {
      label: '上线时间',
      type: 'datetime',
      name: 'online'
    },
    {
      label: '下线时间',
      type: 'datetime',
      name: 'offline'
    },
    {
      label: '第三方需求',
      type: 'input',
      name: 'project target'
    },
    {
      label: '关键字',
      type: 'input',
      name: 'keyword'
    },
    {
      label: '数据时间段',
      type: 'datetimerange',
      name: 'time'
    },
    {
      label: '预算范围',
      type: 'input',
      name: 'budget range'
    },
    {
      label: '需求时间',
      type: 'datetime',
      name: 'demand time'
    }
  ],
  // 行政-外出
  21: [
    {
      label: '基础Tips'
    },
    {
      label: '开始时间',
      type: 'datetime',
      name: 'start time'
    },
    {
      label: '同行人员',
      type: 'member',
      name: 'members'
    },
    {
      label: '外出类型',
      type: 'radio',
      name: 'type'
    },
    {
      label: '外出城市',
      type: 'city'
    }
  ],
  // 行政-快递
  22: [
    // {
    //   label: '基础Tips'
    // },
    {
      label: '收件地址',
      type: 'city'
    },
    {
      label: '任务资料',
      type: 'input',
      name: 'task_info'
    },
    {
      label: '公盘地址',
      type: 'input',
      name: 'addr'
    }
  ],
  // 财务-盖章
  27: [
    {
      label: '基础Tips'
    },
    {
      label: '合同类型'
    },
    {
      label: '合同名称'
    },
    {label: '甲方名称'},
    {label: '乙方名称'},
    {label: '合同金额'},
    {
      label: '任务资料',
      type: 'input',
      name: 'task_info'
    },
    {
      label: '公盘地址',
      type: 'input',
      name: 'addr'
    }
  ],
  // 财务-打款
  20: [
    {
      label: '基础Tips'
    },
    {
      label: '任务资料',
      type: 'input',
      name: 'task_info'
    },
    {
      label: '公盘地址',
      type: 'input',
      name: 'addr'
    }
  ],
  // 财务-开票
  19: [
    {
      label: '基础Tips'
    },
    {
      label: '任务资料',
      type: 'input',
      name: 'task_info'
    },
    {
      label: '公盘地址',
      type: 'input',
      name: 'addr'
    }
  ],
  // 财务-报销
  18: [
    {
      label: '基础Tips'
    }
  ],
  // 财务-报价单
  17: [
    {
      label: '基础Tips'
    },
    {label: '任务资料'},
    {label: '公盘地址'}
  ],
  // 财务-合同
  16: [
    {
      label: '基础Tips'
    },
    {
      label: '金额'
    },
    {
      label: '业务概述'
    }
    // {label: '合同名称'},
    // {label: '截止时间'},
    // {label: '文件类型'},
    // {label: '组织单位'},
    // {label: '肖像授权'},
    // {label: '甲方'},
    // {label: '乙方'}
  ],
  // 创意任务
  2: [
    {
      label: '基础Tips'
    },
    {
      label: '中心思想',
      type: 'input'
    },
    {
      label: '目的',
      type: 'input'
    },
    {
      label: '发布平台',
      type: 'checkbox',
      name: 'platform'
    },
    {
      label: '表现形式',
      type: 'radio',
      name: 'shape'
    },
    {label: '设计内容', type: 'input'},
    {label: '互动方式', type: 'input'},
    {label: '尺寸大小', type: 'input'},
    {label: '重点突出', type: 'input'},
    {label: '品牌禁忌', type: 'input'},
    {label: '授权字体', type: 'input'},
    {label: '授权图片', type: 'input'}
  ]
}
