const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { createLogger, format } = winston;

module.exports = config => {

	const transports = (() => {

		const results = [
			new DailyRotateFile({
				level: config.log.level,
				dirname: config.log.path,
				filename: `${config.log.prefix}-%DATE%.log`,
				datePattern: config.log.datePattern,
				//maxSize: '20m',
				maxFiles: config.log.maxDays,

				format: format.combine(
					require('./helper/formatter'),
				),
			}),
		];

		if (config.log.markImportant) {
			const importantUrlLog = require('../../config/importanturllog');
			const ignoreNotImportant = require('./helper/ignore-not-important')(importantUrlLog);
			results.push(new DailyRotateFile({
				level: importantUrlLog.logLevel,
				dirname: importantUrlLog.logPath,
				filename: `${importantUrlLog.logPrefix}-%DATE%.log`,
				datePattern: importantUrlLog.datePattern,
				//maxSize: '20m',
				maxFiles: importantUrlLog.maxDays,

				format: format.combine(
					ignoreNotImportant(),
					require('./helper/formatter'),
				),
			}));
		}

		return results;
	})();

	return createLogger({
		transports
	});
};