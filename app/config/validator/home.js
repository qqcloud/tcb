/**
 * app validator config - mock
 */
module.exports = {
	getSomeThing: {
		get: {
			name:{
				type: 'String',
				required: true,
				length: [1, 6], // 长度为1-6;
				rule: 'isEmail',
			},
		},
		post: {
			name:{
				type: 'String',
				required: true,
				length: [1, 6], // 长度为1-6;
				rule: {
					type: 'Email',
					opts: [{
						allow_display_name: true, 
						require_display_name: false,
					}],
				},
			},
			info: {
				type: 'Object',
				required: false,
				child: {
					name:{
						type: 'String',
						required: true,
						rule: 'Email',
					},
					list: {
						type: 'Array',
						required: true,
						length: [1, 6], // 长度为1-6;
					},
				},
			},
			list: {
				type: 'Array',
				required: true,
				length: [1, 6], // 长度为1-6;
				child: {
					0:{
						type: 'String',
						required: true,
						rule: 'Email',
					},
					1: {
						type: 'Array',
						required: true,
						length: [1, 6], // 长度为1-6;
					},
					all: {
						type: 'Array',
						required: true,
						length: [1, 6], // 长度为1-6;
					},
				},
			},
		}
	},
	getSomeThing1: {
		all: {
			name:{
				type: 'String',
				required: true,
				length: [1, 6], // 长度为1-6;
				rule: 'Email',
			},
		},
	},
};