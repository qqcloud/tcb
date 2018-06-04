const validator = require('validator');

/**
 * Class Validator
 */
class Validator {
	
	/**
	 * Create a Validator
	 * @author jerishi
	 * @DateTime 2018-05-30
	 * @param    {Object}   extendRules   extend rules
	 */
	constructor(extendRules = {}){
		this.extendRules = extendRules;
	}

	/**
	 * Validate data by rule config
	 * @author jerishi
	 * @DateTime 2018-06-01
	 * @param    {*}    	data       target data
	 * @param    {Object}   ruleConfig rule config
	 * @param    {Boolean}    is data validated
	 */
	validate(data, ruleConfig) {
		const {
			required,
			type
		} = ruleConfig;
		let isValidated = false;
		switch (type) {
			case 'String':
				isValidated = this.validateString(data, ruleConfig);
				break;
			case 'Number':
				isValidated = this.validateNumber(data, ruleConfig);
				break;
			case 'Object':
				isValidated = this.validateObject(data, ruleConfig);
				break;
			case 'Array':
				isValidated = this.validateArray(data, ruleConfig);
				break;
			default:
				isValidated = false;
				break;
		}
		return isValidated;
	}

	validateString(data, ruleConfig) {
		const {
			required,
			length,
			rule
		} = ruleConfig;
		const ruleFun = this.getValidateRuleFun(rule);
		let isValidated = false;
		if (required) {
			if (_.isString(data)) {
				isValidated = ruleFun(data);
			} else {
				isValidated = false;
			}
		} else {
			isValidated = true;
		}
		return isValidated;
	}

	validateObject(data, ruleConfig) {
		const {
			required,
			child: childRule
		} = ruleConfig;

		let isValidated = false;
		if (required) {
			if (_.isObject(data)) {
				if (childRule && _.isObject(childRule)) {

					isValidated = _.some(childRule, (config, key) => {
						return !this.validate(data[key], config);
					});
				} else {
					isValidated = true;
				}
			} else {
				isValidated = false;
			}
		} else {
			isValidated = true;
		}
		return isValidated;
	}

	validateArray(data, ruleConfig) {
		const {
			required,
			child: childRule,
			length
		} = ruleConfig;

		let isValidated = false;
		if (required) {
			if (_.isArray(data)) {
				if (childRule && _.isObject(childRule)) {
					let defaultRule = _.pick(childRule, 'all');
					if (defaultRule) {
						isValidated = _.some(data, (value, index) => {
							return !this.validate(value, defaultRule);
						});
					} else {
						isValidated = _.some(childRule, (config, key) => {
							return !this.validate(data[key], config);
						});
					}
				} else {
					if (length) {
						isValidated = this.validateLength(data, length);
					} else {
						isValidated = true;
					}
				}
			} else {
				isValidated = false;
			}
		} else {
			isValidated = true;
		}
		return isValidated;
	}

	validateNumber(data, ruleConfig) {
		const {
			required,
			length,
			rule
		} = ruleConfig;
		const ruleFun = this.getValidateRuleFun(rule);
		let isValidated = false;
		if (required) {
			if (_.isNumber(data)) {
				isValidated = ruleFun(String(data));
			} else {
				isValidated = false;
			}
		} else {
			isValidated = true;
		}
		return isValidated;
	}

	validateLength(data, length) {
		let isValidated = false;

		if (!_.isArray(data) && !_.isString(data)) {
			return isValidated = false;
		}

		const dLen = data.length;
		if (_.isArray(length)) {
			const lLen = length.length;
			switch (len) {
				case 0:
					isValidated = true;
					break;
				case 1:
					isValidated = dLen === length[0];
					break;
				case 2:
					let minLen = length[0];
					let maxLen = length[1];
					isValidated = dLen >= minLen && dLen <= maxLen;
					break;
				default:
					let minLen = length[0];
					let maxLen = length[1];
					isValidated = dLen >= minLen && dLen <= maxLen;
					break;
			}
		} else if (_.isNumber(length)) {
			isValidated = dLen === length;
		} else {
			isValidated = false;
		}
		return isValidated;
	}

	getValidateRuleFun(rule) {
		let ruleName, ruleOpts, ruleFun;

		if (_.isString(rule)) {
			ruleName = rule;
		} else if (_.isObject(rule)) {
			ruleName = rule.type;
			ruleOpts = rule.opts;
		}

		if (_.isString(ruleName)) {
			if (_.isFunction(this.extendRules[ruleName])) {
				ruleFun = validator[ruleName];
			} else if (_.isFunction(validator[ruleName])) {
				ruleFun = validator[ruleName];
			} else {
				ruleName = 'is' + ruleName.replace(/^./, ruleName[0].toUpperCase());
				if (_.isFunction(validator[ruleName])) {
					ruleFun = validator[ruleName];
				} else {
					ruleFun = () => {
						return false;
					};
				}
			}
		} else {
			ruleFun = () => {
				return false;
			};
		}
		return (data) => {
			const args = _.isArray(ruleOpts) ? [data].concat(ruleOpts) : [data];
			return ruleFun(...args);
		};
	}
}

module.exports = Validator;