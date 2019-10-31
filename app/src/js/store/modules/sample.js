//helpers
import auth from "../../api/auth.js";

const state = {
  str: "Sample in other sample"
};
const getters = {
  currentSample(state){
    return state.str;
  }
};
const mutations = {
  setSample(state, { data }){
    state.str = data;
  }
};
const actions = {
  changeSample({ state, commit }, { newsample }){
    commit("setSample", { data: newsample });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};