import { createStore } from "redux"
import rootReducer from "../reducers/index"

const configStore = () => {
  const store = createStore(rootReducer)
  return store
}

export default configStore
