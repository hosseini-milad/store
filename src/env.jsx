const backUrl="http://192.168.0.150:2030/api";
export default backUrl


export function createReport(inputArray,havaleOut){
    var outArray = []; 
    for(var i = 0;i<inputArray.length;i++){
        const index = checkRepeated(inputArray[i],outArray)
        if(index===-1)
            outArray.push(
                {category:inputArray[i].category,
                 count:  inputArray[i].count,
                 degree: inputArray[i].degree,
                 length: inputArray[i].length,
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
    for(var j=0;j<list.length;j++)
        if(input.category === list[j].category&&
            input.size1 === list[j].size1&&
            (input.size2?input.size2 === list[j].size2:1)&&
            input.thick === list[j].thick&&
            input.degree === list[j].degree&&
            input.quality === list[j].quality&&
            input.length === list[j].length)
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
                havaleDetail.length === havaleIn[i].length){
                    havaleIn[i].count=parseInt(havaleIn[i].count)-parseInt(havaleOut[o].count)
                }
            }
    return(havaleIn)
}