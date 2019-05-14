import axios from 'axios'
import iView from 'iview'
import router from '../../../router'
import { BASE_URL, TOKEN } from './const.js'

var exceptionAxiosInstance = axios.create({
    baseURL: `${process.env.BASE_API_URL}/api`,
    timeout: 20000, // 20s
    headers: { 'Content-Type': 'application/json' }
})

exceptionAxiosInstance.interceptors.request.use(
    config => {
        iView.LoadingBar.start()
        //iView.Spin.show();
        if (localStorage.getItem("dms-app-token")) {
            config.headers.Authorization = localStorage.getItem("dms-app-token")
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

exceptionAxiosInstance.interceptors.response.use(
    response => {
        iView.LoadingBar.finish()
        //iView.Spin.hide();
        if (process.env.BASE_API_URL.includes("localhost:8080")) {
            return "";
        }
        else {
            return "";
        }
    },
    error => {
        iView.LoadingBar.error()
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    iView.Message.error("系统异常:401");
                    return Promise.reject(error)
                    // localStorage.clear();
                    // router.replace({ name: 'page401' })
                    break
                case 403:
                    iView.Message.error("系统异常:403");
                    return Promise.reject(error)
                    // localStorage.clear();
                    // router.replace({ name: 'page403' })
                    break
                case 404:

                    iView.Message.error("系统异常:404");
                    return Promise.reject(error)
                    // localStorage.clear();
                    // router.replace({ name: 'page401' })
                    break
                case 500:
                    if (process.env.BASE_API_URL.includes("localhost:8080")) {
                        // console.log(error.response.data.data.message);
                        return error.response.data.data.message

                    } else {
                        if (error.response.data.message !== null) {
                            return error.response.data.message;
                        }
                        else {
                            return "系统异常";
                        }
                    }
                    break
                case 504:
                    iView.Message.error("系统异常:504");
                    return error.response;
                    break
            }
        }
        //return Promise.reject("1231")
    }
)

export default exceptionAxiosInstance
