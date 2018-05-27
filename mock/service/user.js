/**
 * user service cgi config
 */
const serviceConf = require('../../app/config').service['user'];

module.exports = {
	'on': 1,
	'method': 'post',
	'filteringRequestBody': function(body) {
        return body.interface;
    },
	'interface': {
		'getSomeThing1': {
			'on': 1,
			'method': 'post',
			'body': {
				'interfaceName': serviceConf['getSomeThing1'],
				'para': {},
			},
			'reply': [
				200,
				{}
			],
		},
	},
};