const service = require('../mysql/record');
const { responseCode } = require('./../constant');

// 新增记录
exports.add = async (ctx) => {
	let {
		amount,
		description = '',
		name,
		number,
		isAdd,
		price,
		time,
		Breakeven,
	} = ctx.request.body;
	let total, rate;
	total = number * price;
	rate = '0.00';

	await service
		.insertRecord([
			name,
			number,
			isAdd,
			price,
			time,
			amount,
			total,
			rate,
			Breakeven,
			description,
		])
		.then((res) => {
			// 注册成功， 返回信息
			ctx.body = {
				code: responseCode.success,
				message: '新增成功',
			};
		});
};

// 获取记录
exports.getList = async (ctx) => {
	let { name, isAdd } = ctx.request.body;
	await service.getRecords([name, isAdd]).then((res) => {
		// 注册成功， 返回信息
		ctx.body = {
			code: responseCode.success,
			message: '查找成功',
			result: res,
		};
	});
};

// 新增记录
exports.del = async (ctx) => {
	let { id } = ctx.request.body;
	await service.delRecord([id]).then((res) => {
		// 注册成功， 返回信息
		ctx.body = {
			code: responseCode.success,
			message: '删除成功',
		};
	});
};

// 新增记录
exports.update = async (ctx) => {
	let {
		id,
		amount,
		description,
		name,
		number,
		price,
		time,
		isAdd,
		Breakeven,
	} = ctx.request.body;

	await service
		.updateRecord([
			name,
			number,
			isAdd,
			price,
			time,
			amount,
			Breakeven,
			description,
			id,
		])
		.then((res) => {
			// 注册成功， 返回信息
			ctx.body = {
				code: responseCode.success,
				message: '更新成功',
			};
		});
};
