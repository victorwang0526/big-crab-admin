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
      <el-button type="primary" @click="page=1, getCards()">查询</el-button>
      <el-button type="success" @click="markUnfrozen()">解冻</el-button>
      <el-button type="danger" @click="markFrozen()">冻结</el-button>
      <el-button type="warning" @click="sfOrder()">发货</el-button>
      <el-button type="primary" @click="printSf()">打印</el-button>
    </div>
    <el-table v-loading="listLoading" :data="cards" border fit stripe
              highlight-current-row style="width: 100%"
              @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column width="80" label="卡号" prop="cardNumber"></el-table-column>
      <el-table-column width="120" label="购卡人" prop="buyer"></el-table-column>
      <el-table-column width="100" label="购卡时间">
        <template slot-scope="{row}">
          <span>{{row.boughtDate | parseTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110" label="型号" prop="cardType"></el-table-column>
      <el-table-column width="160" label="备注" prop="remark"></el-table-column>
      <el-table-column width="80" label="状态" prop="status">
        <template slot-scope="{row}">
          <el-tag :type="row.status | cardStatusFilter">{{row.status | cardStatusNameFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="80" label="联系人">
        <template slot-scope="{row}">
          <span>{{row.deliverInfo ? row.deliverInfo.dContact : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110" label="电话">
        <template slot-scope="{row}">
          <span>{{row.deliverInfo ? row.deliverInfo.dTel : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">
          <span>{{getAddress(scope.row)}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" label="发货时间">
        <template slot-scope="{row}">
          <span>{{(row.deliverInfo ? row.deliverInfo.deliverAt : '') | parseTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
      <el-table-column width="140" label="快递单号">
        <template slot-scope="{row}">
          <span>{{row.deliverInfo ? row.deliverInfo.mailno : ''}}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="page"
      :limit.sync="size"
      :layout="'total, sizes, prev, pager, next'"
      @pagination="getCards"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getCards } from '@/api/cards'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'cards',
  components: {
    Pagination
  }
})
export default class extends Vue {
  listLoading: boolean = false;
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
  cards: Array<any> = [];
  page = 1;
  size = 10;
  total = 1;
  multipleSelection = [];

  async getCards() {
    this.listLoading = true
    const data: any = await getCards({ cardNumber: this.cardNo, status: this.selectedStatus, page: this.page, size: this.size })
    this.cards = data.elements
    this.total = data.paging.total
    this.listLoading = false
  }

  getAddress(card: any) {
    if (card == null || card.deliverInfo == null) {
      return ''
    }
    return card.deliverInfo.dProvince + card.deliverInfo.dCity + card.deliverInfo.dCounty + card.deliverInfo.dAddress
  }

  handleSelectionChange(val: any) {
    this.multipleSelection = val
  }

  markUnfrozen() {
    const cardNumbers = this.multipleSelection.map((item: any) => item.id)
  }

  markFrozen() {

  }

  sfOrder() {

  }

  printSf() {

  }
}
</script>
