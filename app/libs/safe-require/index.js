// safe require modules
const sysModulesConf = require('./config');
module.exports = (name, opts = {}) => {

	if(_.isString(name)){
		const moduleConf = sysModulesConf[name];
		if(moduleConf && moduleConf.path) {
			const module = require(moduleConf.path);
			
		}
	}
};