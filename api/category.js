import { get } from "../utils/request"

/**
 * 查询所有分类数据
 */
export const getAllCategories = () => get('/api/tabs')
