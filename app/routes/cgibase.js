const service = require('../service');
/** Class CgiBase */
class CgiBase {
	/**
	 * Create a CgiBase
	 * @author jerishi
	 * @DateTime 2018-05-30
	 * @param    {Object}   ctx   app ctx
	 * @param    {Function} next  app next
	 */
	constructor(ctx, next) {

		Object.assign(this, { ctx, next });
	}

	/**
	 * static function：make route handler
	 * @author jerishi
	 * @DateTime 2018-05-30
	 * @return   {Function}  route handle
	 */
	static makeRouteHandler() {
		return (ctx, next) => new this(ctx, next).handle();
	}

	/**
	 * Inject `service instances`
	 * @author jerishi
	 * @DateTime 2018-05-30
	 */
	injectServices() {
		Object.assign(this, service(this.ctx));
	}

	/**
	 * Child class should define this method
	 * @author jerishi
	 * @DateTime 2018-05-30
	 * @abstract
	 * @throws Will throw an error if child class should not define this method
	 */
	handle() {
		throw new Error(`Please implement instance method \`${this.constructor.name}::handle\`.`);
	}
}

module.exports = CgiBase;