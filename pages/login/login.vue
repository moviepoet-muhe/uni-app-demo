<template>
	<view>
		<!-- #ifdef WEB -->
		<uni-forms ref="baseForm" :modelValue="user" class="login-form">
			<uni-forms-item label="用户名" required>
				<uni-easyinput v-model="user.username" placeholder="请输入用户名" />
			</uni-forms-item>
			<uni-forms-item label="密码" required>
				<uni-easyinput v-model="user.password" type="password" placeholder="请输入密码" />
			</uni-forms-item>
			<uni-forms-item>
				<button type="primary" @click="handleLogin">登录</button>
			</uni-forms-item>
		</uni-forms>
		<!-- #endif -->
		<uni-forms ref="baseForm" :modelValue="user" class="login-form">
			<uni-forms-item label="用户名" required>
				<uni-easyinput v-model="user.username" placeholder="请输入用户名" />
			</uni-forms-item>
			<uni-forms-item label="密码" required>
				<uni-easyinput v-model="user.password" type="password" placeholder="请输入密码" />
			</uni-forms-item>
			<uni-forms-item>
				<button type="primary" @click="handleLogin">登录</button>
			</uni-forms-item>
		</uni-forms>
		<!-- #ifdef MP-WEIXIN -->
		<button type="primary" @click="handleLogin">微信一键登录</button>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// #ifdef WEB
				user: {
					username: '',
					password: '',
				},
				// #endif
			}
		},
		methods: {
			handleLogin() {
				// #ifdef WEB
				console.log('浏览器中实现用户登录...')
				setTimeout(() => {
					console.log('模拟浏览器端发送网络请求，根据用户名与密码实现登录')
					uni.showToast({
						title: '登录成功...',
						duration: 1000,
					})
				}, 1000)
				
				uni.setStorage({
					key: 'token',
					data: 'adsflkjasdlfkjalskdfjlaksdjf',
				})
				// #endif
				
				// #ifdef MP-WEIXIN
				// 小程序中的用户登录，首先在小程序端调用 wx.login() 获取用户临时登录凭证 code，
				// 然后将 code 通过网络请求发送给后端用户登录接口，后端会与微信接口服务进行认证，
				// 后端认证完成通过后，会将自定义的用户登录状态返回给前端，比如生成用户登录成功的 token，
				// 小程序端获取到网络请求的响应数据后，如果登录成功，则将 token 保存到本地 storage 中.
				// 在后续业务数据接口访问时，将本地存储的 token 携带在请求中发送到服务端继续验证，
				// 服务端验证通过后再返回对应业务接口的业务数据交由前端处理。
				wx.login({
					success: res => {
						console.log('res:', res)
						uni.setStorage({
							key: 'token',
							data: 'adsflkjasdlfkjalskdfjlaksdjf',
						})
						// // TODO::: 将用户临时登录凭证发送给后端的登录接口
						// wx.request({
						// 	url: 'xxxx/login',
						// 	method: 'POST',
						// 	data: {
						// 		code: res.code, // 传递用户临时登录凭证给后端
						// 	},
						// 	success: res => {
						// 		// 判断登录结果
						// 		if(res.data.code === 200) {
						// 			wx.setStorage({
						// 				key: 'token',
						// 				data: res.data.token,
						// 			})
						// 		}
						// 	}
						// })
					}
				})
				// #endif
			},
		}
	}
</script>

<style lang="scss">
/* #ifdef H5 */
.login-form {
	padding: 12rpx;
}
/* #endif */
</style>