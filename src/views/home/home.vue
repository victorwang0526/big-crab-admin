<template>
  <div style="width: 100%; height: 100%; background-color: #f9f1cd;">
    <customerService></customerService>
    <img src="../../assets/home.jpg" style="width: 100%" alt="">
    <div class="btn">
      <span style="width: 80%; font-weight: bold;">{{tips}}</span>
    </div>
    <div class="btn">
      <van-button type="primary" @click="openDeliver()" style="width: 50%;">预约发货</van-button>
    </div>
    <div class="btn">
      <van-button type="info" @click="openSf()" style="width: 50%;">物流查询</van-button>
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
import customerService from '@/components/customer-service.vue'

@Component({
  name: 'home',
  components: {
    customerService
  }
})
export default class extends Vue {
  tips: string = defaultSettings.tips
  deliverTips: string = defaultSettings.deliverTips;

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
