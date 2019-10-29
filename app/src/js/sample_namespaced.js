const sample = {
  namespaced: true,
  state: {
    sample: "Sample in other sample"
  },
  getters: {
    currentSample(state){
      return state.sample;
    }
  },
  mutations: {
    setSample(state, { data }){
      state.sample = data;
    }
  },
  actions: {
    changeSample({ state, commit }, { newsample }){
      commit("setSample", { data: newsample });
    }
  }
};

export default sample;