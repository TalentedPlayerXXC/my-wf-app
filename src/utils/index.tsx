import { useEffect, useState } from "react"
import axios from "axios"

function timeFormat(time: any, ss: any) {
    const regH = /(小时)/g
    const regM = /分/g
    const secondReplace = /秒/g
    let arr = time?.replace(regH, ':')?.replace(regM, ':')?.replace(secondReplace, '')?.split(':')
    console.log(arr, '数组')
    if (arr && arr.length > 0) {
        let seconds: any = ''
        console.log(arr, '数组');
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
    cambionCycle: '殁世幽都'
}
const RenderCycle = ({ cycle }: any) => {
    const [state, setState] = useState({
        status: '',
        time: '',
        isOld: false
    })
    useEffect(() => {
        axios.get(`wf/robot/${cycle}`)
            .then((res: any) => {
                if (res && res?.data) {
                    let arr = res?.data.replace(/\n/g, ',').split(',')
                    // console.log(timeFormat(arr[1]?.split('：')[1]?.slice(3)), 'sadsadaas')
                    setState({
                        status: arr[0]?.split('：')[1],
                        // time: timeFormat(arr[1]?.split('：')[1]?.slice(3)) || '',
                        time: arr[1]?.split('：')[1]?.slice(3) || '',
                        isOld: arr[1]?.split('：')[1].includes('已过去')
                    })
                }
            })
            .catch(err => {
                console.error('似乎出现了一点问题', err);
                // setState(')
            })
        let timer = setInterval(() => {
            axios.get(`wf/robot/${cycle}`)
                .then((res: any) => {
                    if (res && res?.data) {
                        let arr = res?.data.replace(/\n/g, ',').split(',')
                        // console.log(timeFormat(arr[1]?.split('：')[1]?.slice(3)), 'sadsadaas')
                        setState({
                            status: arr[0]?.split('：')[1],
                            // time: timeFormat(arr[1]?.split('：')[1]?.slice(3)) || '',
                            time: arr[1]?.split('：')[1]?.slice(3) || '',
                            isOld: arr[1]?.split('：')[1].includes('已过去')
                        })
                    }
                })
                .catch(err => {
                    console.error('似乎出现了一点问题', err);
                    // setState(')
                })
        }, 10000);
        return () => clearInterval(timer)
    }, [])
    useEffect(() => {
        let time = setInterval(() => {
            setState((s: any) => ({
                ...s,
                time: timeFormat(s?.time, s?.isOld ? -1 : 1)
            }))
        }, 1000)
        return () => clearInterval(time)
    }, [])
    // const renderText = (text: any) => {
    //     let time: any = ''
    //     if (text?.includes('已过去')) {
    //         time = `已过去${text?.slice(3)}`
    //         // time = text[1]?.split('：')[1]
    //     } else {
    //         time = timeFormat(text[1]?.split('：')[1]?.slice(3))
    //         // time = text[1]?.split('：')[1]?.slice(3)
    //         // timeFormat
    //     }
    //     return time
    // }
    return (
        <span style={{ marginLeft: 10, color: '#f0e6e6' }}>
            <>{cycleEnum[`${cycle}`]}</>
            ({state?.status})
            <p style={{ width: 160 }}>{state?.isOld ? `已过时${state?.time}` : state?.time}</p>
        </span>
    )
}

export { timeFormat, RenderCycle }