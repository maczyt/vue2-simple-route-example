import isNotDef from "lodash.isundefined";
import Regexp from "path-to-regexp";

export default {
  name: "RouterView",
  functional: true,
  render(h, { props, parent, data, children }) {
    // 表示这个渲染的vue组件是routerview方式
    data.routerView = true;
    const route = parent.$route;
    const matched = parent.$matched;

    let depth = 0;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      // vue组件获取父组件方式
      parent = parent.$parent;
    }
    let key;
    for (let k of matched.keys()) {
      if (Regexp(k, []).test(route.pathname)) {
        key = k;
      }
    }
    if (isNotDef(key)) {
      return h();
    } else {
      const match = matched.get(key);
      const component = match[depth].component;
      return h(component, data, children);
    }
  }
};
