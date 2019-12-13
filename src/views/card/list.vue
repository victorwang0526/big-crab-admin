<template>
  <div class="app-container">
    <div class="search-container">
      <el-input placeholder="卡号" v-model="cardNo"></el-input>
      <el-select placeholder="选择状态"
                 v-model="selectedStatus">
        <el-option v-for="status in statuses"
                   :key="status.value"
                   :label="status.label"
                   :value="status.value"
        />
      </el-select>
      <el-button type="primary">
        查询
      </el-button>
      {{selectedStatus}}
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getCards } from '@/api/cards'

@Component({
  name: 'cards'
})
export default class extends Vue {
  cardNo = '';
  selectedStatus = '';
  statuses = [
    { value: '', label: '全部' },
    { value: 'UNUSED', label: '未使用' },
    { value: 'REDEEMED', label: '已兑换' },
    { value: 'DELIVERED', label: '已发货' },
    { value: 'RECEIVED', label: '已收货' },
    { value: 'FROZEN', label: '已冻结' },
    { value: 'PHONED', label: '已电话预约' }
  ];

  async getCards(page = 1, count = 10) {
    const data = await getCards({ page, count })
  }
}
</script>
