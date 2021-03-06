import request from '@/utils/request'

export function login (data) {
    return request({
        url: `/login`,
        method: 'post',
        data
    })
}

export function getInfo () {
    return request({
        url: `/token`,
        method: 'post'
    })
}

export function updatePwd (data) {
    return request({
        url: `/updatePwd`,
        method: 'post',
        data
    })
}

export function logout (data) {
    return request({
        url: `/logout`,
        method: 'get'
    })
}
