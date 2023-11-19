import { useContext, useEffect, useState } from 'react'
import { Tooltip } from 'antd'
import { sortie } from '../services'
import { timeFormat } from '../utils'
import styles from './index.module.less'
import ThemeContext from '../store'
function Sortie() {
    const theme: any = useContext(ThemeContext)

    // 数据处理方案备用
    const [state, setState]: any = useState({})
    useEffect(() => {
        sortie().then((res: any) => {
            if (res && res?.data) {
                setState(res?.data)
            }
        }).catch(err => { console.log(err) })
    }, [])

    useEffect(() => {
        let timer = setInterval(() => {
            setState((s: any) => (
                {
                    ...s,
                    eta: timeFormat(state?.eta, 1)
                }
            ))
        }, 1000);
        return () => { clearInterval(timer) }
    }, [state])

    return (
        <div className={styles.card}>
            <span className={styles['card-head']}>
                <span className={styles['card-title']}>突击</span>
                <span>
                    还剩余{timeFormat(state?.eta, 0)}
                </span>
            </span>
            <ul>
                {state?.variants?.map((item: any) => (
                    <li key={item?.node} className={styles['card-item']}
                        style={{ color: theme?.theme === 'dark' ? '#b9cfcf' : '' }}
                    >
                        <span>
                            任务类型：
                            <span>{item?.missionType}</span>
                        </span>
                        <span style={{ cursor: 'pointer' }}>
                            <Tooltip title={item?.modifierDescription}>
                                {item?.modifier}
                            </Tooltip>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Sortie