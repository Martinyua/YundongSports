
import Taro, { Component} from '@tarojs/taro'
import { View,Image} from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { formatTimeStampToTime } from '../../utils/common'
import './Search.scss'
type PageStateProps = {
}
type PageDispatchProps = {
}
type PageOwnProps = {
  list:Array<
  {
    createTime:string,
    groupName:string,
    id:string,
    maxPerson:string,
    logoUrl:string
    nowPerson:string
    score:string,
    state:number
  }>
  raceId:string,
  imgUrl:string,
  deleted:string
}
type PageState = {
  value:string,
  inStockOnly:boolean,
  peerData:Array<
  {
    createTime:string,
    groupName:string,
    id:string,
    maxPerson:string,
    logoUrl:string
    nowPerson:string
    score:string,
    state:number
  }>
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps
interface Search {
  props: IProps;
}

class Search extends Component<PageOwnProps, PageState>{

  onChange (value:string) {
    this.setState({
        value: value
      })
   }
  onActionClick () {
  const{}=this.state
  var allList=this.props.list
  var View=this.state.value
  const peerHtml:any = []
  allList.forEach((item:any)=>{
    if(item.groupName.indexOf(View)>=0){
      //使用indexOf判断s中是否包含View字符串，如果包含则将这条item数据push到新数组中
        peerHtml.push(item)
        //peerData为最终得到的数据，可传递给子组件
       }
       this.setState({peerData:peerHtml,inStockOnly:true})
  })
  this.setState({
    value:'',
  })
}
onClick(id){
  Taro.navigateTo({
    url: `../attend/attend?id=${id}&&raceId=${this.props.raceId}&&imgUrl=${this.props.imgUrl}&&deleted=${this.props.deleted}`
  })
}
  render () {
    const {list}=this.props
    return (
        <View className="search">
        <AtSearchBar
        placeholder='按跑团名称搜查'
        className="searchbar"
        showActionButton={false}
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onActionClick={this.onActionClick.bind(this)}
        onConfirm={this.onActionClick.bind(this)}
      />
      {this.state.inStockOnly==true
      ?<View >
      {this.state.peerData.map(item=>{ 
      return <View onClick={this.onClick.bind(this,item.id)} className='teamlists'>
      <View style='display:flex'>
        <Image className="teamlist_image" src={item.logoUrl}></Image>
        <View className="teamlist_text">{item.groupName}</View>
        <View style=" font-size: 24.5rpx;color: #868686;line-height: 45rpx;">{this.props.deleted === '1' ? "已结束" : "进行中"}</View>
      </View>
      <View className='teamlists_detail' style='display:flex;text-align:left;font-size: 29rpx;'>
      <View className='teamlists_detail_info'>
        <View style="color:grey">创建时间</View>
        <View>{formatTimeStampToTime(item.createTime)}</View>
      </View>
      <View className='teamlists_detail_info'>
        <View style="color:grey">人数限制</View>
        <View>{item.maxPerson =='0' ? '无限制' : item.maxPerson}</View>
      </View>
      <View className='teamlists_detail_info'>
        <View style="color:grey">已参加</View>
        <View>{item.nowPerson}人</View>
      </View>
      <View className='teamlists_detail_info'>
        <View style="color:grey">分数</View>
        <View>{item.score}分</View>
      </View>
      </View>
      </View>})}
      </View>
      :<View>
      {(list||[]).map((item)=>{ 
      return <View onClick={this.onClick.bind(this,item.id)} className='teamlists'>
      <View className = 'team_list_box' >
        <Image className="teamlist_image" src={item.logoUrl}></Image>
        <View className="teamlist_text">{item.groupName}</View>
        <View style=" font-size: 24.5rpx;color: #868686;line-height: 45rpx;">{this.props.deleted === '1' ? "已结束" : "进行中"}</View>
      </View>
      <View className='teamlists_detail' style='display:flex;text-align:left;font-size: 29rpx;'>
      <View className='teamlists_detail_info'>
        <View style="color:grey">创建时间</View>
        <View>{formatTimeStampToTime(item.createTime)}</View>
      </View>
      <View className='teamlists_detail_info'>
        <View style="color:grey">人数限制</View>
        <View>{item.maxPerson =='0' ? '无限制' : item.maxPerson}</View>
      </View>
      <View className='teamlists_detail_info'>
        <View style="color:grey">已参加</View>
        <View>{item.nowPerson}人</View>
      </View>
      <View className='teamlists_detail_info'>
        <View style="color:grey">积分</View>
        <View>{item.score}分</View>
      </View>
      </View>
      </View>})}
      </View>}
      </View>
    )
  }
}
export default Search  