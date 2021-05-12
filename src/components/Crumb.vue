<template>
  <div class="crumb">
    <div class="label">
      <img src="../assets/images/dri/position.png" alt="" />
      <span>当前位置：</span>
    </div>
    <div class="value">
      <div v-for="(i, k) in crumb" :key="k">
        <span
          :class="{ 'last-item': k === crumb.length - 1 }"
          @click="toPush(i.pathName, k)"
          >{{ i.label }}</span
        >
        <img
          v-if="k !== crumb.length - 1"
          src="../assets/images/dri/double-arrow.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    crumb: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    toPush(name, k) {
      if (k !== this.crumb.length - 1) {
        this.$router.push({ name })
      }
    },
  },
};
</script>
<style lang="less" scoped>
.crumb {
  display: flex;
  align-items: center;
  color: #868e96;
  line-height: 20px;
  font-size: 14px;
  img {
    width: 16px;
    height: 16px;
  }
  > div {
    display: inline-flex;
    align-items: center;
    > div {
      display: inline-flex;
      align-items: center;
    }
  }
  > .label {
    span {
      margin: 0 4px 0 6px;
    }
  }
  .value {
    > div {
      * {
        margin-right: 10px;
      }
    }
    span {

color: #343A40;
      &:hover {
        color: #0091ff;
        cursor: pointer;
        opacity: .7;
      }
    }
    .last-item {
      color: #0091ff;
      &:hover {
        cursor: unset;
        opacity: 1;
      }
    }
  }
}
</style>