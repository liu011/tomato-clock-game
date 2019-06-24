import { ComponentClass } from "react"
import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import { onUpdateStatus } from "../actions/updateGameStatus"

import "./countdown.less"

type PageStateProps = {
  updateGameStatusReducer: {
    coins: number
    status: string
  }
}

type PageDispatchProps = {
  onUpdateStatus: (newStatus: string) => void
}

type PageOwnProps = {}

type PageState = {
  minute: number
  second: number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Countdown {
  props: IProps
  state: PageState
}

@connect(
  ({ updateGameStatusReducer }) => ({
    updateGameStatusReducer,
  }),
  dispatch => ({
    onUpdateStatus(newStatus) {
      dispatch(onUpdateStatus(newStatus))
    },
  })
)
class Countdown extends Component {
  timer: NodeJS.Timeout
  constructor(props) {
    super(props)
    this.state = {
      minute: 1,
      second: 0,
    }
    this.tick = this.tick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    let currentStatus = nextProps.updateGameStatusReducer.status
    if (currentStatus === "start") {
      nextProps.onUpdateStatus("running")
      this.timer = setInterval(() => this.tick(), 1000)
    } else if (currentStatus === "completed") {
      clearInterval(this.timer)
    } else if (currentStatus === "ready") {
      clearInterval(this.timer)
      this.setState(
        prevState => {
          return {
            ...prevState,
            minute: 1,
            second: 0,
          }
        },
        () => console.log(this.state)
      )
    }
  }

  tick() {
    console.log("tick once")
    if (this.state.minute === 0 && this.state.second === 0) {
      this.props.onUpdateStatus("completed")
      clearInterval(this.timer)
    } else {
      if (this.state.second === 0) {
        this.setState(
          prevState => {
            return {
              ...prevState,
              minute: this.state.minute - 1,
              second: 59,
            }
          },
          () => console.log(this.state)
        )
      } else {
        this.setState(
          prevState => {
            return {
              ...prevState,
              minute: this.state.minute,
              second: this.state.second - 1,
            }
          },
          () => console.log(this.state)
        )
      }
    }
  }

  render() {
    const minutes = this.state.minute < 10 ? "0" + this.state.minute : this.state.minute
    const seconds = this.state.second < 10 ? "0" + this.state.second : this.state.second
    return (
      <View className='countdown'>
        <View className='block'>{minutes}</View>
        <View className='colon'> : </View>
        <View className='block'>{seconds}</View>
      </View>
    )
  }
}

export default Countdown as ComponentClass<PageOwnProps, PageState>
