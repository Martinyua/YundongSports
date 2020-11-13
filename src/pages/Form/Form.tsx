
import Taro, { Component } from '@tarojs/taro'
import { Picker, View, Label, Radio, RadioGroup, Text } from '@tarojs/components'
import { AtRadio, AtForm, AtInput, AtButton } from 'taro-ui'
import TaroRegionPicker from '../../components/taro-region-picker'
import DetailService from '../../service/DetailService'
import './Form.scss'

const adultForm=[
  {
    fieldEnName:'name'
  },
  {
    fieldEnName:'mobile'
  },
  {
    fieldEnName:'idCardType'
  },
  {
    fieldEnName:'idCardNumber'
  },
  {
    fieldEnName:'age'
  },
  {
    fieldEnName:'sex'
  },
  {
    fieldEnName:'birthday'
  },
  {
    fieldEnName:'region'
  },
  {
    fieldEnName:'contactRegion'
  },
  {
    fieldEnName:'email'
  },
  {
    fieldEnName:'clothSize'
  },
  {
    fieldEnName:'bloodType'
  },
  {
    fieldEnName:'emergencyContact'
  },
  {
    fieldEnName:'emergencyContactMobile'
  },
]
const childForm=[
  {
    fieldEnName:'name'
  },
  {
    fieldEnName:'mobile'
  },
  {
    fieldEnName:'idCardType'
  },
  {
    fieldEnName:'idCardNumber'
  },
  {
    fieldEnName:'age'
  },
  {
    fieldEnName:'sex'
  },
  {
    fieldEnName:'birthday'
  },
  {
    fieldEnName:'region'
  },
  {
    fieldEnName:'contactRegion'
  },
  {
    fieldEnName:'email'
  },
  {
    fieldEnName:'clothSize'
  },
  {
    fieldEnName:'bloodType'
  },
  {
    fieldEnName:'emergencyContact'
  },
  {
    fieldEnName:'emergencyContactMobile'
  },
  {
    fieldEnName:'childName'
  },
  {
    fieldEnName:'childBirthday'
  },
  {
    fieldEnName:'childSex'
  },
  {
    fieldEnName:'childIdCardNumber'
  },
  {
    fieldEnName:'childClothSize'
  },
  {
    fieldEnName:'childBloodType'
  },
]

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {
  teamImg: string,
  teamName: string
  groupId: string
  raceId: string
}

type PageState = {
  [value: string]: any
  obj:object,
  radioValue:string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface FormSign {
  props: IProps;
}

class FormSign extends Component<PageOwnProps, PageState> {
  constructor(props) {
    super(props)
    this.state = {
      obj:{},
      radioValue:'',
      data: [],
      dataPay:[],
      sexType: [{ value: '男', text: '男', checked: false }, { value: '女', text: '女', checked: false }],
      idType: [{ value: '身份证', text: '身份证', checked: false }, { value: '护照', text: '护照', checked: false }],
      sizeType: [{ value: 'XS', text: 'XS', checked: false }, { value: 'S', text: 'S', checked: false },
      { value: 'M', text: 'M', checked: false }, { value: 'L', text: 'L', checked: false },
      { value: 'XL', text: 'XL', checked: false }, { value: 'XXL', text: 'XXL', checked: false }, { value: 'XXXL', text: 'XXXl', checked: false }],
      bloodGroup: [{ value: 'A', text: 'A', checked: false }, { value: 'B', text: 'B', checked: false },
      { value: 'O', text: 'O', checked: false }, { value: 'AB', text: 'AB', checked: false }],
      chsexType: [{ value: '男', text: '男', checked: false }, { value: '女', text: '女', checked: false }],
      chsizeType: [{ value: 'XS', text: 'XS', checked: false }, { value: 'S', text: 'S', checked: false },
      { value: 'M', text: 'M', checked: false }, { value: 'L', text: 'L', checked: false },
      { value: 'XL', text: 'XL', checked: false }, { value: 'XXL', text: 'XXL', checked: false }, { value: 'XXXL', text: 'XXXl', checked: false }],
      chbloodType: [{ value: 'A', text: 'A', checked: false }, { value: 'B', text: 'B', checked: false },
      { value: 'O', text: 'O', checked: false }, { value: 'AB', text: 'AB', checked: false }]
    }
  }
  DetailService = new DetailService()
  componentWillMount() {
    const raceId=this.props.raceId
    this.DetailService.getFormdata(raceId).then((res)=>{
      this.setState({
        form:res
      })
    })
    const self = this
    Taro.getStorage({
      key: 'list',
      success: function (res) {
        if (res) {
          self.state = res.data
          self.setState({
            list: res.data
          })
        }
      },
      fail: (res) => {
        console.log(res.errMsg)
      }
    })
    try {
      var value = Taro.getStorageSync('list')
      if (value) {
      }
    } catch (e) {

    }
  }
  //表单单选框
  handleChangeRadio(radioValue, e) {
    this.setState({
      radioValue
    })
  }
  onSubmit() {
    const arr = (this.state.radioValue || '').split('|')
    const joinTypeId = arr[0]
    const totalFee = arr[1]
    const formType=arr[3]
    const regName = new RegExp("^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$");
    const regmobile = new RegExp("^1[3|4|5|7|8][0-9]{9}$");
    const regidCardNumber = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    const { radioValue, bloodType, birthday, sex, clothSize, idCardType, region, name, mobile, emergencyContactMobile, emergencyContact, idCardNumber, age, contactRegion, email, childBloodType, childBirthday, childSex, childClothSize, childIdCardNumber, childName } = this.state
    if (!radioValue) {
      this.showError('请选择类别')
    }else if (formType==='1'?
    (!bloodType || !birthday || !sex || !clothSize || !idCardType || !region || !name || !mobile || !idCardNumber || !contactRegion || !email || !contactRegion || !emergencyContact || !emergencyContactMobile || !age):
    (!bloodType || !birthday || !sex || !clothSize || !idCardType || !region || !name || !mobile || !idCardNumber || !contactRegion || !email || !contactRegion || !emergencyContact || !emergencyContactMobile || !age || !childBirthday || !childBloodType || !childClothSize || !childSex || !childIdCardNumber || !childName)) {
      this.showError('表单内所有内容均需填写，请填写完整信息')
    }else if (formType==='1'?!regName.test(name && emergencyContact):!regName.test(childName)) {
      this.showError('请输入正确姓名')
    } else if (!regmobile.test(mobile && emergencyContactMobile)) {
      this.showError('请输入正确电话')
    } else if (!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email))) {
      this.showError('请输入正确邮箱')
    } else if (formType==='1'?!regidCardNumber.test(idCardNumber):!regidCardNumber.test(childIdCardNumber)) {
      this.showError('请输入正确身份证')
    } else if (true) {
      Taro.showModal({
        title: '确认关键信息，提交后无法修改',
        content: `姓名：${this.state.name} \n手机号：${this.state.mobile}\n证件号码：\n${this.state.idCardNumber}`,
        success: (res) => {
          if (res.confirm == true) {
            Taro.setStorageSync('list', this.state)
            let type=formType==='0'?childForm:adultForm
            type.map((item) => {
               this.state.obj[`${item.fieldEnName}`]=this.state[`${item.fieldEnName}`]
               this.state.obj['joinTypeId']=joinTypeId
              })
              console.log(this.state.obj);
              const datapost = { runningGroupId: this.props.groupId, totalFee: totalFee, signUpValue: this.state.obj,raceId :this.props.raceId }
              let form_type=formType==='0' ? this.DetailService.signupChild(datapost) : this.DetailService.signupAdult(datapost)
              form_type.then(res => {
                  const totalFee = res.totalFee
                  const orderNum = res.orderNumber
                  Taro.navigateTo({
                    url: `../orderFormetail/orderFormetail?createTime=${res.date}&&outTradeNo=${orderNum}&totalFee=${totalFee}&&raceId=${this.props.raceId}&&runningGroupId=${this.props.groupId}&&isAdult=${formType}&&orderType=${'2'}`
                  })
              })
          }
        },
      })
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
  handleChange(value, e) {
    let inputName = e.target.id
    this.setState({
      [inputName]: e.detail.value,
    })
    return inputName
  }
  //出生日期
  onDateChange = (e) => {
    this.setState({
      birthday: e.detail.value
    })
  }
  //地区
  onGetRegion(region) {
    this.setState({
      region
    })
  }
  //类型判断
  onRadioType(e) {
    const { sexType, idType, sizeType, bloodGroup, chsexType, chsizeType, chbloodType } = this.state
    const inputType = e.target.id
    this.setState({
      [inputType]: e.detail.value
    }, () => {
      if (this.state.sex) {
        sexType.forEach(element => {
          if (element.value == this.state.sex) {
            element.checked = true
          } else {
            element.checked = false
          }
          this.setState({
            sexType: sexType
          })
        });
      }
      if (this.state.idCardType) {
        idType.forEach(element => {
          if (element.value == this.state.idCardType) {
            element.checked = true
          } else {
            element.checked = false
          }
          this.setState({
            idType: idType
          })
        });
      }
      if (this.state.clothSize) {
        sizeType.forEach(element => {
          if (element.value == this.state.clothSize) {
            element.checked = true
          } else {
            element.checked = false
          }
          this.setState({
            sizeType: sizeType
          })
        });
      }
      if (this.state.bloodType) {
        bloodGroup.forEach(element => {
          if (element.value == this.state.bloodType) {
            element.checked = true
          } else {
            element.checked = false
          }
          this.setState({
            bloodGroup: bloodGroup
          })
        });
      }
      if (this.state.childSex) {
        chsexType.forEach(element => {
          if (element.value == this.state.childSex) {
            element.checked = true
          } else {
            element.checked = false
          }
          this.setState({
            chsexType: chsexType
          })
        });
      }
      if (this.state.childClothSize) {
        chsizeType.forEach(element => {
          if (element.value == this.state.childClothSize) {
            element.checked = true
          } else {
            element.checked = false
          }
          this.setState({
            chsizeType: chsizeType
          })
        });
      }
      if (this.state.childBloodType) {
        chbloodType.forEach(element => {
          if (element.value == this.state.childBloodType) {
            element.checked = true
          } else {
            element.checked = false
          }
          this.setState({
            chbloodType: chbloodType
          })
        });
      }
    })
    return inputType
  }
  //孩子的出生日期
  onChDateChange = (e) => {
    this.setState({
      childBirthday: e.detail.value
    })
  }
  render() {
    const arr = (this.state.radioValue || '').split('|')
    const { sexType, idType, sizeType, bloodGroup, chsexType, chsizeType, chbloodType,form } = this.state
    const formType=arr[3]
    return (
      <View>
        <AtForm
          //onSubmit={this.onSubmit.bind(this)}
          className='Form'
        >
          <AtRadio
            options={
              (form||[]).map(item => {
                return { label: item.joinType, value: [item.joinTypeId, item.nowPrice, item.joinType,item.isAdult].join('|'), desc: `( ${item.supplement} )  ,  价格：￥${item.previousPrice} , 团报价格：￥${item.nowPrice} ` }
              }) 
            }
            value={this.state.radioValue}
            onClick={this.handleChangeRadio.bind(this)}
          />
          <AtInput
            required
            name='name'
            title={formType==='1'? '姓名' : '成年人姓名'}
            type='text'
            placeholder= '请输入姓名'
            value={this.state.name}
            onChange={this.handleChange.bind(this)}
            className="input_group"
          />
          <AtInput
            required
            name='mobile'
            title={formType==='1'? '手机' : '成年人手机'}
            type='phone'
            placeholder= '请输入手机号'
            value={this.state.mobile}
            onChange={this.handleChange.bind(this)}
          />
          <View className="radio_style">
            {formType==='1'? '证件类型' : '成年人证件类型'}
            <RadioGroup id='idCardType' onChange={this.onRadioType.bind(this)}>
              {idType.map((item, i) => {
                return (
                  <Label className='radio-list__label' for={i} key={i}>
                    <Radio className='radio-list__radio' value={item.value} checked={item.checked}>{item.text}</Radio>
                  </Label>
                )
              })}
            </RadioGroup>
          </View>
          <AtInput
            required
            name='idCardNumber'
            title={formType==='1'? '证件号码' : '成年人证件号码'}
            type='idcard'
            placeholder='请输入证件号码'
            value={this.state.idCardNumber}
            onChange={this.handleChange.bind(this)}
          />
          <View className='page-section'>
            <Text>{formType!=='0'? '成年人出生日期' : '出生日期'}</Text>
            <View>
              <Picker mode='date' onChange={this.onDateChange.bind(this)} value={this.state.value}>
                <View className='picker'>
                  {this.state.birthday ? this.state.birthday : '请选择出生日期'}
                </View>
              </Picker>
            </View>
          </View>
          <View className="region">
            <Text>联系省市县:</Text>
            <TaroRegionPicker onGetRegion={this.onGetRegion.bind(this)}  place={this.state.region ? this.state.region : undefined}>
            </TaroRegionPicker >
          </View>
          <AtInput
            required
            name='age'
            title={formType==='1'? '年龄' : '成年人年龄'}
            type='number'
            placeholder= '请输入证件年龄'
            value={this.state.age}
            onChange={this.handleChange.bind(this)}
          />
          <View className="radio_style">
            <Text>{formType==='1'? '性别' : '成年人性别'}</Text>
            <RadioGroup id="sex" onChange={this.onRadioType.bind(this)} >
              {sexType.map((item, i) => {
                return (
                  <Label className='radio-list__label' for={i} key={i}>
                    <Radio className='radio-list__radio' value={item.value} checked={item.checked}>{item.text}</Radio>
                  </Label>
                )
              })}
            </RadioGroup>
          </View>
          <AtInput
            required
            name='contactRegion'
            title={formType==='1'? '联系地址' : '成年人联系地址'}
            type='text'
            placeholder= '请输入地址'
            value={this.state.contactRegion}
            onChange={this.handleChange.bind(this)}
          />
          <AtInput
            required
            name='email'
            title='邮箱'
            type='text'
            placeholder=  '请输入邮箱'
            value={this.state.email}
            onChange={this.handleChange.bind(this)}
          />
          <View className="radio_style">
            <Text>服装尺码</Text>
            <RadioGroup id='clothSize' onChange={this.onRadioType.bind(this)}>
              {sizeType.map((item, i) => {
                return (
                  <Label className='radio-list__label' for={i} key={i}>
                    <Radio className='radio-list__radio' value={item.value} checked={item.checked}>{item.text}</Radio>
                  </Label>
                )
              })}
            </RadioGroup>
          </View>
          <View className="radio_style">
            <Text>{formType==='1'? '血型' : '成年人血型'}</Text>
            <RadioGroup id="bloodType" onChange={this.onRadioType.bind(this)}>
              {bloodGroup.map((item, i) => {
                return (
                  <Label className='radio-list__label' for={i} key={i}>
                    <Radio className='radio-list__radio' value={item.value} checked={item.checked}>{item.text}</Radio>
                  </Label>
                )
              })}
            </RadioGroup>
          </View>
          <AtInput
            required
            name='emergencyContact'
            title={formType==='1'? '紧急联系人' : '成年人紧急联系人'}
            type='text'
            placeholder= '请输入紧急联系人'
            value={this.state.emergencyContact}
            onChange={this.handleChange.bind(this)}
          />
          <AtInput
            required
            name='emergencyContactMobile'
            title={formType==='1'? '紧急联系人手机号' : '成年人紧急联系人手机号'}
            type='phone'
            placeholder= '请输入紧急联系人手机'
            value={this.state.emergencyContactMobile}
            onChange={this.handleChange.bind(this)}
          />
          <View>
            {formType==='1'
              ? ''
              : <View>
                <AtInput
                  required
                  name='childName'
                  title='儿童姓名'
                  type='text'
                  placeholder='请输入儿童姓名'
                  value={this.state.childName}
                  onChange={this.handleChange.bind(this)}
                  className="input_group"
                />
                <View className='page-section'>
                  <Text>儿童出生日期:</Text>
                  <View>
                    <Picker mode='date' onChange={this.onChDateChange.bind(this)} value={this.state.value}>
                      <View className='picker'>
                        {this.state.childBirthday}
                      </View>
                    </Picker>
                  </View>
                </View>
                <View className="radio_style">
                  <Text>儿童性别</Text>
                  <RadioGroup id='childSex' onChange={this.onRadioType.bind(this)}  >
                    {chsexType.map((item, i) => {
                      return (
                        <Label className='radio-list__label' for={i} key={i}>
                          <Radio className='radio-list__radio' value={item.value} checked={item.checked}>{item.text}</Radio>
                        </Label>
                      )
                    })}
                  </RadioGroup>
                </View>
                <AtInput
                  required
                  name='childIdCardNumber'
                  title='证件号码'
                  type='idcard'
                  placeholder='请输入儿童证件号码'
                  value={this.state.childIdCardNumber}
                  onChange={this.handleChange.bind(this)}
                />
                <View className="radio_style">
                  <Text>儿童服装尺码</Text>
                  <RadioGroup id='childClothSize' onChange={this.onRadioType.bind(this)}>
                    {chsizeType.map((item, i) => {
                      return (
                        <Label className='radio-list__label' for={i} key={i}>
                          <Radio className='radio-list__radio' value={item.value} checked={item.checked}>{item.text}</Radio>
                        </Label>
                      )
                    })}
                  </RadioGroup>
                </View>
                <View className="radio_style">
                  <Text>儿童血型</Text>
                  <RadioGroup id='childBloodType' onChange={this.onRadioType.bind(this)}>
                    {chbloodType.map((item, i) => {
                      return (
                        <Label className='radio-list__label' for={i} key={i}>
                          <Radio className='radio-list__radio' value={item.value} checked={item.checked}>{item.text}</Radio>
                        </Label>
                      )
                    })}
                  </RadioGroup>
                </View>
              </View>}
          </View>

          <AtButton className='submit_button'  onClick={this.onSubmit.bind(this)}>报名参加</AtButton>
        </AtForm>
      </View>
    )
  }
}

export default FormSign 
