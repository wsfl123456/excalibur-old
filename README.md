# Normcore_BOS

> Normcore BOS System  诺科BOS系统

## 环境需求
> "node": ">= 8.0.0",  
> "npm": ">= 3.0.0"

## 主要依赖库说明
* vue ---- 前端开发框架
* vuex ---- 状态管理工具
* vue-router ---- 前端路由
* axios ---- http请求库 类似 jQuery的 $.ajax
* iview ---- pc端UI组件库
* less ---- css预编译工具
* es6 ---- js语法

所有依赖请看 `package.json`

## 编译配置
* 安装依赖  
  在 CMD / Terminal 中执行以下命令
  ```bash
  npm install
  ```
* 运行开发环境
  ```bash
  npm run dev
  or
  npm run start
  ```
* 打包编译生产环境
  ```bash
  npm run build
  ```

# 特殊符号说明
### '+'
若在变量前 独立出现一个 `+` 则是 使用了位运算 将 `String`型 数字 转换成 `Number`型

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
