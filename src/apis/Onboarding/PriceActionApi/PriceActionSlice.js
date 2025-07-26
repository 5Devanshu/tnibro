import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  ispriceActionSuccess: [],
  ispriceActionError: '',
  isDataLength: false,
};

const PriceActionSlice = createSlice({
  name: 'PriceActionSlice',
  initialState,
  reducers: {
    getPriceAction(state, action) {
      state.isLoading = true;
      state.ispriceActionSuccess = [];
      state.ispriceActionError = '';
      state.isDataLength = false;
    },
    getPriceActionSuccess(state, action) {
      state.isLoading = false;
      state.ispriceActionSuccess = action?.payload;
      state.ispriceActionError = '';
    },
    getPriceActionFailure(state, action) {
      state.isLoading = false;
      state.ispriceActionSuccess = '';
      state.ispriceActionError = action.payload.data;
      if (action?.payload?.response.length == 0) {
        state.isDataLength = true;
      }
    },
  },
});

export const {getPriceAction, getPriceActionSuccess, getPriceActionFailure} =
  PriceActionSlice.actions;

export default PriceActionSlice.reducer;
