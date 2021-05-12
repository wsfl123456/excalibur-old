/**
 * Created by Luna_Shu on 2018/1/28.
 *
 * @author Luna_Shu
 *
 */
import axios from "axios";
import Qs from "qs";
import { errMsg } from "../assets/conf/errMsg.conf";
import { menuObj } from "../assets/conf/menu.conf";
import store from "../stores";

const _platform = () => {
  const system = {
    win: false,
    mac: false
  };
  const platform = window.navigator.platform;
  system.win = platform.indexOf("Win") !== -1;
  system.mac = platform.indexOf("Mac") !== -1;
  return system;
};
export const parseFileAddress = fileAddress => {
  const platform = _platform();
  let prefix = null; // 路径前缀
  let isWrong = false;
  if (/^Y:(\\)+/.test(fileAddress)) {
    prefix = "NORMCORE";
  } else if (/^X:(\\)+/.test(fileAddress)) {
    prefix = "COOLTOUR";
  } else if (/^V:(\\)+/.test(fileAddress)) {
    prefix = "EXCALIBUR";
  } else if (/^U:(\\)+/.test(fileAddress)) {
    prefix = "IPEC";
  } else if (/^Z:(\\)+/.test(fileAddress)) {
    prefix = "NORMCORE_STORAGE";
  } else if (/^T:(\\)+/.test(fileAddress)) {
    prefix = "GROUP";
  } else if (/^smb:\/\//.test(fileAddress)) {
    if (/^smb:\/\/192.168.100.3\/NORMCORE\//.test(fileAddress)) {
      prefix = "NORMCORE";
    } else if (/^smb:\/\/192.168.100.3\/EXCALIBUR\//.test(fileAddress)) {
      prefix = "EXCALIBUR";
    } else if (/^smb:\/\/192.168.100.3\/IPEC\//.test(fileAddress)) {
      prefix = "IPEC";
    } else if (/^smb:\/\/192.168.100.3\/NORMCORE_STORAGE\//.test(fileAddress)) {
      prefix = "NORMCORE_STORAGE";
    } else if (/^smb:\/\/192.168.100.3\/GROUP\//.test(fileAddress)) {
      prefix = "GROUP";
    } else {
      prefix = "COOLTOUR";
    }
  } else {
    // throw new Error('文件格式错误')
    isWrong = true;
  }
  let shortAddress = fileAddress
    .replace(/\\/g, "/")
    .replace(
      new RegExp("^([YXVU]:(/)+|smb://192.168.100.3/" + prefix + "/)"),
      ""
    );

  const realAddress = platform.mac
    ? `smb://192.168.100.3/${prefix}/${shortAddress}`
    : `smb://` +
      encodeURIComponent(
        `192.168.100.3/${prefix}/${shortAddress}`.replace(/\//g, "\\")
      );

  return isWrong
    ? `javascript: alert('文件地址格式错误，请重新编辑')`
    : realAddress;
  // 直接新窗口打开文件地址
  // window.location.href = realAddress
};
export const getCookie = function(name) {
  let arr;
  let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  arr = document.cookie.match(reg);
  if (arr) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
};

const _setSideMenu = type => {
  store.dispatch("setMenuType", type);
};
export const switchMenu = function(name) {
  if (name === "searchResult") {
    //      搜索结果界面不展示菜单
    store.dispatch("toggleSide", false);
    store.dispatch("setPrimaryMenu", 0);
    sessionStorage.setItem("primaryMenu", 0);
    store.dispatch("setCurrMenu", 0);
    sessionStorage.setItem("currMenu", 0);
  } else {
    let isSide = true;
    _setSideMenu("default");

    const _name = name.split("-")[0];
    switch (_name) {
      case "home":
        store.dispatch("setPrimaryMenu", menuObj["首页"]);
        sessionStorage.setItem("primaryMenu", menuObj["首页"]);
        store.dispatch("setCurrMenu", menuObj["首页"]);
        sessionStorage.setItem("currMenu", menuObj["首页"]);
        isSide = false;
        break;
      case "projects":
        store.dispatch("setPrimaryMenu", menuObj["项目"]);
        sessionStorage.setItem("primaryMenu", menuObj["项目"]);
        store.dispatch("setCurrMenu", menuObj["项目"]);
        sessionStorage.setItem("currMenu", menuObj["项目"]);
        _setSideMenu("project");
        break;
      case "dashborad":
        store.dispatch("setPrimaryMenu", menuObj["dashborad"]);
        sessionStorage.setItem("primaryMenu", menuObj["dashborad"]);
        store.dispatch("setCurrMenu", menuObj["dashborad"]);
        sessionStorage.setItem("currMenu", menuObj["dashborad"]);
        _setSideMenu("dashborad");
        break;
      case "finance":
        store.dispatch("setPrimaryMenu", menuObj["财务管理"]);
        sessionStorage.setItem("primaryMenu", menuObj["财务管理"]);
        store.dispatch("setCurrMenu", menuObj["财务管理"]);
        sessionStorage.setItem("currMenu", menuObj["财务管理"]);
        break;
      case "tasks":
        store.dispatch("setPrimaryMenu", menuObj["任务"]);
        sessionStorage.setItem("primaryMenu", menuObj["任务"]);
        store.dispatch("setCurrMenu", menuObj["任务"]);
        sessionStorage.setItem("currMenu", menuObj["任务"]);
        _setSideMenu("task");
        break;
      case "brands":
        store.dispatch("setPrimaryMenu", menuObj["品牌"]);
        sessionStorage.setItem("primaryMenu", menuObj["品牌"]);
        store.dispatch("setCurrMenu", menuObj["品牌"]);
        sessionStorage.setItem("currMenu", menuObj["品牌"]);
        isSide = false;
        break;
      case "供应商":
        store.dispatch("setPrimaryMenu", menuObj["供应商"]);
        sessionStorage.setItem("primaryMenu", menuObj["供应商"]);
        store.dispatch("setCurrMenu", menuObj["供应商"]);
        sessionStorage.setItem("currMenu", menuObj["供应商"]);
        isSide = false;
        break;
      case "growth":
        store.dispatch("setPrimaryMenu", menuObj["成长"]);
        sessionStorage.setItem("primaryMenu", menuObj["成长"]);
        store.dispatch("setCurrMenu", menuObj["成长"]);
        sessionStorage.setItem("currMenu", menuObj["成长"]);
        break;
      case "schedule":
        store.dispatch("setPrimaryMenu", menuObj["日程"]);
        sessionStorage.setItem("primaryMenu", menuObj["日程"]);
        store.dispatch("setCurrMenu", menuObj["日程"]);
        sessionStorage.setItem("currMenu", menuObj["日程"]);
        break;
      case "support":
        store.dispatch("setPrimaryMenu", menuObj["所需"]);
        sessionStorage.setItem("primaryMenu", menuObj["所需"]);
        store.dispatch("setCurrMenu", menuObj["所需"]);
        sessionStorage.setItem("currMenu", menuObj["所需"]);
        break;
      case "hr":
        store.dispatch("setPrimaryMenu", menuObj["人事"]);
        sessionStorage.setItem("primaryMenu", menuObj["人事"]);
        store.dispatch("setCurrMenu", menuObj["人事"]);
        sessionStorage.setItem("currMenu", menuObj["人事"]);
        break;
      case "设备":
        store.dispatch("setPrimaryMenu", menuObj["设备"]);
        sessionStorage.setItem("primaryMenu", menuObj["设备"]);
        store.dispatch("setCurrMenu", menuObj["设备"]);
        sessionStorage.setItem("currMenu", menuObj["设备"]);
        break;
      case "system":
        store.dispatch("setPrimaryMenu", menuObj["系统"]);
        sessionStorage.setItem("primaryMenu", menuObj["系统"]);
        store.dispatch("setCurrMenu", menuObj["系统"]);
        sessionStorage.setItem("currMenu", menuObj["系统"]);
        break;
      case "resource":
        store.dispatch("setPrimaryMenu", menuObj["资源"]);
        sessionStorage.setItem("primaryMenu", menuObj["资源"]);
        store.dispatch("setCurrMenu", menuObj["资源"]);
        sessionStorage.setItem("currMenu", menuObj["资源"]);
        break;
      case "personal":
        store.dispatch("setCurrMenu", "profile");
        store.dispatch("setPrimaryMenu", "profile");
        sessionStorage.setItem("primaryMenu", "profile");
        sessionStorage.setItem("currMenu", "profile");
        break;
    }
    store.dispatch("toggleSide", isSide);
  }
};

export const zhNum = num => {
  num = +num;
  const zh = [
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "百",
    "千",
    "万",
    "亿"
  ];
  const len = String(num).length;
  if (len === 1) {
    return zh[num];
  } else if (len === 2) {
    if (num === 10) {
      return zh[num];
    } else if (num > 10 && num < 20) {
      return "十" + zh[String(num).charAt(1)];
    } else {
      return (
        zh[String(num).charAt(0)] +
        "十" +
        zh[String(num).charAt(1)].replace("零", "")
      );
    }
  }
};

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.baseURL = "/";

axios.defaults.timeout = 60000;

class Ajax {
  post(
    url,
    data = {},
    headers = { headers: { Authorization: "Bearer " + getCookie("token") } }
  ) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, Qs.stringify(data), headers)
        .then(res => {
          const _data = res.data;
          if (
            _data.retCode !== 100014 &&
            _data.retCode !== 100023 &&
            _data.retCode !== 100001
          ) {
            resolve(_data.retData);
          } else {
            // reject(new Error({msg: errMsg[+_data.retCode]}))
            // reject({msg: errMsg[+_data.retCode]})
            const _errMsg = errMsg[+_data.retCode] || _data.retMsg;
            const err = new Error(_errMsg);
            err.code = +_data.retCode;
            reject(err);
          }
        })
        .catch(err => {
          // reject('err')
          reject(err);
        });
    });
    // return axios.post(url, Qs.stringify(data), headers)
  }
}

export const ajax = new Ajax();

/* 日期格式化 */
export function dateToYMD(date) {
  let d = date instanceof Date ? date : new Date(date);
  let y = d.getFullYear();
  let fm = d.getMonth() + 1;
  let m = fm < 10 ? "0" + fm : fm;
  let fn = d.getDate();
  let n = fn < 10 ? "0" + fn : fn;

  return y + "-" + m + "-" + n;
}

export function dateToYM(date) {
  let d = date instanceof Date ? date : new Date(date);
  let y = d.getFullYear();
  let fm = d.getMonth() + 1;
  let m = fm < 10 ? "0" + fm : fm;

  return y + m ;
}

/* 颜色渐变 */
export const gradientColor = (startColor, endColor, step) => {
  function colorRgb(sColor) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      var sColorChange = [];
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return sColorChange;
    } else {
      return sColor;
    }
  }
  // 将rgb表示方式转换为hex表示方式
  function colorHex(rgb) {
    var _this = rgb;
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
      var strHex = "#";
      for (var i = 0; i < aColor.length; i++) {
        var hex = Number(aColor[i]).toString(16);
        hex = hex < 10 ? 0 + "" + hex : hex; // 保证每个rgb的值为2位
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    } else if (reg.test(_this)) {
      var aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      } else if (aNum.length === 3) {
        var numHex = "#";
        for (var i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  var startRGB = colorRgb(startColor); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = colorRgb(endColor);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;

  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值
    var hex = colorHex(
      "rgb(" +
        parseInt(sR * i + startR) +
        "," +
        parseInt(sG * i + startG) +
        "," +
        parseInt(sB * i + startB) +
        ")"
    );
    colorArr.push(hex);
  }
  return colorArr;
};

/* dashborad颜色列表 */
export const dashboradColor = [
  "#57A5F9",
  "#FFE15B",
  "#FF9F01",
  "#7ED321",
  "#DB2425",
  "#CF65B9",
  "#f7acbc",
  "#444693",
  "#b2d235",
  "#CFB365",
  "#9575CD",
  "#5BC89E",
  "#ef5b9c",
  "#f3704b",
  "#F61319",
  "#F2328A",
  "#44C133",
  "#98125A",
  "#AAEAD9",
  "#33a3dc",
  "#8e3e1f",
  "#b69968",
  "#fcf16e",
  "#a1a3a6",
  "#f15a22",
  "#006c54",
  "#b54334",
  "#411445",
  "#6f599c",
  "#705628",
  "#2e3a1f",
  "#ca8687",
  "#181d4b",
  "#b2d235",
  "#5c7a29",
  "#7f7522",
  "#6a6da9",
  "#ed1941",
  "#d2553d",
  "#1d1626",
  "#081C67",
  "#5B1D2E",
  "#4A6A06",
  "#195D53",
  "#80B404"
];

/* dashborad渐变颜色列表 */
export const dashboradCustomerColor = [
  "#000",
  "#257803",
  "#69040C",
  "#6E0465",
  "#3E0480",
  "#04477F",
  "#7F3604 ",
  "#037875",
  "#77270C",
  "#157707"
  // "#077AF4"
];

/* dashborad Y轴最大值 */
export const maxValue = value => {
  value = Number(value);
  // debugger;
  if (value < 0) {
    if (value > -5) {
      val2 = -5;
    } else {
      value = Math.abs(Math.floor(value));
      var val1 = Math.abs(value) / 10;
      var val2 = -Math.ceil(val1) * 10;
    }
  } else if (0 < value && value < 1) {
    val2 = 10;
  } else if (value < 1000 && value >= 1) {
    //小于1000 十位进1
    var val1 = value / 10;
    var val2 = Math.ceil(val1) * 10;
  } else {
    //大于1000 第二位进1
    var length = value.toString().length;
    var numStr = "1";
    for (var i = 0; i < length - 2; i++) {
      numStr += "0";
    }
    var val1 = value / Number(numStr);
    var val2 = Math.ceil(val1) * Number(numStr);
  }

  return val2;
};

/* dashborad Y轴最大百分比 */
export const maxPercent = value => {
  var resValue;
  if (value <= 100) {
    resValue = 100;
  } else {
    resValue = Math.ceil(value / 100) * 100;
  }
  return resValue;
};

/* 校验表单数据 */
export function checkForm(formObj) {
  if (typeof formObj !== "object") return false;

  let passed = Object.values(formObj).find(item => {
    if (item.required && !item.value) return item;
  });

  return passed || true;
}

/*
 * 将小数进行千分位分割
 * */
export function thousandSplit(str) {
  const split = str.split(".");
  let integer = split.shift();

  let isNegative = false;
  if (parseFloat(integer) < 0) {
    isNegative = true;
    integer = integer.slice(1);
  }

  const decimal = split.shift();
  const count = Math.ceil(integer.length / 3);
  const strArr = [];

  for (let i = 0; i < count; i++) {
    strArr.unshift(integer.slice(-3 * (i + 1), i === 0 ? undefined : -3 * i));
  }

  return (
    (isNegative ? "-" : "") + strArr.join(",") + (decimal ? "." + decimal : "")
  );
}

/*
 *  仪表盘基础配置
 * */
export const EchartsBasicOptions = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999"
      },
      label: {
        color: "black"
      }
    }
  },
  legend: {
    itemGap: 30,
    textStyle: { color: "#868E96" }
  },
  xAxis: {
    axisPointer: {
      type: "shadow"
    },
    axisLine: {
      lineStyle: {
        type: "solid",
        color: "#e9ecef", //左边线的颜色
        width: "1" //坐标线的宽度
      }
    },
    axisLabel: {
      rotate: "-45",
      textStyle: {
        color: "#999", //坐标值得具体的颜色
        fontSize: 14
      }
    },
    axisLine: {
      lineStyle: {
        type: "solid",
        color: "#e9ecef", //左边线的颜色
        width: "1" //坐标线的宽度
      }
    }
  },
  color: dashboradColor
};

/*
 *  仪表盘默认开始日期
 * */
export const StartMonth = new Date().getFullYear() + "-01";

/*
 *  仪表盘默认结束日期
 * */
export const EndMonth =
  new Date().getFullYear() +
  "-" +
  (new Date().getMonth() + 1 > 9
    ? new Date().getMonth() + 1
    : "0" + (new Date().getMonth() + 1));

/**
 * 6-16位数字/字母/符号组合
 */
export function PasswordCheck(strPassword) {
  if (strPassword === "") return true;
  let num = 0;
  if (strPassword.search(/[A-Z]/) != -1) {
    num += 1;
  }
  if (strPassword.search(/[0-9]/) != -1) {
    num += 1;
  }
  if (strPassword.search(/[a-z]/) != -1) {
    num += 1;
  }
  if (strPassword.search(/[^A-Za-z0-9]/) != -1) {
    num += 1;
  }
  if (num >= 2 && (strPassword.length >= 6 && strPassword.length <= 16)) {
    return true;
  } else {
    return false;
  }
}

/**
     * 获取 blob
     * @param  {String} url 目标文件地址
     * @return {Promise}
     */
    function getBlob(url) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);
        xhr.responseType = "blob";
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(xhr.response);
          }
        };

        xhr.send();
      });
    }

    /**
     * 保存
     * @param  {Blob} blob
     * @param  {String} filename 想要保存的文件名称
     */
    function saveAs(blob, filename) {
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
      } else {
        const link = document.createElement("a");
        const body = document.querySelector("body");

        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        // fix Firefox
        link.style.display = "none";
        body.appendChild(link);

        link.click();
        body.removeChild(link);

        window.URL.revokeObjectURL(link.href);
      }
    }

    /**
     * 下载
     * @param  {String} url 目标文件地址
     * @param  {String} filename 想要保存的文件名称
     */
    export function downloadFile(url, filename) {
      getBlob(url).then(blob => {
        saveAs(blob, filename);
      });
    }
    /**
 * 富文本编辑器配置
 */
export const editorOptions = {
  modules: {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
        ["link", "image", "video"]
      ]
    }
  },
  placeholder: "请在此输入内容"
};
/**
 * 字节转化
 */

 export function bytesToSize(limit) {
  var size = "";
  if (limit < 0.1 * 1024) {
    //如果小于0.1KB转化成B
    size = limit.toFixed(2) + "B";
  } else if (limit < 0.1 * 1024 * 1024) {
    //如果小于0.1MB转化成KB
    size = (limit / 1024).toFixed(2) + "KB";
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    //如果小于0.1GB转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + "MB";
  } else {
    //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  }

  var sizestr = size + "";
  var len = sizestr.indexOf(".");
  var dec = sizestr.substr(len + 1, 2);
  if (dec == "00") {
    //当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
  }
  return sizestr;
}