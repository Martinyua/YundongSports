/*
 * @Author: Martin
 * @Date: 2020-04-25 16:27:04
 * @LastEditTime: 2020-05-25 16:39:54
 * @FilePath: \YundongSports\src\reducers\team.ts
 */
const INITIAL_STATE={
    myTeam:[],
    teamInfo:{},//跑团信息
    teamMembers:[], //团队成员的信息
    rankList:[],//排行榜列表
}

export default function team(prestate = INITIAL_STATE,action){
    switch(action.type){
        case 'MORETEAM':
            //数组合并
            return {...prestate,myTeam:prestate.myTeam.concat(action.data)}
            //拆分数组中的数组  
        case 'MOREMEMBERS':
            return{...prestate,teamMembers:prestate.teamMembers.concat(action.data[0].userInfos),
                    teamInfo:{...action.data[0],userInfos:null}}
        case 'RANKINGLIST':
            return{...prestate,rankList:prestate.rankList.concat(action.data)}
        case 'CLEARMEM':
            return{...prestate,teamMembers:[]}
        case 'CLEARLIST':
            return{...prestate,myTeam:[]}
        case 'CLEARRANK':
            return{...prestate,rankList:[]}
        default:
            return {...prestate}
    }
}
