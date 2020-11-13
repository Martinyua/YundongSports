import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import IndexService from '../../service/indexService'



import './share.scss'
// import code from '../../assets/code.jpg'

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {
  tagUrl: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Share {
  props: IProps,
  state: PageState
}

@connect(({ }) => ({

}), () => ({

}))
class Share extends Component {

  config: Config = {
    navigationBarTitleText: '分享团报'
  }
  constructor(props) {
    super(props)
    this.state = {
      tagUrl: ''
    }
  }
  IndexService = new IndexService();
  componentDidMount() {

    console.log(this.$router.params);
    const data = {
      raceId: this.$router.params.raceId,
      runningGroupId: this.$router.params.id,
    }
    this.IndexService.getImage(data).then((res) => {
      let tagUrl = res.buffer;

      tagUrl = this.insertStr(tagUrl,4,'s')
      console.log(tagUrl);
      this.setState({
        tagUrl
      })
    })
  }
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
  downloadImg() {
    Taro.showLoading({
      title: '保存中...',
      mask: true,
    });
    Taro.downloadFile({
      url: this.state.tagUrl,
      success: function (res) {
        if (res.statusCode === 200) {
          let img = res.tempFilePath;
          Taro.saveImageToPhotosAlbum({
            filePath: img,
            success() {
              Taro.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              });
            },
            fail() {
              Taro.showToast({
                title: '保存失败',
                icon: 'none',
                duration: 2000
              });
            }
          });
        }
      }
    });
  }
  save() {
    let self = this;
    let isFirst = Taro.getStorageSync('isFirst') || 0;
    Taro.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          Taro.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              self.downloadImg();
            },
            fail() {
              if (isFirst === 0) {
                Taro.setStorageSync('isFirst', 1);
              } else {
                Taro.openSetting({
                  success: res => { }
                });
              }
            }
          });
        } else {
          self.downloadImg();
        }
      }
    })
  }
  render() {
    return (
      <View>
        <View className='shareImgWrap'>
          <Image className='shareImg' src={this.state.tagUrl} />
        </View>
        <Button className='shareButton' onClick={() => this.save()}>保存图片</Button>
      </View>
    )
  }
}

export default Share as ComponentClass<PageOwnProps, PageState>
