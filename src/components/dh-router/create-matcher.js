import { createRouteMap } from "./create-route-map";

export function createMatcher(routes, router) {
  const { pathList, pathMap } = createRouteMap(routes);
  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }
  function match(routes) {
    const location = router.history.location;
    for (let i = 0; i < pathList.length; i++) {
      const path = pathList[i];
      const record = pathMap[path];
      if (matchRoute(record.regexp, location.pathname)) {
        return _createRoute(record, location);
      }
    }
    return _createRoute(null, location);
  }
  function _createRoute(record, location) {
    return createRoute(record, location, router);
  }
  function matchRoute(regexp, path) {
    return regexp.test(path);
  }
  function createRoute(record, location, router) {
    return {
      location,
      matched: record ? formatMatch(record) : []
    };
  }
  function formatMatch(record) {
    const res = [];
    while (record) {
      res.unshift(record);
      record = record.parent;
    }
    return res;
  }
  return {
    match,
    addRoutes
  };
}
