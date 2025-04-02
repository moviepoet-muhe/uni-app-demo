import { defineStore } from 'pinia'

const useCartStore = defineStore('cart', {
	state() {
		return {
			cart: [],
		}
	},
	getters: {
		/**
		 * 总数量
		 */
		totalAmount() {
			return this.cart.reduce((sum, item) => sum + item.amount, 0)
		},
		/**
		 * 总金额
		 */
		totalPrice() {
			return this.cart.reduce((sum, item) => sum += item.price * item.amount, 0)
		},
	},
	actions: {
		/**
		 * 加入购物车
		 * @param {Object} goods
		 */
		addToCart(goods) {
			// 判断原购物车中是否存在当前选购商品
			const has = this.cart.some(item => item.id === goods.id)
			// 存在，则叠加选购数量，不存在则将当前选购商品数据保存到购物车数组中
			if (has) {
				this.cart = this.cart.map(item => {
					if (item.id === goods.id) {
						item.amount += goods.amount ?? 1
					}
					return item
				})
			} else {
				this.cart.push(goods)
			}
		},
		/**
		 * 从购物车中移除商品
		 * @param {Object} id
		 */
		removeFromCart(id) {
			this.cart = this.cart.filter(item => item.id !== id)
		},
	},
})

export default useCartStore
