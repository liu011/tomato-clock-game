import Taro, { Component, ComponentClass, Config } from "@tarojs/taro"
import { View, Image, Text } from "@tarojs/components"
import { AtGrid } from "taro-ui"
import { connect } from "@tarojs/redux"
import { Fruit } from "../../types/type"

import "./index.less"

type PageStateProps = {
  calculateValueReducer: {
    fruits: Fruit[]
  }
}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  chosenFruit: Fruit | null
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Library {
  props: IProps
  state: PageState
}

@connect(({ calculateValueReducer }) => ({
  calculateValueReducer,
}))
class Library extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenFruit: null,
    }
  }

  onShowDetail = (item, index: number) => {
    const chosenFruitId = index
    this.setState(prevState => {
      return {
        ...prevState,
        chosenFruit: this.props.calculateValueReducer.fruits[chosenFruitId],
      }
    })
  }

  render() {
    const imgArray: Object[] = []
    const fruitStrings = this.props.calculateValueReducer.fruits.map(fruit => [
      fruit.owned
        ? `https://${fruit.image}`
        : "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=679881927,2934882074&fm=115&gp=0.jpg",
      fruit.owned ? fruit.name : "???",
    ])
    fruitStrings.forEach(str => imgArray.push({ image: str[0], value: str[1] }))
    return (
      <View>
        <View className='detail-container'>
          <View>
            <Image
              className='image-info'
              src={
                this.state.chosenFruit && this.state.chosenFruit.owned
                  ? `https://${this.state.chosenFruit.image}`
                  : "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=679881927,2934882074&fm=115&gp=0.jpg"
              }
            />
          </View>
          <View className='detail-info'>
            <View>
              <Text className='bold-text'>名字：</Text>
              {this.state.chosenFruit && this.state.chosenFruit.owned ? this.state.chosenFruit.name : "???"}
            </View>
            <View>
              <Text className='bold-text'>价值：</Text>
              {this.state.chosenFruit && this.state.chosenFruit.owned ? `${this.state.chosenFruit.value}点能量` : "???"}
            </View>
            <View>
              <Text className='bold-text'>配方：</Text>
              {this.state.chosenFruit && this.state.chosenFruit.owned
                ? this.state.chosenFruit.formula.join("、")
                : "???"}
            </View>
            <View>
              <Text className='bold-text'>描述：</Text>
              {this.state.chosenFruit && this.state.chosenFruit.owned ? this.state.chosenFruit.description : "???"}
            </View>
          </View>
        </View>
        <View className='thumbnail-container'>
          <AtGrid mode='square' hasBorder data={imgArray} columnNum={4} onClick={this.onShowDetail} />
        </View>
      </View>
    )
  }
}

export default Library as ComponentClass<PageOwnProps, PageState>
