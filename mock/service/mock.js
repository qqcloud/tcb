/**
 * mock service cgi config
 */
module.exports = {
	'on': 1,
	'method': 'post',
	'suburl': 1,
	'interface': {
		'getSomeThing': {
			'on': 1,
			'body': function(){
				return true;
			},
			'reply': [
				200,
				{
					returnCode: 0,
					returnMessage: 'ok',
					data: {
						test:1,
					}
				}
			],
		},
		'getSomeThing1': {
			'on': 0,
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