class CgiBase {
	constructor(ctx, next) {

		Object.assign(this, { ctx, next });
	}

	/**
	 * 静态工厂方法：创建用以响应路由的回调函数
	 * @return {Function}
	 */
	static makeRouteHandler() {
		return (ctx, next) => new this(ctx, next).handle();
	}

	/**
	 * 子类实现该方法处理请求
	 */
	handle() {
		throw new Error(`Please implement instance method \`${this.constructor.name}::handle\`.`);
	}
}

module.exports = CgiBase;