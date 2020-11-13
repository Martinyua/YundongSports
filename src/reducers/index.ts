/*
 * @Author: Martin
 * @Date: 2020-04-11 09:09:08
 * @LastEditTime: 2020-05-29 14:36:58
 * @FilePath: \YundongSports\src\reducers\index.ts
 */ 
import { combineReducers } from 'redux'
import counter from './counter'
import team from './team'
import eventDetail from './eventDetail'
import order from './order'

export default combineReducers({
  counter,
  team,
  eventDetail,
  order
})
