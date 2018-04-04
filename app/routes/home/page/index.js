const PageCgiBase = require('../../pagecgibase');

class HomePage extends PageCgiBase{

	async onIndex (){
		const {ctx} = this;
		await ctx.render('./home/index');
		return;
	}
}

module.exports = HomePage.makeRouteHandler();
