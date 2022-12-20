import React, { useEffect } from 'react';
import { Form, Input, Button, DatePicker, message } from 'antd';
import { addRecord, updateRecord } from '../../service';
const moment = require('moment');

const { TextArea } = Input;

interface ProdType {
	addCallback: (params:any) =>{}; 
	itemData?: any; 
	type: string;
	form?: any;
}


let Add = (prods:ProdType) => {
	const { form, addCallback, itemData, type } = prods;
	const formatStr = 'YYYY-MM-DD HH:mm:ss';

	const add = function (values) {
		let nowDate = new Date().getTime();
		addRecord({
			...values,
			time:
				(values.time && values.time.format(formatStr)) ||
				moment(nowDate).format(formatStr),
		}).then((res: any) => {
			if (res.code === '0000') {
				message.success(res.message);
				addCallback(res);
			} else {
				message.error(res.message);
			}
		});
	};

	const edit = function (values) {
		console.log(values);
		let nowDate = new Date().getTime();
		updateRecord({
			...values,
			id: itemData.id,
			time:
				(values.time && values.time.format(formatStr)) ||
				moment(nowDate).format(formatStr),
		}).then((res: any) => {
			if (res.code === '0000') {
				message.success(res.message);
				addCallback(res);
			} else {
				message.error(res.message);
			}
		});
	};
	const handleSubmit = (e) => {
		const values = form.getFieldsValue();
		if (type === 'update') {
			edit(values);
		} else {
			add(values);
		}
		return false;
	};

	useEffect(() => {
		if (type === 'update') {
			const values = { ...itemData };
			for (let i in values) {
				values[i] = `${values[i]}`;
			}
			delete values.id;
			values.time = moment(values.time, formatStr);
			form.setFieldsValue(values);
		}
	}, [itemData, type]);

	const { getFieldDecorator } = form;
	return (
		<Form
			onSubmit={handleSubmit}
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 20 }}
		>
			<Form.Item label="name">
				{getFieldDecorator('name', {
					rules: [
						{
							required: true,
							message: 'Please input name',
						},
					],
				})(<Input placeholder="Please input name" />)}
			</Form.Item>

			<Form.Item label="time">
				{getFieldDecorator('time', {
					rules: [
						{
							required: true,
							message: 'Please pick date',
						},
					],
				})(
					<DatePicker
						showTime
						format={formatStr}
						style={{ width: '100%' }}
					/>,
				)}
			</Form.Item>

			<Form.Item label="amount">
				{getFieldDecorator('amount', {
					rules: [
						{
							required: true,
							message: 'Please pick amount',
						},
					],
				})(<Input placeholder="Please input amount" />)}
			</Form.Item>

			<Form.Item label="number">
				{getFieldDecorator('number', {
					rules: [
						{
							required: true,
							message: 'Please pick number',
						},
					],
				})(<Input placeholder="Please input number" />)}
			</Form.Item>

			<Form.Item label="price">
				{getFieldDecorator('price', {
					rules: [
						{
							required: true,
							message: 'Please pick price',
						},
					],
				})(<Input placeholder="Please input price" />)}
			</Form.Item>

			<Form.Item label="Breakeven">
				{getFieldDecorator('Breakeven', {
					rules: [
						{
							required: true,
							message: 'Please pick Breakeven',
						},
					],
				})(<Input placeholder="Please input Breakeven" />)}
			</Form.Item>

			<Form.Item label="description">
				{getFieldDecorator('description', {
					rules: [
						{
							required: false,
							message: 'Please input description',
						},
					],
				})(
					<TextArea
						rows={4}
						placeholder="Please input description"
					/>,
				)}
			</Form.Item>

			<Form.Item labelAlign="right" wrapperCol={{ span: 24 }}>
				<div className="" style={{ textAlign: 'right' }}>
					<Button type="primary" onClick={handleSubmit}>
						{' '}
						submit{' '}
					</Button>
				</div>
			</Form.Item>
		</Form>
	);
};

export default Form.create({})(Add);;
