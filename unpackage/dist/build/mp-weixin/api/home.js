"use strict";const t=require("../utils/request.js");exports.getHomeData=()=>t.get("/api/tab/1"),exports.getMore=(e=0)=>t.get("/api/tab/1/feeds",{start:e});
