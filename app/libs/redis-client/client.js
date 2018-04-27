const ClientHashRing = require('./client-hashring')

class RedisClient {
	constructor({
		options = {}
	} = {}) {
		const ClientHashRing = new ClientHashRing(options);
		this._err = err => _.pick(err, ['name', 'code', 'message', 'stack', 'command', 'args']);
	}

	get(key) {
		const begin = Date.now();
		return new Promise((reslove, reject) => {
			this.ClientHashRing.getClient(key).get(key, (err, res) => {
				const timeCost = Date.now() - begin;
				if (err) {
					Logger.debug(`REDIS [GET] => ${JSON.stringify({ key, error: this._err(err), timeCost })}`);
					reject(err);
				} else {
					Logger.debug(`REDIS [GET] => ${JSON.stringify({ key, res, timeCost })}`);
					reslove(JSON.parse(res));
				}
			});
		});
	}

	set(key, value, ttl = 0) {
		const begin = Date.now();
		value = JSON.stringify(value);
		return new Promise((reslove, reject) => {
			const cb = (err, res) => {
				const timeCost = Date.now() - begin;
				if (err) {
					Logger.debug(`REDIS [SET] => ${JSON.stringify({ key, value, error: this._err(err), timeCost })}`);
					reject(err);
				} else {
					Logger.debug(`REDIS [SET] => ${JSON.stringify({ key, value, timeCost })}`);
					reslove(res);
				}
			};
			if (ttl > 0) {
				this.ClientHashRing.getClient(key).setex(key, ttl, value, cb);
			} else {
				this.ClientHashRing.getClient(key).set(key, value, cb);
			}
		});
	}

	del(key) {
		const begin = Date.now();
		return new Promise((reslove, reject) => {
			this.ClientHashRing.getClient(key).del(key, (err, res) => {
				const timeCost = Date.now() - begin;
				if (err) {
					Logger.debug(`REDIS [DEL] => ${JSON.stringify({ key, timeCost })}`);
					reject(err);
				} else {
					Logger.debug(`REDIS [DEL] => ${JSON.stringify({ key, error: this._err(err), timeCost })}`);
					reslove(res);
				}
			});
		});
	}
}

module.exports = RedisClient;