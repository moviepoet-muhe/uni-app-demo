"use strict";
const common_vendor = require("../../common/vendor.js");
const store_cart = require("../../store/cart.js");
const api_category = require("../../api/category.js");
const api_home = require("../../api/home.js");
const _sfc_main = {
  data() {
    return {
      categories: [],
      banners: [],
      recommends: [],
      // 推荐商品
      nextIndex: 0,
      // 下一页数据的起始索引
      isEnd: false
      // 是否全部数据查询完毕
    };
  },
  async onLoad() {
    try {
      const res = await Promise.all([
        api_category.getAllCategories(),
        api_home.getHomeData()
      ]);
      common_vendor.index.__f__("log", "at pages/index/index.vue:60", "res:::", res);
      this.categories = res[0].list;
      this.banners = res[1].banners;
      this.recommends = res[1].items.list;
      this.nextIndex = res[1].items.nextIndex;
      this.isEnd = res[1].items.isEnd;
    } catch (error) {
      common_vendor.index.__f__("error", "at pages/index/index.vue:67", "error:", error);
    }
  },
  onPullDownRefresh() {
    common_vendor.index.__f__("log", "at pages/index/index.vue:72", "下拉刷新效果...");
  },
  async onReachBottom() {
    if (this.isEnd) {
      common_vendor.index.__f__("log", "at pages/index/index.vue:77", "全部数据查询完毕");
      return;
    }
    try {
      const res = await api_home.getMore(this.nextIndex);
      this.recommends = this.recommends.concat(res.list);
      this.nextIndex = res.nextIndex;
      this.isEnd = res.isEnd;
    } catch (error) {
      common_vendor.index.__f__("log", "at pages/index/index.vue:88", "查询数据异常:::", error);
    }
  },
  methods: {
    ...common_vendor.mapActions(store_cart.useCartStore, {
      addToCart: "addToCart",
      remove: "removeFromCart"
    }),
    // 	跳转详情页
    jumpToDetail(id) {
      common_vendor.index.navigateTo({
        url: "/pages/detail/detail?id=" + id
      });
    },
    // 跳转到 tabbar 页面
    jumpToCategory(id) {
      getApp().globalData.categoryId = id;
      common_vendor.index.switchTab({
        url: "/pages/category/category"
      });
    },
    /**
     * 处理加入购物车
     */
    handleAddToCart(goods) {
      const { id, title, price, image } = goods;
      const currGoods = {
        id,
        title,
        price,
        image,
        amount: 1
        // 选购商品的数量
      };
      this.addToCart(currGoods);
      common_vendor.index.showToast({
        title: "加入购物车成功!",
        duration: 2e3
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  _easycom_uni_search_bar2();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  _easycom_uni_search_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      placeholder: "请输入搜索关键字",
      ["cancel-text"]: "登录",
      cancelButton: "always"
    }),
    b: common_vendor.f($data.categories, (category, k0, i0) => {
      return {
        a: common_vendor.t(category.name),
        b: category.id,
        c: common_vendor.o(($event) => $options.jumpToCategory(category.id), category.id)
      };
    }),
    c: common_vendor.f($data.banners, (banner, k0, i0) => {
      return {
        a: banner.image,
        b: banner.id
      };
    }),
    d: common_vendor.f($data.recommends, (goods, k0, i0) => {
      return {
        a: goods.image,
        b: common_vendor.o(($event) => $options.jumpToDetail(goods.id), goods.id),
        c: common_vendor.t(goods.title),
        d: "/pages/detail/detail?id=" + goods.id,
        e: common_vendor.t(goods.price),
        f: common_vendor.o(($event) => $options.handleAddToCart(goods), goods.id),
        g: goods.id
      };
    }),
    e: !$data.isEnd
  }, !$data.isEnd ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
