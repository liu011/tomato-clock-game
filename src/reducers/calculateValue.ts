import { CALCULATE_FRUIT_VALUE, CALCULATE_INGREDIENT_EXPENSE } from "../constants/calculateValue"
import { Fruit } from "../types/type"

const INIT_STATE = {
  optionsA: [
    { name: "阳光", expense: 0 },
    { name: "a02", expense: 2 },
    { name: "a03", expense: 4 },
    { name: "a04", expense: 8 },
  ],
  optionsB: [
    { name: "雨水", expense: 0 },
    { name: "b02", expense: 2 },
    { name: "b03", expense: 4 },
    { name: "b04", expense: 8 },
  ],
  optionsC: [
    { name: "普通泥土", expense: 0 },
    { name: "c02", expense: 2 },
    { name: "c03", expense: 4 },
    { name: "c04", expense: 8 },
  ],
  fruits: [
    {
      name: "红色的番茄",
      value: 1,
      formula: ["阳光", "雨水", "普通泥土"],
      image:
        "timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561205993097&di=a2a448f95450a998e2eb57c816a0bf82&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F62%2F62%2F59fc519e871ab_610.jpg",
    },
    {
      name: "果实02",
      value: 2,
      formula: ["a02", "b01", "c01"],
      image:
        "timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561205993097&di=a2a448f95450a998e2eb57c816a0bf82&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F62%2F62%2F59fc519e871ab_610.jpg",
    },
    {
      name: "果实03",
      value: 3,
      formula: ["a01", "b02", "c01"],
      image:
        "timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561205993097&di=a2a448f95450a998e2eb57c816a0bf82&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F62%2F62%2F59fc519e871ab_610.jpg",
    },
    {
      name: "果实04",
      value: 4,
      formula: ["a01", "b01", "c02"],
      image:
        "timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561205993097&di=a2a448f95450a998e2eb57c816a0bf82&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F62%2F62%2F59fc519e871ab_610.jpg",
    },
    {
      name: "果实05",
      value: 5,
      formula: ["a01", "b01", "c01"],
      image:
        "timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561205993097&di=a2a448f95450a998e2eb57c816a0bf82&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F62%2F62%2F59fc519e871ab_610.jpg",
    },
    {
      name: "果实06",
      value: 6,
      formula: ["a02", "b02", "c01"],
      image:
        "timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561205993097&di=a2a448f95450a998e2eb57c816a0bf82&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F62%2F62%2F59fc519e871ab_610.jpg",
    },
    {
      name: "果实07",
      value: 7,
      formula: ["a02", "b01", "c02"],
      image:
        "timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561205993097&di=a2a448f95450a998e2eb57c816a0bf82&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F62%2F62%2F59fc519e871ab_610.jpg",
    },
    {
      name: "果实08",
      value: 8,
      formula: ["a02", "b01", "c01"],
      image:
        "timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561205993097&di=a2a448f95450a998e2eb57c816a0bf82&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F62%2F62%2F59fc519e871ab_610.jpg",
    },
    {
      name: "果实09",
      value: 9,
      formula: ["a01", "b02", "c01"],
      image:
        "timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561205993097&di=a2a448f95450a998e2eb57c816a0bf82&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F62%2F62%2F59fc519e871ab_610.jpg",
    },
    {
      name: "果实10",
      value: 10,
      formula: ["a01", "b01", "c02"],
      image:
        "timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561205993097&di=a2a448f95450a998e2eb57c816a0bf82&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F62%2F62%2F59fc519e871ab_610.jpg",
    },
  ],
}

/*
  如果lodash配不好，map不能用，就把 fruit 改成 array
*/
const calculateValueReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CALCULATE_FRUIT_VALUE:
      let fruit: Fruit = state.fruits[0]
      state.fruits.map(f => {
        if (f.formula === action.value) {
          fruit = f
        }
      })
      return {
        ...state,
        thisFruit: fruit,
      }
    case CALCULATE_INGREDIENT_EXPENSE:
      let cost = 0
      state.optionsA.map(option => {
        if (option.name === action.payload[0]) {
          cost += option.expense
        }
      })
      state.optionsB.map(option => {
        if (option.name === action.payload[1]) {
          cost += option.expense
        }
      })
      state.optionsC.map(option => {
        if (option.name === action.payload[2]) {
          cost += option.expense
        }
      })
      return {
        ...state,
        ingredientExpense: cost,
      }
    default:
      return state
  }
}

export default calculateValueReducer
