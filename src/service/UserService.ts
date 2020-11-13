/*
 * @Author: Martin
 * @Date: 2020-04-23 10:51:33
 * @LastEditTime: 2020-06-05 17:45:15
 * @FilePath: \YundongSports\src\service\UserService.ts
 */ 
import BaseService from './BaseService';

class UserService extends BaseService{
    constructor(){
        super();
    }
    //*第一个参数是地址，第二个参数是data，第三个是contentType,可选
    /**
     * @description 用户登录
     * @param wxUserInfo 
     */
    async login (wxUserInfo){
        return this.http.post(`${this.baseUrl}/loginWx`,wxUserInfo)
    }

    
}
export default UserService