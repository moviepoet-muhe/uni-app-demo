<template>
	<view class="home">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>

		<!-- 搜索栏 -->
		<uni-search-bar placeholder="请输入搜索关键字" cancel-text="登录" cancelButton="always" />
		<!-- 分类滚动视图 -->
		<scroll-view scroll-x class="scroll-category">
			<text v-for="category in categories" :key="category.id"
				style="white-space: nowrap; padding: 0 12px;">{{ category.name }}</text>
		</scroll-view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="400" :circular="true">
			<swiper-item v-for="banner in banners" :key="banner.id">
				<image :src="banner.image" style="width: 100%; height: 100%;"></image>
			</swiper-item>
		</swiper>
		<!-- 推荐列表 -->
		<view class="recommend-list">
			<view class="recommend-list-item" v-for="goods in recommends" :key="goods.id">
				<image class="img" :src="goods.image"></image>
				<view class="title">{{ goods.title }}</view>
				<view class="price">¥{{ goods.price }}</view>
			</view>
		</view>
		<view v-if="!isEnd">加载中...</view>
		<view v-else>全部查询完毕</view>
	</view>
</template>

<script>
	import {
		getAllCategories
	} from '../../api/category.js'
	import {
		getHomeData,
		getMore
	} from '../../api/home.js'

	export default {
		data() {
			return {
				categories: [],
				banners: [],
				recommends: [], // 推荐商品
				nextIndex: 0, // 下一页数据的起始索引
				isEnd: false, // 是否全部数据查询完毕
			}
		},
		async onLoad() {
			try {
				const res = await Promise.all([
					getAllCategories(),
					getHomeData(),
				])
				console.log('res:::', res)
				this.categories = res[0].list
				this.banners = res[1].banners
				this.recommends = res[1].items.list
				this.nextIndex = res[1].items.nextIndex
				this.isEnd = res[1].items.isEnd
			} catch (error) {
				console.error('error:', error)
			}
		},
		onPullDownRefresh() {
			console.log('下拉刷新效果...')
		},
		async onReachBottom() {
			if (this.isEnd) {
				console.log('全部数据查询完毕')
				return
			}

			// 还有更多数据，则发送网络请求，继续查询
			try {
				const res = await getMore(this.nextIndex)
				this.recommends = this.recommends.concat(res.list)
				this.nextIndex = res.nextIndex
				this.isEnd = res.isEnd
			} catch (error) {
				console.log('查询数据异常:::', error)
			}
		},
	}
</script>

<style scoped lang="scss">
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.scroll-category {
		white-space: nowrap;
	}

	.recommend-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		&-item {
			width: 360rpx;
			padding: 5rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #eaeaea;
			margin-bottom: 12rpx;

			.img {
				width: 350rpx;
				height: 350rpx;
			}

			.price {
				color: $primary-color;
				align-self: flex-start;
			}
		}
	}
</style>