import Taro, { Component, Config } from "@tarojs/taro"
import { Provider } from "@tarojs/redux"
import "taro-ui/dist/style/index.scss"

import configStore from "./store/index"
import Index from "./pages/index"

import "./app.less"

const store = configStore()

store.subscribe(() => {
  console.log("state updated")
  console.log(store.getState())
})

class App extends Component {
  config: Config = {
    pages: ["pages/index/index", "pages/library/index"],
    window: {
      navigationBarBackgroundColor: "transparent",
      navigationBarTitleText: "Tomato-App",
      navigationBarTextStyle: "black",
      backgroundTextStyle: "light",
    },
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById("app"))
