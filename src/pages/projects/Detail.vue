<template>
  <div>
    <project-detail></project-detail>
  </div>
</template>

<script>
  import ProjectDetail from '../../components/ProjectDetail'
  import BCrumb from '../../components/BCrumb'
  export default {
    name: 'project-detail-box',
    components: {BCrumb, ProjectDetail},
    data () {
      return {
        id: this.$route.params.projectId,
        crumb: [
          {
            label: '项目管理',
            url: '/projects/list'
          },
          {
            label: '项目详情'
          }
        ]
      }
    },
    methods: {
      getDetail () {
        this.$store.dispatch('changeProjectDetail', {id: this.id})
        this.$store.dispatch('changeProjectDetailStatus', true)
      }
    },
    created () {
      this.getDetail()
      this.$store.dispatch('toggleSide', false)
    }
  }
</script>

<style scoped lang="less">

</style>
