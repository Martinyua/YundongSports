import { ComponentClass } from 'react'
import Taro,{Component,Config} from '@tarojs/taro';
import {View,Image, Button} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import { AtList, AtListItem } from "taro-ui"
// import UserController from '../../controller/UserController'
import UserService from '../../service/UserService';
import form from '../../assets/form.png'
import establish from '../../assets/establish.png'
import team from '../../assets/team.png'
import help from '../../assets/help.png'
import empty from '../../assets/empty.png'


import './personal.scss'

// const  userController = new UserController();

type PageStateProps = {
  
}

type PageDispatchProps = {
  
}

type PageOwnProps = {}

type PageState = {
  avatar:string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Personal {
  props: IProps;
  state:PageState
}

@connect(({  }) => ({
  
}), () => ({
  
}))
class Personal extends Component {

  config: Config = {
  navigationBarTitleText: '个人中心'
  }

  constructor(props){
    super(props)
    const {avatarUrl} = Taro.getStorageSync('userInfo')
    this.state = {
      avatar:avatarUrl||undefined
    }
  }

  userService = new UserService();
  
  goToOrder(){
    Taro.navigateTo({url:'/pages/orderForm/orderForm'})
  }
  goEstablish(){
    Taro.navigateTo({url:'/pages/establish/establish'})
  }
  goToHelp(){
    Taro.navigateTo({url:'/pages/help/help'})
  }
  goToTeam(){
    Taro.navigateTo({url:'/pages/team/team'})
  }
  // login(){
  //   userController.login()
  //   console.log('click')
  // }

  //清空缓存操作
  onRemoveStorage = () =>{
    Taro.showModal({
      title:'确定清空缓存操作',
      content:'清空缓存后需要重新进入并登录，您确认要清空缓存吗',
      confirmColor:'#67c241'
    }).then(res =>{
      // res.confirm ? (Taro.removeStorageSync('userInfo') ): console.log('用户取消')
      if(res.confirm){
        Taro.removeStorageSync('userInfo')
        Taro.removeStorageSync('token')
        Taro.clearStorage() 
      }else{
        console.log('用户取消')
      }
    }
      )
  }
  //获取用户授权
  onGetUserInfo(res){
    if (res.detail.errMsg !== 'getUserInfo:ok') {
      Taro.showModal({
        title:'⚠️警告⚠️',
        content: '如果不授权获取用户信息, 将无法正常使用该小程序!',
        showCancel:false,
        confirmText:'返回授权',
        confirmColor:'#67c241'
      });
    } else {      
      this.login()
    }
    }

  login(){
    Taro.getSetting({ //获取用户权限设置
        success:res =>{
            if (!res.authSetting['scope.userInfo']) {
                console.log('未授权')
              } else{
                Taro.login({
                  success:res =>{
                    if(res.code){
                      Taro.getUserInfo({
                        success:res2 =>{
                          const {avatarUrl,gender,nickName,city,country,province} = res2.userInfo
                          const param = {
                            avatarUrl,
                            gender,
                            nickName,
                            encryptedData: res2.encryptedData,
                            iv:res2.iv,
                            userCity:city,
                            userProvince: province,
                            userCountry:country,
                            js_code:res.code
                          }
                          this.userService.login(param).then((userRes) =>{
                            console.log('userRes',userRes)
                            const {token,avatarUrl,nickName,coinNum,gender,medal,phoneNum} = userRes;
                            const userInfo = {
                              avatarUrl,
                              nickName,
                              coinNum,
                              gender,
                              medal,
                              phoneNum
                            }
                            Taro.setStorageSync('token',token);
                            Taro.setStorageSync('userInfo',userInfo);
                            console.log('logintrue')
                            this.setState({
                              avatar:avatarUrl
                            })
                          }).finally(() => Taro.hideLoading());
                        }
                      })

                    }
                  }
                })
              }
        }
    })
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  render () {
    const {avatar} = this.state
    return (
      <View className='personal'>
        <View className = 'avatar-boder' >
          {avatar ? (
            <Image src = {avatar} className = 'avatar' onClick = {this.login.bind(this)}></Image>
          ) : (
            <Button className ='loginBtn' openType='getUserInfo' onGetUserInfo={this.onGetUserInfo.bind(this)} >点 击 登 录</Button>
          )}
            
        </View>
        
        <AtList className = 'atList'>
            <AtListItem title='订单中心' arrow='right'  thumb={form} hasBorder={false} className='form' onClick={this.goToOrder.bind(this)} />
            <AtListItem title='创建跑团' arrow='right'  thumb={establish} hasBorder={false} className='establish' onClick={this.goEstablish.bind(this)}/>
            <AtListItem title='已加入跑团' arrow='right'  thumb={team} hasBorder={false} className='team' onClick={this.goToTeam.bind(this)}/>
            <AtListItem title='帮助中心' arrow='right'  thumb={help} hasBorder={false} className='help' onClick={this.goToHelp.bind(this)}/>
            <AtListItem title='清空缓存' arrow='right'  thumb={empty} hasBorder={false} className='empty' onClick={this.onRemoveStorage.bind(this)}/>
        </AtList>   
      </View>
    )
  }
}


export default Personal as ComponentClass<PageOwnProps, PageState>