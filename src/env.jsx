const backUrl="http://192.168.11.25:2030/api";
export default backUrl

export function fReport(rawReport,filter){
    var outArray = []; 
    if(!filter.length) return(rawReport)
    for(var i = 0;i<rawReport.data.length;i++){
        if(checkFilters(rawReport.data[i], filter))
        outArray.push(rawReport.data[i])
    }
    return({data:outArray})
}
const checkFilters=(input,filterList)=>{
    var kind = [];
    var similarity = 0;
    for(var j=0;j<filterList.length;j++){
        //console.log(kind.find(item=>item===filterList[j].split(':')[0]))
        if(kind.find(item=>item===filterList[j].split(':')[0])===undefined)
            kind.push(filterList[j].split(':')[0]);
    if(input.havale.sku.includes(filterList[j].split(':')[1])||
        input.havale.category === filterList[j].split(':')[1]||
        input.havale.size1 === filterList[j].split(':')[1]||
        input.havale.size2 === filterList[j].split(':')[1]||
        input.havale.thick === filterList[j].split(':')[1]||
        input.havale.degree === filterList[j].split(':')[1]||
        input.havale.quality === filterList[j].split(':')[1]||
        compareLength(input.havale.leng,filterList[j].split(':')[1]))
    similarity++;
    }
    //console.log(similarity,kind)
return(similarity===kind.length)
}
export function createReport(inputArray,havaleOut,filter){
    var outArray = []; 

    for(var i = 0;i<inputArray.length;i++){
        //console.log(inputArray[i]);
        if(!checkFilters(inputArray[i],filter)){
            console.log(inputArray[i]);
            continue
        } 
        const index = checkRepeated(inputArray[i],outArray)
        if(index===-1)
            outArray.push(
                {sku:inputArray[i].sku,
                 id:inputArray[i]._id,
                 category:inputArray[i].category,
                 count:  inputArray[i].count,
                 degree: inputArray[i].degree,
                 leng: inputArray[i].leng,
                 quality: inputArray[i].quality,
                 size1: inputArray[i].size1,
                 size2: inputArray[i].size2,
                 thick:inputArray[i].thick
                }
            )
        else{
            outArray[index].count =parseInt(outArray[index].count)+parseInt(inputArray[i]. count)
        }
    }
    return(checkOutPut(outArray,havaleOut))
}
const checkRepeated=(input,list)=>{
    console.log(input,list)
    for(var j=0;j<list.length;j++)
        if(input.sku === list[j].sku
            /*input.category === list[j].category&&
            input.size1 === list[j].size1&&
            (input.size2?input.size2 === list[j].size2:1)&&
            input.thick === list[j].thick&&
            input.degree === list[j].degree&&
            input.quality === list[j].quality&&
            input.length === list[j].length*/)
            return(j);
    return(-1)
}


const checkOutPut=(havaleIn,havaleOut)=>{
    for(var o=0;o<havaleOut.length;o++){
        const havaleDetail = havaleOut[o].havaleDetail[0];
        for(var i=0;i<havaleIn.length;i++)
            if(havaleDetail.category === havaleIn[i].category&&
                havaleDetail.size1 === havaleIn[i].size1&&
                (havaleDetail.size2?havaleDetail.size2 === havaleIn[i].size2:1)&&
                havaleDetail.thick === havaleIn[i].thick&&
                havaleDetail.degree === havaleIn[i].degree&&
                havaleDetail.quality === havaleIn[i].quality&&
                havaleDetail.leng === havaleIn[i].leng){
                    havaleIn[i].count=parseInt(havaleIn[i].count)-parseInt(havaleOut[o].count)
                }
            }
    return(havaleIn)
}

const compareLength=(meter,range)=>{
    var size=range.split('range')[1];
    if(size!== undefined){
        if(size[0]==='='){
            if(meter.split('m')[0]==="12")
                return(1)
        }
        if(size[0]==='+'){
            if(parseFloat(meter.split('m')[0])>12)
                return(1)
        }
        if(size[0]==='-'){
            if(parseFloat(meter.split('m')[0])<12)
                return(1)
        }
    }
    return(0)
}
export const SetFilter=async(filterId,filter,setFilter)=>{
    
    var rep = 0;
    var filterList = filter;
    if(filterId.split(':')[0]==="sku"){
        for(var index=0;index<filterList.length;index++)
            if(filterList[index].split(':')[0] === filterId.split(':')[0]){
                //filterList[index] = filterId;
                filterList.splice(index);
                if(filterId.split(':')[1]!=="")filterList = [...filter, filterId];
                await setFilter(filterList.splice(index))
                
                return;
            }
    }
    else{ for(var index=0;index<filterList.length;index++)
        if(filterList[index] === filterId){
            setFilter(filterList.filter(item => item  !== filterId))
    
    rep= 1;
            break;
        }
    }
    !rep&&setFilter([...filter, filterId])
}
export const ClearFilter=(filterId,filter,setFilter)=>{
    var rep = 0;
    var filterList = filter;
    
    for(var index=0;index<filterList.length;index++)
        if(filterList[index].split(':')[0] === filterId){
           console.log(filterList[0]) 
            setFilter(filterList.filter(item => item  !== filterList[index]))
    
    rep= 1;
            break;
        }
}