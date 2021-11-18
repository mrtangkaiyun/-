import request from '@/utils/request'
const curl = '/skill/user'
export function list (params) {
    return request({
        url: `${curl}/userList`,
        method: 'get',
        params
    })
}

// export function remove (params) {
//     return request({
//         url: `${curl}/deleteById`,
//         method: 'get',
//         params
//     })
// }

// export function load (id) {
//     return request({
//         url: `${curl}/queryInfo?id=${id}`,
//         method: 'get'
//     })
// }

export function save (data) {
    return request({
        url: `${curl}/update`,
        method: 'post',
        data
    })
}
