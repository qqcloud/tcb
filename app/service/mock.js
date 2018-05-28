const ServiceBase = require('./servicebase');

class MockService extends ServiceBase {

	async getSomeThing() {
		const { ctx } = this;
		const reqPromise = this.$mock.post(this.$mockInterface.getSomeThing, {name:'jack'}, {
			suburl: this.$mockInterface.getSomeThing,
		});

		return this.$respond(reqPromise, {
			'100': 'MOCK_PARAMS_ERROR',
			'101': 'MOCK_PARAMS_ERROR1',
			'*': 'REQUEST_PARAMS_ERROR',
		});
	}

	async getSomeThing1() {
		let result;
		try {

			result = await this.$mock.post(this.$mockInterface.getSomeThing, {}, {
				suburl: this.$mockInterface.getSomeThing,
			});
		} catch (err) {
			result = err;
		}
		return Promise.resolve(result);
	}
}

module.exports = MockService;