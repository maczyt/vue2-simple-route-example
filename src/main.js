// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Router from "@/components/dh-router";
// import "@/components/router";

Vue.config.productionTip = false;
Vue.use(Router);
import routes from "@/router";
const router = new Router({
  routes
});
Vue.prototype.$router = router;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
