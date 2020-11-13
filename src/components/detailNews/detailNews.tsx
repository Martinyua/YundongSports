import { ComponentClass } from 'react'
import Taro, { Component} from '@tarojs/taro'
import { View,WebView} from '@tarojs/components'
import './DetailNews.scss'
import { formatTimeStampToTimeZj } from '../../utils/common'
type PageStateProps = {
}
type PageDispatchProps = {
}

type PageOwnProps = {
  listNews:Array<{
    createTime:string,
    informationTitle:string,
    informationUrl:string
  }>
}

type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface DetailNews {
  props: IProps;
}
class DetailNews extends Component{
  onClick(item){
    console.log(item);
    Taro.navigateTo({url:`../articl/articl?id=${item.informationUrl}`})
  }
  render () {
    return (
        <View className="detaiNews" style='height:100%;' >
              {(this.props.listNews||[]).map((item)=>(
                <View onClick={this.onClick.bind(this,item)} >
                          <View className="detaiNews_info">{item.informationTitle}</View>
                          <View className="detaiNews_info">{formatTimeStampToTimeZj(item.createTime)}</View>
                </View>
            )
            )}
        </View>
    )
  }
}
export default DetailNews  as ComponentClass<PageOwnProps, PageState> 