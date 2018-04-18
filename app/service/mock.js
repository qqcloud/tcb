const ServiceBase = require('./servicebase');

class MockService extends ServiceBase {

	async getSomeThing() {
		
		return this.$mock.fetch(this.$mockInterface.getSomeThing, {}, { suburl: this.$mockInterface.getSomeThing });
	}

	async getSomeThing1() {
		let result;
		try {
			
			result = await this.$mock.post(this.$mockInterface.getSomeThing, {}, { suburl: this.$mockInterface.getSomeThing });
		} catch(err) {
			result = err;
		}
		return Promise.resolve(this.$respond(result));
	}
}

module.exports = MockService;