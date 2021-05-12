import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import {state} from './state'
import mutations from './mutations'
import {projects} from './modules/projects'
import {brands} from './modules/brands'
import {supply} from './modules/suppliers'
import { vacation } from './modules/vacation'
import { search } from './modules/search'
import { tasks } from './modules/task'
import { index } from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  modules: {
    index,
    projects,
    brands,
    supply,
    vacation,
    search,
    tasks
  }
})
