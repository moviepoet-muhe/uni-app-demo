/**
 * 封装网络请求
 */
const baseURL = 'http://113.45.10.129:3000'

/**
 * 网络请求
 */
const request = ({url, method, data, headers = {}} = {}) => {
	if (!url) {
		throw new Error('请求的url不存在!')
	}
	// 在 url 前拼接基准 baseURL 地址
	url = baseURL + url
	// 请求头处理，某些接口需要在请求头中传递用户登录的 token 进行认证
	const token = uni.getStorageSync('token')
	if (token) {
		// header.Authorization = `Bearer ${token}`
		headers = {
		      ...headers,
		      Authorization: `Bearer ${token}`
		    }
	}
	
	// 发送网络请求
	return uni.request({
		url,
		method,
		data,
		headers,
	})
		.then(res => {
			if (res.statusCode >= 200 && res.statusCode < 300) {
				const {code, data, message} = res.data
				if (code === 200) {
					return data
				}
				
				return Promise.reject(message)
			}
			
			return Promise.reject(new Error('状态码:' + res.statusCode))
		})
		.catch(error => {
			return Promise.reject(error)
		})
}

/**
 * 基于 request() 来封装 get 别名方法
 */
export const get = (url, data) => request({url, data})

/**
 * 基于 request() 来封装 post 别名方法
 */
export const post = (url, data) => request({url, method: 'POST', data})

/**
 * 基于 request() 来封装 put 别名方法
 */
export const put = (url, data) => request({url, method: 'PUT', data})

export default request
