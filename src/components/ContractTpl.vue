<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>文件名</th>
        <th>公盘路径</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, idx) in tpls">
        <td>
          {{item.fileName}}
        </td>
        <td>
          <!--<a @click="parseFileAddress(item.fileAddress)" href="javascript:void(0)">{{item.fileAddress}}</a>-->
          <a target="_blank" :href="item.fileAddress | parseFileAddress">{{item.fileAddress}}</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'contract-tpl',
    props: {
      tpls: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    methods: {
      /**
       * 格式化公盘跳转地址（根据不同操作系统去跳转）
       *
       * @param fileAddress
       * @return void
       */
      // parseFileAddress (fileAddress) {
      //   // const fileAddress = 'Y:\\NORMCORE\\COMPLIANCE\\EXCALIBUR_File_Template\\Format_Schedule&WIP_20180717.xlsx'
      //   // const fileAddress = 'X:\\NORMCORE\\COMPLIANCE\\EXCALIBUR_File_Template\\Format_Schedule&WIP_20180717.xlsx'
      //   // const fileAddress = 'smb://192.168.100.3/NORMCORE/NORMCORE/COMPLIANCE/EXCALIBUR_File_Template/Format_Schedule&WIP_20180717.xlsx'
      //   // const fileAddress = 'smb://192.168.100.3/COOLTOUR/NORMCORE/COMPLIANCE/EXCALIBUR_File_Template/Format_Schedule&WIP_20180717.xlsx'
      //   const platform = this.platform()
      //   let prefix = null // 路径前缀
      //
      //   if (/^Y:(\\)+/.test(fileAddress)) {
      //     prefix = 'NORMCORE'
      //   } else if (/^X:(\\)+/.test(fileAddress)) {
      //     prefix = 'COOLTOUR'
      //   } else if (/^smb:\/\//.test(fileAddress)) {
      //     if (/^smb:\/\/192.168.100.3\/NORMCORE\//.test(fileAddress)) {
      //       prefix = 'NORMCORE'
      //     } else {
      //       prefix = 'COOLTOUR'
      //     }
      //   } else {
      //     throw new Error('文件格式错误')
      //   }
      //
      //   let shortAddress = fileAddress
      //     .replace(/\\/g, '/')
      //     .replace(new RegExp('^([YX]:(/)+|smb://192.168.100.3/' + prefix + '/)'), '')
      //
      //   const realAddress = platform.mac
      //     ? `smb://192.168.100.3/${prefix}/${shortAddress}`
      //     : prefix === 'NORMCORE' ? `Y:/${shortAddress}` : `X:/${shortAddress}`
      //
      //   // 直接新窗口打开文件地址
      //   window.location.href = realAddress
      // },
      /**
       * 检测操作系统
       *
       * @returns {{win: boolean, mac: boolean}}
       */
      // platform () {
      //   const system = {
      //     win: false,
      //     mac: false
      //   }
      //
      //   const platform = window.navigator.platform
      //
      //   system.win = platform.indexOf('Win') !== -1
      //   system.mac = platform.indexOf('Mac') !== -1
      //
      //   return system
      // }
    }
  }
</script>

<style scoped lang="less">
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    /*border-collapse: collapse;*/
    margin-bottom: 16px;
    td, th {
      border: 1px solid #ced4da;
      font-size: 14px;
      height: 48px;
      padding: 0 24px;
      word-break: break-all;
      word-wrap: break-word;
      /*border-radius: 6px;*/
    }
    tr:last-child {
      td {
        &:first-child {
          border-bottom-left-radius: 6px;
        }
        &:last-child {
          border-bottom-right-radius: 6px;
        }
      }
    }
    th {
      background-color: #dde8f6;
      font-size: 12px;
      height: 32px;
      &:first-child {
        border-top-left-radius: 6px;
      }
      &:last-child {
        border-top-right-radius: 6px;
      }
    }
  }
</style>
