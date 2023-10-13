import axios from "axios"
import { Message } from "element-ui"
import { saveAs } from 'file-saver'


const BASE_URL = '/'

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
})

//请求拦截器
instance.interceptors.request.use(
    (config) => {
        // config.headers["domainName"] = "yungongplat"
        // if(window.localStorage.getItem('at')){
        //     config.headers["app-sec-at"] = window.localStorage.getItem('at')
        // }

        return config
    },
    (error) => {
        // console.log(error)
        return Promise.reject(error)
    }
)

//响应拦截器
instance.interceptors.response.use(
    (response) => {
        // console.log(response,"接口返回")
        if (response.data && response.data.message === "请先登录") {
            this.$errorMessages(response.data.message)
            return
        }
        return response.data
    },
    (error) => {
        // console.log(error)
        Message.error(error?.response?.data?.message || "服务端异常")
        return Promise.reject(error)
    }
)


//通用下载方法 copilot的
export function download(url, params, fileName, json) {
    return instance.post(url, params, {
        responseType: 'blob',
        headers: {
            'Content-Type': json ? 'application/json' : 'application/x-www-form-urlencoded'
        }
    }).then(async (data) => {
        let blob = new Blob([data])
        //let blob = new Blob([data], { type: 'application/vnd.ms-excel' })
        //type里面表示文件类型，指定下载的文件是excel类型，不写的话，可以是任意类型
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName)
        } else {
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = fileName
            link.click()
            window.URL.revokeObjectURL(link.href)
        }
    })
}

//通用下载方法若依的
export function downloadOther(url, params, fileName, json) {
    return instance.post(url, params, {
        responseType: 'blob',
        headers: {
            'Content-Type': json ? 'application/json' : 'application/x-www-form-urlencoded'
        }
    }).then(async (data) => {
        let blob = new Blob([data])
        saveAs(blob, fileName)
        //saveAs是文件下载的方法，需要引入file-saver //npm install file-saver --save //import { saveAs } from 'file-saver'
        //用saveAs方法和上面的创建a标签方法都可以实现文件下载，但是用saveAs方法可以实现文件下载后，浏览器不会留下下载记录,而创建a标签的方法会留下下载记录
    }).catch(err => {
        console.log(err)
        Message.error(err?.response?.data?.message || "服务端异常")
    })
}

//导出
export default instance;

