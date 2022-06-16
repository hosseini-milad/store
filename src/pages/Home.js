import { useState } from "react"
import HavaleIn from "../modules/Home/havaleIn"
import HavaleInList from "../modules/Home/havaleList"
import HavaleOut from "../modules/Home/havaleOut"
import HavaleOutList from "../modules/Home/havaleOutList"
import SideBar from "../modules/Home/sideBar"

function Home(){
    //const havale = simpleFetch('')
    const [havaleIn,setHavaleIn] = useState(1);
    const[havaleOutItem,setHavaleOutItem] = useState('')
    return(
    <main>
        <div className="sideBar">
            <SideBar/>
        </div>
        <div className="mainPart">
            <div className="setHavale">
                {havaleIn?<HavaleIn/>:<HavaleOut havaleOutItem={havaleOutItem}/>}
                
            </div>
            <div className="">
                <h3>لیست حواله ها</h3>
                <HavaleInList setHavaleOutItem={setHavaleOutItem} setHavaleIn={setHavaleIn}/>
                <HavaleOutList/>
            </div>
            
        </div>
    </main>
        )
}
export default Home