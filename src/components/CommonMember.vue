<!--添加成员 组件-->
<template>
  <div class="select-member">
    <!--{{_selectedUsers}}-->
    <!--{{users}}-->
    <div v-clickoutside="closeUserSelection">
      <div class="selected-member" v-for="(obj, index) in selectedUsers" :key="index" v-if="obj.hasOwnProperty('id')">
        <Poptip :transfer="transfer" trigger="hover" width="240">
          <Avatar :icon="obj.name ? '' : 'person'" :src="obj.headPic">{{obj.name ? obj.name.substr(0, 2) : ''}}</Avatar>
          <div slot="title">
            <div class="selected-member-detail g-flex">
              <Avatar :icon="obj.name ? '' : 'person'" :src="obj.headPic">{{obj.name ? obj.name.substr(0, 2) : ''}}</Avatar>
              <div class="g-flex-1">
                <h2>{{obj.name}}</h2>
                <!--<p>{{obj.department + ' - ' + obj.title}}</p>-->
                <p>{{obj.positionName}}</p>
              </div>
            </div>
          </div>
          <div slot="content" v-if="isEdit && canExit">
            <button  type="button" class="exit-member-btn" @click="exitMember(index)">{{exitTxt}}</button>
          </div>
        </Poptip>
      </div>
      <Tooltip :content="content" placement="bottom" class="member-add-tip" v-if="isEdit && (multi || selectedUsers.length === 0 || !selectedUsers[0].hasOwnProperty('id'))">
        <Icon type="plus-circled"  size="24" color="#107cd9" class="member-add" @click.native="openUserSelection" ></Icon>
      </Tooltip>
      <div class="member-selection-pop" :class="{opened: userSelectionOpened}">
        <div class="member-search">
          <i-input type="text" name="member" placeholder="输入项目成员姓名" class="member-name-ipt" v-model="searchValue" @on-change="filterUsers"></i-input>
        </div>
        <div class="often" v-if="searchValue.length === 0">
          <h4>最常协作</h4>
          <ul class="f-clearfix" v-if="often.length !== 0">
            <li class="g-fl" v-for="(item, index) in often" :key="index" @click="selectUser(item)">
              <Avatar icon="person" :src="item.src"></Avatar>{{item.name}}
            </li>
          </ul>
          <div v-else>
            <p>没有经常协作的项目成员</p>
          </div>
        </div>
        <div class="result" v-else>
          <ul>
            <li v-for="(item, index) in result" :key="index" @click="selectUser(item)">
              <Avatar icon="person" :src="item.headPic"></Avatar>{{item.name}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MemberSelection from './popup/MemberSelection'
  import clickoutside from '../directives/clickoutside'
  import { Index } from '../API/api'
  export default {
    components: {MemberSelection},
    name: 'common-member',
    directives: {clickoutside},
    props: {
      canExit: {
        type: Boolean,
        default: true
      },
      onChange: {
        type: Function,
        default: function () {}
      },
      exitTxt: {
        type: String,
        default: '退出任务'
      },
      users: {
        type: Array
      },
      isEdit: {
        type: Boolean,
        default: true
      },
      content: {
        type: String
      },
      multi: { // 是否可添加多个成员
        type: Boolean,
        default: false
      },
      transfer: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        userSelectionOpened: false,
        // memberSelection
        often: [
          // {id: 1, name: 'name', src: '', department: 'Creative', title: 'Copy'},
          // {id: 2, name: 'name2', src: '', department: 'Tech', title: 'FontEnd'},
          // {id: 3, name: 'name3', src: '', department: 'Creative', title: 'Copy'},
          // {id: 4, name: 'name4', src: '', department: 'Art', title: 'UI'}
        ],
        searchValue: '',
        selectedUsers: this.users || [],
        allUsers: [],
        result: []
      }
    },
    computed: {
      _selectedUsers () {
        return this.users || []
      }
    },
    watch: {
      // users: {
      //   // immediate: true,
      //   handler (data) {
      //     this.selectedUsers = data
      //   }
      // }
      // _selectedUsers: {
      //   handler (data) {
      //   }
      // }
    },
    methods: {
      filterUsers (e) {
        let v = e.target.value
        let _result = this.allUsers.filter((item, index) => {
          if (item.name.toLowerCase().indexOf(v.toLowerCase()) !== -1) {
            return item
          }
        })
        this.result = _result
      },
      openUserSelection () {
        let data = {}
        this.$http.post(Index.allUsers, this.qs.stringify(data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          const _data = res.data
          if (_data.retCode === 0) {
            this.allUsers = _data.retData.data
          }
        })
        this.userSelectionOpened = !this.userSelectionOpened
      },
      closeUserSelection () {
        this.userSelectionOpened = false
        this.searchValue = ''
      },
      exitMember (idx) {
        this.selectedUsers.splice(idx, 1)
        if (this.multi) {
          this.$emit('on-change', this.selectedUsers)
        } else {
          this.$emit('on-change', {})
        }
      },
      selectUser (userObj) {
        if (this.multi) {
          if (!this.selectedUsers) {
            this.selectedUsers = []
          }
          if (this.selectedUsers.indexOf(userObj) < 0) {
            this.selectedUsers.push(userObj)
          }
          this.$emit('on-change', this.selectedUsers)
        } else {
          this.selectedUsers = [userObj]
          this.$emit('on-change', this.selectedUsers[0])
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .selected-member {
    display: inline-block;
    line-height: 48px;
    vertical-align: top;
    margin-right: 10px;
    .selected-member-detail {
      .ivu-avatar {
        margin-right: 12px;
      }
      h2 {
        color: #343a40;
        font-size: 18px;
        font-weight: normal;
        font-family: Abel;
      }
      p {
        color: #343a40;
        font-size: 10px;
        font-family: Abel;
      }
    }
    .exit-member-btn {
      display: block;
      width: 100%;
      height: 32px;
      background-color: #f1f3f5;
      border: 1px solid #e9ecef;
      border-radius: 0;
      color: #868e96;
      font-size: 12px;
    }

  }
  .select-member {
    position: relative;
    > div {
      display: inline-block;
      /*letter-spacing: -1px;*/
    }
  }
  .member-add {
    line-height: 53px;
    vertical-align: middle;

  }
  .opened {
    opacity: 1!important;
    z-index: 100!important;
  }

  // memberSelection
  .member-search {
    padding: 16px;
  }
  .result {
    height: 48px*3;
    overflow: auto;
  }
  .often {
    ul {
      li {
        width: 50%;
      }
    }
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 96px;
      p {
        font-family: PingFangSC;
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #868e96;
      }
    }
  }
  h4 {
    font-family: PingFangSC;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #868e96;
    padding: 0 16px;
  }
  .member-selection-pop {
    position: absolute;
    box-shadow: 0 2px 4px 0 rgba(134, 142, 150, 0.6);
    border: solid 1px #e9ecef;
    background-color: #fff;
    z-index: -1;
    /*padding: 16px;*/
    top: 100%;
    left: -7px;
    transition: all .2s ease;
    opacity: 0;
    padding-bottom: 16px;
    .member-name-ipt {
      width: 320px;
    }
    ul {
      li {
        padding: 0 24px;
        height: 48px;
        line-height: 48px;
        cursor: default;
        &:hover {
          background-color: #f1f3f5;
        }
        .ivu-avatar {
          margin-right: 16px;
        }
      }
    }
  }
</style>
