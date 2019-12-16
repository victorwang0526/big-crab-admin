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
  </div>
</template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'home'
})
export default class extends Vue {
  tips: string = '温馨提醒：为保证品质，大闸蟹预约截止至2019年12月15日，未兑换的明年还可继续兑换。';
  openDeliver() {
    this.$dialog.confirm({
      message: this.tips
    }).then(() => {
      this.$router.push('/deliver')
    })
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
