"use strict";
const utils_request = require("../utils/request.js");
const getHomeData = () => utils_request.get("/api/tab/1");
const getMore = (start = 0) => utils_request.get("/api/tab/1/feeds", { start });
exports.getHomeData = getHomeData;
exports.getMore = getMore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/home.js.map
