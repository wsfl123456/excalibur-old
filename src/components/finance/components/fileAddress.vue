<!--公盘地址-->
<template>
  <div class="contract-form-group" v-if="operation === 'show' || gaizhangFile === 'show' || taskAddress[0].fileName">
    <template v-if="operation === 'show' || editFile === true || (gaizhangFile === 'show' && !taskAddress[0].fileName)">
      <div v-for="(item, index) in taskAddress" :key="index">
        <Row class="border-bottom">
          <i-col span="24" class="default-form-member-col">
            <FormItem label="文件名" class="default-form-item" required>
              <i-input v-model="item.fileName" placeholder="请输入文件名"></i-input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="24" class="default-form-member-col">
            <FormItem label="公盘地址" class="default-form-item" required>
              <i-input v-model="item.url" placeholder="请输入公盘地址"></i-input>
            </FormItem>
          </i-col>
        </Row>
      </div>
       <!-- <div class="addFile">
          <div @click="addFile">
            <Icon type="plus-circled"></Icon>添加提交文件 
          </div>
        </div> -->
    </template>
    <!-- <template v-if="operation === 'hide' && editFile === false && gaizhangFile === 'hide'">
      <div v-for="item in taskAddress" :key="item.fileName">
        <Row class="border-bottom">
          <i-col span="24" class="default-form-member-col">
            <FormItem label="文件名" class="default-form-item" required>
              <i-input v-model="item.fileName" readonly placeholder="请输入文件名"></i-input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="24" class="default-form-member-col">
            <FormItem v-if="item.url" label="公盘地址" class="default-form-item" required>
              <div class="default-form-member-selection">
                <a  :href="item.url" target="_blank">{{item.url}}</a>
              </div>
            </FormItem>
            <FormItem v-else label="公盘地址" class="default-form-item" required>
                <i-input  style="font-size:14px;color:#ced4da" readonly placeholder='请输入公盘地址'></i-input>
            </FormItem>
          </i-col>
        </Row>
      </div>
    </template> -->
    <template v-if="gaizhangFile === 'show' && taskAddress[0].fileName && editFile === false">
      <div v-for="item in taskAddress" :key="item.fileName">
        <Row class="border-bottom">
          <i-col span="24" class="default-form-member-col">
            <FormItem label="文件名" class="default-form-item" required>
              <i-input v-model="item.fileName" readonly placeholder="请输入文件名"></i-input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="24" class="default-form-member-col">
             <FormItem v-if="item.url" label="公盘地址" class="default-form-item" required>
              <div class="default-form-member-selection">
                <a  :href="item.url" target="_blank">{{item.url}}</a>
              </div>
            </FormItem>
            <FormItem v-else label="公盘地址" class="default-form-item" required>
                <i-input  style="font-size:14px;color:#ced4da" readonly placeholder='请输入公盘地址'></i-input>
            </FormItem>
          </i-col>
        </Row>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    taskAddress: {
      type: [Array, Object]
    },
    operation: {
      type: [String]
    },
    gaizhangFile: {
      type: [String]
    },
    editFile : {
      type : [Boolean]
    }
  },
  data() {
    return {};
  },

  methods: {
    addFile() {
      this.taskAddress.push({
        fileName: "",
        url: ""
      });
    }
  }
};
</script>
<style lang="less" scoped>
.addFile {
  height: 40px;
  background-color: white;
  color: #2d8ef8;
  display: flex;
  justify-content: center;
  align-items: center;
}
.border-bottom {
  border-bottom: 1px solid #ced4da;
}
</style>


