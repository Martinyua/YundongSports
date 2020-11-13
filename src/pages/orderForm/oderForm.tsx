import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import OrderList from '../../components/orderList/orderList'



import './orderForm.scss'

// eslint-disable-next-line @typescript-eslint/class-name-casing
interface IorderDetail {
  orderNum: number
  orderState: string
  gameName: string
  gameType: string
  price: number,
  isShow:boolean
}
type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {
  orderDetails:IorderDetail[],
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface OrderForm {
  props: IProps,
  state:PageState,
}

@connect(({  }) => ({
  
}), () => ({
  
}))
class OrderForm extends Component {

   
    config: Config = {
    navigationBarTitleText: '我的订单'
  }
    constructor(props){
      super(props)
      this.state = {
        orderDetails:[],
      }
    }
  componentDidMount(){
    const orderDetailex = [{
      orderNum:202004118833,
      orderState:'等待支付',
      gameName:'2020重庆·大足环龙水湖半程马拉松',
      gameType:'十公里',
      price:99,
      isShow:true,
      createTime:Number(new Date())
    },{
      orderNum:202004118833,
      orderState:'等待支付',
      gameName:'2020重庆·大足环龙水湖半程马拉松',
      gameType:'十公里',
      price:99,
      isShow:true,
      createTime:Number(new Date())
    },{
      orderNum:202004118833,
      orderState:'等待支付',
      gameName:'2020重庆·大足环龙水湖半程马拉松',
      gameType:'十公里',
      price:99,
      isShow:false,
      createTime:Number(new Date())
    },{
      orderNum:202004118833,
      orderState:'等待支付',
      gameName:'2020重庆·大足环龙水湖半程马拉松',
      gameType:'十公里',
      price:99,
      isShow:false,
      createTime:Number(new Date())
    },{
      orderNum:202004118833,
      orderState:'等待支付',
      gameName:'2020重庆·大足环龙水湖半程马拉松',
      gameType:'十公里',
      price:99,
      isShow:false,
      createTime:Number(new Date())
    },{
      orderNum:202004118833,
      orderState:'等待支付',
      gameName:'2020重庆·大足环龙水湖半程马拉松',
      gameType:'十公里',
      price:99,
      isShow:false,
      createTime:Number(new Date())
    },]
    this.setState({
      orderDetails:orderDetailex
    })
  }
  componentWillUnmount(){
}
  //倒计时结束，取消显示
  onTimeOut(index){
    const {orderDetails} = this.state
    orderDetails[index].isShow = false
    this.setState({
      orderDetails:orderDetails
    })
  }
  //取消订单
  onCancel(index){
    const {orderDetails} = this.state
    orderDetails[index].isShow = false
    this.setState({
      orderDetails:orderDetails
    })
    Taro.showToast({
      title:'取消成功',
      icon:'none',
      duration:1500
    })
  }
  getMore(){
    console.log('到底了~')
  }
  render () {
    const { orderDetails } = this.state
    return (
      <View className='orderForm'>
        {
          orderDetails && orderDetails.length > 0 ?
          (
          <ScrollView className = 'orderScroll'
            onScrollToLower = {this.getMore.bind(this)}
            scrollY
          >
            {orderDetails.map((item,index) =>{
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
          </ScrollView>
          ) : (<View className='noForm'>您还没有订单哦~</View>)
        }

      </View>
      
    )
  }
}


export default OrderForm as ComponentClass<PageOwnProps, PageState>
