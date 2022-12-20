import http from '@utils/http';

const getRecords = async (data) =>
	new Promise((resolve, reject) => {
		http.post({
			url: '/recordsList',
			data,
		}).then((res) => {
			if (res && res.code === '0000') {
				resolve(res);
			} else {
				reject(res);
			}
		});
	});

const addRecord = async (data) =>
	new Promise((resolve, reject) => {
		http.post({
			url: '/recordsAdd',
			data,
		}).then((res) => {
			if (res && res.code === '0000') {
				resolve(res);
			} else {
				reject(res);
			}
		});
	});

const delRecord = async (data) =>
	new Promise((resolve, reject) => {
		http.post({
			url: '/delRecord',
			data,
		}).then((res) => {
			if (res && res.code === '0000') {
				resolve(res);
			} else {
				reject(res);
			}
		});
	});

const updateRecord = async (data) =>
	new Promise((resolve, reject) => {
		http.post({
			url: '/updateRecord',
			data,
		}).then((res) => {
			if (res && res.code === '0000') {
				resolve(res);
			} else {
				reject(res);
			}
		});
	});

export { getRecords, addRecord, delRecord, updateRecord };
