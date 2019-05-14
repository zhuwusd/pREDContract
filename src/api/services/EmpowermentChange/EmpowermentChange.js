import axiosInstance from '../common/export'
import workflowInstance from '../common/workflow'

export default {
    getEmpowermentChangeMaster(value) {
        return axiosInstance.get('/empowermentchange/vendorquery', { params: value })
    },
    getSnapshot(value) {
        return axiosInstance.get('/empowermentchange/snapshot', { params: { snapshot_id: value } })
    },
    //发起流程
    start_Workflow(value) {
        return workflowInstance.post('/workflow/empowermentchange/start/', JSON.stringify(value))
    },
    //流程同意操作
    approve_Workflow(process_id, task_id, flow_task_name, comments, actionName, data) {
        return workflowInstance.post(`/workflow/empowermentchange/${process_id}/${flow_task_name}/${task_id}/`,
            {
                action: actionName, comments: comments, data: data
            })
    },
    //流程退回操作
    redirect_Workflow(process_id, task_id, flow_task_name, comments, actionName, data) {
        return workflowInstance.post(`/workflow/empowermentchange/${process_id}/${flow_task_name}/${task_id}/redirect/`,
            {
                action: actionName, comments: comments, data: data
            })
    }
}
