const { getRecords } = require('../../server/mysql/record');
const fs = require('fs');

const fileName = './scene/record';

const existsFile = function () {
	fs.exists(fileName, (exists) => {
		if (!exists) {
			fs.mkdir(fileName, (err) => {
				if (err) throw err;
			});
		}
		return false;
	});
};
existsFile();

const createRecordList = function () {
	getRecords({}).then((res) => {
		console.log('data:', res);
		const files = './scene/record/list.json';
		const data = {
			code: 'success',
			message: '查找成功',
			result: res,
		};
		const str = JSON.stringify(data);
		console.log('🚀 ~ file: index.js:17 ~ fs.exists ~ str', str);

		fs.writeFileSync(files, str, (err) => {
			if (err) throw err;
		});

		fs.appendFile(files, res, (err) => {
			if (err) throw err;
			console.log('The file has been saved!');
		});
	});
};

const addRecord = function () {
	const files = './scene/record/add.json';
	const data = {
		code: '0000',
		message: '新增成功',
		result: {},
	};
	const str = JSON.stringify(data);

	fs.writeFileSync(files, str, (err) => {
		if (err) throw err;
	});
};

const updateRecord = function () {
	const files = './scene/record/update.json';
	const data = {
		code: '0000',
		message: '更新成功',
		result: {},
	};
	const str = JSON.stringify(data);

	fs.writeFileSync(files, str, (err) => {
		if (err) throw err;
	});
};

const deleteRecord = function () {
	const files = './scene/record/delete.json';
	const data = {
		code: '0000',
		message: '更新成功',
		result: {},
	};
	const str = JSON.stringify(data);

	fs.writeFileSync(files, str, (err) => {
		if (err) throw err;
	});
};

const init = function () {
	createRecordList();
	addRecord();
	updateRecord();
	deleteRecord();
};
// 初始化
init();
