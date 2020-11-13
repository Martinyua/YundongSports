/*
 * @Author: Martin
 * @Date: 2020-05-11 10:56:06
 * @LastEditTime: 2020-06-05 10:28:47
 * @FilePath: \YundongSports\src\utils\countDown.jsx
 */
import Taro, { Component } from '@tarojs/taro'
import { View  } from '@tarojs/components'

//容器组件，负责逻辑
export default class CountdownComponent extends Component {
   constructor(props) {
		super(props);
		this.state = { 
				countdownShow: 1 ,
		};
		}

   //在组件即将进入的时候开启周期性计时器
   componentDidMount() {
      //将订单创建时间加30分钟倒计时
      const date = new Date(this.props.createTime);
      date.setMinutes(date.getMinutes()+30)
      // date.setSeconds(date.getSeconds()+20)
      const Y = date.getFullYear() + '/';
      const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
      const D = date.getDate() + ' ';
      const h = date.getHours() + ':';
      const m = date.getMinutes() + ':';
      const s = date.getSeconds(); 
      const endTime = Y+M+D+h+m+s;
			console.log(endTime)
			
			this.time = {//都转成毫秒数
				endTime: Date.parse(endTime),
				myCorrNowTime: Date.parse(this.props.myCorrNowTime) || Date.parse(new Date()),//传入了时间，就是传入的客户端时间，否则就是自己的时间
			}

      this.time.hasPassTime = 0;//已经走过的时间，初始0
			//时间差值。只在最开始的构造函数中执行计算一次，算出本地与传入的时间差值，进行误差的回复
      this._xTime = Date.parse(new Date()) - this.time.myCorrNowTime;
      this.countdownTotalTime = this.time.endTime - this.time.myCorrNowTime;
      this.timerId = 0;//计数器序号
      this.isTimeOut = this.isTimeOut.bind(this);
      this.timerId = setInterval(() => {
         this.tick();
      }, 1000)
   }

   //在组件卸载时，删除计时器
   componentWillUnmount() {
      clearInterval(this.timerId);
   }

   tick() {
      //判断是否倒计时结束
      const flag = this.isTimeOut();
      if(flag){
        return
      }
      this.time.hasPassTime = Date.parse(new Date()) - this.time.myCorrNowTime - this._xTime;
      this.setState({
         countdownShow: this.time.endTime - this.time.myCorrNowTime - this.time.hasPassTime
      });

   }

   //判断是否时间到了，则   停止周期性计时器 && 执行传入的timeoutFn()
   isTimeOut = ()=> {
      if (this.state.countdownShow <= 0) {
         clearInterval(this.timerId);
         this.props.onTimeoutFn && this.props.onTimeoutFn();
         return true;
      }
   }

   //格式化日期
   dateFormat(arg) {
      arg = parseInt(arg, 10);//下取整
      return (arg < 10 ? "0" + arg : arg);//转格式
   }

   render() {
      const totalSecond = parseInt(this.state.countdownShow / 1000, 10);
      // const d = this.dateFormat(totalSecond / 60 / 60 / 24);
      // const h = this.dateFormat(totalSecond / 60 / 60 % 24);
      const m = this.dateFormat(totalSecond / 60 % 60);
      const s = this.dateFormat(totalSecond % 60);

			const countdownTime =  `${m}:${s}`;
			

      return (
			<Text>
          <Text style={{ color: "#bb4234" }}>(⏰{countdownTime})</Text>
         </Text>
      )
   }
}