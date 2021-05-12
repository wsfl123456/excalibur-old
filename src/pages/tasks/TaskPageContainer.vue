<template>
  <div>
    <toolkit :force-update="hackReset" :add-icon-disabled="isDisabled"></toolkit>
    <router-view></router-view>
    <loading v-if="taskLoading"></loading>
  </div>
</template>

<script>
  import Toolkit from '../../components/Toolkit'
  import Loading from '../../components/popup/Loading'
  import {ajax} from '../../util/util'
  import {Brand, Project} from '../../API/api'

  export default {
    components: {Loading, Toolkit},
    name: 'task-page-container',
    data () {
      return {
        crumb: [
          {
            label: '任务管理',
            url: '/tasks/list'
          }
        ],
        hackReset: false,
        customer: null,
        customerId: null,
        projectId: null
      }
    },
    methods: {
      init () {
        this.getBrands({type: 'task'})
      },
      getBrands ({type}) {
        // this.$store.dispatch('toggleLoading', true)
        this.$store.dispatch('toggleSubMenuLoading', true)

        const brandParams = {
          industry: 0,
          ncCompanyId: 0,
          state: 0,
          page: 1,
          perPage: 1000,
          pageSize: 1000,
          orderBy: 'customerName',
          asc: 'asc'
        }
        ajax.post(Brand.listByProject, brandParams).then(res => {
          const customers = res.customerList.data
          this.$store.dispatch('setCustomers', customers)

          if (type === 'task') {
            this.customer = this.$route.params.customerId || customers[0].id
            if (!this.$route.params.customerId) {
              this.$store.dispatch('selectCustomer', this.customer)
            }
            this.getProjects(this.customer, true, true)
          }
        })
      },
      getProjects (customerId, fromUrl = true, setProject = false) {
        this.$store.dispatch('toggleSubMenuLoading', true)
        this.$store.dispatch('changeProjectLoaded', false)
        const params = {
          functionType: 0,
          customerId,
          state: 0,
          page: 1,
          page_size: 1000,
          orderBy: 'name',
          asc: 'asc'
        }
        ajax.post(Project.list, params).then(res => {
          const projects = res.data
          this.$store.dispatch('setPorjects', {projects, id: this.customer})
          this.$store.dispatch('changeProjectLoaded', true)
          if (projects.length > 0) {
            if (!this.$route.params.projectId && setProject) {
              this.$store.dispatch('selectProject', projects[0].id)
            }
          } else {
            this.$store.dispatch('toggleLoading', false)
          }
          this.$store.dispatch('toggleSubMenuLoading', false)
          if (fromUrl) {
            this.getUrlParams()
          }
        })
      },
      getUrlParams () {
        this.customerId = this.$route.params.customerId
        this.projectId = this.$route.params.projectId

        if (this.customerId && this.projectId) {
          this.$store.dispatch('selectCustomer', +this.customerId)
          this.$store.dispatch('selectProject', +this.projectId)
        }
      }
    },
    computed: {
      isDisabled () {
        return this.$route.params.hasOwnProperty('toolkitId') || this.$route.params.hasOwnProperty('taskId')
      },
      selectedProject () {
        return this.$store.state.tasks.currProject
      },
      taskLoading () {
        return this.$store.state.tasks.taskLoading
      },
      currPage () {
        return this.$store.state.tasks.currPage
      },
      selectedCustomer () {
        return this.$store.state.tasks.currCustomer
      }
    },
    watch: {
      selectedCustomer: {
        handler (data) {
          this.customer = data
          this.getProjects(this.customer, false)
        }
      },
      currPage: {
        handler (data) {
          if (data) {
            this.crumb = [
              {
                label: '任务管理',
                url: '/tasks/list'
              },
              {
                label: data
              }
            ]
          } else {
            this.crumb = [
              {
                label: '任务管理',
                url: '/tasks/list'
              }
            ]
          }
        }
      }
    },
    updated () {
      // location.reload()
      this.$nextTick(() => {
        // this.hackReset = !this.hackReset
      })
      // this.$forceUpdate()
    },
    created () {
      this.init()
    },
    mounted () {
    }
  }
</script>

<style scoped lang="less">

</style>
