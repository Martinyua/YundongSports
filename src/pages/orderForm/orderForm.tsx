import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import OrderList from '../../components/orderList/orderList'

import './orderForm.scss'
import OrderController from '../../controller/OrderController'
import OrderService from '../../service/OrderService'
// eslint-disable-next-line @typescript-eslint/class-name-casing
interface IorderDetail {
  createTime:number
  deleted:number
  id:number
  orderNum:string
  orderType:number
  raceName:string
  joinType:string
  totalFee: number
  raceId:number
}
type PageStateProps = {
  order:{
    orderList:IorderDetail []
  }
}

type PageDispatchProps = {
  getOrderList :(that,pageNum:number,pageSize:number,hasNext:boolean) => void
  clearOrderList :() =>void

}

type PageOwnProps = {}

type PageState = {
  orderDetails:IorderDetail[],
  pageNum:number,
  pageSize:number,
  hasNext:boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface OrderForm {
  props: IProps,
  state:PageState,
}
const orderContorller = new OrderController()
@connect(({ order }) => ({
  order
}), (dispatch) => ({
  getOrderList(that,pageNum,pageSize,hasNext){
    (dispatch(orderContorller.getOrderList(that,pageNum,pageSize,hasNext)))
  },
  clearOrderList(){
    (dispatch(orderContorller.clearOrderList()))
  }
}))
class OrderForm extends Component {

   
    config: Config = {
    navigationBarTitleText: '我的订单'
  }
    constructor(props){
      super(props)
      this.state = {
        pageNum:1,
        pageSize:10,
        hasNext:true,
        orderDetails:[],
      }
    }

    componentDidMount(){
      const { pageNum,pageSize,hasNext } = this.state
      this.props.getOrderList(this,pageNum,pageSize,hasNext)
    }
    componentWillUnmount(){
      this.props.clearOrderList();
  }
  orderService = new OrderService()
  //倒计时结束，取消显示
  onTimeOut(index){
    const {orderList} = this.props.order
    orderList[index].orderType = 0
    this.setState({
      orderDetails:orderList
    })
  }
  //取消订单
  onCancel(index){
    const {orderList} = this.props.order
    orderList[index].orderType = 0
    this.setState({
      orderDetails:orderList
    })
    this.orderService.cancelOrder(orderList[index].id).then(res =>{
      if(res.code != '0'){
        Taro.showToast({
          title:'取消成功',
          icon:'none',
          duration:1500
        })
      }
    })

  }
  //下拉加载更多
  onReachBottom(){ 
    const { pageNum,pageSize,hasNext } = this.state
    if(!hasNext){
      return
    }
    this.props.getOrderList(this,pageNum,pageSize,hasNext)
  }

  render () {
    const { orderList } = this.props.order
    return (
      <View className='orderForm'>
        {
          orderList && orderList.length > 0 ?
          (
          <View className = 'orderScroll'
          >
            {orderList.map((item,index) =>{
            return(
              <OrderList item = {item} 
                key = {item.orderNum} 
                index = {index} 
                onTimeOut={this.onTimeOut.bind(this,index)}
                onCancel={this.onCancel.bind(this,index)}
              >
              </OrderList>
            )   
           })}
          </View>
          ) : (<View className='noForm'>您还没有订单哦~</View>)
        }

      </View>
      
    )
  }
}


export default OrderForm as ComponentClass<PageOwnProps, PageState>
