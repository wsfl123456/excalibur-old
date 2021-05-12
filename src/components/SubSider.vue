<!--二级菜单-->
<template>
  <div class="sub-nav">
    <template v-if="type === 'task'">
      <div class="customer-sel task">
        <template v-if="customersList.length > 0">
          <Menu
            ref="sub_menu"
            class="side-sub-menu"
            theme="light"
            width="auto"
            accordion
            @on-open-change="toggleTaskMenu"
            @on-select="selectProject"
            :active-name="selectedProject"
            :open-names="[selectedCustomer]"
          >
            <Submenu v-for="(item, index) in customersList" :name="item.id" :key="item.id">
              <template slot="title">
                <span :title="item.customerName">{{item.customerName}}</span>
                <span class="task-star">
                  <!-- <Icon
                    v-if="item.isCollect == 0"
                    type="ios-star-outline"
                    size="16"
                    @click.native.stop="addCollect(2, item.id ,index)"
                  ></Icon>
                  <Icon
                    v-else
                    type="ios-star"
                    size="16"
                    style="color:#2d8ef8"
                    @click.native.stop="delCollect(2, item.id, index)"
                  ></Icon> -->
                  <Icon type="ios-arrow-right" class="title-nav-icon"></Icon>
                </span>
              </template>
              <template v-if="projectLoaded">
                <template v-if="projectsList[item.id] && projectsList[item.id].length > 0">
                  <template v-for="(_item, _index) in projectsList[item.id]">
                    <MenuItem :name="_item.id" :key="_item.id">
                      <Tooltip transfer :content="_item.name" placement="right">
                        {{_item.name}}
                        <!-- <Icon
                          v-if="_item.isCollect == 0"
                          type="ios-star-outline"
                          size="16"
                          @click.stop="addCollect(1, _item.id , _index, item.id)"
                        ></Icon>
                        <Icon
                          v-else
                          type="ios-star"
                          size="16"
                          style="color:#2d8ef8;"
                          @click.stop="delCollect(1, _item.id, _index, item.id)"
                        ></Icon> -->
                      </Tooltip>
                      <!-- {{_item.name}} -->
                    </MenuItem>
                  </template>
                </template>
                <template v-else>
                  <div class="no-project">没有项目～～</div>
                </template>
              </template>
              <template v-else>
                <div class="project-loading">
                  <Spin fix></Spin>
                </div>
              </template>
            </Submenu>
          </Menu>
        </template>
      </div>
    </template>
    <template v-else-if="type === 'project'">
      <div class="project-sel">
        <template v-if="customersList.length > 0">
          <Menu
            ref="sub_menu"
            class="side-sub-menu"
            theme="light"
            width="auto"
            @on-select="selectCustomer"
            :active-name="selectedCustomer"
          >
            <MenuItem
              v-for="(item, index) in customersList"
              :name="item.id"
              :key="item.id"
              :title="item.customerName"
            >
              {{item.customerName}}
              <!-- <Icon
                v-if="item.isCollect == 0"
                type="ios-star-outline"
                size="16"
                @click.stop="addCollect(2, item.id ,index)"
              ></Icon>
              <Icon
                v-else
                type="ios-star"
                size="16"
                style="color:#2d8ef8"
                @click.stop="delCollect(2, item.id, index)"
              ></Icon> -->
            </MenuItem>
          </Menu>
        </template>
        <template v-else>
          <div class="no-project">没有品牌～</div>
        </template>
      </div>
    </template>
    <template v-else-if="type === 'dashborad'">
      <Menu
        ref="sub_menu"
        class="side-sub-menu"
        theme="light"
        width="auto"
        :open-names="openDashborad"
        :active-name="dashboradActiveName"
        @on-open-change="getProjects"
        @on-select="dashboradSelect"
        accordion
      >
        <template v-for="(item, index) in menus">
          <Submenu
            :name="item.name"
            v-if="item.name == 'projects' && navArr.indexOf(item.id) >= 0"
            class="dashboard-project"
          >
            <template slot="title">
              {{item.title}}
              <Icon type="ios-arrow-right" class="title-nav-icon"></Icon>
            </template>
            <div v-show="!dashboradProjectList.length" style="height:40px">
              <Spin fix></Spin>
            </div>
            <template v-if="dashboradProjectList[0] ? dashboradProjectList[0].id : true">
              <Submenu :name="_value.id" v-for="(_value, key) in dashboradProjectList" :key="key">
                <template slot="title">
                  {{_value.customerName}}
                  <Icon type="ios-arrow-right" class="thirdTitle-nav-icon"></Icon>
                </template>

                <div v-if="!projectList.length" style="height:40px">
                  <Spin fix></Spin>
                </div>
                <MenuItem
                  v-if="projectList[0].id"
                  v-for="(value, key) in projectList"
                  :key="key"
                  :name="item.name + '|' + _value.id + '|' + value.id"
                  @click.native="routerPush(item.name, value.id, _value.id)"
                  style="border-left:10px solid white"
                >
                  <Tooltip transfer :content="value.name" placement="right">{{value.name}}</Tooltip>
                  <!-- {{value.name}} -->
                </MenuItem>
                <div
                  v-else
                  style="border-left:30px solid white;background:white;height:30px;font-family: ArialMT;font-size: 14px;color: #868e96;"
                >没有项目～～</div>
              </Submenu>
            </template>
            <template v-else>
              <div
                style="border-left:30px solid white;background:white;height:40px;line-height:40px;font-family: ArialMT;font-size: 14px;color: #868e96;"
              >没有项目～～</div>
            </template>
          </Submenu>
          <Submenu
            :name="item.name"
            v-else-if="item.name == 'department' && navArr.indexOf(item.id) >= 0"
          >
            <template slot="title">
              {{item.title}}
              <Icon type="ios-arrow-right" class="title-nav-icon"></Icon>
            </template>
            <div v-show="!departmentList.length" style="height:40px">
              <Spin fix></Spin>
            </div>
            <template v-if="departmentList[0] ? departmentList[0].id : true">
              <MenuItem
                v-for="(value, key) in departmentList"
                :key="key"
                :name="item.name + '|' + value.id"
                @click.native="routerPush(item.name, value.id)"
                style
              >
                <Tooltip transfer :content="value.name" placement="right">{{value.name}}</Tooltip>
                <!-- {{value.name}} -->
              </MenuItem>
            </template>
            <template v-else>
              <div
                style="border-left:30px solid white;background:white;height:40px;line-height:40px;font-family: ArialMT;font-size: 14px;color: #868e96;"
              >没有部门～～</div>
            </template>
          </Submenu>
          <Submenu
            :name="item.name"
            v-else-if="item.name == 'businissUnit' && navArr.indexOf(item.id) >= 0"
            class="dashboard-project"
          >
            <template slot="title">
              {{item.title}}
              <Icon type="ios-arrow-right" class="title-nav-icon"></Icon>
            </template>
            <div v-show="!businissUnitList.length" style="height:40px">
              <Spin fix></Spin>
            </div>
            <template v-if="businissUnitList[0] ? businissUnitList[0].id : true">
              <MenuItem
                v-for="(value, key) in businissUnitList"
                :key="key"
                :name="item.name + '|' + value.id"
                @click.native="routerPush(item.name, value.id)"
              >
                <Tooltip transfer :content="value.name" placement="right">{{value.name}}</Tooltip>
                <!-- {{value.name}} -->
              </MenuItem>
            </template>
            <template v-else>
              <div
                style="border-left:30px solid white;background:white;height:40px;line-height:40px;font-family: ArialMT;font-size: 14px;color: #868e96;"
              >没有事业部～～</div>
            </template>
          </Submenu>
          <MenuItem
            :name="item.name"
            v-else-if="navArr.indexOf(item.id) >= 0"
            @click.native="routerPush(item.name)"
          >{{item.title}}</MenuItem>
        </template>
      </Menu>
    </template>
    <template v-else>
      <Menu
        ref="sub_menu"
        class="side-sub-menu"
        theme="light"
        width="auto"
        accordion
        @on-select="selectMenu"
        :active-name="currSubMenu"
        @on-open-change="openSubMenu"
        :open-names="openedSub"
      >
        <template v-for="(item, index) in menus">
          <template v-if="item.name === 'profile' || item.name === 'setting' || item.name === 'msg' || item.name === 'my-points' || navArr.indexOf(item.id) >= 0">
          <!-- <template v-if="navArr.indexOf(item.id) >= 0"> -->
            <Submenu :name="item.name" v-if="item.hasOwnProperty('subMenus')">
              <template slot="title" class="sub-nav-tit">
                <span>{{item.title}}</span>
                <Icon type="ios-arrow-right" class="title-nav-icon"></Icon>
              </template>
              <template v-if="item.name === 'PRAudit'">
                <template v-for="showCaseItem in showCaseMenu">
                  <MenuItem :name="item.path || item.name + '/' + showCaseItem.toolkitId" :key="showCaseItem.toolkitId"
                    @click.native="changeCurrSub([item.name], showCaseItem.toolkitId, item.name + '/' + showCaseItem.toolkitId)">
                <Tooltip transfer :content="showCaseItem.toolkitName" placement="right"> {{showCaseItem.toolkitName}}</Tooltip>
                  </MenuItem>
                </template>
              </template>
              <template v-else>
                <template v-for="(_item, _index) in item.subMenus">
                  <template v-if="_item.hasOwnProperty('subMenus')">
                    <Submenu :name="_item.path || _item.name" v-if="navArr.indexOf(_item.id) >= 0">
                      <template slot="title" class="sub-nav-tit">
                        <span>{{_item.title}}</span>
                        <Icon type="ios-arrow-right" class="thirdTitle-nav-icon"></Icon>
                      </template>
                      <template v-for="(thirdItem) in _item.subMenus">
                        <template v-if="_item.id === 22 || _item.id === 95">
                          <template v-if="navArr.indexOf(thirdItem.id) >= 0">
                            <MenuItem v-if="thirdItem.path" class="third-menu" :name="thirdItem.path"
                        >
                          <Tooltip
                            transfer
                            :content="thirdItem.projectName"
                            placement="right"
                          >{{thirdItem.projectName}}</Tooltip>
                        </MenuItem>
                        <MenuItem v-else class="third-menu" :name="_item.path || (_item.name + '/' + thirdItem.name)"
                          @click.native="changeCurrSub([item.name, _item.name], thirdItem.projectName, _item.name + '/' + thirdItem.name)"
                        >
                          <Tooltip
                            transfer
                            :content="thirdItem.projectName"
                            placement="right"
                          >{{thirdItem.projectName}}</Tooltip>
                        </MenuItem>
                          </template>
                        </template>
                        <template v-else>
                            <MenuItem v-if="thirdItem.path" class="third-menu" :name="thirdItem.path"
                        >
                          <Tooltip
                            transfer
                            :content="thirdItem.projectName"
                            placement="right"
                          >{{thirdItem.projectName}}</Tooltip>
                        </MenuItem>
                        <MenuItem v-else class="third-menu" :name="_item.path || (_item.name + '/' + thirdItem.name)"
                          @click.native="changeCurrSub([item.name, _item.name], thirdItem.projectName, _item.name + '/' + thirdItem.name)"
                        >
                          <Tooltip
                            transfer
                            :content="thirdItem.projectName"
                            placement="right"
                          >{{thirdItem.projectName}}</Tooltip>
                        </MenuItem>
                        </template>
                      </template>
                    </Submenu>
                  </template>
                  <template v-else>
                     <MenuItem v-if="_item.hasOwnProperty('name') && navArr.indexOf(_item.id) >= 0"
                      :name="_item.path || (item.name + '/' + _item.name)"
                      @click.native="changeCurrSub([item.name], _item.projectName, item.name + '/' + _item.name)">
                       <Tooltip transfer :content="_item.projectName" placement="right">  {{_item.projectName}}</Tooltip>
                    </MenuItem>
                    <MenuItem ref="projectTask" v-else-if="!_item.hasOwnProperty('name')"
                      :name="item.path || (item.name + '/list/' + _item.id)"
                      @click.native="changeCurrSub([item.name], _item.projectName, item.name + '/list/' + _item.id)">
                    <Tooltip transfer :content="_item.projectName" placement="right">  {{_item.projectName}}</Tooltip>
                    </MenuItem>
                  </template>
                </template>
              </template>
            </Submenu>
            <MenuItem v-else @click.native="changeCurrSub([item.name])" :name="item.path || (item.name + '/list/')">
            {{item.title}}
            </MenuItem>
          </template>
        </template>
      </Menu>
    </template>
  </div>
</template>

<script>
import { Task, Project, Brand, Department, Hoshin, Index } from "../API/api";
import { mapActions } from 'vuex';

export default {
  name: "sub-sider",
  props: {
    primaryMenu: {
      type: [Number, String],
      default: 1
    },
    type: {
      type: String
    },
    navArr: {
      type: Array
    }
  },
  data() {
    return {
      showCaseMenu: [],
      projectList: [],
      dashboradProjectList: [],
      departmentList: [],
      businissUnitList: []
      // openedSub: [],
      // currSubMenu: sessionStorage.getItem('subMenu')
    };
  },
  updated() {
    // this.currSubMenu = sessionStorage.getItem('subMenu')
    this.$nextTick(() => {
      this.$refs.sub_menu.updateActiveName();
      this.$refs.sub_menu.updateOpened();
    });
  },
  computed: {
    dashboradActiveName() {
      return this.$store.state.index.dashboradActiveName;
    },
    openDashborad() {
      return this.$store.state.index.openDashborad;
    },
    projectLoaded() {
      return this.$store.state.tasks.projectLoaded;
    },
    currSubMenu() {
      return this.$store.state.currSubMenu;
    },
    customersList() {
      return this.$store.state.tasks.customers;
    },
    projectsList() {
      return this.$store.state.tasks.projects;
    },
    selectedProject() {
      return this.$store.state.tasks.currProject;
    },
    selectedCustomer() {
      return this.$store.state.tasks.currCustomer;
    },
    menus() {
      return this.$store.state.subMenus[this.primaryMenu];
    },
    openedSub() {
      return this.$store.state.openedSub;
    },
    projectParams() {
      return this.$store.state.projects.filter;
    },
    dashborad() {
      return this.$store.state.dashboradSub;
    }
  },
  methods: {
    ...mapActions(['setCurrSubMenu']),
    dashboradSelect() {},
    getProjects(name) {
      var vm = this;
      this.projectList = [];
      if (name.length !== 1) {
        this.$http
          .post(
            Project.list,
            this.qs.stringify({ customerId: name.pop(), state: "6,7,8" }),
            {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            }
          )
          .then(res => {
            const _data = res.data;
            this.projectList = _data.retData.data;
            if (!this.projectList.length) {
              this.projectList.push({
                name: "",
                id: ""
              });
            }
            vm.$store.commit("changeDashboradNum");
          })
          .catch(() => {})
          .finally(() => {});
      } else {
        vm.$store.commit("changeDashboradNum");
      }
    },
    routerPush(name, id, cusId) {
      this.$router.push({
        path: "/dashborad/" + name,
        query: id && {
          customerId: cusId,
          id: id
        }
      });
    },
    selectCustomer(id) {
      this.$router.push(`/projects/list/${id}`);
    },
    changeCustomer(id) {
      this.$store.dispatch("selectCustomer", id);
    },
    selectProject(id) {
      this.$router.push("/tasks/list");
      this.$store.dispatch("selectProject", id);
    },
    toggleTaskMenu(e) {
      const id = e[0];

      if (id) {
        this.$store.dispatch("selectCustomer", e[0]);
      }
      // this.projectLoaded = false
      // ajax.post(Project.list, params).then(res => {
      //   this.projectLoaded = true
      //   const projects = res.data
      //   this.$store.dispatch('setPorjects', {projects, id})
      //   if (projects.length > 0) {
      //     if (!this.$route.params.projectId) {
      //       this.$store.dispatch('selectProject', projects[0].id)
      //     }
      //   } else {
      //     this.$store.dispatch('toggleLoading', false)
      //   }
      // })
    },
    changeCurrSub(name, _name, url) {
      sessionStorage.setItem("openedSub", JSON.stringify(name));
      // sessionStorage.setItem('task_bcrumb', _name)
      // sessionStorage.setItem('task_bcrumb_url', `/${url}`)
      // this.$store.dispatch('setBCrumb', {label: _name, url: `/${url}`})
      this.$store.dispatch("setOpenedSub", name);
    },
    getPRMenu() {
      this.$http
        .post(Task.showCaseToolKit, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          // console.log(_data)
          this.showCaseMenu = _data.retData.productTool;
        })
        .catch(() => {})
        .finally(() => {});
    },
    openSubMenu(name) {
      // console.log("菜单", name);
      if (name[0] === "tasks") {
        this.$http
          .post(Task.index, this.qs.stringify({}), {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          })
          .then(res => {
            const _data = res.data;
            if (_data.retCode === 0) {
              const _data_ = {
                submenus: _data.retData.projectInfo,
                toolkit: _data.retData.productInfo,
                menuKey: 1
              };
              this.$store.dispatch("taskIndex", _data_);
            } else if (_data.retCode === 100014) {
              this.$cookie.delete("token");

              this.$router.push("/");
            }
          });
      }
      if (name[0] === "PRAudit") {
        this.getPRMenu();
      }
    },
    setBCrumb(name, url) {
      sessionStorage.setItem("task_bcrumb", name);
      sessionStorage.setItem("task_bcrumb_url", `/${url}`);
      this.$store.dispatch("setBCrumb", { label: name, url: `/${url}` });
    },
    selectMenu(url) {
      console.log(url)
      sessionStorage.setItem("subMenu", url);
      this.$store.dispatch("setCurrSubMenu", url);
      this.$router.push(`/${url}`);
    },
    getBrandList() {
      var formData = {
        industry: 0,
        ncCompanyId: 0,
        state: 0,
        page: 1,
        perPage: 1000,
        pageSize: 1000
      };
      this.$http
        .post(Brand.listByProject, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          this.dashboradProjectList = _data.retData.customerList.data;
          if (!this.dashboradProjectList.length) {
            this.dashboradProjectList.push({
              name: "",
              id: ""
            });
          }
        })
        .catch(() => {})
        .finally(() => {});
    },
    getDepartmentList() {
      this.$http
        .post(Department.listnoauth, this.qs.stringify({ memberNumAllow: 1 }), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          this.departmentList = _data.retData.data;
          if (!this.departmentList.length) {
            this.departmentList.push({
              name: "",
              id: ""
            });
          }
        })
        .catch(() => {})
        .finally(() => {});
    },
    getBusinissUnitList() {
      this.$http
        .post(Hoshin.list, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          this.businissUnitList = _data.retData.data;
          if (!this.businissUnitList.length) {
            this.businissUnitList.push({
              name: "",
              id: ""
            });
          }
        })
        .catch(() => {})
        .finally(() => {});
    },
    /* 标星 */
    addCollect(typeId, objectId, index, customerId) {
      let formData = {
        typeId,
        objectId
      };
      this.$http
        .post(Index.collectAdd, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          let cusList = JSON.parse(JSON.stringify(this.customersList));
          if (typeId == 2) {
            cusList[index].isCollect = 1;
            this.$store.dispatch("setCustomers", cusList);
          } else {
            let proList = JSON.parse(JSON.stringify(this.projectsList));
            proList[customerId][index].isCollect = 1;
            this.$store.dispatch("setCustomers", cusList);
            this.$store.dispatch("setPorjects", {
              id: customerId,
              projects: proList[customerId]
            });
          }
        })
        .catch(() => {})
        .finally(() => {});
    },
    /* 取消标星 */
    delCollect(typeId, objectId, index, customerId) {
      let formData = {
        typeId,
        objectId
      };
      this.$http
        .post(Index.collectDel, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          let cusList = JSON.parse(JSON.stringify(this.customersList));
          if (typeId == 2) {
            cusList[index].isCollect = 0;
            this.$store.dispatch("setCustomers", cusList);
          } else {
            let proList = JSON.parse(JSON.stringify(this.projectsList));
            proList[customerId][index].isCollect = 0;
            this.$store.dispatch("setCustomers", cusList);
            this.$store.dispatch("setPorjects", {
              id: customerId,
              projects: proList[customerId]
            });
          }
        })
        .catch(() => {})
        .finally(() => {});
    },
    selectDefaultMenu() {
      /* 当页面进来时匹配左侧菜单 */
      const path = this.$route.path;
      const menuOptions = {
        '/myReimburse/list/': {
          activeName: 'myReimburse/list/',
          openNames: ['myReimburse'],
        },
        '/PRAudit/451': {
          activeName: '"PRAudit/451"',
          openNames: ['PRAudit'],
        },
        '/PRAudit/453': {
          activeName: 'PRAudit/453',
          openNames: ['PRAudit'],
        },
        '/myDevice/list': {
          activeName: 'myDevice/list',
          openNames: ['myDevice'],
        },
        '/myDevice/apply': {
          activeName: 'myDevice/apply',
          openNames: ['myDevice'],
        },
        '/employee/basic': {
          activeName: 'employee/basic',
          openNames: ['12', 'employee'],
        },
        '/employee/contract': {
          activeName: 'employee/contract',
          openNames: ['12', 'employee'],
        },
        '/money/salaryManage': {
          activeName: 'money/salaryManage',
          openNames: ['12', 'money'],
        },
        '/money/bonusManage': {
          activeName: 'money/bonusManage',
          openNames: ['12', 'money'],
        },
        '/attend/attendance': {
          activeName: 'attend/attendance',
          openNames: ['12', 'attend'],
        },
        '/attend/vacation': {
          activeName: 'attend/vacation',
          openNames: ['12', 'attend'],
        },
        '/contract/clientContract': {
          activeName: 'contract/clientContract',
          openNames: ['financeManage', 'contract'],
        },
        '/contract/supplierContract': {
          activeName: 'contract/supplierContract',
          openNames: ['financeManage', 'contract']
        },
        '/financeCertificates/certificate': {
          activeName: 'financeCertificates/certificate',
          openNames: ['financeManage', 'financeCertificates'],
        },
        '/financeCertificates/invoice': {
          activeName: 'financeCertificates/invoice',
          openNames: ['financeManage', 'financeCertificates'],
        },
        '/financeReport/ar': {
          activeName: 'financeReport/ar',
          openNames: ['financeManage', 'financeReport'],
        },
        '/financeReport/ap': {
          activeName: 'financeReport/ap',
          openNames: ['financeManage', 'financeReport'],
        },
        '/financeReport/ce': {
          activeName: 'financeReport/ce',
          openNames: ['financeManage', 'financeReport'],
        },
        '/financeReport/marginSheet': {
          activeName: 'financeReport/marginSheet',
          openNames: ['financeManage', 'financeReport'],
        },
        '/financeReport/bp': {
          activeName: 'financeReport/bp',
          openNames: ['financeManage', 'financeReport'],
        },
        '/financeReport/fc': {
          activeName: 'financeReport/fc',
          openNames: ['financeManage', 'financeReport'],
        },
        '/deviceManage/list': {
          activeName: 'deviceManage/list',
          openNames: ['device', 'deviceManage'],
        },
        '/deviceManage/owner': {
          activeName: 'deviceManage/owner',
          openNames: ['device', 'deviceManage'],
        },
        '/device/repair': {
          activeName: 'device/repair',
          openNames: ['device'],
        },
        '/system/userManage': {
          activeName: 'system/userManage',
          openNames: ['system'],
        },
        '/menuConfManage/setting': {
          activeName: 'menuConfManage/setting',
          openNames: ['system', 'menuConfManage'],
        },
        '/menuConfManage/role': {
          activeName: 'menuConfManage/role',
          openNames: ['system', 'menuConfManage'],
        },
        '/functionManage/tips': {
          activeName: 'functionManage/tips',
          openNames: ['system', 'functionManage'],
        },
        '/functionManage/toolkit': {
          activeName: 'functionManage/toolkit',
          openNames: ['system', 'functionManage'],
        },
        '/functionManage/auditor': {
          activeName: 'functionManage/auditor',
          openNames: ['system', 'functionManage'],
        },
        '/functionManage/meeting': {
          activeName: 'functionManage/meeting',
          openNames: ['system', 'functionManage'],
        },
        '/functionManage/device': {
          activeName: 'functionManage/device',
          openNames: ['system', 'functionManage'],
        },
        '/functionManage/department': {
          activeName: 'functionManage/department',
          openNames: ['system', 'functionManage'],
        },
        '/functionManage/hoshinUnit': {
          activeName: 'functionManage/hoshinUnit',
          openNames: ['system', 'functionManage'],
        },
      };

      const matchedMenu = menuOptions[path];

      if (matchedMenu) {
        this.setCurrSubMenu(matchedMenu.activeName);
        this.changeCurrSub(matchedMenu.openNames);
      }
    },
  },
  mounted() {},
  created() {
    this.selectDefaultMenu(); // 选中默认菜单导航
    this.getPRMenu();
    this.getBrandList();
    this.getDepartmentList();
    this.getBusinissUnitList();
  }
  // watch: {
  //   $route(to, from) {
  //     console.log(to)
  //     if (to.meta.parent == "dashborad") {
  //       if (to.query.customerId) {
  //         this.$store.commit(
  //           "changeDashboradActiveName",
  //           to.meta.type + "|" + to.query.customerId + "|" + to.query.id
  //         );
  //         this.$store.commit("changeOpenDashborad", [
  //           to.meta.type,
  //           to.query.customerId
  //         ]);
  //       } else {
  //         this.$store.commit("changeDashboradActiveName", to.meta.type);
  //         this.$store.commit("changeOpenDashborad", []);
  //       }
  //     }
  //   }
  // }
};
</script>

<style scoped lang="less">
.sub-nav {
  background-color: #dee2e6;
  height: 100%;
  overflow: auto;

  .ivu-menu-item {
    height: 40px;
    padding: 0 15px;
    line-height: 40px;
    border-right: 0 none;
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*white-space: nowrap;*/
    font-size: 14px;
    font-family: ArialMT;

    &:hover {
      background-color: rgba(255, 255, 255, 0.4);
    }

    .ivu-tooltip {
      display: block;
      width: 100%;
      font-size: 14px;

      .ivu-tooltip-rel {
        display: block;
        width: 100%;
      }
    }

    .ivu-icon {
      margin-right: 0;
    }
  }

  .ivu-menu-item-active {
    background-color: transparent;
    border-right: 0 none;
  }

  .side-sub-menu {
    text-align: left;

    &:after {
      content: unset;
    }

    > .ivu-menu-item {
      background-color: #dee2e6;
      font-size: 14px;
      font-weight: bold;
      color: #343a40;
      border-right: 1px solid #fff;

      &:hover {
        background-color: #f3f3f3;
      }

      i {
        margin-right: 8px;
      }
    }

    .ivu-menu-item-selected {
      border-right-color: #fff !important;
      background-color: #fff;
      color: #2d8ef8;

      &:hover {
        background-color: #fff;
      }
    }
  }

  .ivu-menu-submenu {
    background-color: #dee2e6;

    .ivu-menu {
      background-color: #fff;
    }

    .ivu-menu-item {
      /*padding-left: 3.3em;*/
      background-color: #fff;
      border-right: 1px solid #dee2e6;
      padding-left: 15px !important;

      &:hover {
        color: #2d8ef8;
      }
    }

    .title-nav-icon,
    .thirdTitle-nav-icon {
      transition: transform 0.3s;
    }

    .ivu-menu-opened {
      .thirdTitle-nav-icon {
        transform: rotate(90deg);
      }
    }

    .third-menu {
      padding-left: 30px !important;
    }

    &.ivu-menu-opened {
      .title-nav-icon {
        transform: rotate(90deg);
      }
    }
  }
}

.customer-sel {
  .project-loading {
    position: relative;
    line-height: 0;
    height: 40px;
    background-color: #fff;
    text-align: center;
    font-family: ArialMT;
    font-size: 14px;
    color: #868e96;
  }

  .no-project {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    text-align: center;
    font-family: ArialMT;
    font-size: 14px;
    color: #868e96;
    position: relative;
  }
  .fontWeight {
    font-weight: 550
  }
}

.project-sel {
  .no-project {
    padding: 14px 24px;
    font-size: 14px;
    font-style: italic;
  }
}
.task-star {
  display: flex
}
</style>
