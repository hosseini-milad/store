import simpleFetch from '../../components/simpleFetch'
import backUrl from '../../env';
function HavaleOutList (){
    const havaleOutList = simpleFetch(backUrl+"/havaleout");
    //console.log(havaleOutList)
    
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
                <th>عملیات</th></tr>
            {havaleOutList&&havaleOutList.out.map((havale,i)=>(
            <tr key={i} id={havale.havaleDetail[0]._id} className='havaleItem'>
                <td style={{maxWidth:"40px",overflow: "hidden"}}>{havale.havaleDetail[0].sku}</td>
                <td>{havale.havaleDetail[0].category}</td>
                <td>{havale.havaleDetail[0].size1+(havale.havaleDetail[0].size2?"×"+havale.havaleDetail[0].size2:' اینچ ')+' | '+
                    havale.havaleDetail[0].thick+' میل '+' | '+
                    havale.havaleDetail[0].length+' متر '}</td>
                <td>{havale.havaleDetail[0].quality+' | '+ havale.havaleDetail[0].degree}</td>
                <td>{havale.count}</td>
                <td>
                <button className='btn' onClick={()=>{}}>ویرایش</button></td>
            </tr>
            ))}
            </tbody>
            </table>
        </div>
        </>
    )
}
export default HavaleOutList