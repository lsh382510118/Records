import React, { useEffect, useRef } from 'react';
import { Form, Input, Button, DatePicker, message, Select } from 'antd';
import moment from 'moment';


interface ProdType {
	filterCallback: (params:any) => any; 
	filterData?: any; 
	type: string;
}


const Filter = (prods:ProdType) => {
	const { filterCallback, filterData, type } = prods;
	const [form] = Form.useForm();
	
	const formRef = useRef(null);
	const formatStr = 'YYYY-MM-DD HH:mm:ss';


	const handleSubmit = () => {
		const values = form.getFieldsValue();
		console.log('values:',values)
		filterCallback(values);
		return false;
	};

	// useEffect(() => {
	// 	if (type === 'update' && formRef.current) {
	// 		const values = { ...filterData };
	// 		for (const i in values) {
	// 			values[i] = `${values[i]}`;
	// 		}
	// 		values.time = moment(values.time, formatStr);
	// 		console.log("🚀 ~ file: index.tsx:64 ~ handleSubmit ~ values", values)
	// 		form.setFieldsValue(values);
	// 	}
	// }, [filterData, type, form]);
	return (
		<Form
			ref={formRef}
			form={form}
			layout="inline"
		>
      <Form.Item name="name" label="Name" >
				<Input placeholder="Please input name" />
      </Form.Item>

      {/* <Form.Item name="time" label="Time" >
        <DatePicker
						showTime
						format={formatStr}
						style={{ width: '100%' }}
					/>
      </Form.Item> */}

			<Form.Item name="isAdd" label="isAdd" >
				<Select  style={{ width: '200px' }}>
          <Select.Option value="2">All</Select.Option>
          <Select.Option value="1">add</Select.Option>
          <Select.Option value="0">reduce</Select.Option>
        </Select>
			</Form.Item>

			<Form.Item labelAlign="right" wrapperCol={{ span: 24 }}>
				<div className="" style={{ textAlign: 'right' }}>
					<Button type="primary" onClick={handleSubmit}> Search </Button>
				</div>
			</Form.Item>
		</Form>
	);
};

export default Filter;
