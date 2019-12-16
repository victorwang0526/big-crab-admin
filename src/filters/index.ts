// Set utils function parseTime to filter
export { parseTime } from '@/utils'

// Filter for article status
export const articleStatusFilter = (status: string) => {
  const statusMap: { [key: string]: string } = {
    published: 'success',
    draft: 'info',
    deleted: 'danger'
  }
  return statusMap[status]
}

export const cardStatusFilter = (status: string) => {
  const statusMap: { [key: string]: string } = {
    UNUSED: '',
    REDEEMED: 'success',
    DELIVERED: 'warning',
    RECEIVED: 'info',
    FROZEN: 'danger',
    PHONED: 'success'
  }
  return statusMap[status]
}

export const cardStatusNameFilter = (status: string) => {
  const nameMap: { [key: string]: string} = {
    UNUSED: '未使用',
    REDEEMED: '已兑换',
    DELIVERED: '已发货',
    RECEIVED: '已收货',
    FROZEN: '已冻结',
    PHONED: '已电话预约'
  }
  return nameMap[status]
}

// Filter to uppercase the first character
export const uppercaseFirstChar = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
