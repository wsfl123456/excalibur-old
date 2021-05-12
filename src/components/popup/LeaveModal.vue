<template>
    <div>
      <Modal :value="isShow" class-name="" :mask-closable="false" @on-cancel="cancel">
        <div slot="header">
          <h2>退出当前页面？</h2>
        </div>
        <div class="confirm-wrap">
          <p>当前填写内容尚未保存</p>
          <p>是否保存当前内容？</p>
        </div>
        <div slot="footer">
          <Button type="ghost" @click="leave">直接退出</Button>
          <Button type="primary" @click="saveLeave">保存并退出</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
  export default {
    name: 'LeaveModal',
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
      leave () {
        this.$emit('on-leave')
      },
      saveLeave () {
        this.$emit('on-saveLeave')
      },
      cancel () {
        this.$emit('on-cancel')
      }
    }

  }
</script>

<style scoped lang="less">

</style>
