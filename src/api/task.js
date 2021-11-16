import request from '@/utils/request'
const curl = '/skill/masterAndApprentice'
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

export function importExcel (data) {
    return request({
        url: `${curl}/importExcel`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export function load (id) {
    return request({
        url: `${curl}/queryInfo?id=${id}`,
        method: 'get'
    })
}

export function save (data) {
    return request({
        url: `${curl}/update`,
        method: 'post',
        data
    })
}

export function queryStuTea (params) {
    return request({
        url: `${curl}/queryStuTea`,
        method: 'get',
        params
    })
}
