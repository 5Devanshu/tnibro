import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isTinymceSuccess: '',
  isTinymceFail: '',
};

const TinymceSlice = createSlice({
  name: 'TinymceSlice',
  initialState,
  reducers: {
    getTinymce(state, action) {
      state.isLoading = true;
      state.isTinymceSuccess = '';
      state.isTinymceFail = '';
    },
    getTinymceSuccess(state, action) {
      state.isLoading = false;
      state.isTinymceSuccess = action?.payload;
      state.isTinymceFail = '';
    },
    getTinymceFailure(state, action) {
      state.isLoading = false;
      state.isTinymceSuccess = '';
      state.isTinymceFail = action.payload;
    },
  },
});

export const {getTinymce, getTinymceSuccess, getTinymceFailure} = TinymceSlice.actions;

export default TinymceSlice.reducer;
