import { CALCULATE_FRUIT_VALUE, CALCULATE_INGREDIENT_EXPENSE, UPDATE_OWNED_FRUIT } from "../constants/calculateValue"
import { Fruit } from "../types/type"

const INIT_STATE = {
  optionsA: [
    { name: "番茄种子", expense: 0 },
    { name: "钱包里的种子", expense: 1 },
    { name: "混合种子", expense: 2 },
    { name: "BT种子", expense: 4 },
    { name: "开心果", expense: 6 },
    { name: "丧尸晶核", expense: 8 },
    { name: "蠢蠢的种子", expense: 10 },
    { name: "种子队", expense: 12 },
    { name: "妙蛙种子", expense: 15 },
  ],
  optionsB: [
    { name: "雨水", expense: 0 },
    { name: "珍贵之水", expense: 1 },
    { name: "自来水", expense: 1 },
    { name: "眼药水", expense: 2 },
    { name: "鞋子上的露水", expense: 2 },
    { name: "水群", expense: 4 },
    { name: "电池漏液", expense: 6 },
    { name: "运动饮料", expense: 8 },
    { name: "圣水", expense: 10 },
    { name: "变异药水", expense: 12 },
    { name: "水波动", expense: 12 },
    { name: "人鱼之泪", expense: 15 },
  ],
  optionsC: [
    { name: "普通泥土", expense: 0 },
    { name: "辐射土壤", expense: 1 },
    { name: "优质泥土", expense: 2 },
    { name: "鞋子上的泥土", expense: 4 },
    { name: "臭臭泥", expense: 6 },
    { name: "沙土", expense: 8 },
    { name: "泥土方块", expense: 10 },
    { name: "铁轨旁的泥土", expense: 15 },
  ],
  fruits: [
    {
      id: 0,
      name: "快乐的红番茄",
      value: 2,
      formula: ["番茄种子", "雨水", "普通泥土"],
      image: "i.loli.net/2019/07/06/5d208d8abb3c257184.png",
      owned: false,
      description: "这是一只快乐的红番茄，无论多糟糕的配方都能轻易种出来，所以它总是很快乐。",
    },
    {
      id: 1,
      name: "生气的番茄",
      value: 10,
      formula: ["番茄种子", "雨水", "臭臭泥"],
      image: "i.loli.net/2019/07/06/5d208d7b114fb78759.png",
      owned: false,
      description: "它生气只可能是因为臭臭泥吧。",
    },
    {
      id: 2,
      name: "哭泣的番茄",
      value: 4,
      formula: ["番茄种子", "眼药水", "普通泥土"],
      image: "i.loli.net/2019/07/06/5d208d9a66b0741877.png",
      owned: false,
      description: "它并不想哭，只是滴了眼药水。",
    },
    {
      id: 3,
      name: "番茄娘",
      value: 10,
      formula: ["BT种子", "自来水", "辐射土壤"],
      image: "i.loli.net/2019/07/06/5d208d6b1870e20523.png",
      owned: false,
      description: "“主人，您要吃我吗？”",
    },
    {
      id: 4,
      name: "番茄人鱼公主",
      value: 30,
      formula: ["番茄种子", "人鱼之泪", "沙土"],
      image: "i.loli.net/2019/07/06/5d208d41d87c020122.png",
      owned: false,
      description: "传说人鱼公主上岸的第一天就爱上了番茄。",
    },
    {
      id: 5,
      name: "番茄拖孩",
      value: 10,
      formula: ["番茄种子", "鞋子上的露水", "鞋子上的泥土"],
      image: "i.loli.net/2019/07/06/5d208d5b28f2d48321.png",
      owned: false,
      description: "这是一双有着可爱的番茄装饰的拖鞋。",
    },
    {
      id: 6,
      name: "番茄熊猫人",
      value: 15,
      formula: ["开心果", "水群", "普通泥土"],
      image: "i.loli.net/2019/07/06/5d208daa1369a92787.png",
      owned: false,
      description: "[回复:表情包_01.jpg]。",
    },
    {
      id: 7,
      name: "摘下耳机的番茄熊猫人",
      value: 18,
      formula: ["开心果", "水群", "优质泥土"],
      image: "i.loli.net/2019/07/06/5d208dc8a96e287567.png",
      owned: false,
      description: "[回复:表情包_02.jpg]",
    },
    {
      id: 8,
      name: "上电视的番茄",
      value: 10,
      formula: ["番茄种子", "电池漏液", "辐射土壤"],
      image: "i.loli.net/2019/07/06/5d208d291d3a464967.png",
      owned: false,
      description: "“妈妈，我上电视了！！”",
    },
    {
      id: 9,
      name: "番茄货币",
      value: 6,
      formula: ["钱包里找出来的番茄种子", "自来水", "优质泥土"],
      image: "i.loli.net/2019/07/06/5d208ecc1a38b57465.png",
      owned: false,
      description: "不知道这种货币到底在哪个国家通行。",
    },
    {
      id: 10,
      name: "圣女果",
      value: 15,
      formula: ["混合种子", "圣水", "普通泥土"],
      image: "i.loli.net/2019/07/06/5d208dd7bb49633306.png",
      owned: false,
      description: "一口一个刚刚好（。",
    },
    {
      id: 11,
      name: "妙蛙番茄",
      value: 40,
      formula: ["妙蛙种子", "水波动", "臭臭泥"],
      image: "i.loli.net/2019/07/06/5d208def84ff759515.png",
      owned: false,
      description: "第三次进化就变成了这个亚子。",
    },
    {
      id: 12,
      name: "蠢蠢的番茄",
      value: 32,
      formula: ["蠢蠢的番茄种子", "雨水", "铁轨旁的泥土"],
      image: "i.loli.net/2019/07/06/5d208e14c5d8848899.png",
      owned: false,
      description: "dumb ways to die, so many dumb ways to die...",
    },
    {
      id: 13,
      name: "Minecraft番茄",
      value: 15,
      formula: ["番茄种子", "雨水", "泥土方块"],
      image: "i.loli.net/2019/07/06/5d208dffa30ec48540.png",
      owned: false,
      description: "应该可以用它和村民做交易吧。",
    },
    {
      id: 14,
      name: "番茄僵尸",
      value: 12,
      formula: ["丧尸晶核", "雨水", "普通泥土"],
      image: "i.loli.net/2019/07/06/5d208eddc6c7435824.png",
      owned: false,
      description: "它只在植物大战僵尸的隐藏关卡中出现。",
    },
    {
      id: 15,
      name: "番茄娃",
      value: 10,
      formula: ["BT种子", "自来水", "优质泥土"],
      image: "i.loli.net/2019/07/06/5d208eba2702874722.png",
      owned: false,
      description: "番茄娃，番茄娃，一棵藤上只有它。",
    },
    {
      id: 16,
      name: "隐形的番茄",
      value: 18,
      formula: ["番茄种子", "变异药水", "优质泥土"],
      image: "i.loli.net/2019/07/06/5d208e738b5b228135.jpg",
      owned: false,
      description: "并不是我懒得画，你只是看不见它。",
    },
    {
      id: 17,
      name: "我说它是番茄它就是番茄",
      value: 5,
      formula: ["混合种子", "自来水", "普通泥土"],
      image: "i.loli.net/2019/07/06/5d208db87920d99995.png",
      owned: false,
      description: "我也不知道它为什么长得那么像香蕉啦。",
    },
    {
      id: 18,
      name: "每个足球运动员都应该拥有的番茄",
      value: 28,
      formula: ["种子队", "运动饮料", "优质泥土"],
      image: "i.loli.net/2019/07/06/5d208ef952d8b39390.png",
      owned: false,
      description: "射门！……等下，这是什么鬼！",
    },
    {
      id: 19,
      name: "由于太过珍贵而被偷走的番茄",
      value: 1,
      formula: ["番茄种子", "珍贵之水", "普通泥土"],
      image: "i.loli.net/2019/07/06/5d208f5ab464494284.png",
      owned: false,
      description: "幸好没有连花盆一起偷走。",
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
        if (
          f.formula[0] === action.payload[0] &&
          f.formula[1] === action.payload[1] &&
          f.formula[2] === action.payload[2]
        ) {
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
    case UPDATE_OWNED_FRUIT:
      const id = action.payload
      state.fruits[id].owned = true
      return state
    default:
      return state
  }
}

export default calculateValueReducer
