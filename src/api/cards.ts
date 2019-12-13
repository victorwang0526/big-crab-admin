import request from '@/utils/request'

export const getCards = (params: any) =>
  request({
    url: '/cards',
    method: 'get',
    params
  })
