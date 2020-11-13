/*
 * @Author: Martin
 * @Date: 2020-04-24 18:23:36
 * @LastEditTime: 2020-10-15 19:56:10
 * @FilePath: \YundongSports\src\controller\TeamController.ts
 */

import Taro from '@tarojs/taro';
import TeamService from '../service/TeamService'

class TeamController {
    constructor() { };

    teamService = new TeamService;
    /**
     * @description:新建跑团
     * @param param 
     */
    async create(param) {
        Taro.showLoading({
            title: '提交中'
        })
        const token = Taro.getStorageSync('token') || undefined;
        const { logo, groupName, groupEnName, contactName, contactPhone, introduction, maxPerson } = param;
        console.log('param', param)
        console.log('token', token)
        Taro.uploadFile({
            url: `${this.teamService.baseUrl}/publishRunningGroup`,
            filePath: logo,
            name: 'logo',
            header: {
                token,
            },
            formData: {
                'groupName': groupName,
                'contactPhone': contactPhone,
                'groupEnName': groupEnName,
                'contactName': contactName,
                'introduction': introduction,
                'maxPerson': maxPerson
            },
            success: res => {
                const data = JSON.parse(res.data)
                console.log('data', data)
                if (data.data) {
                    Taro.showToast({
                        title: '创建成功！',
                        icon: 'success',
                        duration: 1500
                    })
                    Taro.hideLoading()
                    setTimeout(() => {
                        Taro.navigateTo({
                            url: `/pages/team/team`
                        })
                    }, 1500)
                } else {
                    Taro.showModal({
                        title: '提示',
                        content: '创建失败,' + data.Exception,
                        showCancel: false,
                        confirmColor: '#67c241'
                    })
                }
            },
            fail: res => {
                console.log('fail', res)
                Taro.showToast({
                    title: '创建失败，发生未知错误，请重试',
                    icon: 'none',
                    duration: 2000
                })
            }

        })
    }
    /**
     * @description 修改跑团信息并且修改图片
     * @param param 
     */
    async update(param) {
        const token = Taro.getStorageSync('token') || undefined;
        const { runningGroupId, logo, groupName, groupEnName, contactName, contactPhone, introduction, maxPerson } = param;
        Taro.uploadFile({
            url: `${this.teamService.baseUrl}/userUpdateRunningGroup`,
            filePath: logo,
            name: 'logo',
            header: {
                token,
            },
            formData: {
                'runningGroupId': runningGroupId,
                'groupName': groupName,
                'contactPhone': contactPhone,
                'groupEnName': groupEnName,
                'contactName': contactName,
                'introduction': introduction,
                'maxPerson': maxPerson
            },
            success: res => {
                const data = JSON.parse(res.data)
                console.log('data', data)
                if (data.data) {
                    Taro.showToast({
                        title: '修改成功！',
                        icon: 'success',
                        duration: 1500
                    })
                    setTimeout(() => {
                        Taro.navigateBack()
                    }, 1500)
                } else {
                    Taro.showModal({
                        title: '提示',
                        content: '修改失败,' + data.Exception,
                        showCancel: false,
                        confirmColor: '#67c241'
                    })
                }
            },
            fail: res => {
                console.log('fail', res)
                Taro.showToast({
                    title: '创建失败，发生未知错误，请重试',
                    icon: 'none',
                    duration: 2000
                })
            }

        })
    }

    /**
     * @description 不更改图片的情况下修改跑团信息
     * @param param 
     */
    updateWithoutpic(param) {
        this.teamService.updateWithoutPic(param).then(
            res => {
                if (res) {
                    Taro.showToast({
                        title: '修改成功！',
                        icon: 'success',
                        duration: 1500
                    })
                    setTimeout(() => {
                        Taro.navigateBack()
                    }, 1500)
                } else {
                    Taro.showModal({
                        title: '提示',
                        content: '修改失败',
                        showCancel: false,
                        confirmColor: '#67c241'
                    })
                }

            }
        )
    }
    //获取我的跑团列表
    /**
     * @description 获取我的跑团列表
     * @param that 
     * @param pageNum 
     * @param pageSize 
     * @param hasNext 
     */
    getMoreMyTeam(that, pageNum: number = 1, pageSize: number = 6, hasNext) {
        return async (dispatch) => {
            const res = await this.teamService.getTeamList(pageNum, pageSize); //这里的res直接是res.data.data
            if (res.length <= 0) {
                hasNext = false
            }
            that.setState({
                pageNum: pageNum + 1,
                pageSize: pageSize,
                hasNext: hasNext
            })
            console.log(res)
            dispatch(this.moreMyTeam(res))
        }
    }
    /**
     * @description 获取当前跑团的成员
     * @param that 
     * @param groupId 
     * @param pageNum 
     * @param pageSize 
     */
    getMoreTeamMembers(that, groupId: string, pageNum: number = 1, pageSize: number = 50) {
        return async (dispatch) => {
            const res = await this.teamService.getTeamMembers(groupId, pageNum, pageSize);
            that.setState({
                pageNum: res.pageNum + 1,
                pageSize: res.pageSize
            })
            console.log(res)
            dispatch(this.MoreTeamMembers(res))
        }
    }

    //获取跑团积分排行榜
    getRankingList(that, pageNum: number = 1, pageSize: number = 10, hasNext) {
        return async (dispatch) => {
            const res = await this.teamService.getRankList(pageNum, pageSize)
            if (res.length <= 0) {
                hasNext = false
            }
            that.setState({
                pageNum: pageNum + 1,
                pageSize: pageSize,
                hasNext: hasNext
            })
            dispatch(this.rankingList(res))
        }
    }
    rankingList(data) {
        return {
            type: 'RANKINGLIST',
            data
        }
    }
    clear() {
        return {
            type: 'CLEARMEM'
        }
    }
    clearList() {
        return {
            type: 'CLEARLIST'
        }
    }
    clearRankList() {
        return {
            type: 'CLEARRANK'
        }

    }
    moreMyTeam(data) {
        return {
            type: 'MORETEAM',
            data
        }
    }
    MoreTeamMembers(data) {
        return {
            type: 'MOREMEMBERS',
            data
        }
    }
}

export default TeamController;
