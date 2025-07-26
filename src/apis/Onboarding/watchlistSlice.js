import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isloader: false,
  isWatchlistSuccess: '',
  iswatchlistlength: '',
  isWatchlistError: '',
  isdeleteWatchlistLoading: false,
  isdeleteWatchlistSuccess: '',
  isdeleteWatchlistError: '',
  isloading: false,
  tableloading: false,
  isaddWatchlistSuccess: '',
  isaddWatchlistError: '',
  iseditWatchListSuccess: '',
  iseditWatchListError: '',
  isWatchlistTableSuccess: [],
  isWatchlistTable: [],
  isWatchlistTableError: '',
  isDataFailure: '',
  noTabClickData: false,
  ///
  isSymbolloader: false,
  isSymbolListSuccess: [],
  isSymbolListError: '',
  totalPages: 1, //for pagination
  moreLoading: false, //for pagination
  //
  isSymbolSuccess: '',
  isSymbolError: '',
  //
  isdeleteSymbolSuccess: '',
  isdeleteSymbolError: '',
  isAlertWatchListSuccess: '',
  isAlertWatchListError: '',
  //
  isSearchSymbolSuccess: '',
  isSearchSymbolError: '',
  isSymbolloaderrr: false,
};

const totalWatchlistSlice = createSlice({
  name: 'totalWatchlist',
  initialState,
  reducers: {
    ////show the total watchlist folder
    getWatchlist(state, action) {
      state.isloader = true;
      state.isWatchlistSuccess = '';
      state.isWatchlistError = '';
    },
    getWatchlistSuccess(state, action) {
      state.isloader = false;
      state.isWatchlistSuccess = action?.payload;
      state.iswatchlistlength = action?.payload?.response?.length;
      state.isWatchlistError = '';
    },
    getWatchlistFailure(state, action) {
      state.isloader = false;
      state.isWatchlistSuccess = '';
      state.isWatchlistError = action?.payload?.data;
    },
    //use to delet the folder of watchlist
    deleteWatchlist(state, action) {
      state.isdeleteWatchlistLoading = true;
    },
    deleteWatchlistSuccess(state, action) {
      state.isdeleteWatchlistLoading = false;
      state.isdeleteWatchlistSuccess = action?.payload;
      state.isdeleteWatchlistError = '';
    },
    deleteWatchlistFailure(state, action) {
      state.isdeleteWatchlistLoading = false;
      state.isdeleteWatchlistSuccess = '';
      state.isdeleteWatchlistError = action?.payload?.data;
    },
    //use to add new watchlist folder
    addWatchList(state, action) {
      state.isloading = true;
      state.isaddWatchlistSuccess = '';
      state.isaddWatchlistError = '';
    },
    addWatchListSuccess(state, action) {
      state.isloading = false;
      state.isaddWatchlistSuccess = action?.payload;
      state.isaddWatchlistError = '';
    },
    addWatchListFailure(state, action) {
      state.isloading = false;
      state.isaddWatchlistSuccess = '';
      state.isaddWatchlistError = action?.payload;
    },
    ///use to edit the watchlist folder name
    editWatchList(state, action) {
      state.isloading = true;
      state.iseditWatchListSuccess = '';
      state.iseditWatchListError = '';
    },
    editWatchListSuccess(state, action) {
      state.isloading = false;
      state.iseditWatchListSuccess = action?.payload;
      state.iseditWatchListError = '';
    },
    editWatchListFailure(state, action) {
      state.isloading = false;
      state.iseditWatchListSuccess = '';
      state.iseditWatchListError = action?.payload;
    },
    //// use to show the stocks_table inside the watchlist folder
    getWatchlistTable(state, action) {
      state.tableloading = true;
      state.isWatchlistTableSuccess = [];
      state.isWatchlistTableError = '';
      state.noTabClickData = false;
    },
    getWatchlistTableSuccess(state, action) {
      const {payload} = action;
      state.tableloading = false;
      state.isWatchlistTableSuccess = action?.payload?.response;
      state.isWatchlistTable = action?.payload?.response;
      state.isWatchlistTableError = '';
      if (payload?.response.length == 0) {
        state.noTabClickData = true;
      }
    },
    getWatchlistTableFailure(state, action) {
      state.tableloading = false;
      state.isWatchlistTableSuccess = '';
      state.isWatchlistTableError = action?.payload?.data;
      state.isDataFailure = action?.payload?.statusText;
    },
    //use to show the total list of symbol to add in watchlist folder
    getSymbolList(state, action) {
      state.isSymbolloader = true;
      state.isSymbolListSuccess = [];
      state.isSymbolListError = '';
      // if (action?.payload?.page_no === 1) {
      //   state.isSymbolloader = true;
      // } else {
      //   state.moreLoading = true;
      // }
    },
    getSymbolListSuccess(state, action) {
      state.isSymbolloader = false;
      state.isSymbolListSuccess = action?.payload;
      state.isSymbolListError = '';
      // state.isSymbolListSuccess = [...state.isSymbolListSuccess, ...action?.payload?.response];
      // state.moreLoading = false;
      // state.totalPages = Math.ceil(action.payload?.total_length / 10);
    },
    getSymbolListFailure(state, action) {
      state.isSymbolloader = false;
      state.isSymbolListSuccess = [];
      state.isSymbolListError = action?.payload;
      // state.moreLoading = false;
    },
    //// use to search the stock in watchlist
    getSearchSymbol(state, action) {
      state.isSymbolloaderrr = true;
      state.isSearchSymbolSuccess = '';
      state.isSearchSymbolError = '';
    },
    getSearchSymbolSuccess(state, action) {
      state.isSymbolloaderrr = false;
      state.isSearchSymbolSuccess = action?.payload;
      state.isSearchSymbolError = '';
    },
    getSearchSymbolFailure(state, action) {
      state.isSymbolloaderrr = false;
      state.isSearchSymbolSuccess = '';
      state.isSearchSymbolError = action?.payload;
    },
    ///// When user add any symbol in watchlist folder
    symboleAddedWatchList(state, action) {
      state.isloading = true;
      state.isSymbolSuccess = '';
      state.isSymbolError = '';
    },
    symbolAddedSuccess(state, action) {
      state.isloading = false;
      state.isSymbolSuccess = action?.payload;
      state.isSymbolError = '';
    },
    symbolAddedFailure(state, action) {
      state.isloading = false;
      state.isSymbolSuccess = '';
      state.isSymbolError = action?.payload;
    },
    /// wher user delet  symbol in any warchlist folder

    deleteSymbol(state, action) {
      state.isloading = true;
      state.isdeleteSymbolSuccess = '';
      state.isdeleteSymbolError = '';
    },
    deleteSymbolSuccess(state, action) {
      state.isloading = false;
      state.isdeleteSymbolSuccess = action?.payload;
      state.isdeleteSymbolError = '';
    },
    deleteSymbolFailure(state, action) {
      state.isloading = false;
      state.isdeleteSymbolSuccess = '';
      state.isdeleteSymbolError = action?.payload;
    },
    /// add / Remove Alert in watchlist
    addAlertWatchList(state, action) {
      state.isloading = true;
      state.isAlertWatchListSuccess = '';
      state.isAlertWatchListError = '';
    },
    addAlertWatchListSuccess(state, action) {
      state.isloading = false;
      state.isAlertWatchListSuccess = action?.payload;
      state.isAlertWatchListError = '';
    },
    addAlertWatchListFailure(state, action) {
      state.isloading = false;
      state.isAlertWatchListSuccess = '';
      state.isAlertWatchListError = action?.payload?.data;
    },
  },
});

export const {
  getWatchlist,
  getWatchlistSuccess,
  getWatchlistFailure,
  deleteWatchlist,
  deleteWatchlistSuccess,
  deleteWatchlistFailure,
  addWatchList,
  addWatchListSuccess,
  addWatchListFailure,
  editWatchList,
  editWatchListSuccess,
  editWatchListFailure,
  getWatchlistTable,
  getWatchlistTableSuccess,
  getWatchlistTableFailure,
  getSymbolList,
  getSymbolListSuccess,
  getSymbolListFailure,
  symboleAddedWatchList,
  symbolAddedSuccess,
  symbolAddedFailure,
  deleteSymbol,
  deleteSymbolSuccess,
  deleteSymbolFailure,
  addAlertWatchList,
  addAlertWatchListSuccess,
  addAlertWatchListFailure,
  getSearchSymbol,
  getSearchSymbolSuccess,
  getSearchSymbolFailure,
} = totalWatchlistSlice.actions;

export default totalWatchlistSlice.reducer;
