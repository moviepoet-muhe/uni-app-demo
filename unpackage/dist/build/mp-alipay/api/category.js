"use strict";const utils_request=require("../utils/request.js");const getAllCategories=()=>utils_request.get("/api/tabs");exports.getAllCategories=getAllCategories;
