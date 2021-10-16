import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/doc",
    name: "Doc",
    component: () => import("../views/doc/Doc.vue"),
  },
  {
    path: "/demo",
    name: "Demo",
    component: () => import("../views/demo/Demo.vue"),
  },
  {
    path: "/update",
    name: "Update",
    component: () => import("../views/update/Update.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
