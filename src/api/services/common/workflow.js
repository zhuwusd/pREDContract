import axios from 'axios'
import iView from 'iview'
import uiservice from '../../ui-service.js'
import router from '../../../router'
import { BASE_URL, TOKEN } from './const.js'

var workflowInstance = axios.create({
    baseURL: `${process.env.BASE_API_URL}/api`,
    timeout: 20000, // 20s
    headers: { 'Content-Type': 'application/json' }
})

workflowInstance.interceptors.request.use(
    config => {
        uiservice.processing(iView.Spin);
        if (localStorage.getItem("dms-app-token")) {
            config.headers.Authorization = localStorage.getItem("dms-app-token")
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

workflowInstance.interceptors.response.use(
    response => {
        uiservice.successful(iView.Spin);
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                uiservice.fail(iView.Spin,"系统异常401");
                   // localStorage.clear();
                   // router.replace({ name: 'page401' })
                    break
                case 403:
                uiservice.fail(iView.Spin,"系统异常403");
                   // localStorage.clear();
                   // router.replace({ name: 'page403' })
                    break
                case 404:
                
                uiservice.fail(iView.Spin,"系统异常404");
                   // localStorage.clear();
                   // router.replace({ name: 'page401' })
                    break
                case 500:
                    //iView.Spin.hide();
                   
                    if (process.env.WEB_ENV) {
                        uiservice.fail(iView.Spin,error.response.data.data.message);

                    } else {
                        if (error.response.data.message!==null) {
                            uiservice.fail(iView.Spin,error.response.data.message);
                        }
                        else{
                            uiservice.fail(iView.Spin,"系统异常500");
                        }
                    }
                    break
                case 504:
                uiservice.fail(iView.Spin,"系统异常504");
                    return error.response;
                    break
            }
        }
        return Promise.reject(error)
    }
)

export default workflowInstance
