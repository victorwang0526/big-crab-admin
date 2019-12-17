<template>
  <div style="width: 100%;">
    <tips :tips="tips"></tips>
    <deliverSteps :active="0"></deliverSteps>
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
import tips from '@/components/tip.vue'
import deliverSteps from '@/components/deliver-steps.vue'

@Component({
  name: 'deliver-check',
  components: {
    tips,
    deliverSteps
  }
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
</style>
