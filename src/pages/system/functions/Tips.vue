<template>
  <div>
    <div class="addBtn g-ta-r g-mb-32">
      <Button type="primary" @click="addTips"><Icon type="plus-circled" size="20"></Icon> 添加Tips</Button>
    </div>
    <div class="result-list">
      <loading v-if="isLoading"></loading>
      <table class="main-list common-table">
        <thead>
        <tr>
          <th v-for="(item, index) in tableConf" :key="index" :class="{active: sortTh === index}">
            <div class="table-cell">
              {{item.title}}
            </div>
          </th>
        </tr>
        </thead>
        <tbody v-if="list.length > 0">
        <template v-for="(item, index) in list">
          <!--<tr v-if="editId !== item.id" @click="toggleDetail(item.id, item)">-->
          <tr>
            <td v-for="(_item, _index) in tableConf" :key="'td-' + index + '-' + _index">
              <template v-if="editNo !== item.id">
                <template v-if="_item.key === 'operate'">
                  <div class="table-cell">
                    <Button type="primary" @click.stop="editTips(item.id, item)">编辑</Button>
                    <!--<Button type="primary" @click="delTipsConfirm(item.id)">删除</Button>-->
                  </div>
                </template>
                <template v-else>
                  <div class="table-cell">
                    {{item[_item.key]}}
                  </div>
                </template>
              </template>
              <template v-else>
                <template v-if="_item.key === 'customerName'">
                    <Select transfer v-model="addData.customer_id" >
                      <Option v-for="(item, key) in allBrand" :value="item.id" :key="item.id">{{ item.customerName }}</Option>
                    </Select>
                </template>
                <template v-if="_item.key === 'toolkitName'">
                    <Select transfer v-model="addData.task_toolkit_id" @on-change="changeToolkit">
                      <template v-if="allToolkit.length > 0">
                        <OptionGroup :label="toolkitItem.productName" v-for="(toolkitItem, key) in allToolkit" :key="toolkitItem.productId">
                          <Option v-for="(_toolkitItem, key) in toolkitItem.child" :value="_toolkitItem.toolkitId" :key="_toolkitItem.toolkitId">{{ _toolkitItem.toolkitName }}</Option>
                        </OptionGroup>
                      </template>
                    </Select>
                </template>
                <template v-if="_item.key === 'projectCol'">
                    <Select transfer v-model="addData.functionId" @on-change="changeToolkit">
                      <template v-if="functionList.length > 0">
                        <Option v-for="(fnItem, key) in functionList" :value="fnItem.id" :key="fnItem.id">{{ fnItem.projectCol }}</Option>
                      </template>
                    </Select>
                </template>
                <template v-if="_item.key === 'name'">
                    <Select transfer v-model="addData.name">
                      <template v-if="formDataLabel[addData.task_toolkit_id] && formDataLabel[addData.task_toolkit_id].length === 0">
                        <Option value="0" disabled>无可用标签</Option>
                      </template>
                      <template v-else>
                        <template v-for="(formItem, key) in (formDataLabel[addData.task_toolkit_id] || formDataLabel['default']) ">
                          <Option :value="formItem.label">{{ formItem.label }}</Option>
                        </template>
                      </template>
                    </Select>
                </template>
                <template v-if="_item.key === 'content'">
                    <i-input type="textarea" v-model="addData.content"></i-input>
                </template>
                <template v-if="_item.key === 'stateName'">
                  <div class="table-cell">
                    <i-switch v-model="switchState" @on-change="changeState">
                      <span slot="open">开</span>
                      <span slot="close">关</span>
                    </i-switch>
                  </div>
                </template>
                <template v-if="_item.key === 'operate'">
                  <div class="table-cell">
                    <Button type="primary" @click.stop="saveAdd(item.id, item)">保存</Button>
                    <Button type="ghost" @click="cancelAdd">取消</Button>
                  </div>
                </template>
              </template>
            </td>
          </tr>

        </template>
        </tbody>
        <tbody v-else>
        <tr>
          <td :colspan="tableConf.length" class="empty-data">
            没有数据
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
    <Modal v-model="isModal" ok-text="确定" cancel-text="取消" title="删除确认" @on-ok="delTips" :closable="false">
      <p>确定删除Tips？</p>
    </Modal>
  </div>
</template>

<script>
  import BCrumb from '../../../components/BCrumb'
  import Loading from '../../../components/popup/Loading'
  import Toast from '../../../components/popup/Toast'
  import {Sys} from '../../../API/api'
  import {formTips} from '../../../assets/conf/formDataTips.conf'
  import SubHeader from '../../../components/SubHeader'

  export default {
    name: 'Tips',
    components: {SubHeader, Toast, Loading, BCrumb},
    data () {
      return {
        crumb: [
          {label: '系统设置 '},
          {label: '功能配置管理'},
          {label: '品牌工具包Tips'}
        ],
        sortTh: null,
        allBrand: [],
        canLoadMore: true,
        dom: null,
        chDom: null,
        isModal: false,
        isToast: false,
        toastMsg: null,
        toastState: null,
        isLoading: false,
        pageConf: {
          page: 1,
          pageSize: 25
        },
        list: [],
        functionList: [],
        delId: '',
        editNo: null,
        switchState: false,
        addData: {
          customer_id: null,
          task_toolkit_id: null,
          name: '',
          content: '',
          state: 2,
          functionId: 0
        },
        allToolkit: [],
        formDataLabel: formTips,
        tableConf: [
          {
            title: '品牌',
            key: 'customerName',
            asc: 'desc'
          },
          {
            title: '工具包',
            key: 'toolkitName',
            asc: 'desc'
          },
          // {
          //   title: '职能',
          //   key: 'projectCol',
          //   asc: 'desc'
          // },
          {
            title: '标签',
            key: 'name',
            asc: 'desc'
          },
          {
            title: '标题',
            key: 'title',
            asc: 'desc'
          },
          // {
          //   title: '内容',
          //   key: 'content',
          //   asc: 'desc'
          // },
          {
            title: '状态',
            key: 'stateName',
            asc: 'desc'
          },
          {
            title: '操作',
            key: 'operate'
          }
        ]
      }
    },
    methods: {
      sortData (idx) {
        let key = this.tableConf[idx].key
        if (key === 'operate') {
          return
        }
        if (this.sortTh === idx) {
          const asc = this.tableConf[idx].asc
          if (asc === 'desc') {
            this.tableConf[idx].asc = 'asc'
          } else {
            this.tableConf[idx].asc = 'desc'
          }
        } else {
          this.sortTh = idx
        }
        let data = this.pageConf
        data.orderBy = key
        data.asc = this.tableConf[idx].asc
        data.page = 1
        this.pageConf = data
        this.getTipsList()
      },
      delTips () {

      },
      delTipsConfirm (id) {
        this.isModal = true
        this.delId = id
      },
      editTips (id, item) {
        this.$router.push(`edittips/${id}`)
      },
      changeToolkit (e) {
        this.getFunction(e)
      },
      changeState (e) {
        this.addData.state = e ? 1 : 2
      },
      cancelAdd () {
        if (this.editNo === 'new_add') {
          this.list.shift()
        }
        this.editNo = null
      },

      addTips () {
        this.$router.push('addtips')
      },
      // getFunction (id) {
      //   this.$http.post(Sys.toolkitfunction, this.qs.stringify({toolkitId: id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
      //     const _data = res.data
      //     if (_data.retCode === 0) {
      //       this.functionList = _data.retData.data
      //     }
      //   })
      // },
      // getAllToolkitNBrand () {
      //   this.$http.post(Sys.tipsBrands, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
      //     const _data = res.data
      //     if (_data.retCode === 0) {
      //       this.allBrand = [{id: '0', customerName: '全部品牌'}].concat(_data.retData.custom)
      //       this.allToolkit = _data.retData.toolkit
      //     }
      //   })
      // },
      getTipsList () {
        this.isLoading = true
        this.$http.post(Sys.tipsList, this.qs.stringify(this.pageConf), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          this.isLoading = false
          if (_data.retCode === 0) {
            if (_data.retData.data.length > 0) {
              if (this.pageConf.page === 1) {
                this.list = _data.retData.data
              } else {
                this.list = this.list.concat(_data.retData.data)
              }
            } else {
              this.pageConf.page--
              if (this.pageConf.page <= 0) {
                this.pageConf.page = 1
              }
            }
          }
        })
      },
      scrollHandler () {
        if (this.canLoadMore && this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight && !this.isLoading) {
          // this.page = this.page + 1
          this.pageConf.page++
          this.getTipsList()
        }
      },
      loadMore () {
        this.dom.addEventListener('scroll', this.scrollHandler)
      },
      unbindLoadMore () {
        this.dom.removeEventListener('scroll', this.scrollHandler)
      }
    },
    created () {
      this.canLoadMore = true
      this.getTipsList()
      // this.getAllToolkitNBrand()
    },
    beforeDestroy () {
      this.canLoadMore = false
      this.unbindLoadMore()
      // this.$store.dispatch('changeTaskDetailStatus', false)
    },
    mounted () {
      this.dom = document.getElementById('main-pages')
      this.chDom = document.getElementById('main-content')
      this.loadMore()
    }
  }
</script>

<style scoped lang="">

</style>
