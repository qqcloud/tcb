/**
 * app validator config
 */
const routesConf = {
	'/home/ajax': require('./home'),
};
const rules = require('./rules');

module.exports = {
	rules,
	routesConf
};