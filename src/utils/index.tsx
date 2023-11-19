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

export {
    timeFormat,
    //  RenderCycle, 
    formattedDate,
    cycleEnum,
    textFormat,
    throttle
}