<template>
  <div :class="{'display-form': isDisplay}">
    <!--{{formLabel}}-->
    <template v-for="(value, key) in formLabel">
      <!--{{value}}-->
      <i-form label-position="left" :label-width="200" class="default-form" >
        <div class="form-group">
          <template v-for="(item, idx) in value">
            <FormItem :label="item.label" class="default-form-item">
              <template v-for="tipsItem in tips">
                <div class="group-tips" v-if="item.label === tipsItem.name">
                  <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
                  <div class="tips-pop">
                    <div class="tips-head">
                      {{item.label}}
                      <router-link :to="'/study/tips/' + tipsItem.tipsId" target="_blank">
                        <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                      </router-link>
                    </div>
                    <div class="tips-body">
                      <div v-html="tipsItem.content"></div>
                    </div>
                  </div>
                </div>
              </template>
              <div>
                <CheckboxGroup v-if="item.type === 'checkbox'" size="large" class="default-form-chkbox-group" v-model="item.valueSelect" >
                  <Checkbox :disabled="isDisplay" v-for="(chkboxItem, chkBoxIndex) in item.items" :key="chkBoxIndex" :label="chkboxItem.id" class="default-form-chkbox" style="width: 33.333%" >
                    {{chkboxItem.label}}
                  </Checkbox>
                </CheckboxGroup>
                <RadioGroup v-else-if="item.type === 'radio'" size="large" class="default-form-radio-group" v-model="item.valueSelect" >
                  <Radio :disabled="isDisplay" v-for="(chkboxItem, chkBoxIndex) in item.items" :key="chkBoxIndex" :label="chkboxItem.id" class="default-form-chkbox" style="width: 33.333%" >
                    {{chkboxItem.label}}
                  </Radio>
                </RadioGroup>
                <DatePicker :options="dateOpt" :readonly="isDisplay" transfer v-if="item.hasOwnProperty('needDate')" class="deadline" type="datetime" :placeholder="item.datePlaceholder" v-model="item.valueDate" :clearable="false" style="border-top: 1px solid #ced4da"></DatePicker>

                <DatePicker :options="dateOpt" :readonly="isDisplay" transfer v-if="item.type === 'datetime'" class="deadline" :type="item.type" :placeholder="item.placeholder || item.datePlaceholder" v-model="item.value" :clearable="false" ></DatePicker>

              </div>
              <div class="g-bt" v-if="item.hasOwnProperty('valueIpt')">
                <i-input type="textarea" :readonly="isDisplay" :autosize="{minRows: 5, maxRows: 10}" v-model="item.valueIpt" :placeholder="item.placeholder"></i-input>
              </div>

            </FormItem>
          </template>

        </div>
      </i-form>
    </template>

  </div>
</template>

<script>
  export default {
    name: 'task-tech-app-form',
    props: {
      isDisplay: {
        type: Boolean,
        default: false
      },
      tips: {
        type: Array,
        default () {
          return []
        }
      },
      formValue: {
        type: [Array, Object],
        default: function () {
          return []
        }
      },
      formLabel: {
        type: [Array, Object],
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        dateOpt: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000
          }
        }
      }
    },
    methods: {
      changeDataDate (key, value) {
      }
    }
  }
</script>

<style scoped lang="less">

</style>
