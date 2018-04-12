const { createLogger, format, transports } = require('winston');

module.exports = config => {
	return createLogger({
		level: config.log.level,
		format: format.combine(
			require('./helper/formatter'),
		),
		transports: [new transports.Console()]
	});
};