/*
 * @Author: Martin
 * @Date: 2020-04-23 10:42:45
 * @LastEditTime: 2020-07-03 11:44:53
 * @FilePath: \YundongSports\src\service\BaseService.ts
 */ 

import Http from '../utils/http';

export default class BaseService{
    constructor(){

    }
    http:Http = new Http();
    baseUrl :string = "https://vxrungroup.cqsports.cn" //线上地址
    //baseUrl :string = "http://y291z33000.wicp.vip"  //测试地址
}