<!--操作日志-->
<template>
  <div class="border finance-log">
    <Tabs value="file" :animated='false'>
      <TabPane label="文件" name="file">
        <div style="padding:20px">
          <div class="border">
            <Row type="flex" class="file">
              <i-col span="12" class="text-center">文件名称</i-col>
              <i-col span="12" class="text-center">文件地址</i-col>
            </Row>
            <Row class="file" type="flex" v-for="(item, index) in inspectFiles" :key="index">
              <i-col span="12" class="text-center">{{item.fileName}}</i-col>
              <i-col span="12" class="text-center">{{item.url}}</i-col>
            </Row>
          </div>
        </div>
      </TabPane>
      <TabPane label="任务日志" name="log">
        <div style="padding:20px">
          <div class="border">
            <Row type="flex" class="file">
              <i-col span="6" class="text-center">操作任务</i-col>
              <i-col span="6" class="text-center">操作时间</i-col>
              <i-col span="6" class="text-center">操作人</i-col>
              <i-col span="6" class="text-center">备注</i-col>
            </Row>
            <Row class="file" type="flex" v-for="(item, index) in logList" :key="index">
              <i-col span="6" class="text-center">{{item.content}}</i-col>
              <i-col span="6" class="text-center">{{item.createTime}}</i-col>
              <i-col span="6" class="text-center">
                <Avatar>{{item.creatorName.slice(0,2)}}</Avatar>
              </i-col>
              <i-col span="6" class="text-center">{{item.reason}}</i-col>
            </Row>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
export default {
  props : {
    logList : {
      type : [Array, Object],
      default () {
        return []
      }
    },
    inspectFiles : {
      type : [Array, Object],
      default () {
        return []
      }
    },
   
  },
  data() {
    return {
      fileLog: {
        file: [
          {
            name: "哈哈哈",
            address: "河南省"
          }
        ],
        log: [
          {
            operate: "aa",
            time: "ss",
            name: "",
            remark: ""
          }
        ]
      }
    };
  }
};
</script>
<style lang="less" scoped>
.file {
      border-bottom: 1px solid #ced4da;
      .text-center {
          padding: 10px;
          text-align: center;
          border-right: 1px solid #ced4da;
          word-break: keep-all;
          word-wrap: break-word;
          &:last-child {
          border-right: none
      }
      }
      &:first-child {
          background: #f1f3f5
      }
      &:last-child {
          border-bottom: 0
      }

      
  }
  .border {
      border: 1px solid #ced4da;
      border-radius: 5px
  }
</style>


