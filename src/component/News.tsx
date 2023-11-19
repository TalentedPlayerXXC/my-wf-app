import { useContext, useEffect, useState } from 'react'
import { news } from '../services'
import styles from './index.module.less'
import { formattedDate } from '../utils'
import ThemeContext from '../store'
function News() {
    const [newList, setNewList]: any = useState([])
    const theme: any = useContext(ThemeContext)

    useEffect(() => {
        news()
            .then((res: any) => {
                if (res && res?.data) {
                    // 活动或新闻相关的东西 个人认为从新到旧比较好一点
                    setNewList(res?.data.reverse())
                }
            })
            .catch((err: any) => console.log('服务似乎出现了一些问题', err))
    }, [])
    return (
        <div className={styles.card} >
            <span className={styles['card-head']}>
                <p className={styles['card-title']}>新闻</p>

            </span>
            <ul>
                {newList?.map((item: any) => (
                    <li className={styles['card-item']} key={item?.id}>
                        <a
                            href={item?.link}
                            style={{
                                width: '100%',
                                color: theme?.theme === 'dark' ? 'rgb(185, 207, 207)' : '#1677ff',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span>
                                {item?.message}
                            </span>
                            <span>
                                {item?.endDate ? `结束于${formattedDate(item?.endDate)}` : ''}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default News