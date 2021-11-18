import request from '@/utils/request'
const curl = '/skill/role'
export function list (params) {
    return request({
        url: `${curl}/list`,
        method: 'get',
        params
    })
}
export function save (data) {
    return request({
        url: `${curl}/update`,
        method: 'post',
        data
    })
}
