import Link from "./components/link";
import View from "./components/view";
import isNotDef from "lodash.isundefined";

export function install(Vue) {
  Vue.mixin({
    beforeCreate() {
      // 根root组件(Vue实例)
      if (!isNotDef(this.$options.router)) {
        this._rootRouter = this;
        this._router = this.$options.router;
        // 注册root vue组件到该Router中
        this._router.init(this);
        // 对vue组件增加响应式_route变量
        Vue.util.defineReactive(this, "_route", this._router.history.location);
      } else {
        // 子组件
        // 一层层递归，子组件总是等于父组件的_rootRouter, 最终只有一个_rootRouter
        this._rootRouter = (this.$parent && this.$parent._rootRouter) || this;
      }
    }
  });

  // 给每个vue组件绑定$router
  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._rootRouter._router;
    }
  });
  // 给每个vue组件绑定$route
  Object.defineProperty(Vue.prototype, "$route", {
    get() {
      return this._rootRouter._route;
    }
  });
  // 给每个vue组件绑定$matched
  Object.defineProperty(Vue.prototype, "$matched", {
    get() {
      return this._rootRouter._matched;
    }
  });

  Vue.component("RouterLink", Link);
  Vue.component("RouterView", View);
}
