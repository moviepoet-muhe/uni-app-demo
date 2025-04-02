<template>
	<view>
		分类id = {{id}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
			}
		},
		
		onShow() {
			// 从globaData中获取保存的主分类id
			this.id=getApp().globalData.categoryId
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
