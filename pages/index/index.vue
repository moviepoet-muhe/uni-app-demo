<template>
	<view class="home">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>

		<!-- 搜索栏 -->
		<uni-search-bar placeholder="请输入搜索关键字" cancel-text="登录" cancelButton="always" />
		<!-- 分类滚动视图 -->
		<scroll-view scroll-x class="scroll-category">
			<text v-for="category in categories" :key="category.id" @click="jumpToCategory(category.id)"
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
				<image class="img" :src="goods.image" @click="jumpToDetail(goods.id)"></image>
				<navigator open-type="navigate" :url="'/pages/detail/detail?id='+goods.id" class="title">
					{{ goods.title }}</navigator>
				<view class="price">¥{{ goods.price }}
	
				<button style="font-size:12px;" @click="handleAddToCart(goods)">加入购物车 </button>
				</view>
			</view>
		</view>
		<view v-if="!isEnd">加载中...</view>
		<view v-else>全部查询完毕</view>
	</view>
</template>

<script>
	import { mapActions } from 'pinia'
	import useCartStore from '../../store/cart.js'
	import { getAllCategories } from '../../api/category.js'
	import { getHomeData, getMore } from '../../api/home.js'
	
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
		
		methods: {
			...mapActions(useCartStore, {
				addToCart: 'addToCart',
				remove: 'removeFromCart',
			}),
			
			// 	跳转详情页
			jumpToDetail(id) {
				// console.log('点击了图片', id);
				// 调用 uni.navigateTo() 跳转到非 tabbar 页面
				uni.navigateTo({
					url: '/pages/detail/detail?id='+id,
				})
			},
			
			// 跳转到 tabbar 页面
			jumpToCategory(id){
				// 调用 uni.switchTab()跳转到 tabbar 页面，
				// 但要注意的是，跳转时的 url 后不能跟查询字符串参数
				// 向 tabbar 页面跳转前，可将需要传递的数据先保存到 globalData 中
				getApp().globalData.categoryId = id
				// 跳转 tabbar 页面
				uni.switchTab({
						url: '/pages/category/category',
				})
			},
			
			/**
			 * 处理加入购物车
			 */
			handleAddToCart(goods) {
				// 构建当前加入购物车商品的信息
				const {id, title, price, image} = goods
				const currGoods = {
					id,
					title,
					price,
					image,
					amount: 1, // 选购商品的数量
				}
				// 将当前选购商品的数据信息保存到 store 中
				this.addToCart(currGoods)
				// 轻提示
				uni.showToast({
					title: '加入购物车成功!',
					duration: 2000,
				})
			}
		}
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