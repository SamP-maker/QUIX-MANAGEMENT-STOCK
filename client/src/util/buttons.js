import React from 'react';
import '../style/css/button.css'



export const Addbutton =() => {
    
    return(

        <div className="button-container">
            +
        </div>
    
    
    )
}



export const MinusButton =() => {
    
    return(

        <div className="button-container">
            -
        </div>
    
    
    )
}



export const RemoveButton=()=>{



    return(

        <div className="button-container">
            -
        </div>
    
    
    )



}


export const CancelButton=()=>{

    return(

        <div className="cancel-container">
            Cancel
        </div>
    
    
    )
}


export const SubmitButton=()=>{

    return(

        <div className="submit-container">
            Submit
        </div>
    
    
    )
    
}


export const CustomButton = ({text,padding})=>{


      if(padding == "filter"){
            return(
                <button className={"button-filter-container"} >
                {text}
                </button>
            )

           
        }else if(padding == "export"){
            return(
                <button className={"button-export-container"} >
                {text}
                </button>
            )
        }else if(padding == "return"){

            return(
                <button className={"button-return-container"} >
                {text}
                </button>
            )
        }else if(padding == "missing"){

            return(
                <button className={"button-missing-container"} >
                {text}
                </button>
            )
        }else if(padding == "broken"){

            return(
                <button className={"button-broken-container"} >
                {text}
                </button>
            )
        }

       
    
}
