/*
 * @Author: Martin
 * @Date: 2020-04-25 15:56:54
 * @LastEditTime: 2020-06-05 17:44:51
 * @FilePath: \YundongSports\src\service\TeamService.ts
 */
import BaseService from './BaseService'

class TeamService extends BaseService{
    constructor(){
        super();
    }
    /**
     * @description 获取用户加入的跑团
     * @param pageNum 
     * @param pageSize 
     */
    async getTeamList(pageNum = 1,pageSize = 10){
        const param = {
            pageNum,
            pageSize
        }
        const res = await this.http.get(`${this.baseUrl}/getUserJoin`,param)
        return res;
    }
    /**
     * @description 获取跑团成员
     * @param runningGroupId 
     * @param pageNum 
     * @param pageSize 
     */
    async getTeamMembers(runningGroupId, pageNum = 1,pageSize = 50){
        const param = {
            runningGroupId,
            pageNum,
            pageSize
        }
        const res = await this.http.get(`${this.baseUrl}/getRunningGroupUserNoJoinType`,param)
        return res;
    }

    /**
     * @description 获取跑团详细信息
     * @param runningGroupId 
     */
    async getTeamDetail(runningGroupId){
        const param = {
            runningGroupId
        }
        const res = await this.http.get(`${this.baseUrl}/getRunningGroupDetail`,param)
        return res
    }
    /**
     * @description 不修改图片的情况下修改跑团信息
     * @param param 
     */
    async updateWithoutPic(param){
        const res = await this.http.post(`${this.baseUrl}/userUpdateRunningGroup`,param,'application/x-www-form-urlencoded')
        return res
    }
    /**
     * @description 获取跑团排行榜列表
     * @param pageNum 
     * @param pageSize 
     */
    async getRankList(pageNum = 1,pageSize = 10){
        const param = {
            pageNum,pageSize
        }
        const res = await this.http.get(`${this.baseUrl}/getRank`,param)
        return res
    }
}
export default TeamService

