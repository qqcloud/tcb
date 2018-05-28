/**
 * service proxy config
 */
module.exports = {
	'/proxy/mock': 'https://api.github.com/users',
	'/proxy/user': {
		target: 'http://localhost:8111',
		logs: true,
		headers: {
			'X_HOST_S': 'google.com'
		}
	},
};