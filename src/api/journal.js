import request from '@/utils/request'
const curl = '/skill/log'
export function list (params) {
    return request({
        url: `${curl}/list`,
        method: 'get',
        params
    })
}
