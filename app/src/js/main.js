import Vue from "vue";
import { sync } from "vuex-router-sync";
import store from "./store";
import mount from "./_temp/mount.vue";
import router from "./router.js";

sync(store, router);

new Vue({
  router,
  store,
  created(){
    console.log("created in app");
  },
  mounted(){
    console.log("mounted in app");
  },
  render(h){
    return h(mount);
  }
}).$mount("#mount");


