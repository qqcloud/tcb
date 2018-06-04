const path = require('path');
const config = require('../../config/index');
const routes = require('../routes/index');
const Router = require('koa-router');
const routeDispatcher = new Router();

/**
 * Route dispatcher middleware
 * @module app/middlewares/common-route-dispatcher
 */

/**
 * [description]
 * @author jerishi
 * @DateTime 2018-06-04
 * @param    {Object}   routesConf route config
 * @return   {Function}	   route middleware
 */
module.exports = ((routesConf) => {
	_.map(routesConf, (subRoute, subPath) => {
		const router = new Router();
		// sub route register
		subRoute(router);

		let routePath;
		// ignore `config.ROUTE_BASE_PATH` if `subPath` begin with `~`
		if (subPath[0] === '~') {
			routePath = subPath.slice(1);
		} else {
			routePath = config.ROUTE_BASE_PATH + subPath;
		}

		// route register--`routePath + router.routes()`
		routeDispatcher.use(routePath, router.routes(), router.allowedMethods());
	});
	return routeDispatcher.routes();
})(routes);