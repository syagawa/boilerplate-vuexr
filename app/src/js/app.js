import Vue from "vue";
import { sync } from "vuex-router-sync";
import store from "./store";
import container from "./components/container.vue";
import router from "./router.js";
import noneed from "./helpers/noneed.js";

// load font
import font from "./font.js";


sync(store, router);

new Vue({
  router,
  store,
  created(){
    console.log("created in app");
    console.log(noneed.test());
  },
  mounted(){
    console.log("mounted in app");
  },
  render(h){
    return h(container);
  }
}).$mount("#mount");
