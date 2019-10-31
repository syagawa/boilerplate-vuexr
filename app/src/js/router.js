import Vue from "vue";
import VueRouter from "vue-router";
import auth from "./api/auth.js";

const HeaderComponent = () => import("./_temp/header.vue");
const FooterComponent = () => import("./_temp/footer.vue");
const StartComponent = () => import("./_temp/start.vue");
const SubComponent = () => import("./_temp/sub.vue");
const ItemsComponent = () => import("./_temp/items.vue");
const ItemComponent = () => import("./_temp/item.vue");
const ItemEditComponent = () => import("./_temp/itemedit.vue");
const ItemPrivateComponent = () => import("./_temp/itemprivate.vue");
const ErrorComponent = () => import("./_temp/error.vue");

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
  
  if(to.meta.requireAuth){
    if(!auth.isLoggiend(to.params.id)){
      next({name: "error"});
    }
  }
  next();
});

export default router;
