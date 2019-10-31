import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { sync } from "vuex-router-sync";
import store from "./store";

//helpers
import auth from "./api/auth.js";

const StartComponent = () => import("./vuecomponents/start.vue");
const SubComponent = () => import("./vuecomponents/sub.vue");
const ItemsComponent = () => import("./vuecomponents/items.vue");
const ItemComponent = () => import("./vuecomponents/item.vue");
const ItemEditComponent = () => import("./vuecomponents/itemedit.vue");
const ItemPrivateComponent = () => import("./vuecomponents/itemprivate.vue");
const ErrorComponent = () => import("./vuecomponents/error.vue");


(function(){

  const ENV = process.env.NODE_ENV;
  let VUEX_STRICT = false;
  if(ENV !== "production"){
    VUEX_STRICT = true;
  }

  Vue.use(VueRouter);

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
    },
    mounted(){
      console.log("mounted in app");
    }
  }).$mount("#app");

})();

