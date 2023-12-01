import request from "@/utils/request";

export function postPassword_get(data) {
    return request({
        method: 'POST',
        url: `/myapp/get_password`,
        data,
    })
}

export function postPassword_update(data) {
    return request({
        method: 'POST',
        url: `/myapp/update_password`,
        data,
    })
}