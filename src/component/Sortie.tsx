import { useState, useEffect, useContext } from 'react'
import ThemeContext from '../store'
import { sortie } from '../services'
import { Button } from 'antd';
function Sortie() {
    // 数据处理方案备用
    // const themeContext: any = useContext(ThemeContext)
    const [state, setState] = useState('')
    useEffect(() => {
        sortie().then(res => {
            // setState()
        }).catch(err => { console.log(err) })
    }, [])

    return (
        <>
        突击
            {/* <Button onClick={() => themeContext.dispatch({ type: 'theme', payload: themeContext?.theme === 'light' ? 'dark' : 'light' })}>主题切换</Button> */}
            {/* {themeContext?.theme} */}
        </>
    )
}
export default Sortie