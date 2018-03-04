import _ from "lodash";
import warning from "warning";
import { createBrowserHistory } from "history";
import { createMatcher } from "./create-matcher";
import { install } from "./install";

class Router {
  constructor(options = {}) {
    this.app = null;
    this.apps = [];
    this.options = options;

    // hooks start
    // hooks end
    this.mode = "history"; // html5 history
    this.history = createBrowserHistory();
    window.History = this.history;
    this.matcher = createMatcher(options.routes || [], this);
    this.__version__ = "1.0.0";
  }

  match(raw, location) {
    return this.matcher.match(raw, location);
  }

  init(app) {
    this.apps.push(app);
    if (this.app) {
      return;
    }
    this.app = app;
    const history = this.history;

    history.listen((location, action) => {
      this.apps.forEach(app => {
        app._route = location;
      });
    });
  }

  push(path, state) {
    this.history.push(path, state);
  }

  replace(path, state) {
    this.history.push(path, state);
  }

  go(n) {
    this.history.go(n);
  }

  goBack() {
    this.history.goBack();
  }

  goForward() {
    this.history.goForward();
  }

  resolve() {
    console.log("excute");
  }
}

Router.install = install;

export default Router;
