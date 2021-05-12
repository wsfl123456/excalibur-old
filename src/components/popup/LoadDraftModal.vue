<template>
    <div>
      <Modal :value="isShow" class-name="" :mask-closable="false" @on-cancel="cancelLoad">
        <div slot="header">
          <h2>加载草稿箱？</h2>
        </div>
        <div class="confirm-wrap">
          <p>当前草稿箱中有暂存数据</p>
          <p>是否加载暂存数据？</p>
        </div>
        <div slot="footer">
          <Button type="ghost" @click="cancelLoad">取消</Button>
          <Button type="primary" @click="load">加载</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
  export default {
    name: 'LoadDraftModal',
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    methods: {
      load () {
        this.$emit('on-load')
      },
      cancelLoad () {
        this.$emit('on-cancel')
      }
    }

  }
</script>

<style scoped lang="less">

</style>
