


export const AutoCompleteFunction = (data,query) =>{


const lowerCasedQuery = query.toLowerCase();


const dataFilter = data.filter( item => item.toLowerCase().includes(lowerCasedQuery) )


const checkNumberInString = (item)=>{
    const ifNumber = item.match(/\d+/);
    return ifNumber ? parseInt(ifNumber[0], 10) : 0;
}

const dataSort = dataFilter.sort((a,b)=>{
    return checkNumberInString(a) - checkNumberInString(b);

});
return dataSort






}