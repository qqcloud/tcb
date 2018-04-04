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
	 * child class should define this method.
	 */
	handle() {
		throw new Error(`Please implement instance method \`${this.constructor.name}::handle\`.`);
	}
}

module.exports = CgiBase;