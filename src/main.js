import 'fullcalendar/dist/fullcalendar.css'
import 'iview/dist/styles/iview.css'
import './assets/iconfont/iconfont.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stores/index'
import iView from 'iview'
import axios from 'axios'
import './assets/less/base.less'
import Qs from 'qs'
import * as _ from 'lodash'
import VueCookie from 'vue-cookie'
import { parseFileAddress, switchMenu, zhNum } from './util/util'
import Vueditor from 'vueditor'

import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import { Message } from 'element-ui';
import VueAnalytics from 'vue-analytics';



import echarts from 'echarts'

Vue.prototype.$echarts = echarts
// import * as Sentry from '@sentry/browser'
if (process.env.NODE_ENV !== 'development') {
  Raven
    .config('https://59c09386f98d4441ae56636943382b37@sentry.normcore.com/2', {
      environment: process.env.NODE_ENV
    })
    .addPlugin(RavenVue, Vue)
    .install()
}

const lang = {
  app: {},

  removeFormat: { title: '清除格式' },

  bold: { title: '加粗' },
  italic: { title: '斜体' },
  underline: { title: '下划线' },
  strikeThrough: { title: '中划线' },

  superscript: { title: '上标' },
  subscript: { title: '下标' },
  indent: { title: '增加缩进' },
  outdent: { title: '减少缩进' },

  justifyLeft: { title: '左对齐' },
  justifyCenter: { title: '居中对齐' },
  justifyRight: { title: '右对齐' },
  justifyFull: { title: '两端对齐' },

  insertOrderedList: { title: '插入有序列表' },
  insertUnorderedList: { title: '插入无序列表' },

  foreColor: {
    title: '文字颜色',
    ok: '确定',
    colorCode: '颜色代码',
    invalidColorCodeMsg: '请输入正确的颜色代码。'
  },
  backColor: {
    title: '背景颜色',
    ok: '确定',
    colorCode: '颜色代码',
    invalidColorCodeMsg: '请输入正确的颜色代码。'
  },
  fontName: {},
  fontSize: {},
  code: {},
  element: {},
  design: {
    ieMsg: '在IE浏览器中必须选中一段文字才能使用此功能！'
  },
  link: {
    title: '添加超链接',
    ok: '确定',
  },
  unLink: {
    title: '取消超链接'
  },
  markdown: {
    title: 'markdown'
  },
  picture: {
    title: '插入图片',
    ok: '确定',
    cancel: '取消',
    invalidFile: '未选择图片或选择的文件并非图片!'
  },
  sourceCode: {
    title: '源码'
  },
  fullscreen: {
    title: '全屏'
  },
  table: { title: '表格' },
  undo: { title: '撤销' },
  redo: { title: '恢复' }
}

const editConf = {
  toolbar: [
    'removeFormat', 'undo', 'redo', '|', 'element', 'fontSize', 'foreColor', 'backColor', 'divider', 'bold', 'italic', 'underline', 'strikeThrough',
    'link', 'unLink', 'divider', 'subscript', 'superscript', 'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
    '|', 'indent', 'outdent', 'insertOrderedList', 'insertUnorderedList', '|', 'emoji', 'picture', 'table', '|', 'fullscreen', 'sourceCode', 'markdown'
  ],
  lang: lang,
  // fontName: [
  //   {val: 'arial black'},
  //   {val: 'arial black'},
  //   {val: 'times new roman'},
  //   {val: 'Courier New'}
  // ],
  fontSize: ['10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px', '32px', '34px'],
  uploadUrl: '/api' + location.href.split('/#/')[0] + '/ueditor/index?action=uploadimage&encode=utf-8',
}
Vue.use(Vueditor, editConf)

Vue.use(VueCookie)

Vue.use(VueAnalytics, {
  id: 'UA-145234507-1',
  router,
  autoTracking: {
    pageviewTemplate (route) {
      return {
        page: route.path,
        title: route.title,
        location: window.location.href
      }
    }
  }
})

Vue.prototype.qs = Vue.prototype.qs || Qs
Vue.prototype._ = Vue.prototype._ || _
Vue.config.productionTip = false

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = "/"

axios.defaults.timeout = 60000

Vue.prototype.$http = axios
Vue.prototype._parseFileAddress = parseFileAddress
// Vue.prototype.citysConf = city

Vue.use(iView)

iView.LoadingBar.config({
  // color: '#FAFFBD'
  // color: '#dde8f6'
  // color: '#fff9db'
  color: '#f90'
})

/* 新老路由对等图 */
const RoutePair = {
  '/v2/home': '/home',
  '/v2/resource/brand': '/brands/list',
  '/v2/resource/supplier': '/suppliers/list',
  '/v2/growth/professionLine': '/tips/list'
};

router.beforeEach((to, from, next) => {
  document.documentElement
  ? (document.documentElement.scrollTop = 0)
  : (document.body.scrollTop = 0);
  /* 新老系统跳转路由，当检测到/v2/* 下面的路由时跳转至新系统 */
  const isNewSys = to.fullPath.indexOf('v2');

  if (isNewSys !== -1 && isNewSys < 2) {
    if (process.env.NODE_ENV === 'production') {
      window.location.href = to.fullPath;
      return;
    }else {
      next({name: 'redirect', query: {route: to.fullPath, origin: RoutePair[to.fullPath] }});
      console.error(`跳转路由为新系统路由，开发环境请手动打开 新系统 ${to.fullPath}, 请不要在在老系统修改此页面`);
    }
  }
  // console.log(to)

  if (to.name === 'login' || to.name === 'findPassword') {
    next()
    return;
  } else {
    const cookie = VueCookie.get('token')
    if (cookie) {
      next()
    } else {
      Message.error({
        message: '身份验证失败，即将跳转至登录界面',
        onClose() {
          router.push({
            name: 'login',
            query: {
              redirect: to.fullPath
            }
          })
        },
      });
       next();
      return;
    }
  }

  if (to.meta.parent == 'dashborad') {
    if (to.query.customerId && to.query.id) {
      store.commit('changeDashboradActiveName', to.meta.type + "|" + to.query.customerId + "|" + to.query.id)
      store.commit(
        'changeOpenDashborad',
        [to.meta.type, to.query.customerId]
      );

    } else if (!to.query.customerId && to.query.id) {
      store.commit('changeDashboradActiveName', to.meta.type + "|"  + to.query.id)
      store.commit(
        'changeOpenDashborad',
        [to.meta.type]
      );
    }else {
      store.commit('changeDashboradActiveName', to.meta.type)
      store.commit(
        'changeOpenDashborad',
        []
      );
    }
  }
  // iView.LoadingBar.start()
  next()
})
router.afterEach((to) => {
  switchMenu(to.name || '');
})

Vue.filter('filterYear', function (value) {
  let nowYear = new Date().getFullYear()
  let _v = value
  if (!(value instanceof Object) && value.indexOf('T') >= 0) {
    const vDate = new Date(value)
    _v = `${vDate.getFullYear()}-${vDate.getMonth() + 1 < 10 ? '0' + (vDate.getMonth() + 1) : vDate.getMonth() + 1}-${vDate.getDate() < 10 ? '0' + vDate.getDate() : vDate.getDate()} ${vDate.getHours() < 10 ? '0' + vDate.getHours() : vDate.getHours()}:${vDate.getMinutes() < 10 ? '0' + vDate.getMinutes() : vDate.getMinutes()}`
  }
  if (!(value instanceof Object) && _v.indexOf(nowYear) >= 0) {
    return _v.substr(5)
  } else {
    return _v
  }
})
Vue.filter('filterYearNTime', function (value) {
  let nowYear = new Date().getFullYear()
  if (value.indexOf(nowYear) >= 0) {
    return value.substr(5).replace('00:00:00', '')
  } else {
    return value.replace('00:00:00', '')
  }
})
Vue.filter('filterYearNSecond', function (value) {
  let nowYear = new Date().getFullYear()
  if (value.indexOf(nowYear) >= 0) {
    return value.substr(5).replace(':00', '')
  } else {
    return value.replace(':00', '')
  }
})
Vue.filter('filterDate', function (value, fmt) {
  let _v = value.replace(' ', 'T')
  const date = new Date(_v)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
    }
  }
  return fmt
})
Vue.filter('parseFileAddress', parseFileAddress)

Vue.filter('newLine', function (value, keyStr) {
  if (value) {
    return value.replace(new RegExp(keyStr, 'g'), ';<br/>')
  }
})
Vue.filter('zhNum', zhNum)


/* import element-ui and Datatable */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vuejs2-datatable/dist/index.css'


Vue.use(ElementUI);


const vm = new Vue({
  ...App,
  store,
  router
}).$mount('#app');

global.vm = vm
