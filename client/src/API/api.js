export const fetchWithHeaders = async (url,  options = {}) =>{
    const defaultHeaders ={
        "Content-Type": "application/json",
        "credentials": "include"
    }


    const mergedOptions = {
        ...options,
        headers:{
            ...defaultHeaders,
            ...options.headers
        }
    };
    


    try{
        const response = await fetch(url, mergedOptions)

    
       if(!response.ok){
         throw new Error("Network response was not ok")

       }
       const data = await response.json();
        console.log(data);  // Log the parsed data
        return data;        // Return the parsed data
    }catch(error){
        console.error('Fetch error:', error);
        throw error;
    }
}