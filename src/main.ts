import Vue, { DirectiveOptions } from 'vue'

import 'normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'
import '@/styles/element-variables.scss'
import '@/styles/index.scss'

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import i18n from '@/lang'
import '@/icons/components'
import '@/permission'
// import * as directives from '@/directives'
import * as filters from '@/filters'

// ***************import vant start *********************
import 'vant/lib/style/base.css'
import 'vant/lib/picker/index.css' // for area
import Button from 'vant/lib/button'
import 'vant/lib/button/index.css'
import Popup from 'vant/lib/popup'
import 'vant/lib/popup/index.css'
import CellGroup from 'vant/lib/cell-group'
import 'vant/lib/cell-group/index.css'
import Cell from 'vant/lib/cell'
import 'vant/lib/cell/index.css'
import Field from 'vant/lib/field'
import 'vant/lib/field/index.css'
import Steps from 'vant/lib/steps'
import 'vant/lib/steps/index.css'
import Step from 'vant/lib/step'
import 'vant/lib/step/index.css'
import DatetimePicker from 'vant/lib/datetime-picker'
import Area from 'vant/lib/area'
import Dialog from 'vant/lib/dialog'
import 'vant/lib/dialog/index.css'

Vue.component('van-button', Button)
Vue.component('van-popup', Popup)
Vue.component('van-cell-group', CellGroup)
Vue.component('van-cell', Cell)
Vue.component('van-field', Field)
Vue.component('van-steps', Steps)
Vue.component('van-step', Step)
Vue.component('van-datetime-picker', DatetimePicker)
Vue.component('van-area', Area)
Vue.component('van-dialog', Dialog)
// ***************** import vant end *****************

Vue.use(ElementUI, {
  i18n: (key: string, value: string) => i18n.t(key, value)
})
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

// Register global directives
// Object.keys(directives).forEach(key => {
//   Vue.directive(key, (directives as { [key: string ]: DirectiveOptions })[key])
// })

// Register global filter functions
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string ]: Function })[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
