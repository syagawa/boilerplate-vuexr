import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { sync } from "vuex-router-sync";

//module components
// import StartComponent from "./vuecomponents/start.vue";
// import SubComponent from "./vuecomponents/sub.vue";
// import ItemsComponent from "./vuecomponents/items.vue";
// import ItemComponent from "./vuecomponents/item.vue";
// import ItemEditComponent from "./vuecomponents/itemedit.vue";
// import ItemPrivateComponent from "./vuecomponents/itemprivate.vue";
// import ErrorComponent from "./vuecomponents/error.vue";



// import "core-js/modules/es6.promise";
// import "core-js/modules/es6.array.iterator";
const StartComponent = () => import(/* webpackPrefetch: true */"./vuecomponents/start.vue");
const SubComponent = () => import(/* webpackPrefetch: true */"./vuecomponents/sub.vue");
const ItemsComponent = () => import(/* webpackPrefetch: true */"./vuecomponents/items.vue");
const ItemComponent = () => import(/* webpackPrefetch: true */"./vuecomponents/item.vue");
const ItemEditComponent = () => import(/* webpackPrefetch: true */"./vuecomponents/itemedit.vue");
const ItemPrivateComponent = () => import(/* webpackPrefetch: true */"./vuecomponents/itemprivate.vue");
const ErrorComponent = () => import(/* webpackPrefetch: true */"./vuecomponents/error.vue");


// const ErrorComponent = () => import("./vuecomponents/error.vue");

// store modules
import SampleNameSpaced from "./sample_namespaced.js";
import Sample from "./sample.js";

//util
import storage from "./storage.js";
import auth from "./auth.js";

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
  const mapMutations = Vuex.mapMutations;
  const mapActions = Vuex.mapActions;

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
    modules: {
      basic: {
        state: {
          sample: "sample string",
          name: "A Big Store",
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
          ],
          maindata: null
        },
        getters: {
          currentSample(state){
            return state.sample;
          },
          currentItems(state){
            return state.items;
          },
          isAlreadyGotData(state){
            return state.maindata ? true : false;
          }
        },
        mutations: {
          setSample(state, { data }){
            state.sample = data;
          },
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
          },
          setData(state, data){
            state.maindata = data;
          }
        },
        actions: {
          changeSample({ state, commit }, { newsample }){
            if(state.sample !== newsample){
              commit("setSample", { data: newsample });
            }
          },
          addItem({state, commit}, {item}){
            commit("addItem", {item});
          },
          setData({ commit }, { data }){
            commit("setData", data);
          },
          created(){
            console.info("created in store action");
          },
          mounted(){
            console.info("mounted in store action");
          }
        }
      },
      sample_ns: SampleNameSpaced,
      sample_nns: Sample
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
        sub: SubComponent
      }
    },
    {
      path: "/items",
      name: "items",
      components: {
        default: ItemsComponent
      }
    },
    {
      path: "/items/:id",
      name: "item",
      components: {
        default: ItemComponent
      },
      props: {
        default: true
      },
      children: [
        {
          path: "edit",
          name: "itemedit",
          components: {
            nestchild: ItemEditComponent
          }
        },
        {
          path: "private",
          name: "itemprivate",
          components: {
            nestchild: ItemPrivateComponent
          },
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: "/error",
      name: "error",
      components: {
        default: ErrorComponent
      }
    },
    {
      path: "*",
      name: "other",
      redirect(to){
        console.log("in other route", to);
        const rand = Math.random();
        if(rand > 0.5){
          return "/error";
        }else{
          return "/";
        }
      }
    }
  ];
  const router = new VueRouter({
    routes: routes
  });

  router.beforeEach(function(to, from, next){
    console.log("in beforeEach global to", to);
    console.log("in beforeEach global from", from);
    
    if(to.meta.requireAuth){
      if(!auth.isLoggiend(to.params.id)){
        next({name: "error"});
      }
    }
    next();
  });
  sync(store, router);

  const app = new Vue({
    router,
    store,
    data: {
      name: "Small App"
    },
    computed: {
    },
    methods: {
    },
    created(){
      console.log("created in app");
      this.$store.dispatch("created");
    },
    mounted(){
      console.log("mounted in app");
      this.$store.dispatch("mounted");
    }
  }).$mount("#app");

})();

