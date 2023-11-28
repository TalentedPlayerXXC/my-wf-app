import Sortie from '../Sortie'
import News from '../News'
import Events from '../Events'
import PlanetBounty from '../PlanetBounty'
import Arbitration from '../Arbitration'
import Fissures from '../Fissures'
import styles from './Overview.module.less'
import '../../index.css'
function Overview() {
    // window.navigator?.userAgent.toLowerCase()?.includes('windows')
    return (
        // indexStyles['windows']
        // ${isWindows ? indexStyles['windows'] : ''}
        <div className={`${styles['context']}`}>
            <Sortie />
            <News />
            <Events />
            <Arbitration />
            <PlanetBounty/>
            {/* <PlanetBounty type="Solaris" />
            <PlanetBounty type="EntratiSyndicate" /> */}
            <Fissures />
        </div>
    )
}
export default Overview