//helpers
import auth from "../../api/auth.js";

const state = {
  items: [
    {
      id: 1,
      name: "aaa"
    },
    {
      id: 2,
      name: "bbb"
    },
    {
      id: 3,
      name: "ccc"
    },
    {
      id: 4,
      name: "ddd"
    },
    {
      id: 5,
      name: "eee"
    }
  ]
};
const getters = {
  currentItems(state){
    return state.items;
  }
};
const mutations = {
  addItem(state, {item}){
    state.items.push(item);
  },
  changeItem(state, { name, id }){
    const item = state.items.find(function(elm){
      return elm.id === id;
    });
    if(!item){
      return;
    }
    item.name = name;
  }
};
const actions = {
  addItem({state, commit}, {item}){
    commit("addItem", {item});
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
