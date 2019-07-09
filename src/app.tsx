import Taro, { Component, Config } from "@tarojs/taro"
import { Provider } from "@tarojs/redux"
import "taro-ui/dist/style/index.scss"

import configStore from "./store/index"
import Welcome from "./pages/welcome"

import "./app.less"

const store = configStore()

/*
store.subscribe(() => {
  console.log("state updated")
  console.log(store.getState())
})
*/

class App extends Component {
  config: Config = {
    pages: ["pages/welcome/index", "pages/index/index", "pages/library/index"],
    window: {
      navigationBarBackgroundColor: "transparent",
      navigationBarTitleText: "种番茄的番茄钟",
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
        <Welcome />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById("app"))
