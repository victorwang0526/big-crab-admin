<template>
  <div>
    <van-button icon="phone" type="primary"
                @click="showCs = true"
                style="position:fixed; right:0; top:15rem; z-index:99;"></van-button>
    <van-popup v-model="showCs" position="bottom" :round="true">
      <div class="divcenter">
        <a href="tel:15051515151">王先生：15051515151</a>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'customer-service'
})
export default class extends Vue {
  showCs: boolean = false
}
</script>
<style>
  .divcenter {
    width: 100%;
    text-align:center;
    padding: 1rem 0 1rem;
  }
</style>
