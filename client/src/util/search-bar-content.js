import React, { useEffect } from 'react';
import '../style/css/Searchbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, fetchSearchSuggestions, clearSuggestions } from '../redux/feature/SearchbarSlice';
import {addNewItems} from "../redux/feature/ItemFormSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { query, suggestions, status } = useSelector((store) => store.searchbar);

  useEffect(() => {
  
    if (query.length > 2) {
      dispatch(fetchSearchSuggestions(query));
    } else {
      dispatch(clearSuggestions());
    }
  }, [query, dispatch]);

  const handleChange = (e) => {
    dispatch(setQuery(e.target.value));
  };

  const handleSuggestionClick = (suggestion) => {
    dispatch(setQuery(suggestion.item_name));
    dispatch(addNewItems(suggestion))
    dispatch(clearSuggestions());
  
  };

  return (
   <div className="search-master-container">


    <div className="search-container">
      <input
        className="input-container"
        placeholder="Search for an item"
        onChange={handleChange}
        value={query}
      />


      <i className="fas fa-filter fa-xs"></i>

      
    </div>


    {suggestions.length > 0 && (

<div className="suggestion-container"> 
<ul>
 {suggestions.map((item) => (
   <li key={item.id} onClick={() => handleSuggestionClick(item)}>
     {item.item_name }
   </li>
 ))}
</ul>

</div>
)}
    </div>
  );
};

export default SearchBar;
