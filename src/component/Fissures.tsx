import { useContext, useEffect, useState } from "react"
import { fissures } from "../services"
import styles from './index.module.less'
import { filterdata, timeFormat, TimeoutComp } from "../utils"
import ThemeContext from "../store"

function Fissures(): JSX.Element {
    const [fissuresList, setFissuresList] = useState<Array<object>>([])
    const theme: any = useContext(ThemeContext)
    useEffect(() => {
        getFissuresList()
        setInterval(() => { getFissuresList() }, 30000)
    }, [])
    const getFissuresList = () => {
        fissures()
            .then((res) => {
                if (res && res?.data) {
                    let guji: any = filterdata(res?.data, 'tier', '古纪')
                    let qianji: any = filterdata(res?.data, 'tier', '前纪')
                    let zhongji: any = filterdata(res?.data, 'tier', '中纪')
                    let houji: any = filterdata(res?.data, 'tier', '后纪')
                    let anhun: any = filterdata(res?.data, 'tier', '安魂')
                    setFissuresList([
                        ...guji,
                        ...qianji,
                        ...zhongji,
                        ...houji,
                        ...anhun
                    ])
                }

            })
            .catch((err: any) => {
                console.log('服务似乎出现了一点问题', err);

            })
    }
    return (
        <div className={styles.card}>
            <div className={styles['card-head']}>
                <p className={styles['card-title']}> 裂隙</p>
            </div>
            <ul style={{ color: theme?.theme === 'dark' ? 'rgb(185, 207, 207)' : '', }}>
                {fissuresList.map((item: any) => (
                    <li className={styles['card-item']} key={item?.id}
                        style={{ flexDirection: 'column' }}
                    >
                        <div style={{ fontSize: 14, fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                            <span> {item?.tier}</span>
                            <span>
                                <TimeoutComp fn={timeFormat(item?.eta, 0)} count={item?.eta?.includes('-') ? -1 : 1} />
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                            <span>  {item?.isHard && '(钢铁之路)'} {item?.isStorm && '(九重天)'}{' '}{item?.node}</span>
                            <span>{item?.missionType}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Fissures