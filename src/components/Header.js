
import { useState } from "react";
import MainMenu from "./Menu";

function Header(){

    const[cartShow,setCartShow] = useState('none')
    return(<header>
        <div className="headerTop">
          <div className="logoHeader">
                <a href="/">
                    <img src="/favicon.png"/>
                </a>
            </div>
      </div>
        <div className="headerMain">
            
            <div className="searchHeader">
                <div className="searchInput">
                    
                </div>
            </div>
            
        </div>
        <MainMenu/>
    </header>)
}
export default Header