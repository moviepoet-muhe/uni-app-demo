"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    handleLogin() {
      common_vendor.wx$1.login({
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/login/login.vue:62", "res:", res);
          common_vendor.index.setStorage({
            key: "token",
            data: "adsflkjasdlfkjalskdfjlaksdjf"
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleLogin && $options.handleLogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
