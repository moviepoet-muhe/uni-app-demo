<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		// 自定义一个用于整个应用中全局共享数据的属性
		globalData:{
			categoryId:0,
		},
	}
</script>

<style>
	/*每个页面公共css */
</style>
