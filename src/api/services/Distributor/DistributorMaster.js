import axiosInstance from '../common/export'
import workflowInstance from '../common/workflow'
import exceptionAxiosInstance from '../common/exception'

export default {
    getDistributorMaster(value) {
        return axiosInstance.get('/vendor/info', { params:value})
    },
/*     getDistributorMaster(company_name) {
        return axiosInstance.get('/vendor/info', { params: { company_name: company_name } })
    }, */
/*     getDistributorMasterByGuid(guid) {
        return axiosInstance.get('/vendor/info', { params: { guid: guid } })
    }, */
    saveDistributorMaster(value) {
        return axiosInstance.post('/vendor/info', JSON.stringify(value))
    },
    getVendorlist(value) {
        return axiosInstance.get('/vendor/list', { params: value })
    },
    getExcelexportVendor(value) {
        return axiosInstance.get('/export/dealercreation', { params: value })
    },
    getSnapshot(value) {
        return axiosInstance.get('/vendor/snapshot', { params: { snapshot_id: value } })
    },
    checkEmail(value) {
        return exceptionAxiosInstance.get('/users/checkemail', { params: { email: value } })
    },
    //发起流程
    start_Workflow(value) {
        return workflowInstance.post('/workflow/dealercreation/start/', JSON.stringify(value))
    },
    //流程同意操作
    approve_Workflow(process_id, task_id, flow_task_name, guid, company, comments, actionName, vendorid) {
        return workflowInstance.post(`/workflow/dealercreation/${process_id}/${flow_task_name}/${task_id}/`,
            { action: actionName, comments: comments, data: { vendor_id: vendorid, guid: guid, company: company } })
    },
    //流程退回操作
    redirect_Workflow(process_id, task_id, flow_task_name, guid, company, comments, actionName, vendorid) {
        return workflowInstance.post(`/workflow/dealercreation/${process_id}/${flow_task_name}/${task_id}/redirect/`,
            { action: actionName, comments: comments, data: { vendor_id: vendorid, guid: guid, company: company } })
    }
}
