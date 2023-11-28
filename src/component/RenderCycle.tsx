import { useEffect, useState } from "react"
import axios from "axios"
import { timeFormat, cycleEnum, statusFormat } from "../utils"
const RenderCycle = ({ cycle }: any) => {
    const [state, setState]: any = useState({
        status: '',
        time: '',
        // isOld: false
    })
    useEffect(() => {
        // axios.get(`/api/wf/robot/${cycle}`)
        axios.get(`/v1/${cycle}/?language=zh`)
            .then((res: any) => {
                if (res && res?.data) {
                    // let arr = res?.data.replace(/\n/g, ',').split(',')
                    // setState({
                    //     status: arr[0]?.split('：')[1],
                    //     time: arr[1]?.split('：')[1]?.slice(3) || '',
                    //     isOld: arr[1]?.split('：')[1].includes('已过去')
                    // })
                    setState({
                        status: res?.data?.state,
                        time: timeFormat(res?.data?.timeLeft, 0)
                    })
                }
            })
            .catch(err => {
                console.error('似乎出现了一点问题', err);
                // setState(')
            })
        let timer = setInterval(() => {
            // axios.get(`/api/wf/robot/${cycle}`)
            axios.get(`/v1/${cycle}/?language=zh`)
                .then((res: any) => {
                    if (res && res?.data) {
                        // let arr = res?.data.replace(/\n/g, ',').split(',')
                        // setState({
                        //     status: arr[0]?.split('：')[1],
                        //     time: arr[1]?.split('：')[1]?.slice(3) || '',
                        //     isOld: arr[1]?.split('：')[1].includes('已过去')
                        // })
                        setState({
                            status: res?.data?.state,
                            time: timeFormat(res?.data?.timeLeft, 0)
                        })
                    }
                })
                .catch(err => {
                    console.error('似乎出现了一点问题', err);
                    // setState(')
                })
        }, 10000);
        return () => clearInterval(timer)
    }, [cycle])
    useEffect(() => {
        let time = setInterval(() => {
            setState((s: any) => ({
                ...s,
                time: timeFormat(s?.time, s?.isOld ? -1 : 1)
            }))
        }, 1000)
        return () => clearInterval(time)
    }, [])
    return (
        <span style={{ marginLeft: 10, color: '#f0e6e6' }}>
            <>{cycleEnum[`${cycle}`]}</>
            ({statusFormat[`${state?.status}`] || state?.status})
            <p style={{ minWidth: 110 }}>
                {
                    state?.time ?
                        <>
                            {/* {state?.isOld ? `已过时${state?.time}` : state?.time} */}
                            {state?.time}
                        </>
                        : <>数据加载中...</>
                }

            </p>
        </span>
    )
}

export default RenderCycle;