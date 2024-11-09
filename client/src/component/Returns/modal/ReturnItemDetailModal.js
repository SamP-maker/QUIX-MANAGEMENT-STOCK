import React, { useEffect, useState } from 'react';
import '../../../style/css/itemReturnForm.css';
import { CloseButton, CustomButton, SubmitButton, CancelButton } from "../../../util/buttons";
import { useDispatch } from 'react-redux';
import { updateReturnStatus } from '../../../redux/feature/ReturnSlice';

function ItemForm({ onClose, data }) {
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch(updateReturnStatus())
    useEffect(() => {
        if (data) {
            setFormData(data);
        }
        console.log(data)
    }, [data]);

    const handleSubmit =(e)=>{
        e.preventDefault()
        dispatch(updateReturnStatus())
    }


    
    const handleFormUpdate = (item) =>{
        const updatedItems = item.map(value => ({
            ...value,
            return_status:'pending',
            request_status: 'approved',
        }))
        
        dispatch(updateReturnStatus(updatedItems));

    }

    return (
        <div className="container">
            <form className="top-container"  key={formData.request_id} onSubmit={(e) => {
                e.preventDefault(); // Prevent default form submission
                handleFormUpdate(formData);
            }}>
                <div className="Close-Button-Container">
                    <CloseButton onClick={onClose} />
                </div>
                <div className='Logo-Container'>
                    <h1>Item Details Form</h1>
                </div>
                <hr className='Line' />
                <div className="return-form-list-container">
                    <h1 className="Header">Department</h1>
                    <p1 className="Description">{formData.department}</p1>
                    <h1 className="Header">Work Order</h1>
                    <p1 className="Description">{formData.work_order}</p1>
                    <h1 className="Header">Team</h1>
                    <p1 className="Description">{formData.team}</p1>
                    <h1 className="Header">Return Date</h1>
                    <p1 className="Description">{formData.updated_at}</p1>
                    <h1 className="Header">Items Borrowed</h1>
                    <ul>
                        {formData.items && formData.items.map((item, index) => (
                            <div className="Item-Spread-Container">
                            <li key={index}>{item.item_name}</li>
                            <select value={item.status}>
                                <option value={"missing"}>Missing</option>
                                <option value={"broken"}>Broken</option>
                                <option value={"available"}>Available</option>
                                <option value={"in_use"}>In Use</option>
                            </select>
                            </div>
                        ))}
                    </ul>
                </div>

                
                <SubmitButton/>
            <CancelButton/>
            </form>
    
           
        </div>
    );
}

export default ItemForm;
