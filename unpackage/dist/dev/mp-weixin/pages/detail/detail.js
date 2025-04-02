"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const id = common_vendor.ref(0);
    const title = common_vendor.ref("");
    const price = common_vendor.ref(0);
    const originPrice = common_vendor.ref(0);
    const images = common_vendor.ref([]);
    common_vendor.onLoad(async (query) => {
      id.value = query.id;
      try {
        const result = await utils_request.get("/api/detail", { id: query.id });
        common_vendor.index.__f__("log", "at pages/detail/detail.vue:49", "根据获取到的商品 id 查询商品详情:", result);
        title.value = result.detail.title;
        price.value = result.detail.price, originPrice.value = result.detail.originPrice, // 原价字段
        images.value = result.detail.photo;
      } catch (error) {
        common_vendor.index.__f__("log", "at pages/detail/detail.vue:57", "查询数据异常:::", error);
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(id.value),
        b: common_vendor.t(title.value),
        c: common_vendor.t(price.value),
        d: common_vendor.t(originPrice.value),
        e: common_vendor.t(images.value.length),
        f: common_vendor.f(images.value, (item, k0, i0) => {
          return {
            a: item.url
          };
        }),
        g: id.value
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/detail/detail.js.map
