const queryString = require('querystring');
const config = require('../../config');

/**
 * Util libraries
 * @module app/libs/utilib
 */
module.exports = {
	/**
	 * Render404 page
	 * @author jerishi
	 * @DateTime 2018-06-01
	 * @param    {Object}   ctx app ctx
	 * @return   {Function}       promise
	 */
	render404(ctx) {
		return ctx.render('404');
	},
	/**
	 * Render50X page
	 * @author jerishi
	 * @DateTime 2018-06-01
	 * @param    {Object}   ctx app ctx
	 * @return   {Function}       promise
	 */
	render50X(ctx, msg = '') {
		return ctx.render('50x', {
			msg
		});
	},
	/**
	 * RemoveXss in string
	 * @author jerishi
	 * @DateTime 2018-06-01
	 * @param    {String}   str target string
	 * @return   {String}     secure string
	 */
	removeXss(str) {
		const jsSlashEncoder = function(charStr) {
			const code = charStr.charCodeAt(0);
			const hex = code.toString(16).toUpperCase();
			if (code < 0x80) { // ASCII
				if (hex.length === 1) {
					return '\\x0' + hex;
				} else {
					return '\\x' + hex;
				}
			} else { // Unicode
				switch (hex.length) {
					case 2:
						return '\\u00' + hex;
					case 3:
						return '\\u0' + hex;
					case 4:
						return '\\u' + hex;
					default:
						return '\\uFFFD';
				}
			}
		};
		return str.replace(/[^\x22,\-\.0-9:A-Z\[\x5C\]_a-z{}]/g, jsSlashEncoder).replace(/\]\](?:>|\\x3E|\\u003E)/gi, '\\x5D\\x5D\\x3E');
	},
	/**
	 * Get json data for response
	 * @author jerishi
	 * @DateTime 2018-06-01
	 * @param    {Object}   data   origin data
	 * @return   {Object}     data for response 
	 */
	getResDataForJson(data) {
		let result;
		if (data instanceof ERROR.ResponseError) {
			result = {
				code: data.code,
				msg: data.msg,
				data: data.data,
				detail: data.detail
			};
		} else if (data instanceof Error) {
			const error = ERROR.create('SERVER_RESPONSE_ERROR', {
				'msg': '${msg}[Server]',
			});
			result = {
				code: error.code,
				msg: error.msg,
				data: null,
			};
		} else if (_.isPlainObject(data) && data.code !== undefined && data.data) {
			result = Object.assign({}, {
				code: 0,
				msg: 'ok',
			}, data);
		} else {
			result = {
				code: 0,
				msg: 'ok',
				data: data,
			}
		}
		return result;
	},
	/**
	 * Response json data for request
	 * @author jerishi
	 * @DateTime 2018-06-01
	 * @param    {Object}   data  origin data for request
	 * @param    {Object}   ctx   app ctx
	 * @return   {Boolean}       
	 */
	resJson(data, ctx) {
		const {
			request,
			response
		} = ctx;
		const cgiType = request.$cgiType;
		const resData = this.getResDataForJson(data);
		if (cgiType === 'jsonp') {
			this.resJsonp(resData, ctx);
		} else if (cgiType === 'ajax') {
			ctx.body = resData;
		} else {
			const error = ERROR.create('SERVER_RESPONSE_ERROR', {
				'msg': '${msg}[Server]',
			});
			ctx.body = this.getResDataForJson(error);
		}
		return true;
	},
	/**
	 * Response json data for jsonp request
	 * @author jerishi
	 * @DateTime 2018-06-01
	 * @param    {Object}   data  origin data for request
	 * @param    {Object}   ctx   app ctx
	 * @return   {Boolean}       
	 */
	resJsonp(data, ctx) {
		const {
			request,
			response
		} = ctx;
		const jsonpFunName = request.query[config.jsonp].replace(/[^\w_]/gmi, '');
		return ctx.body = jsonpFunName + '(' + JSON.stringify(data) + ');';
	},
	/**
	 * Get/Set cookie
	 * @author jerishi
	 * @DateTime 2018-06-01
	 * @param    {Object}   ctx   app ctx
	 * @param    {String}   key   cookie's name
	 * @param    {String/Null}   value cookie's value
	 * @param    {Object}   opts  options for `key` cookie
	 * @return   {String/Object}    get cookie--String/set cookie--Object  
	 */
	cookie(ctx, key, value, opts = {}) {
		const tempOpts = _.cloneDeep(opts);
		tempOpts.expires = _.isNumber(tempOpts.expires) ? new Date(Date.now() + tempOpts.expires * 1000) : new Date(0);

		const options = Object.assign({
			path: '/',
			domain: ctx.hostname.substr(ctx.hostname.indexOf('.') + 1),
			expires: new Date(0),
			httpOnly: true,
			overwrite: false,
		}, tempOpts);

		if (arguments.length === 2) {
			return ctx.cookies.get(key);
		} else {
			return ctx.cookies.set(key, value, options);
		}
	},
	/**
	 * Add query string to url
	 * @author jerishi
	 * @DateTime 2018-06-01
	 * @param    {String}   rawUrl orginal url
	 * @param    {String}   qsObj  query object
	 * @return   {String}	 full url
	 */
	addQueryStringToUrl(rawUrl, qsObj) {
		let hash = '',
			url = '',
			pos = rawUrl.indexOf('#');

		if (pos !== -1) {
			hash = rawUrl.slice(pos);
			url = rawUrl.slice(0, pos);
		} else {
			url = rawUrl;
		}

		if (url.indexOf('?') == -1) {
			url += '?' + queryString.stringify(qsObj);
		} else {
			url += '&' + queryString.stringify(qsObj);
		}

		return url + hash;
	},
	/**
	 * Simple tmpl function
	 * @author jerishi
	 * @DateTime 2018-06-01
	 * @param    {String}   tmpl   tmpl string
	 * @param    {Object}   vector   target obejct
	 * @return   {String}     string   
	 */
	vsub(tmpl, vector) {
		return ('' + tmpl).replace(/\$\{([^\{\}]+)\}/g, function(_, p, v) {
			return (v = (vector || {})[p]) == null ? '' : v;
		});
	},
	/**
	 * Form response data
	 * @author jerishi
	 * @DateTime 2018-05-31
	 * @param    {Function}    		reqPromise request promise
	 * @param    {String/Object}    error      error code/map
	 * @param    {Object}   		opts       options
	 * @return   {Function}     promise
	 */
	async respond(reqPromise, error = 'SERVER_RESPONSE_ERROR', opts = {}) {
		let errorMap;
		if (_.isString(error) && ERROR.errorTypes[error]) {
			errorMap = {
				'*': error,
			};
		} else if (_.isPlainObject(error)) {

			errorMap = _.transform(error, (ret, value, key) => {
				ret[key] = ERROR.errorTypes[value] ? value : 'SERVER_RESPONSE_ERROR';
			}, {});

			if (!errorMap['*']) {
				errorMap['*'] = 'SERVER_RESPONSE_ERROR';
			}
		} else {
			errorMap = {
				'*': 'SERVER_RESPONSE_ERROR',
			};
		}
		return new Promise(async(reslove, reject) => {
			try {
				const result = await reqPromise;
				const {
					code,
					msg
				} = result;
				if (code === 0) {
					reslove(result);
				} else if (errorMap[code]) {
					const error = ERROR.create(errorMap[code]);

					if (opts.useOriMsg && msg) {
						error.msg = msg;
					}
					reject(error);
				} else {
					const error = ERROR.create(errorMap['*']);

					if (opts.useOriMsg && msg) {
						error.msg = msg;
					}
					reject(error);
				}
			} catch (err) {
				reject(err);
			}
		});
	},
};