// import axios from "axios"
import dictionary from '../Dict.json'

import { useEffect, useState } from "react"
/**
 * 工具集
 */

// 星球悬赏
const plant: any = {
    Ostrons: '地球',
    'Solaris United': '福尔图那',
    Entrati: '火卫二',
    zariman: '扎里曼'
}
const statusFormat: any = {
    "day": "白天",
    "night": "夜晚",
    "warm": "温暖",
    "cold": "寒冷"
}
// 时间过滤
function timeFormat(time: any, ss: any) {
    if (time) {
        time = time?.includes('-') ? time?.replace('-', '') : time
        ss = time?.includes('-') ? -ss : ss
        let isfu = time?.includes('-')
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
            return isfu ? `-${h}小时${m}分${s}秒` : `${h}小时${m}分${s}秒`

        }
    } else {
        return null
    }
}
// 星球枚举
const cycleEnum: any = {
    earthCycle: '地球',
    cetusCycle: '希图斯', //地球平原
    vallisCycle: '福尔图那',
    cambionCycle: '殁世幽都',
    zarimanCycle: '扎里曼'
}
// 文字格式化
const textFormat = (str: string) => {
    const reg = /\n/g
    if (str) {
        // console.log(str.replace(reg, ''), '数据');
        return str.replace(reg, '<br/>')
    }
}
// 日期过滤
const formattedDate = (date: any) => {
    const newDate = new Date(date)
    const year = newDate.getFullYear()
    const month = newDate.getMonth() + 1
    const day = newDate.getDate()
    return `${year}年${month}月${day}日`
}

const throttle = (fn: any, delay: number) => {
    let timer: any = null;
    let _this = this
    return (...args: any) => {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(_this, args)
                timer = null
            }, delay)
        }
    }
}

// 倒计时组件
const TimeoutComp = (props: any) => {
    const [time, setTime]: any = useState('')
    useEffect(() => {
        setTime(() => props?.fn)
        let timer = setInterval(() => {
            setTime((s: any) => timeFormat(s, 1))
        }, 1000)
        return () => { clearInterval(timer) }
    }, [props?.fn])

    return (
        <>{time}</>
    )
}

const filterdata = (data: Array<any>, key: string, searchVal: string) => {
    if (!Array.isArray(data) || data?.length <= 0) {
        return []
    }
    return data.filter(item => item[`${key}`] === searchVal)
}

const translateText = (text: any) => {
    //         let reg1 = /[^\dX$,]/g
    //         let reg2 = /[\dX$,]/g
    //         let str1 = element.replace(reg1, '')
    //         let str2 = element.replace(reg2, '')
    const textArr = dictionary.filter((item: any) => item?.en === text)
    let val = ''
    if (textArr?.length > 0) {
        val = textArr[0]?.zh || textArr[0]?.en
    } else {
        val = text
    }
    return val
}

const formattedText = (text: any) => {
    let reg1 = /[^\dX$,]/g
    let reg2 = /[\dX$,]/g
    let str1 = text?.replace(reg1, '') || ''
    let str2 = text?.replace(reg2, '')?.trim() || ''
    const isXstart = text?.charAt(0) === 'X'
    let textArr = dictionary.filter((item: any) => item?.en === str2)
    if (isXstart) {
        textArr = dictionary.filter((item: any) => item?.en === text)
    }
    // console.log();
    return (
        <>
            {
                isXstart ? `${textArr[0]?.zh || text}` :
                    `${str1} ${textArr[0]?.zh || str2}`
            }
        </>
    )

}


export {
    timeFormat,
    formattedDate,
    cycleEnum,
    textFormat,
    throttle,
    TimeoutComp,
    filterdata,
    plant,
    translateText,
    formattedText,
    statusFormat
}