<template>
  <div>
    <div class="g-ta-r g-mb-32" v-if="+pageConf.toolkitId === 452">
      <Button type="primary" size="large" @click="addPR"><Icon type="plus-circled" size="20"></Icon> 新建长图视频任务</Button>
    </div>
    <div class="list-box" :class="{openDetail: taskDetailStatus}">
      <div class="list-box-list">
        <div class="list-filter">
          <div class="filter-box">
            <RadioGroup type="button" v-model="pageConf.state" @on-change="changeFilter">
              <Radio v-for="(item, index) in taskStatus" :key="index" :label="item.id" :disabled="index===0">{{item.name}}</Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="list-box">
          <loading v-if="isLoading"></loading>
          <p-r-main-list :data="data" @on-sort="sortData"></p-r-main-list>
        </div>
      </div>
    </div>
    <toast :is-toast="isToast" msg="没有更多"></toast>
  </div>
</template>

<script>
  import Toast from '../../components/popup/Toast'
  import ListFilter from '../../components/ListFilter'
  import MainList from '../../components/MainList'
  import {Task} from '../../API/api'
  import {ajax} from '../../util/util'
  import Loading from '../../components/popup/Loading'
  import PRMainList from '../../components/PRMainList'

  export default {
    name: 'List',
    components: {PRMainList, Loading, MainList, ListFilter, Toast},
    props: {},
    computed: {
      taskDetailStatus () {
        return this.$store.state.taskDetailStatus
      }
    },
    data () {
      return {
        taskStatus: [
          {name: '任务状态'},
          {name: '全部', id: 0},
          {name: '待审核', id: 1},
          {name: '审核不通过', id: 2},
          // {name: '待启动', id: 3},
          {name: '执行中', id: 4},
          {name: '待质检', id: 5},
          {name: '质检通过', id: 6},
          {name: '质检不通过', id: 7},
          {name: 'PM审核通过', id: 8},
          {name: 'PM审核不通过', id: 9}
        ],
        pageConf: {
          functionType: 0,
          page: 1,
          pageSize: 25,
          orderBy: 'createTime',
          asc: 'desc',
          toolkitId: null,
          is_urgent: 0,
          state: 0
        },
        currTask: null,
        isToast: false,
        isLoading: false,
        page: 1,
        page_size: 25,
        orderBy: 'createTime',
        asc: 'desc',
        canLoadMore: true,
        dom: null,
        chDom: null,
        data: []
      }
    },
    methods: {
      init () {
        this.setToolkit()
      },
      addPR () {
        this.$router.push('/PRAdd')
      },
      sortData (obj) {
        this.pageConf.orderBy = obj.key
        this.pageConf.page = 1
        this.pageConf.asc = obj.asc
        this.getList()
      },
      getList () {
        this.isLoading = true
        ajax.post(Task.list, this.pageConf)
          .then(res => {
            const _list = res.taskInfo.data
            if (_list.length === 0) {
              this.isToast = true
            }
            if (this.pageConf.page === 1) {
              this.data = _list
            } else {
              this.data = this.data.concat(_list)
            }
          })
          .catch((err) => {
            this.isToast = true
            this.toastMsg = String(err)
          })
          .finally(() => {
            this.isLoading = false
            setTimeout(() => {
              this.isToast = false
            }, 1500)
          })
      },
      setToolkit (data) {
        this.pageConf.toolkitId = data || this.$route.params.id
        this.getList()
      },
      changeFilter (v) {
        this.getList()
      },
      scrollHandler () {
        console.log(this.taskDetailStatus)
        if (this.canLoadMore && this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight && !this.isLoading) {
          this.pageConf.page++
          this.getList()
        }
      },
      loadMore () {
        this.dom.addEventListener('scroll', this.scrollHandler)
      },
      unbindLoadMore () {
        this.dom.removeEventListener('scroll', this.scrollHandler)
      }
    },
    mounted () {
      this.dom = document.getElementById('main-pages')
      this.chDom = document.getElementById('main-content')
      this.loadMore()
    },
    created () {
      this.canLoadMore = true
      this.init()
    },
    beforeDestroy () {
      // this.canLoadMore = false
      this.unbindLoadMore()
    },
    watch: {
      '$route': {
        handler (data) {
          this.setToolkit(data.params.id)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .list-filter {
    margin-bottom: 16px;
  }
  .filter-box {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    padding-left: 108px;
    position: relative;
    margin-bottom: -1px;
    .ivu-radio-group {
      margin-bottom: -1px;
    }
    .ivu-radio-wrapper {
      font-size: 14px;
      color: #343a40;
      background-color: #f8f9fa;
      height: 40px;
      line-height: 40px;
      width: 108px;
      text-align: center;
      padding: 0;
      border: 0 none;
      border-right: 1px solid #e9ecef;
      transition: none;
      border-radius: 0;
      border-bottom: 1px solid #e9ecef;
      border-left: 1px solid #e9ecef;
      margin-left: -1px;
      &:hover:not(.ivu-radio-wrapper-checked):not(:first-child) {
        color: #2d8ef8;
        background-color: #fff;

      }
      &:first-child {
        position: absolute;
        left: 0;
        top: 0;
        border-right: 0 none;

      }
    }
    .ivu-radio-wrapper-disabled {
      background-color: #fff;
    }
    .ivu-radio-wrapper-checked {
      background-color: #107cd9;
      box-shadow: 0 0 0;
      border-color: #107cd9;
      color: #fff;
    }
  }
  .list-box {
    position: relative;
  }
</style>
