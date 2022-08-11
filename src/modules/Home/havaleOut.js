import { Checkbox ,FormControlLabel} from '@mui/material';
import { useState } from 'react';
import ComboBox from 'react-responsive-combo-box'
import 'react-responsive-combo-box/dist/index.css'
import SimpleFetch from '../../components/simpleFetch'
import backUrl, { ClearFilter, SetFilter } from '../../env'

function HavaleOut(props){
    const setting = SimpleFetch(backUrl+'/setting');
    const [pipe,setPipe] = useState('visible')
    const [wait,setWait] = useState(false)
    const havaleOut = props.havaleOutItem;
    

    const setOut= (e)=>{
        console.log(e)
        const body={
            "havale":havaleOut._id,
            "desc":havaleOut.sku,
            "count":e[8].value,
            "state":wait?"wait":"done",
            "destination":e[10].childNodes[0].value,
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
    
    var sizeData=[];
    var sizePipe=[];
    var thickData=[];
    var qualityData=[];
    var degreeData=[];
    var fromData=[];
    var catData = []
    var toData=[];
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
        for(s=0;s<setting.destination.length;s++)
            toData.push(setting.destination[s].out);
    }
    return(<>
        <div className="mainHeader">
            <h1>حواله خروج</h1>
        </div>
        <div className="mainText">
            {setting&&<div className="mainField">
                <div className='comboHolder'>
                    <ComboBox id={"category"} options={catData} 
                    placeholder="دسته بندی" defaultValue={havaleOut.category}
                    onSelect={(e)=>{setPipe(e==='لوله فولادی'?'hidden':'visible');
                    SetFilter('category:'+e,props.filter,props.setFilter);
                    e.target.previousSibling.firstChild.value="";}}/>
                </div>
                <input id="sku" type="text" placeholder="شناسه"  defaultValue={havaleOut.sku}/>
                <div className='comboHolder'>
                    <ComboBox id={"size1"} options={pipe==='hidden'?sizePipe:sizeData}
                     defaultValue={havaleOut.size1} enableAutocomplete placeholder="سایز"
                    onSelect={(e)=>{SetFilter('size1:'+e,props.filter,props.setFilter);
                    e.target.previousSibling.firstChild.value="";}}/>
                    <span style={{visibility:pipe}}> × </span>
                </div>
                <ComboBox style={{visibility:pipe}} id={"size2"} options={sizeData}
                     defaultValue={havaleOut.size2} enableAutocomplete placeholder="سایز"/>
                <div className='comboHolder'>
                    <ComboBox id={"thickness"} options={thickData} defaultIndex={0} 
                     defaultValue={havaleOut.thick} enableAutocomplete placeholder="ضخامت"
                        onSelect={(e)=>{SetFilter('thick:'+e,props.filter,props.setFilter)}}/>
                    <div className='clearList' onClick={(e)=>
                        {ClearFilter('thick',props.filter,props.setFilter);
                        e.target.previousSibling.firstChild.value="";}}>×</div>
                </div>
                <div className='comboHolder'>
                    <ComboBox id={"quality"} options={qualityData} defaultIndex={0}
                     defaultValue={havaleOut.quality} enableAutocomplete placeholder="کیفیت"
                        onSelect={(e)=>{SetFilter('quality:'+e,props.filter,props.setFilter)}}/>
                    <div className='clearList' 
                    onClick={(e)=>{ClearFilter('quality',props.filter,props.setFilter);
                    e.target.previousSibling.firstChild.value="";}}>×</div>
                </div>
                <div className='comboHolder'>
                    <ComboBox id={"degree"} options={degreeData} defaultIndex={0}
                     defaultValue={havaleOut.degree}
                    onSelect={(e)=>{SetFilter('degree:'+e,props.filter,props.setFilter);
                    e.target.previousSibling.firstChild.value="";}}
                    enableAutocomplete placeholder="درجه"/>
                    <div className='clearList' onClick={()=>ClearFilter('degree',props.filter,props.setFilter)}>×</div>
                </div>
                <input id="leng" type="text" placeholder="طول" defaultValue={havaleOut.leng}/>
                <input id="count" type="text" placeholder="تعداد"/>
                <li className='mainLi'>{" موجودی: "+havaleOut.count&&havaleOut.count}</li>
                <ComboBox id="to" options={toData} defaultIndex={0} enableAutocomplete placeholder="به"/>
                <div className='wait'>
                <FormControlLabel control={
                    <Checkbox onChange={(value)=>setWait(value.target.checked)}/>}
                    label="حالت انتظار"
                    />
                </div>
                <input className='submit' type="submit" value="ثبت حواله" onChange={()=>{}}
                    onClick={(e)=>setOut(e.target.parentNode.childNodes)}/>
            </div>}
        </div>
        </>
    )
}
export default HavaleOut