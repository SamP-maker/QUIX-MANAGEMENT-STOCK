
import React from 'react';
import "../../../style/css/form.css"

function Form() {

  const handleSubmit = (e)=>{
    e.preventDefault();
  }


  return (
  <div className="container">

    
   <form className="top-container" onSubmit={handleSubmit}>


<div className='Logo-Container'>
   <h1 >CCenterprise</h1>
   <p1 >by QUIX</p1>
</div>
   <hr className='Line'/>

  <div className="label-input-container">

    <label className='label-container'>User ID</label>
                  <input className="input-container"></input>

  </div>

  <div className="label-input-container">

    <label  className='label-container'>Password</label>
                  <input className="input-container"></input>

  </div>



  <div className="label-input-container">
      <label  className='label-container'>Division</label>

              <select id="division">
      
                            <option value="Bintulu">Bintulu</option>
                            <option value="Johor">Johor</option>
                            <option value="Kota-Kinabalu">Kota Kinabalu</option>
                            <option value="Selangor">Selangor</option>



              </select>
      </div>

    <button className='button-submit' type="submit"> Submit</button>
    <div className='link-container'>
        <a href='/' className="link">Forgot your EID?</a>
        <a href='/' className="link">Forgot your password?</a>
    </div>
    
   </form>
   </div>
   
  );
}

export default Form;
