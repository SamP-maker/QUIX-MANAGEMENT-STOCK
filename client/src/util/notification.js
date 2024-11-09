import React, { useEffect } from 'react';
import '../style/css/notification.css';
import { openSidebar } from '../redux/feature/SidebarSlice';
import { fetchAllRequests } from '../redux/feature/RequestSlice';
import { fetchAllReturns } from '../redux/feature/ReturnSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';


const Notification = ({ returnCount, requestCount , BurgerBars }) => {
    const dispatch = useDispatch();
    const { revealSidebar, ReturnCount, RequestCount } = useSelector((store) => store.sidebar);
    const location = useLocation();

    useEffect(() => {
        const isOnRequestOrReturnPage = location.pathname.includes('ReturnList') || location.pathname.includes('RequestList') || location.pathname.includes('ConsumableList');
        
        if (!isOnRequestOrReturnPage) {  // Only dispatch if the sidebar is open and not on specific pages
            dispatch(fetchAllRequests({ sortBy: 'created_at', sortOrder: 'asc' }));
            dispatch(fetchAllReturns({ sortBy: 'created_at', sortOrder: 'asc' }));
        }
    }, [revealSidebar, location, dispatch]);

    return (
        <div>

            {!BurgerBars ? <div className="content-position-container">
            {returnCount ? <div className='count-border-container'>{ReturnCount}</div> : null}
            {requestCount ? <div className='count-border-container'>{RequestCount}</div> : null}
            
        </div>
        
    
        :
        <div className="BurgerBar-position-container">
            
            {ReturnCount  && BurgerBars  && !revealSidebar|| RequestCount && BurgerBars  ? <div className='burgerbar-border-container'>!</div> : null}
        </div>
        
        
        
        }
        

        
        </div>
    );
};

export default Notification
