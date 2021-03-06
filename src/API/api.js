/*
 * redirectApi 函数作为 路由重定向高阶函数使用
 * 其目的在于改变原有前后端API不分离的现状，将后端API重新定向在/api路由之下
 * 再在Nginx服务器将 /api 下的路由重定向到后端，由此实现在完全不改变原有前后端路由的情况下，分离前后端路由
 * Nginx服务器路重定向配置详情请查看： 相应服务器上Nginx服务器虚拟站点配置
 * 请输入 nginx -t 查看nginx 服务器配置目录, 上面同样有写注释，修改路由 ~望请慎重。
 */
function redirectApi(routes) {
  let routesArr = Object.keys(routes);
  routesArr.forEach(name => {
    routes[name] = 'api/' + routes[name];
  });

  return routes;
}

export const Dashborad = redirectApi({
  projectsku: 'dashboard/projectsku',
  projectexecmonthtasknumber: 'dashboard/projectexecmonthtasknumber',
  projectexecdepartmenttasknumber: 'dashboard/projectexecdepartmenttasknumber',
  projectexecmonthdurtime: 'dashboard/projectexecmonthdurtime',
  projectexecdepartmentdurtime: 'dashboard/projectexecdepartmentdurtime',
  userincomeproject: 'dashboard/userincomeproject',
  userincomeprojectme: 'dashboard/userincomeprojectme',
  userexecmonthprojectnumberallcustomer: 'dashboard/userexecmonthprojectnumberallcustomer',
  userexecmonthprojectnumbereachcustomer: 'dashboard/userexecmonthprojectnumbereachcustomer',
  userexecmonthtasknumber: 'dashboard/userexecmonthtasknumber',
  userexeccustomertasknumber: 'dashboard/userexeccustomertasknumber',
  userexecmonthdurtime: 'dashboard/userexecmonthdurtime',
  userexecmonthovertime: "dashboard/userexecmonthovertime",
  departpersonteam: 'dashboard/departpersonteam',
  departmonthtasknumber: 'dashboard/departmonthtasknumber',
  departmonthdurtime: 'dashboard/departmonthdurtime',
  teampersondepart: 'dashboard/teampersondepart',
  teamsku: 'dashboard/teamsku',
  teamcustomermonth: 'dashboard/teamcustomermonth',
  teammonthtasknumber: 'dashboard/teammonthtasknumber',
  teammonthdurtime: 'dashboard/teammonthdurtime',
  companypersondepart: 'dashboard/companypersondepart',
  companydepartinteam: 'dashboard/companydepartinteam',
  companysku: 'dashboard/companysku',
  companycustomermonth: 'dashboard/companycustomermonth',
  companymonthtasknumber: 'dashboard/companymonthtasknumber',
  companymonthdurtime: 'dashboard/companymonthdurtime',
  companyadd: 'company/add',
  companyindustry: 'dashboard/companyindustry',
  industryadd: 'industry/add',
  teamsatisfymonth: 'dashboard/teamsatisfymonth',
  teamsatisfycustomer: 'dashboard/teamsatisfycustomer',
  teamsatisfyproject: 'dashboard/teamsatisfyproject',
});
export const Department = redirectApi({
  list: 'depart/list',
  listnoauth: 'depart/listnoauth'
});
export const Task = redirectApi({
  auditCertificate: 'task/invoicefu',
  addInvoice: 'task/addinvoice',
  editinvoice: 'task/editinvoice',
  getContactPayFile: 'task/contactfukuanlist',
  index: 'task/index',
  list: 'task/list',
  add: 'task/add',
  addSeal: 'task/addseal',
  user: 'task/taskuser',
  detail: 'task/taskinfo',
  addIndex: 'task/addindex',
  audit: 'task/review',
  getInvoice: 'task/invoicelist',
  financeAudit: 'task/reviewfinance',
  editIndex: 'task/edit',
  edit: 'task/editsave',
  logs: 'task/loglist',
  allPartA: 'task/outcustomer',
  allPartB: 'task/innercustomer',
  allContract: 'task/contactlist',
  allQuotation: 'task/quotationlist',
  classPartB: 'task/innercustomerselect',
  adviceRepo: 'task/toolkitremark',
  innerCustomerNC: 'task/innercustomernc',
  todayTask: 'task/listurgent',
  availableDate: 'attendance/month',
  editFile: 'task/editfile',
  reimbursementDel: 'task/reviewfinance',
  showCaseToolKit: 'task/showcasetool',
  contactlistnew: 'task/contactlistnew',
  contactbaojiadanlist: 'task/contactbaojiadanlist',
  quotationitem: 'task/quotationitem',
  quotationhuman: 'task/quotationhuman',
  hetongseal: 'task/hetongseal',
  hetongsealfile: 'task/hetongsealfile',
  hetongkfmoney: 'task/hetongkfmoney',
  exportbaojiadan: 'task/exportbaojiadan',
  cwarlist: 'task/cwarlist',
  userteamlist: 'task/userteamlist',
  cwaplist: 'task/cwaplist',
  cwcelist: 'task/cwcelist',
  receiptoverview: 'task/receiptoverview',
  receiptlist: 'task/receiptlist',
  receiptimport: 'task/receiptimport',
  receiptfu: 'task/receiptfu',
  cwcelistinfo: '/task/cwcelistinfo',
  collegelist: 'task/collegelist',
  collegestudylist: 'task/collegestudylist',
  oxshow: 'task/oxshow',
  toolkitnumbertask: 'task/toolkitnumbertask',
  exportvacation: 'task/exportvacation',
  exportattendancenew: 'task/exportattendancenew',
  exportattendancemonth: 'task/exportattendancemonth',
  marginsheet: 'task/marginsheet',
  marginsheetproject: 'task/marginsheetproject',
  invoicedelete: 'task/invoicedelete',
  exporthetongfukuanlist: 'task/exporthetongfukuanlist',
  baojiadanitemlist: 'task/baojiadanitemlist',
  filedownload: 'task/filedownload',
  exportbaojiadanbyitem: 'task/exportbaojiadanbyitem',
  cwfclist: 'task/cwfclist',
  cwfcset: 'task/cwfcset',
  cwfclog: 'task/cwfclog',
  cwfcbaoxiao: 'task/cwfcbaoxiao',
  cwfcbangongyunyingzhichu: 'task/cwfcbangongyunyingzhichu',
});
export const Login = redirectApi({
  login: 'user/login',
  logout: 'user/logout',
  veriCode: 'user/loginforgetpassword',
  // veriCode: 'user/forgetpassword',
  forgetPwd: 'user/loginchangepassword'
  // forgetPwd: 'user/changepasswordbysms'
});
export const NewLogin = redirectApi({
  getCaptchaCode: 'captcha/showcode',
  getVerification: 'task/usersendcode',
  captchacodecheck: 'task/usercaptchacodecheck',
  addaccount: 'task/useraddaccount',
  userloginverification: 'task/userloginverification',
  userverification: 'task/userverification',
  userforgetpassword: 'task/userforgetpassword',
  userbindaccount: 'task/userbindaccount'
});
export const Index = redirectApi({
  nav: 'user/usermenu',
  allUsers: 'user/alluser',
  search: 'project/search',
  notice: 'notice/list',
  noticeState: 'notice/edit',
  noticeNum: '/notice/number',
  sysNoticeList: 'pdeclare/list',
  addSysNotice: 'pdeclare/add',
  editSysNotice: 'pdeclare/update',
  sysNoticeRole: 'pdeclare/role',
  sysNoticeDetail: 'pdeclare/detail',
  sysSendmail: 'pdeclare/sendmail',
  worknumber: 'task/worknumber',
  collectAdd: 'collect/add',
  collectDel: 'collect/del'
});
export const Project = redirectApi({
  list: 'project/list',
  addIndex: 'project/create',
  addpib: 'project/addpib',
  allUser: 'project/alluser',
  create: 'project/add',
  toolkit: 'project/toolkit',
  detail: 'project/projectinfo',
  tasklist: 'project/tasklist',
  filelist: 'project/filelist',
  getcustomerbytype: 'project/getcustomerbytype',
  audit: 'project/review',
  editIndex: 'project/modifyindex',
  editSave: 'project/modifysave',
  pibEditIndex: 'project/modifypib',
  pibEditSave: 'project/modifypibsave',
  role: 'project/role',
  adviceRepo: 'project/projectremark',
  state: 'project/modifystate',
  surveyList: 'survey/listpaper',
  surveyRole: 'survey/role',
  surveyOpts: 'survey/optionlist',
  surveyAdd: 'survey/addpaper',
  surveyEdit: 'survey/editpaper',
  surveyDetail: 'survey/detailpaper',
  surveySend: 'survey/sendpaper',
  surveyInfo: 'survey/resultpaperview',
  parstruct: 'project/parstruct'
});
export const Survey = redirectApi({
  preLoad: 'survey/formpaperload',
  submit: 'survey/formpaperpost'
});
export const Brand = redirectApi({
  list: 'customer/list',
  listAll: 'customer/listaudit',
  listByProject: 'customer/listbyproject',
  add: 'customer/new',
  detail: 'customer/view',
  edit: 'customer/edit',
  audit: 'customer/review',
  getLeader: 'user/getleaderid',
  role: 'customer/role',
  innerCustomer: 'task/innercustomernc',
  type: 'customer/industry',
});
export const Supply = redirectApi({
  list: 'supply/list',
  edit: 'supply/edit',
  add: 'supply/new',
  detail: 'supply/view',
  innerCustomer: 'task/innercustomernc',
  audit: 'supply/audit'
});
export const Schedule = redirectApi({
  add: 'meeting/add',
  edit: 'meeting/update',
  cancel: 'meeting/cancel',
  personal: 'meeting/person',
  // editPersonal: 'meeting/edit',
  all: 'meeting/all',
  // preview: 'meeting/view',
  manage: 'meeting/list',
  allSchedule: '/meeting/all',
  sendMemo: 'meeting/sendmemoemail', // 发送会议记录邮件
  meetingDetail: 'meeting/view',
  updatememo: 'meeting/updatememo',
  apply: 'vacation/add',
  cancelVaca: 'vacation/cancel',
  editVaca: 'vacation/edit',
  vacaList: 'vacation/list',
  vacaDetail: 'vacation/view',
  vacaAudit: 'vacation/review',
  vaca: 'vacation/import',
  vacaDays: 'vacation/days',
  meetingType: 'meeting/mapping',
  canlendarPic: 'meeting/companypic',
  meetingRooms: 'meeting/rooms',
  allCustomer: 'customer/listaudit',
  allProject: 'project/listaudit',
  holiday: 'vacation/corporate-holiday',
  holidayHour: 'vacation/corporate-holiday-hour',
  allteamuser: 'task/allteamuser'
});
export const Growth = redirectApi({
  OX: 'depart/oxshow',
  departAdd: 'depart/add',
  departEdit: 'depart/edit',
  departList: 'depart/list',
  departAll: 'depart/all',
  salary: 'salary/index',
  salaryPwd: 'salary/login',
  bonus: 'bonus/index',
  bonusPwd: 'bonus/login',
  trainList: 'train/index',
  banner: 'train/banner'
});
export const Hr = redirectApi({
  basicList: 'user/list',
  basicImport: 'user/import',
  basicExport: '/user/export',
  detailBasic: 'user/info',
  editBasic: 'user/edit',
  addBasic: 'user/add',
  basicOpts: 'user/listinfo',
  contractList: 'user/clist',
  detailContract: 'user/contract',
  contractImport: 'user/importcontract',
  contractExport: '/user/exportcontract',
  addContract: 'user/addcontract',
  editContract: 'user/editcontract',
  salaryList: 'user/salarylist',
  salaryImport: 'user/importsalary',
  salaryExport: '/user/exportsalary',
  payrollList: 'salary/salarydetaillist',
  payrollPwd: 'salary/adminlogin',
  payrollImport: 'salary/import',
  payrollExport: '/user/exportmonthsalary',
  hrBonus: 'bonus/detaillist',
  attend: 'attendance/list',
  attendImport: 'attendance/import',
  attendExport: '/attendance/export',
  importscore: 'attendance/importscore',
  vacationImport: 'vacation/import',
  // vacationExport: '/vacation/export',
  // allVacation: 'vacation/vlist',
  detailVacationList: 'vacation-list/vacation-list',
  detailVacationExport: '/vacation/exportlist',
  allVacation: 'vacation-list/list',
  allVacationExport: '/vacation/export',
  // monthVacation: 'vacation/monthlist',
  monthVacation: 'vacation-list/month',
  monthVacationExport: '/vacation/export-month',
  // remainVacation: 'vacation/remainingholidaylist',
  remainVacation: 'vacation-list/remainder',
  remainVacationExport: '/vacation/export-remainder',
  hrBonusImport: 'bonus/import',
  hrBonusExport: '/bonus/export',
  basePwd: 'user/baselogin',
  contractPwd: 'user/clogin',
  bounsPwd: 'bonus/bonuslogin',
  salaryPwd: 'user/salarylogin',
  attendancePwd: 'attendance/attendancelogin',
  vacationPwd: 'vacation/vacationlogin',
  groupNposition: 'depart/options',
  role: '/task/role',
  marginRole: 'task/role',
  exportbaoxiaostaff: "task/exportbaoxiaostaff",
  exportbaoxiaoperson: "task/exportbaoxiaoperson",
  monthlist: 'attendance/month-list',
  monthdetail: 'attendance/month-detail'
});
export const Device = redirectApi({
  all: 'equipment/all',
  import: 'equipment/import',
  export: 'equipment/export',
  edit: 'equipment/edit',
  add: 'equipment/add',
  applyList: 'equipment/applylist',
  editIndex: 'equipment/addindex',
  ownerChange: 'equipment/userchange',
  repairState: 'equipment/changestate'
});
export const Support = redirectApi({
  myDevice: 'equipment/ulist',
  apply: 'equipment/uadd',
  needAudit: 'equipment/auditlist',
  myApply: 'equipment/mylist',
  audit: 'equipment/review',
  detail: 'equipment/view',
  cancelApply: 'equipment/cancel'
});
export const User = redirectApi({
  myInfo: 'user/myinfo',
  saveInfo: 'user/myinfosave',
  uploadAvatar: 'user/changepic',
  changePwd: 'user/changepassword',
  changeManagePwd: 'user/changeadminpassword',
  changeQueryPwd: 'user/changesalarypassword',
  getVeriCode: 'user/forgetpassword',
  saveForgetPwd: 'user/changepasswordbysms',
  saveForgetAdmin: 'user/changeadminbysms',
  saveForgetSalary: 'user/changesalarybysms',
  role: 'user/myrole',
  queryPwd: '/user/update-pwd',
  getQueryVeriCode: '/user/forgetprofilepassword',
  saveForgetQueryPwd: '/user/changeprofilepasswordbysms'
});
export const Sys = redirectApi({
  allFn: 'toolkit/allfunction',
  allRole: 'role/roleall',
  allRight: 'role/rightall',
  accountlist: 'user/accountlist',
  addAccount: 'user/addaccount',
  editAccount: 'user/editaccount',
  delAccount: 'user/delaccount',
  menusList: 'role/rightlist',
  addMenu: 'role/rightaddsave',
  editMenu: 'role/righteditsave',
  delMenu: 'role/delright',

  roleList: 'role/rolelist',
  delRole: 'role/delrole',
  addRole: 'role/roleaddsave',
  editRole: 'role/roleeditsave',

  toolkitList: 'toolkit/toolkitlist',
  editToolkit: 'toolkit/edittoolkit',
  addToolkit: 'toolkit/addtoolkit',
  delToolkit: 'toolkit/deltool',
  allProduct: 'toolkit/allproduct',
  allToolkitFn: 'toolkit/allfunction',

  processList: 'config/processlist',
  processAuditor: 'config/getprocess',
  editProcess: 'config/editprocess',

  meetingList: 'config/meetingtype',
  editMeeting: 'config/edittype',
  delMeeting: 'config/deltype',
  addMeeting: 'config/addtype',

  deviceList: 'config/etype',
  editDevice: 'config/editetype',
  addDevice: 'config/eaddtype',
  delDevice: 'config/deletype',

  departList: 'depart/list',
  departDetail: 'depart/view',
  addDepart: 'depart/add',
  editDepart: 'depart/edit',
  // editDepartGroup: 'depart/editgroup',
  addDepartGroup: 'depart/addgroup',
  addDepartPosition: 'depart/addposition',
  delDepartPosition: 'depart/delposition',
  delDepart: 'depart/deldepart',
  delDepartGroup: 'depart/delgroup',

  tipsList: 'tips/list',
  tipDetail: 'tips/detail',
  addTips: 'tips/add',
  editTips: 'tips/update',
  tipsBrands: 'tips/customer',
  toolkitfunction: 'task/toolkitfunction'
});
export const cacheData = redirectApi({
  setInfo: 'pdraft/setinfo',
  getInfo: 'pdraft/getinfo'
});

export const Hoshin = redirectApi({
  list: 'team/list',
  detail: 'team/view',
  add: 'team/add',
  edit: 'team/edit',
  del: 'team/del'
});

export const Point = redirectApi({
  userList: 'integral/userlist',
  collegeList: 'integral/collegelist',
  viewMy: 'integral/viewmy',
  view: 'integral/view',
  changePoint: 'integral/add',
  cancel: 'integral/cancel',
  role: 'qa/role',
  expo: 'qa/exportscorehistory',
});

export const CreateDri = redirectApi({
  userInfo: 'user/myinfo',
  driObjectGetuser: 'task/driobjectgetuser',
  driobjectset: 'task/driobjectset',
  teamList: 'task/userteamlist',
  driTeamScoreSet: 'task/driteamscoreset',
  driProjectList: 'project/listaudit',
  drigetmyteamthreejobscore: 'task/drigetmyteamthreejobscore'
});

export const Dri = redirectApi({
  driobjectlist: 'task/driobjectlist',
  dribrieflist: 'task/dribrieflist',
  dribriefdetail: 'task/dribriefdetail',
  driobjectgetuser: 'task/driobjectgetuser',
  dashboarduserexecmonthtasknumber: 'task/dashboarduserexecmonthtasknumber',
  drigetmyteamthreejobscore: 'task/drigetmyteamthreejobscore',
  surveyscorelistproject: 'task/surveyscorelistproject',
  driobjectreview: 'task/driobjectreview',
  driobjectset: 'task/driobjectset',
  driteamscoreallowset: 'task/driteamscoreallowset',
  surveyscorebyproject: 'task/surveyscorebyproject',
  userInfo: 'user/info',
  toolkitremark: 'task/toolkitremark'
})

export const NccBook = redirectApi({
  mapadd: "tipsup/mapadd",
  mapedit: "tipsup/mapedit",
  maplistfront: "tipsup/maplistfront",
  mapdetailfront: "tipsup/mapdetailfront",
  mapreview: "tipsup/mapreview",
  collegelist: "task/collegelist",
  collegestudylist: "task/collegestudylist",
  toolkitbyproduct: "tips/toolkitbyproduct",
  storeadd: "tipsup/storeadd",
  storeedit: "tipsup/storeedit",
  storedetailfront: "tipsup/storedetailfront",
  storeshuxinglist: "tipsup/storeshuxinglist",
  storelistfront: "tipsup/storelistfront",
  storereview: "tipsup/storereview",
  houseadd: "tipsup/houseadd",
  houseedit: "tipsup/houseedit",
  houselistfront: "tipsup/houselistfront",
  housedetailfront: "tipsup/housedetailfront",
  housereview: "tipsup/housereview",
  changepicup: "user/changepicup",
  tiwenadd: "tipsup/tiwenadd",
  tiwenshuxinglist: "tipsup/tiwenshuxinglist",
  tiwenlistfront: "tipsup/tiwenlistfront",
  tiwensocial: "tipsup/tiwensocial",
  tiwendetailfront: "tipsup/tiwendetailfront",
  huidaadd: "tipsup/huidaadd",
  tiweninvit: "tipsup/tiweninvit",
})
