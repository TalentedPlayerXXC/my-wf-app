import { useEffect, useState } from "react";
import { arbitration } from '../services'
function Arbitration() {
    const [state, setState] = useState('')
    useEffect(() => {
        arbitration()
            .then(res => { console.log(res); setState(res?.data) })
            .catch(err => { console.log(err); setState('似乎出现了一点问题') })
    }, [])

    return (
        <>
        <div>仲裁</div>
        </>
    )
}
export default Arbitration