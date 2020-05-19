import Vue from "vue";
import VueRouter from "vue-router";
import auth from "./helpers/auth.js";

const HeaderComponent = () => import("./components/header.vue");
const FooterComponent = () => import("./components/footer.vue");
const StartComponent = () => import("./components/start.vue");
const SubComponent = () => import("./components/sub.vue");
const ItemsComponent = () => import("./components/items.vue");
const ItemComponent = () => import("./components/item.vue");
const ItemEditComponent = () => import("./components/itemedit.vue");
const ItemPrivateComponent = () => import("./components/itemprivate.vue");
const ErrorComponent = () => import("./components/error.vue");


console.log("ItemComponent", ItemComponent);


Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: { name: "start"} },
  {
    path: "/start",
    name: "start",
    components: {
      main: StartComponent
    }
  },
  {
    path: "/start2",
    name: "start2",
    components: {
      header: HeaderComponent,
      footer: FooterComponent,
      main: StartComponent,
      sub: SubComponent
    }
  },
  {
    path: "/items",
    name: "items",
    components: {
      header: HeaderComponent,
      footer: FooterComponent,
      main: ItemsComponent
    }
  },
  {
    path: "/items/:id",
    name: "item",
    components: {
      header: HeaderComponent,
      footer: FooterComponent,
      main: ItemComponent
    },
    props: {
      main: true
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
      main: ErrorComponent
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

  // write check code

  // check in router
  if(to.meta.requireAuth){
    auth.isLoggined(to.params.id)
      .catch(function(err){
        console.log("error in g");
        next({name: "error"});
      })
      .then(function(res){
        next();
      });

    }else{
    next();
  }

});

export default router;
