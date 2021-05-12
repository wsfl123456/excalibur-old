<template>
  <div class="member-selection-pop">
    <div class="member-search">
      <i-input type="text" name="member" placeholder="输入项目成员姓名" class="member-name-ipt" v-model="searchValue"></i-input>
    </div>
    <div class="often" v-if="searchValue.length === 0">
      <h4>最常协作</h4>
      <ul class="f-clearfix" v-if="often.length !== 0">
        <li class="g-fl" v-for="(item, index) in often" :key="index">
          <Avatar icon="person" :src="item.src"></Avatar>{{item.name}}
        </li>
      </ul>
      <div v-else>
        <p>没有经常协作的项目成员</p>
      </div>
    </div>
    <div class="result" v-else>
      <ul>
        <li v-for="(item, index) in result" :key="index">
          <Avatar icon="person" :src="item.src"></Avatar>{{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'member-selection',
    data () {
      return {
        often: [
          {id: 1, name: 'name', src: ''},
          {id: 2, name: 'name2', src: ''},
          {id: 3, name: 'name3', src: ''},
          {id: 4, name: 'name4', src: ''}
        ],
        searchValue: ''

      }
    },
    computed: {
      result () {
        let data = [
          {id: 1, name: 'jason', src: ''},
          {id: 1, name: 'jason Shen', src: ''},
          {id: 1, name: 'jjjjjjjason Shen', src: ''},
          {id: 1, name: 'jasssssssson Shen', src: ''},
          {id: 1, name: 'jassssonnnnnnn Shen', src: ''},
          {id: 1, name: 'jasssson SSSssshen', src: ''},
          {id: 1, name: 'jasssson ShHhHhHhen', src: ''},
          {id: 1, name: 'jasssson SheEeEeEen', src: ''},
          {id: 1, name: 'jasssson ShenNnNnNn', src: ''}
        ]
        return this.searchValue === 'jason' ? data : []
      }
    }
  }
</script>

<style scoped lang="less">
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
