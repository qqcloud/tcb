const PageCgiBase = require('../../pagecgibase');

class HomePage extends PageCgiBase {

	async onIndex() {
		const {ctx} = this;
		
		await ctx.render('home/index', {
			title: 29489284
		});
	}

	async onTest() {
		const {ctx} = this;
		ctx.body = 'test';
	}
}

module.exports = HomePage.makeRouteHandler();