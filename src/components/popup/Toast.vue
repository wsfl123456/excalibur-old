<template>
  <div v-transfer-dom :class="{show: isToast}" :data-transfer="true">
    <Icon type="checkmark-circled" v-if="status==='success'"></Icon>
    {{msg}}
  </div>
</template>

<script>
  import TransferDom from '../../directives/transfer-dom'
  export default {
    name: 'toast',
    directives: {TransferDom},
    props: {
      duration: {
        type: Number,
        default: 1.5
      },
      msg: {
        type: String
      },
      status: {
        type: String
      },
      isToast: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showToast: this.isToast
      }
    },
    // watch: {
    //   isToast: {
    //     handler (val) {
    //       this.showToast = val
    //     },
    //     immediate: true
    //   }
    // },
    methods: {
      // clearCloseTimer () {
      //   if (this.closeTimer) {
      //     clearTimeout(this.closeTimer)
      //     this.closeTimer = null
      //   }
      // },
      // close () {
      //   this.showToast = false
      // }
    },

    mounted () {

    },
    beforeDestroy () {
      // this.clearCloseTimer()
    }
  }
</script>

<style scoped lang="less">
  div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 263px;
    padding: 0 20px;
    height: 60px;
    color: #fff;
    font-size: 16px;
    text-align: center;
    background-color: rgba(52, 49, 64, .8);
    border-radius: 6px;
    z-index: -1;
    line-height: 60px;
    transition: all .3s linear;
    opacity: 0;
    /*display: none;*/
    &.show {
      /*display: block;*/
      z-index: 9999;
      opacity: 1;
    }
  }
</style>
