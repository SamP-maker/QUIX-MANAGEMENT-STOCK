import React, { useEffect, useState } from 'react';
import '../../../style/css/itemReturnForm.css';
import { CancelButton, CloseButton, SubmitButton } from "../../../util/buttons";
import { useDispatch } from 'react-redux';
import { updateRequests } from '../../../redux/feature/RequestSlice';

function ItemForm({ onClose, data }) {
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    

    useEffect(() => {
        if (data) {
            setFormData(data);
        }
        console.log(data)
    }, [data]);


    const handleFormUpdate = (item) =>{
        const updatedItems = item.map(value => ({
            ...value,
            return_status:'pending',
            request_status: 'approved',
        }))
        
        dispatch(updateRequests(updatedItems));

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
                            </div>
                        ))}
                    </ul>
                </div>
            </form>

            <SubmitButton/>
            <CancelButton/>
        </div>
    );
}

export default ItemForm;
