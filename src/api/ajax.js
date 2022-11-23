import http from './index'
//banner
export const reqBanner=()=>{return http.get('/banner')}
//内容精选
export const reqDishList=(params)=>{return http.get('/menu/query',{params})}
//登录
export const reqLogin=(params)=>{return http.post('/user/login',params)}
//获取用户信息
export const reqUserInfo=(params)=>{return http.post('/user/info',params)}
//退出登录
export const reqLogOut=()=>{return http.post('/user/login_out')}
//注册账号
export const reqRegist=(params)=>{return http.post('/user/create',params)}
//关注和取消关注
export const reqFollow=(params)=>{return http.post('/user/following',params)}
//获取指定用户的粉丝
export const reqFans=(params)=>{return http.get('/user/fans',{params})}
//获取指定用户的关注
export const reqFolling=(params)=>{return http.get('/user/following',{params})}
//获取指定用户的收藏
export const reqCollection=(params)=>{return http.get('/user/collection',{params})}
//修改用户信息
export const reqEditUserInfo=(params)=>{return http.post('/user/edit',{params})}
//获取所有菜单的属性分类
export const reqMenuProperty=()=>{return http.get('/menu/property')}
//按菜谱进行分类
export const reqMenuClassify=()=>{return http.get('/menu/classify')}
//发布菜谱
export const reqMenuPublish=(params)=>{return http.post('/menu/publish',params)}
//根據菜單Id,拿到菜單詳情
export const reqMenuDetail=(params)=>{return http.get('/menu/menuInfo',{params})}