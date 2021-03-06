import ajax from './ajax'
const BASE_URL = '/api'

//根据经纬度获取地址信息
export const reqAddress = geohash =>ajax(`${BASE_URL}/position/${geohash}`)
//请求分类信息
export const reqFoodCategory = () => ajax(BASE_URL+'/index_category')
//根据经纬度请求店铺信息
export const reqShops = (longitude,latitude) => ajax(BASE_URL+'/shops',{longitude,latitude})
//根据关键词搜索店铺
export const reqGetShops = (geohash,keyword) => ajax('http://cangdu.org:8001/v4/restaurants',
  {'extras[]': 'restaurant_activity', geohash, keyword, type: 'search'})
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

//请求mock数据,因为是mock数据,所以url可以自己随意制定
export const reqShopInfo = () => ajax('/info');
export const reqShopGoods = () => ajax('/goods');
export const reqShopRatings = () => ajax('/ratings');



