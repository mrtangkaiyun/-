import request from '@/utils/request'

export function uploadPic (parameter) {
    return request({
      url: '/uploadPic',
      method: 'post',
      data: parameter,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}
