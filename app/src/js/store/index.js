import Vue from "vue";
import Vuex from "vuex";

// store modules
import Sample from "./modules/sample.js";
import Items from "./modules/items.js";
import User from "./modules/user.js";


// store plugins
import SavePlugin from "./plugins/save.js";

const ENV = process.env.NODE_ENV;
let VUEX_STRICT = false;
if(ENV !== "production"){
  VUEX_STRICT = true;
}

Vue.use(Vuex);

export default  new Vuex.Store({
  strict: VUEX_STRICT,
  modules: {
    user: User,
    items: Items,
    sample: Sample
  },
  plugins: [
    SavePlugin
  ]
});