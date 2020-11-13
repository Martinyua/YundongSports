import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import IndexService from '../../service/indexService'
import { AtSearchBar } from 'taro-ui'
import { formatTimeStampToTime } from '../../utils/common'
import './index.scss'



interface events {
  raceName: string,
  raceTime: string,
  imageUrl: string,
  id: number,
  deleted: number,
}


type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {
  value: string,
  events: events[],
  pageNum: number,
  count: number,
  raceList: object[],
  flag: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps,
  state: PageState
}

@connect(({ }) => ({

}), () => ({

}))
class Index extends Component {


  config: Config = {
    navigationBarTitleText: '赛事',
    enablePullDownRefresh: true,
    onReachBottomDistance: 0,
  }
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      events: [],
      pageNum: 1,
      count: 0,
      raceList: [],
      flag: true,
    }
  }
  //下拉刷新
  IndexService = new IndexService();
  onPullDownRefresh() {
    Taro.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    const data = {
      pageNum: 1,
      pageSize: 6,
    }
    this.IndexService.raceList(data).then((res) => {
      this.setState({
        events: res,
        pageNum: 2,
        flag: true
      })
    })
    setTimeout(
      () => Taro.stopPullDownRefresh(),
      1000
    )
  }
  //上拉加载
  onReachBottom() {
    const data = {
      pageNum: this.state.pageNum,
      pageSize: 6,
    }
    const { pageNum, events, flag } = this.state
    if (flag === true) {
      this.IndexService.raceList(data).then((res) => {
        if(res.length==0){
          Taro.showToast({
            title: '暂无更多',
            duration: 1000,
            icon:'none'
          })
        }
        const arr = events.concat(res)
        this.setState({
          events: arr,
          pageNum: pageNum + 1
        })
      })
    }
  }
  //赛事列表接口调用
  componentDidMount() {
    const data = {
      pageNum: this.state.pageNum,
      pageSize: 6,
    }
    // this.IndexService.listCount().then((res) => {
    //   this.setState({
    //     count: res.count,
    //     pageNum: this.state.pageNum+1
    //   })
    // })
    this.IndexService.raceList(data).then((res) => {
      this.setState({
        events: res,
        pageNum: this.state.pageNum + 1
      })
    })
  }
  //搜索
  onChange(value) {
    this.setState({
      value: value
    })
  }
  onActionClick() {
    console.log('开始搜索')
    const data = {
      pageNum: 1,
      pageSize: 9999,
    }
    this.IndexService.raceList(data).then((res) => {
      const { raceList, value } = this.state;
      res.forEach((item) => {
        if (item.raceName.indexOf(value) >= 0) {
          raceList.push(item)
        }
      });
      this.setState({
        events: raceList,
        raceList: [],
        flag: false
      })
    })
  }
  //分享
  onShareAppMessage(res) {
      return {
        title: "云动重庆首页分享",
        path: `/pages/index/index`,
        imageUrl: ''
      };
  }
  toEventDetail(id,imageUrl,deleted) {
    Taro.navigateTo({
      url: `../detail/detail?id=${id}&imageUrl=${imageUrl}&deleted=${deleted}`
    })
  }
  render() {
    return (
      <View className='index'>
        <View className='searchBar'>
          <AtSearchBar
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
          />
        </View>
        <View className='raceList'>
          {this.state.events.length==0?<View style={{color:'grey',textAlign:'center',marginTop:'100px'}}>还没有比赛发布!</View>:this.state.events.map((item) => {
            return (
              <View key={item.id} className='eventWrap' onClick={() => this.toEventDetail(item.id,item.imageUrl,item.deleted)}>
                {item.deleted===1?
                  <View className='eventTag'>
                    <View className='eventText'>已截止</View>
                  </View>:<View></View>
                }
                <Image className='eventImg' src={item.imageUrl} />
                <View className='eventTextWrap'>
                  <View>{item.raceName}</View>
                  <View>{formatTimeStampToTime(item.raceTime)}</View>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>
