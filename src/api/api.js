//进行远程调用
import axios from 'axios'
//包装param参数
import qs from 'qs'
// 声明基础访问地址
axios.defaults.baseURL = '/api'
// axios.defaults.timeout = 15000;  //超时响应
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; // 配置请求头（推荐）
// axios.defaults.headers.post['Content-Type'] = 'application/multipart/form-data';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'; // 配置请求头
// axios.defaults.baseURL = $core.use('http'); //确认协议和地址
// axios.defaults.withCredentials = true;   // axios 默认不发送cookie，需要全局设置true发送cookie

//声明一个调用方法
export const requestLogin = params => {return axios.post('/login',qs.stringify(params)).then(res => res.data)}
export const test = params => {return axios.post('/test/test',qs.stringify(params)).then(res => res.data)}
export const blogGetById = params => {return axios.get('/blog/getById?' + qs.stringify(params)).then(res => res.data)}
export const blogList = params => {return axios.get('/blog/getList').then(res => res.data)}
export const blogPage = params => {return axios.get('/blog/getPage?' +  qs.stringify(params)).then(res => res.data)}
export const addBlog = params => {return axios.post('/blog/add', qs.stringify(params)).then(res => res.data)}
export const updateBlog = params => {return axios.post('/blog/update', qs.stringify(params)).then(res => res.data)}
export const deleteBlog = params => {return axios.post('/blog/delete', qs.stringify(params)).then(res => res.data)}
export const upload = params => {return axios.post('/file/upload', params).then(res => res.data)}
export const yqInfo = params => {return axios.get('/yqinfo/get').then(res => res.data)}
