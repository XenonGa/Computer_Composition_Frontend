import request from "@/utils/request";

export function postClass_create(data) {
    return request({
        method: 'POST',
        url: `/myapp/create_class`,
        data,
    })
}

export function postClass_getAll(data) {
    return request({
        method: 'POST',
        url: `/myapp/get_all_classes`,
        data,
    })
}

export function postClass_delete(data) {
    return request({
        method: 'POST',
        url: `/myapp/delete_class`,
        data,
    })
}

export function postClass_update(data) {
    return request({
        method: 'POST',
        url: `/myapp/update_class`,
        data,
    })
}