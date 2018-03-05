import Test1 from "../components/Test1";
import Test2 from "../components/Test2";
import Router from "@/dahua";
import Vue from "vue";

Vue.use(Router);

const routes = [
  {
    path: "/test1",
    component: Test1,
    children: [
      {
        path: "id",
        component: {
          template: "<h2>sdsd</h2>"
        }
      },
      {
        path: "ids",
        component: {
          template: "<h2>ids</h2>"
        }
      }
    ]
  },
  {
    path: "/test2",
    component: Test2
  }
];

export default new Router({
  routes
});
