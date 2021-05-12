<template>
    <div>
      <Modal
        :mask-closable="false"
        :value="info.showNotice"
        :z-index="9999"
        class-name="notice-pop"
        style="z-index: 9999; position: fixed; height: 100%;"
        width="70%"
      >
        <div slot="header" class="title">
          【{{typeConf[+info.type]}}】{{info.title}}
        </div>
        <div v-html="info.content" class="content"></div>
        <div slot="footer">
          <Button type="primary" size="large" @click="gotIt">我知道了</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
  export default {
    name: 'NoticeModal',
    props: {
      info: {
        type: Object,
        default () {
          return {
            title: '',
            content: '',
            id: null,
            showNotice: false,
            type: ''
          }
        }
      }
    },
    data () {
      return {
        typeConf: {
          1: 'EXCALIBUR',
          2: '人事部通知',
          3: '行政部通知',
          4: 'SDC通知',
          5 : 'NCC通知',
          6: 'NHU通知'
        }
      }
    },
    methods: {
      gotIt () {
        this.$emit('on-got')
      }
    }
  }
</script>

<style scoped lang="less">
  .title {
    font-weight: bold;
    font-size: 20px;
  }
  .content {
    max-height: 50vh;
    overflow: auto;
  }
</style>
