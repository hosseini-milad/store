import { useState } from "react";
function MainMenu(){
    return(
        <div className="mainMenu">
            <ul className="mainMenuUl">
                
                <li className="mainMenuLi"><a href="/sales">فروش محصول</a></li>
                <li className="mainMenuLi"><a href="/services">خدمات</a></li>
                <li className="mainMenuLi"><a href="/about">آشنایی با ما</a></li>
            </ul>
        </div>
    )
}
export default MainMenu