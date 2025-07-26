import {createSlice} from '@reduxjs/toolkit';

// Initial state for selected filters
const initialSelectedFiltersState = {
  previous_pattern: 'all',
  current_pattern: 'all',
  close_open_pct_operator: '',
  close_open_pct_value: '1',
  fiftytwo_weeks_high_operator: '',
  fiftytwo_weeks_high_value: '1',
  fiftytwo_weeks_low_operator: '',
  fiftytwo_weeks_low_value: '1',
  recommendation_filter: 'All',
};

// Create a slice for selected filters
const selectedFiltersSlice = createSlice({
  name: 'selectedFilters',
  initialState: initialSelectedFiltersState,
  reducers: {
    // Set selected filters based on filter_type and value
    setSelectedFilters(state, action) {
      const {filter_type, value} = action.payload;
      state[filter_type] = value;
    },
    // Clear all filters and reset to initial state
    setClearFilter(state) {
      return initialSelectedFiltersState;
    },
  },
});

// Export the actions from the slice
export const {setSelectedFilters, setClearFilter} = selectedFiltersSlice.actions;

// Export the reducer from the slice
export default selectedFiltersSlice.reducer;
