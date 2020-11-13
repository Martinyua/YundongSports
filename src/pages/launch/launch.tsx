
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import DetailService from '../../service/DetailService'
import './launch.scss'


type PageStateProps = {
}

type PageDispatchProps = {

}

type PageOwnProps = {
  raceId: string
}

type PageState = {
  confirm: string,
  isOk: boolean,
  list: Array<string>
  runningGroupName: string
  runningGroupImg: string
  verify: string
  id: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Launch {
  props: IProps;
}

class Launch extends Component<PageOwnProps, PageState> {

  constructor(props) {
    super(props)
    this.state = {
      confirm: '',
      isOk: false,
      list: [],
      runningGroupName: '',
      runningGroupImg: '',
      verify: '',
      id: ""
    }
  }
  DetailService = new DetailService()
  onChange(value: any) {
    this.setState({
      confirm: value
    })
  }
  onActionClick() {
    const verify = this.state.confirm
    const data = { verificationCode: verify }
    this.DetailService.verify(data).then(res => {
      console.log(res)
      if (!res.verificationCode) {
        Taro.showModal({
          title: '验证失败',
        })
        this.setState({
          isOk: false
        })
      } else {
        Taro.showModal({
          title: '验证成功',
          showCancel:false,
          confirmColor:'#67c241'
        })
        this.setState({
          isOk: true,
          runningGroupName: res.runningGroupName,
          runningGroupImg: res.logoUrl,
          verify: res.verificationCode,
          id: res.runningGroupId
        })
      }
    })
    this.setState({
      isOk: false
    })
  }
  onButtonClick() {
    const raceId = this.props.raceId
    const verificationCode = this.state.verify
    const runningGroupId = this.state.id
    const data = { raceId: raceId, verificationCode: verificationCode, runningGroupId: runningGroupId }
    this.DetailService.createTeam(data).then(() => {
      Taro.showModal({
        title: '创建成功',
        showCancel:false,
        confirmColor:'#67c241',
        success:()=>{
          this.setState({
            isOk:false
          })
        }
      })
    })
  }
  calling() {
    Taro.makePhoneCall({
      phoneNumber: '19942330710', //仅为示例，并非真实的电话号码
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  }
  toEventDetail() {
    Taro.switchTab({
      url: '../../pages/personal/personal',
    })
  }

  render() {
    return (
      <View>
        <AtSearchBar
          showActionButton
          actionName='验证'
          placeholder='请输入团报渠道码'
          value={this.state.confirm}
          onChange={this.onChange.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
        />
        <View className="create_launch">
          {this.state.isOk == true
            ? <View >
              <View className="cl">
                <Image className="teamlist_image" src={this.state.runningGroupImg}></Image>
                <View className="teamlist_text">跑团名称：{this.state.runningGroupName}</View>
              </View>
              <Button className="create_launch_button" onClick={this.onButtonClick.bind(this)}>创建团报</Button>
            </View>
            : <View>
              <View className='launch_detail'>
                <View className="launch_detail_text">
                  <View>
                    团报渠道码是专门为跑团分配的报名识别码，如果你是跑团团长，可以联系我们获取团报渠道码，组团报名享受更多优惠和便利。
            点击拨打：<Text className="launch_detail_text_text" onClick={this.calling.bind(this)}>联系小云</Text><Text onClick={this.calling.bind(this)}>联系小动</Text>
                  </View>
                </View>
                <View onClick={this.toEventDetail.bind(this)} className="launch_detail_nav">还没跑团？点击前往创建跑团</View>
              </View>
              <View style='color:white;' className="create_launch_Text">
                <Text>创建团报</Text>
              </View>
            </View>
          }
        </View>
      </View>
    )
  }
}


export default Launch 
