


export const checkInputValidation =(data)=>{

    const validateInput = () =>{
        return typeof data === 'string' && data.length > 0;
    }

    const sanitizeInput = () =>{
        return data.replace(/[<>&"'`;\/\\]/g,'');
    };


  

    
    if(validateInput()){
        const data = sanitizeInput();
        return data;
    }else{
        console.log('attacker alert');
        return null;
    }





}