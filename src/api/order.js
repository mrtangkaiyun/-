import request from '@/utils/request'
export function list (parameter) {
    return request({
        url: '/getUserOrder',
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

export function load (id) {
    return request({
        url: '/getGoodInfoById?id=' + id,
        method: 'get'
    })
}

export function remove (id) {
    return request({
        url: '/delGoodInfoById?id=' + id,
        method: 'get'
    })
}
