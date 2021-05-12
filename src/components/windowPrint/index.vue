<template>
  <div class="window_print">
    <div class="window_print-btn">
      <Button type="primary" @click="windowPrint">打印</Button>
    </div>
    <div class="window_print-content" id="window_print-content">
      <Vaca v-if="printType === 'vaca'"></Vaca>

      <Remiburse v-if="printType === 'remiburse'"></Remiburse>

      <Payment v-if="printType === 'payment'"></Payment>
    </div>
  </div>
</template>
<script>
import "./index.less";
import Vaca from "./vaca";
import Remiburse from "./remiburse";
import Payment from "./payment";
export default {
  components: {
    Vaca,
    Remiburse,
    Payment,
  },
  computed: {
    printType() {
      return this.$route.query.type;
    },
  },
  methods: {
    windowPrint() {
      setTimeout(this.handleFn, 500);
    },
    handleFn() {
      try {
        window.print();
      } catch (e) {
        document.execCommand("print", false, null);
      }
    },
  },
  data() {
    return {};
  },
};
</script>
