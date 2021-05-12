<template>
  <div class="result">
    <p class="title-txt g-mb-16">共有{{count}}条结果</p>
    <div v-if="+$route.query.type === 3">
      <div class="brands-list">
        <router-link
           :key="key"
           class="item"
           v-for="(brand, key) in data"
           :to="{path: `/v2/resource/brand/${brand.id}`}">
           <Avatar class="avatar" :src="brand.picture">{{ brand.customerName }}</Avatar>
           <span class="name">{{ brand.customerName }}</span>
         </router-link>
      </div>
    </div>
    <div v-else-if="+$route.query.type === 4">
      <div class="brands-list">
        <router-link
           :key="key"
           class="item"
           v-for="(supplier, key) in data"
           :to="{path: `/v2/resource/supplier/${supplier.id}`}">
           <Avatar class="avatar" :src="supplier.picture">{{ supplier.name }}</Avatar>
           <span class="name">{{ supplier.name }}</span>
         </router-link>
      </div>
    </div>
    <table v-else class="main-list">
      <thead>
      <tr>
        <th :class="{active: sortTh === index}" v-for="(item, index) in tableTitles[$route.query.type]" :key="index">
          <div class="table-cell">
            {{item.title}}
          </div>
        </th>
      </tr>
      </thead>
      <tbody v-if="Array.isArray(data) && data.length > 0">
      <template v-for="(item, index) in data">
        <tr @click="toggleRow(item, index)">
          <td v-for="(_item, _index) in tableTitles[$route.query.type]" :key="'td-' + index + '-' + _index">
            <template v-if="_item.key === 'creatorId'">
              <div class="table-cell">
                <member-header :user="{id: item.creatorId, name: item.creatorName, headPic: item.headPic}"></member-header>
              </div>
            </template>
            <template v-else-if="_item.key === 'auditorId'">
              <div class="table-cell">
                <member-header v-if="[1, 2, 3, 4, 5].indexOf(item.state) != -1" :user="{id: item.auditId, name: item.auditorName, headPic: item.auditorHeadPic}"></member-header>
              </div>
            </template>
            <template v-else-if="_item.key === 'createTime' || _item.key === 'endTime'">
              <div class="table-cell">
                {{item[_item.key] | filterYear}}
              </div>
            </template>
            <template v-else>
              <div class="table-cell">
                {{item[_item.key]}}
              </div>
            </template>
          </td>
        </tr>
        <tr v-if="detailIdx === index">
          <td :colspan="tableTitles[$route.query.type].length">
            <project-detail v-if="+$route.query.type === 1"></project-detail>
            <task-form-detail v-else-if="+$route.query.type === 2 || +$route.query.type === 5"></task-form-detail>
            <supplier-detail v-else-if="+$route.query.type === 4"></supplier-detail>
            <brand-detail v-else-if="+$route.query.type === 3"></brand-detail>
          </td>
        </tr>
      </template>
      </tbody>
      <tbody v-else>
      <tr>
        <td :colspan="tableTitles[$route.query.type].length" class="empty-data">
          没有数据
        </td>
      </tr>
      </tbody>
    </table>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
  import {Index} from '../../API/api'
  import Loading from '../../components/popup/Loading'
  import ProjectDetail from '../../components/ProjectDetail'
  import TaskFormDetail from '../../components/TaskFormDetail'
  import SupplierDetail from '../../components/SupplierDetail'
  import BrandDetail from '../../components/BrandDetail'
  import MemberHeader from '../../components/popup/MemberHeader.vue'

  export default {
    name: '',
    components: {BrandDetail, SupplierDetail, TaskFormDetail, ProjectDetail, Loading, MemberHeader},
    data () {
      return {
        isLoading: false,
        sortTh: null,
        count: 0,
        detailIdx: null,
        searchTypeConf: {
          1: '项目',
          2: '任务',
          3: '品牌',
          4: '供应商'
        },
        data: [],
        tableTitles: {
          1: [
            {
            title: '项目ID',
            key: 'projectCode',
            width: 140
          },
          {
            title: '品牌名称',
            key: 'customerName',
            width: 120
          },
          {
            title: '项目名称',
            key: 'name',
          },

          {
            title: '项目状态',
            key: 'stateName',
            width: 135
          },
          {
            title: '审核人',
            key: 'auditorId',
            width: 100
          },
          {
            title: '创建时间',
            key: 'createTime',
            width: 130
          },
          {
            title: '截止时间',
            key: 'endTime',
            width: 130
          },
          {
            title: '创建者',
            key: 'creatorId',
            width: 100
          }
          ],
          2: [
            {
              title: '任务ID',
              key: 'taskCode',
              asc: 'desc'
            },
            {
              title: '任务名称',
              key: 'taskName',
              asc: 'desc'
            },
            {
              title: '任务状态',
              key: 'state',
              asc: 'desc'
            },
            {
              title: '创建时间',
              key: 'createTime',
              asc: 'desc'
            },
            {
              title: '截止时间',
              key: 'endTime',
              asc: 'desc'
            },
            {
              title: '创建者',
              key: 'creatorId',
              asc: 'desc'
            }
          ],
          3: [
            {
              title: '品牌ID',
              key: 'customerCode',
              asc: 'desc'
            },
            {
              title: '品牌名称',
              key: 'customerName',
              asc: 'desc'
            },
            {
              title: '合作状态',
              key: 'compType',
              asc: 'desc'
            }, {
              title: '品牌行业',
              key: 'industryName',
              asc: 'desc'
            },
            {
              title: '签约公司',
              key: 'companyName',
              asc: 'desc'
            },
            {
              title: '创建时间',
              key: 'createTime',
              asc: 'desc'
            },
            {
              title: '创建者',
              key: 'creatorId',
              asc: 'desc'
            }
          ],
          4: [
            {
              title: '供应商ID',
              key: 'sCode',
              asc: 'desc'
            },
            {
              title: '供应商名称',
              key: 'name',
              asc: 'desc'
            },
            {
              title: '创建时间',
              key: 'createTime',
              asc: 'desc'
            },
            {
              title: '行业',
              key: 'serviceType',
              asc: 'desc'
            },
            {
              title: '签约公司',
              key: 'signCompanyName',
              asc: 'desc'
            },
            {
              title: '创建者',
              key: 'creatorId',
              asc: 'desc'
            }
          ],
           5: [
          {
            title: "合同ID",
            width: 170,
            key: "contactsCode",
            asc: "desc"
          },
          {
            title: "合同名称",
            key: "taskName",
            asc: "desc"
          },
          {
            title: "任务状态",
            key: "stateNameMe",
            width: 110,
            asc: "desc"
          },
          {
            title: "流程状态",
            key: "flowStateName",
            width: 100,
            asc: "desc"
          },
          {
            title: "创建人",
            key: "creatorName",
            width: 100,
            asc: "desc"
          },
          {
            title: "创建时间",
            key: "createTime",
            width: 110,
            asc: "desc"
          },
          {
            title: "截止时间",
            key: "endTime",
            width: 100,
            asc: "desc"
          },
          {
            title: "当前节点",
            key: "currentUserName",
            width: 100,
            asc: "desc"
          },
          {
            title: "下一节点",
            key: "nextUserName",
            width: 100,
            asc: "desc"
          }
        ]
        }
      }
    },
    computed: {
      searchData () {
        return this.$store.state.search.searchData
      },
      query() {
        return this.$route.query
      }
    },
    watch: {
      query: {
        handler (data) {
          this.detailIdx = null
          this.getResult()
        },
        deep: true
      }
    },
    methods: {
      toggleRow (data, idx) {
        if (+this.$route.query.type === 1) {
          if (this.detailIdx === idx) {
            this.detailIdx = null
            this.$store.dispatch('changeProjectDetailStatus', false)
          } else {
            this.detailIdx = idx
            this.$store.dispatch('changeProjectDetail', data)
            this.$store.dispatch('changeProjectDetailStatus', true)
          }
        }
        if (+this.$route.query.type === 2 || +this.$route.query.type === 5) {
          if (this.detailIdx === idx) {
            this.detailIdx = null
            this.$store.dispatch('changeTaskDetailStatus', false)
          } else {
            this.detailIdx = idx
            this.$store.dispatch('changeTaskDetail', data)
            this.$store.dispatch('changeTaskDetailStatus', true)
          }
        }
        if (+this.$route.query.type === 4) {
          if (this.detailIdx === idx) {
            this.detailIdx = null
            this.$store.dispatch('changeSupplierDetailStatus', false)
          } else {
            this.detailIdx = idx
            this.$store.dispatch('changeSupplierDetail', data)
            this.$store.dispatch('changeSupplierDetailStatus', true)
          }
        }
        if (+this.$route.query.type === 3) {
          if (this.detailIdx === idx) {
            this.detailIdx = null
            this.$store.dispatch('changeBrandDetailStatus', false)
          } else {
            this.detailIdx = idx
            this.$store.dispatch('changeBrandDetail', data)
            this.$store.dispatch('changeBrandDetailStatus', true)
          }
        }
      },
      getResult () {
        this.isLoading = true
        this.$http.post(Index.search, this.qs.stringify({keyWord: this.$route.query.searchValue, type: this.$route.query.type}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            this.count = _data.retData.count
            this.data = _data.retData.data
          }
        })
      }
    },
    mounted () {
      // this.getResult()
    },
    created () {
      this.getResult()
    },
    updated () {
      // this.getResult()
    }
  }
</script>

<style scoped lang="less">
  .main-list {
    cursor: default;
  }
  .title-txt {
    color: #868e96;
    font-size: 12px;
  }
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
  }
  .brands-list {
    display: flex;
    flex-wrap: wrap;
    .item {
          display: block;
          width: 150px;
          margin-right: 40px;
          margin-bottom: 15px;
          text-align: center;

          > .avatar {
            overflow: hidden;
            line-height: 150px;
            display: block;
            width: 100%;
            height: 150px;
            border-radius: 50%;
          }

          > .name {
            display: block;
            margin-top: 8px;
            font-size: 16px;
            color: #495057;
          }
        }
  }
</style>
<style lang="less">
.result {
  .brands-list {
    img {
      object-fit: cover
    }
  }
}
</style>

