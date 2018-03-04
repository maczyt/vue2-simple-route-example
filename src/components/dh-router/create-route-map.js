import _ from "lodash";
import Regexp from "path-to-regexp";

export function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap) {
  const pathList = oldPathList || [];
  const pathMap = oldPathMap || {};
  const nameMap = oldNameMap || {};
  routes.forEach(route => {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });
  return {
    pathList,
    pathMap,
    nameMap
  };
}

function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
  const { path, name } = route;
  const pathToRegexpOptions = route.pathToRegexpOptions || {};
  const normalizedPath = normalizePath(path, parent);

  const record = {
    path: normalizedPath,
    regexp: Regexp(normalizedPath, []),
    component: route.component,
    name,
    parent,
    matchAs
  };

  if (route.children) {
    route.children.forEach(child => {
      addRouteRecord(pathList, pathMap, nameMap, child, record);
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }
}

function normalizePath(path, parent) {
  if (_.isUndefined(parent)) {
    return path;
  } else {
    return `${parent.path}/${path}`;
  }
}
