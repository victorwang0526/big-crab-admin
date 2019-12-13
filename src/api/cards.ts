import request from '@/utils/request'

export const getCards = (params: any) =>
  request({
    url: '/cards',
    method: 'get',
    params
  })
//
// export const markPhone = (params: any) =>
//   request({
//     url: 'cards/phone',
//     method: 'put',
//     params
//   })
//
// export const markUnfrozen = (params: any) =>
//   request({
//     url: 'cards/unfrozen',
//     method: 'put',
//     params
//   })
//
// export const markFrozen = (params: any) =>
//   request({
//     url: 'cards/frozen',
//     method: 'put',
//     params
//   })
//
// export const validateCard = (cardNumber: string, params: any) =>
//   request({
//     url: `cards/${cardNumber}/validate`,
//     method: 'put',
//     params
//   })
//
// export const redeemCard = (cardNumber: string, params: any) =>
//   request({
//     url: `cards/${cardNumber}/redeem`,
//     method: 'put',
//     params
//   })
//
// export const sfOrder = (params: any) =>
//   request({
//     url: `cards/sfOrder`,
//     method: 'post',
//     params
//   })
//
// export const sfPrint = (cardNumber: string) =>
//   request({
//     url: `cards/${cardNumber}/sfOrderPrint`,
//     method: 'post'
//   })
