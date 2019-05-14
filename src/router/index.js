import Vue from "vue";
import Router from "vue-router";
import { routers } from "./routers";

Vue.use(Router);

const routerConfig = {
  mode: "history",
  base: "/",
  routes: routers
};
const router = new Router(routerConfig);
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  //console.log(to);
  if (from.name !== "login" && to.name !== "login") {
    localStorage.setItem("dms-app-returnURL", from.fullPath !== null ? to.fullPath : from.fullPath);
    localStorage.setItem("dms-app-returnURL", to.fullPath !== null ? to.fullPath : from.fullPath);
  }
  let token = localStorage.getItem("dms-app-token");
  if (to.name !== "login" && to.name !== "register" && !token) {
    next({ name: "login" });
  }
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  /*   if (
      to.name === "companycertificates" &&
      from.name !== "baseinfo" 
    ) {
      next({ name: "page404" });
    }
    if (
      to.name === "agentintention" &&
      from.name !== "companycertificates" 
    ) {
      next({ name: "page404" });
    } */
  if (localStorage.getItem("dms-app-user")) {
    var is_staff = JSON.parse(localStorage.getItem("dms-app-user")).is_staff;
    if (!is_staff) {
      if (to.name === "workflowindex" || to.name === "Distributorinformation" || to.name === "Delegateinformation") {
        next({ name: "page404" });
      }
    }
  }


  next();
});

export default router;
