export default {
  name: "RouterView",
  functional: true,
  render(h, { props, parent, children, data }) {
    const route = parent.$route;
    const router = parent.$router;
    let matched = {};
    console.log(router, route);
    /*router.routes.forEach(r => {
      if (r.path === route.pathname) {
        matched = r;
      }
    });*/
    const component = matched.component;
    return h(component, data, children);
  }
};
