const AjaxCgiBase = require('../../ajaxcgibase');

class HomeAjax extends AjaxCgiBase {

	async onGetSomeThing() {
		const { ctx } = this;
		const { request } = ctx;

		const result = await this.$mockService.getSomeThing();

		this.send(result);
	}
}

module.exports = HomeAjax.makeRouteHandler();