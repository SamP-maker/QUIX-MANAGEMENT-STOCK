import React from 'react';
import '../style/css/button.css';
import Notification from './notification';



export const Addbutton =({onClick}) => {
    
    return(

        <div className="button-container" onClick={onClick}>
            +
        </div>
    
    
    )
}



export const MinusButton =({onClick}) => {
    
    return(

        <div className="button-container" onClick={onClick}>
            -
        </div>
    
    
    )
}



export const RemoveButton=()=>{



    return(

        <div className="button-container-inventory">
            -
        </div>
    
    
    )



}


export const CustomButton=({text,padding,onChange,sortBy,sortOrder,onClick})=>{

    
        if(padding == 'sort'){
            return( <div className="custom-container" padding={padding}>
            <label>{text}</label>
                <select value={sortBy} onChange={onChange}>
                    <option value="created_at">Created At</option>
                    <option value="updated_at">Updated At</option>
                    <option value="available">Available</option>
                    <option value="missing_item">Missing Item</option>
                    <option value="broken_item">Broken Item</option>
                    <option value="total_count">Total Count</option>
                    <option value="price_per_unit_myr">Price Per Unit (MYR)</option>
                    <option value="total_stock_price_myr">Total Stock Price (MYR)</option>
                </select>
        </div>)
    
        }else if(padding == 'order'){
            return(

                <div className="custom-container" padding={padding}>
                        <label>{text}</label>
                <select value={sortOrder} onChange={onChange}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                    </div>

            )
        }else if(padding =='csv'){


                return(
                    <div className="custom-container" padding={padding} onClick={onClick}>
            {text}
        </div>
                )
        }else if(padding == 'request-sort'){
            return( <div className="custom-container" padding={padding}>
            <label>{text}</label>
                <select value={sortBy} onChange={onChange}>
                    <option value="created_at">Created At</option>
                    <option value="updated_at">Updated At</option>
                    <option value="request_id">Request ID</option>
                    <option value="returner_id">Return ID</option>
                    <option value="expire_at">Expiry Time</option>
                    <option value="work_order"> Work Order</option>
                    <option value="team">Team</option>
                    <option value="department">Department</option>
                </select>
        </div>)
    
        }else if(padding == 'filter'){
            return(

                <div className="custom-container" padding={padding}>
            <label>{text}</label>
                <select value={sortBy} onChange={onChange}>
                <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
        </div>)
                
            
        }else if(padding=="consumable-sort"){

            return(
            <div className="custom-container" padding={padding}>
            <label>{text}</label>
                <select value={sortBy} onChange={onChange}>
                <option value="Day">Day</option>
                    <option value="Week">Week</option>
                    <option value="Month">Month</option>
                    <option value="Year">Year</option>
                   
                </select>
        </div>)
        }

    
    
}


export const CancelButton=()=>{

    return(

        <div className="cancel-container">
            Cancel
        </div>
    
    
    )
}


export const SubmitButton=({ type = "submit" })=>{

    return(

        <button className="submit-container" type={type}>
            Submit
        </button>
    
    
    )
    
}



export const BurgerBars = ({onClick}) =>{
    return(
    
    <div className="Burgerbar-flexbox" onClick={onClick}>
        <Notification BurgerBars={true}/>

        <div className="Burgerbar-Container"></div>
        <div className="Burgerbar-Container"></div>
        <div className="Burgerbar-Container"></div>
    
    
    </div>
    
)
}


export const CloseButton = ({onClick}) =>{
    return(
    
    <div className="CloseButton-flexbox" onClick={onClick}>

        <i class="fa fa-close"></i>
    
    </div>
    
)
}



export const AddItemButton = ({onClick,text,type})=>{


    if(type =='normal'){
        return(

            <button className={"button-container-inventory" } onClick={onClick}>{text}
                </button>
    
        )
    }else if(type == 'cancel'){
        return(

            <button className="button-container-inventory red" onClick={onClick}>{text}
                </button>
    
        )
    }
}



