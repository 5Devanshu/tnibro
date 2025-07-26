import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSectorStockSuccess: [],
  isSectorStockError: '',
  isloading: false,
  getPredictStockFail: '',
  getPredictStockSuccess: [],
  noDataFound: false,
  emptymsg: '',
};

const SectorStockSlice = createSlice({
  name: 'SectorStockSlice',
  initialState,
  reducers: {
    getSectorStock(state, action) {
      state.isLoading = true;
      state.isSectorStockError = '';
      state.isSectorStockSuccess = [];
    },
    getSectorStockSuccess(state, action) {
      state.isLoading = false;
      state.isSectorStockSuccess = action?.payload?.response;
      state.isSectorStockError = '';
    },
    getSectorStockFailure(state, action) {
      state.isLoading = false;
      state.isSectorStockSuccess = '';
      state.isSectorStockError = action.payload.data;
    },
    getPredictionStock(state) {
      state.isloading = true;
      state.getPredictStockFail = '';
      state.getPredictStockSuccess = [];
      state.noDataFound = false;
      state.emptymsg = '';
    },
    getPredictionStockSuccess(state, action) {
      state.isloading = false;
      state.getPredictStockSuccess = action.payload;
      state.getPredictStockFail = '';
      if (action?.payload?.response.length == 0) {
        state.noDataFound = true;
        state.emptymsg = action?.payload?.message;
      }
    },
    getPredictionStockFailure(state, action) {
      state.isloading = false;
      state.getPredictStockFail = action.payload;
      state.emptymsg = '';
    },
  },
});

export const {
  getSectorStock,
  getSectorStockSuccess,
  getSectorStockFailure,
  getPredictionStock,
  getPredictionStockSuccess,
  getPredictionStockFailure,
} = SectorStockSlice.actions;

export default SectorStockSlice.reducer;
