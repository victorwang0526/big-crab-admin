<template>
  <div style="width: 100%;">
    <div class="tips">
      <span style="color: red;">{{tips}}</span>
    </div>
    <van-steps :active="active">
      <van-step>1.输入卡号及密码</van-step>
      <van-step>2.填写配送信息</van-step>
      <van-step>3.兑换成功等待发货</van-step>
    </van-steps>
    <van-cell-group>
      <van-field label="卡号" placeholder="请输入卡号" v-model="cardNumber"></van-field>
      <van-field label="密码" placeholder="请输入密码" v-model="psd" class="van-hairline--bottom"></van-field>
    </van-cell-group>
    <div class="btn">
      <van-button type="info" style="width: 50%;" @click="validateCard()"
                  :disabled="cardNumber === '' || psd === ''">验证预约</van-button>
    </div>
  </div>
</template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import defaultSettings from '@/settings'
import { validateCard } from '@/api/cards'

@Component({
  name: 'deliver-check'
})
export default class extends Vue {
  active: number = 0;
  tips: string = ''
  cardNumber: string = ''
  psd: string = ''
  mounted() {
    this.tips = defaultSettings.tips
  }

  validateCard() {
    console.log('validate card')
    validateCard(this.cardNumber, this.psd).then(() => {
      this.$router.push('/deliver-info')
    }).catch((msg: any) => {
      this.$dialog.alert({
        message: msg
      })
    })
  }
}
</script>
<style scoped>

  .btn {
    width: 100%;
    text-align:center;
    padding: 1rem 0 1rem;
  }
  .tips {
    margin: 2rem;
    padding: 1.5rem;
    border: 1px solid rgba(0, 0, 0, 0.125);
  }
</style>
