import request from "@/utils/request";

export function postStudent_get(data) {
    return request({
        method: 'POST',
        url: `/myapp/get_class_student`,
        data,
    })
}

export function postStudent_add_list(data) {
    return request({
        method: 'POST',
        url: `/myapp/add_students_list_to_class`,
        data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export function postStudent_download_list(data) {
    return request({
        method: 'POST',
        url: `/myapp/export_students_list_in_class`,
        data,
        responseType: 'blob'
    })
}

export function postStudent_add(data) {
    return request({
        method: 'POST',
        url: `/myapp/add_student_to_class`,
        data,
    })
}

export function postStudent_delete(data) {
    return request({
        method: 'POST',
        url: `/myapp/delete_student`,
        data,
    })
}