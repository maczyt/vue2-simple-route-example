import Vue from "vue";
import { install } from "./install";
import { createBrowserHistory } from "history";
import { createMatcher } from "./create-matcher";

/**
 * Dahua Router
 */
class Dahua {
  constructor(options = {}) {
    this.apps = [];
    this.app = null;
    this.options = options;
    this.mode = "history";
    this.history = createBrowserHistory();
    // 创建routes matched片段
    this.matched = createMatcher(options.routes || [], this);
  }
  init(app) {
    this.apps.push(app);
    if (this.app) {
      return;
    }
    this.app = app;
    app._matched = this.matched;
    console.log(this.matched);
    const history = this.history;
    history.listen(route => {
      this.apps.forEach(app => {
        app._route = route;
      });
    });
  }

  push(path, state) {
    this.history.push(path, state);
  }

  replace(path, state) {
    this.history.replace(path, state);
  }

  go(n) {
    this.history.go(n);
  }

  back() {
    this.history.goBack();
  }

  forward() {
    this.history.goForward();
  }
}

Dahua.install = install;

export default Dahua;
