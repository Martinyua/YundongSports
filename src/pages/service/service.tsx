import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Button} from '@tarojs/components'
import { connect } from '@tarojs/redux'


import './service.scss'
type PageStateProps = {

}

type PageDispatchProps = {
 
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps,
  state:PageState
}

@connect(({  }) => ({
  
}), () => ({

}))
class Index extends Component {

    config: Config = {
    navigationBarTitleText: '客服中心'
  }
  phoneCall(e){
    console.log(e),
    Taro.makePhoneCall({
      phoneNumber:e.currentTarget.dataset.iphone
    })
  }

  render () {
    return (
      <View className='serviceView'>
        <View>有任何问题,您可以</View>
        <Button openType='contact'>联系客服微信</Button>
        <View>或拨打客服电话</View>
        <View className='operatingHours'>客服工作时间 9:00-18:00</View>
        <Button onClick={this.phoneCall.bind(this)} data-iphone = '19942330710'>小云</Button>
        <Button onClick={this.phoneCall.bind(this)} data-iphone = '15828086669'>小动</Button>
        <View>商务合作</View>
        <Button onClick={this.phoneCall.bind(this)} data-iphone = '15828086669'>云动重庆</Button>
      </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>
