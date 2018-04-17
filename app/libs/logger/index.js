const config = require('../../../config');

module.exports = (() => {
	if (config.env === 'local') {
		return require('./providers/console');
	} else {
		return require('./providers/daily-roate-file');
	}
})()(config);