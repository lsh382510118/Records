import React, { Component } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';

import RouterMap from './routers/index';
import '@style/common.css';
import '@fonts/iconfont.css';
import 'antd/dist/antd.css';
import './style/global.less';

const App = () => {
	return (
		<div style={{ height: '100%' }}>
			<Route path="/" render={() => <Redirect to="/index" />} exact />
			<RouterMap />
		</div>
	);
};

export default withRouter(App);
