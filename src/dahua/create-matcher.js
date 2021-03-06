import isNotDef from "lodash.isundefined";
import Regexp from "path-to-regexp";

export function createMatcher(routes, router) {
  const { pathMap } = createRouteMap(routes);
  return createRoute(pathMap);
}

function createRouteMap(routes, oldPathMap) {
  const pathMap = oldPathMap || new Map();
  routes.forEach(route => {
    const matchArr = [];
    addRouteRecord(pathMap, matchArr, route);
  });
  return {
    pathMap
  };
}

function createRoute(pathMap) {
  for (let key of pathMap.keys()) {
    const value = pathMap.get(key);
    let v = value[0];
    while (!isNotDef(v.parent)) {
      value.unshift(v.parent);
      v = v.parent;
    }
    pathMap.set(key, value);
  }
  return pathMap;
}

function addRouteRecord(pathMap, matchArr, route, parent) {
  const { path, component } = route;
  const normalizedPath = normalizePath(path, parent);
  const record = {
    path: normalizedPath,
    regex: Regexp(normalizedPath, []),
    component,
    parent
  };

  if (!isNotDef(route.children)) {
    route.children.forEach(child => {
      const matchArr = [];
      addRouteRecord(pathMap, matchArr, child, record);
    });
  }
  matchArr.push(record); // depth

  if (!pathMap.has(normalizedPath)) {
    pathMap.set(normalizedPath, matchArr.reverse());
  }
}

// 格式化path
function normalizePath(path, parent) {
  if (path[0] === "/") return path;
  if (isNotDef(parent)) return path;
  return `${parent.path}/${path}`.replace(/\/\//g, "/");
}

/**
 * record
 {
   parent,
   path,
   component,
   regexp
 }
 */
