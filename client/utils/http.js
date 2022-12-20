import axios from 'axios';
import qs from 'qs';
// const fs = require('fs');

let url = '';

// 创建一个新的axios实例
const instance = axios.create({
	baseURL: url,
	headers: {
		'content-type':
			process.env.NODE_ENV == 'mock'
				? 'multipart/form-data'
				: 'application/x-www-form-urlencoded;charset=utf-8',
	},
	withCredentials: true, // 是否允许带cookie这些
});
const ajax = (url, method, data, params) => {
	if (process.env.NODE_ENV == 'mock') {
		// const data = fs.readFileSync('./../../nodemon.json', 'utf8');
		console.log('data', data);
		// return new Promise((resolve, reject) => {
		// 	newInstance({
		// 		url: 'http://localhost:7000/list.json',
		// 		method,
		// 		data,
		// 		params,
		// 	})
		// 		.then((res) => {
		// 			resolve(res.data);
		// 		})
		// 		.catch((err) => {
		// 			reject(err);
		// 		});
		// });
	}
	return new Promise((resolve, reject) => {
		instance({
			url,
			method,
			data,
			params,
		})
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

const http = {
	get({ url = '', data, params }) {
		return ajax(url, 'GET', data, params);
	},
	post({ url = '', data = {}, params = {} }) {
		return ajax(url, 'POST', qs.stringify(data), params);
	},
};

export default http;
