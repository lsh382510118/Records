export const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Number',
		dataIndex: 'number',
		key: 'number',
	},
	{
		title: 'isAdd',
		dataIndex: 'isAdd',
		key: 'isAdd',
		render: (text, record) => (
			<div> {record.isAdd == '0' ? 'Reduce' : 'Add'}</div>
		),
	},
	{
		title: 'price',
		dataIndex: 'price',
		key: 'price',
	},
	{
		title: 'Breakeven',
		dataIndex: 'Breakeven',
		key: 'Breakeven',
	},
	{
		title: 'Total',
		dataIndex: 'Total',
		key: 'Total',
	},
	{
		title: 'Time',
		dataIndex: 'time',
		key: 'time',
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		key: 'amount',
	},
	{
		title: 'rate',
		dataIndex: 'rate',
		key: 'rate',
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
	},
];
