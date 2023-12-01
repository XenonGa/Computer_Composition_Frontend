import request from "@/utils/request";

export function postClassroom_create(data) {
    return request({
        method: 'POST',
        url: `/myapp/create_class_case`,
        data,
    })
}

export function postClassroom_getAll(data) {
    return request({
        method: 'POST',
        url: `/myapp/get_all_class_case`,
        data,
    })
}

export function postClassroom_delete(data) {
    return request({
        method: 'POST',
        url: `/myapp/delete_case`,
        data,
    })
}

export function postClassroom_getSeat(data) {
    return request({
        method: 'POST',
        url: `/myapp/get_seats_in_case`,
        data,
    })
}
