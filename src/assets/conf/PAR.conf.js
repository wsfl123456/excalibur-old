export const PARConf = [
  {
    title_zh: '创意相关',
    title_en: 'Creative Related',
    displayType: 'table-noth',
    key: 'creativeRelated',
    tdRow: 3,
    value: [],
    otherIpt: '',
    td: [
      {
        label: '洞察概念与核心创意 ICC',
        id: '1'
      },
      {
        label: '视频拍摄与制作 Video',
        id: '2'
      },
      {
        label: '平面拍摄与修片 Photography',
        id: '3'
      },
      {
        label: '平面设计 Graphic Design',
        id: '4'
      },
      {
        label: '插画 Illustration',
        id: '5'
      },
      {
        label: '图文制作 Layout',
        id: '6'
      },
      {
        label: '周边制作 Peripherals',
        id: '7'
      },
      {
        label: '线下活动 Event',
        id: '8'
      },
      {
        label: '公关文章 PR release',
        id: '9'
      },
      {
        label: '其他 Other',
        id: '10'
      }
    ]
  },
  {
    title_zh: '媒介相关',
    title_en: 'Media Related',
    displayType: 'table-noth',
    key: 'mediaRelated',
    tdRow: 3,
    value: [],
    otherIpt: '',
    td: [
      {
        label: '传统硬广 Traditional Media',
        id: '1'
      },
      {
        label: '数字硬广 Digital Media',
        id: '2'
      },
      {
        label: '搜索引擎 SEM',
        id: '3'
      },
      {
        label: '其他 Other',
        id: '10'
      }
    ]
  },
  {
    title_zh: 'IP相关',
    title_en: 'IP Related',
    displayType: 'table-noth',
    key: 'ipRelated',
    tdRow: 3,
    value: [],
    otherIpt: '',
    td: [
      {
        label: 'IP策略与推荐 Source IP',
        id: '1'
      },
      {
        label: 'KOL策略与推荐 Source KOL',
        id: '2'
      },
      {
        label: '其他 Other',
        id: '10'
      }
    ]
  },
  {
    title_zh: '技术相关',
    title_en: 'Tech Related',
    displayType: 'table-noth',
    key: 'techRelated',
    tdRow: 3,
    value: [],
    otherIpt: '',
    td: [
      {
        label: 'H5',
        id: '1'
      },
      {
        label: '官网 Website',
        id: '2'
      },
      {
        label: '小程序 Mini App',
        id: '3'
      },
      {
        label: 'APP',
        id: '4'
      },
      {
        label: '新技术应用 New Tech',
        id: '5'
      },
      {
        label: '其他 Other',
        id: '10'
      }
    ]
  },
  {
    title_zh: '数据相关',
    title_en: 'Data Related',
    displayType: 'table-noth',
    key: 'dataRelated',
    tdRow: 3,
    value: [],
    otherIpt: '',
    td: [
      {
        label: '数据调研 Data Research',
        id: '1'
      },
      {
        label: '消费者数据分析与洞察 Consumer Data Analysis',
        id: '2'
      },
      {
        label: '监测仪表盘 Dashboard',
        id: '3'
      },
      {
        label: '其他 Other',
        id: '10'
      }
    ]
  },

  {
    title_zh: 'Project Owner 项目负责人',
    displayType: 'member',
    values: {
      projectLead: {
        label_zh: '项目总负责 ',
        label_en: 'Project Lead ',
        required: true,
        value: []
      }
    }
  },
  {
    title_zh: 'Project Management 项目管理团队',
    displayType: 'member',
    values: {
      projectManager: {
        label_zh: '主导PM',
        label_en: 'Leading PM ',
        required: true,
        value: []
      },
      creativePM: {
        label_zh: '创意PM',
        label_en: 'Creative PM ',
        value: []
      },
      mediaPM: {
        label_zh: '媒体PM',
        label_en: 'Media PM',
        value: []
      },
      ipProductPM: {
        label_zh: 'IP PM',
        value: []
      },
      technicalPM: {
        label_zh: '技术PM',
        label_en: 'Technical PM',
        value: []
      },
      dataPM: {
        label_zh: '数据PM',
        label_en: 'Data PM ',
        value: []
      }
    }
  },
  {
    title_zh: 'Planner 项目策划团队',
    displayType: 'member',
    values: {
      planner: {
        label_zh: '策略策划与传播策划 ',
        label_en: 'Strategy Planner ',
        value: []
      },
      mediaPlanner: {
        label_zh: '媒介策划 ',
        label_en: 'Media Planner',
        value: []
      },
      IPPlanner: {
        label_zh: 'IP策划 ',
        label_en: 'IP Planner ',
        value: []
      },
      technicalPlanner: {
        label_zh: '技术策划 ',
        label_en: 'Technical Planner ',
        value: []
      },
      creativePlanner: {
        label_zh: '创意策划 ',
        label_en: 'Creative Planner ',
        value: []
      }
    }
  },
  {
    title_zh: 'Creative Team 项目创意团队',
    displayType: 'member',
    values: {
      creativeArt: {
        label_zh: '美术',
        label_en: 'Art ',
        value: []
      },
      creativeCopy: {
        label_zh: '文案 ',
        label_en: 'Copy Writer ',
        value: []
      },
      photographProducer: {
        label_zh: '摄影制片 ',
        label_en: 'Photography Producer ',
        value: []
      },
      shootingProducer: {
        label_zh: '视频制片 ',
        label_en: 'Video Producer ',
        value: []
      }
    }
  },
  {
    title_zh: 'DTP Team 大数据与技术开发团队',
    displayType: 'member',
    values: {
      technical: {
        label_zh: '前端开发 ',
        label_en: 'Front-End Programming ',
        value: []
      },
      BEProgramming: {
        label_zh: '后端开发 ',
        label_en: 'Back-End Programming ',
        value: []
      },
      DBADesign: {
        label_zh: '数据库设计 ',
        label_en: 'DBA Design',
        value: []
      },
      domainServer: {
        label_zh: '域名与服务器管理 ',
        label_en: 'Domain & Server ',
        value: []
      },
      maintenance: {
        label_zh: '系统运维 ',
        label_en: 'Maintenance ',
        value: []
      }
    }
  },
  {
    title_zh: 'Data Team 项目数据分析',
    displayType: 'member',
    values: {
      dataAnalyst: {
        label_zh: '数据分析师 ',
        label_en: 'Data Analyst ',
        value: []
      },
      dataMaintenance: {
        label_zh: '数据运维 ',
        label_en: 'Data Maintenance ',
        value: []
      }
    }
  }
]
