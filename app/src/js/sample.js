const sample = {
  state: {
    sample_o: "Sample in other sample"
  },
  getters: {
    currentSample_o(state){
      return state.sample_o;
    }
  },
  mutations: {
    setSample_o(state, { data }){
      state.sample_o = data;
    }
  },
  actions: {
    changeSample_o({ state, commit }, { newsample }){
      commit("setSample_o", { data: newsample });
    }
  }
};

export default sample;