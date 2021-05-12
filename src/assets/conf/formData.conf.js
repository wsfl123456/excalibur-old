export const formConf = {
  // 通用
  default: {
    formData: [
      [
        {
          label: "任务资料",
          type: "textarea",
          name: "task_info",
          value: "",
          placeholder: "填写任务资料附件名称"
        },
        {
          label: "公盘地址",
          type: "input",
          name: "addr",
          value: "",
          placeholder:
            "上传到公盘后粘贴地址 格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\\"
        },
        {
          label: "任务描述",
          type: "textarea",
          name: "task_desc",
          value: "",
          placeholder: "填写任务描述"
        }
      ]
    ],
    operationInfo: [
      {
        operationId: null,
        inspectorId: null,
        content: {
          canMore: true,
          title: "任务"
        }
      }
    ],
    contactsInfo: []
  },
  // ShowCase - PRLaunch
  454: {
    showCase: {
      info: [
        {
          report: "",
          material: ""
        }
      ],
      describe: ""
    },
    operationInfo: [
      {
        operationId: null,
        inspectorId: null,
        content: {
          canMore: true,
          title: "任务"
        }
      }
    ],
    contactsInfo: []
  },
  // ShowCase - Deck
  453: {
    showCase: {
      info: [
        {
          material: ""
        }
      ],
      describe: ""
    },
    operationInfo: [
      {
        operationId: null,
        inspectorId: null,
        content: {
          canMore: true,
          title: "任务"
        }
      }
    ],
    contactsInfo: []
  },
  // ShowCase - 长图
  452: {
    showCase: {
      info: [
        {
          report: "",
          material: ""
        }
      ],
      describe: ""
    },
    operationInfo: [
      {
        operationId: null,
        inspectorId: null,
        content: {
          canMore: true,
          title: "任务"
        }
      }
    ],
    contactsInfo: []
  },
  // ShowCase - PRContent
  451: {
    showCase: {
      info: [
        {
          report: "",
          material: ""
        }
      ],
      describe: "",
      mediaRelease: false,
      mediaQuote: false,
      writingFee: false,
      spotplan: [
        {
          inspectorId: null,
          operationId: null,
          content: {
            title: "spotplan",
            canMore: true
          }
        }
      ]
      // spotplan: [],
      // spotplanInspector: []
    },
    operationInfo: [
      {
        operationId: null,
        inspectorId: null,
        content: {
          canMore: true,
          title: "任务"
        }
      }
    ],
    contactsInfo: []
  },
  // 周边 - 道具制作
  313: {
    formData: [
      [
        {
          label: "供应商名称",
          type: "select",
          value: "",
          placeholder: "网站或APP监测需求",
          from: "supplier"
        },
        {
          label: "供应商资质",
          type: "radio",
          value: "",
          placeholder: "网站或APP监测需求",
          items: [
            {
              id: "1",
              label: "小规模纳税人"
            },
            {
              id: "2",
              label: "一般纳税人"
            },
            {
              id: "3",
              label: "个人独立工作室"
            }
          ]
        },
        {
          label: "地址",
          type: "input",
          value: ""
        },
        {
          label: "联系人",
          value: "",
          type: "input"
        },
        {
          label: "工艺",
          value: "",
          type: "input"
        },
        {
          label: "尺寸",
          value: "",
          type: "input"
        },
        {
          label: "起订量",
          value: null,
          type: "number"
        },
        {
          label: "设计稿",
          value: "",
          type: "input"
        },
        {
          label: "样品数量及要求",
          value: "",
          type: "textarea"
        },
        {
          label: "大货数量",
          value: null,
          type: "number"
        },
        {
          label: "成本/报价单",
          value: "",
          type: "input"
        },
        {
          label: "制作时间",
          value: "",
          type: "date"
        },
        {
          label: "运输时间",
          value: "",
          type: "input"
        },
        {
          label: "交货时间",
          value: "",
          type: "datetime"
        },
        {
          label: "仓储",
          value: "",
          type: "input"
        },
        {
          label: "仓库地址",
          value: "",
          type: "input"
        },
        {
          label: "物流",
          value: "",
          type: "input"
        },
        {
          label: "安装搭建",
          value: "",
          type: "input"
        },
        {
          label: "付款方式",
          value: "",
          type: "input"
        },
        {
          label: "其他",
          value: "",
          type: "textarea"
        }
      ]
    ],
    operationInfo: [
      {
        operationId: null,
        inspectorId: null,
        content: {
          canMore: true,
          title: "任务"
        }
      }
    ],
    contactsInfo: []
  },
  // 技术 - 应用需求
  10: {
    techProject: {
      technical: [
        {
          label: "Mechanism",
          type: "checkbox",
          valueSelect: [],
          items: [
            { id: 1, label: "App" },
            { id: 2, label: "Campaign Site" },
            { id: 3, label: "system" }
          ]
        },
        {
          label: "Programming Requirements",
          type: "checkbox",
          valueSelect: [],
          valueIpt: "1.Language: \n2.Frame: \n3.Interface: ",
          items: [
            { id: 1, label: "NORMCORE" },
            { id: 2, label: "Client" },
            { id: 3, label: "Third Party" }
          ]
        },
        {
          label: "Video",
          type: "checkbox",
          valueSelect: [],
          items: [
            { id: 1, label: "NORMCORE's Server" },
            { id: 2, label: "Third Party" }
          ]
        },
        {
          label: "Versions",
          type: "checkbox",
          valueSelect: [],
          valueIpt: "1.Details: ",
          items: [
            { id: 1, label: "Phone" },
            { id: 2, label: "PC" },
            { id: 3, label: "Tablet" }
          ]
        },
        {
          label: "Operation System",
          type: "checkbox",
          valueSelect: [],
          items: [
            { id: 1, label: "IOS" },
            { id: 2, label: "Android" },
            { id: 3, label: "windows" }
          ]
        },
        {
          label: "Host",
          type: "checkbox",
          valueSelect: [],
          valueIpt: "1.IP: \n2.Server Setting: \n3.CND: ",
          items: [
            { id: 1, label: "NORMCORE" },
            { id: 2, label: "client" },
            { id: 3, label: "Third Party" }
          ]
        },
        {
          label: "Domain Name",
          type: "checkbox",
          valueSelect: [],
          valueIpt: "1.Domain Name: ",
          items: [
            { id: 1, label: "NORMCORE" },
            { id: 2, label: "Client" },
            { id: 3, label: "Third Party" }
          ]
        },
        {
          label: "Tracking Agency",
          type: "checkbox",
          valueSelect: [],
          valueIpt: "1.Tracking Help Link: ",
          items: [{ id: 1, label: "GA" }, { id: 2, label: "Other" }]
        },
        {
          label: "Traffic",
          type: "checkbox",
          valueSelect: [],
          items: [
            { id: 1, label: "< 100/s" },
            { id: 2, label: "< 200/s" },
            { id: 3, label: "> 300/s" }
          ]
        },
        {
          label: "Media",
          type: "checkbox",
          valueSelect: [],
          // valueIpt: '1.Source Media: \n2.Launch Time: ',
          valueIpt: "1.Source Media: ",
          items: [
            { id: 1, label: "App" },
            { id: 2, label: "Website" },
            { id: 3, label: "KOL" }
          ],
          needDate: "",
          datePlaceholder: "选择Launch Time",
          valueDate: ""
        },
        {
          label: "Launch Time",
          type: "datetime",
          placeholder: "选择Launch Time"
        },
        {
          label: "Offline Time",
          type: "datetime",
          placeholder: "选择Offline Time"
        }
      ],
      functional: [
        {
          label: "Participant Info",
          type: "checkbox",
          valueSelect: [],
          valueIpt: "1.Other Requirements: ",
          items: [
            { id: 1, label: "Name" },
            { id: 2, label: "Address" },
            { id: 3, label: "Phone" }
          ]
        },
        {
          label: "Incentive",
          type: "textarea",
          valueIpt:
            "1.Incentive Category: \n2.How to offer incentive to participant: ",
          placeholder: "填写 Incentive"
        }
      ]
    },
    operationInfo: [
      {
        operationId: null,
        inspectorId: null,
        content: {
          canMore: true,
          title: "任务"
        }
      }
    ],
    contactsInfo: []
  },
  // 媒介 - KOL
  436: {
    mediaKOL: [
      {
        name: "image",
        title: "图文",
        isChecked: false,
        sub: [
          {
            name: "image_noMan",
            label: "非真人类",
            opts: {
              isChecked: false,
              items: {
                brandShow: [],
                imgCount: "",
                implant: [],
                outerLink: [],
                imgGuide: [],
                fans: []
              }
            }
          },
          {
            name: "image_illustration",
            label: "插画类",
            opts: {
              isChecked: false,
              items: {
                brandShow: [],
                outerLink: [],
                creative: [],
                fans: [],
                illustration: [],
                imgCount: "",
                imgUsage: []
              }
            }
          },
          {
            name: "image_man",
            label: "真人类",
            opts: {
              isChecked: false,
              items: {
                brandShow: [],
                KOL: "",
                combine: [],
                camera: [],
                outerLink: [],
                creative: [],
                fans: [],
                imgGuide: [],
                imgCount: "",
                imgUsage: []
              }
            }
          }
        ]
      },
      {
        name: "live",
        title: "直播",
        isChecked: false,
        sub: [
          {
            name: "live_man",
            label: "真人类",
            opts: {
              isChecked: false,
              items: {
                brandShow: [],
                creative: [],
                implant: [],
                place: "",
                duration: "",
                liveGuide: [],
                livePos: "",
                material: []
              }
            }
          }
        ]
      },
      {
        name: "video",
        title: "视频",
        isChecked: false,
        sub: [
          {
            name: "video_noMan",
            label: "非真人类",
            opts: {
              isChecked: false,
              items: {
                brandShow: [],
                implant: [],
                creative: "",
                place: "",
                duration: "",
                videoGuide: [],
                fans: [],
                material: []
              }
            }
          },
          {
            name: "video_man",
            label: "真人类",
            opts: {
              isChecked: false,
              items: {
                brandShow: [],
                implant: [],
                creative: [],
                duration: "",
                videoGuide: [],
                fans: [],
                material: []
              }
            }
          }
        ]
      }
    ],
    operationInfo: [
      {
        operationId: null,
        inspectorId: null,
        content: {
          canMore: true,
          title: "任务"
        }
      }
    ],
    contactsInfo: []
  },
  // 数据 - dashboard
  311: {
    dashboard: {
      frequency: [],
      daily: [],
      monthly: [],
      weekly: [],
      weeklyD: [],
      medias: [],
      weibo: [],
      wechat: [],
      buyMedia: [],
      buyMediaOther: "",
      otherIpt: "",
      dataTimerange: [],
      budget: "",
      videoItem: [],
      videoTimerange: [],
      videoBudget: "",
      PBM: [],
      PBMTimeRange: [],
      PBMBudget: "",
      siteItem: [],
      userPerformance: [],
      siteTimerange: [],
      btnCode: "",
      siteBudget: "",
      mapUrl: "",
      tools: [],
      otherTool: ""
    },
    formData: [
      [
        {
          label: "Layout地址",
          type: "input",
          name: "layout_addr",
          value: "",
          placeholder:
            "填写项目设计稿Layout公盘地址格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\\"
        },
        {
          label: "Spotplan地址",
          type: "input",
          name: "Spotplan_addr",
          value: "",
          placeholder:
            "填写项目设计稿Spotplan公盘地址格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\\"
        },
        {
          label: "媒体及点位文件地址",
          type: "input",
          name: "Spotplan_addr",
          value: "",
          placeholder:
            "填写项目媒体及点位文件公盘地址格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\\"
        },
        {
          label: "活动上线时间",
          type: "datetime",
          name: "online",
          value: "",
          placeholder: "选择上线时间",
          requiredOpt: [
            {
              key: "4",
              type: "<",
              valueType: "date"
            }
          ]
        },
        {
          label: "活动下线时间",
          type: "datetime",
          name: "offline",
          value: "",
          placeholder: "选择下线时间",
          requiredOpt: [
            {
              key: "3",
              type: ">",
              valueType: "date"
            }
          ]
        }
      ]
    ],
    operationInfo: [
      {
        operationId: null,
        inspectorId: null,
        content: {
          canMore: true,
          txt: null,
          title: "任务"
        }
      }
    ],
    contactsInfo: []
  },
  // 行政-外出
  21: {
    formData: [
      [
        {
          label: "外出时间",
          type: "datetimerange",
          name: "start time",
          value: "",
          required: true,
          placeholder: "选择外出时间段",
          workTime: true
        },
        {
          label: "同行人员",
          type: "member",
          name: "members",
          value: [],
          required: false
        },
        {
          label: "外出类型",
          type: "radio",
          name: "type",
          items: [{ id: 1, label: "外出开会" }, { id: 2, label: "异地出差" }],
          value: "",
          required: true
        },
        {
          label: "外出城市",
          type: "city",
          value: [],
          required: true
        }
      ]
    ],
    operationInfo: [
      {
        operationId: null,
        content: {
          canMore: false
        }
      }
    ]
  },
  // 行政-快递
  22: {
    express: {
      sender: [
        {
          label: "寄件人",
          type: "member",
          value: ""
        },
        {
          label: "联系方式",
          type: "input",
          value: "",
          placeholder: "填写寄件人手机号或固话"
        }
      ],
      receiver: [
        {
          label: '收件人',
          value: '',
          type: 'input',
          placeholder: '填写收件人名称'
        },
        {
          label: '联系方式',
          type: 'input',
          value: '',
          placeholder: '填写手机人手机号或固话'
        }
      ],
      brand: [
        {
          label: '品牌',
          value: '',
          type: 'select',
          placeholder: '请选择品牌'
        },
        {
          label: '项目',
          value: '',
          type: 'select',
          placeholder: '请选择项目'
        },
      ],
      addr: {
        label: '收件地址',
        type: 'city',
        cityValue: [],
        detailValue: '',
        placeholder: '收件人详细地址（楼层号、门牌号）'
      },
      orderNo: {
        label: "快递单号",
        type: "input",
        value: "",
        placeholder: "填写快递单号"
      }
    },
    formData: [
      [
        {
          label: "任务资料",
          type: "input",
          name: "task_info",
          value: "",
          placeholder: "填写任务资料附件名称"
        },
        {
          label: "公盘地址",
          type: "input",
          name: "addr",
          value: "",
          placeholder:
            "上传到公盘后粘贴地址 格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\\"
        }
      ]
    ],
    operationInfo: [
      {
        operationId: null,
        content: {
          canMore: false
        }
      }
    ]
  },
  // 财务-供应商
  15: {
    supplierInfo: [
      {
        basicInfo: {
          contractId: {
            value: "",
            toastMsg: ""
          },
          contractName: {
            required: true,
            value: "",
            toastMsg: "请输入合同名称"
          },
          endTime: {
            required: true,
            value: "",
            toastMsg: "请选择结束时间"
          },
          projectName: {
            value: ""
          },
          projectId: {
            value: ""
          },
          supplierName: {
            required: true,
            value: "",
            toastMsg: "请选择供应商"
          },
          supplierId: {
            value: "",
            toastMsg: ""
          },
          supplierIdAuto: {
            value: "",
            toastMsg: ""
          },
          contractType: {
            required: true,
            value: "",
            toastMsg: "请选择合同类型"
          },
          contractTypeRemark: {
            value: ""
          },
          organizeUnit: {
            required: true,
            value: "1",
            toastMsg: "请选择组织单位"
          },
          bussinessType: {
            required: true,
            value: [],
            toastMsg: "请选择业务类型"
          },
          bussinessTypeRemark: {
            value: ""
          },
          bussinessOverview: {
            required: true,
            value: "",
            toastMsg: "请输入业务概述"
          },
          involveMoney: {
            required: true,
            value: "1",
            toastMsg: "请选择是否涉及金额"
          },
          money: {
            value: "",
            toastMsg: "请输入金额"
          },
          payType: {
            value: "1",
            toastMsg: "请选择付款方式"
          }
        },
        partyA: {
          name: {
            required: true,
            value: "",
            toastMsg: "请选择甲方名称"
          },
          contactPerson: {
            value: "",
            toastMsg: ""
          },
          accountName: {
            value: "",
            toastMsg: ""
          },
          accountTaxNum: {
            value: "",
            toastMsg: ""
          },
          openBank: {
            value: "",
            toastMsg: ""
          },
          openAccount: {
            value: "",
            toastMsg: ""
          },
          companyMobile: {
            value: "",
            toastMsg: "请输入正确的甲方公司号码"
          },
          companyAddress: {
            value: "",
            toastMsg: "请输入甲方公司地址"
          }
        },
        partyB: {
          name: {
            value: ""
          },
          contactPerson: {
            value: "",
            toastMsg: ""
          },
          accountName: {
            value: "",
            toastMsg: ""
          },
          accountTaxNum: {
            value: "",
            toastMsg: ""
          },
          openBank: {
            value: "",
            toastMsg: ""
          },
          openAccount: {
            value: "",
            toastMsg: ""
          },
          companyMobile: {
            value: "",
            toastMsg: ""
          },
          companyAddress: {
            value: "",
            toastMsg: ""
          }
        },
        /*  没办法，只能这样玩了 */
        modifyInfo: {
          contractDeadline: {
            value: "",
            toastMsg: "请设置合同期限"
          },
          insteadPay: {
            required: true,
            value: "0",
            toastMsg: "请选择是否为代付"
          },
          remark: {
            value: "",
            toastMsg: ""
          },
          fileName: {
            required: true,
            value: "",
            toastMsg: "请输入文件名"
          },
          fileAddress: {
            required: true,
            value: "",
            toastMsg: "请输入公盘地址"
          }
        },
        secondModifyInfo: {
          invoice: {
            value: '专票',
            toastMsg: ""
          },
          taxRate: {
            value: 6,
            toastMsg: ""
          },
        },
        taskExecutor: null,
        taskExamer: null
      }
    ],
    operationInfo: [
      {
        operationId: null,
        inspectorId: null,
        content: {
          canMore: false,
          title: "任务"
        }
      }
    ]
  },
  //行政盖章
  27: {
    seal: {
      type: "",
      material: "",
      address: "",
      remark: "",
      isManually: true
    },
    operationInfo: [
      {
        operationId: null,
        // inspectorId: null,
        content: {
          canMore: false
        }
      }
    ]
  },

  // 财务-打款
  20: {
    payInfo: [
      {
        basicInfo: {
          contractId: "",
          isGetInvoice: "1",
          invoiceId: "",
          invoiceNo: "",
          invoiceDate: "",
          money: "",
          billingPeriod: "",
          payReason: "",
          expectTime: "",
          remark: "",
          accountName: "",
          taxNumber: "",
          openAccount: "",
          openBank: "",
          address: ""
        }
      }
    ],
    operationInfo: [
      {
        operationId: null,
        content: {
          canMore: false,
          txt: null,
          title: "任务"
        }
      }
    ],
    file: {
      name: "",
      address: ""
    },
    invoiceInfo: [{}]
  },
  // 财务-开票
  19: {
    billingInfo: [
      {
        basicInfo: {
          contractId: {
            value: "",
            toastMsg: "请选择合同"
          },
          quotationId: {
            value: "",
            toastMsg: "请选择报价单"
          },
          totalMoney: {
            value: 0,
            toastMsg: "请输入金额"
          },
          afterTaxMoney: {
            value: "",
            toastMsg: ""
          },
          taxRate: {
            value: "6%",
            toastMsg: ""
          },
          company: {
            value: "",
            toastMsg: ""
          },
          contactPerson: {
            value: "",
            toastMsg: ""
          },
          accountName: {
            value: "",
            toastMsg: ""
          },
          taxNumber: {
            value: "",
            toastMsg: ""
          },
          openBank: {
            value: "",
            toastMsg: ""
          },
          openAccount: {
            value: "",
            toastMsg: ""
          },
          companyMobile: {
            value: "",
            toastMsg: ""
          },
          companyAddress: {
            value: "",
            toastMsg: ""
          }
        }
      }
    ],
    operationInfo: [
      {
        operationId: null,
        // inspectorId: [],
        content: {
          isMulti: "true",
          canMore: false
        }
      }
    ]
  },
  // 财务-报销
  18: {
    reimburse: {
      taskName: {
        value: "",
        toastMsg: "请输入任务名称",
        placeholder: "YYMM报销（例：201909报销）"
      },
      main: {
        value: "",
        toastMsg: "请选择报销主体",
        placeholder: "请选择报销主体"
      },
      endTime: {
        value: "",
        toastMsg: "请选择截止时间",
        placeholder: "请选择截止时间"
      },
      items: [
        {
          category: {
            value: null,
            toastMsg: "请选择发票类别",
            placeholder: "选择发票类别"
          },
          type: {
            value: null,
            toastMsg: "请选择发票类型",
            placeholder: "选择发票类型"
          },
          classification: {
            value: [],
            toastMsg: "请选择实际类别",
            placeholder: "选择实际类别"
          },
          totalMoney: {
            value: null,
            toastMsg: "请输入总金额",
            placeholder: "输入金额"
          },
          faxRate: {
            value: null,
            toastMsg: "请输入税率",
            placeholder: ""
          },
          happenTime: {
            value: "",
            toastMsg: "请选择发生时间",
            placeholder: "选择时间"
          },
          project: {
            value: "",
            toastMsg: "请选择项目名称",
            placeholder: "搜索选择项目"
          },
          detail: {
            value: "",
            toastMsg: "请输入详细说明",
            placeholder: "输入详细说明"
          }
        }
      ]
    },
    operationInfo: [
      {
        operationId: null,
        content: {
          isMulti: "true",
          canMore: false
        }
      }
    ]
  },
  // 财务-报价单
  17: {
    quotationInfo: [
      {
        basicInfo: {
          relateContractId: "",
          quoType: "1",
          quoName: "",
          bank: "招商银行股份有限公司上海延西支行",
          clientName: "",
          clientID: "",
          bankAccount: "工匠广告传播（上海）有限公司",
          projectName: "",
          clientOwner: "",
          bankID: "1219 1504 5310 301",
          projectID: "",
          projectOwner: "",
          contactPerson: "刘伟",
          issueDate: "",
          costCenter: "",
          contactInfo: "136-0190-4053",
          validDate: "",
          cueemcy: "0"
        },
        statement: {
          hasStatement: "1",
          itemsList: [
            {
              selectItem: [],
              quotation: []
            }
          ],
          manuaItemList: []
        }
      }
    ]
  },
  // 财务-客户合同
  16: {
    contractsInfo: {
      // 合同基础信息
      basicInfo: {
        contractName: {
          value: "",
          toastMsg: "请输入合同名称"
        },
        endTime: {
          value: "",
          toastMsg: "请选择结束时间"
        },
        projectName: {
          value: "",
          toastMsg: ""
        },
        projectId: {
          value: "",
          toastMsg: ""
        },
        clientName: {
          value: "",
          toastMsg: ""
        },
        clientId: {
          value: "",
          toastMsg: ""
        },
        contractType: {
          value: "",
          toastMsg: "请选择合同类型"
        },
        remark: {
          value: "",
          toastMsg: ""
        },
        organizeUnit: {
          value: "1",
          toastMsg: "请选择组织单位"
        },
        bussinessType: {
          value: "",
          toastMsg: "请选择业务类型"
        },
        bussinessOverview: {
          value: "",
          toastMsg: "请输入业务概况"
        },
        involveMoney: {
          value: "1",
          toastMsg: ""
        },
        money: {
          value: "",
          toastMsg: "请输入金额"
        },
        payType: {
          value: "1",
          toastMsg: ""
        }
      },
      partyA: {
        name: {
          value: "",
          toastMsg: "请选择甲方"
        },
        contactPerson: {
          value: "",
          toastMsg: ""
        },
        accountName: {
          value: "",
          toastMsg: ""
        },
        accountTaxNum: {
          value: "",
          toastMsg: ""
        },
        openBank: {
          value: "",
          toastMsg: ""
        },
        openAccount: {
          value: "",
          toastMsg: ""
        },
        companyMobile: {
          value: "",
          toastMsg: ""
        },
        companyAddress: {
          value: "",
          toastMsg: ""
        }
      },
      partyB: {
        name: {
          value: "",
          toastMsg: "请选择乙方"
        },
        contactPerson: {
          value: "",
          toastMsg: ""
        },
        accountName: {
          value: "",
          toastMsg: ""
        },
        accountTaxNum: {
          value: "",
          toastMsg: ""
        },
        openBank: {
          value: "",
          toastMsg: ""
        },
        openAccount: {
          value: "",
          toastMsg: ""
        },
        companyMobile: {
          value: "",
          toastMsg: ""
        },
        companyAddress: {
          value: "",
          toastMsg: ""
        }
      },
      /*  没办法，只能这样玩了 */
      modifyInfo: {
        contractDeadline: {
          value: "",
          toastMsg: "请设置合同期限"
        },
        insteadPay: {
          value: "0",
          toastMsg: "请选择是否为代付"
        },
        remark: {
          value: "",
          toastMsg: ""
        },
        fileName: {
          value: "",
          toastMsg: "请输入文件名"
        },
        fileAddress: {
          value: "",
          toastMsg: "请输入公盘地址"
        },
      },
      secondModifyInfo: {
        invoice: {
          value: '专票',
          toastMsg: ""
        },
        taxRate: {
          value: 6,
          toastMsg: ""
        },
      },
    },
   
    operationInfo: [
      {
        operationId: null,
        inspectorId: null
      }
    ]
  },
  // 创意任务
  2: {
    formData: [
      [
        {
          label: "中心思想",
          type: "input",
          placeholder: "填写任务需求的中心思想，例如摩登一早",
          value: "",
          required: true
        },
        {
          label: "目的",
          type: "input",
          placeholder:
            "填写任务目的描述，例如利用创意性文案为产品上市预热，引起消费者好奇",
          value: "",
          required: true
        }
      ],
      [
        {
          label: "发布平台",
          type: "checkbox",
          name: "platform",
          items: [
            { id: 1, label: "微信" },
            { id: 2, label: "微博" },
            { id: 3, label: "KOL" },
            { id: 4, label: "户外" },
            { id: 6, label: "杂志" },
            { id: 5, label: "其他" }
          ],
          value: [],
          required: true
        },
        {
          label: "表现形式",
          type: "radio",
          name: "shape",
          items: [
            { id: 1, label: "插画" },
            { id: 2, label: "摄影" },
            { id: 3, label: "KV" },
            { id: 4, label: "常规图文" },
            { id: 5, label: "其他" }
          ],
          value: "",
          required: true
        },
        {
          label: "设计内容",
          type: "input",
          placeholder: "填写设计内容，例如某品牌预热倒计时海报制作",
          value: "",
          required: "true"
        },
        {
          label: "互动方式",
          type: "input",
          placeholder: "填写互动方式，例如微博互动",
          value: "",
          required: "true"
        },
        {
          label: "尺寸大小",
          type: "input",
          placeholder: "填写设计内容尺寸大小，例如常规微博配图尺寸",
          value: "",
          required: "true"
        },
        {
          label: "重点突出",
          type: "input",
          placeholder: "填写重点突出内容，例如重点突出创意文案",
          value: "",
          required: "true"
        },
        {
          label: "品牌禁忌",
          type: "input",
          placeholder: "填写品牌禁忌，例如产品不能遮挡",
          value: ""
        },
        {
          label: "授权字体",
          type: "input",
          placeholder: "填写授权字体，例如免费字体",
          value: ""
        },
        {
          label: "授权图片",
          type: "input",
          placeholder: "填写授权图片，例如免费图库",
          value: ""
        },
        {
          label: "需求类型",
          type: "requireType",
          name: "requireType",
          items: [
            { id: 1, label: "文案需求" },
            { id: 2, label: "设计需求" },
            { id: 3, label: "图文需求" },
            { id: 4, label: "视频需求" }
          ],
          value: "",
          required: true
        }
      ]
    ],
    operationInfo: [],
    contactsInfo: []
  }
};
