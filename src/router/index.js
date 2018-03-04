import Test1 from "../components/Test1";
import Test2 from "../components/Test2";
const routes = [
  {
    path: "/test1",
    component: Test1,
    children: [
      {
        path: ":id",
        component: {
          template: "<h2>sdsd</h2>"
        }
      }
    ]
  },
  {
    path: "/test2",
    component: Test2
  }
];

export default routes;
