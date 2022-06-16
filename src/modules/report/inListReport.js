
import simpleFetch from '../../components/simpleFetch'
import backUrl, { createReport } from '../../env';
function InListReport (props){
    const havaleList = simpleFetch(backUrl+"/havalein");
    const havaleOutList = simpleFetch(backUrl+"/havaleout");
    
    
    var report = '';
    havaleList&&havaleOutList&& 
        (report = createReport(havaleList.havaleInList,havaleOutList.out));
    return(<>
        <div className='havaleList'>
            <div className='havaleLabel'>
                موجودی</div>
            <table>
             <tbody>
                 <tr>
                <th>دسته بندی</th>
                <th>مشخصات</th>
                <th>کیفیت</th>
                <th>تعداد</th>
                <th>عملیات</th></tr>
            {report&&report.map((havale,i)=>(
            <tr key={i} id={havale._id} className='havaleItem'>
                <td>{havale.category}</td>
                <td>{havale.size1+(havale.size2?"×"+havale.size2:' اینچ ')+' | '+
                    havale.thick+' میل '+' | '+
                    havale.length+' متر '}</td>
                <td>{havale.quality+' | '+ havale.degree}</td>
                <td>{havale.count}</td>
                <td>
                <button className='btn' onClick={()=>{props.setHavaleOutItem(havale);props.setHavaleIn(0)}}>خروجی</button></td>
            </tr>
            ))}
            </tbody>
            </table>
        </div></>
    )
}
export default InListReport