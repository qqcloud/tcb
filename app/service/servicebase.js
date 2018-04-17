const request = require('../libs/request');
const utilLib = require('../libs/utillib');
const service = require('../config/service');

/**
 * ServiceBase
 */
class ServiceBase {
	constructor(ctx) {
		if (new.target === ServiceBase) {
			throw new Error('`ServiceBase` cannot be instantiated directly.');
		}

		// inject `service request`
		Object.assign(this, request(ctx));

		this.ctx = ctx;

		// inject `interfaces`
		_.each(service, (item, name) => {
			this[`$${name}Interface`] = item.interface;
		});
	}

	/**
	 * 
	 */
	$respond() {
		return utillib.respond(...arguments);
	}
}

module.exports = ServiceBase;