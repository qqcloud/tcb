/**
 * i18n
 */
const config = require('../config');
const utilLib = require('../libs/utillib');
const suportLocales = ['zh', 'en'];

const i18n = new (require('i18n-2'))({
    devMode: config.env !== 'prd',
    locales: suportLocales,
    directory: '../config/locales',
});

module.exports = async (ctx, next) => {
	const { request } = ctx;
	if (ctx.query.lang && suportLocales.indexOf(ctx.query.lang) !== -1) {
		i18n.setLocale(ctx.query.lang);
	}
	ctx.state.i18n = request.i18n = i18n;
	await next();
};