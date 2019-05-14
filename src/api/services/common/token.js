/**
 * Created by Tidi on 10/01/2018.
 */

// 获取token并存储
// import axiosInstance from 'src/api/services/export'
// import axios from 'axios'
import axiosInstance from "./export";

export default {
    Login(loginInfo) {
        return new Promise((resolve, reject) => {
            axiosInstance
                .post(`/users/signin`, JSON.stringify(loginInfo))
                .then(response => {
                    resolve(response);
                })
        });
    },
    loginfromprotal(value) {
        return new Promise((resolve, reject) => {
            axiosInstance
                .post(`/users/loginfromprotal`, JSON.stringify(value))
                .then(response => {
                    resolve(response);
                })
        });
    }
};
