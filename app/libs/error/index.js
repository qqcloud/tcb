const utillib = require('../utillib');
const errors = Object.assign({}, require('./sys'), require('../../config').error);

// `key: [code, msg]` => `key: { 'code': code, 'msg': msg }`
const errorTypes = _.transform(errors, (ret, value, key) => {
	ret[key] = { 'code': value[0] || -1, 'msg': value[1] || '' };
}, {});

class ResponseError extends Error {
	constructor(errorType, options = {}) {
		if (!(errorType in errorTypes)) {
			Logger.warn(`\`errorType\` not exists: '${errorType}'`);

			// `errorType` default to `ERROR_DEFAULT`
			errorType = 'ERROR_DEFAULT';
		}

		let errorObj = Object.assign({}, errorTypes[errorType]);

		// rewrite `errorType`
		if (options.type && ['string', 'number'].includes(typeof options.type)) {
			errorType = options.type;
		}

		// rewrite `errorObj.code`
		if (options.code && ['string', 'number'].includes(typeof options.code)) {
			errorObj.code = options.code;
		}

		// rewrite `errorObj.msg`
		if (typeof options.msg === 'string') {
			errorObj.msg = utillib.vsub(options.msg, {
				'code': errorObj.code,
				'msg': errorObj.msg,
				'type': errorType,
			});
		}

		super(errorObj.msg);
		Error.captureStackTrace(this, options.constructorOpt || this.constructor);

		// setup `error name` explictly
		this.name = this.constructor.name;

		// assign custom properties
		this.code = errorObj.code;
		this.msg = errorObj.msg;
		this.type = errorType;

		// 错误附加信息
		if (options.detail != null) {
			this.detail = options.detail;
			errorObj.detail = options.detail;
		}

		// setup `stack trace` info
		errorObj.stack = this.stack;

		if (!options.dontLogError) {
			Logger.error(JSON.stringify({
				info: this.name,
				detial: errorObj,
			}));
		}
	}

	value() {
		return _.pick(this, ['code', 'msg', 'type', 'detail']);
	}
}

module.exports = {
	errorTypes,
	ResponseError,

	create(errorType, options = {}, ErrorClass = ResponseError) {
		if (typeof options === 'string') {
			options = { 'msg': options };
		}

		options = Object.assign({ constructorOpt: this.create }, options);
		return new ErrorClass(errorType, options);
	},
};