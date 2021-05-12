export const search = {
  state: {
    searchData: {
      type: null,
      searchValue: ''
    }
  },
  mutations: {
    _setSearchData (state, data) {
      state.searchData.type = data.type
      state.searchData.searchValue = data.searchValue
    }
  },
  actions: {
    setSearchData ({commit}, payload) {
      commit('_setSearchData', payload)
    }
  }
}
