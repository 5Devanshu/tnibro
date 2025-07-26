import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SearchState {
  loader: boolean;
  isloader: boolean;
  searchText: string;
  searchResults: SearchResult[];
  error: string;
  isSearchDetailSuccess: string;
  isSearchDetailError: string;
}

interface SearchResult {
  id: string;
  name: string;
}

const initialState: SearchState = {
  loader: false,
  isloader: false,
  searchText: '',
  searchResults: [],
  error: '',
  isSearchDetailSuccess: '',
  isSearchDetailError: '',
};

const SearchFieldSlice = createSlice({
  name: 'searchfield',
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    getSearch(state) {
      state.loader = true;
      state.error = '';
      state.searchResults = [];
    },
    getSearchSuccess(state, action: PayloadAction<SearchResult[]>) {
      state.loader = false;
      state.searchResults = action.payload;
      state.error = '';
    },
    getSearchFailure(state, action: PayloadAction<string>) {
      state.loader = false;
      state.error = action.payload;
    },
    /// SearchDetail after click on stock
    postSearchDetail(state, action) {
      state.isloader = true;
      state.isSearchDetailSuccess = '';
      state.isSearchDetailError = '';
    },
    postSearchDetailSuccess(state, action) {
      state.isloader = false;
      state.isSearchDetailSuccess = action.payload;
      state.isSearchDetailError = '';
    },
    postSearchDetailFailure(state, action) {
      state.isloader = false;
      state.isSearchDetailSuccess = '';
      state.isSearchDetailError = action.payload;
    },
  },
});

export const {
  setSearchText,
  getSearch,
  getSearchSuccess,
  getSearchFailure,
  postSearchDetail,
  postSearchDetailSuccess,
  postSearchDetailFailure,
} = SearchFieldSlice.actions;

export default SearchFieldSlice.reducer;
