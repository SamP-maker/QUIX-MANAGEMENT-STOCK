export const handleSignIn = (url,body) =>{

    try{
    const response = fetch(url,{ 
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        credentials:'include',
        body:JSON.stringify(form)

    })}
    catch(error){
        //display error proposal here
    }
}