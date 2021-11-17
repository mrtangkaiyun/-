import request from '@/utils/request'
const curl = '/skill/apprenticeship/task'
export function taskList (params) {
    return request({
        url: `${curl}/taskList`,
        method: 'get',
        params
    })
}

export function load (id) {
    return request({
        url: `${curl}/queryInfo?id=${id}`,
        method: 'get'
    })
}
export function saveAdd (data) {
    return request({
        url: `${curl}/add`,
        method: 'post',
        data
    })
}

export function saveEdit (data) {
    return request({
        url: `${curl}/update`,
        method: 'post',
        data
    })
}

export function levelList (params) {
    return request({
        url: `${curl}/list`,
        method: 'get',
        params
    })
}

export function levelRemove (params) {
    return request({
        url: `${curl}/deleteById`,
        method: 'get',
        params
    })
}

export function leveTaskList (params) {
    return request({
        url: `${curl}/taskList`,
        method: 'get',
        params
    })
}

export function startAndEndTask (params) {
    return request({
        url: `${curl}/updateById`,
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
