const proxy = require('koa-proxies');
const { proxy:proxyConf } = require('../config');
const { env, proxyService } = require('../../config');

/**
 * Service proxy middleware
 * @module app/middlewares/service-proxy
 */

/**
 * Add service proxy
 * @author jerishi
 * @DateTime 2018-05-30
 * @param    {Function}   app   app
 */
module.exports = (app) => {
	if((env !== 'prd' || env !== 'local') && proxyService === 1) {
		_.each(proxyConf, (conf, route) => {
			if (typeof conf === 'string') {
				conf = {
					target: conf,
					changeOrigin: true,
					logs: true
				}
			}
			app.use(proxy(route, conf));
		});
	}
};