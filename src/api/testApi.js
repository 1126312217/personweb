//userApi.js
import http from "@/api/http"
const testApi = {
  //获取字典数据
  getDictionary: (params) => {
    return http({
      url: "/dict/dictByType",
      method: "get",
      params,
    })
  },

  //获取banner列表
  getPageId: (params) => {
    
    return http({
      url: "/bannerManage/queryBannerList",
      method: "get",
      params,
    })
  },
  //获取信息http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20
  getNewsList: () => {
    return http({
      url: "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20",
      method: "get",
      onDownloadProgress (progress) {
        console.log(progress.loaded,progress.total,11111111111111111)
        // console.log(Math.round(progress.loaded / progress.total * 100) + '%');
      }
    })
  },

  //获取用户列表
  getUserList: () => {
    return http({
      url: "http://127.0.0.1:4523/m1/2309782-0-default/user/list",
      method: "get",
    })
  },

  //获取新闻列表
  getNewsList1: () => {
    return http({
      url: "http://127.0.0.1:4523/m1/2309782-0-default/news/list",
      method: "get",
    })
  },

}

export default testApi