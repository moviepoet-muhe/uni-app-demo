import { get } from "../utils/request"

/**
 * 查询首页数据
 */
export const getHomeData = () => get('/api/tab/1')

/**
 * 查询更多推荐商品
 */
export const getMore = (start = 0) => get('/api/tab/1/feeds', { start })
