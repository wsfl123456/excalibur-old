<template>
  <div class="org-chart-node">
    <div class="org-chart-node-label" :class="{blue: node.children,gray: !node.children}">
      <div :class="{bolder: !node.children}">{{ node.title }}</div>
      <div v-for="(person, index) in node.value" :key="index">
        <Poptip trigger="hover"  transfer>
        <p class="person">{{person.englishName}}</p>
        <div slot="title">
          <div>
            <div class="poptip">
              <h3>{{person.englishName}} - {{person.positionName}}</h3>
              <p>{{person.companyEmail}}</p>
            </div>
          </div>
        </div>
      </Poptip>
      </div>
    </div>
    <div class="org-chart-node-children" v-if="node.children">
      <OrgTreeNode v-for="(childNode, index) in node.children" :node="childNode" :key="index"></OrgTreeNode>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrgTreeNode",
  components: {},
  props: {
    node: {
      type: [Array, Object]
    }
  }
};
</script>

<style scoped lang='less'>
.blue {
  background: #2d8ef8;
  border-radius: 4px;
  color: white;
}
.gray {
  background: #ced4da;
  border-radius: 4px;
}
.bolder {
  font-weight: bold;
}
.person:hover {
  color: white
}
.poptip {
  text-align: center
}
.org-chart-node-children {
  padding-top: 20px;
  position: relative;
  transition: all 0.5s;
}

.org-chart-node {
  float: left;
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: 20px 5px 0 5px;
}

.org-chart-node::before,
.org-chart-node::after {
  content: "";
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 1px solid #ccc;
  width: 50%;
  height: 20px;
}

.org-chart-node::after {
  right: auto;
  left: 50%;
  border-left: 1px solid #ccc;
}

.org-chart-node:only-child::after,
.org-chart-node:only-child::before {
  display: none;
}

.org-chart-node:only-child {
  padding-top: 0;
}

.org-chart-node:first-child::before,
.org-chart-node:last-child::after {
  border: 0 none;
}

.org-chart-node:last-child::before {
  border-right: 1px solid #ccc;
}

.org-chart-node-children::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  border-left: 1px solid #ccc;
  width: 0;
  height: 20px;
}

.org-chart-node-label {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  display: inline-block;
  padding: 10px;
  margin: 0px;
  font-size: 16px;
}
</style>