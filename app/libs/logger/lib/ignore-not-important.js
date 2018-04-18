/**
 * check log is important
 */
const { format } = require('winston');

module.exports = importanturllog => {

	const {marker, regExp: regExpArr} = importantUrlLog;

	return format((info, opts) => {

			const message = info.message ? info.message : '';

			const len = regExpArr.length;

			for (let i = 0; i < len; i++) {

				let regExp = regExpArr[i];
				if (regExp.test(message)) {

					return info;
				}
			}

			return false;
		}
	);
};