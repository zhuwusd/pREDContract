import axiosInstance from './common/export'

export default {
    //获取我的任务
    getMyTaskData(value, page_number) {
        return axiosInstance.get('/sys/mytasks', {
            params: {
                flow_id: value.flow_id,
                company_name: value.company_name,
                business_no: value.business_no,
                task_from_date: value.task_from_date,
                task_to_date: value.task_to_date,
                task_type_code: value.task_type_code,
                page: page_number
            }
        })
    },
    //获取我的申请
    getMyApplyData(value, page_number) {
        return axiosInstance.get('/sys/myapplys', {
            params: {
                flow_id: value.flow_id,
                company_name: value.company_name,
                business_no: value.business_no,
                task_from_date: value.task_from_date,
                task_to_date: value.task_to_date,
                task_type_code: value.task_type_code,
                page: page_number
            }
        })
    },
    //获取退回时的退回节点集合
    getRedirectActivity(processid, taskid) {
        return axiosInstance.get(`/workflow/tasks/withdraw`, { params: { processId: processid, taskId: taskid } })
    },
    //获取流程的审批历史
    getHistory(processId, taskId) {
        return axiosInstance.get('/sys/approveinfo', {
            params: {
                processId: processId,
                taskId: taskId
            }
        })
    }
    /*     getMyApply(old_password,new_password) {
            return axiosInstance.get('/sys/myapplys',obeject)
        }, */

}