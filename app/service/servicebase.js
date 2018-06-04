const request = require('../libs/request');
const utilLib = require('../libs/utillib');
const service = require('../config').service;

/**
 * Class ServiceBase
 */
class ServiceBase {

	/**
	 * Create a ServiceBase
	 * @author jerishi
	 * @DateTime 2018-05-30
	 * @param    {Object}   ctx   app ctx
	 */
	constructor(ctx) {
		if (new.target === ServiceBase) {
			throw new Error('`ServiceBase` cannot be instantiated directly.');
		}

		// inject `service request`
		Object.assign(this, request(ctx));

		this.ctx = ctx;

		// inject `interfaces`
		_.map(service, (item, name) => {
			this[`$${name}Interface`] = item.interface;
		});
	}
	
	/**
	 * Form response data
	 * @author jerishi
	 * @DateTime 2018-05-31
	 * @borrows utilLib.respond as $respond
	 */
	$respond() {
		return utilLib.respond(...arguments);
	}
}

module.exports = ServiceBase;