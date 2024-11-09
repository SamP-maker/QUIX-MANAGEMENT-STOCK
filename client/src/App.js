import React from "react";
import {Routes,Route} from "react-router-dom";
import SignIn from "./component/UserLogins/form/SignInForm";
import ItemForm from "./component/Requests/form/ItemForm";
import Sidebar from "./component/navigation/Sidebar";
import StockList from "./component/Inventory/StockList";
import RequestList from "./component/Requests/RequestList";
import ReturnList from "./component/Returns/ReturnList";
import ReturnForm from "./component/Returns/form/ItemReturnForm";
import ItemDetailModal from "./component/Requests/modal/ItemDetailModal";
import ConsumableList from './component/Inventory/ConsumableList';








function App() {

  


  
  return (
<Routes>
      <Route path="/SignIn" element={<SignIn/>}/>
      <Route path="/ItemForm" element={<ItemForm/>}/>
      <Route path="/Sidebar" element={<Sidebar/>}/>
      <Route path="/StockList" element={<StockList/>}/>
      <Route path="/RequestList" element={<RequestList/>}/>
      <Route path="/ReturnList" element={<ReturnList/>}/>
      <Route path="/ReturnForm" element={<ReturnForm/>}/>
      <Route path="/ConsumableList" element={<ConsumableList/>}/>


      <Route path="/ItemDetailModal" element={<ItemDetailModal/>}/>
     
</Routes>
  );
}

export default App;