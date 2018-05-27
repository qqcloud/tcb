/**
 * mock service cgi config
 */
module.exports = {
	'on': 1,
	'method': 'get',
	'interface': {
		'getSomeThing': {
			'on': 1,
			'query': {
				'name': 'jeri',
			},
			'reply': [
				200,
				{}
			],
		},
		'getSomeThing1': {
			'on': 1,
			'method': 'post',
			'body': {
				'name': 'jeri',
			},
			'reply': [
				200,
				{}
			],
		},
	},
};