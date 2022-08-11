
import simpleFetch from '../../components/simpleFetch'
import backUrl, { createReport, fReport } from '../../env';
function InListReport (props){
    const filter=props.filter;
    const url = document.location.pathname;
    var report = fReport(props.report,filter);
    const acceptFunc=(e)=>{
        const result = window.confirm("Are you Sure");
        if(!result)return;
        const body={
            "id":e,
            "state":"done"
        }
    
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json'},
            body:  JSON.stringify(body)
          }
    console.log(postOptions)
       fetch(backUrl+"/update/havaleout",postOptions)
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
    //havaleList&&havaleOutList&& 
    //    (report = createReport(havaleList.havaleInList,havaleOutList.out,filter));
    return(<>
        <div className='havaleList'>
            <div className='havaleLabel'>
                موجودی</div>
            <table>
             <tbody>
                 <tr>
                 <th>شناسه</th>
                <th>دسته بندی</th>
                <th>مشخصات</th>
                <th>کیفیت</th>
                <th>تعداد</th>
                <th className='deskTop'>عملیات</th></tr>
                {report&&report.waitData.map((havale,i)=>(
            <tr key={i} id={havale.havaleDetail[0]._id} className='havaleItem waitRow'>
                <td >{havale.havaleDetail[0].sku.split('-')[0]}</td>
                <td>{havale.havaleDetail[0].category}</td>
                <td>{havale.havaleDetail[0].size1+(havale.havaleDetail[0].size2?"×"+havale.havaleDetail[0].size2:' اینچ ')+' | '+
                    havale.havaleDetail[0].thick+' میل '+' | '+
                    havale.havaleDetail[0].leng+' متر '}</td>
                <td>{havale.havaleDetail[0].quality+' | '+ havale.havaleDetail[0].degree}</td>
                <td>{havale.count}</td>
                <td className='deskTop'>
                <button className='btn' onClick={()=>{acceptFunc(havale._id)}}>تاییـــد</button></td>
            </tr>))}  
            {report&&report.data.map((havale,i)=>(
            <tr key={i} id={havale.havale._id} className='havaleItem'>
                <td >{havale.havale.sku.split('-')[0]}</td>
                <td>{havale.havale.category}</td>
                <td>{havale.havale.size1+(havale.havale.size2?"×"+havale.havale.size2:' اینچ ')+' | '+
                    havale.havale.thick+' میل '+' | '+
                    havale.havale.leng+' متر '}</td>
                <td>{havale.havale.quality+' | '+ havale.havale.degree}</td>
                <td>{parseInt(havale.addcount)-parseInt(havale.rcount)}</td>
                <td className='deskTop'>
                {!url.includes('havale-out')?<button className='btn'>گزارش</button>:
                <button className='btn' onClick={()=>{props.setHavaleOutItem(havale.havale);props.setHavaleIn(0)}}>خروجی</button>}</td>
            </tr>
            ))}
            </tbody>
            </table>
        </div></>
    )
}
export default InListReport