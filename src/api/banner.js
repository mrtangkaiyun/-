import request from '@/utils/request'
export function list (parameter) {
    return request({
        url: '/getSlideshowList',
        method: 'get',
        params: parameter
    })
}
export function save (parameter) {
    return request({
        url: '/addSlideshowUp',
        method: 'post',
        data: parameter
    })
}

export function remove (id) {
    return request({
        url: '/delSlideshow?id=' + id,
        method: 'get'
    })
}
