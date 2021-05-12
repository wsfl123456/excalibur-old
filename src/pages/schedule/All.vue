<template>
  <div>
    <div @click="showDetailImg">
      <!--<img :src="calenderImg"/>-->
      <img class="display-img" src="../../assets/images/calender.jpg"/>
    </div>
    <div class="img-modal" v-if="isModal">
      <a href="javascript:;" class="close-icon" @click="closeDetail"><Icon type="close" color="#fff" size="30"></Icon></a>
      <div class="modal-content" @mousewheel="zoomDetail">
        <img v-drag="dragPos" src="../../assets/images/calender.jpg" alt="" :style="{'transform': 'scale(' + this.scale + ')', 'top': this.pos.y + 'px', 'left': this.pos.x + 'px'}">
      </div>
    </div>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import drag from '../../directives/drag'
  import {Schedule} from '../../API/api'
  import SubHeader from '../../components/SubHeader'
  export default {
    components: {
      SubHeader,
      BCrumb
    },
    name: 'all',
    directives: {drag},
    data () {
      return {
        crumb: [
          {
            label: '日程计划'
          },
          {
            label: '公司行事历'
          }
        ],
        isModal: false,
        calenderImg: null,
        scale: 1,
        pos: {
          x: 0,
          y: 0
        }
      }
    },
    methods: {
      dragPos (v) {
        this.pos = {
          x: v.x,
          y: v.y
        }
      },
      showDetailImg () {
        this.pos = {
          x: 0,
          y: 0
        }
        this.scale = 1
        this.isModal = true
      },
      closeDetail () {
        this.isModal = false
      },
      zoomDetail (event) {
        event.preventDefault()
        let direction = event.deltaY > 0 ? 'big' : 'small'
        switch (direction) {
          case 'big':
            this.scale = this.scale + 0.01
            break
          case 'small':
            if (this.scale >= 0.1) {
              this.scale = this.scale - 0.01
            }
            break
        }
      }
    },
    created () {
      this.$http.post(Schedule.canlendarPic, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
        let _data = res.data
        if (_data.retCode === 0) {
          this.calenderImg = _data.retData.url
        }
      })
    }
  }
</script>

<style scoped lang="less">
  .display-img {
    max-width: 100%;
  }
  .img-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    background-color: rgba(0, 0, 0, .7);
    z-index: 9999;
    padding: 30px;
    .close-icon {
      position: absolute;
      right: 10px;
      top: 10px;
      line-height: normal;
    }
    .modal-content {
      /*overflow: auto;*/
      overflow: hidden;
      width: 100%;
      height: 100%;
      text-align: center;
      position: relative;
    }
    img {
      max-width: 100%;
      position: absolute;
      cursor: -webkit-grab;
      &:active {
        cursor: -webkit-grabbing;
      }
    }
  }
</style>
