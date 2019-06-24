import { UPDATE_COINS, UPDATE_STATUS } from "../constants/updateGameStatus"

const INIT_STATE = {
  coins: 0,
  status: "ready",
}

const updateGameStatusReducer = (state = INIT_STATE, action) => {
  console.log(action)
  switch (action.type) {
    case UPDATE_COINS:
      return {
        ...state,
        coins: state.coins + action.payload,
      }
    case UPDATE_STATUS:
      return {
        ...state,
        status: action.payload,
      }
    default:
      return state
  }
}

export default updateGameStatusReducer
