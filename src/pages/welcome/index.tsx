import Taro, { Component } from "@tarojs/taro"
import { AtProgress } from "taro-ui"
import { View, Image } from "@tarojs/components"
import { ComponentClass } from "react"

import "./index.less"

import slogan1 from "../../assets/slogan1.png"
import slogan2 from "../../assets/slogan2.png"

type PageState = {
  progress: number
}

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Welcome {
  props: IProps
  state: PageState
}

class Welcome extends Component {
  timer: NodeJS.Timeout
  constructor(props) {
    super(props)
    this.state = {
      progress: 10,
    }
    this.tick = this.tick.bind(this)
  }

  componentWillMount() {
    Taro.request({
      method: "GET",
      url: "https://i.loli.net/2019/07/06/5d2095fec6f5975326.png",
    })
  }

  componentDidShow() {
    this.setState({ progress: 0 })
    this.timer = setInterval(() => this.tick(), 150)
  }

  tick() {
    if (this.state.progress >= 100) {
      clearInterval(this.timer)
      Taro.navigateTo({
        url: "/pages/index/index",
      })
    } else {
      const prevProgress = this.state.progress
      this.setState(prevState => {
        return {
          ...prevState,
          progress: prevProgress + 5,
        }
      })
    }
  }

  render() {
    return (
      <View className='welcome-page'>
        <View className='welcome-content'>
          <View className='text-container'>
            <Image className='slogan1' src={slogan1} />
          </View>
          <View className='text-container'>
            <Image className='slogan2' src={slogan2} />
          </View>
          <AtProgress
            className='progress-bar'
            percent={this.state.progress}
            color='#D4E2CE'
            status='progress'
            isHidePercent
          />
        </View>
      </View>
    )
  }
}

export default Welcome as ComponentClass<PageOwnProps, PageState>
