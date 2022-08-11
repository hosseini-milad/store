import { useState } from 'react'
import SimpleFetch from '../components/simpleFetch';
import backUrl from '../env';
import SideBar from '../modules/Home/sideBar'
import HomeSide from '../modules/report/HomeSide'
import InListReport from '../modules/report/inListReport'
function Report(){
    
    const [filter,setFilter] = useState([]);
    const reportList = SimpleFetch(backUrl+"/reportin");
    //console.log(filter)
    return(
        <main>
        <div className="sideBar">
            <HomeSide filter={filter} setFilter={setFilter}/>
        </div>
        <div className="mainPart" >
            <InListReport filter={filter} report = {reportList}/>
        </div>
        </main>
    )
}
export default Report