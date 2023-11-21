import { useContext, useEffect, useState } from 'react'
import { news } from '../services'
import styles from './index.module.less'
import { formattedDate } from '../utils'
import ThemeContext from '../store'
function News() {
    const [newList, setNewList]: any = useState([])
    const theme: any = useContext(ThemeContext)

    useEffect(() => {
        // let str = '2X Breath Of The Eidolon'
        // let str1 = str.replace(reg1, '')
        // let str2 = str.replace(reg2, '')
        // const ar = dictionary.filter((item: any) => str.includes(item.en)
        // )
        // const earthData = mockRes.filter((item: any) => item?.syndicateKey === "Ostrons")[0]
        // for (let idx = 0; idx < earthData?.jobs.length; idx++) {
        //     const ele: any = earthData?.jobs[idx]?.rewardPool;
        //     // rewardPool
        //     for (let index: any = 0; index < ele?.length; index++) {
        //         const element = ele[index];
        //         let reg1 = /[^\dX$,]/g
        //         let reg2 = /[\dX$,]/g
        //         let str1 = element.replace(reg1, '')
        //         let str2 = element.replace(reg2, '')
        //         const ar = dictionary.filter((item: any) => str2.includes(item.en))
        //         // console.log(str2, 'str1');

        //         // console.log(ar[0], '数据22');
        //         ele[index] = `${ar[0]?.zh}`

        //     }

        // }

        // // console.log(obj, 'objsss');
        // console.log(earthData, '数据');

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
                {newList?.map((item: any, idx: number) => (
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
                                {idx + 1}.{item?.message}
                                <span>
                                    {item?.endDate ? `结束于${formattedDate(item?.endDate)}` : ''}
                                </span>
                            </span>

                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default News