import { ComponentClass } from "react"
import Taro, { Component, Config } from "@tarojs/taro"
import { AtToast, AtCurtain, AtModal, AtModalContent, AtModalAction, AtProgress, AtButton } from "taro-ui"
import { connect } from "@tarojs/redux"
import { View, Button, Picker, Image } from "@tarojs/components"
import { onUpdateCoins, onUpdateStatus } from "../../actions/updateGameStatus"
import { onCalculateFruitValue, onCalculateIngredientExpense, onUpdateOwnedFruit } from "../../actions/calculateValue"
import Countdown from "../../components/countdown"
import { Fruit, IngredientOption } from "../../types/type"

import seedIcon from "../../assets/seed.png"
import waterIcon from "../../assets/water.png"
import earthIcon from "../../assets/earth.png"
import growing from "../../assets/growing.png"
import withered from "../../assets/withered.png"
import library from "../../assets/library.png"
import tutorial from "../../assets/tutorial.png"

import "./index.less"

type PageStateProps = {
  updateGameStatusReducer: {
    coins: number
    status: string
  }
  calculateValueReducer: {
    optionsA: IngredientOption[]
    optionsB: IngredientOption[]
    optionsC: IngredientOption[]
    fruits: Fruit[]
    thisFruit: Fruit
    ingredientExpense: number
  }
}

type PageDispatchProps = {
  onUpdateCoins: (coinNumber: number) => void
  onUpdateStatus: (newStatus: string) => void
  onCalculateFruitValue: (selectorCheckedA: string, selectorCheckedB: string, selectorCheckedC: string) => Fruit
  onCalculateIngredientExpense: (selectorCheckedA: string, selectorCheckedB: string, selectorCheckedC: string) => number
  onUpdateOwnedFruit: (fruitId: number) => void
}

type PageOwnProps = {}

type PageState = {
  isOnStartDisabled: boolean
  isOnEndDisabled: boolean
  povertyAlert: boolean
  harvestAlert: boolean
  badTomatoAlert: boolean
  tutorialCurtain: boolean
  selectorA: string[]
  selectorB: string[]
  selectorC: string[]
  selectorCheckedA: string
  selectorCheckedB: string
  selectorCheckedC: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps
  state: PageState
}

@connect(
  ({ updateGameStatusReducer, calculateValueReducer }) => ({
    updateGameStatusReducer,
    calculateValueReducer,
  }),
  dispatch => ({
    onUpdateCoins(coinNumber: number) {
      dispatch(onUpdateCoins(coinNumber))
    },
    onUpdateStatus(newStatus: string) {
      dispatch(onUpdateStatus(newStatus))
    },
    onCalculateFruitValue(selectorCheckedA: string, selectorCheckedB: string, selectorCheckedC: string) {
      dispatch(onCalculateFruitValue(selectorCheckedA, selectorCheckedB, selectorCheckedC))
    },
    onCalculateIngredientExpense(selectorCheckedA: string, selectorCheckedB: string, selectorCheckedC: string) {
      dispatch(onCalculateIngredientExpense(selectorCheckedA, selectorCheckedB, selectorCheckedC))
    },
    onUpdateOwnedFruit(fruitId: number) {
      dispatch(onUpdateOwnedFruit(fruitId))
    },
  })
)
class Index extends Component {
  config: Config = {
    navigationBarBackgroundColor: "#f8f8f8",
  }

  constructor(props: {} | undefined) {
    super(props)
    this.state = {
      isOnStartDisabled: true,
      isOnEndDisabled: true,
      povertyAlert: false,
      harvestAlert: false,
      badTomatoAlert: false,
      tutorialCurtain: false,
      selectorA: this.props.calculateValueReducer.optionsA.map(option => option.name + " " + option.expense + "点能量"),
      selectorB: this.props.calculateValueReducer.optionsB.map(option => option.name + " " + option.expense + "点能量"),
      selectorC: this.props.calculateValueReducer.optionsC.map(option => option.name + " " + option.expense + "点能量"),
      selectorCheckedA: "",
      selectorCheckedB: "",
      selectorCheckedC: "",
    }
  }

  /*
  componentWillReceiveProps(nextProps: any) {
    console.log(this.props, nextProps)
  }
  */
  /*
  badTomato = false
  componentDidHide() {
    if (this.props.updateGameStatusReducer.status === "running") {
      this.setState(prevState => {
        return {
          ...prevState,
          harvestAlert: false,
          badTomatoAlert: false,
        }
      })
      this.badTomato = true
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
          harvestAlert: false,
          badTomatoAlert: false,
        }
      })
    }
  }
  componentDidShow() {
    if (this.badTomato) {
      this.setState(prevState => {
        return {
          ...prevState,
          badTomatoAlert: true,
        }
      })
    }
    this.setState(prevState => {
      return {
        ...prevState,
        isOnStartDisabled: true,
        isOnEndDisabled: true,
        selectorCheckedA: "",
        selectorCheckedB: "",
        selectorCheckedC: "",
      }z
    })
    this.props.onUpdateStatus("ready")
  }
  */
  checkButton = () => {
    if (
      this.state.selectorCheckedA.length > 0 &&
      this.state.selectorCheckedB.length > 0 &&
      this.state.selectorCheckedC.length > 0
    ) {
      this.setState(prevState => {
        return {
          ...prevState,
          isOnStartDisabled: false,
          isOnEndDisabled: true,
        }
      })
    }
  }

  changePovertyAlert = (isOpenAlert: boolean) => {
    this.setState(prevState => {
      return {
        ...prevState,
        povertyAlert: isOpenAlert,
        harvestAlert: false,
        badTomatoAlert: false,
      }
    })
  }

  onStart = () => {
    this.props.onCalculateIngredientExpense(
      this.state.selectorCheckedA,
      this.state.selectorCheckedB,
      this.state.selectorCheckedC
    )
    const expense = this.props.calculateValueReducer.ingredientExpense
    if (this.props.updateGameStatusReducer.coins >= expense) {
      this.changePovertyAlert(false)
      this.props.onUpdateCoins(-1 * expense)
    } else {
      this.changePovertyAlert(true)
      return
    }
    this.props.onUpdateStatus("start")
    this.setState(prevState => {
      return {
        ...prevState,
        isOnStartDisabled: true,
        isOnEndDisabled: false,
      }
    })
    this.props.onCalculateFruitValue(
      this.state.selectorCheckedA,
      this.state.selectorCheckedB,
      this.state.selectorCheckedC
    )
    Taro.request({
      method: "GET",
      url: "https://" + this.props.calculateValueReducer.thisFruit.image,
    })
    //this.badTomato = false
  }

  onEnd = () => {
    if (this.props.updateGameStatusReducer.status === "completed") {
      const fruit = this.props.calculateValueReducer.thisFruit
      console.log(fruit)
      this.props.onUpdateCoins(fruit.value)
      this.props.onUpdateOwnedFruit(fruit.id)
      this.setState(prevState => {
        return {
          ...prevState,
          harvestAlert: true,
        }
      })
    } else {
      //this.badTomato = true
      this.setState(prevState => {
        return {
          ...prevState,
          badTomatoAlert: true,
        }
      })
    }
    this.props.onUpdateStatus("ready")
    this.setState(prevState => {
      return {
        ...prevState,
        isOnStartDisabled: true,
        isOnEndDisabled: true,
        selectorCheckedA: "",
        selectorCheckedB: "",
        selectorCheckedC: "",
      }
    })
  }

  onChangeA = (e: { detail: { value: string | number } }) => {
    const stopPoint = this.state.selectorA[e.detail.value].indexOf(" ")
    const answer = this.state.selectorA[e.detail.value].substring(0, stopPoint)
    this.setState(
      prevState => {
        return {
          ...prevState,
          selectorCheckedA: answer,
        }
      },
      () => {
        this.changePovertyAlert(false)
        this.checkButton()
      }
    )
  }

  onChangeB = (e: { detail: { value: string | number } }) => {
    const stopPoint = this.state.selectorB[e.detail.value].indexOf(" ")
    const answer = this.state.selectorB[e.detail.value].substring(0, stopPoint)
    this.setState(
      prevState => {
        return {
          ...prevState,
          selectorCheckedB: answer,
        }
      },
      () => {
        this.changePovertyAlert(false)
        this.checkButton()
      }
    )
  }
  onChangeC = (e: { detail: { value: string | number } }) => {
    const stopPoint = this.state.selectorC[e.detail.value].indexOf(" ")
    const answer = this.state.selectorC[e.detail.value].substring(0, stopPoint)
    this.setState(
      prevState => {
        return {
          ...prevState,
          selectorCheckedC: answer,
        }
      },
      () => {
        this.changePovertyAlert(false)
        this.checkButton()
      }
    )
  }

  onNavigateToLibrary = () => {
    Taro.navigateTo({
      url: "/pages/library/index",
    })
  }

  onOpenTutorial() {
    this.setState(prevState => {
      return {
        ...prevState,
        tutorialCurtain: true,
      }
    })
  }

  onCloseTutorial() {
    this.setState(prevState => {
      return {
        ...prevState,
        tutorialCurtain: false,
      }
    })
  }

  confirmHarvest() {
    this.setState(prevState => {
      return {
        ...prevState,
        harvestAlert: false,
      }
    })
  }

  onClosebadTomatoAlert() {
    this.setState(prevState => {
      return {
        ...prevState,
        badTomatoAlert: false,
      }
    })
  }

  render() {
    const { coins, status } = this.props.updateGameStatusReducer
    const { thisFruit, ingredientExpense } = this.props.calculateValueReducer
    return (
      <View className='index'>
        <View className='status-container'>
          <AtProgress className='progress-bar' percent={100} color='#D4E2CE' strokeWidth={2} isHidePercent />
          <View className='coin-container'>能量: {coins}</View>
          <AtProgress className='progress-bar' percent={100} color='#D4E2CE' strokeWidth={2} isHidePercent />
        </View>
        <View className='icons-container'>
          <View className='single-icon-container' onClick={this.onOpenTutorial.bind(this)}>
            <Image className='tutorial' src={tutorial} />
            <View className='icon-text'>教程</View>
          </View>
          <View className='single-icon-container' onClick={this.onNavigateToLibrary}>
            <Image className='library' src={library} />
            <View className='icon-text'>图鉴</View>
          </View>
        </View>
        <AtCurtain isOpened={this.state.tutorialCurtain} onClose={this.onCloseTutorial.bind(this)}>
          <Image className='tutorial-image' src='https://i.loli.net/2019/07/06/5d2095fec6f5975326.png' />
        </AtCurtain>
        <AtToast isOpened={this.state.povertyAlert} text={`原材料需要${ingredientExpense}金币，金币不够啦！`} />
        <AtModal isOpened={this.state.harvestAlert}>
          <AtModalContent>
            <View className='modalText'>成功收获一枚</View>
            <View className='modalText'>{thisFruit.name}</View>
            <View className='modalText'>{`获得${thisFruit.value}点能量`}</View>
            <Image className='modalImg' src={`https://${thisFruit.image}`} />
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.confirmHarvest.bind(this)}>OjbK</Button>
          </AtModalAction>
        </AtModal>
        <AtModal isOpened={this.state.badTomatoAlert}>
          <AtModalContent>
            <View className='modalText'>由于你的摸鱼，番茄枯萎了QAQ</View>
            <Image className='modalImg' src={withered} />
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.onClosebadTomatoAlert.bind(this)}>OjbK</Button>
          </AtModalAction>
        </AtModal>
        <View className='ingredient'>
          <View className='selector-container'>
            <Picker mode='selector' range={this.state.selectorA} onChange={this.onChangeA} value={0}>
              <View className='pickerA'>
                <View className='select-button'>
                  <Image className='icon' src={seedIcon} />
                </View>
                <View className='selected-item'>
                  {this.state.selectorCheckedA ? this.state.selectorCheckedA : "选择种子"}
                </View>
              </View>
            </Picker>
            <Picker mode='selector' range={this.state.selectorB} onChange={this.onChangeB} value={0}>
              <View className='pickerB'>
                <View className='select-button'>
                  <Image className='icon' src={waterIcon} />
                </View>
                <View className='selected-item'>
                  {this.state.selectorCheckedB ? this.state.selectorCheckedB : "选择水源"}
                </View>
              </View>
            </Picker>
            <Picker mode='selector' range={this.state.selectorC} onChange={this.onChangeC} value={0}>
              <View className='pickerC'>
                <View className='select-button'>
                  <Image className='icon' src={earthIcon} />
                </View>
                <View className='selected-item'>
                  {this.state.selectorCheckedC ? this.state.selectorCheckedC : "选择土壤"}
                </View>
              </View>
            </Picker>
          </View>
        </View>
        <View className='image-container'>
          <Image className='image' src={status === "completed" ? `https://${thisFruit.image}` : growing} />
        </View>
        <Countdown />
        <View className='button-container'>
          <AtButton className='single-button' onClick={this.onStart} disabled={this.state.isOnStartDisabled}>
            种下
          </AtButton>
          <AtButton className='single-button' onClick={this.onEnd} disabled={this.state.isOnEndDisabled}>
            {status === "completed" ? "收获" : "我要摸鱼"}
          </AtButton>
        </View>
      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>
