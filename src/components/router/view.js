import Vue from "vue";
import history from "./history";
import routes from "./routes";

Vue.component("router-view", {
  data() {
    return {
      location: history.location,
      unlisten: null
    };
  },
  mounted() {
    this.unlisten = history.listen((location, action) => {
      this.location = location;
    });
  },
  destroyed() {
    this.unlisten && this.unlisten();
  },
  computed: {
    ViewComponent() {
      return routes[this.location.pathname];
    }
  },
  render(h) {
    return h(this.ViewComponent);
  }
});
