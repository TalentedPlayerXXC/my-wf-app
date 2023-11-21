/**
 * wf 接口集合
 * 选设计这个东西的话需要考虑两种情况 web端以及 KOOK or Discord 机器人 
 * 封装的方法那就需要考虑传递一个参数用来区分 这两种情况
 */
import axios from 'axios'
// 仲裁 arbitration
// arbitration 
function arbitration(type = "detail") {
    return axios.get(`/api/wf/${type}/arbitration`)
}
// 突击
// sortie
function sortie(type = "detail") {
    return axios.get(`/api/wf/${type}/sortie`)
}
// 集团任务 (仅限dev、detail的json数据)
// syndicateMissions
function syndicateMissions(type = "detail") {
    return axios.get(`/api/wf/${type}/syndicateMissions`)
}


// // 地球赏金  (仅限robot的string数据)
// // Ostrons
// function Ostrons(type = "robot") {
//     return axios.get(`/api/wf/${type}/Ostrons`)
// }
// // 金星赏金  (仅限robot的string数据)
// // Solaris
// function Solaris(type = "robot") {
//     return axios.get(`/api/wf/${type}/Solaris`)
// }
// // 火卫二赏金  (仅限robot的string数据)
// // EntratiSyndicate
// function EntratiSyndicate(type = "robot") {
//     return axios.get(`/api/wf/${type}/Solaris`)
// }
// 新闻
// news
function news(type = "detail") {
    return axios.get(`/api/wf/${type}/news`)
}
// 活动
// events
function events(type = "detail") {
    return axios.get(`/api/wf/${type}/events`)
}
// 裂隙
// fissures
function fissures(type = "detail") {
    return axios.get(`/api/wf/${type}/fissures`)
}


export {
    arbitration,
    sortie,
    syndicateMissions,
    // Ostrons,
    // Solaris,
    // EntratiSyndicate,
    news,
    events,
    fissures,
}