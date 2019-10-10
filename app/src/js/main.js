import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { sync } from "vuex-router-sync";

//module components
import StartComponent from "./vuecomponents/start.vue";
import FooterComponent from "./vuecomponents/footer.vue";

//util
import storage from "./storage.js";

(function(){

  const ENV = process.env.NODE_ENV;
  let VUEX_STRICT = false;
  if(ENV !== "production"){
    VUEX_STRICT = true;
  }

  Vue.use(Vuex);
  Vue.use(VueRouter);

  const mapGetters = Vuex.mapGetters;
  const mapState = Vuex.mapState;

  const storePlugin = function(store){
    const save = function(state){
      storage.set(
        "state",
        {
          sample: state.sample
        }
      )
    };
    store.subscribe(function(mutation, state){
      if(mutation.type === "setSample"){
        save(state);
      }
    });
  };

  const store = new Vuex.Store({
    strict: VUEX_STRICT,
    state: {
      sample: "sample string"
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
        if(state.sample !== newsample){
          commit("setSample", { data: newsample });
        }
      },
      created(){
        console.info("created");
      },
      mounted(){
        console.info("mounted");
      }
    },
    plugins: [
      storePlugin
    ]
  });

  const routes = [
    { path: "/", redirect: { name: "start"} },
    {
      path: "/start",
      name: "start",
      components: {
        default: StartComponent
      }
    },
    {
      path: "/start2",
      name: "start2",
      components: {
        default: StartComponent,
        footer: FooterComponent
      }
    }

  ];
  const router = new VueRouter({
    routes: routes
  });
  sync(store, router);

  const app = new Vue({
    router,
    store,
    computed: {
      ...mapGetters({
        currentSample: "currentSample"
      })
    },
    methods: {

    },
    created(){
      this.$store.dispatch("created");
    },
    mounted(){
      this.$store.dispatch("mounted");
    }
  }).$mount("#app");

})();

