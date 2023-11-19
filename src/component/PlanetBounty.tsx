import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { textFormat, timeFormat } from "../utils";
import styles from './index.module.less'
import ThemeContext from "../store";
/**
 * 特别注意⚠️： 平原赏金刷新的时间是一样的
 */
// 星球悬赏
const plant: any = {
    Ostrons: '地球',
    Solaris: '福尔图那',
    EntratiSyndicate: '火卫二',
    zariman: '扎里曼'
}
function PlanetBounty({ type }: any) {
    const theme: any = useContext(ThemeContext)
    const [plantList, setPlantList] = useState({
        isOld: false,
        plantStr: '',
        plantTime: '',
    })
    useEffect(() => {
        axios.get(`wf/robot/${type}`)
            .then((res: any) => {
                if (
                    res?.data?.split('时间：')[1].includes('还剩余') ||
                    res?.data?.split('时间：')[1].includes('已过时')
                ) {
                    setPlantList(s => ({
                        ...s,
                        isOld: true
                    }))
                }
                let timeStr = res?.data?.split('时间：')[1]?.replace('还剩余', '').replace('已过时', '')
                setPlantList(s => ({
                    ...s,
                    plantStr: res?.data?.split('时间：')[0],
                    plantTime: timeStr
                }))
            })
            .catch((err: any) => { console.log('服务似乎出现了一点问题', err) })
    }, [type])
    useEffect(() => {
        let timer = setInterval(() => {
            setPlantList((s: any) => ({
                ...s,
                plantTime: timeFormat(s?.plantTime, 1)
            }))
        }, 1000)
        return () => { clearInterval(timer) }
    }, [])
    return (
        <div className={`${styles.card}`} >
            <div className={styles['card-head']}>
                <p className={styles['card-title']}>{plant[type]}赏金</p>
                <span>{plantList?.plantTime}</span>
            </div>
            <ul className={`${theme?.platform ? styles['window-scroll'] : ''}`}>
                <li
                    className={styles['card-item']}
                    style={{ color: theme?.theme === 'dark' ? 'rgb(185, 207, 207)' : '', }}
                    dangerouslySetInnerHTML={{ __html: `${textFormat(plantList?.plantStr)}` }}
                />
            </ul>
        </div>
    )
}
export default PlanetBounty;