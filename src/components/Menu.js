import { useState } from "react";
function MainMenu(){
    return(
        <div className="mainMenu">
            <ul className="mainMenuUl">
                
                <li className="mainMenuLi"><a href="/havale-in">حواله ورود</a></li>
                <li className="mainMenuLi"><a href="/havale-out">حواله خروج</a></li>
                <li className="mainMenuLi"><a href="/report">گزارشات</a></li>
            </ul>
        </div>
    )
}
export default MainMenu