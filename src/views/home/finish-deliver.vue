<template>
  <div style="width: 100%;">
    <customerService></customerService>
    <tip :tips="tips"></tip>
    <deliver-steps :active="2"></deliver-steps>
    <div class="divcenter">
      <span style="color: red; font-size: 2rem; font-weight: bold;">兑换成功</span>
    </div>
    <div class="divcenter">
      <span style="color: gray;">如信息有误，请尽快联系客服。</span>
    </div>
    <van-cell-group title="配送信息">
      <van-field label="卡号" readonly v-model="cardNumber"></van-field>
      <van-field label="发货日期" readonly :value="deliverAt"></van-field>
      <van-field label="收件人" readonly :value="contact"></van-field>
      <van-field label="电话" readonly :value="tel"></van-field>
      <van-field label="省市区" readonly :value="pcc"></van-field>
      <van-field label="详细地址" readonly :value="address"></van-field>
    </van-cell-group>
    <div class="divcenter">
      <van-button type="info" style="width: 50%;" @click="continueRedeem">继续兑换</van-button>
    </div>
  </div>
</template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import tip from '@/components/tip.vue'
import deliverSteps from '@/components/deliver-steps.vue'
import customerService from '@/components/customer-service.vue'

@Component({
  name: 'finish-deliver',
  components: {
    tip,
    deliverSteps,
    customerService
  }
})
export default class extends Vue {
  tips: string = '为保证口感，请尽量于收货当日食用完毕。未食用的大闸蟹可存放于冰箱冷藏室温度保持5度-10度盖上湿毛巾即可。'
  deliverAt: string = ''
  contact: string = ''
  tel: string = ''
  pcc: string = ''
  address: string = ''
  cardNumber: string = ''
  mounted() {
    console.log(this.$route.params)
    let { cardNumber, deliverAt, contact, tel, pcc, address } = this.$route.params
    this.deliverAt = deliverAt
    this.contact = contact
    this.tel = tel
    this.pcc = pcc
    this.address = address
    this.cardNumber = cardNumber
  }

  continueRedeem() {
    this.$router.push('/')
  }
}
</script>

<style scoped>
  .divcenter {
    width: 100%;
    text-align:center;
    padding: 1rem 0 1rem;
  }
</style>
