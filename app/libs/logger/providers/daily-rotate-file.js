const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { createLogger, format } = winston;

module.exports = config => {
	const { normal, important } = config.log;
	const transports = (() => {

		const results = [
			new DailyRotateFile({
				level: normal.level,
				dirname: normal.path,
				filename: `${normal.prefix}-%DATE%.log`,
				datePattern: normal.datePattern,
				//maxSize: '20m',
				maxFiles: normal.maxDays,

				format: format.combine(
					require('../lib/formatter'),
				),
			}),
		];

		if (important && important.on) {

			const tempImportant = Object.assign({}, normal, important);
			const importantUrl = require('../../config').importantUrl;
			const ignoreNotImportant = require('../lib/ignore-not-important')(importantUrlLog);
			
			results.push(new DailyRotateFile({
				level: tempImportant.evel,
				dirname: tempImportant.path,
				filename: `${tempImportant.prefix}-%DATE%.log`,
				datePattern: tempImportant.datePattern,
				//maxSize: '20m',
				maxFiles: tempImportant.maxDays,

				format: format.combine(
					ignoreNotImportant(),
					require('../lib/formatter'),
				),
			}));
		}

		return results;
	})();

	return createLogger({
		transports
	});
};