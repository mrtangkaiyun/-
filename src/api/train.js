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

//  徒弟修改任务执行反馈
export function pupilEdit (data) {
    return request({
        url: `${curl}/updateTask`,
        method: 'post',
        data
    })
}

//  徒弟任务上传文件
export function EditUploadExcel (data) {
    return request({
        url: `${curl}/upload`,
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
//  删除文件
export function removeWordName (params) {
    return request({
        url: `${curl}/deleteWordName`,
        method: 'get',
        params
    })
}

//  下载文件
export function downLoadFile (data) {
    return request({
        url: `${curl}/download`,
        method: 'post',
        data,
        responesType: 'blob'
    })
}

// export function importExcel (data) {
//     return request({
//         url: `${curl}/importExcel`,
//         method: 'post',
//         data,
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     })
// }

// export function save (data) {
//     return request({
//         url: `${curl}/update`,
//         method: 'post',
//         data
//     })
// }

// export function queryStuTea (params) {
//     return request({
//         url: `${curl}/queryStuTea`,
//         method: 'get',
//         params
//     })
// }
