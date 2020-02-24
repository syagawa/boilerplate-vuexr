//helpers
import auth from "../../helpers/auth.js";

const state = {
  items: [
    {
      id: 1,
      name: "item_a"
    },
    {
      id: 2,
      name: "item_b"
    },
    {
      id: 3,
      name: "item_c"
    },
    {
      id: 4,
      name: "item_d"
    },
    {
      id: 5,
      name: "item_e"
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
