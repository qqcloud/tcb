const AjaxCgiBase = require('../../ajaxcgibase');

class HomeAjax extends AjaxCgiBase {

	async onGetSomeThing() {
		const { ctx } = this;
		const result = await this.$mockService.getSomeThing();
		ctx.body = {code: 0, data: result};
	}
}

module.exports = HomeAjax.makeRouteHandler();