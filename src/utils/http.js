import axios from "axios"
axios.defaults.baseURL="";
axios.defaults.timeout=3000;

// axios.interceptors.request.use(config => {
// // Do something before request is sent
//     let token = localStorage.getItem("token")?localStorage.getItem("token"):"";
//     config.headers.Authorization = token;
//     return config;
// },error => {
// // Do something with request error
// return Promise.reject(error);
// });


axios.interceptors.response.use(response => {
// Do something before response is sent
return response.data;
},error => {
// Do something with response error
return Promise.reject(error);
});

/* 
封装的get请求方法
@url:string请求路径
@params:Object|string 请求参数 
: Promise 
*/
function get(url,params={}){
    return new Promise((res,rej)=>{
        axios({
            method:'get',
            url,
            params
        }).then(data=>{
            res(data)
        }).catch(err=>{
            rej(err)
        })
    })
}
/* 
封装的post请求方法
@url:string请求路径
@data:Object|string 请求参数 
: Promise 
*/
function post(url,data={}){
    return new Promise((res,rej)=>{
        axios({
          method: "post",
          url,
          data,
        }).then(data=>{
            res(data)
        }).catch(err=>{
            rej(err)
        })
    })
}

// 封装包含上传内容的方法
// @url:上传地址
// @data:上传数据
function upload(url,data={}){
    return new Promise((res,rej)=>{
        let form = new FormData();
        for (var key in data) {
          // append:向表单实例添加数据的方法
          // key: 数据的名称
          // value: 数据的值
          form.append(key,data[key]);
        }
        axios({
            method:'post',
            url,
            data:form,
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then(data=>{
            res(data)
        }).catch(err=>{
            rej(err)
        })
    })
}


// eslint-disable-next-line import/no-anonymous-default-export
export default{
    get,
    post,
    upload
}

