import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import {   ScrollView,View,Textarea,Text,Form,Input,Button,Image } from '@tarojs/components'
import uploadImg from '../../assets/uploadImg.png'
import './editTeam.scss'
import TeamService from '../../service/TeamService'
import TeamController from '../../controller/TeamController'
type PageStateProps = {
  
}

type PageDispatchProps = {
  
}

type PageOwnProps = {}

type PageState = {
  logo:string,
  groupName:string,
  groupEnName:string,
  contactName:string,
  contactPhone:string,
  introduction:string,
  maxPerson:string,
  runningGroupId:number,
  isChoose:boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface EditTeam {
  props: IProps;
  state:PageState
}




class EditTeam extends Component {
  state = {
    logo:'',
    groupName:'',
    groupEnName:'',
    contactName:'',
    contactPhone:'',
    introduction:'',
    maxPerson:'0',
    isChoose:false,
    runningGroupId:0
  }
    config: Config = {
    navigationBarTitleText: '编辑跑团信息'
  }
   teamController = new TeamController();
   teamService = new TeamService();
  componentDidMount(){
    const {id} = this.$router.params
    console.log(id)
    this.teamService.getTeamDetail(id).then(
      (res) =>{
        const { logoUrl,groupName,groupEnName,contactPhone,contactName,introduction,maxPerson} = res
        this.setState({
          logo:logoUrl,
          groupName,
          groupEnName,
          contactPhone,
          contactName,
          introduction,
          maxPerson:`${maxPerson}`
        })
      }
    )

    }
  

  handleChange(index,event){

    switch(index){
      case 0:
        this.setState({
          groupName:event.target.value
        })
        break;
      case 1:
        this.setState({
          groupEnName:event.target.value
        })
        break;
      case 2:
        this.setState({
          contactName:event.target.value
        })
        break;
      case 3:
        this.setState({
          contactPhone:event.target.value
        })
        break;
      case 4:
        this.setState({
          introduction:event.target.value
        })
        break;
      case 5:
        this.setState({
          maxPerson:event.target.value
        })
        break;
        default:
          return;
    }
  }
  chooseImage = () =>{
    Taro.chooseImage({
      count: 1,
      success: res => {
        const { tempFilePaths } = res;
        Taro.getImageInfo({
          src: tempFilePaths[0],
          success: () => {
              this.setState({
                logo: tempFilePaths[0],
                isChoose:true
              })
          },
          fail: () => {
            Taro.showToast({
              title: '未知错误',
              duration: 800
            })
          }
        })
      }
    })
  }

  onSubmit = () =>{
    let flag = 1;
    const regName = new RegExp("^[a-zA-Z]+$");
    const regPhone = new RegExp("^1[3|4|5|7|8][0-9]{9}$");
    const regChName = new RegExp("^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$")
    const{logo,groupName,groupEnName,contactName,contactPhone,introduction,maxPerson,isChoose} = this.state
    const {id} = this.$router.params
    console.log('teamid',id)
    if(!logo){
      flag = this.showError('请上传跑团logo');
    }else if(!groupName){
      flag = this.showError('请输入跑团名称')
    }else if(!groupEnName){
      flag = this.showError('请输入跑团英文简称')
    }else if(!contactName){
      flag = this.showError('请输入联系人姓名')
    }else if(!contactPhone){
      flag = this.showError('请输入联系人手机')
    }else if(!introduction){
      flag = this.showError('请输入跑团简介')
    }else if(!maxPerson){
      flag = this.showError('请输入跑团人数上限')
    }else if(!regName.test(groupEnName)){
      flag = this.showError('英文格式简称不正确，请使用英文字母')
    }else if(!regChName.test(contactName)){
      flag = this.showError('请输入正确的跑团联系人姓名')
    }else if(!regPhone.test(contactPhone)){
      flag = this.showError('请输入有效的跑团联系人手机号')
    }
    if(!flag) return;
    const param = {
      runningGroupId:id,
      logo,
      groupName,
      groupEnName,
      contactName,
      contactPhone,
      introduction,
      maxPerson
    }
    if(isChoose){
      this.teamController.update(param)
    }else{
      this.teamController.updateWithoutpic(param)
    }


  }
  showError = (err) =>{
    Taro.showModal({
      title:'提示',
      content:err,
      showCancel:false,
      confirmColor:'#67c241'
    })
    return 0;
  }
  render () {
    return (
      <ScrollView scrollY className="establish">
        <View className="establishTitle">
          修改跑团
        </View>

      <View className="establishAvatar" >
        {
          !this.state.logo ? (
            <View className='establishAvatarView' >
              <Image className = 'teamLogo' src ={uploadImg} onClick ={this.chooseImage.bind(this)}/>
            </View>
          )  : (
            <View className='establishAvatarView'>
              <Image className = 'teamLogo' src ={this.state.logo} onClick ={this.chooseImage.bind(this)} />
            </View>            
          )
            
        }
      </View>
      <View  className="Upload" onClick ={this.chooseImage.bind(this)}>
        上传跑团LOGO
      </View>
      <Form  className="SignUp">
        <View className="fill">
          <View className="fillTop">
            <Text className="fillTitle">跑团名称</Text>
          </View>
          <View className="fillName">
            <Input
              name="name"
              placeholder="请输入跑团名称"
              type = 'text'
              maxLength= {15}
              value={this.state.groupName}
              onInput={this.handleChange.bind(this,0)}
            ></Input>
          </View>
        </View>
        <View className="fill">
          <View className="fillTop">
            <Text className="fillTitle">英文简称</Text>
          </View>
          <View className="fillName">
            <Input
              name="domain"
              placeholder="这将作为跑团链接网址的一部分"
              maxLength= {40}
              value={this.state.groupEnName}
              onInput={this.handleChange.bind(this,1)}
            ></Input>
          </View>
        </View>
        <View className="fill">
          <View className="fillTop">
            <Text className="fillTitle">联系人</Text>
          </View>
          <View className="fillName">
            <Input
              name="contact"
              placeholder="请输入跑团联系人姓名"
              value={this.state.contactName}
              onInput={this.handleChange.bind(this,2)}
              maxLength ={10}
            ></Input>
          </View>
        </View>
        <View className="fill">
          <View className="fillTop">
            <Text className="fillTitle">联系人手机</Text>
          </View>
          <View className="fillName">
            <Input
              name="contactMobile"
              placeholder="请输入跑团联系人手机号码"
              type="number"
              value={this.state.contactPhone}
              onInput={this.handleChange.bind(this,3)}
              maxLength={11}
            ></Input>
          </View>
        </View>
        <View className="fill">
          <View className="filTtop">
            <Text className="fillTitle">跑团简介</Text>
            <Textarea 
              className='intro' 
              value ={this.state.introduction} 
              onInput={this.handleChange.bind(this,4)}
              maxlength={140}
              placeholder='请输入跑团简介'
            ></Textarea>
          </View>
          <View className="fillName Introduction">
          </View>
        </View>
        <View className="fill">
          <View className="fillTop">
            <Text className="fillTitle">人数上限（0为没有限制）</Text>
          </View>
          <View className="fillName">
            <Input
              name="memberNumLimit"
              value = {this.state.maxPerson}
              onInput={this.handleChange.bind(this,5)}
              type = 'number'
              maxLength = {10}
            ></Input>
          </View>
        </View>
        <Button className="participate" formType="submit" onClick={this.onSubmit.bind(this)}>
          提交保存
        </Button>
      </Form>
    </ScrollView>
    )
  }
}


export default EditTeam as ComponentClass<PageOwnProps, PageState>
