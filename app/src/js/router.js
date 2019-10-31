import Vue from "vue";
import VueRouter from "vue-router";
import auth from "./api/auth.js";

const HeaderComponent = () => import("./_components/header.vue");
const FooterComponent = () => import("./_components/footer.vue");
const StartComponent = () => import("./_components/start.vue");
const SubComponent = () => import("./_components/sub.vue");
const ItemsComponent = () => import("./_components/items.vue");
const ItemComponent = () => import("./_components/item.vue");
const ItemEditComponent = () => import("./_components/itemedit.vue");
const ItemPrivateComponent = () => import("./_components/itemprivate.vue");
const ErrorComponent = () => import("./_components/error.vue");

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
