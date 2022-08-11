import { useState } from 'react';
import ComboBox from 'react-responsive-combo-box'
import 'react-responsive-combo-box/dist/index.css'
import SimpleFetch from '../../components/simpleFetch'
import backUrl from '../../env';

function HavaleEdit(props){
    const setting = SimpleFetch(backUrl+'/setting');
    const [pipe,setPipe] = useState('visible');
    const havaleEdit = props.havaleOutItem;
    const SetHavale=(event)=>{
    
    const body={
        "id":havaleEdit._id,
        "category":event[0].childNodes[0].value,
        "sku":event[1].childNodes[0].value+"-"+
                event[8].childNodes[0].value.split('m')[0]+"-"+
                event[7].childNodes[0].value.split('درجه')[1],
                
        "size1":event[2].childNodes[0].value,
        "size2":event[4].childNodes[0].value,
        "thick":event[5].childNodes[0].value,
        "quality":event[6].childNodes[0].value,
        "degree":event[7].childNodes[0].value,
        "leng":event[8].childNodes[0].value+'m',
        "count":event[9].childNodes[0].value,
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
   fetch(backUrl+"/update/havale",postOptions)
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


    return(<>
        <div className="mainHeader">
            <h1>ویرایش حواله</h1>
        </div>
        <div className="mainText">
            <div className="mainField">
                <ComboBox id={"category"} options={catData} defaultValue={havaleEdit.category} enableAutocomplete placeholder="دسته بندی"
                onSelect={(e)=>(setPipe(e==='لوله فولادی'?'hidden':'visible'))}/>
                <ComboBox id="sku" options={nullData} placeholder="شناسه" defaultValue={havaleEdit.sku.split('-')[0]}/>
                <ComboBox id={"size1"} options={pipe==='hidden'?sizePipe:sizeData} defaultValue={havaleEdit.size1} enableAutocomplete placeholder="سایز"/>
                <span style={{visibility:pipe}}> × </span>
                <ComboBox style={{visibility:pipe}} id={"size2"} options={sizeData} defaultValue={havaleEdit.size2} enableAutocomplete placeholder="سایز"/>
                <ComboBox id={"thickness"} options={thickData} defaultValue={havaleEdit.thick} enableAutocomplete placeholder="ضخامت"/>
                <ComboBox id={"quality"} options={qualityData} defaultValue={havaleEdit.quality} enableAutocomplete placeholder="کیفیت"/>
                <ComboBox id={"degree"} options={degreeData} defaultValue={havaleEdit.degree} enableAutocomplete placeholder="درجه"/>
                <ComboBox id="leng" options={nullData} defaultValue={havaleEdit.leng} placeholder="طول"/>
                <ComboBox id="count" options={nullData} placeholder="تعداد" defaultValue={havaleEdit.count}/>
                <ComboBox id={"from"} options={fromData} defaultValue={havaleEdit.from} enableAutocomplete placeholder="از"/>
                <input className='submit' type="submit" value="ویرایش حواله" 
                    onClick={(e)=>SetHavale(e.target.parentNode.children)}/>
            </div>
        </div>
        </>
    )
}
export default HavaleEdit