/*
 * @Author: Martin
 * @Date: 2020-05-29 14:33:31
 * @LastEditTime: 2020-06-01 20:22:50
 * @FilePath: \YundongSports\src\reducers\order.ts
 */ 

const INITIAL_STATE={
    orderList:[],  //我的订单列表
    orderDetail:{} //订单详细
}

export default function order(prestate = INITIAL_STATE,action){
    switch(action.type){
        //获取的我订单
        case 'ORDERLIST':
            return{...prestate,orderList:prestate.orderList.concat(action.data)}
        case'CLEARORDER':
            return{...prestate,orderList:[]}
        //获取订单详情
        case 'ORDERDETAIL':
            return{...prestate,orderDetail:action.data}
        default :
            return {...prestate}
    }
    
}