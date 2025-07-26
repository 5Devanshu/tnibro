import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  istickerSuccess: '',
  istickerError: '',
};

const TickerSlice = createSlice({
  name: 'tickerSlice',
  initialState,
  reducers: {
    getTicker(state, action) {
      state.isLoading = true;
      state.istickerError = '';
      state.istickerSuccess = '';
    },
    getTickerSuccess(state, action) {
      state.isLoading = false;
      state.istickerSuccess = action?.payload?.response;
      state.istickerError = '';
    },
    getTickerFailure(state, action) {
      state.isLoading = false;
      state.istickerSuccess = '';
      state.istickerError = action.payload.data;
    },
  },
});

export const {getTicker, getTickerSuccess, getTickerFailure} = TickerSlice.actions;

export default TickerSlice.reducer;
