import simpleFetch from '../../components/simpleFetch'
import backUrl from '../../env';
function HavaleOutList (){
    const havaleOutList = simpleFetch(backUrl+"/havaleout");
    //console.log(havaleOutList)
    
    const cancelFunc=(e,state)=>{
        
        const result = window.confirm("Are you Sure");
        if(!result)return;
        const body={
            "id":e,
            "state":state
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
    return(<>
        <div className='havaleList'>
            <div className='havaleLabel'>
                خروجی</div>
            <table>
             <tbody>
                 <tr><th>شناسه</th>
                <th>دسته بندی</th>
                <th>مشخصات</th>
                <th>کیفیت</th>
                <th>تعداد</th>
                <th>وضعیت</th>
                <th>عملیات</th></tr>
            {havaleOutList&&havaleOutList.out.map((havale,i)=>(
            <tr key={i} id={havale.havaleDetail[0]._id} 
                className='havaleItem' style={{backgroundColor:havale.state==="wait"?"orange":""}}>
                <td style={{maxWidth:"60px",overflow: "hidden"}}>{havale.havaleDetail[0].sku.split('-')[0]}</td>
                <td>{havale.havaleDetail[0].category}</td>
                <td>{havale.havaleDetail[0].size1+(havale.havaleDetail[0].size2?"×"+havale.havaleDetail[0].size2:' اینچ ')+' | '+
                    havale.havaleDetail[0].thick+' میل '+' | '+
                    havale.havaleDetail[0].leng+' متر '}</td>
                <td>{havale.havaleDetail[0].quality+' | '+ havale.havaleDetail[0].degree}</td>
                <td>{havale.count}</td>
                <td>{havale.state==="wait"?"انتظار":""}</td>
                <td>
                {havale.state==="wait"?<button className='btn' onClick={()=>{cancelFunc(havale._id,"done")}}>تاییـــد</button>:
                    <button disabled className='btn' onClick={()=>{}}>ویرایش</button>}   
                <button className='exitBtn' onClick={()=>{cancelFunc(havale._id,"cancel")}}>×</button></td>
            </tr>
            ))}
            </tbody>
            </table>
        </div>
        </>
    )
}
export default HavaleOutList