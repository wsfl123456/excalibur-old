<template>
  <i-form label-position="left" :label-width="88" class="default-form client-contract">
    <div class="contract-form-group">
      <div>
        <Row>
          <i-col span="24" class="default-form-member-col">
            <FormItem label="文件名" class="default-form-item" required>
              <i-input v-model="address.fileName" :readonly="edit === false"></i-input>
            </FormItem>
          </i-col>
        </Row>
      </div>
      <div>
        <Row>
          <i-col span="24" class="default-form-member-col">
            <FormItem label="云盘地址" class="default-form-item" required>
              <div v-if="edit === false" class="default-form-member-selection">
                <a :href="address.url" target="_blank">{{address.url}}</a>
              </div>
              <i-input v-else v-model="address.url"></i-input>
            </FormItem>
          </i-col>
        </Row>
      </div>
    </div>
  </i-form>
</template>
<script>
export default {
  props: {
    address: {
      type: Object
    },
    edit: {
      type: Boolean
    }
  }
};
</script>

