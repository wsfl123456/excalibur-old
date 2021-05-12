<template>
  <Row>
    <i-col span="24" >
      <i-form label-position="left" :label-width="90" class="default-form" >
        <div class="form-group">
          <template v-if="!isAdd">
            <div>
              <Row>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="姓名" class="default-form-item default-member-form">
                    <i-input readonly class="edit-disabled" v-model="formValue.userName"></i-input>
                  </FormItem>
                </i-col>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="英文名" class="default-form-item default-member-form">
                    <i-input readonly class="edit-disabled" v-model="formValue.englishName"></i-input>
                  </FormItem>
                </i-col>

              </Row>
            </div>
            <div>
              <Row>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="员工ID" class="default-form-item default-member-form">
                    <i-input readonly class="edit-disabled" v-model="formValue.userCode"></i-input>
                  </FormItem>
                </i-col>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="部门" class="default-form-item default-member-form">
                    <i-input readonly class="edit-disabled" v-model="formValue.departmentName"></i-input>
                  </FormItem>
                </i-col>
              </Row>
            </div>
            <div>
              <Row>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="职位" class="default-form-item default-member-form">
                    <i-input readonly class="edit-disabled" v-model="formValue.positionName"></i-input>
                  </FormItem>
                </i-col>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="职级" class="default-form-item default-member-form">
                    <i-input readonly class="edit-disabled" v-model="formValue.rankName"></i-input>
                  </FormItem>
                </i-col>
              </Row>
            </div>
          </template>
          <template class="form-group" v-if="isAdd">
            <div>
              <Row>
                <i-col span="24" class="default-form-member-col">
                  <FormItem label="员工" class="default-form-item default-member-form">
                    <div class="default-form-member-selection">
                      <common-member content="选择员工" @on-change="selectMember($event, 'uid')"></common-member>
                    </div>
                  </FormItem>
                </i-col>
              </Row>
            </div>
          </template>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="基本薪资" class="default-form-item default-member-form">
                  <i-input v-model="formValue.baseSalary" placeholder="基本薪资"></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="绩效奖金" class="default-form-item default-member-form">
                  <i-input v-model="formValue.secondSalary" placeholder="绩效奖金"></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="交通补贴" class="default-form-item default-member-form">
                  <i-input v-model="formValue.trafficAllowance" placeholder="交通补贴"></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="通讯补贴" class="default-form-item default-member-form">
                  <i-input v-model="formValue.telAllowance" placeholder="通讯补贴"></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="公积金基数" class="default-form-item default-member-form">
                  <div class="">
                    <i-input v-model="formValue.fundBase" placeholder="公积金基数"></i-input>

                  </div>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="社保基数" class="default-form-item default-member-form">
                  <div class="">
                    <i-input v-model="formValue.socialBase" placeholder="社保基数"></i-input>
                  </div>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="餐饮补贴" class="default-form-item default-member-form">
                  <i-input v-model="formValue.foodAllowance" placeholder="餐饮补贴"></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="其他" class="default-form-item default-member-form">
                  <i-input v-model="formValue.otherAllowance"></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
        </div>

      </i-form>
    </i-col>
  </Row>
</template>

<script>
  import CommonMember from './CommonMember'

  export default {
    components: {CommonMember},
    name: 'hr-salary-form',
    props: {
      formValue: {
        type: Object,
        default () {
          return {}
        }
      },
      isAdd: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      selectMember (v, key) {
        this.formValue[key] = v.id
      }
    }
  }
</script>

<style scoped lang="less">

</style>
