<template>
  <div>
    <i-form label-position="left" :label-width="88" class="default-form">
      <div class="form-group">
        <div>
          <FormItem label="请假类型" class="default-form-item" required>
            <template v-if="isDisplay">
              <i-input :readonly="isDisplay" v-model="vacaValues.vacationName" ></i-input>
            </template>
            <template v-else>
              <Row>
                <i-col span="12">
                  <RadioGroup  v-model="vacaValues.vacationType" size="large" class="default-form-radio-group" :class="{'display-radio': isDisplay}">
                    <!--<Radio v-for="(radioItem, radioIndex) in vacaConf.type" :key="radioIndex" :label="radioItem.id" class="default-form-radio" style="width: 12.5%">-->
                    <Radio :disabled="isDisplay" v-for="n in 4" :key="n" :label="vacaConf.type[n - 1].id" class="default-form-radio" style="width: 25%;">
                      {{vacaConf.type[n - 1].label}}
                    </Radio>
                  </RadioGroup>
                </i-col>
                <i-col span="12">
                  <Select transfer :disabled="isDisplay" size="large" v-model="vacaValues.vacationType" placeholder="其他类型假期" class="default-form-select" :class="{'display-select': isDisplay}">
                    <Option v-for="n in 6" :value="vacaConf.type[n + 3].id" :key="n + 3">{{ vacaConf.type[n + 3].label }}</Option>
                  </Select>
                </i-col>
              </Row>
            </template>

          </FormItem>
        </div>
        <div >
          <FormItem label="请假理由" class="default-form-item" required>
            <i-input :readonly="isDisplay" v-model="vacaValues.reason" type="textarea" :rows="5"  placeholder="填写请假理由（必填）"></i-input>
          </FormItem>
        </div>
        <div>
          <FormItem v-if="vacaValues.vacationName === '调休'" label="调休时间" class="default-form-item" required>
            <DatePicker :readonly="isDisplay" v-model="vacaValues.relationDateList" transfer class="deadline" multiple placeholder="选择调休时间（必填）" :clearable="false" @on-change="selectDate"></DatePicker>
          </FormItem>
        </div>
        <div>
          <FormItem label="请假时间" class="default-form-item" required>
            <DatePicker :readonly="isDisplay" split-panels v-model="vacaDays" transfer class="deadline" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择请假时间（必填）" :clearable="false" @on-change="selectDate"></DatePicker>
          </FormItem>
        </div>
        <div>
          <FormItem label="请假天数" class="default-form-item">

            <InputNumber :readonly="isDisplay" :min="0.5" :step="0.5" :precision="1" v-model="vacaValues.dayCountE2" placeholder="填写请假天数"></InputNumber>
          </FormItem>
        </div>
      </div>
    </i-form>
  </div>
</template>

<script>
  import { Schedule } from '../API/api'

  export default {
    name: 'vacation-form',
    props: {
      vacaValues: {
        type: Object,
        default: function () {
          return {}
        }
      },
      isDisplay: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        usedVaca: [],
        vacaDays: [],
        errorConf: {
          startTime: '请选择请假时间',
          endTime: '请选择请假时间',
          vacationType: '请选择请假类型',
          reason: '请填写请假理由'
        },
        vacaConf: {
          type: [
            {
              id: 1,
              label: '事假'
            },
            {
              id: 2,
              label: '病假'
            },
            {
              id: 10,
              label: '病假(普通)'
            },
            {
              id: 3,
              label: '年假'
            },
            {
              id: 4,
              label: '调休'
            },
            {
              id: 5,
              label: '其他'
            },
            {
              id: 6,
              label: '婚假'
            },
            {
              id: 7,
              label: '丧假'
            },
            {
              id: 8,
              label: '产假'
            },
            {
              id: '9',
              label: '陪产假'
            }
          ]
        }
      }
    },
    watch: {
      vacaValues: {
        handler (data) {
          this.vacaDays = [data.startTime, data.endTime]
        }
      }
    },
    created () {
      this.formatDate()
    },
    methods: {
      formatDate () {
        this.vacaDays = [this.vacaValues.startTime, this.vacaValues.endTime]
      },
      submit () {
        let canSubmit = true
        let emptyKey = null

        for (let key in this.errorConf) {
          if (!this.vacaValues[key] || this.vacaValues[key] === '') {
            emptyKey = key
            canSubmit = false
            break
          }
        }

        if (!canSubmit) {
          this.isToast = true
          this.toastMsg = this.errorConf[emptyKey]
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
          }, 1500)
          return
        }

        this.isLoading = true

        this.$http.post(Schedule.apply, this.qs.stringify(this.vacaValues), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          this.isLoading = false
          this.isToast = true
          if (_data.retCode === 0) {
            this.toastStatus = 'success'
            this.toastMsg = '申请成功'
          } else {
            this.toastStatus = null
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            this.toastStatus = null
            if (_data.retCode === 0) {
              this.$router.push('/schedule/manage')
            } else if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }, 1500)
        })
      },
      selectDate (dateArr) {
        let start = dateArr[0]
        let end = dateArr[1]
        let startHour = +start.split(' ')[1].split(':')[0]
        let endHour = +end.split(' ')[1].split(':')[0]
        this.vacaValues.startTime = start
        this.vacaValues.endTime = end
        let startStamp = new Date(start).valueOf()
        let endStamp = new Date(end).valueOf()
        let diffStamp = endStamp - startStamp
        let diffDays = Math.floor(diffStamp / 86400000)
        let diffHour = endHour - startHour
        let diffHalfDay = 0
        if (startHour <= 19 && startHour >= 10 && endHour <= 19 && endHour >= 10) {
          diffHalfDay = diffHour <= 5 ? 0.5 : 1
        } else if (endHour <= 19 && endHour >= 10) {
          diffHalfDay = endHour <= 14 ? 0.5 : 1
        }
        this.vacaValues.dayCountE2 = diffDays + diffHalfDay
      }
    }
  }
</script>

<style scoped lang="less">
  .default-form .default-form-radio-group .default-form-radio:nth-child(3n) {
    border-right: 1px solid #ced4da;
  }
  
</style>
