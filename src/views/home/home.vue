<template>
  <div style="width: 100%; height: 100%; background-color: #f9f1cd;">
    <img src="../../assets/home.jpg" style="width: 100%" alt="">
    <div class="btn">
      <span style="width: 80%; font-weight: bold;">{{tips}}</span>
    </div>
    <div class="btn">
      <van-button type="primary" @click="openDeliver()">预约发货</van-button>
    </div>
    <div class="btn">
      <van-button type="info" @click="openSf()">物流查询</van-button>
    </div>
    <div>
      <span>{{deliverTips}}</span>
    </div>
  </div>
</template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import moment from 'moment'
import defaultSettings from '@/settings'

@Component({
  name: 'home'
})
export default class extends Vue {
  tips: string = `温馨提醒：为保证品质，大闸蟹预约截止至${moment(defaultSettings.endDate).format('YYYY年MM月DD日')}，未兑换的明年还可继续兑换。`;
  deliverTips: string = '预约发货时间为两日后，所有大闸蟹均通过顺丰快递冷藏运输。江浙沪皖及24小时内可到，其他地区到货时间为24至48小时不等。';
  mounted() {
    // 当前未到开始时间
    if (moment().diff(defaultSettings.startDate) < 0) {
      this.tips = `温馨提醒：为保证品质，大闸蟹开放预约时间为${moment(defaultSettings.startDate).format('YYYY年MM月DD日')}，敬请期待。`
    }
  }
  openDeliver() {
    if (moment().diff(defaultSettings.startDate) < 0 || moment().diff(defaultSettings.endDate) > 0) {
      this.$dialog.confirm({
        message: this.tips,
        showCancelButton: false
      })
    } else {
      this.$dialog.confirm({
        message: this.deliverTips
      }).then(() => {
        this.$router.push('/deliver')
      })
    }
  }
  openSf() {
    console.log('sf')
  }
}
</script>

<style scoped>
.btn {
  width: 100%;
  text-align:center;
  padding: 1rem 0 1rem;
}
</style>
