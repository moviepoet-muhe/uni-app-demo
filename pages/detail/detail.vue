<template>
<view class="detail-container">
  <!-- 基础信息 -->
  <view class="id-row">商品ID: {{id}}</view>
  <view class="title">{{title}}</view>

  <!-- 价格显示 -->
  <view class="price-section">
    <text class="current-price">¥{{price}}</text>
    <text class="origin-price"  >原价:¥{{originPrice}}</text>
  </view>

  <!-- 图片轮播 -->
  <view class="photo-section">
    <view class="section-title">商品图集（{{images.length}}张）</view>
    <scroll-view class="photo-list" scroll-x>
      <block v-for="item in images" :key="id">
        <image :src="item.url" class="goods-photo" />
      </block>
    </scroll-view>
  </view>
</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	
	import {
		onLoad
	} from '@dcloudio/uni-app'
	
	import {get} from '/utils/request.js'
	
	const id = ref(0)
	const title=ref('')
	const price=ref(0)
    const originPrice =ref(0)
	const images= ref([])
	
	// 页面声明周期钩子，监听页面加载在组合式API中需要从@dcloudio/uni-app包中导入onLoad
	// 可以在回调函数的参数中，获取到跳转到当前页面时，路径中传递的 ? 查询字符串参数数据
	 onLoad(async (query)=>{
		id.value = query.id
		 // 根据获取到的商品 id 查询商品详情
		  try {
		       const result = await get('/api/detail', { id: query.id })
		       console.log('根据获取到的商品 id 查询商品详情:', result);
		       
		         title.value= result.detail.title
		         price.value= result.detail.price,
		         originPrice.value=result.detail.originPrice, // 原价字段
		         images.value= result.detail.photo // 图片数组 [{id:,url:}]
		     
		     } catch (error) {
		       console.log('查询数据异常:::', error)
		     }
	})
	
</script>

<style>
/* 图片列表样式 */
.photo-list {
	white-space: nowrap;
	padding: 20rpx 0;
}

.goods-photo {
	width: 240rpx;
	height: 240rpx;
	border-radius: 12rpx;
	margin-right: 20rpx;
}

/* 价格样式 */
.current-price {
	color: #e4393c;
	font-size: 36rpx;
	font-weight: bold;
}

.origin-price {
	color: #999;
	font-size: 24rpx;
	text-decoration: line-through;
	margin-left: 20rpx;
}
</style>