<template>
  <van-steps :active="active">
    <van-step>1.输入卡号及密码</van-step>
    <van-step>2.填写配送信息</van-step>
    <van-step>3.兑换成功等待发货</van-step>
  </van-steps>
</template>
<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'deliver-steps'
})
export default class extends Vue {
  @Prop({ default: 1 }) private active: number;
}
</script>
