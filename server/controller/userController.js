const utility = require('utility');
const userModel = require('../mysql/index.js');

// 密码加密算法
function screct(password) {
	const salt = 'yueqi_is_three_44564@sdf#$%#$%@#$~';
	return utility.md5(utility.md5(password + salt));
}

// 用户登陆
exports.login = async (ctx) => {
	console.log(ctx.request.body);
	let { mobile, password } = ctx.request.body;
	await userModel
		.findUser(mobile)
		.then((res) => {
			if (
				res.length > 0 &&
				mobile === res[0]['mobile'] &&
				screct(password) === res[0]['password']
			) {
				ctx.session = {
					user: res[0]['name'],
					id: res[0]['id'],
				};

				ctx.body = {
					code: 1,
					data: {
						user: res[0]['name'],
						id: res[0]['id'],
					},
					message: '登录成功',
				};
			} else {
				ctx.body = {
					code: 0,
					message: '用户名或密码错误',
				};
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

// 注册用户
exports.register = async (ctx) => {
	console.log(ctx.request.body);
	let { mobile, nickName, wechat, password } = ctx.request.body;

	await userModel.findUser(mobile).then(async (res) => {
		if (res.length != 0) {
			try {
				throw Error('用户已存在');
			} catch (error) {
				console.log(error);
			}

			// 返回用户已存在信息
			ctx.body = {
				code: 0,
				message: '用户已存在',
			};

			return;
		}

		// 验证信息
		if (mobile != '' || nickName != '' || wechat != '' || password != '') {
			await userModel
				.insertUser([
					nickName,
					mobile,
					screct(password),
					'',
					wechat,
					'',
				])
				.then((res) => {
					// 注册成功， 返回信息
					ctx.body = {
						code: 1,
						message: '注册成功',
					};
				});
		}
	});
};
