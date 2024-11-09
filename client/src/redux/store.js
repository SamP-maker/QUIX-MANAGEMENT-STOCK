import { configureStore } from "@reduxjs/toolkit";
import ItemFormReducer from "./feature/ItemFormSlice";
import SidebarReducer from "./feature/SidebarSlice";
import InventoryReducer from "./feature/InventorySlice";
import ReturnReducer from "./feature/ReturnSlice"
import SearchbarReducer from "./feature/SearchbarSlice";
import RequestReducer from "./feature/RequestSlice";



const store = configureStore({

    reducer:{
        searchbar: SearchbarReducer,
        itemForm: ItemFormReducer,
        sidebar: SidebarReducer,
        inventory: InventoryReducer,
        return:ReturnReducer,
        request: RequestReducer,
        
       
    }





})


export default store