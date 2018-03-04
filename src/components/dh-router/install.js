import Link from "./components/link";
import View from "./components/view";
import _ from "lodash";

export function install(Vue) {
  if (install.installed) {
    return;
  }
  install.installed = true;

  Vue.mixin({
    beforeCreate() {
      if (!_.isUndefined(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        const location = {
          ...location,
          matched: this._router.match(
            this._router.options,
            this._router.history.location
          ).matched
        };
        Vue.util.defineReactive(this, "_route", location);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
    }
  });

  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._routerRoot._router;
    },
    set() {}
  });
  Object.defineProperty(Vue.prototype, "$route", {
    get() {
      return this._routerRoot._route;
    },
    set() {}
  });
  // registry global component
  Vue.component("RouterLink", Link);
  Vue.component("RouterView", View);
}
