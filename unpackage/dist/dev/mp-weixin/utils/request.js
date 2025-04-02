"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "http://113.45.10.129:3000";
const request = ({ url, method, data, headers = {} } = {}) => {
  if (!url) {
    throw new Error("请求的url不存在!");
  }
  url = baseURL + url;
  const token = common_vendor.index.getStorageSync("token");
  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`
    };
  }
  return common_vendor.index.request({
    url,
    method,
    data,
    headers
  }).then((res) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const { code, data: data2, message } = res.data;
      if (code === 200) {
        return data2;
      }
      return Promise.reject(message);
    }
    return Promise.reject(new Error("状态码:" + res.statusCode));
  }).catch((error) => {
    return Promise.reject(error);
  });
};
const get = (url, data) => request({ url, data });
exports.get = get;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
