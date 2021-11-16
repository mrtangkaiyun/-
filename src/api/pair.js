import request from '@/utils/request'
const curl = '/skill/relationship'
export function list (params) {
    return request({
        url: `${curl}/list`,
        method: 'get',
        params
    })
}

export function remove (params) {
    return request({
        url: `${curl}/deleteById`,
        method: 'get',
        params
    })
}

export function add (data) {
    return request({
        url: `${curl}/add`,
        method: 'post',
        data
    })
}
