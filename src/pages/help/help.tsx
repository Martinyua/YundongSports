import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtAccordion, AtList, AtListItem } from 'taro-ui'



import './help.scss'

type PageStateProps = {
  
}

type PageDispatchProps = {
  
}

type PageOwnProps = {}

type PageState = {
  openOne:boolean
  openTwo:boolean
  openThree:boolean
  openFour:boolean
  openFive:boolean

}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Help {
  props: IProps;
  state: PageState;
}

@connect(({  }) => ({
  
}), () => ({
  
}))
class Help extends Component {

   
    config: Config = {
    navigationBarTitleText: '帮助中心'
  }
  constructor(props){
    super(props)
    this.state = {
      openOne:false,
      openTwo:false,
      openThree:false,
      openFour:false,
      openFive:false
    }
  }
  handleClickOne (value) {
    this.setState({
      openOne: value,
      openTwo:false,
      openThree:false,
      openFour:false,
      openFive:false
    })
  }
  handleClickTwo (value) {
    this.setState({
      openOne: false,
      openTwo:value,
      openThree:false,
      openFour:false,
      openFive:false
    })
  }
  handleClickThree (value) {
    this.setState({
      openOne: false,
      openTwo:false,
      openThree:value,
      openFour:false,
      openFive:false
    })
  }
  handleClickFour (value) {
    this.setState({
      openOne: false,
      openTwo:false,
      openThree:false,
      openFour:value,
      openFive:false
    })
  }
  handleClickFive (value) {
    this.setState({
      openOne: false,
      openTwo:false,
      openThree:false,
      openFour:false,
      openFive:value
    })
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='help'>
        <AtAccordion
        open={this.state.openOne}
        onClick={this.handleClickOne.bind(this)}
        title='跑团相关'
        icon={{ value: 'list', color: 'deepskyblue', size: '15' }}
        >
          <AtList hasBorder={false}>
              <AtListItem
                title='如何注册跑团'
                className = 'atListItem'
             />
              <View className = 'helpHide'>
                进入小程序选择『我的-创建跑团』
              </View>
          </AtList>
        </AtAccordion>


        <AtAccordion
        open={this.state.openTwo}
        onClick={this.handleClickTwo.bind(this)}
        title='关于跑团'
        icon={{ value: 'list', color: 'deepskyblue', size: '15' }}
        >
          <AtList hasBorder={false}>
              <AtListItem
                title='如何申报跑团'
                className = 'atListItem'
              />
              <View className = 'helpHide'>
                请事先在小程序上创建好跑团，然后进入对应赛事，点击『发起团报』标签，再与我们的客服取得联系，客服会审核并且通过您的团报申请
              </View>
          </AtList>
        </AtAccordion>


        <AtAccordion
        open={this.state.openThree}
        onClick={this.handleClickThree.bind(this)}
        title='集成小程序'
        icon={{ value: 'list', color: 'deepskyblue', size: '15' }}
        >
          <AtList hasBorder={false}>
              <AtListItem
                title='为公众号号关联'
                className = 'atListItem'
              />
              <View className = 'helpHide'>
                跑团公众账号小程序，使得公众账号也成为了小程序的一个入口。
                进入微信公众账号管理后台,选择小程序-小程序管理菜单。然后点击添加选择
                关联小程序 。扫码验证后，输入小程序的APPID即可。
              APPID:wxe0965c7f12b8cfd5
              </View>
              <AtListItem
                title='在公众号推文中加入团报小程序'
                className = 'atListItem'
              />
              <View className = 'helpHide'>
                <View>
                  1.通过上方所描述的步骤，为跑团公众号关联了小程序。
                </View>
                <View>
                2.已经成功创建了团报。
                </View>
                <View>
                3.进入跑团专属团报页，点击『获取小程序码，小程序卡片』菜单，打开的页面中有详细说明。
                </View>
              </View>
          </AtList>
        </AtAccordion>


        <AtAccordion
        open={this.state.openFour}
        onClick={this.handleClickFour.bind(this)}
        title='其他'
        icon={{ value: 'list', color: 'deepskyblue', size: '15' }}
        >
          <AtList hasBorder={false}>
              <AtListItem
                title='获得更多福利'
                className = 'atListItem'
              />
              <View className = 'helpHide'>
                <View>
                  1.关注公众微信号:云动重庆
                </View>
                <View>
                  2.与我们取得联系:19942330710
                </View>
              </View>
          </AtList>
        </AtAccordion>


        <AtAccordion
        open={this.state.openFive}
        onClick={this.handleClickFive.bind(this)}
        title='联系我们'
        icon={{ value: 'list', color: 'deepskyblue', size: '15' }}
        >
             <AtListItem
                title='赛事单位'
                className = 'atListItem'
              />
              <View className = 'helpHide'>
                <View>
                  1.商务邮箱:yzj@mcloudsports.com
                </View>
                <View>
                  2.商务电话:15828086669
                </View>
              </View>
              <AtListItem
                title='加入我们'
                className = 'atListItem'
              />
              <View className = 'helpHide'>
                <View>
                  发送邮件至:yzj@mcloudsports.com ,邮箱邮件标注【求职+姓名】
                </View>
              </View>
        </AtAccordion>

      </View>
    )
  }
}


export default Help as ComponentClass<PageOwnProps, PageState>
