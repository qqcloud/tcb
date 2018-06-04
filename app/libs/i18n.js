const suportLocales = ['zh', 'en'];
const config = require('../../config');
const i18n = new (require('i18n-2'))({
    devMode: config.env !== 'prd',
    locales: suportLocales,
    directory: '../config/locales',
});
/**
 * I18n lib
 * @module app/libs/i18n
 */

/**
 * Get i18n instance
 * @author jerishi
 * @DateTime 2018-05-30
 */
module.exports = (() => {
	// do something to the i18n;
	return i18n;
})();