import React, { useEffect, useRef } from 'react';
import { Form, Input, Button, DatePicker, message, Select } from 'antd';
import { addRecord, updateRecord } from '../../service';
import moment from 'moment';

const { TextArea } = Input;

interface ProdType {
	addCallback: (params:any) => any; 
	itemData?: any; 
	type: string;
}


const Add = (prods:ProdType) => {
	const { addCallback, itemData, type } = prods;
	const [form] = Form.useForm();
	
	const formRef = useRef(null);
	const formatStr = 'YYYY-MM-DD HH:mm:ss';

	const add = function (values: any) {
		const nowDate = new Date().getTime();
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

	const edit = function (values: any) {
		const nowDate = new Date().getTime();
		const data = {
			...values,
			id: itemData.id,
			time:
				(values.time && values.time.format(formatStr)) ||
				moment(nowDate).format(formatStr),
		}
		updateRecord(data).then((res: any) => {
			if (res.code === '0000') {
				message.success(res.message);
				addCallback(res);
			} else {
				message.error(res.message);
			}
		});
	};
	const handleSubmit = () => {
		const values = form.getFieldsValue();
		if (type === 'update') {
			edit(values);
		} else {
			add(values);
		}
		return false;
	};

	const onChange = function(){

	}

	const onOk = function(){
		
	}
	useEffect(() => {
		if (type === 'update' && formRef.current) {
			const values = { ...itemData };
			for (const i in values) {
				values[i] = `${values[i]}`;
			}
			delete values.id;
			values.time = moment(values.time, formatStr);
			form.setFieldsValue(values);
		}
	}, [itemData, type, form]);

	return (
		<Form
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 20 }}
			ref={formRef}
			form={form}
		>
      <Form.Item
        name="name"
        label="Name"
        rules={[
					{
						required: true,
						message: 'Please input name',
					},
        ]}
      >
			<Input placeholder="Please input name" />
      </Form.Item>

      <Form.Item
        name="time"
        label="Time"
        rules={[
					{
						required: true,
						message: 'Please pick date',
					},
        ]}
      >
        <DatePicker
						showTime
						format={formatStr}
						style={{ width: '100%' }}
					/>
      </Form.Item>

      <Form.Item
        name="amount"
        label="Amount"
        rules={[
					{
						required: true,
						message: 'Please pick amount',
					},
        ]}
      >
        <Input placeholder="Please input amount" />
      </Form.Item>

			<Form.Item
				name="number"
				label="Number"
				rules={[
					{
						required: true,
						message: 'Please pick number',
					},
				]}
			>
				<Input placeholder="Please input number" />
			</Form.Item>

			<Form.Item
				name="isAdd"
				label="isAdd"
				rules={[
					{
						required: true,
						message: 'Please pick type',
					},
				]}
			>
				<Select>
          <Select.Option value="1">add</Select.Option>
          <Select.Option value="0">reduce</Select.Option>
        </Select>
			</Form.Item>

			<Form.Item
				name="price"
				label="Price"
				rules={[
					{
						required: true,
						message: 'Please pick price',
					},
				]}
			>
				<Input placeholder="Please input price" />
			</Form.Item>

			<Form.Item
				name="Breakeven"
				label="Breakeven"
				rules={[
					{
						required: true,
						message: 'Please pick breakeven',
					},
				]}
			>
				<Input placeholder="Please input breakeven" />
			</Form.Item>

			<Form.Item
				name="description"
				label="description"
			>
				<TextArea placeholder="Please input description" />
			</Form.Item>


			<Form.Item labelAlign="right" wrapperCol={{ span: 24 }}>
				<div className="" style={{ textAlign: 'right' }}>
					<Button type="primary" onClick={handleSubmit}>
						submit{' '}
					</Button>
				</div>
			</Form.Item>
		</Form>
	);
};

export default Add;
