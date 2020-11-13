import { ComponentClass } from 'react'
import Taro, { Component} from '@tarojs/taro'
import { View,WebView} from '@tarojs/components'

type PageStateProps = {
  counter: {}
}
type PageDispatchProps = {
}

type PageOwnProps = {
}

type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Articl {
  props: IProps;
}
class Articl extends Component<PageOwnProps, PageState> {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  handleMessage () {
    console.log('成功')
  }
  componentWillMount(){
  }
  render () {
    return (
      <WebView src={this.$router.params.id} onMessage={this.handleMessage} />
    )
  }
}
export default Articl  as ComponentClass