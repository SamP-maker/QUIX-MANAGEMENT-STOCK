import React, { useEffect, useState } from 'react';
import '../../../style/css/itemForm.css';
import { Addbutton, MinusButton, CancelButton, SubmitButton } from '../../../util/buttons';
import { useSelector, useDispatch } from 'react-redux';
import { increaseCount, decreaseCount, addNewItems, AddNewRequest, addNewRequest } from '../../../redux/feature/ItemFormSlice';
import SearchBar from '../../../util/search-bar-content';

function ItemForm() {
  const { item } = useSelector((store) => store.itemForm);
  const dispatch = useDispatch();

  const [department, setDepartment] = useState('');
  const [workOrder, setWorkOrder] = useState('');
  const [team, setTeam] = useState('');

  const [departmentError, setDepartmentError] = useState(false);
  const [workOrderError, setWorkOrderError] = useState(false);
  const [teamError, setTeamError] = useState(false);
  const [itemError, setItemError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date(); // Current date and time
const dateWith10DaysAdded = new Date(currentDate); // Create a copy of the current date
dateWith10DaysAdded.setDate(currentDate.getDate() + 10); // Add 10 days
const isoString = dateWith10DaysAdded.toISOString(); // Convert to ISO string


    // Reset error states
    setDepartmentError(false);
    setWorkOrderError(false);
    setTeamError(false);
    setItemError(false);

    // Validate inputs
    let hasError = false;

    if (department === '') {
      setDepartmentError(true);
      setTimeout(() => setDepartmentError(false), 2000);
      hasError = true;
    }

    if (workOrder === '') {
      setWorkOrderError(true);
      setTimeout(() => setWorkOrderError(false), 2000);
      hasError = true;
    }

    if (team === '') {
      setTeamError(true);
      setTimeout(() => setTeamError(false), 2000);
      hasError = true;
    }

    if (item.length === 0) {
      setItemError(true);
      setTimeout(() => setItemError(false), 2000);
      hasError = true;
    }

    if (hasError) return;

    const requestPayload = {
      request_id: 0,
      returner_id: 0,
      created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        expire_at: isoString,
        
      return_status: 'pending',
      request_status: 'pending',
      work_order: workOrder,
      team: team,
      department: department,
      items: item.map((items) => ({
        ...items,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })),
    };
    console.log('Request Payload:', JSON.stringify(requestPayload, null, 2)); // Log payload for debugging

    
    dispatch(AddNewRequest({ NewRequest: requestPayload }))
      .then((response) => {
        console.log('Response:', response); // Log the response from the backend
      })
      .catch((err) => {
        console.error('Error:', err); // Log any errors
      });
  };

  return (
    <div className="container">
      <form className="top-container" onSubmit={handleSubmit} >
        <div className="Logo-Container">
          <h1>Item Borrow Form</h1>
        </div>

        <hr className="Line" />

        <SearchBar />

        {itemError && <label className="error-container">No Items added to List</label>}

        {item.map((itemId) =>
          itemId.item_name ? (
            <div className="item-added-container" key={itemId.item_id}>
              <p2>{itemId.item_name}</p2>
              <div className="count-container">
                <Addbutton onClick={() => dispatch(increaseCount(itemId))} />
                <p1>{itemId.item_quantity}</p1>
                <MinusButton onClick={() => dispatch(decreaseCount(itemId))} />
              </div>
            </div>
          ) : null
        )}

        <div className="label-input-container">
          {departmentError ? (
            <label className="error-container">*Department cannot be empty*</label>
          ) : (
            <label className="label-container">Department</label>
          )}
          <select
            className="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            <option value="Inspection-Team">Inspection</option>
            <option value="Scaffold-Team">Scaffold</option>
            <option value="Insulation-Team">Insulation</option>
            <option value="Mechanical-Team">Mechanical Team</option>
          </select>
        </div>

        <div className="label-input-container">
          {workOrderError ? (
            <label className="error-container">*Work Order cannot be empty*</label>
          ) : (
            <label className="label-container">Work Order</label>
          )}
          <input
            className="input-container"
            value={workOrder}
            onChange={(e) => setWorkOrder(e.target.value)}
          />
        </div>

        <div className="label-input-container">
          {teamError ? (
            <label className="error-container">*Team cannot be empty*</label>
          ) : (
            <label className="label-container">Team</label>
          )}
          <input
            className="input-container"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />
        </div>

        <div className="form-event-button">
          <CancelButton onClick={() => null} />
          <SubmitButton type={"submit"}/>
        </div>
      </form>
    </div>
  );
}

export default ItemForm;
