import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtList, AtListItem, AtInput, AtForm, AtButton } from 'taro-ui'
import DetailService from '../../service/DetailService'
import OrderController from '../../controller/OrderController'
import { connect } from '@tarojs/redux'
import OrderService from '../../service/OrderService'
import { formatTimeStampToTimeZj } from '../../utils/common'

import './orderFormetail.scss'

type PageStateProps = {
  eventDetail: {
    eventTeam: Array<
      {
        createTime: string,
        groupName: string,
        id: string,
        maxPerson: string,
        logoUrl: string
      }
    >
  }
  order:{
    orderDetail:{}
  }
}
//成人表
const datalist = [
  { title: "姓名：", fieldEnName: 'name' },
  { title: "手机号码：", fieldEnName: 'mobile' },
  { title: "证件号码：", fieldEnName: 'idCardNumber' },
  { title: "年龄：", fieldEnName: 'age' },
  { title: "性别：", fieldEnName: 'sex' },
  { title: "出生日期：", fieldEnName: 'birthday' },
  { title: "联系省市县：", fieldEnName: 'contactRegion' },
  { title: "联系地区：", fieldEnName: 'region' },
  { title: "邮箱：", fieldEnName: 'email' },
  { title: "尺码：", fieldEnName: 'clothSize' },
  { title: "血型：", fieldEnName: 'bloodType' },
  { title: "紧急联系人姓名：", fieldEnName: 'emergencyContact' },
  { title: "紧急联系人电话：", fieldEnName: 'emergencyContactMobile' }
]
//亲自表
const chdata = [
  { title: "成年人姓名：", fieldEnName: 'name' },
  { title: "成年人手机号码：", fieldEnName: 'mobile' },
  { title: "成年人证件号码：", fieldEnName: 'idCardNumber' },
  { title: "成年人年龄：", fieldEnName: 'age' },
  { title: "成年人性别：", fieldEnName: 'sex' },
  { title: "成年人出生日期：", fieldEnName: 'birthday' },
  { title: "成年人联系省市县：", fieldEnName: 'contactRegion' },
  { title: "成年人联系地区：", fieldEnName: 'region' },
  { title: "成年人邮箱：", fieldEnName: 'email' },
  { title: "成年人尺码：", fieldEnName: 'clothSize' },
  { title: "成年人血型：", fieldEnName: 'bloodType' },
  { title: "成年人紧急联系人姓名：", fieldEnName: 'emergencyContact' },
  { title: "成年人紧急联系人电话：", fieldEnName: 'emergencyContactMobile' },
  { title: "儿童姓名：", fieldEnName: 'childName' },
  { title: "儿童性别：", fieldEnName: 'childSex' },
  { title: "儿童出生日期：", fieldEnName: 'childBirthday' },
  { title: "儿童身份证号码：", fieldEnName: 'childIdCardNumber' },
  { title: "儿童服装尺码：", fieldEnName: 'childClothSize' },
  { title: "儿童血型：", fieldEnName: 'childBloodType' },
]


type PageDispatchProps = {
  getOrderDetail:(param) => void
}

type PageOwnProps = {}

type PageState = {
  current: number
  Isok: false
  [value: string]: any
  orderType: string,
}
type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Orderformetail {
  props: IProps;
  state: PageState
}

const orderController = new OrderController()
@connect(({ order }) => ({
  order
}), (dispatch) => ({
  getOrderDetail(param){
    dispatch(orderController.getOrderDetail(param))
  }
}))
class Orderformetail extends Component {

  config: Config = {
    navigationBarTitleText: '订单详情'
  }
  constructor(props) {
    super(props)
    this.state = {
      obj:{},
      current: 0,
      Isok: false,
      orderType: "2",
    }
  }
  DetailService = new DetailService()
  OrderService=new OrderService()

  componentDidMount() {
    console.log(this.$router.params.isAdult);
    const {  raceId ,isAdult,totalFee,outTradeNo,runningGroupId,orderType } = this.$router.params
    const param = {
      orderNum :outTradeNo,
      isAdult
    }
    const total = Number(totalFee)*100 //转化为number型
    const data = {
      totalFee : total,
      outTradeNo,
      runningGroupId
    }
    console.log("isAdult",this.$router.params.isAdult)
    //获取订单详情数据存在redux
    //this.props.getOrderDetail(param)
    this.OrderService.getOrderDetail(param).then(res=>{
      console.log(res);
      this.setState({
        updatetime:res.updateTime,
        orderId:res.orderId
      })
      const form=this.$router.params.isAdult === '0' ? chdata : datalist
    form.map(item=>{
      this.state[`${item.fieldEnName}`]=res[`${item.fieldEnName}`]
    })
    })
    
    //获取支付相关参数
    const isDoPayOrder = (orderType)=>{
      if(orderType === '2'){
        this.DetailService.payOrder(data).then((res) =>{
          this.setState({
            dataPay:res.order
          })
          console.log('isDo')
        })
      }else{
        console.log('notDo')
        return
      }
    }
    isDoPayOrder(orderType);
    this.setState({
      orderType:this.$router.params.orderType
    })
    //获取团队头像和名称
    this.DetailService.getTeamDetail(runningGroupId).then((res) => {
      this.setState({
        teamImage: res.logoUrl,
        teamName: res.groupName
      })
    })
    this.setState({
      raceId:raceId
    })
  }
  
  handleClick(value) {
    this.setState({
      current: value
    })
  }
  //修改监控
  handleChange(value, e) {
    let inputName = e.target.id
    this.setState({
      [inputName]: e.detail.value
    })
    return inputName
  }
  //编辑
  handleEdit(e) {
    this.setState({
      Isok: true
    })
  }
  //保存
  handleCanle(e) {
    const form=this.$router.params.isAdult === '0' ? chdata : datalist
    form.map(item=>{
      this.state.obj[`${item.fieldEnName}`]=this.state[`${item.fieldEnName}`]
    })
    const orderId = 'orderId'
    this.state.obj[orderId] = this.state.orderId
    const dataEdit={signUpValue:this.state.obj}
    if (this.$router.params.isAdult === '0') {
      if(this.editFormCheck()===1){
      this.DetailService.editChild(dataEdit).then(res =>{
        if(res === true){
          Taro.showToast({
            title:'修改成功',
            icon:'none',
            duration:1200
          })
        }else{
          Taro.showToast({
            title:'修改失败',
            icon:'none',
            duration:1200
          })
        }
        this.setState({
          Isok: false
        })
      })
    }else{
      console.log('error');
    }
    } else {
      if(this.editFormCheck()===1){
        this.DetailService.editAdult(dataEdit).then(res =>{
          if(res === true){
            Taro.showToast({
              title:'修改成功',
              icon:'none',
              duration:1200
            })
          }else{
            Taro.showToast({
              title:'修改失败',
              icon:'none',
              duration:1200
            })
          }
        })
        this.setState({
          Isok: false
        })
      }else{
        console.log('error');
      }
    }
  }

  async handlePay() {
    let { dataPay, data } = this.state
    let {
      timeStamp,
      nonceStr,
      signType,
      sign,
      appid
    } = dataPay
    // 唤起支付，按小程序要求格式发送参数
    const prepay_id = dataPay.package.substring(10)
    let payData = await Taro.requestPayment({
      timeStamp,
      nonceStr,
      package: "prepay_id=" + prepay_id,
      signType: 'MD5',
      paySign: sign
    })
    if (payData && payData.errMsg === 'requestPayment:ok') {
      Taro.showModal({
        title: '操作提示',
        content: '支付成功',
        showCancel: false,
        confirmText: '确定',
        success: () => {
          this.setState({
            orderType: '1'
          })
        }
      })
    } else {
      Taro.showModal({
        title: '操作提示',
        content: '支付失败，请重新尝试',
        showCancel: false,
        confirmText: '确定',
        success: () => {
          this.setState({
            orderType: '2'
          })
        }
      })
    }
  }
  onClick(id){
    Taro.navigateTo({
      url: `../attend/attend?id=${this.$router.params.runningGroupId}&&raceId=${this.$router.params.raceId}`
    })
  }
  editFormCheck(){
    const { bloodType, birthday, sex, clothSize, region, name, mobile, emergencyContactMobile, emergencyContact, idCardNumber, age, contactRegion, email, childBloodType, childBirthday, childSex, childClothSize, childIdCardNumber, childName } = this.state
    const regName = new RegExp("^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$");
    const regmobile = new RegExp("^1[3|4|5|7|8][0-9]{9}$");
    const regidCardNumber = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (this.$router.params.isAdult==='1'?
    (!bloodType || !birthday || !sex || !clothSize  || !region || !name || !mobile || !idCardNumber || !contactRegion || !email || !contactRegion || !emergencyContact || !emergencyContactMobile || !age):
    (!bloodType || !birthday || !sex || !clothSize  || !region || !name || !mobile || !idCardNumber || !contactRegion || !email || !contactRegion || !emergencyContact || !emergencyContactMobile || !age || !childBirthday || !childBloodType || !childClothSize || !childSex || !childIdCardNumber || !childName)) {
      this.showError('表单内所有内容均需填写，请填写完整信息')
    }else if (this.$router.params.isAdult==='1'?!regName.test(name && emergencyContact):!regName.test(childName)) {
      this.showError('请输入正确姓名')
    } else if (!regmobile.test(mobile && emergencyContactMobile)) {
      this.showError('请输入正确电话')
    } else if (!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email))) {
      this.showError('请输入正确邮箱')
    } else if (this.$router.params.isAdult==='1'?!regidCardNumber.test(idCardNumber):!regidCardNumber.test(childIdCardNumber)) {
      this.showError('请输入正确身份证')
    }else{
      return 1
    }
  }
  showError = (err) => {
    Taro.showModal({
      title: '提示',
      content: err,
      showCancel: false,
      confirmColor: '#67c241'
    })
    return 0;
  }
  render() {
    const { teamImage, teamName } = this.state
    const tabList = [{ title: '订单信息' }, { title: '报名表' }]
    const jsonAdult = JSON.stringify(datalist)
    const jsonChild = JSON.stringify(chdata)
    const adult = JSON.parse(jsonAdult)
    const child = JSON.parse(jsonChild)
    const form=this.$router.params.isAdult === '0' ? child : adult
    return (
      <View className='orderFormetail'>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <AtList>
              <AtListItem className="code" title='订单编号：' note={this.$router.params ? this.$router.params.outTradeNo:''} />
              <AtListItem title='订单状态：' note={this.state.orderType=='2'?'等待支付':(this.state.orderType=='1'?'已支付':'已取消')} />
              <AtListItem className="code" title='下单时间：' note={formatTimeStampToTimeZj(this.state.updatetime)} />
              <AtListItem title='订单来源：' extraThumb='' note={`${teamName}`} arrow='right' onClick={this.onClick.bind(this)}/>
              <AtListItem title={this.$router.params.isAdult === '0' ? '亲子组' : '成人组'} note={this.$router.params?this.$router.params.totalFee:''} />
              <AtListItem title='合计(元)' note={this.$router.params?this.$router.params.totalFee:''} className='pay' />
              {
                this.state.orderType == '2' ?
                <AtButton onClick={this.handlePay.bind(this)} className="at_button">确认支付</AtButton> :
                null
              }
            </AtList>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View>
              <AtForm
              >
                <View>
                  {form.map(item => {
                    return <View>
                      <AtInput
                        editable={this.state.Isok}
                        name={item.fieldEnName}
                        title={item.title}
                        type='text'
                        value={this.state[`${item.fieldEnName}`]}
                        onChange={this.handleChange.bind(this)}
                        className="at_input"
                      />
                    </View>
                  })}
                </View>
                  {this.state.orderType == '2' ? 
                  <AtButton onClick={this.handlePay.bind(this)} className="at_button">确认支付</AtButton> : 
                  this.state.orderType == '1' ?
                  (this.state.Isok == false ? <AtButton onClick={this.handleEdit.bind(this)} >修改</AtButton>
                  : <AtButton onClick={this.handleCanle.bind(this)}>保存</AtButton>)
                  : null }
                  
              </AtForm>
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

export default Orderformetail as ComponentClass<PageOwnProps, PageState>
