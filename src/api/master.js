import request from '@/utils/request'
const curl = '/skill/masterAndApprentice'
export function list (parameter) {
    return request({
        url: `${curl}/list`,
        method: 'get',
        params: parameter
    })
}

export function remove (parameter) {
    return request({
        url: `${curl}/deleteById`,
        method: 'get',
        params: parameter
    })
}

export function save (parameter) {
    return request({
        url: '/addCommodity',
        method: 'post',
        data: parameter
    })
}