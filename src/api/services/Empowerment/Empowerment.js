import axiosInstance from '../common/export'
import workflowInstance from '../common/workflow'
import qs from 'qs'

export default {
    getEmpowermenMaster(value) {
        return axiosInstance.get('/empowerment/vendorquery', { params: value })
    },
    getSnapshot(value) {
        return axiosInstance.get('/empowerment/snapshot', { params: { snapshot_id: value } })
    },
    //获取授权指标的List
    getEmpowermentlist(value) {
        return axiosInstance.get('/empowerment/list', { params: value })
    },
    //传输数组的方式
    /*     getEmpowermentlist(value) {
            return axiosInstance.get('/empowerment/list', {
                params: value, paramsSerializer: params => {
                    return qs.stringify(params, { indices: false })
                }
            })
        }, */
    //获取指标的详细信息
    getEmpowermenttarget(value) {
        return axiosInstance.get('/empowerment/target', { params: value })
    },
    //获取授权的详细信息
    getEmpowermentinfo(value) {
        return axiosInstance.get('/empowerment/info', { params: value })
    },
    /*     //获取退回时的退回节点集合
        getRedirectActivity(processid, taskid) {
            // return axiosInstance.get(`/workflow/empowerment/tasks/withdraw`, { params: { processId: processid, taskId: taskid } })
        }, */
    //导出指标Excel
    getExcelexportTarget(value) {
        return axiosInstance.get('/export/empowermenttarget', { params: value })
    },
    //导出授权Excel
    getExcelexportDelegate(value) {
        return axiosInstance.get('/export/empowerment', { params: value })
    },
    //发起流程
    start_Workflow(value) {
        return workflowInstance.post('/workflow/empowerment/start/', JSON.stringify(value))
    },
    //流程同意操作
    approve_Workflow(process_id, task_id, flow_task_name, guid, company, comments, actionName, vendorid) {
        return workflowInstance.post(`/workflow/empowerment/${process_id}/${flow_task_name}/${task_id}/`,
            {
                action: actionName, comments: comments, data: {
                    vendor_id: vendorid, guid: guid,
                    basic_info: company.basic_info,
                    contacts: company.contacts,
                    additional_warehouses: company.additional_warehouses,
                    empowerment_info: company.empowerment_info
                }
            })
    },
    //流程退回操作
    redirect_Workflow(process_id, task_id, flow_task_name, guid, company, comments, actionName, vendorid) {
        return workflowInstance.post(`/workflow/empowerment/${process_id}/${flow_task_name}/${task_id}/redirect/`,
            {
                action: actionName, comments: comments, data: {
                    vendor_id: vendorid, guid: guid,
                    basic_info: company.basic_info,
                    contacts: company
                        .contacts,
                    additional_warehouses: company.additional_warehouses,
                    empowerment_info: company.empowerment_info
                }
            })
    }
}
