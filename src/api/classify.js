import request from '@/utils/request'
export function getClassify (parameter) {
    return request({
        url: '/getClassify',
        method: 'get',
        params: parameter
    })
}
export function save (parameter) {
    return request({
        url: '/addOrUpClassify',
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
        url: '/delClassifyById?id=' + id,
        method: 'get'
    })
}
