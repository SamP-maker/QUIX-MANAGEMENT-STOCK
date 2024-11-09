import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  suggestions: [],
  status: 'idle', // or 'loading', 'succeeded', 'failed'
};

export const fetchSearchSuggestions = createAsyncThunk(
  'search/fetchSearchSuggestions',
  async (query) => {
    const response = await fetch(`http://localhost:8080/search-suggestion/search?query=${query}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log(data); // Make sure this logs the expected data
      return data;
    }
  
);

const searchbarSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    clearSuggestions(state) {
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchSuggestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchSearchSuggestions.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setQuery, clearSuggestions } = searchbarSlice.actions;

export default searchbarSlice.reducer;
