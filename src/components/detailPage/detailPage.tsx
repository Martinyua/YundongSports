import { ComponentClass } from 'react'
import Taro, { Component} from '@tarojs/taro'
import { View , Text } from '@tarojs/components'
import './detailPage.scss'
import { formatTimeStampToTimeZj } from '../../utils/common'
type PageStateProps = {
}
type PageDispatchProps = {}
type PageOwnProps = {
  listData:Array<
  {
    imageUrl: string
    raceName: string,
    raceTime: string,
    racePlace: string,
    raceType: string,
    sponsor: string,
    introduction: string
  }>
}
type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface DetailPage {
  props: IProps;
}

class DetailPage extends Component {
  render () {
    return (
      <View>
        {(this.props.listData||[]).map(item=>{
         return <View className="details_tab_cont" style='height:100%;'>
            <View className="details_tab_cont_detail">
                <View className="details_tab_cont_detail_pis">赛事名称</View>
                <View className="details_tab_cont_detail_pis">{item.raceName}</View>
            </View>
            <View className="details_tab_cont_detail">
                <View className="details_tab_cont_detail_pis">开始时间</View>
                <View className="details_tab_cont_detail_pis">{formatTimeStampToTimeZj(item.raceTime)}</View>
            </View>
            <View className="details_tab_cont_detail">
                <View className="details_tab_cont_detail_pis">赛事地点</View>
                <View className="details_tab_cont_detail_pis">{item.racePlace}</View>
            </View>
            <View className="details_tab_cont_detail">
                <View className="details_tab_cont_detail_pis">赛事类型</View>
                <View className="details_tab_cont_detail_pis">{item.raceType}</View>
            </View>
            <View className="details_tab_cont_detail">
                <View className="details_tab_cont_detail_pis">主办方</View>
                <View className="details_tab_cont_detail_pis">{item.sponsor}</View>
            </View> 
            <View className="details_tab_cont_detail_text">
              <Text >{item.introduction}</Text>
            </View>

          </View>
        })}
      </View>
    )
  }
}


// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default DetailPage  as ComponentClass<PageOwnProps,PageState>