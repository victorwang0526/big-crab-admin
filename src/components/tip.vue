<template>
  <div class="tips">
    <span style="color: red;">{{tips}}</span>
  </div>
</template>
<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'tips'
})
export default class extends Vue {
  @Prop({ default: '' }) private tips: string;
}
</script>
<style scoped>
  .tips {
    margin: 2rem;
    padding: 1.5rem;
    border: 1px solid rgba(0, 0, 0, 0.125);
  }
</style>
