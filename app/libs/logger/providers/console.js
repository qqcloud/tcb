const { createLogger, format, transports } = require('winston');

module.exports = config => {
	const { normal } = config.log;
	return createLogger({
		level: normal.level,
		format: format.combine(
			require('../helper/formatter'),
		),
		transports: [new transports.Console()]
	});
};