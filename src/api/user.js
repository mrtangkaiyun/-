import request from '@/utils/request'

export function updatePwd (data) {
    return request({
        url: `/updatePwd`,
        method: 'post',
        data
    })
}
