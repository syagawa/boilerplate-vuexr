//helpers
import auth from "../../api/auth.js";

const state = {
  maindata: null
};
const getters = {
  isAlreadyGotData(state){
    return state.maindata ? true : false;
  }
};
const mutations = {
  setData(state, data){
    state.maindata = data;
  }
};
const actions = {
  setData({ commit }, { data }){
    commit("setData", data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};