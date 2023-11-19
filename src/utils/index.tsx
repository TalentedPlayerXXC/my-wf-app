// import { useEffect, useState } from "react"
// import axios from "axios"

function timeFormat(time: any, ss: any) {
    const regH = /(小时)|h/g
    const regM = /分|m/g
    const secondReplace = /秒|s/g
    let arr = time?.replace(regH, ':')?.replace(regM, ':')?.replace(secondReplace, '')?.split(':')
    if (arr && arr.length > 0) {
        let seconds: any = ''
        if (arr.length === 3) {
            seconds = arr[0] * 60 * 60 + arr[1] * 60 + +arr[2] - ss
        }
        if (arr.length === 2) {
            seconds = arr[0] * 60 + +arr[1] - ss
        }
        if (arr.length === 1) {
            seconds = +arr[0] - ss
        }
        let h: any = Math.floor(seconds / 3600)
        let m: any = Math.floor(seconds / 60) % 60
        let s: any = seconds % 60
        if (h === 0) {
            return `${m}分${s}秒`
        }
        if (h === 0 && m === 0) {
            return `${s}秒`
        }
        return `${h}小时${m}分${s}秒`

    }
}
const cycleEnum: any = {
    earthCycle: '地球',
    cetusCycle: '希图斯', //地球平原
    vallisCycle: '福尔图那',
    cambionCycle: '殁世幽都',
    zarimanCycle: '扎里曼'
}
// 文字格式华   
const textFormat = (str: string) => {
    const reg = /\n/g
    if (str) {
        // console.log(str.replace(reg, ''), '数据');
        return str.replace(reg, '<br/>')
    }
}
// const RenderCycle = ({ cycle }: any) => {
//     const [state, setState] = useState({
//         status: '',
//         time: '',
//         isOld: false
//     })
//     useEffect(() => {
//         axios.get(`wf/robot/${cycle}`)
//             .then((res: any) => {
//                 if (res && res?.data) {
//                     let arr = res?.data.replace(/\n/g, ',').split(',')
//                     setState({
//                         status: arr[0]?.split('：')[1],
//                         time: arr[1]?.split('：')[1]?.slice(3) || '',
//                         isOld: arr[1]?.split('：')[1].includes('已过去')
//                     })
//                 }
//             })
//             .catch(err => {
//                 console.error('似乎出现了一点问题', err);
//                 // setState(')
//             })
//         let timer = setInterval(() => {
//             axios.get(`wf/robot/${cycle}`)
//                 .then((res: any) => {
//                     if (res && res?.data) {
//                         let arr = res?.data.replace(/\n/g, ',').split(',')
//                         setState({
//                             status: arr[0]?.split('：')[1],
//                             time: arr[1]?.split('：')[1]?.slice(3) || '',
//                             isOld: arr[1]?.split('：')[1].includes('已过去')
//                         })
//                     }
//                 })
//                 .catch(err => {
//                     console.error('似乎出现了一点问题', err);
//                     // setState(')
//                 })
//         }, 10000);
//         return () => clearInterval(timer)
//     }, [cycle])
//     useEffect(() => {
//         let time = setInterval(() => {
//             setState((s: any) => ({
//                 ...s,
//                 time: timeFormat(s?.time, s?.isOld ? -1 : 1)
//             }))
//         }, 1000)
//         // return () => clearInterval(time)
//     }, [])
//     return (
//         <span style={{ marginLeft: 10, color: '#f0e6e6' }}>
//             <>{cycleEnum[`${cycle}`]}</>
//             ({state?.status})
//             <p style={{ width: 160 }}>{state?.isOld ? `已过时${state?.time}` : state?.time}</p>
//         </span>
//     )
// }

const formattedDate = (date: any) => {
    const newDate = new Date(date)
    const year = newDate.getFullYear()
    const month = newDate.getMonth() + 1
    const day = newDate.getDate()
    return `${year}年${month}月${day}日`
}

export {
    timeFormat,
    //  RenderCycle, 
    formattedDate,
    cycleEnum,
    textFormat
}