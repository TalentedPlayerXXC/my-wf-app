/**
 * wf 接口集合 （old）
 * 选设计这个东西的话需要考虑两种情况 web端以及 KOOK or Discord 机器人 
 * 封装的方法那就需要考虑传递一个参数用来区分 这两种情况
 * 
 * 2023.11.23 我在想我是不是应该把接口换成 官方的接口，那个node服务就留着查紫卡跟 WM
 */
import axios from 'axios'
// 仲裁 arbitration
// arbitration 
function arbitration(language = "zh" /**type='detail' */) {
    // return axios.get(`/api/wf/${type}/arbitration`)
    return axios.get(`/v1/arbitration/?language=${language}`)
}
// 突击
// sortie
function sortie(language = "zh" /**type='detail' */) {
    // return axios.get(`/api/wf/${type}/sortie`)
    return axios.get(`/v1/sortie/?language=${language}`)
}
// 赏金集团任务
// (仅限dev、detail的json数据)
// syndicateMissions
function syndicateMissions(/**type = "detail" */ language = "zh") {
    // return axios.get(`/api/wf/${type}/syndicateMissions`)
    return axios.get(`/v1/syndicateMissions/?language=${language}`)
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
function news(/**type = "detail" */ language = "zh") {
    // return axios.get(`/api/wf/${type}/news`)
    return axios.get(`/v1/news/?language=${language}`)
}
// 活动
// events
function events(/**type = "detail" */ language = "zh") {
    // return axios.get(`/api/wf/${type}/events`)
    return axios.get(`/v1/events/?language=${language}`)
}
// 裂隙
// fissures
function fissures(/** type = "detail"*/ language = "zh") {
    // return axios.get(`/api/wf/${type}/fissures`)
    return axios.get(`/v1/fissures/?language=${language}`)
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