/**
 * 对路由导航进行拦截处理
 */
// permissionList 中保存需要鉴权的路径字符串信息
const permissionList = ['/pages/confirm/confirm', '/pages/mine/mine']

// 待拦截的 api
const apis = ['navigateTo', 'switchTab', 'redirectTo', 'reLaunch', 'navigateBack']

apis.forEach(api => {
	uni.addInterceptor(api, {
		/**
		 * 在跳转前，需要判断是否页面需要鉴权，如果页面需要鉴权，
		 * 则判断是否有用户已登录，用户未登录，则跳转到登录页面
		 */
		invoke(arg) {
			// 获取跳转后的地址路径
			const { url } = arg
			// 判断跳转的地址是否需要鉴权
			// 如果需要鉴权，则判断是否有用户登录的 token
			if (permissionList.includes(url)) {
				// 需要鉴权处理，则从本地获取登录用户的 token
				const token = uni.getStorageSync('token')
				// 如果没有登录的 token，则跳转到登录页面
				if (!token) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return false
				}
			}
		},
	})
})
