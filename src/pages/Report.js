import SideBar from '../modules/Home/sideBar'
import HomeSide from '../modules/report/HomeSide'
import InListReport from '../modules/report/inListReport'
function Report(){
    return(
        <main>
        <div className="sideBar">
            <HomeSide />
        </div>
        <div className="mainPart">
            <InListReport />
        </div>
        </main>
    )
}
export default Report