<template>
  <div>
    <div class="g-mb-32">
      <i-input placeholder="请输入项目ID，如C001Y2016R008, C001Y2017P001" v-model="searchValue" @on-keydown="search" name="id">
        <span slot="prepend"><Icon type="ios-search-strong" size="20"></Icon></span>
      </i-input>
    </div>
    <div class="result-list">
      <loading v-if="isLoading"></loading>
      <div class="pwd-ipt" v-if="needPwd">
        <div>
          <i-input class="ipt" type="password" placeholder="请输入6位查询密码" v-model="pwd"></i-input>
          <div>
            <Button type="primary" class="submit-btn" size="large" @click="submitPwd">提交</Button>
          </div>
        </div>
      </div>
      <h4>查询结果：</h4>
      <table class="">
        <tr>
          <th><div class="table-cell">姓名</div></th>
          <th><div class="table-cell">项目名称</div></th>
          <th><div class="table-cell">项目ID</div></th>
          <th><div class="table-cell">项目职能</div></th>
          <th><div class="table-cell">项目奖金</div></th>
          <th><div class="table-cell">发放时间</div></th>
          <th><div class="table-cell">个税扣除</div></th>
        </tr>
        <tr v-if="isEmpty">
          <td colspan="7"><div class="table-cell empty">没有数据</div></td>
        </tr>
        <tr v-for="(item, idx) in bonusList" :key="idx" v-else>
          <td>
            <div class="table-cell">
              {{item.userName}}
            </div>
          </td>
          <td>
            <div class="table-cell">
              {{item.projectName}}
            </div>
          </td>
          <td>
            <div class="table-cell">
              {{item.projectCode}}
            </div>
          </td>
          <td>
            <div class="table-cell">
              {{item.functionName}}
            </div>
          </td>
          <td>
            <div class="table-cell">
              {{item.bonus}}
            </div>
          </td>
          <td>
            <div class="table-cell">
              {{item.month | filterYear}}
            </div>
          </td>
          <td>
            <div class="table-cell">
              {{item.tax}}
            </div>
          </td>
        </tr>
      </table>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  import {Growth} from '../../API/api'
  export default {
    components: {
      Toast,
      Loading,
      BCrumb},
    name: 'bonus',
    data () {
      return {
        crumb: [
          {label: '成长计划'},
          {label: '薪酬与福利'},
          {label: '项目奖金查询'}
        ],
        isToast: false,
        toastMsg: null,
        isLoading: false,
        bonusList: [],
        needPwd: false,
        pwd: '',
        searchValue: '',
        isEmpty: false
      }
    },
    methods: {
      search (e) {
        if (e.keyCode === 13 && !this.needPwd) {
          this.getBonus(this.searchValue)
        }
      },
      submitPwd () {
        this.$http.post(Growth.bonusPwd, this.qs.stringify({password: this.pwd}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.needPwd = false
            this.getBonus()
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }, 1500)
        })
      },
      getBonus (id) {
        this.isLoading = true
        this.$http.post(Growth.bonus, this.qs.stringify({projectCode: id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            if (this._.isEmpty(_data.retData)) {
              this.needPwd = true
            } else {
              if (+_data.retData.count === 0) {
                this.isEmpty = true
              } else {
                this.isEmpty = false
                this.bonusList = _data.retData.data
              }
            }
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }

          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }, 1500)
        })
      }
    },
    created () {
      this.getBonus()
    }
  }
</script>

<style scoped lang="less">
  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border: 1px solid #e9ecef;
  }
  th {
    text-align: left;
    background-color: #fff;
    font-size: 12px;
    color: #868e96;
    font-weight: normal;
    border: 1px solid #e9ecef;
    height: 32px;
    &:hover, &.active {
      background-color: #f8f9fa;
    }
    i {
      color: #2d8ef8;
    }
  }
  td {
    font-size: 14px;
    color: #343a40;
    height: 48px;
    border-bottom: 1px solid #e9ecef;
    &.empty-data {
      text-align: center;
    }
  }
  tbody {
    tr {
      &:hover {
        td {
          background-color: #f8f9fa;
        }
      }
    }
  }
  .table-cell {
    display: inline-block;
    vertical-align: middle;
    padding-left: 18px;
    padding-right: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    word-wrap: normal;
    box-sizing: border-box;
    text-align: left;
    &.empty {
      text-align: center;
      display: block;
    }
  }
  .result-list {
    position: relative;
    min-height: 300px;
    .pwd-ipt {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, .5);
      display: flex;
      justify-content: center;
      align-items: center;
      > div {
        text-align: center;
      }
      .ipt {
        width: 300px;
        margin-bottom: 16px;
      }
      .submit-btn {
        /*background-color: #2d8ef8;*/
        /*width: 120px;*/
        /*height: 40px;*/
        /*border-radius: 4px;*/
        /*text-align: center;*/
        /*text-decoration: none;*/
        /*color: #fff;*/
        /*font-size: 14px;*/
        /*border: 0 none;*/
        &:hover {
          /*opacity: .8;*/
        }
      }
    }
  }
</style>
