import { action } from "typesafe-actions"
import { CALCULATE_FRUIT_VALUE, CALCULATE_INGREDIENT_EXPENSE } from "../constants/calculateValue"

export const onCalculateFruitValue = (selectorCheckedA: string, selectorCheckedB: string, selectorCheckedC: string) => {
  const ingredient = [selectorCheckedA, selectorCheckedB, selectorCheckedC]
  return action(CALCULATE_FRUIT_VALUE, ingredient)
}

export const onCalculateIngredientExpense = (
  selectorCheckedA: string,
  selectorCheckedB: string,
  selectorCheckedC: string
) => {
  const ingredient = [selectorCheckedA, selectorCheckedB, selectorCheckedC]
  return action(CALCULATE_INGREDIENT_EXPENSE, ingredient)
}
