import Link from "./components/link";
import View from "./components/view";
import _ from "lodash";
import warning from "warning";
import history from "./history";

class Router {
  constructor(options) {
    warning(!_.isUndefined(options), "options not be null");
    const { routes } = options;
    warning(_.isArray(routes), "routes must be an array");
    this.__version__ = "1.0.0";
    this.routes = routes;
    this.location = history.location;
  }
}

Router.install = (Vue, options) => {
  // registry global component
  Vue.component("RouterLink", Link);
  Vue.component("RouterView", View);
};

export default Router;
