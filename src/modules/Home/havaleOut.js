import { useState } from 'react';
import ComboBox from 'react-responsive-combo-box'
import 'react-responsive-combo-box/dist/index.css'
import SimpleFetch from '../../components/simpleFetch'
import backUrl from '../../env'

function HavaleOut(props){
    const setting = SimpleFetch(backUrl+'/setting');
    
    const [count,setCount] = useState('')
    const havaleOut = props.havaleOutItem;
    const setOut= (e)=>{
        const body={
            "havale":havaleOut._id,
            "desc":"توضیح اضافی",
            "count":e[8].value,
            "destination":e[9].childNodes[0].value,
            "date":Date.now(),
        }
    
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json'},
            body:  JSON.stringify(body)
          }
    console.log(postOptions)
       fetch(backUrl+"/set/havaleout",postOptions)
        .then(res => res.json())
        .then(
        (result) => {
            console.log(result);
            setTimeout(()=>document.location.reload(),2000);
        })
        .catch(
        (error) => {
            console.log(error);
        })
    }

    var toData=[];
    if(setting){
        for(var s=0;s<setting.destination.length;s++)
        toData.push(setting.destination[s].out);
    }
    return(<>
        <div className="mainHeader">
            <h1>حواله خروج</h1>
        </div>
        <div className="mainText">
            <ul className="mainField">
                <li className='mainLi'>{havaleOut.category}</li>
                <li className='mainLi'>{"شناسه: "+ havaleOut.sku}</li>
                <li className='mainLi'>{"سایز: "+ havaleOut.size1}</li>
                <li className='mainLi'>{havaleOut.size2}</li>
                <li className='mainLi'>{"کیفیت: "+ havaleOut.quality}</li>
                <li className='mainLi'>{"درجه: "+ havaleOut.degree}</li>
                <li className='mainLi'>{"طول: "+ havaleOut.length}</li>
                <li className='mainLi'>{" موجودی: 7"}</li>
                <input id="count" type="text" placeholder='تعداد' value={count} onChange={(e)=>setCount(e.target.value)}/>
                <ComboBox id="to" options={toData} defaultIndex={0} enableAutocomplete placeholder="به"/>
                <input className='submit' type="submit" value="ثبت حواله" onChange={()=>{}}
                    onClick={(e)=>setOut(e.target.parentNode.childNodes)}/>
            </ul>
        </div>
        </>
    )
}
export default HavaleOut