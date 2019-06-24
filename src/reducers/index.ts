import { combineReducers } from "redux"
import updateGameStatusReducer from "./updateGameStatus"
import calculateValueReducer from "./calculateValue"

const rootReducer = combineReducers({ updateGameStatusReducer, calculateValueReducer })

export default rootReducer
