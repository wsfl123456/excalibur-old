export const state = {
  /**
   * Index
   */
  bcrumb: [], // 面包屑
  primaryMenu: sessionStorage.getItem('primaryMenu') || '1',
  currSubMenu: sessionStorage.getItem('subMenu'),
  openedSub: sessionStorage.getItem('openedSub') ? sessionStorage.getItem('openedSub').indexOf('[') >= 0 ? JSON.parse(sessionStorage.getItem('openedSub')) : [] : [],
  subMenus: {
    profile: [
      {
        title: '我参加的培训',
        id: 57,
        name: 'my-train'
      },
      {
        title: '我的积分',
        icon: '',
        name: 'my-points'
      },
      {
        title: '个人信息管理',
        icon: '',
        name: 'profile'
      },
      {
        title: '系统安全设置',
        icon: '',
        name: 'setting'
      },
      {
        title: '消息提醒',
        icon: '',
        name: 'msg'
      },
      {
        title: '系统公告',
        id: 107,
        icon: '',
        name: 'sysNotice'
      }

    ],
    72: [
      {
        path: 'v2/resource/brand',
        title: '我的品牌',
        id: 4,
        name: 'brands'
      },
      {
        path: 'v2/resource/supplier',
        title: '我的供应商',
        id: 8,
        name: 'suppliers'
      },
      {
        title: '我的报销',
        id: 63,
        name: 'myReimburse'
      },
      {
        title: 'PR审批',
        name: 'PRAudit',
        id: 77,
        subMenus: []
      },
      {
        title: '我的设备',
        projectName: '我的设备',
        id: 31,
        icon: '',
        name: 'myDevice',
        subMenus: [
          {
            projectName: '设备清单',
            id: 32,
            name: 'list'
          },
          {
            projectName: '我的申请',
            id: 33,
            name: 'apply'
          }
        ]
      },
      {
        title: '人事管理',
        id: 12,
        name: '12',
        subMenus: [
          {
            title: '员工管理',
            projectName: '员工管理',
            id: 38,
            icon: '',
            name: 'employee',
            subMenus: [
              {
                projectName: '基本信息',
                id: 39,
                name: 'basic'
              },
              {
                projectName: '合同信息',
                id: 40,
                name: 'contract'
              }
            ]
          },
          {
            title: '薪资与奖金',
            projectName: '薪资与奖金',
            icon: '',
            id: 41,
            name: 'money',
            subMenus: [
              {
                projectName: '薪资管理',
                id: 42,
                name: 'salaryManage'
              },
              {
                projectName: '奖金管理',
                id: 43,
                name: 'bonusManage'
              }
            ]
          },
          {
            title: '考勤与假期',
            projectName: '考勤与假期',
            id: 44,
            icon: '',
            name: 'attend',
            subMenus: [
              {
                projectName: '员工考勤',
                id: 45,
                name: 'attendance'
              },
              {
                projectName: '员工假期',
                id: 46,
                name: 'vacation'
              }
            ]
          }
        ]
      },
      {
        id: 7,
        title: "财务管理",
        name: "financeManage",
        subMenus: [
          {
            id: 90,
            title: "合同",
            projectName: "合同",
            name: "contract",
            subMenus: [
              {
                id: 91,
                title: "客户合同",
                projectName: "客户合同",
                name: "clientContract"
              },
              {
                id: 92,
                title: "供应商合同",
                projectName: "供应商合同",
                name: "supplierContract"
              },
              // {
              //   id: 93,
              //   title: "报价单",
              //   projectName: "报价单",
              //   name: "quotation"
              // }
            ]
          },
          {
            id: 94,
            title: "财务凭证",
            projectName: "财务凭证",
            name: "financeCertificates",
            subMenus: [
              {
                title: "凭证管理",
                projectName: "凭证管理",
                name: "certificate"
              },
              {
                title: "可用发票",
                projectName: "可用发票",
                name: "invoice"
              }
            ]
          },
          {
            id: 95,
            title: "财务报表",
            projectName: "财务报表",
            name: "financeReport",
            subMenus: [
              {
                id: 119,
                title: "AR",
                projectName: "AR",
                name: "ar"
              },
              {
                id: 120,
                title: "AP",
                projectName: "AP",
                name: "ap"
              },
              {
                id: 121,
                title: "CE",
                projectName: "CE",
                name: "ce"
              },
              {
                id: 122,
                title: "Margin Sheet",
                projectName: "Margin Sheet",
                name: "marginSheet"
              },
              {
                id: 109,
                title: "BP",
                projectName: "BP",
                name: "bp"
              },
              {
                id: 123,
                title: "FC",
                projectName: "FC",
                name: "fc"
              },
            ]
          }
        ]
      },
      {
        title: '设备管理',
        projectName: '设备管理',
        id: 13,
        name: 'device',
        subMenus: [
          {
            title: '设备管理',
            id: 34,
            icon: '',
            name: 'deviceManage',
            subMenus: [
              {
                projectName: '设备清单',
                id: 35,
                name: 'list'
              },
              {
                projectName: '所有者管理',
                id: 36,
                name: 'owner'
              }
            ]
          },
          {
            title: '报修管理',
            projectName: '报修管理',
            id: 37,
            icon: '',
            name: 'repair'
          }
        ]
      },
      {
        title: '系统设置',
        id: 15,
        name: 'system',
        subMenus: [
          {
            title: '用户管理',
            projectName: '用户管理',
            icon: '',
            id: 20,
            name: 'userManage'
          },
          {
            title: '菜单配置管理',
            projectName: '菜单配置管理',
            id: 21,
            name: 'menuConfManage',
            subMenus: [
              {
                projectName: '菜单设置',
                id: 24,
                name: 'setting'
              },
              {
                projectName: '菜单权限',
                id: 25,
                name: 'role'
              }
            ]
          },
          {
            title: '功能配置管理',
            projectName: '功能配置管理',
            id: 22,
            name: 'functionManage',
            subMenus: [
              {
                path: 'v2/resource/livemap',
                projectName: '活点地图',
                id: 98,
                name: 'livemap'
              },
              {
                path: 'v2/resource/weaponry',
                projectName: '皇家兵器库',
                id: 104,
                name: 'weaponry'
              },
              {
                path: 'v2/resource/goldhouse',
                projectName: '黄金屋',
                id: 108,
                name: 'goldhouse'
              },
              {
                path: 'v2/resource/auditquestion',
                projectName: '提问审核',
                id: 112,
                name: 'auditquestion'
              },
              {
                path: 'v2/resource/answerquestion',
                projectName: '回答审核',
                id: 113,
                name: 'answerquestion'
              },
              {
                path: 'v2/resource/solution',
                projectName: '解决方案审核',
                id: 114,
                name: 'solution'
              },
              {
                projectName: '工具包管理',
                id: 26,
                name: 'toolkit'
              },
              {
                projectName: '业务审批人',
                id: 27,
                name: 'auditor'
              },
              {
                projectName: '会议配置',
                name: 'meeting',
                id: 28
              },
              {
                projectName: '设备类型',
                name: 'device',
                id: 29
              },
              {
                projectName: '公司部门设置',
                name: 'department',
                id: 30
              },
              {
                projectName: '事业部设置',
                name: 'hoshinUnit',
                id: 76
              }
            ]
          }
        ]
      }
    ],
    1: [
      {
        title: '我的项目',
        id: 58,
        icon: '',
        name: 'projects'
      },
      {
        title: '我的任务',
        id: 59,
        icon: '',
        name: 'tasks',
        subMenus: []
      }
    ],
    4: [
    ],
    8: [
    ],
    9: [
      {
        title: 'NCC小黄书',
        id: 99,
        name: '99',
        subMenus: [
          {
            title: '活点地图',
            id: 100,
            name: '100',
            subMenus: [
              {
                path: 'new/nccBook/map',
                projectName: '专业线',
                id: 101,
                name: '101'
              },
              {
                path: 'new/nccBook/map',
                projectName: '员工日常',
                id: 102,
                name: '102'
              }
            ]
          },
          {
            projectName: '皇家兵器库',
            id: 104,
            path: 'new/nccBook/store',
            name:'104'
          },
          {
            projectName: '黄金屋',
            id: 103,
            path: 'new/nccBook/house',
            name:'103'
          },
          {
            projectName: '问题悬赏榜',
            id: 111,
            path: 'new/nccBook/question',
            name:'111'
          },
        ]
      },
      {
        path: 'new/dri/index',
        title: 'DRI',
        id: 125,
        name: '125'
      },
      {
        title: '公司职级',
        icon: '',
        name: 'OX',
        id: 52,
        subMenus: [
          {
            projectName: '组织架构',
            id: 74,
            name: 'list'
          }
        ]
      },
      {
        title: '我的薪酬',
        icon: '',
        name: 'salary',
        id: 53,
        subMenus: [
          {
            projectName: '职级工资',
            id: 54,
            name: 'salary'
          },
          {
            projectName: '绩效收入',
            id: 55,
            name: 'bonus'
          }
        ]
      }
      // {
      //   title: '学习与成长',
      //   icon: '',
      //   name: 'study',
      //   id: 56,
      //   subMenus: [
      //     {
      //       projectName: '知识库',
      //       id: 67,
      //       name: 'tips'
      //     }
      //   ]
      // }
    ],
    10: [
      {
        title: '我的日程',
        icon: '',
        id: 47,
        name: 'schedule',
        subMenus: [
          {
            projectName: '日程管理',
            id: 48,
            name: 'manage'
          },
          {
            projectName: '会议管理',
            id: 66,
            name: 'meeting'
          }
        ]
      },
      {
        title: '考勤与假期',
        id: 75,
        name: 'vacation',
        subMenus: [
          {
            projectName: '请假申请',
            id: 49,
            name: 'apply'
          },
          {
            projectName: '请假审批',
            id: 50,
            name: 'audit'
          },
          {
            projectName: '外出申请',
            id: 68,
            name: 'out'
          }
        ]
      },
      {
        title: '公司行事历',
        icon: '',
        id: 51,
        name: 'calendar'
      }
    ],
    78: [
      {
        title: '个人',
        name: 'staff',
        id: 82
      },
      {
        title: '项目',
        name: 'projects',
        id: 81
      },
      // {
      //   title: '部门',
      //   name: 'department',
      //   id: 79
      // },
      {
        title: '事业部',
        name: 'businissUnit',
        id: 83
      },
      {
        title: '公司',
        name: 'company',
        id: 80
      },

    ],
    12: [
      {
        title: '员工管理',
        id: 38,
        icon: '',
        name: 'employee',
        subMenus: [
          {
            projectName: '基本信息',
            id: 39,
            name: 'basic'
          },
          {
            projectName: '合同信息',
            id: 40,
            name: 'contract'
          }
        ]
      },
      {
        title: '薪资与奖金',
        icon: '',
        id: 41,
        name: 'money',
        subMenus: [
          {
            projectName: '薪资管理',
            id: 42,
            name: 'salaryManage'
          },
          {
            projectName: '奖金管理',
            id: 43,
            name: 'bonusManage'
          }
        ]
      },
      {
        title: '考勤与假期',
        id: 44,
        icon: '',
        name: 'attend',
        subMenus: [
          {
            projectName: '员工考勤',
            id: 45,
            name: 'attendance'
          },
          {
            projectName: '员工假期',
            id: 46,
            name: 'vacation'
          }
        ]
      }
    ],
    13: [
      {
        title: '设备管理',
        id: 34,
        icon: '',
        name: 'device',
        subMenus: [
          {
            projectName: '设备清单',
            id: 35,
            name: 'list'
          },
          {
            projectName: '所有者管理',
            id: 36,
            name: 'owner'
          }
        ]
      },
      {
        title: '报修管理',
        id: 37,
        icon: '',
        name: 'repair'
      }
    ],
    14: [
      {
        title: '我的设备',
        id: 31,
        icon: '',
        name: 'myDevice',
        subMenus: [
          {
            projectName: '设备清单',
            id: 32,
            name: 'list'
          },
          {
            projectName: '我的申请',
            id: 33,
            name: 'apply'
          }
        ]
      },
      {
        title: '我的报销',
        id: 63,
        name: 'myReimburse'
      }
      // {
      //   title: '我的图书',
      //   icon: '',
      //   name: 'myBooks'
      // }
    ],
    15: [
      {
        title: '用户管理',
        icon: '',
        id: 20,
        name: 'userManage'
      },
      {
        title: '菜单配置管理',
        id: 21,
        name: 'menuConfManage',
        subMenus: [
          {
            projectName: '菜单设置',
            id: 24,
            name: 'setting'
          },
          {
            projectName: '菜单权限',
            id: 25,
            name: 'role'
          }
        ]
      },
      {
        title: '功能配置管理',
        id: 22,
        name: 'functionManage',
        subMenus: [
          {
            projectName: '品牌工具包Tips',
            name: 'tips',
            id: 61
          },
          {
            projectName: '活点地图',
            name: 'livemap',
            id: 98
          },
          {
            projectName: '工具包管理',
            id: 26,
            name: 'toolkit'
          },
          {
            projectName: '业务审批人',
            id: 27,
            name: 'auditor'
          },
          {
            projectName: '会议配置',
            name: 'meeting',
            id: 28
          },
          {
            projectName: '设备类型',
            name: 'device',
            id: 29
          },
          {
            projectName: '公司部门设置',
            name: 'department',
            id: 30
          },
          {
            projectName: '事业部设置',
            name: 'hoshinUnit',
            id: 76
          }
        ]
      }
    ],
    // 7: [
    //   {
    //     title: '合同',
    //     id: 90,
    //     name: 'contract',
    //     subMenus: [
    //       {
    //         projectName: '客户合同',
    //         id: 91,
    //         name: 'clientContract'
    //       },
    //       {
    //         projectName: '供应商合同',
    //         id: 92,
    //         name: 'supplierContract'
    //       },
    //       {
    //         projectName: '报价单',
    //         id: 93,
    //         name: 'quotation'
    //       }
    //     ]

    //   },
    //   {
    //     title : '财务凭证',
    //     id : 94,
    //     name : 'finanCertificate'
    //   }
    // ]
  }, // 二级菜单
  dashboradSub: {
    activeName: '',
    openName: ''
  },
  /**
   * 任务
   */
  filesForm: [
    {
      fileName: '',
      url: ''
    }
  ],
  filesTemp: {
    fileName: '',
    url: ''
  },
  taskFormData: { // 新建任务
    projectId: null,
    productId: null,
    toolkitId: null,
    startTime: null,
    endTime: null,
    taskData: [],
    auditorId: [],
    level: null,
    taskName: null,
    formData: {},
    operationInfo: []
  },
  taskFilter: { // 任务列表筛选
    state: 0,
    flowState: 0,
    functionType: 0,
    toolkitId: null,
    page: 1,
    page_size: 25,
    orderBy: 'createTime',
    asc: 'desc',
    projectId: null,
    productId : 7,
    is_urgent: ''
  },
  taskList: [], // 任务列表
  taskFunctionInfo: [], // 可用工具包
  taskToolkit: [], // 任务工具包
  taskDetail: {}, // 任务详情
  taskDetailForm: [], // 任务详细
  taskDetailStatus: false, // 任务详情显示状态
  selectedExtraOption: [], // 添加的 任务资料
  extraDatas: [] // 任务资料列表
}
