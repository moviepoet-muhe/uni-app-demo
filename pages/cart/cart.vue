<template>
	<view class="cart">
		<view class="cart-item" v-for="goods in cart" :key="goods.id">
			<image :src="goods.image"></image>
			<view class="content">
				<view class="title">{{ goods.title }}</view>
				<view class="price">¥{{ goods.price }}</view>
				<view class="amount">数量: {{ goods.amount }}</view>
			</view>
		</view>
		
		<view class="totalAmount">总数量: {{ totalAmount }}件</view>
		<view class="total">合计金额: {{ totalPrice }}</view>
		
		<button @click="handleSubmit">下订单</button>
	</view>
</template>

<script>
	import { mapState } from 'pinia'
	import useCartStore from '../../store/cart'
	
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapState(useCartStore, ['cart', 'totalAmount', 'totalPrice'])
		},
		methods: {
			handleSubmit() {
				uni.navigateTo({
					url: '/pages/confirm/confirm',
				})
			}
		}
	}
</script>

<style lang="scss">
	.cart {
		&-item {
			display: flex;
			
			image {
				width: 64px;
				height: 64px;
			}
		}
	}
</style>
