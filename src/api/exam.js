import request from "@/utils/request";

export function postExam_create(data) {
    return request({
        method: 'POST',
        url: `/myapp/create_exam`,
        data,
    })
}
export function postExam_createPure(data) {
    return request({
        method: 'POST',
        url: `/myapp/create_pure_exam`,
        data,
    })
}

export function postExam_getAll(data) {
    return request({
        method: 'POST',
        url: `/myapp/get_all_exams`,
        data,
    })
}

export function postExam_delete(data) {
    return request({
        method: 'POST',
        url: `/myapp/delete_exam`,
        data,
    })
}

export function postExam_getRoom(data) {
    return request({
        method: 'POST',
        url: `/myapp/get_room_in_exam`,
        data,
    })
}

export function postExam_setCase(data) {
    return request({
        method: 'POST',
        url: `/myapp/set_case_to_exam`,
        data,
    })
}

export function postExam_getStudentInfo(data) {
    return request({
        method: 'POST',
        url: `/myapp/get_student_info_in_room`,
        data,
    })
}

export function postExam_register(data) {
    return request({
        method: 'POST',
        url: `/myapp/student_register`,
        data,
    })
}

export function postExam_updateCookie(data) {
    return request({
        method: 'POST',
        url: `/myapp/update_cookie`,
        data,
    })
}

export function postExam_getInformation(data) {
    return request({
        method: 'POST',
        url: `/myapp/get_information`,
        data,
    })
}

export function postExam_downloadStudentInfo(data) {
    return request({
        method: 'POST',
        url: `/myapp/export_exam_room_list`,
        data,
        responseType: 'blob'
    })
}

export function postExam_addNewExamRoom(data) {
    return request({
        method: 'POST',
        url: `/myapp/add_new_exam_room`,
        data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}