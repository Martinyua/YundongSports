import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import IndexService from '../../service/indexService'
import { formatTimeStampToTimeZj } from '../../utils/common'
import './attend.scss'
// import utils from '../../utils/sharePage'
import { AtAvatar, AtModal } from 'taro-ui'
import jiantou from '../../assets/jiantou.png'


interface attendPerson {
  avatarUrl: string,
  nickName: string,
  joinType: string
}
type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {
  isOpened: boolean,
  createTime: string,
  creatorName: string,
  maxPerson: number,
  state: number,
  logoUrl: string,
  raceName: string,
  runningGroupName: string,
  statement: string,
  attendPersons: attendPerson[],
  imgUrl: string,
  deleted:number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Attend {
  props: IProps,
  state: PageState
}

@connect(({ }) => ({

}), () => ({

}))
class Attend extends Component {

  config: Config = {
    navigationBarTitleText: '团报详情'
  }
  constructor(props) {
    super(props)
    this.state = {
      isOpened: false,
      statement: '',
      createTime: '',
      creatorName: '',
      maxPerson: 0,
      state: 0,
      logoUrl: '',
      raceName: '',
      runningGroupName: '',
      attendPersons: [],
      imgUrl: '',
      deleted:1
    }
  }
  IndexService = new IndexService();
  
  insertStr(str1, n, str2){ 
    let s1 = '';
    let s2 = '';
    if(str1.length<n){
        return str1 + str2;
    }else{
        s1 = str1.substring(0, n);
        s2 = str1.substring(n, str1.length);
        return s1 + str2 + s2;
    }
  }
  componentDidShow() {
    //处理二维码参数
    let scene = this.$router.params.scene
    let param = ['']
    let paramOne = ''
    let paramTwo = ''
    if(scene !==undefined ){
      scene = scene.toString()
      param = decodeURIComponent(scene).split('&')
      paramOne = param[0]
      paramTwo = param[1]
      paramOne = paramOne.substring(7)
      paramTwo = paramTwo.substring(15)
      console.log('scene',scene)
      console.log(this.$router.params);
      console.log(paramOne,paramTwo)
      this.$router.params.raceId = paramOne
      this.$router.params.id=paramTwo
    }

    const data = {
      raceId: this.$router.params.raceId || paramOne,
      runningGroupId: this.$router.params.id || paramTwo,
      pageNum: 0,
      pageSize: 1000,
    }
    const data2 = {
      raceId: this.$router.params.raceId || paramOne,
      pageNum: 0,
      pageSize: 1000,
    }
    this.IndexService.groupList(data).then(res => {
      this.setState({
        runningGroupName: res.runningGroupName,
        logoUrl: res.logoUrl,
        raceName: res.raceName,
        createTime: res.createTime,
        creatorName: res.creatorName,
        maxPerson: res.maxPerson,
        state: res.state,
        attendPersons: res.userJoinTypePOS,
        imgUrl: res.imageUrl,
        deleted:res.deleted
      })
    })
    this.IndexService.groupPro(data2).then(res => {
      this.setState({
        statement: res.statements[0].statement,
      })
    })
  }
  toShare() {
    Taro.navigateTo({
      url: `../share/share?raceId=${this.$router.params.raceId}&&id=${this.$router.params.id}`
    })
  }
  //弹出层
  toAttendForm() {
    this.setState({
      isOpened: true
    })
  }
  handleCancel() {
    this.setState({
      isOpened: false
    })
  }
  handleConfirm(raceId: string, id: string, imgUrl: string) {
    if (Taro.getStorageSync('token')) {
      this.setState({
        isOpened: false
      })
      Taro.navigateTo({
        url: `../signup/signup?id=${id}&&raceId=${raceId}&&imgUrl=${imgUrl}`
      })
    } else {
      Taro.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1000
      }).then(() => {
        setTimeout(() => {
          Taro.switchTab({
            url: '../../pages/personal/personal',
          })
        }, 1000);
      })
    }
  }
  //跳转到赛事详情
  toRaceDetail() {
    Taro.navigateBack({
      delta: 1
    })
  }
  //分享
  onShareAppMessage(res) {
    if (res.from === "button") {
      return {
        title: `${this.state.raceName}`,
        path: `/pages/attend/attend?raceId=${this.$router.params.raceId}&&id=${this.$router.params.id}&&imgUrl=${this.state.imgUrl}`,
        imageUrl: ''
      };
    } else {
      return {
        title: `${this.state.raceName}`,
        path: `/pages/attend/attend?raceId=${this.$router.params.raceId}&&id=${this.$router.params.id}&&imgUrl=${this.state.imgUrl}`,
        imageUrl: ''
      };
    }
  }
  render() {
    const { createTime, creatorName, maxPerson, state, raceName, runningGroupName,imgUrl } = this.state

    //console.log('deleted',this.$router.params.deleted)
    return (
      <View>
        <View className='attendTop'>
          <Image className='attendTopImg' src={imgUrl} />
        </View>
        <View className='attendMiddle'>
          <View className='attendView'>赛事&#12288;&#12288;<View className='attendFont'>{raceName}</View></View>
          <View className='attendView'>跑团名称<View className='attendFont'>{runningGroupName}</View></View>
          <View className='attendView'>发起人&#12288;<View className='attendFont'>{creatorName}</View></View>
          <View className='attendView'>状态&#12288;&#12288;<View className='attendFont'>{this.state.deleted === 1 ? "已结束" : "进行中"}</View></View>
          <View className='attendView'>人数限制<View className='attendFont'>{maxPerson==0?'无限制':maxPerson}</View></View>
          <View className='attendView'>发起时间<View className='attendFont'>{formatTimeStampToTimeZj(createTime)} </View></View>
          <View onClick={() => this.toShare()} className='attendView'>分享&#12288;&#12288;<View className='attendFont'>获取小程序码</View><Image className='attendImg' src={jiantou}></Image></View>
          {this.state.attendPersons.map((item) => {
            return (
              <View className='attendViewPerson'>
                <AtAvatar className='attendAvatar' size={"small"} image={item.avatarUrl} circle></AtAvatar>
                <View className='attendName'>{item.nickName}</View>
                <View className='attendType'>{item.joinType}</View>
              </View>
            )
          })}
          <View className='attendEnd'>暂无更多</View>
        </View>
        {
          this.state.deleted === 0 ? (
            <View className='shareButtonView'>
            <Button className='attendButton' onClick={() => this.toAttendForm()}>马上报名</Button>
            <Button className='shareButton' openType='share' >邀请好友</Button>
          </View>
          ) : (
            <View className = 'shareButtonView'>
              <Text className = 'signUpOver'>报名截止</Text>
            </View>
          )
        }

        <AtModal
          isOpened={this.state.isOpened}
          title='声明'
          cancelText='取消'
          confirmText='确认'
          onCancel={() => this.handleCancel()}
          onConfirm={() => this.handleConfirm(this.$router.params.raceId, this.$router.params.id, this.state.imgUrl)}
          content={this.state.statement}
        />
      </View>
    )
  }
}


export default Attend as ComponentClass<PageOwnProps, PageState>
