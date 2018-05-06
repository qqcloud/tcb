const Validator = require('./validator');

module.exports = (customRules) => {
	const extendRules = Object.assign(require('./rules'), customRules);
	return new Validator(extendRules);
};