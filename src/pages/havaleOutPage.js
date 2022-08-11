import { useState } from "react";
import SimpleFetch from "../components/simpleFetch";
import backUrl from "../env";
import HavaleOut from "../modules/Home/havaleOut"
import HavaleOutList from "../modules/Home/havaleOutList";
import SideBar from "../modules/Home/sideBar"
import InListReport from "../modules/report/inListReport";

function HavaleOutPage(){
    const reportList = SimpleFetch(backUrl+"/reportin");
    const [filter,setFilter] = useState([]);
    const[havaleIn,setHavaleIn] = useState(1);
    const[havaleOutItem,setHavaleOutItem] = useState('')
    return(
        
        <main>
        <div className="mainPart">
            <div className="setHavale">
                <HavaleOut havaleOutItem={havaleOutItem}
                filter={filter} setFilter={setFilter}/>
                
            </div>
            <div className="havaleListHolder">
                <h3>موجودی</h3>
                <InListReport report={reportList} filter={filter} setHavaleOutItem={setHavaleOutItem} setHavaleIn={setHavaleIn}/>
                <h3>حواله های خروج</h3>
                <HavaleOutList/>
            </div>  
            
        </div>
    </main>
    )
}
export default HavaleOutPage