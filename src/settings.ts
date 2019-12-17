import moment from 'moment'

interface ISettings {
  title: string // Overrides the default title
  showSettings: boolean // Controls settings panel display
  showTagsView: boolean // Controls tagsview display
  showI18N: boolean // Controls i18n display
  showSidebarLogo: boolean // Controls siderbar logo display
  fixedHeader: boolean // If true, will fix the header component
  errorLog: string[] // The env to enable the errorlog component, default 'production' only
  sidebarTextTheme: boolean // If true, will change active text color for sidebar based on theme
  devServerPort: number // Port number for webpack-dev-server
  mockServerPort: number // Port number for mock server,
  start: string
  end: string
  startDate: moment.Moment
  endDate: moment.Moment
  tips: string
  deliverTips: string
}

const format = 'YYYY-MM-DD'
const start = '2019-10-01'
const end = '2020-12-16'

const startDate = moment(start, format)
const endDate = moment(end, format)

let tips = `温馨提醒：为保证品质，大闸蟹预约截止至${moment(endDate).format('YYYY年MM月DD日')}，未兑换的明年还可继续兑换。`
// 当前未到开始时间
if (moment().diff(startDate) < 0) {
  tips = `温馨提醒：为保证品质，大闸蟹开放预约时间为${moment(startDate).format('YYYY年MM月DD日')}，敬请期待。`
}
const deliverTips = '预约发货时间为两日后，所有大闸蟹均通过顺丰快递冷藏运输。江浙沪皖及24小时内可到，其他地区到货时间为24至48小时不等。'

// You can customize below settings :)
const settings: ISettings = {
  title: '大闸蟹',
  showSettings: true,
  showTagsView: true,
  showI18N: false,
  fixedHeader: false,
  showSidebarLogo: true,
  errorLog: ['production'],
  sidebarTextTheme: true,
  devServerPort: 8080,
  mockServerPort: 8081,
  start,
  end,
  startDate,
  endDate,
  tips,
  deliverTips
}

export default settings
