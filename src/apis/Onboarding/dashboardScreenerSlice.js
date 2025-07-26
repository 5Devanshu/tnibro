import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loader: false,
  isdashboardScreenerError: '',
  isdashboardScreenerSuccess: [],
  isTableDataFailure: '',
  noTabClickData: false,
  isScreenerSaveData: [],
  currentState: [],
  currentPage: 1, // Track current page
  totalPages: 1, // Total number of pages
};
const dashboardScreenerSlice = createSlice({
  name: 'dashboardscreener',
  initialState,
  reducers: {
    dashboardScreener(state, action) {
      state.loader = true;
      state.isdashboardScreenerError = '';
      state.isdashboardScreenerSuccess = [];//''
      state.currentState = '';
      state.noTabClickData = false;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    dashboardScreenerSuccess(state, action) {
      const {payload} = action;
      state.loader = false;
      state.isdashboardScreenerError = '';
      state.isdashboardScreenerSuccess = action.payload?.data;
      state.totalPages = Math.ceil(action.payload?.data?.total_length / 20);
      state.isScreenerSaveData = action.payload?.data?.response;
      if (payload.data?.response.length == 0) {
        state.noTabClickData = true;
      }
      state.isLoginError = ''; 
    },
    dashboardScreenerFailure(state, action) {
      state.loader = false;
      state.isdashboardScreenerError = action?.payload;
      state.isdashboardScreenerSuccess = '';
      state.isTableDataFailure = action?.payload?.statusText;
    },
    sortData(state, action) {
      const {
        payload: {response, column, direction, screenerData},
      } = action;
      if (column === 'symbol') {
        let temp = [...response];
        if (direction === 'asc') {
          temp.sort(function (a, b) {
            if (a.symbol < b.symbol) {
              return -1;
            }
            if (a.symbol > b.symbol) {
              return 1;
            }
            return 0;
          });
        } else {
          temp.sort(function (a, b) {
            if (a.symbol < b.symbol) {
              return 1;
            }
            if (a.symbol > b.symbol) {
              return -1;
            }
            return 0;
          });
        }
        state.isdashboardScreenerSuccess = temp;
      } else if (column === 'All') {
        let temp = [...screenerData];
        if (direction === 'asc') {
          temp.sort((a, b) => {
            let date1 = new Date(a.recommended?.date);
            let date2 = new Date(b.recommended?.date);
            if (date1 < date2) {
              return -1;
            } else if (date1 > date2) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          temp.sort((a, b) => {
            let date1 = new Date(a.recommended?.date);
            let date2 = new Date(b.recommended?.date);
            if (date1 < date2) {
              return 1;
            } else if (date1 > date2) {
              return -1;
            } else {
              return 0;
            }
          });
        }
        state.isdashboardScreenerSuccess = temp;
      } else if (column === 'buy_date') {
        let temp = [...screenerData];
        const buypricesArray = temp.filter(item => item.recommended?.buyprice);
        if (direction === 'asc') {
          buypricesArray.sort((a, b) => {
            let date1 = new Date(a.recommended?.date);
            let date2 = new Date(b.recommended?.date);
            if (date1 < date2) {
              return -1;
            } else if (date1 > date2) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          buypricesArray.sort((a, b) => {
            let date1 = new Date(a.recommended?.date);
            let date2 = new Date(b.recommended?.date);
            if (date1 < date2) {
              return 1;
            } else if (date1 > date2) {
              return -1;
            } else {
              return 0;
            }
          });
        }
        state.isdashboardScreenerSuccess = buypricesArray;
      } else if (column === 'sell_date') {
        let temp = [...screenerData];
        const sellpricesArray = temp.filter(item => item.recommended?.sellprice);
        if (direction === 'asc') {
          sellpricesArray.sort((a, b) => {
            let date1 = new Date(a.recommended?.date);
            let date2 = new Date(b.recommended?.date);
            if (date1 < date2) {
              return -1;
            } else if (date1 > date2) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          sellpricesArray.sort((a, b) => {
            let date1 = new Date(a.recommended?.date);
            let date2 = new Date(b.recommended?.date);
            if (date1 < date2) {
              return 1;
            } else if (date1 > date2) {
              return -1;
            } else {
              return 0;
            }
          });
        }
        state.isdashboardScreenerSuccess = sellpricesArray;
      } else if (column === 'hi_low_gain_pct') {
        let temp = [...response];
        if (direction === 'asc') {
          temp.sort(function (a, b) {
            const num1 = parseFloat(a.recommended?.pct);
            const num2 = parseFloat(b.recommended?.pct);
            if (num1 < num2) {
              return -1;
            }
            if (num1 > num2) {
              return 1;
            }
            return 0;
          });
        } else {
          temp.sort(function (a, b) {
            const num1 = parseFloat(a.recommended?.pct);
            const num2 = parseFloat(b.recommended?.pct);
            if (num1 < num2) {
              return 1;
            }
            if (num1 > num2) {
              return -1;
            }
            return 0;
          });
        }
        state.isdashboardScreenerSuccess = temp;
      } else if (column === 'curr_price') {
        let temp = [...response];
        if (direction === 'asc') {
          temp.sort(function (a, b) {
            const num1 = parseFloat(a.close);
            const num2 = parseFloat(b.close);
            if (num1 < num2) {
              return -1;
            }
            if (num1 > num2) {
              return 1;
            }
            return 0;
          });
        } else {
          temp.sort(function (a, b) {
            const num1 = parseFloat(a.close);
            const num2 = parseFloat(b.close);
            if (num1 < num2) {
              return 1;
            }
            if (num1 > num2) {
              return -1;
            }
            return 0;
          });
        }
        state.isdashboardScreenerSuccess = temp;
      } else if (column === 'price_pct_change') {
        let temp = [...response];
        if (direction === 'asc') {
          temp.sort(function (a, b) {
            const num1 = parseFloat(a.pChange);
            const num2 = parseFloat(b.pChange);
            if (num1 < num2) {
              return -1;
            }
            if (num1 > num2) {
              return 1;
            }
            return 0;
          });
        } else {
          temp.sort(function (a, b) {
            const num1 = parseFloat(a.pChange);
            const num2 = parseFloat(b.pChange);
            if (num1 < num2) {
              return 1;
            }
            if (num1 > num2) {
              return -1;
            }
            return 0;
          });
        }
        state.isdashboardScreenerSuccess = temp;
      } else if (column === 'vol_pct') {
        let temp = [...response];
        if (direction === 'asc') {
          temp.sort(function (a, b) {
            const num1 = parseFloat(a.pvolumeChange);
            const num2 = parseFloat(b.pvolumeChange);
            if (num1 < num2) {
              return -1;
            }
            if (num1 > num2) {
              return 1;
            }
            return 0;
          });
        } else {
          temp.sort(function (a, b) {
            const num1 = parseFloat(a.pvolumeChange);
            const num2 = parseFloat(b.pvolumeChange);
            if (num1 < num2) {
              return 1;
            }
            if (num1 > num2) {
              return -1;
            }
            return 0;
          });
        }
        state.isdashboardScreenerSuccess = temp;
      } else if (column === 'seven_days_vol_total') {
        let temp = [...response];
        if (direction === 'asc') {
          temp.sort(function (a, b) {
            const num1 = parseFloat(JSON.parse(a.week_volume_compare)?.volume_pcnt);
            const num2 = parseFloat(JSON.parse(b.week_volume_compare)?.volume_pcnt);
            if (num1 < num2) {
              return -1;
            }
            if (num1 > num2) {
              return 1;
            }
            return 0;
          });
        } else {
          temp.sort(function (a, b) {
            const num1 = parseFloat(JSON.parse(a.week_volume_compare)?.volume_pcnt);
            const num2 = parseFloat(JSON.parse(b.week_volume_compare)?.volume_pcnt);
            if (num1 < num2) {
              return 1;
            }
            if (num1 > num2) {
              return -1;
            }
            return 0;
          });
        }
        state.isdashboardScreenerSuccess = temp;
      } else if (column === 'seven_days_avg_vol') {
        //10 days avg volume
        let temp = [...response];
        if (direction === 'asc') {
          temp.sort(function (a, b) {
            const num1 = parseFloat(a.ten_days_avg_pChange);
            const num2 = parseFloat(b.ten_days_avg_pChange);
            if (num1 < num2) {
              return -1;
            }
            if (num1 > num2) {
              return 1;
            }
            return 0;
          });
        } else {
          temp.sort(function (a, b) {
            const num1 = parseFloat(a.ten_days_avg_pChange);
            const num2 = parseFloat(b.ten_days_avg_pChange);
            if (num1 < num2) {
              return 1;
            }
            if (num1 > num2) {
              return -1;
            }
            return 0;
          });
        }
        state.isdashboardScreenerSuccess = temp;
      } else if (column === 'vol_greatest_open') {
        let temp = [...response];
        if (direction === 'asc') {
          temp.sort(function (a, b) {
            const num1 = a.volume_greatest; /// datatype is in number format
            const num2 = b.volume_greatest;
            if (num1 < num2) {
              return -1;
            }
            if (num1 > num2) {
              return 1;
            }
            return 0;
          });
        } else {
          temp.sort(function (a, b) {
            const num1 = a.volume_greatest;
            const num2 = b.volume_greatest;
            if (num1 < num2) {
              return 1;
            }
            if (num1 > num2) {
              return -1;
            }
            return 0;
          });
        }
        state.isdashboardScreenerSuccess = temp;
      } else if (column === 'open') {
        let temp = [...response];
        if (direction === 'asc') {
          temp.sort(function (a, b) {
            const num1 = a.open_gap_pcnt; ///open_gap_pcnt is in number format
            const num2 = b.open_gap_pcnt; ///number datatype
            if (num1 < num2) {
              return -1;
            }
            if (num1 > num2) {
              return 1;
            }
            return 0;
          });
        } else {
          temp.sort(function (a, b) {
            const num1 = a.open_gap_pcnt;
            const num2 = b.open_gap_pcnt;
            if (num1 < num2) {
              return 1;
            }
            if (num1 > num2) {
              return -1;
            }
            return 0;
          });
        }
        state.isdashboardScreenerSuccess = temp;
      } else if (column === 'high') {
        let temp = [...response];
        if (direction === 'asc') {
          temp.sort(function (a, b) {
            const num1 = parseFloat(a.high); //string format
            const num2 = parseFloat(b.high);
            if (num1 < num2) {
              return -1;
            }
            if (num1 > num2) {
              return 1;
            }
            return 0;
          });
        } else {
          temp.sort(function (a, b) {
            const num1 = parseFloat(a.high);
            const num2 = parseFloat(b.high);
            if (num1 < num2) {
              return 1;
            }
            if (num1 > num2) {
              return -1;
            }
            return 0;
          });
        }
        state.isdashboardScreenerSuccess = temp;
      } else if (column === 'low') {
        let temp = [...response];
        if (direction === 'asc') {
          temp.sort(function (a, b) {
            const num1 = parseFloat(a.low);
            const num2 = parseFloat(b.low);
            if (num1 < num2) {
              return -1;
            }
            if (num1 > num2) {
              return 1;
            }
            return 0;
          });
        } else {
          temp.sort(function (a, b) {
            const num1 = parseFloat(a.low);
            const num2 = parseFloat(b.low);
            if (num1 < num2) {
              return 1;
            }
            if (num1 > num2) {
              return -1;
            }
            return 0;
          });
        }
        state.isdashboardScreenerSuccess = temp;
      } else if (column === 'close') {
        let temp = [...response];
        if (direction === 'asc') {
          temp.sort(function (a, b) {
            const num1 = parseFloat(a.close);
            const num2 = parseFloat(b.close);
            if (num1 < num2) {
              return -1;
            }
            if (num1 > num2) {
              return 1;
            }
            return 0;
          });
        } else {
          temp.sort(function (a, b) {
            const num1 = parseFloat(a.close);
            const num2 = parseFloat(b.close);
            if (num1 < num2) {
              return 1;
            }
            if (num1 > num2) {
              return -1;
            }
            return 0;
          });
        }
        state.isdashboardScreenerSuccess = temp;
      } else if (column === 'fiftytwo_week_high') {
        let temp = [...response];
        if (direction === 'asc') {
          temp.sort(function (a, b) {
            const num1 = parseFloat(JSON.parse(a.year_high)?.year_high_gap_pcnt);
            const num2 = parseFloat(JSON.parse(b.year_high)?.year_high_gap_pcnt);
            if (num1 < num2) {
              return -1;
            }
            if (num1 > num2) {
              return 1;
            }
            return 0;
          });
        } else {
          temp.sort(function (a, b) {
            const num1 = parseFloat(JSON.parse(a.year_high)?.year_high_gap_pcnt);
            const num2 = parseFloat(JSON.parse(b.year_high)?.year_high_gap_pcnt);
            if (num1 < num2) {
              return 1;
            }
            if (num1 > num2) {
              return -1;
            }
            return 0;
          });
        }
        state.isdashboardScreenerSuccess = temp;
      } else if (column === 'fiftytwo_week_low') {
        let temp = [...response];
        if (direction === 'asc') {
          temp.sort(function (a, b) {
            const num1 = parseFloat(JSON.parse(a.year_low)?.year_low_gap_pcnt);
            const num2 = parseFloat(JSON.parse(b.year_low)?.year_low_gap_pcnt);
            if (num1 < num2) {
              return -1;
            }
            if (num1 > num2) {
              return 1;
            }
            return 0;
          });
        } else {
          temp.sort(function (a, b) {
            const num1 = parseFloat(JSON.parse(a.year_low)?.year_low_gap_pcnt);
            const num2 = parseFloat(JSON.parse(b.year_low)?.year_low_gap_pcnt);
            if (num1 < num2) {
              return 1;
            }
            if (num1 > num2) {
              return -1;
            }
            return 0;
          });
        }
        state.isdashboardScreenerSuccess = temp;
      }
    },
    filterData(state, action) {
      const {
        payload: {
          response,
          pattern: {prev_pattern, curr_pattern},
        },
      } = action;
      // let newFilterData;
      // if (pattern === 'all') {
      //   newFilterData = response;
      // } else if (type === 'prev_candlestick') {
      //   newFilterData = response.filter(item => item.previous_pattern === pattern);
      // } else if (type === 'curr_candlestick') {
      //   newFilterData = response.filter(item => item.pattern === pattern);
      // }

      // NEW CODE STARTS HERE
      const newFilterData = response.filter(item => {
        return (
          (item.previous_pattern === prev_pattern ||
            prev_pattern === 'all' ||
            prev_pattern === '' ||
            !prev_pattern) &&
          (item.pattern === curr_pattern ||
            curr_pattern === 'all' ||
            curr_pattern === '' ||
            !curr_pattern)
        );
      });
      state.isdashboardScreenerSuccess = newFilterData;
    },
  },
});
export const {
  dashboardScreener,
  dashboardScreenerSuccess,
  dashboardScreenerFailure,
  sortData,
  filterData,
  setCurrentPage,
} = dashboardScreenerSlice.actions;

export default dashboardScreenerSlice.reducer;
