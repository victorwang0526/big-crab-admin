import request from '@/utils/request'

export const login = (data: any) =>
  request({
    url: '/users/login',
    method: 'post',
    headers: { 'Authorization': 'Basic ' + Buffer.from(data.username + ':' + data.password).toString('base64') }
  })
