import { useState } from 'react';
import ComboBox from 'react-responsive-combo-box'
import 'react-responsive-combo-box/dist/index.css'
import SimpleFetch from '../../components/simpleFetch'
import backUrl from '../../env';

function HavaleIn(){
    const setting = SimpleFetch(backUrl+'/setting');
    const havaleList = SimpleFetch(backUrl+'/havalein')
    var havaleIn='';
    if(havaleList)
        havaleIn = havaleList.havaleInList;
    const [pipe,setPipe] = useState('visible')
    const [havale,setHavale]=useState({})
    const SetHavale=(event)=>{
    console.log(event)
    const body={
        "title":event[1].value+": "+event[2].childNodes[0].value+'×'+event[3].childNodes[0].value,
        "category":event[0].childNodes[0].value,
        "sku":event[1].value,
        "size1":event[2].childNodes[0].value,
        "size2":event[4].childNodes[0].value,
        "thick":event[5].childNodes[0].value,
        "quality":event[6].childNodes[0].value,
        "degree":event[7].childNodes[0].value,
        "leng":event[8].value+'m',
        "count":event[9].value,
        "from":event[10].childNodes[0].value,
        "status":"instore",
        "date":Date.now(),
    }

    console.log(body)
    const postOptions={
        method:'post',
        headers: { 'Content-Type': 'application/json'},
        body:  JSON.stringify(body)
      }
   fetch(backUrl+"/set/havalein",postOptions)
    .then(res => res.json())
    .then(
    (result) => {
        console.log(result);
        document.location.reload();
    },
    (error) => {
        console.log(error);
    })
}

var catData = []
var sizeData=[];
var sizePipe=[];
var thickData=[];
var qualityData=[];
var degreeData=[];
var fromData=[];
var nullData=[];
if(setting){
    var s=0;
    for(s=0;s<setting.kinds.length;s++)
        catData.push(setting.kinds[s].kind);
    for(s=0;s<setting.sizes.length;s++)
        setting.sizes[s].kind ==="mm"&&    
        sizeData.push(setting.sizes[s].size);
    for(s=0;s<setting.sizes.length;s++)
        setting.sizes[s].kind !=="mm"&&
        sizePipe.push(setting.sizes[s].size);
    for(s=0;s<setting.thickness.length;s++)
        thickData.push(setting.thickness[s].thick);
    for(s=0;s<setting.quality.length;s++)
        qualityData.push(setting.quality[s].size);
    for(s=0;s<setting.degree.length;s++)
        degreeData.push(setting.degree[s].degree);
    for(s=0;s<setting.from.length;s++)
        fromData.push(setting.from[s].from);
}

    const searchSku=(e)=>{
        for(var i=0;i<havaleIn.length;i++)
            if(havaleIn[i].sku.split('-')[0] === e.target.value)
            {    setHavale(havaleIn[i]);return;   }
    }
    return(<>
        <div className="mainHeader">
            <h1>حواله ورود</h1>
        </div>
        <div className="mainText">
            <div className="mainField">
                <ComboBox id={"category"} options={catData} defaultValue={havale.category} enableAutocomplete placeholder="دسته بندی"
                onSelect={(e)=>(setPipe(e==='لوله فولادی'?'hidden':'visible'))}/>
                <input id="sku" type="text" placeholder="شناسه" onChange={searchSku}/>
                <ComboBox id={"size1"} options={pipe==='hidden'?sizePipe:sizeData} defaultValue={havale.size1} enableAutocomplete placeholder="سایز"/>
                <span style={{visibility:pipe}}> × </span>
                <ComboBox style={{visibility:pipe}} id={"size2"} options={sizeData} defaultValue={havale.size2} enableAutocomplete placeholder="سایز"/>
                <ComboBox id={"thickness"} options={thickData} defaultValue={havale.thick} enableAutocomplete placeholder="ضخامت"/>
                <ComboBox id={"quality"} options={qualityData} defaultValue={havale.quality} enableAutocomplete placeholder="کیفیت"/>
                <ComboBox id={"degree"} options={degreeData} defaultValue={havale.degree} enableAutocomplete placeholder="درجه"/>
                <input id="leng" type="text" placeholder="طول"/>
                <input id="count" type="text" placeholder="تعداد"/>
                <ComboBox id={"from"} options={fromData} defaultIndex={0} enableAutocomplete placeholder="از"/>
                <input className='submit' type="submit" value="ثبت حواله" 
                    onClick={(e)=>SetHavale(e.target.parentNode.children)}/>
            </div>
        </div>
        </>
    )
}
export default HavaleIn