import React, { useState } from 'react';
import { Icon } from 'antd';
import 'swiper/dist/css/swiper.min.css';
import { articleClassify } from './constance';

import Header from '@components/Header/header';
// import Star from '@components/Star/star'
import './index.less';

const Index = () => {
	const [setBannerText1, bannerText1] = useState('听见薄雾微光');

	return (
		<div className="index">
			<Header />

			{/* 流星背景 */}
			{/* <Star /> */}

			{/* 主页居中容器 */}
			<div className="index-container">
				{/* 主页banner */}
				<div className="banner">
					{/* banner搜索按钮 */}
					<div className="search">
						<input type="search" className="search-input" />
					</div>

					<p className="banner-text">{bannerText1}</p>
				</div>

				{/* 文章模块 */}
				<div className="article-classify">
					<p className="article-title">· 止 境</p>

					<div className="swiper-container">
						<div className="swiper-wrapper">
							{articleClassify &&
								articleClassify.map((data, index) => {
									return (
										<div
											className="swiper-slide"
											key={data.id}
										>
											<div className="effect-milo">
												<img src={data.thumb} />
												<div className="effect-item">
													<h2 className="item-title">
														{data.title}
													</h2>
													<p className="item-description">
														{data.description}
													</p>
													<a
														className="item-link"
														href="#"
													>
														View more
													</a>
												</div>
											</div>
										</div>
									);
								})}
						</div>
						<div className="swiper-pagination"></div>
					</div>
				</div>

				{/* 推荐文章 */}
				<div className="recommend">
					<p className="recommend-title">· 推 荐</p>

					<div className="recommend-wrapper">
						{/* 左侧推荐文章 */}
						<div className="recommend-article">
							<div className="article-list">
								{/* 左侧文章封面 */}
								<div className="list-left">
									<img
										src="http://localhost:3000/images/classify9.jpg"
										alt=""
									/>

									<div className="article-list-info">
										<p className="info-item">
											<Icon
												type="tag"
												className="icon tag"
											/>
											<span className="text">
												css | html
											</span>
										</p>

										<p className="info-item">
											<Icon
												type="dashboard"
												className="icon time"
											/>
											<span className="text">
												2018/2/2
											</span>
										</p>

										<p className="info-item">
											<Icon
												type="eye-o"
												className="icon saw"
											/>
											<span className="text">
												浏览(300)
											</span>
										</p>
									</div>
								</div>

								{/* 右侧文章内容 */}
								<div className="list-right">
									<h3 className="article-title">
										这里是文章标题
									</h3>
									<p className="article-content">
										这里是文章内容这里是文章内容这里是文章内容这里是文章内容这里是文章内容这里是文章内容
									</p>
									{/* 阅读原文 */}
									<p className="read-orign">阅读原文</p>
								</div>
							</div>
						</div>

						{/* 右侧个人信息 */}
						<div className="base-info"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Index;
