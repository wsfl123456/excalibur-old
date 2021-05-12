<template>
  <div>
    <div v-for="(item, idx) in users" class="member">
      <Poptip trigger="hover" width="300">
        <Avatar :icon="item.englishName ? '' : 'person'" :src="item.headPic">{{item.userName ? item.englishName.substr(0, 2) : ''}}</Avatar>
        <p>{{item.englishName}}</p>
        <div slot="title">
          <div class="selected-member-detail g-flex">
            <div class="">
              <h3>{{item.englishName}} - {{item.positionName}}</h3>
              <p>Email: {{item.companyEmail}}</p>
              <p>{{item.resume}}</p>
            </div>
          </div>
        </div>
      </Poptip>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'depart-member',
    props: {
      users: {
        type: Array,
        default: function () {
          return []
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .member {
    display: inline-block;
    margin-right: 10px;
    text-align: center;
    margin-top: 5px;
    width: 80px;
    vertical-align: top;
    p {
      word-break: break-all;
      word-wrap: break-word;
    }
  }
  .selected-member-detail {
    white-space: normal;
    .ivu-avatar {
      margin-right: 12px;
    }
    h2 {
      color: #343a40;
      font-size: 18px;
      font-weight: normal;
      font-family: Abel;
    }
    p {
      color: #343a40;
      font-size: 10px;
      font-family: Abel;

    }
  }
</style>
