import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, message } from 'antd';

import Add from './components/Add/index';
// import Star from '@components/Star/star'
import './index.less';
import { columns } from './constant';
import { getRecords, delRecord } from './service';
import Filter from './components/FIlter';

const Index = () => {
	const [showAdd, setShowAdd] = useState(false);
	const [operaType, setOperaType] = useState('add');
	const [itemData, setItemData] = useState({});
	const [dataSource, setData] = useState([]);
	const [filterData, setFilterData] = useState({
		name:'',
		time:'',
		isAdd:"2"
	});

	const getData = function (params = {}) {
		getRecords(params).then((res:any) => {
			setData(res.result);
		});
	};

	const addCallback = (res) => {
		setShowAdd(false);
		getData();
	};
	const filterCallback = (params) => {
		setFilterData(params)
		getData(params);
	};
	
	const del = (item) => {
		Modal.confirm({
			title: 'Delete',
			content: '确认要删除该条记录吗',
			okText: '确认',
			cancelText: '取消',
			onOk: function () {
				delRecord({ id: item.id }).then((res: any) => {
					console.log(res);
					if (res.code === '0000') {
						message.success(res.message);
						getData();
					} else {
						message.error(res.message);
					}
				});
			},
		});
	};

	const update = (item) => {
		setItemData(item);
		setOperaType('update');
		setShowAdd(true);
	};

	const TableColumns = [
		...columns,
		{
			title: 'Action',
			dataIndex: 'id',
			key: 'action',
			render: (text, record) => (
				<div>
					<Button
						size="small"
						danger
						onClick={() => {
							del(record);
						}}
					>
						Delete
					</Button>
					<Button
						style={{ marginLeft: '8px' }}
						size="small"
						onClick={() => {
							update(record);
						}}
					>
						Update
					</Button>
				</div>
			),
		},
	];

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="index-container">
			{/* <Header /> */}
			{/* 主页居中容器 */}
			<div className="records-container">
				<div className="records-filter">
					<Filter 
						filterData={filterData}
						type={operaType}
						filterCallback={filterCallback} />
				</div>
				<div className="records-operations">
					<Button
						onClick={() => {
							setShowAdd(true);
						}}
					>
						Add
					</Button>
				</div>
				<div className="records-table">
					<Table
						dataSource={dataSource}
						columns={TableColumns}
						rowKey="id"
					/>
				</div>
			</div>
			<Modal
				title="Add record"
				centered
				open={showAdd}
				onCancel={() => setShowAdd(false)}
				width={1000}
				footer={null}
				forceRender
			>
				<div>
					<Add
						itemData={itemData}
						type={operaType}
						addCallback={addCallback}
					/>
				</div>
			</Modal>
		</div>
	);
};

export default Index;
