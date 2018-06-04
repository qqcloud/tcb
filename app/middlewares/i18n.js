const config = require('../config');
const utilLib = require('../libs/utillib');
const i18n = require('../libs/i18n');

/**
 * I18n middleware
 * @module app/middlewares/i18n
 */

/**
 * Add i18n
 * @author jerishi
 * @DateTime 2018-05-30
 * @param    {Object}     ctx   app ctx
 * @param    {Function}   next  app next
 */
module.exports = async (ctx, next) => {
	const { request } = ctx;
	if (ctx.query.lang && suportLocales.indexOf(ctx.query.lang) !== -1) {
		i18n.setLocale(ctx.query.lang);
	}
	ctx.state.i18n = request.i18n = i18n;
	ctx.state.__ = i18n.__;
	
	await next();
};