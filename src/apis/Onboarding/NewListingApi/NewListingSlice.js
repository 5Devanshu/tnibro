import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isnewListedSuccess: [],
  isnewListedError: '',
};

const NewListingSlice = createSlice({
  name: 'NewListingSlice',
  initialState,
  reducers: {
    getNewListing(state, action) {
      state.isLoading = true;
      state.isnewListedSuccess = [];
      state.isnewListedError = '';
    },
    getNewListingSuccess(state, action) {
      state.isLoading = false;
      state.isnewListedSuccess = action?.payload?.response;
      state.isnewListedError = '';
    },
    getNewListingFailure(state, action) {
      state.isLoading = false;
      state.isnewListedSuccess = '';
      state.isnewListedError = action.payload.data;
    },
  },
});

export const {getNewListing, getNewListingSuccess, getNewListingFailure} = NewListingSlice.actions;

export default NewListingSlice.reducer;
