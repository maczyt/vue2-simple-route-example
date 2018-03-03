import history from "../history";

export default {
  name: "RouterView",
  data() {
    return {
      unlisten: null,
      location: this.$router.location
    };
  },
  mounted() {
    this.unlisten = history.listen((location, actions) => {
      this.$router.location = this.location = location;
    });
  },
  destroyed() {
    this.unlisten && this.unlisten();
  },
  computed: {
    ViewComponet() {
      const router = this.$router;
      const routes = router.routes;
      const component = (
        routes.filter(route => {
          return route.path === this.location.pathname;
        })[0] || { component: null }
      ).component;
      return component;
    }
  },
  render(h) {
    return h(this.ViewComponet);
  }
};
