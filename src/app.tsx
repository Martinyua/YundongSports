import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.scss'
import './custom-variables.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/service/service',
      'pages/attend/attend',
      'pages/share/share',
      'pages/detail/detail',
      'pages/signup/signup',
      'pages/personal/personal',
      'pages/establish/establish',
      'pages/help/help',
      'pages/orderForm/orderForm',
      'pages/team/team',
      'pages/teamMembers/teamMembers',
      'pages/editTeam/editTeam',
      'pages/orderFormetail/orderFormetail',
      'pages/rankingList/rankingList',
      'pages/articl/articl'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#33333",
      selectedColor: "#0cadfb",
      backgroundColor: "#fff",
      borderStyle: "black",
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页",
          iconPath: "./assets/index.png",
          selectedIconPath: "./assets/sele_index.png"
        },
        {
          pagePath: "pages/personal/personal",
          text: "我的",
          iconPath: "./assets/personal.png",
          selectedIconPath: "./assets/sele_personal.png"
        },
        {
          pagePath: "pages/service/service",
          text: "客服",
          iconPath: "./assets/service.png",
          selectedIconPath: "./assets/sele_service.png"
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
