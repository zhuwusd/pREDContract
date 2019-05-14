import axiosInstance from './common/export'

export default {
    //修改密码
    modifyPassword(old_password, new_password) {
        return axiosInstance.post('/users/change_password', { old_password: old_password, new_password: new_password })
    },
    //修改邮箱
    modifyEmail(email) {
        return axiosInstance.put('/users', { email: email })
    },
    //获取BU数据
    getbu() {
        return axiosInstance.get('/sys/masterdata/bu')
    },
    //获取公共数据
    getCommon() {
        return axiosInstance.get('/sys/masterdata/common')
    },
    //获取工作流类型数据
    getflowtype() {
        return axiosInstance.get('/sys/masterdata/flowtype')
    },
    //获取医院数据
    getHospital(value) {
        return axiosInstance.get('/sys/masterdata/hospitals', { params: value })
    },
    //获取注册验证码
    getRegistercode(data) {
        return axiosInstance.post('/users/registercode', { email: data })
    },
    //注册
    register(data) {
        console.log(data);
        return axiosInstance.post('/users/register', data)
    },
    //删除附件
    deleteAttachment(id) {
        console.log(id);
        return axiosInstance.put(`/attachment/${id}`)
    }
}