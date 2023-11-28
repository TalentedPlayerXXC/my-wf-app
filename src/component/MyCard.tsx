import { Fragment, useContext, useEffect, useState } from "react";
import { TimeoutComp, filterdata, formattedText, plant, timeFormat, translateText } from "../utils";
import styles from './index.module.less'
import ThemeContext from "../store";
const MyCard = ({ list = [], type = "" }: any) => {
    const theme: any = useContext(ThemeContext)
    const [plantList, setPlantList]: any = useState([])
    useEffect(() => {
        setPlantList(filterdata(list, 'syndicateKey', type))
    }, [list, type])

    return (
        <div className={`${styles.card}`} >
            <div className={styles['card-head']}>
                <p className={styles['card-title']}>{plant[type]}赏金</p>
                <span>
                    <TimeoutComp
                        fn={timeFormat(plantList[0]?.eta, 0)}
                    />
                </span>
            </div>
            <ul className={`${theme?.platform ? styles['window-scroll'] : ''}`}>
                <>
                    {
                        plantList[0] && plantList[0]?.jobs ?
                            plantList[0]?.jobs.map((item: any, idx: number) => (
                                <li
                                    key={`${item?.id}${idx}`}
                                    className={styles['card-item']}
                                    style={{
                                        color: theme?.theme === 'dark' ? 'rgb(185, 207, 207)' : '',
                                        flexDirection: 'column',
                                    }}
                                >
                                    {idx + 1}.{translateText(item?.type)}<br /><br />
                                    {
                                        item?.rewardPool?.map((thing: any, indx: any) => (
                                            <Fragment key={indx}>
                                                {formattedText(thing)}
                                                {indx === item?.rewardPool?.length - 1 ? '' : ','}
                                            </Fragment>
                                        ))
                                    }
                                </li>
                            ))
                            : <span style={{ color: theme?.theme === 'dark' ? 'rgb(185, 207, 207)' : '', }}>数据加载中...</span>
                    }
                </>
                {/* <li
                    className={styles['card-item']}
                    style={{ color: theme?.theme === 'dark' ? 'rgb(185, 207, 207)' : '', }}
                    dangerouslySetInnerHTML={{ __html: `${textFormat(plantList?.plantStr)}` }}
                /> */}
            </ul>
        </div>
    )
}
export default MyCard