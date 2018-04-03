/**
 * server host info
 */
const os = require('os');

module.exports = (env, lanInterfaceName = 'eth0') => {

	const result = {
		host: '127.0.0.1',
	};

	if (env !== 'local') {
		const networkInterfaces = os.networkInterfaces();

		_.each(networkInterfaces[lanInterfaceName], (item) => {
			// 是否为`IPv4`?
			if (item.family.toLowerCase() !== 'ipv4') {
				return;
			}

			const address = item.address;
			const secondary = +address.split('.')[1];

			// 参考：IANA保留地址<http://baike.baidu.com/view/2558390.htm>
			// 是否为局域网IP?
			if (
				// A类（10.0.0.0－10.255.255.255）
				address.startsWith('10.')

				// A类（100.64.0.0－100.127.255.255）
				|| (address.startsWith('100.') && _.inRange(secondary, 64, 127 + 1))

				// B类（172.16.0.0－172.31.255.255）
				|| (address.startsWith('172.') && _.inRange(secondary, 16, 31 + 1))

				// C类（192.168.0.0－192.168.255.255）
				|| address.startsWith('192.168')
			) {
				result.host = address;
				return false;
			}
		});
	}

	return result;
};