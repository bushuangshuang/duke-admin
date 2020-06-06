// import axios from 'axios';
//
// const service = axios.create({
//     // process.env.NODE_ENV === 'development' 来判断是否开发环境
//     // easy-mock服务挂了，暂时不使用了
//     // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
//     timeout: 5000
// });
//
// service.interceptors.request.use(
//     config => {
//         return config;
//     },
//     error => {
//         console.log(error);
//         return Promise.reject();
//     }
// );
//
// service.interceptors.response.use(
//     response => {
//         if (response.status === 200) {
//             return response.data;
//         } else {
//             Promise.reject();
//         }
//     },
//     error => {
//         console.log(error);
//         return Promise.reject();
//     }
// );
//
// export default service;
import axios from 'axios';
import { Message,Alert } from 'element-ui';
var ui = require('element-ui')


axios.defaults.timeout = 6000;
// axios.defaults.baseURL = 'https://duke.yuandacloud.com';
axios.defaults.baseURL = 'http://pramy.natapp1.cc';
// axios.defaults.baseURL = 'https://api.ljkj1688.com';



//http request 拦截器
axios.interceptors.request.use(
    config => {
        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        config.data =config.data
        config.headers = {
            'Content-Type': 'Application/json',
            "Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wcmFteS5uYXRhcHAxLmNjXC9hcGlcL2F1dGhcL21vYmlsZSIsImlhdCI6MTU5MTI2NTA4MiwiZXhwIjoxNjQzMTA1MDgyLCJuYmYiOjE1OTEyNjUwODIsImp0aSI6InV4ZUd6a0Q3b0FwUEhIWnIiLCJzdWIiOjYxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.XA0YqmWtSLmWb7KL1r7ZAE4TZ4eJWDeTB5WegmEUo1g',
            "Accept":"Application/json"
        }
        // if(token){
        //   config.params = {'token':token}
        // }
        if(config.method=='PATCH'){
            config.headers = {
                'Content-Type': 'Application/json',
                "Authorization":'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wcmFteS5uYXRhcHAxLmNjXC9hcGlcL2F1dGhcL21vYmlsZSIsImlhdCI6MTU5MTI2NTA4MiwiZXhwIjoxNjQzMTA1MDgyLCJuYmYiOjE1OTEyNjUwODIsImp0aSI6InV4ZUd6a0Q3b0FwUEhIWnIiLCJzdWIiOjYxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.XA0YqmWtSLmWb7KL1r7ZAE4TZ4eJWDeTB5WegmEUo1g',
                "Accept":"Application/json",
                'x-http-method-override':'PATCH'
            }
        }
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        /**请求成功处理 */
        if (response) {
            /**这里根据后端提供的数据进行对应的处理 */
            return response
            console.log(response,'res')
        } else {
            if(response.status==204){
                Message({
                    message: '成功了',
                    type: 'sucess'
                })
                return 1;
            }
        }
    },
    /**响应错误处理 */
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误'
                    break
                case 401:
                    error.message = error.response.data.message;
                    break
                case 403:
                    error.message = '拒绝访问'
                    break
                case 404:
                    error.message = error.response.data.message;
                    break
                case 408:
                    error.message = '请求超时'
                    break
                case 422:
                    error.message = error.response.data.message;
                    break
                case 429:
                    error.message = error.response.data.message;
                    break
                case 500:
                    error.message = '服务器出错了,请刷新重试'
                    break
                case 501:
                    error.message = '服务未实现'
                    break
                case 502:
                    error.message = '网关错误'
                    break
                case 503:
                    error.message = '服务不可用'
                    break
                case 504:
                    error.message = '网关超时'
                    break
                case 505:
                    error.message = 'HTTP版本不受支持'
                    break
                default:
                    break
            }
        }
        Message({
          message: error.message,
          type: 'error'
        })
        return Promise.reject(error)
    }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function postApi(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response);

            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                if(response){
                    resolve(response.data)
                }else{
                    resolve(1)
                }
            }).catch(err => {
            reject(err)
        })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function deleted(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装get请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function getApi(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, data)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err)
            })
    })
}
