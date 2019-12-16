import request from '@/utils/request'

export const getCards = (params: any) =>
  request({
    url: '/cards',
    method: 'get',
    params
  })

export const importCards = (data: any) =>
  request({
    url: '/cards/import',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })

export const markPhone = (params: any) =>
  request({
    url: 'cards/phone',
    method: 'put',
    params
  })

export const markUnfrozen = (data: any) =>
  request({
    url: 'cards/unfrozen',
    method: 'put',
    data
  })

export const markFrozen = (data: any) =>
  request({
    url: 'cards/frozen',
    method: 'put',
    data
  })

export const validateCard = (cardNumber: string, data: any) =>
  request({
    url: `cards/${cardNumber}/validate`,
    method: 'put',
    data
  })

export const redeemCard = (cardNumber: string, data: any) =>
  request({
    url: `cards/${cardNumber}/redeem`,
    method: 'put',
    data
  })

export const sfOrder = (data: any) =>
  request({
    url: `cards/sfOrder`,
    method: 'post',
    data
  })

export const sfPrint = (cardNumber: string) =>
  request({
    url: `cards/${cardNumber}/sfOrderPrint`,
    method: 'post'
  })
