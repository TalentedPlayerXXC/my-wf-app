import { Route, Routes } from 'react-router-dom'
// import Sortie from '../component/Sortie'
// import Arbitration from '../component/Arbitration'
import Overview from '../component/Overview'
const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Overview />} />
            <Route path='/overview' element={<Overview />} />
            {/* <Route path='/sortie' element={<Sortie />} />
            <Route path='/arbitration' element={<Arbitration />} /> */}
        </Routes>
    )
}

export default Router