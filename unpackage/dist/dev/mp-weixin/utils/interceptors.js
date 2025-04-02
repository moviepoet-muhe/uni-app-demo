"use strict";
const common_vendor = require("../common/vendor.js");
const permissionList = ["/pages/confirm/confirm", "/pages/mine/mine"];
const apis = ["navigateTo", "switchTab", "redirectTo", "reLaunch", "navigateBack"];
apis.forEach((api) => {
  common_vendor.index.addInterceptor(api, {
    /**
     * 在跳转前，需要判断是否页面需要鉴权，如果页面需要鉴权，
     * 则判断是否有用户已登录，用户未登录，则跳转到登录页面
     */
    invoke(arg) {
      const { url } = arg;
      if (permissionList.includes(url)) {
        const token = common_vendor.index.getStorageSync("token");
        if (!token) {
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
          });
          return false;
        }
      }
    }
  });
});
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/interceptors.js.map
