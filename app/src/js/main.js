import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { sync } from "vuex-router-sync";

//module components
import StartComponent from "./vuecomponents/start.vue";
import SubComponent from "./vuecomponents/sub.vue";
import ItemsComponent from "./vuecomponents/items.vue";
import ItemComponent from "./vuecomponents/item.vue";

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
      ]
    },
    getters: {
      currentSample(state){
        return state.sample;
      },
      currentItems(state){
        return state.items;
      }
    },
    mutations: {
      setSample(state, { data }){
        state.sample = data;
      },
      addItem(state, {item}){
        state.items.push(item);
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
    data: {
      name: "Small App",
      ...mapState({
        get_my_name(state){
          return `${this.name} call ${state.name} in DATA`;
        }
      }),
      ...mapGetters([
        "currentSample",
        "currentItems"
      ])
    },
    computed: {
      ...mapState({
        myname(state){
          return `${this.name} call ${state.name} in COMPUTED`;
        }
      }),
      ...mapGetters({
        currentSample_other_name: "currentSample"
      })
    },
    methods: {
      ...mapState({
        getMyName(state){
          return `${this.name} call ${state.name} in METHOD`;
        }
      })
    },
    created(){
      this.$store.dispatch("created");
    },
    mounted(){
      this.$store.dispatch("mounted");
    }
  }).$mount("#app");

})();

