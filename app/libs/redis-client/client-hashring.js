/**
 * ClientHashRing
 */
var redis = require('redis');
var HashRing = require('hashring');

class ClientHashRing {
	constructor(redisConfig = {}) {
		var servers = redisConfig.servers;

		if (servers.length === 0) {
			Logger.error('redis servers config error, no servers: ' + JSON.stringify(redisConfig));
			return this;
		}

		this.redisConfig = redisConfig;
		this.store = {};
		this.ring = new HashRing([]);

		_.each(servers, function(serverConfig) {
			var client = new redis.createClient(serverConfig);
			var serverKey = [serverConfig.host, serverConfig.port].join(':')

			this.ring.add(serverKey);
			this.store[serverKey] = client;

			client.on('ready', function() {
				if (!this.ring.has(serverKey)) {
					this.ring.add(serverKey);
					this.store[serverKey] = client;
				}

				var warningStr = 'redis client ready : ' + JSON.stringify({
					serverConfig: serverConfig
				});
				Logger.debug(warningStr);
			});

			client.on('error', function(err) {
				if (this.ring.has(serverKey)) {
					this.ring.remove(serverKey);
					this.store[serverKey] = null;
				}

				var exceptionStr = 'redis client error: ' + JSON.stringify({
					serverConfig: serverConfig,
					error: err
				});
				Logger.error(exceptionStr);
			});

			client.on('connect', function() {
				Logger.debug('redis client connect: ' + JSON.stringify({
					serverConfig: serverConfig
				}));
			});

			client.on('reconnecting', function() {
				if (this.ring.has(serverKey)) {
					this.ring.remove(serverKey);
					this.store[serverKey] = null;
				}
				Logger.debug('redis client reconnecting: ' + JSON.stringify({
					serverConfig: serverConfig
				}));
			});

			client.on('end', function() {
				if (this.ring.has(serverKey)) {
					this.ring.remove(serverKey);
					this.store[serverKey] = null;
				}
				Logger.error('redis client end: ' + JSON.stringify({
					serverConfig: serverConfig
				}));
			});

			client.on('warning', function(err) {
				var warningStr = 'redis client warning: ' + JSON.stringify({
					serverConfig: serverConfig,
					warning: err
				});
				Logger.error(warningStr);
			});
		});
	}

	_getKey(key) {
		var prefix = _.get(this.redisConfig, 'prefix', '');
		var realKey = prefix + key;
		return realKey;
	}

	getClient(key) {
		var realKey = this._getKey(key);
		var serverKey = this.ring.get(realKey);

		if (!serverKey || !this.store[serverKey]) {
			Logger.error('redis-store error get client from ring key: ' + serverKey);
			return false;
		}

		Logger.debug('redis-store success get client from ring key: ' + serverKey);

		return this.store[serverKey];
	}
}

module.exports = ClientHashRing;