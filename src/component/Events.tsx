import { useContext, useEffect, useState } from 'react'
import styles from './index.module.less'
import { events } from '../services'
import ThemeContext from '../store'
import { formattedDate } from '../utils'
function Events() {
    const [eventList, setEventList] = useState([])
    // rgb(185, 207, 207)
    const theme: any = useContext(ThemeContext)
    useEffect(() => {
        events()
            .then((res: any) => {
                if (res && res?.data) {
                    
                    setEventList(res?.data)
                }
            })
            .catch((err: any) => {
                console.log('服务似乎出现了一些问题', err)

            })
    }, [])

    return (
        <div className={styles.card}>
            <div className={styles['card-head']}>
                <p className={styles['card-title']}>活动</p>
            </div>
            <ul>
                {
                    eventList?.length > 0 ?
                        <>
                            {
                                eventList?.map((item: any) => (
                                    <li
                                        className={styles['card-item']}
                                        key={item?.id}
                                        style={{
                                            color: theme?.theme === 'dark' ? 'rgb(185, 207, 207)' : '',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            // flexDirection: "row"
                                        }}
                                    >
                                        <span>
                                            {item?.description}
                                        </span>
                                        <span>
                                            结束于{formattedDate(item?.expiry)}
                                        </span>
                                    </li>
                                ))
                            }
                        </>
                        :
                        <span
                            style={{
                                padding: 10,
                                color: theme?.theme === 'dark' ? 'rgb(185, 207, 207)' : '',
                            }}>
                            现在似乎没有活动哦～
                        </span>
                }
            </ul>
        </div >
    )
}
export default Events