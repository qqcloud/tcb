/**
 * app extant validator rules
 */
const validator = require('validator');

module.exports = {
	'test': (data, opts) => {
		if(_.isObject(data)) {
			if(data.name) {
				return true;
			}
			return false;
		}
		return false;
	},
};