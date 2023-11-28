import { useEffect, useState } from "react";
import axios from "axios";
// import { textFormat, timeFormat } from "../utils";
// import styles from './index.module.less'
// import ThemeContext from "../store";
import MyCard from "./MyCard";
/**
 * 特别注意⚠️： 平原赏金刷新的时间是一样的
 */
function PlanetBounty() {
    // const [plantList, setPlantList] = useState({
    //     isOld: false,
    //     plantStr: '',
    //     plantTime: '',
    // })
    // Ostrons
    // Solaris
    // EntratiSyndicate
    // const theme: any = useContext(ThemeContext)
    const [plantList, setPlantList] = useState([])
    useEffect(() => {
        axios.get(`/v1/syndicateMissions/?language=zh`)
            .then((res: any) => {
                // console.log(res?.data, '数据');
                setPlantList(res?.data)
            })
        // axios.get(`/api/wf/robot/${type}`)
        //     .then((res: any) => {
        //         if (
        //             res?.data?.split('时间：')[1].includes('还剩余') ||
        //             res?.data?.split('时间：')[1].includes('已过时')
        //         ) {
        //             setPlantList(s => ({
        //                 ...s,
        //                 isOld: true
        //             }))
        //         }
        //         let timeStr = res?.data?.split('时间：')[1]?.replace('还剩余', '').replace('已过时', '')
        //         setPlantList(s => ({
        //             ...s,
        //             plantStr: res?.data?.split('时间：')[0],
        //             plantTime: timeStr
        //         }))
        //     })
        //     .catch((err: any) => { console.log('服务似乎出现了一点问题', err) })
    }, [])
    // useEffect(() => {
    //     let timer = setInterval(() => {
    //         setPlantList((s: any) => ({
    //             ...s,
    //             plantTime: timeFormat(s?.plantTime, 1)
    //         }))
    //     }, 1000)
    //     return () => { clearInterval(timer) }
    // }, [])
    return (
        <>
            {/* <div className={`${styles.card}`} >
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
            </div> */}
            <MyCard type="Ostrons" list={plantList || []} />
            <MyCard type="Solaris United" list={plantList || []} />
            <MyCard type="Entrati" list={plantList || []} />
        </>
    )
}
export default PlanetBounty;