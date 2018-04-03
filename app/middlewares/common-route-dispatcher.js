/**
 * Route Dispatcher
 */
const path = require('path');
const config = require('../config');
const routes = require('../routes/registry');
const Router = require('koa-router');
const routeDispatcher = new Router();

_.map(routes, (route, subPath) => {

	const router = new Router();

	// sub route register
	require(path.join(config.SERVER_ROOT_PATH, 'routes', route))(router);

	let routePath;

	// ignore `config.ROUTE_BASE_PATH` if `subPath` begin with `~`
	if (subPath[0] === '~') {
		routePath = subPath.slice(1);
	} else {
		routePath = config.ROUTE_BASE_PATH + subPath;
	}

	// route register--`routePath + router.routes()`
	routeDispatcher.all(routePath, router.routes(), router.allowedMethods());
});

module.exports = routeDispatcher;