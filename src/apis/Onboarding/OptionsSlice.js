import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  isLoading: false,
  isOptionSuccess: [],
  isOptionError: '',
  isOptionchainSuccess: [],
  isOptionchainError: '',
  isOptionchainSymbSuccess: [],
  isOptionchainSymbError: '',
  isOptionTableSuccess: {},
  isOptionTableError: '',
};

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    getOptions(state, action) {
      // get options stocks list
      // rename to option Stockes
      state.loading = true;
    },
    getOptionsSuccess(state, action) {
      state.loading = false;
      state.isOptionSuccess = action?.payload?.response || [];
      state.isOptionError = '';
    },
    getOptionsFailure(state, action) {
      state.loading = false;
      state.isOptionSuccess = [];
      state.isOptionError = action.payload.data;
    },
    optionchain(state, action) {
      /// get expire data
      state.isLoading = true;
      state.isOptionchainSuccess = [];
      state.isOptionchainError = '';
    },
    optionchainSuccess(state, action) {
      state.isLoading = false;
      state.isOptionchainSuccess = action?.payload?.response || [];
      state.isOptionchainError = '';
    },
    optionchainFailure(state, action) {
      state.isLoading = false;
      state.isOptionchainSuccess = [];
      state.isOptionchainError = action.payload.data;
    },
    optionchainSymbol(state, action) {
      /// get options sumbol
      state.isLoading = true;
      state.isOptionchainSymbSuccess = [];
      state.isOptionchainSymbError = '';
    },
    optionchainSymSuccess(state, action) {
      state.isLoading = false;
      state.isOptionchainSymbSuccess = action?.payload?.response || [];
      state.isOptionchainSymbError = '';
    },
    optionchainSymFailure(state, action) {
      state.isLoading = false;
      state.isOptionchainSymbSuccess = [];
      state.isOptionchainSymbError = action.payload.data;
    }, /////
    optionchainTable(state, action) {
      /// get options sumbol
      state.isLoading = true;
      state.isOptionTableSuccess = {};
      state.isOptionTableError = '';
    },
    optionchainTableSuccess(state, action) {
      state.isLoading = false;
      state.isOptionTableSuccess = action?.payload?.response || {};
      state.isOptionTableError = '';
    },
    optionchainTableFailure(state, action) {
      state.isLoading = false;
      state.isOptionTableSuccess = {};
      state.isOptionTableError = action.payload.data;
    }, /////
  },
});

export const {
  getOptions,
  getOptionsSuccess,
  getOptionsFailure,
  optionchain, //expire date
  optionchainSuccess,
  optionchainFailure,
  optionchainSymbol, // option symb
  optionchainSymSuccess,
  optionchainSymFailure,
  optionchainTable, // get table data
  optionchainTableSuccess,
  optionchainTableFailure,
} = optionsSlice.actions;

export default optionsSlice.reducer;
