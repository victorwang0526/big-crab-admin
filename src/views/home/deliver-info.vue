<template>
  <div style="width: 100%">
    <customerService></customerService>
    <tip :tips="tips"></tip>
    <deliverSteps :active="1"></deliverSteps>
    <van-cell-group title="详情">
      <van-cell title="规格" value="D"></van-cell>
    </van-cell-group>
    <van-cell-group title="配送信息">
      <van-field label="发货日期" placeholder="发货日期" readonly is-link
                 @click="showDatePicker = true"
                 :value="deliverAtStr"></van-field>
      <van-field label="收件人" placeholder="收件人姓名" v-model.trim="req.dContact"></van-field>
      <van-field label="电话" placeholder="电话" type="number" v-model.trim="req.dTel"></van-field>
      <van-field label="省市区" placeholder="省市区" readonly clickable
                 :value="areaStr" is-link
                 @click="showPicker = true"></van-field>
      <van-field label="详细地址" placeholder="街道门派、楼层房号等信息"
                 v-model.trim="req.dAddress"
                 rows="3" type="textarea" maxlength="100"></van-field>
    </van-cell-group>
    <div class="divcenter">
      <van-button type="info" style="width: 50%;" @click="deliverConfirm">提交</van-button>
    </div>
    <van-popup position="bottom" v-model="showDatePicker">
      <van-datetime-picker v-model="req.deliverAt" type="date"
                           :min-date="minDate" :max-date="maxDate"
                           title="年-月-日"
                           @cancel="showDatePicker = false"
                           @confirm="confirmDeliverAt"></van-datetime-picker>
    </van-popup>
    <van-popup position="bottom" v-model="showPicker">
      <van-area :area-list="areaList" @confirm="areaConfirm" @cancel="showPicker = false"/>
    </van-popup>
  </div>
</template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import deliverSteps from '@/components/deliver-steps.vue'
import tip from '@/components/tip.vue'
import area from './area'
import moment from 'moment'
import defaultSettings from '@/settings'
import { redeemCard } from '@/api/cards'
import customerService from '@/components/customer-service.vue'

@Component({
  name: 'deliver-info',
  components: {
    deliverSteps,
    tip,
    customerService
  }
})
export default class extends Vue {
  tips: string = defaultSettings.deliverTips
  areaList = area
  showPicker: boolean = false
  showDatePicker: boolean = false
  showConfirm: boolean = false
  minDate = moment().add(2, 'days').toDate()
  maxDate = defaultSettings.endDate.toDate()
  cardNumber: any = ''
  password: any = ''
  req = {
    deliverAt: moment().add(2, 'days').toDate(),
    dContact: '',
    dTel: '',
    dProvince: '',
    dCity: '',
    dCounty: '',
    dAddress: '',
    password: ''
  }
  mounted() {
    this.cardNumber = this.$route.params.cardNumber
    this.password = this.$route.params.password
    this.req.password = this.password
  }
  get deliverAtStr() {
    return moment(this.req.deliverAt).format('YYYY-MM-DD')
  }
  confirmDeliverAt(value: any) {
    this.showDatePicker = false
  }
  areaConfirm(values: Array<any>) {
    console.log('area confirm...')
    this.req.dProvince = values[0].name
    this.req.dCity = values[1].name
    this.req.dCounty = values[2].name
    this.showPicker = false
  }
  get areaStr() {
    if (!this.req.dProvince) {
      return ''
    }
    return `${this.req.dProvince}/${this.req.dCity}/${this.req.dCounty}`
  }
  deliverConfirm() {
    if (!this.req.deliverAt) {
      this.$dialog.alert({ message: '请选择送货日期' })
      return
    }
    if (!this.req.dContact) {
      this.$dialog.alert({ message: '请填写收件人' })
      return
    }
    if (!this.req.dTel) {
      this.$dialog.alert({ message: '请输入联系电话' })
      return
    }
    if (this.req.dTel.length !== 11) {
      this.$dialog.alert({ message: '请输入正确的手机号码' })
      return
    }
    if (!this.req.dProvince || !this.req.dCity || !this.req.dCounty) {
      this.$dialog.alert({ message: '请选择省市区' })
      return
    }
    if (!this.req.dAddress) {
      this.$dialog.alert({ message: '请输入详细地址' })
      return
    }

    const deliverAt = moment(this.req.deliverAt).format('YYYY年MM月DD日')
    const contact = this.req.dContact
    const tel = this.req.dTel
    const pcc = this.req.dProvince + this.req.dCity + this.req.dCounty
    const address = this.req.dAddress
    const cardNumber = this.cardNumber

    this.$dialog.confirm({
      title: '确认信息',
      message: `发货日期：${deliverAt}\n收件人：${contact}\n电话：${tel}\n省市区：${pcc}\n详细地址：${address}`,
      confirmButtonText: '确认提交',
      cancelButtonText: '取消修改',
      showCancelButton: true,
      overlay: true,
      messageAlign: 'left',
      beforeClose: (action, done) => {
        if (action === 'confirm') {
          redeemCard(this.cardNumber, this.req).then(() => {
            this.$router.push({ name: 'finish-deliver', params: { cardNumber, deliverAt, contact, tel, pcc, address } })
          }).catch((msg) => {
            setTimeout(() => {
              this.alertMsg(msg)
            }, 200)
          }).finally(() => {
            done()
          })
        } else {
          done()
        }
      }
    }).finally(() => {
      this.showConfirm = false
    })
  }

  alertMsg(msg: string) {
    this.$dialog.alert({ message: msg })
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
