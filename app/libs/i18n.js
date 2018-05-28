const suportLocales = ['zh', 'en'];
const config = require('../../config');
const i18n = new (require('i18n-2'))({
    devMode: config.env !== 'prd',
    locales: suportLocales,
    directory: '../config/locales',
});

module.exports = (() => {
	// do something to the i18n;
	return i18n;
})();