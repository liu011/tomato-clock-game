import { action } from "typesafe-actions"
import { UPDATE_STATUS, UPDATE_COINS } from "../constants/updateGameStatus"

export const onUpdateCoins = coinNumber => {
  return action(UPDATE_COINS, coinNumber)
}

export const onUpdateStatus = newStatus => {
  return action(UPDATE_STATUS, newStatus)
}
