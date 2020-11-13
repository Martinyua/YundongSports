/*
 * @Author: Martin
 * @Date: 2020-04-23 10:12:34
 * @LastEditTime: 2020-06-28 19:50:38
 * @FilePath: \YundongSports\src\utils\http.ts
 */

import Taro from '@tarojs/taro';

type HttpMethod = 'GET' | 'POST' ;

export default class Http{

    get(url,data?,contentType = 'application/json'){
        return this.commonHttp('GET',url,data || {},contentType );
    }
    post(url,data?,contentType ='application/json'){
        return this.commonHttp('POST',url,data || {},contentType);
    }
    
    async commonHttp(method:HttpMethod,url,data,contentType?):Promise<any>{
        return new Promise<any>( async(resolve,reject):Promise<any> =>{
            const token = Taro.getStorageSync('token');
            Taro.showNavigationBarLoading();
            try{
                const res = await Taro.request({
                    url,
                    method,
                    data,
                    header:{
                        'content-type' : contentType || 'application/json',
                        'token' : token,
                    },
                    timeout:10000
                    
                });
                Taro.hideNavigationBarLoading();
                console.log(
                    `以下为调试信息:\n 请求地址:${url}\n 请求方式: ${method}\n token: ${token} \n 请求格式: ${contentType} \n 请求参数: ${JSON.stringify(
                      data)}\n 返回结果:  `, res.data);
                //*res.data.msg 成功返回success ,失败返回fail，code为0时会返回具体的问题信息
                switch(res.data.code){
                    case '1':
                        return resolve(res.data.data); 
                    case '0':
                        console.log('fail');
                        Taro.showToast({
                            icon:'none',
                            title:res.data.Exception,
                            duration:1200,
                            mask:true
                        })
                        //如果token过期
                        if(res.data.Exception === '对不起，请重新登录'){
							Taro.setStorageSync('token',undefined);
                            Taro.setStorageSync('userInfo',undefined);   
                            setTimeout(() => {
                                Taro.switchTab({
                                  url: '../../pages/personal/personal',
                                })
                              }, 1000);                         
                        }
                        
                        reject(res.data);

                    default:
                        console.log('fail')
                        Taro.showToast({
                            icon:'none',
                            title:res.data.Exception,
                            duration:1200,
                            mask:true
                        })
                        reject(res.data);

                }
            }catch(error){
                Taro.hideNavigationBarLoading();
                Taro.showToast({
                    title:'网络错误请重试',
                    icon:'loading',
                    duration:1500
                })
                throw new Error('出现错误:' + JSON.stringify(error));
            }
        }).catch(error =>{
            Taro.hideNavigationBarLoading();
            Taro.showToast({
                title:error.message,
                icon:'none',
                duration:1500,
                mask:true
            })
            throw new Error(error)
        })
    }
}
