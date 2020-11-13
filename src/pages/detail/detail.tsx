import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import './detail.scss'
import { AtTabs, AtTabsPane} from 'taro-ui'
import Search from '../Search/Search'
import DetailPage from '../../components/detailPage/detailPage'
import DetailNews from '../../components/detailNews/detailNews'
import Launch from '../../pages/launch/launch'
import { connect } from '@tarojs/redux'
import EventDetailController from '../../controller/EventDetailController'


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
        nowPerson:string
        score:string
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
  getTeam(pageNum:number,pageSize:number,raceId:string)
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
  list:Array<
  {any}>,
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
  }>
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Detail {
  props: IProps;
}
const eventDetailController = new EventDetailController();

@connect(({ eventDetail }) => ({
  eventDetail
}), (dispatch) => ({
  getEventList:(that,raceId:string)=>{
    dispatch(eventDetailController.getEvent(that,raceId))
  },
  getTeam(pageNum:number,pageSize:number,raceId:string){
    dispatch(eventDetailController.getTeam(pageNum,pageSize,raceId))
  },
  getEventNews(pageNum:number,pageSize:number,raceId:string){
    dispatch(eventDetailController.getNews(pageNum,pageSize,raceId))
  }
}))

class Detail extends Component<IProps,PageState> {
  constructor (props) {
    super(props)
    this.state={
      img:'',
      keywords:'',
      current: 0,
      value:'',
      tabList:[{ title: '赛事介绍' }, { title: '参加团报' }, { title: '相关资讯' },{ title: '发起团报' }],
      list:[],
      raceId:'',
      pageSize:1000,
      pageNum:1,
      listData:[],
      listNews:[]
    }
  }
    config: Config = {
    navigationBarTitleText:'赛事详情'
  }
  componentWillMount(){
    const {id}=this.$router.params
    const{pageNum,pageSize}=this.state
    this.props.getEventList(this,id)
    this.props.getTeam(pageNum,pageSize,id)
    this.props.getEventNews(pageNum,pageSize,id)
    this.setState({
      raceId:id
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
    const {current,tabList,raceId}=this.state
    const {imageUrl,deleted} = this.$router.params
    return (
      <View className='detail' style='text-align: center;'>
        <Image
          style='width: 95%;height: 150px;background: #fff'
          src={imageUrl}
        />
        <AtTabs current={current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={current} index={0} >
        <DetailPage listData={this.props.eventDetail.event}></DetailPage>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View style='height:100%;'>
              <Search raceId={raceId} list={this.props.eventDetail.eventTeam} imgUrl = {this.$router.params.imageUrl} deleted = {deleted}/>
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <DetailNews listNews={this.props.eventDetail.eventNews}></DetailNews>
        </AtTabsPane>
        <AtTabsPane current={current} index={3}>
          <View style='height:100%;'>
            <Launch raceId={raceId}/>
          </View>
        </AtTabsPane>
      </AtTabs>
      </View>
    )
  }
}


export default Detail as ComponentClass
