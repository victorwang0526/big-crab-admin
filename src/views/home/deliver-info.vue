<template>
  <div style="width: 100%">
    <tip :tips="tips"></tip>
    <deliverSteps :active="1"></deliverSteps>
  </div>
</template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import deliverSteps from '@/components/deliver-steps.vue'
import tip from '@/components/tip.vue'

@Component({
  name: 'deliver-info',
  components: {
    deliverSteps,
    tip
  }
})
export default class extends Vue {
  tips: string = '为保证口感，请尽量于收货当日食用完毕。未食用的大闸蟹可存放于冰箱冷藏室温度保持5度-10度盖上湿毛巾即可。';
}
</script>
