import Vue from "vue";
import Router from "vue-router";

import TaskRoute from "./task";
import ProjectRoute from "./project";
import ContractRoute from "./contract";
import FinanCertificate from "./finanCertificate";
import Dashborad from "./dashborad";
import Brands from "./brands";
import BrandsAudit from "./brandsAudit";
import Suppliers from "./suppliers";
import Vacation from "./vacation";
import Schedule from "./schedule";
import Salary from "./salary";
import Study from "./study";
import Employee from "./employee";
import Money from "./money";
import Attend from "./attend";
import DeviceManage from "./deviceManage";
import Device from "./device";
import MyDevice from "./myDevice";
import MyReimburse from "./myReimburse";
import SysNotice from "./sysNotice";
import MenuConfManage from "./menuConfManage";
import FunctionManage from "./functionManage";
import FinanceManage from "./financeManage";
import FinanceReport from "./financeReport";
import FinanceCertificates from "./financeCertificates";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../pages/login/Login")
  },
  {
    path: "/findPassword",
    name: "findPassword",
    component: () => import("../pages/login/findPassword.vue")
  },
  {
    path: "/redirect",
    name: "redirect",
    component: () => import("../components/redirect")
  },
  {
    path: "/survey/:code",
    name: "survey",
    component: () => import("../pages/survey/Customer")
  },
  {
    path: "/sysNotice/detail/:id",
    name: "sysNoticeDetail",
    component: () => import("../pages/notice/SysNoticeDetail")
  },
  {
    path: "/",
    name: "index",
    component: () => import("../pages/Index"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("../pages/home/index")
      },
      {
        path: "resource",
        name: "resource",
        component: () => import("../pages/PageContainer"),
        children: []
      },
      {
        path: "calendar",
        name: "Calendar",
        component: () => import("../pages/PageContainer"),
        children: [
          {
            path: "list",
            name: "schedule-allSchedule",
            component: () => import("../pages/schedule/All")
          }
        ]
      },
      {
        path: "ox",
        name: "OX",
        component: () => import("../pages/PageContainer"),
        children: [
          {
            path: "list",
            name: "growth-growthOX",
            component: () => import("../pages/growth/OX")
          }
        ]
      },
      {
        path: "tips",
        name: "Tips",
        component: () => import("../pages/PageContainer"),
        children: [
          {
            path: "list",
            name: "growth-tipsList",
            component: () => import("../pages/tips/TipsList")
          }
        ]
      },
      TaskRoute,
      ProjectRoute,
      ContractRoute,
      FinanCertificate,
      Dashborad,
      Brands,
      BrandsAudit,
      Suppliers,
      Vacation,
      Schedule,
      Salary,
      Study,
      Employee,
      Money,
      Attend,
      DeviceManage,
      Device,
      FinanceManage,
      FinanceReport,
      FinanceCertificates,
      {
        path: "repair",
        name: "Repair",
        component: () => import("../pages/PageContainer"),
        children: [
          {
            path: "list",
            name: "resource-device-deviceRepair",
            component: () => import("../pages/device/Repair")
          }
        ]
      },
      MyDevice,
      MyReimburse,
      {
        path: "profile",
        name: "userCenter",
        component: () => import("../pages/PageContainer"),
        children: [
          {
            path: "list",
            name: "personal-userCenterList",
            component: () => import("../pages/user/UserCenter")
          }
        ]
      },
      {
        path: "my-train",
        name: "myTrain",
        component: () => import("../pages/PageContainer"),
        children: [
          {
            path: "list",
            name: "growthMyTrain",
            component: () => import("../pages/growth/MyTrain")
          }
        ]
      },
      {
        path: "my-points",
        name: "myPoints",
        component: () => import("../pages/PageContainer"),
        children: [
          {
            path: "list",
            name: "userMyPoints",
            component: () => import("../pages/user/MyPoints")
          }
        ]
      },
      {
        path: "setting",
        name: "systemSetting",
        component: () => import("../pages/PageContainer"),
        children: [
          {
            path: "list",
            name: "personal-systemSettingList",
            component: () => import("../pages/user/SystemSetting")
          }
        ]
      },
      {
        path: "msg",
        name: "Message",
        component: () => import("../pages/PageContainer"),
        children: [
          {
            path: "list",
            name: "personal-userMsg",
            component: () => import("../pages/user/Message")
          }
        ]
      },
      SysNotice,
      {
        path: "notice",
        name: "userNotice",
        component: () => import("../pages/user/Notice")
      },
      {
        path: "searchResult",
        name: "searchResult",
        component: () => import("../pages/search/Result")
      },
      {
        path: "PRAudit/:id",
        name: "pRList",
        component: () => import("../pages/PRAudit/List")
      },
      {
        path: "PRAdd",
        name: "PRAdd",
        component: () => import("../pages/PRAudit/Add")
      },
      {
        path: "PREdit/:id",
        name: "PREdit",
        component: () => import("../pages/PRAudit/Edit")
      },
      {
        path: "system",
        name: "userManagement",
        component: () => import("../pages/PageContainer"),
        children: [
          {
            path: "userManage",
            name: "resource-system-sysUsers",
            component: () => import("../pages/system/Users")
          }
        ]
      },
      MenuConfManage,
      FunctionManage,
      {
        path: "windowPrint",
        name: "WindowPrint",
        component: () => import("../components/windowPrint/index.vue")
      }
    ]
  },
  /* 系统改版路由 */
  {
    path: "/new",
    name: "NewSystem",
    component: () => import("../components/NewContainer"),
    children: [
      {
        path: "dri",
        name: "dri",
        component: () => import("../pages/PageContainer.vue"),
        children: [
          {
            path: "index",
            name: "driIndex",
            component: () => import("../pages/dri/Index")
          },
          {
            path: "detail/:driUserId",
            name: "driDetail",
            component: () => import("../pages/dri/Detail")
          },
          {
            path: "brief/:briefId",
            name: "driBrief",
            component: () => import("../pages/dri/BriefDetail")
          },
          {
            path: "create",
            name: "driCreate",
            component: () => import("../pages/dri/Create")
          },
          {
            path: "createReach/:driObjectId/:year",
            name: "driCreateReach",
            component: () => import("../pages/dri/CreateReach")
          },
          {
            path: "financial",
            name: "driFinancialScore",
            component: () => import("../pages/dri/FinancialScore")
          },
          {
            path: "bigBug",
            name: "driBigBugScore",
            component: () => import("../pages/dri/BigBugScore")
          },
          {
            path: "compliance",
            name: "driComplianceScore",
            component: () => import("../pages/dri/ComplianceScore")
          }
        ]
      },
      {
        path: "nccBook",
        name: "nccBook",
        component: () => import("../pages/PageContainer.vue"),
        children: [
          {
            path: "map",
            name: "nccBookMap",
            component: () => import("../pages/nccBook/MapIndex.vue")
          },
          {
            path: "map/create",
            name: "nccBookMapCreate",
            component: () => import("../pages/nccBook/CreateMap.vue")
          },
          {
            path: "map/detail/:tipsId",
            name: "nccBookMapdetail",
            component: () => import("../pages/nccBook/MapDetail.vue")
          },
          {
            path: "store",
            name: "nccBookStore",
            component: () => import("../pages/nccBook/StoreIndex.vue")
          },
          {
            path: "store/create",
            name: "nccBookStoreCreate",
            component: () => import("../pages/nccBook/CreateStore.vue")
          },
          {
            path: "store/detail/:storeId",
            name: "nccBookStoredetail",
            component: () => import("../pages/nccBook/StoreDetail.vue")
          },
          {
            path: "house",
            name: "nccBookHouse",
            component: () => import("../pages/nccBook/HouseIndex.vue")
          },
          {
            path: "house/create",
            name: "nccBookHouseCreate",
            component: () => import("../pages/nccBook/CreateHouse.vue")
          },
          {
            path: "house/detail/:houseId",
            name: "nccBookHousedetail",
            component: () => import("../pages/nccBook/HouseDetail.vue")
          },
          {
            path: "question",
            name: "nccBookQuestion",
            component: () => import("../pages/nccBook/QuestionIndex.vue")
          },
          {
            path: "question/create",
            name: "nccBookQuestionCreate",
            component: () => import("../pages/nccBook/CreateQuestion.vue")
          },
          {
            path: "question/detail/:questionId",
            name: "nccBookQuestionDetail",
            component: () => import("../pages/nccBook/QuestionDetail.vue")
          },
          {
            path: "answer/create/:tiwenId",
            name: "nccBookAnswerCreate",
            component: () => import("../pages/nccBook/CreateAnswer.vue")
          },
        ]
      }
    ]
  }
];

/* 计算路由数量 */
let routeCount = 0;
function countRoute(routes) {
  for (let i = 0; i < routes.length; i++) {
    routeCount++;
    if (routes[i].children) countRoute(routes[i].children);
  }
}
countRoute(routes);
console.log(`%c全部路由一共 ${routeCount} 个`, "color: purple;");
export default new Router({
  mode: "history",
  routes
});
