/*
 * @Author: Martin
 * @Date: 2020-04-11 17:12:48
 * @LastEditTime: 2020-06-21 10:58:01
 * @FilePath: \YundongSports\src\pages\team\team.tsx
 */
import { ComponentClass } from 'react'
import Taro, { Component, Config , } from '@tarojs/taro'
import { View ,Image,Text  } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import team_grey from  '../../assets/team_grey.png'
import team_set from  '../../assets/set.png'
import TeamController from '../../controller/TeamController'
import rankingImg from '../../assets/rankingList.png'
import './team.scss'


type teamDetail = [{
  runningGroupName:string,
  introduction:string,
  nowPerson:number,
  logoUrl:string,
  runningGroupId:number
}]
type PageStateProps = {
  team:{
    myTeam:teamDetail
  }
}


type PageDispatchProps = {
  getMoreMyList:(that,pageNum:number,pageSize:number,haxNext:boolean) =>void
  clearList:()=>void
}

type PageOwnProps = {}

type PageState = {
  // teamDetail:teamDetail[],
  pageNum:number,
  pageSize:number,
  hasNext:boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Team {
  props: IProps,
  state:PageState
}
const teamController = new TeamController()
@connect(({ team }) => ({
  team
}), (dispatch) => ({
  getMoreMyList(that,pageNum:number,pageSize:number,hasNext:boolean){
    dispatch(teamController.getMoreMyTeam(that,pageNum,pageSize,hasNext))
  },
  clearList(){
    dispatch(teamController.clearList())
  }
}))
class Team extends Component {
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
    navigationBarTitleText: '已加入的跑团'
  }
  componentDidMount(){
    const { pageNum,pageSize,hasNext } = this.state
    this.props.getMoreMyList(this,pageNum,pageSize,hasNext)
  }

  componentWillUnmount(){
    this.props.clearList()
  }

  goToDetail(id){
    Taro.navigateTo({
      url:`/pages/teamMembers/teamMembers?id=${id}`
    })
  }
  goToEdit(id,e){
    e.stopPropagation()
    Taro.navigateTo({
      url:`/pages/editTeam/editTeam?id=${id}`
    })
  }
  onReachBottom(){
    const { pageNum,pageSize,hasNext } = this.state
    if(!hasNext){
      return
    }
    this.props.getMoreMyList(this,pageNum,pageSize,hasNext)
  }
  goToRankingList(){
    Taro.navigateTo({
      url:`/pages/rankingList/rankingList`
    })
  }
  render () {
    const {myTeam} = this.props.team
    
    return (
      <View className='team' >
        <View className = 'rankingBox'>
          <Image src = {rankingImg}></Image>
          <View className = 'ranking' onClick={this.goToRankingList.bind(this)}>查看团队积分排行榜</View>
        </View>
      { 
        myTeam && myTeam.length > 0 ? 
        (
          myTeam.map((item) =>{
          return(
            <View className="teamList" key = {item.runningGroupId} onClick = {this.goToDetail.bind(this,item.runningGroupId)}>
            <Image className="teamLogo" src = {item.logoUrl} ></Image>
              <View className="teamContent">
                <View className = 'teamHead' >
                  <Text >{item.runningGroupName}</Text>
                  <View className = 'teamBox'>
                    <Image src = {team_grey} className = 'teamImg'></Image>
                    <View className = 'teamNum'>{item.nowPerson}</View>
                  </View>
                </View>
                <View className="teamIntro">
                    {item.introduction}
                </View>
                <View className = 'setBox'>
                  <Image src = {team_set} className = 'setImg' onClick = { this.goToEdit.bind(this,item.runningGroupId)}></Image>
                  <View className = 'set' onClick = { this.goToEdit.bind(this,item.runningGroupId)}>编辑</View>
                </View>
              </View>
            </View>  
          )
        })
        ) 
        : (<View className = 'teamZanwu'>您还没有加入任何跑团哦~</View>)
      }
        
        </View>
    )
  }
}


export default Team as ComponentClass<PageOwnProps, PageState>
