import { ComponentClass } from "react"
import Taro, { Component } from "@tarojs/taro"
import { AtToast } from "taro-ui"
import { connect } from "@tarojs/redux"
import { isNil } from "lodash"
import { View, Button, Picker, Image } from "@tarojs/components"
import { onUpdateCoins, onUpdateStatus } from "../../actions/updateGameStatus"
import { onCalculateFruitValue, onCalculateIngredientExpense } from "../../actions/calculateValue"
import Countdown from "../../components/countdown"
import { Fruit, IngredientOption } from "../../types/type"

import sunshineIcon from "../../assets/sunshine.png"
import waterIcon from "../../assets/water.png"
import earthIcon from "../../assets/earth.png"
import energyIcon from "../../assets/energy.png"
import growing from "../../assets/growing.png"

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
}

type PageOwnProps = {}

type PageState = {
  isOnStartDisabled: boolean
  isOnEndDisabled: boolean
  povertyAlert: boolean
  harvestAlert: boolean
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
  })
)
class Index extends Component {
  constructor(props: {} | undefined) {
    super(props)
    this.state = {
      isOnStartDisabled: true,
      isOnEndDisabled: true,
      povertyAlert: false,
      harvestAlert: false,
      selectorA: this.props.calculateValueReducer.optionsA.map(option => option.name),
      selectorB: this.props.calculateValueReducer.optionsB.map(option => option.name),
      selectorC: this.props.calculateValueReducer.optionsC.map(option => option.name),
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

  checkButton = () => {
    if (
      this.state.selectorCheckedA.length > 0 &&
      this.state.selectorCheckedB.length > 0 &&
      this.state.selectorCheckedC.length > 0
    ) {
      this.setState(
        prevState => {
          return {
            ...prevState,
            isOnStartDisabled: false,
            isOnEndDisabled: true,
          }
        },
        () => console.log(this.state)
      )
    }
  }

  changePovertyAlert = (isOpenAlert: boolean) => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          povertyAlert: isOpenAlert,
        }
      },
      () => console.log(this.state)
    )
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
    this.setState(
      prevState => {
        return {
          ...prevState,
          isOnStartDisabled: true,
          isOnEndDisabled: false,
        }
      },
      () => console.log(this.state)
    )
    this.props.onCalculateFruitValue(
      this.state.selectorCheckedA,
      this.state.selectorCheckedB,
      this.state.selectorCheckedC
    )
  }

  onEnd = () => {
    if (this.props.updateGameStatusReducer.status === "completed") {
      const fruit = this.props.calculateValueReducer.thisFruit
      this.props.onUpdateCoins(fruit.value)
      this.setState(prevState => {
        return {
          ...prevState,
          harvestAlert: true,
        }
      })
    }
    this.props.onUpdateStatus("ready")
    this.setState(
      prevState => {
        return {
          ...prevState,
          isOnStartDisabled: true,
          isOnEndDisabled: true,
          selectorCheckedA: "",
          selectorCheckedB: "",
          selectorCheckedC: "",
        }
      },
      () => console.log(this.state)
    )
  }

  onChangeA = (e: { detail: { value: string | number } }) => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          selectorCheckedA: this.state.selectorA[e.detail.value],
        }
      },
      () => {
        this.changePovertyAlert(false)
        this.checkButton()
        console.log(this.state)
      }
    )
  }

  onChangeB = (e: { detail: { value: string | number } }) => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          selectorCheckedB: this.state.selectorB[e.detail.value],
        }
      },
      () => {
        this.changePovertyAlert(false)
        this.checkButton()
        console.log(this.state)
      }
    )
  }
  onChangeC = (e: { detail: { value: string | number } }) => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          selectorCheckedC: this.state.selectorC[e.detail.value],
        }
      },
      () => {
        this.changePovertyAlert(false)
        this.checkButton()
        console.log(this.state)
      }
    )
  }

  render() {
    const { coins, status } = this.props.updateGameStatusReducer
    const { thisFruit, ingredientExpense } = this.props.calculateValueReducer
    return (
      <View className='index'>
        <View className='ingredient'>
          <View className='selector-container'>
            <Picker mode='selector' range={this.state.selectorA} onChange={this.onChangeA} value={0}>
              <View className='picker'>
                <View className='select-button'>
                  <Image className='icon' src={sunshineIcon} />
                </View>
                <View className='selected-item'>
                  {this.state.selectorCheckedA ? this.state.selectorCheckedA : "选择光照"}
                </View>
              </View>
            </Picker>
            <Picker mode='selector' range={this.state.selectorB} onChange={this.onChangeB} value={0}>
              <View className='picker'>
                <View className='select-button'>
                  <Image className='icon' src={waterIcon} />
                </View>
                <View className='selected-item'>
                  {this.state.selectorCheckedB ? this.state.selectorCheckedB : "选择水源"}
                </View>
              </View>
            </Picker>
            <Picker mode='selector' range={this.state.selectorC} onChange={this.onChangeC} value={0}>
              <View className='picker'>
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
        <View className='coin-container'>
          <Image className='icon' src={energyIcon} />
          能量: {coins}
        </View>
        <View className='text-container'>
          <Image
            className='slogan'
            src='http://www.diyiziti.com/Res/Images//Temp/513/edbf73fe3e484eddb6839619093e08b5.PNG'
          />
        </View>
        <View className='text-container'>
          <Image
            className='slogan'
            src='http://www.diyiziti.com/Res/Images//Temp/513/ce3f908a349b473d8c0174f47aa8f384.PNG'
          />
        </View>
        <AtToast isOpened={this.state.povertyAlert} text={`原材料需要${ingredientExpense}金币，金币不够啦！`} />
        <AtToast
          isOpened={this.state.harvestAlert}
          text={!isNil(thisFruit) ? `成功收获一枚${thisFruit.name}，获得${thisFruit.value}点能量！` : ""}
        />
        <View className='image-container'>
          <Image
            style='width: 200px;height: 200px;background: #fff;'
            src={status === "completed" ? `https://${thisFruit.image}` : growing}
          />
        </View>
        <Countdown />
        <View className='button-container'>
          <Button className='single-button' onClick={this.onStart} disabled={this.state.isOnStartDisabled}>
            种下
          </Button>
          <Button className='single-button' onClick={this.onEnd} disabled={this.state.isOnEndDisabled}>
            {status === "completed" ? "收获" : "我要摸鱼"}
          </Button>
        </View>
      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>
