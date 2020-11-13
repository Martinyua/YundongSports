/*
 * @Author: Martin
 * @Date: 2020-05-29 14:23:03
 * @LastEditTime: 2020-06-01 09:12:15
 * @FilePath: \YundongSports\src\controller\OrderController.ts
 */ 
import OrderService from '../service/OrderService'

class OrderController{
    constructor(){}

    orderService = new OrderService;

    getOrderList(that,pageNum,pageSize,hasNext){
        return async (dispatch) => {
            const res = await this.orderService.getOrderList(pageNum,pageSize);
            if(res.length <= 0){
                hasNext = false
            }
            that.setState({
                pageNum:pageNum + 1,
                pageSize:pageSize,
                hasNext:hasNext
            })
            dispatch(this.orderList(res))
        }
    }

    getOrderDetail(param){
        return async (dispatch) =>{
            const res = await  this.orderService.getOrderDetail(param)
            dispatch (this.OrderDetail(res))
        }
    }
    OrderDetail(data){
        return{
            type:'ORDERDETAIL', 
            data
        }
    }
    orderList(data){
        return{
            type:'ORDERLIST',
            data
        }
    }
    clearOrderList(){
        return{
            type:'CLEARORDER'
        }
    }
}
export default OrderController;