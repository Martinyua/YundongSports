/*
 * @Author: Martin
 * @Date: 2020-04-11 17:12:48
 * @LastEditTime: 2020-05-25 16:52:08
 * @FilePath: \YundongSports\src\pages\rankingList\rankingList.tsx
 */
import { ComponentClass } from 'react'
import Taro, { Component, Config , } from '@tarojs/taro'
import { View ,Image,Text  } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import rankingImg from '../../assets/rankingImg.png'
import TeamController from '../../controller/TeamController'
import './rankingList.scss'


type teamDetail = [{
  groupName:string,
  introduction:string,
  logoUrl:string,
  id:number,
  totalFraction:number
}]
type PageStateProps = {
  team:{
    rankList:teamDetail
  }
}


type PageDispatchProps = {
  getRankingList:(that,pageNum:number,pageSize:number,haxNext:boolean) =>void
  clearRankList:()=>void
}

type PageOwnProps = {}

type PageState = {
  pageNum:number,
  pageSize:number,
  hasNext:boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface RankingList {
  props: IProps,
  state:PageState
}
const teamController = new TeamController()
@connect(({ team }) => ({
  team
}), (dispatch) => ({
  getRankingList(that,pageNum:number,pageSize:number,hasNext:boolean){
    dispatch(teamController.getRankingList(that,pageNum,pageSize,hasNext))
  },
  clearRankList(){
    dispatch(teamController.clearRankList())
  }
}))
class RankingList extends Component {
  constructor(props){
    super(props)
  }
  state = {
    // teamDetail:[],
    pageNum:1,
    pageSize:10,
    hasNext:true
  }
  config: Config = {
    navigationBarTitleText: '跑团积分排行榜'
  }
  componentDidMount(){
    const { pageNum,pageSize,hasNext } = this.state
    this.props.getRankingList(this,pageNum,pageSize,hasNext)
  }

  componentWillUnmount(){
    this.props.clearRankList()
  }

  goToDetail(id){
    Taro.navigateTo({
      url:`/pages/teamMembers/teamMembers?id=${id}`
    })
  }
  goToEdit(id){
    Taro.navigateTo({
      url:`/pages/editTeam/editTeam?id=${id}`
    })
  }
  onReachBottom(){
    const { pageNum,pageSize,hasNext } = this.state
    if(!hasNext){
      return
    }
    this.props.getRankingList(this,pageNum,pageSize,hasNext)
  }

  render () {
    const {rankList} = this.props.team
    return (
      <View className='team'>
      { 
        rankList && rankList.length > 0 ? 
        (
          rankList.map((item,index) =>{
          return(
            <View className="teamList" key = {item.id}>
            <Image className="teamLogo" src = {item.logoUrl} onClick = {this.goToDetail.bind(this,item.id)}></Image>
              <View className="teamContent">
                <View className = 'teamHead' onClick = {this.goToDetail.bind(this,item.id)}>
                  <Text >{item.groupName}</Text>
                  <View className = 'teamBox'>
                    <View className = 'teamNum'>{index + 1}</View>
                    <Image src = {rankingImg} className = 'teamImg'></Image>
                  </View>
                </View>
                <View className="teamIntro" onClick = {this.goToDetail.bind(this,item.id)}>
                    {item.introduction}
                </View>
                <View className = 'integralBox'>
                  <View className='integral'>当前积分：
                    <Text className = 'interNum'>{item.totalFraction}</Text>
                  </View>
                </View>
              </View>
            </View>  
          )
        })
        ) 
        : (<View className = 'teamZanwu'>没有任何跑团哦~</View>)
      }
        
        </View>
    )
  }
}


export default RankingList as ComponentClass<PageOwnProps, PageState>
