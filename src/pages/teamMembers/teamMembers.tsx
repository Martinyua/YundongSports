import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View ,Image,Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'


import './teamMembers.scss'
import TeamController from '../../controller/TeamController'

type memberInfo = [{
  avatarUrl: string
  nickName: string
}]
type teamInfo = {
  logoUrl: string
  groupName: string
}
type PageStateProps = {
  team: {
    teamInfo: teamInfo
    teamMembers: memberInfo
  }
}

type PageDispatchProps = {
  getMoreTeamMembers: (that,groupId: string,pageNum: number,pageSize: number) => void,
  clear:()=>void
}

type PageOwnProps = {}

type PageState = {
  pageNum: number
  pageSize: number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface TeamMembers {
  props: IProps
  state: PageState
}

const teamController = new TeamController()
@connect(({ team }) => ({
  team
}), (dispatch) => ({
  getMoreTeamMembers:(that,groupId:string,pageNum:number,pageSize:number) =>{
    dispatch(teamController.getMoreTeamMembers(that,groupId,pageNum,pageSize))
  },
  clear:()=>{
    dispatch(teamController.clear())
  }
}))
class TeamMembers extends Component {

   
    config: Config = {
    navigationBarTitleText: '跑团详情'
  }
  constructor(props){
    super(props)
    this.state = {
      pageNum:1,
      pageSize:50,
    }
  }
  componentDidMount(){
    const {id} = this.$router.params
    const{ pageNum,pageSize } = this.state
    this.props.getMoreTeamMembers(this,id,pageNum,pageSize)
    console.log('TeamMembers',this.props.team)
  }
  componentWillUnmount(){
    this.props.clear();
  }
  //下拉加载
  onReachBottom(){
    const {id} = this.$router.params
    const { pageNum,pageSize } = this.state
    this.props.getMoreTeamMembers(this,id,pageNum,pageSize)
  }
  render () {
    const {teamInfo,teamMembers} = this.props.team
    return ( 
        <View className='members'>

            <View className = 'teamHead'>
              <Image className = 'teamLogo' src = {teamInfo.logoUrl}></Image>
              <View className = 'teamName'>{teamInfo.groupName}</View>
            </View>
            <View className = 'teamContent'>
              {teamMembers.map((item) =>{
                return(
                <View className = 'memberBox'>
                  <Image className = 'memberImg' src = {item.avatarUrl}></Image>
                  <Text className = 'memberName'>{item.nickName}</Text>
                </View>                     
                )
              })}
            </View>

        </View>

    )
  }
}


export default TeamMembers as ComponentClass<PageOwnProps, PageState>
