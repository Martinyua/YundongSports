import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text ,Image} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import form from '../../assets/form.png'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface AtLists {
  props: IProps;
}

@connect(({ }) => ({
  
}))
class AtLists extends Component {
    config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View>
          <Text>
              <Image src = {form}></Image>
          </Text>
          <Text>我的订单</Text>
          <Text>
              
          </Text>
      </View>
    )
  }
}


export default AtLists as ComponentClass<PageOwnProps, PageState>
