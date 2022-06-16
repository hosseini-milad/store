
import simpleFetch from '../../components/simpleFetch'
import backUrl from '../../env';
function HavaleInList (props){
    const havaleList = simpleFetch(backUrl+"/havalein");
    //console.log(havaleList)
    
    const setOut= (e)=>{
        console.log(e)
        const body={
            "havale":e,
            "desc":"توضیح اضافی",
            "count":"2",
            "to":"فروش",
            "date":Date.now(),
        }
    
        console.log(body)
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' },
            body:  JSON.stringify(body)
          } 
       /*fetch(backUrl+"/set/havaleout",postOptions)
        .then(res => res.json())
        .then(
        (result) => {
            console.log(result);
            document.location.reload();
        },
        (error) => {
            console.log(error);
        })*/
    }
    return(<>
        <div className='havaleList'>
            <div className='havaleLabel'>
                ورودی</div>
            <table>
             <tbody>
                 <tr><th>شناسه</th>
                <th>دسته بندی</th>
                <th>مشخصات</th>
                <th>کیفیت</th>
                <th>تعداد</th>
                <th>عملیات</th></tr>
            {havaleList&&havaleList.havaleInList.map((havale,i)=>(
            <tr key={i} id={havale._id} className='havaleItem'>
                <td style={{maxWidth:"40px",overflow: "hidden"}}>{havale.sku}</td>
                <td>{havale.category}</td>
                <td>{havale.size1+(havale.size2?"×"+havale.size2:' اینچ ')+' | '+
                    havale.thick+' میل '+' | '+
                    havale.length+' متر '}</td>
                <td>{havale.quality+' | '+ havale.degree}</td>
                <td>{havale.count}</td>
                <td><button className='btn' onClick={()=>setOut(havale._id)}>ویرایش</button>
                <button className='btn' onClick={()=>{props.setHavaleOutItem(havale);props.setHavaleIn(0)}}>خروجی</button></td>
            </tr>
            ))}
            </tbody>
            </table>
        </div></>
    )
}
export default HavaleInList