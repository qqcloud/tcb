/**
 * current config
 */
const argv = require('minimist')(process.argv.slice(2));
const ENV = argv.env || 'prd'; // `local`, `dev`, `test` or `prd`
const lanInterfaceName = 'eth0'; // 监听指定的网卡，注意本选项只支持局域网IPv4
const server = require('./server')(ENV, lanInterfaceName);

const getCurrentConfig = function() {
	return Object.assign(
		require('./config.default'),
		require(`./config.${ENV}`), {
			env: ENV,
			host: server.host,
		});
};

module.exports = getCurrentConfig();