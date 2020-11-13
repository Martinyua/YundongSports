import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import { AtTabs, AtTabsPane} from 'taro-ui'
import DetailPage from '../../components/detailPage/detailPage'
import DetailNews from '../../components/detailNews/detailNews'
import FormSign from '../Form/Form'
import './signup.scss'
import { connect } from '@tarojs/redux'
import EventDetailController from '../../controller/EventDetailController'
import DetailService from '../../service/DetailService'


type PageStateProps = {
  eventDetail: {
    event: Array<
    {
      imageUrl: string
      raceName: string,
      raceTime: string,
      racePlace: string,
      raceType: string,
      sponsor: string,
      introduction: string
    }>
    eventTeam: Array<
      {
        createTime: string,
        groupName: string,
        id: string,
        maxPerson: string,
        logoUrl: string
      }
    >
    eventNews:Array<{
      createTime:string,
      informationTitle:string,
      informationUrl:string
    }>
  }
}

type PageDispatchProps = {
  getEventList(that,raceId:string)
  getEventNews(pageNum:number,pageSize:number,raceId:string)
}
type PageOwnProps = {
}

type PageState = {
  img:string,
  keywords: string,
  current:number,
  value:string,
  tabList:Array<{title:string}>,
  raceId:string,
  pageSize:number,
  pageNum:number,
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
  listNews:Array<{
    createTime:string,
    informationTitle:string,
    informationUrl:string
  }>,
  teamImg:string,
  teamName:string,
  groupId:string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Signup {
  props: IProps;
}
const eventDetailController = new EventDetailController();

@connect(({ eventDetail }) => ({
  eventDetail
}), (dispatch) => ({
  getEventList:(that,raceId:string)=>{
    dispatch(eventDetailController.getEvent(that,raceId))
  },
  getEventNews(pageNum:number,pageSize:number,raceId:string){
    dispatch(eventDetailController.getNews(pageNum,pageSize,raceId))
  }
}))

class Signup extends Component<PageOwnProps, PageState> {
  constructor (props) {
    super(props)
    this.state={
      img:'',
      keywords:'',
      current: 0,
      value:'',
      tabList:[{ title: '赛事介绍' }, { title: '报名表' }, { title: '相关资讯' }],
      raceId:'',
      pageSize:1000,
      pageNum:1,
      listData:[],
      listNews:[],
      teamImg:'',
      teamName:'',
      groupId:''
    }
  }
    config: Config = {
    navigationBarTitleText:'赛事报名'
  }
  DetailService = new DetailService()
  componentWillMount(){
    const {raceId,id}=this.$router.params
    const{pageNum,pageSize}=this.state
    this.props.getEventList(this,raceId)
    this.props.getEventNews(pageNum,pageSize,raceId)
    this.DetailService.getTeamDetail(id).then((res)=>{
      this.setState({
        teamImg:res.logoUrl,
        teamName:res.groupName
      })
    })
    this.setState({
      raceId:raceId,
      groupId:id
    })
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }
  componentDidMount(){
  }
  render () {
    const {img,current,tabList,teamImg,teamName,groupId,raceId}=this.state
    const {imgUrl} = this.$router.params
    return (
      <View className='signup' style='text-align: center;'>
        <Image
          style='width: 95%;height: 150px;background: #fff'
          src={imgUrl}
        />
        <Image src={teamImg} style='width: 15%;height: 60px;border-radius:50%'/>
        <View>{teamName}</View>
        <AtTabs current={current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={current} index={0} >
        <DetailPage listData={this.props.eventDetail.event}></DetailPage>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View style='height:100%;'>
            <FormSign teamImg={teamImg} teamName={teamName} raceId={raceId} groupId={groupId}/>
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
         <DetailNews listNews={this.props.eventDetail.eventNews}></DetailNews>
        </AtTabsPane>
      </AtTabs>
      </View>
    )
  }
}

export default Signup as ComponentClass
