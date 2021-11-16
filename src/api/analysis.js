import request from '@/utils/request'
const curl = '/skill/masterAndApprentice'
export function list (params) {
    return request({
        url: `${curl}/listAll`,
        method: 'get',
        params
    })
}
