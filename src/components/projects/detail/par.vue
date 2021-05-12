<template>
  <div class="par">
    <!-- par相关 -- 开始 -->
    <div v-for="(value, key, index) in info" :key="index">
      <div v-if="related.indexOf(key) != -1 && value.value && value.value.length" class="content">
        <h3>{{value.title_zh}}</h3>
        <div class="title-en">{{value.title_en}}</div>
        <ul class="label">
          
          <li v-for="(item, ind) in value.value" :key="ind">
            <img src="@/assets/images/ic_right.svg" alt="箭头图标">
            <span v-for="(label, _ind) in value.td" :key="_ind">
              <span v-if="item == label.id">{{label.label}}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- par相关 -- 结束 -->

    <!-- 项目SKU -- 开始 -->
    <div class="sku">
      <div>
        <h3>项目SKU</h3>
        <div class="title-en">Project SKU</div>
      </div>
      <div class="org-tree">
        <h4>项目组织框架</h4>
        <div class="org-tree-node">
            <org-tree-node :node="parStruct[0]"></org-tree-node>
        </div>
      </div>
      <div class="chart">
          <h4>项目成员职能分布</h4>
          <div class="position-chart">
            <position-chart :projectMember="projectMember"></position-chart>
          </div>
      </div>
    </div>
    <!-- 项目SKU -- 结束 -->
  </div>
</template>
<script>
import { PARConf } from "../../../assets/conf/PAR.conf";
import orgTreeNode from "./orgTree";
import positionChart from './positionChart'

export default {
  components: {
    orgTreeNode,
    positionChart
  },
  props: {
    info: {
      type: [Object]
    },
    parStruct: {
      type: [Array]
    },
    projectMember: {
      type: [Object]
    }
  },
  data() {
    return {
      related: [
        "creativeRelated",
        "dataRelated",
        "ipRelated",
        "mediaRelated",
        "techRelated"
      ],
      parConf: JSON.parse(JSON.stringify(PARConf)),
    };
  }
};
</script>
<style lang="less" scoped>
.par {
  .content {
    padding: 20px 0;
    border-bottom: 1px dashed #ced4da;
    .title-en {
      font-size: 14px;
      color: #868e96;
    }
    .label {
      margin-top: 10px;
      font-size: 14px;
      color: #495057;
      img {
        margin-right: 5px
      }
      span {
        line-height: 1.8;
      }
    }
  }
  .sku {
    margin-top: 20px;
    .title-en {
      font-size: 14px;
      color: #868e96;
    }
    .org-tree {
      margin-top: 20px;
      .org-tree-node {
          display: flex;
          justify-content: center;
          margin-top: 20px
      }
    }
    .chart {
      margin-top: 40px
    }
    .position-chart {
      margin-top: 20px
    }
  }
}
</style>


