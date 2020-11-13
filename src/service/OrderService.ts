/*
 * @Author: Martin
 * @Date: 2020-05-29 14:09:20
 * @LastEditTime: 2020-06-05 17:46:25
 * @FilePath: \YundongSports\src\service\OrderService.ts
 */ 
import BaseService from './BaseService'

class OrderService extends BaseService{
    constructor(){
        super();
    }
    /**
     * @description 获取用户的历史订单
     * @param pageNum 
     * @param pageSize 
     */
    async getOrderList(pageNum = 1,pageSize = 10){
        const param = {
            pageNum,
            pageSize
        }
        const res = await this.http.get(`${this.baseUrl}/getHistoryOrder`,param) 
        return res
    }

    /**
     * @description 获取订单详情
     * @param param 
     */
    async getOrderDetail(param){
        const res = await this.http.get(`${this.baseUrl}/getOrderDetail`,param)
        return res
    }
    
    /**
     * @description 取消订单
     * @param param 
     */
    async cancelOrder(param){
        const data ={
            orderId:param
        }
        const res = await this.http.post(`${this.baseUrl}/cancelOrder`,data)
        return res;
    }
}
export default OrderService;