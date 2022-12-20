const { query, createTable } = require('./index');
let records = `CREATE TABLE IF NOT EXISTS records(
        id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id',
        name VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'name',
        description VARCHAR(64) CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '描述',
        time VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '添加时间',
        amount FLOAT(10) UNSIGNED NOT NULL COMMENT '金额',
        number INT(10) UNSIGNED NOT NULL COMMENT '数量',
        price FLOAT(10) UNSIGNED NOT NULL COMMENT '价格',
        Total FLOAT(10) UNSIGNED NOT NULL COMMENT '总价值',
        rate FLOAT(10) UNSIGNED NOT NULL COMMENT '价格',
        Breakeven FLOAT(10) UNSIGNED NOT NULL COMMENT '保本',
        PRIMARY KEY (ID)
    )`;

createTable(records);

// // 新增记录
exports.insertRecord = (value) => {
	console.log('value', value);
	let _sql =
		'insert into records set name=?, number=?, price=?, time=?, amount=?, total=?, rate=?, Breakeven=?, description=?;';
	return query(_sql, value);
};

// 获取记录
exports.getRecords = (value) => {
	let _sql = 'select * from records';
	return query(_sql, value);
};

// 删除记录
exports.delRecord = (id) => {
	let _sql = `delete from records where id = '${id}'`;
	return query(_sql, id);
};

// 更新记录
exports.updateRecord = (value) => {
	let _sql =
		'update records set name=?, description=?, amount=?, number=?, price=?, time=? where id=?';
	return query(_sql, value);
};
