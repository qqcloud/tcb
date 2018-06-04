/**
 * home route config module
 * @module app/home/route
 */

/**
 * Add path to router
 * @author jerishi
 * @DateTime 2018-05-30
 * @param    {Object}   router koa router
 */
module.exports = (router) => {
	router.get('/ajax/:action', require('./ajax/index'));
	router.get('/:action', require('./page/index'));
	router.get('/', require('./page/index'));
};