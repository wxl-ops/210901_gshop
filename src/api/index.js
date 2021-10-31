import ajax from './ajax'
const BASE_URL = '/api'
//根据经纬度获取地址信息
export const reqAddress = geohash =>ajax(`${BASE_URL}/position/${geohash}`)
//请求分类信息
export const reqFoodCategory = () => ajax(BASE_URL+'/index_category')
//根据经纬度请求店铺信息
export const reqShops = (longitude,latitude) => ajax(BASE_URL+'/shops',{longitude,latitude})
//根据关键词搜索店铺
export const reqGetShops = (geohash,keyword) => ajax(BASE_URL+'/search_shops',{geohash,keyword})
//用户名密码登录
export const reqPwdLogin = ({name,pwd,captcha}) => ajax(BASE_URL+'/login_pwd',{name,pwd,captcha},'POST')
//给后台提交手机号
export const reqSendCode = (phone) => ajax(BASE_URL+'/sendcode',{phone})
//手机号验证码登录
export const reqSmsLogin = (phone,code) => ajax(BASE_URL+'/login_sms',{phone,code},'POST')
//根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL+'/userinfo')
//登出
export const reqLogout = () => ajax(BASE_URL+'/logout')



