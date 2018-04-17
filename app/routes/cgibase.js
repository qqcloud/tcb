const service = require('../service');

class CgiBase {
	constructor(ctx, next) {

		Object.assign(this, { ctx, next });
	}

	/**
	 * static function：make route handler
	 * @return {Function}
	 */
	static makeRouteHandler() {
		return (ctx, next) => new this(ctx, next).handle();
	}

	/**
	 * inject `service instances`
	 */
	injectServices() {
		Object.assign(this, service(this.ctx));
	}

	/**
	 * child class should define this method.
	 */
	handle() {
		throw new Error(`Please implement instance method \`${this.constructor.name}::handle\`.`);
	}
}

module.exports = CgiBase;