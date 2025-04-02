"use strict";
const common_vendor = require("../common/vendor.js");
const useCartStore = common_vendor.defineStore("cart", {
  state() {
    return {
      cart: []
    };
  },
  getters: {
    /**
     * 总数量
     */
    totalAmount() {
      return this.cart.reduce((sum, item) => sum + item.amount, 0);
    },
    /**
     * 总金额
     */
    totalPrice() {
      return this.cart.reduce((sum, item) => sum += item.price * item.amount, 0);
    }
  },
  actions: {
    /**
     * 加入购物车
     * @param {Object} goods
     */
    addToCart(goods) {
      const has = this.cart.some((item) => item.id === goods.id);
      if (has) {
        this.cart = this.cart.map((item) => {
          if (item.id === goods.id) {
            item.amount += goods.amount ?? 1;
          }
          return item;
        });
      } else {
        this.cart.push(goods);
      }
    },
    /**
     * 从购物车中移除商品
     * @param {Object} id
     */
    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
    }
  }
});
exports.useCartStore = useCartStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/cart.js.map
