import { useContext, useEffect, useState } from "react";
import styles from './index.module.less'
import { arbitration } from '../services'
import ThemeContext from "../store";
function Arbitration() {
    const theme:any = useContext(ThemeContext)
    const [state, setState] = useState({
        enemy: '',
        id: '',
        type: ''
    })
    useEffect(() => {
        arbitration()
            .then(res => {
                if (res && res?.data) {
                    console.log(res); setState(res?.data)
                }
            })
            .catch(err => { console.log('似乎出现了一点问题', err); })
    }, [])

    return (
        <div className={styles.card}>
            <div className={styles['card-head']}>
                <p className={styles['card-title']}>仲裁</p>
            </div>
            <div style={{
                color: theme?.theme === 'dark' ? 'rgb(185, 207, 207)' : '',
            }}>
                {
                    state?.id ?
                        <div
                            className={styles['card-item']}
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <span>
                                阵营: {state?.enemy}
                            </span>
                            <span>
                                任务节点: {state?.id}
                            </span>
                            <span>任务类型: {state?.type}</span>
                        </div>
                        :
                        <div>数据正在刷新</div>
                }
            </div>
        </div>

    )
}
export default Arbitration