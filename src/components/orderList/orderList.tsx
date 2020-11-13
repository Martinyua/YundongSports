import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import CountDown from '../../utils/countDown'
import './orderList.scss'
type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {
  item:any,
  index:number,
  onTimeOut:(index:number) =>void
  onCancel:(index:number) =>void
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface OrderList {
  props: IProps;
}

@connect(({ }) => ({
  
}))
class OrderList extends Component {
    config: Config = {
    navigationBarTitleText: '首页'
  }
  static defaultProps={
    item:{
      orderType : 0
    }
  }
  onTimeoutFn(index){
    console.log('时间到了~,id为',index)
    this.props.onTimeOut(index)
  }
  onCancel(index,e){
    e.stopPropagation()
    this.props.onCancel(index)
  }
  goToDetail(orderNum,isAdult,runningGroupId,totalFee,orderState,createTime,orderType,raceId){
    Taro.navigateTo({
      url:`/pages/orderFormetail/orderFormetail?outTradeNo=${orderNum}&isAdult=${isAdult}&runningGroupId=${runningGroupId}&totalFee=${totalFee}
      &orderState=${orderState}&createTime=${createTime}&orderType=${orderType}&raceId=${raceId}`
    })
  }
  render () {
    const { item,index } = this.props;

    switch (item.orderType) {
      case 0:
        item.orderState = '订单已取消'
        break;
      case 1:
        item.orderState = '支付成功'
        break;
      case 2:
        item.orderState = '等待支付'
        break;

      default:
        break;
    }
    return (
      <View className = 'orderList' onClick = {
        this.goToDetail.bind(this,item.orderNum,item.isAdult ? 1 : 0,item.runningGroupId,item.totalFee,item.orderState,item.createTime,item.orderType,item.raceId)
        }>
        <View className = 'orderBox'>
          <View className = 'orderTitle'>
              <Text className = 'orderNum'>订单编号:{item.orderNum}</Text>
              <Text className = 'orderState'>{item.orderState} </Text>
          </View>
          <View className = 'orderInfo'>
              <View className = 'gameName'>{item.raceName}</View>
              <View className = 'gameType'> {item.joinType}</View>
              <Text className = 'price'>订单金额：￥{item.totalFee}</Text>
                {
                  item.orderType === 2 ? (
                  <View className = 'btn'>
                      <Button className = 'payNowbtn'>
                        马上支付
                        <CountDown createTime = {item.createTime} myCorrNowTime={new Date()} onTimeoutFn={this.onTimeoutFn.bind(this,index)}></CountDown>
                      </Button>
                    <Button className = 'cancelbtn' onClick={this.onCancel.bind(this,index)}>取消订单</Button>
                  </View> 
                  ):null
                }
          </View>
        </View>  
      </View>
    )
  }
}


export default OrderList as ComponentClass<PageOwnProps, PageState>
