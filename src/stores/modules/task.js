export const tasks = {
  state: {
    fromPartACustomSelector: [],
    customers: [],
    projects: {},
    currCustomer: null,
    currProject: null,
    taskLoading: false,
    currPage: '',
    toolkitId : null,
    financeFilter : false,
    selectProduct : null,
    projectLoaded: true,
    currentToolkitPackageId: undefined,
    refresh : true
  },
  mutations: {
    changeCurrentToolkitPackageId(state, toolkitId) {
      state.currentToolkitPackageId = toolkitId;
    },
    setCompany (state, data) {
      state.fromPartACustomSelector = data
    },
    _changeProjectLoaded (state, data) {
      state.projectLoaded = data
    },
    _setCurrPage (state, data) {
      state.currPage = data
    },
    _toggleLoading (state, data) {
      state.taskLoading = data
    },
    _selectedCustomer (state, data) {
      state.currCustomer = data
    },
    _selectedProject (state, data) {
      state.currProject = data
    },
    _setCustomers (state, data) {
      state.customers = data
    },
    _setProjects (state, data) {
      state.projects[data.id] = data.projects
    },
    _setToolkitId (state, data) {
      state.toolkitId = data
    },
    _setFinanceFilter (state, data) {
      state.financeFilter = data
    },
    _setSelectProduct (state, data) {
      state.selectProduct = data
    },
    _setRefresh(state, data) {
      state.refresh = data
    }
  },
  actions: {
    tasksSetCompany ({commit}, data) {
      commit('setCompany', data)
    },
    changeProjectLoaded ({commit}, payload) {
      commit('_changeProjectLoaded', payload)
    },
    setCurrPage ({commit}, payload) {
      commit('_setCurrPage', payload)
    },
    toggleLoading ({commit}, payload) {
      commit('_toggleLoading', payload)
    },
    selectCustomer ({commit}, payload) {
      commit('_selectedCustomer', payload)
    },
    selectProject ({commit}, payload) {
      commit('_selectedProject', payload)
    },
    setCustomers ({commit}, payload) {
      commit('_setCustomers', payload)
    },
    setPorjects ({commit}, payload) {
      commit('_setProjects', payload)
    },
    setRefresh ({dispatch, commit, rootState}) {
      let data = JSON.parse(JSON.stringify(rootState.taskFilter));
      data.page = 1;
      let _cb = (data, code) => {
        this.isLoading = false;
        this.$emit("on-change", false);
        if (code === 100014) {
          this.$cookie.delete("token");
          this.$router.push("/");
        }
      };
      dispatch("setTaskList", { data, cb: _cb });
      commit('_setRefresh', false)
      setTimeout(() => {
        commit('_setRefresh', true)
      })
    },

  },
  getters: {
    getCurrentToolkitPackageId(state) {
      return state.currentToolkitPackageId;
    },
    getRefresh(state) {
      return state.refresh;
    }
  }
}
