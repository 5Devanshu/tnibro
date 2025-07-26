import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Table } from 'react-native-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { getAlert } from '../../../apis/Onboarding/authenticationSlice';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PriceAlertPopup from '../../../Components/PriceAlertModal';
import { COLORS } from '../../../Constants/enums/colorsEnum';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import { CONSTANT_TEXT } from '../../../Constants/enums/constantText';
import DropDownElement from '../DropDownElement';
import { FixedValue } from '../../../Constants/enums/numberEnum';
import {
  candlestick_patterns_arr,
  operatorsArray,
  tableHeaderWatchlist,
  stockTableWatchlist,
  formatDate,
  formatDate_InNumber,
  SuggestiondataWatchlist,
} from './utils';
import { setSelectedFilters } from '../../../apis/Onboarding/selectedFiltersSlice';
import WatchlistPopup from '../../../Components/WatchlistModal/WatchlistModal';
import { normalizeFont, scaleHeight, scaleWidth } from '../../../Constants/enums/Dimensions';
import { useIsFocused } from '@react-navigation/native';
import styles from './watchlistStyles';
import Popover from 'react-native-popover-view';
import { addCommaToCurrency } from '../../../utils/digitCommaSeparator';
import { navigation } from '../../../Navigation/NavigationService';

interface TableComponentProps {
  isdashboardScreenerSuccess: any;
  isScreenerSaveData: any;
  watchlist_id: any;
  getWatchListTable: any;
}

const WatchTableComponent: React.FC<TableComponentProps> = ({
  isdashboardScreenerSuccess,
  isScreenerSaveData,
  watchlist_id,
  getWatchListTable
}) => {
  const leftRef = useRef<ScrollView>(null);
  const rightRef = useRef<ScrollView>(null);
  const [stocksDict, setStocksDict] = useState<any>([]);
  const [sorteeCol, setSorteeCol] = useState<any>('');
  const [rowsPerPage, setRowsPerPage] = useState<any>(8);
  const [sortDirection, setSortDirection] = useState<any>('asc');
  const [showPriceDialog, setShowPriceDialog] = useState<boolean>(false);
  const [activeSymbol, setActiveSymbol] = useState<string>('');
  const [symbolId, setSymbolId] = useState<number>();
  const [defaultData, setDefaultData] = useState<any>(null);
  const [activePrice, setActivePrice] = useState<any>('');
  const authenticationData = useSelector((state: any) => state.authentication);
  const { isGetAlertSuccess, isdeleteAlertSuccess } = authenticationData;
  const [isClicked, setisClicked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(candlestick_patterns_arr);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPrevClicked, setisPrevClicked] = useState(false);
  const [isprevPatternModal, setIsPrevPatternModal] = useState(false);
  const [isPrevData, setPrevData] = useState(candlestick_patterns_arr);
  const [patternFilteredData, setPatternFilteredData] = useState(isPrevData);
  const [prevSearchTerm, setPrevSearchTerm] = useState('');
  const [showWatchlist, setShowWatchlist] = useState<boolean>(false);
  const [symbol_name, setSymbol_name] = useState<number>();
  const [showContent, setShowContent] = useState<boolean>();
  const [tableStocksData, setTableStockeData] = useState(isdashboardScreenerSuccess);
  const [activePage, setActivePage] = useState<any>(1);
  const [stockTableData, setStockTableData] = useState<any>([]);
  const [paginationFaceSet, setPaginationFaceSet] = useState<any>([]);
  const [paginationSet, setPaginationSet] = useState<any>([]);
  const [assetList, setAssetList] = useState<any>([]);
  const [assetDict, setAssetDict] = useState<any>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    setTableStockeData(isdashboardScreenerSuccess);
  }, [isdashboardScreenerSuccess]);

  useEffect(() => {
    const fetchSelectedFilters = async () => {
      try {
        const storedFilters = await AsyncStorage.getItem('selected_Filters');
        if (storedFilters) {
          setSelectedFilters(JSON.parse(storedFilters));
        }
      } catch (error) { }
    };

    fetchSelectedFilters();
  }, []);
  const selectedFilters = useSelector((state: any) => state.selectedFilters);

  const {
    previous_pattern,
    current_pattern,
    close_open_pct_operator,
    close_open_pct_value,
    fiftytwo_weeks_high_operator,
    fiftytwo_weeks_high_value,
    fiftytwo_weeks_low_operator,
    fiftytwo_weeks_low_value,
    recommendation_filter,
  } = selectedFilters;

  useEffect(() => {
    storeSelectedFilters();
  }, [selectedFilters]);

  const storeSelectedFilters = async () => {
    try {
      await AsyncStorage.setItem('selected_Filters', JSON.stringify(selectedFilters));
    } catch (error) { }
  };

  function calcOperatorValues(value1, optr, value2) {
    switch (optr) {
      case 'gt':
        return value1 > value2;
      case 'lt':
        return value1 < value2;
      case 'gte':
        return value1 >= value2;
      case 'lte':
        return value1 <= value2;
      case 'eq':
        return value1 === value2;
      default:
        return true;
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (isdeleteAlertSuccess === 'alert successfully deleted') {
      updateAlerts();
      setDefaultData(null);
    }
  }, [isdeleteAlertSuccess]);

  useEffect(() => {
    if (isdashboardScreenerSuccess && isdashboardScreenerSuccess.length > 0) {
      formatTableData();
      let paginationArr = [];
      let i = 1;
      let totalPages = isdashboardScreenerSuccess.length / rowsPerPage;
      while (i <= totalPages) {
        paginationArr.push(i);
        i++;
      }
      setPaginationSet(paginationArr);
      setPaginationFaceSet(paginationArr.slice(0, 5));
    }
  }, [isdashboardScreenerSuccess]);

  const formatTableData = () => {
    try {
      setActivePage(1);
      const headers = [
        'recommended',
        'recommended',
        'close',
        'pChange',
        'pvolumeChange',
        'week_volume_compare',
        'week_volume_compare',
        'volume_greatest',
        'previous_pattern',
        'pattern',
        'open',
        'high',
        'low',
        'close',
        'year_high',
        'year_low',
      ];

      const tableData = [];

      const recordData = isdashboardScreenerSuccess.map((item: any) => {
        return [item.symbol];
      });
      setAssetDict(recordData);
      setAssetList(recordData.slice(0, rowsPerPage));

      for (let i = 0; i < isdashboardScreenerSuccess.length; i++) {
        let testArr = [];
        for (let j = 0; j < headers.length; j++) {
          if (j === 0) {
            if (
              isdashboardScreenerSuccess[i]?.recommended?.buyprice &&
              isdashboardScreenerSuccess[i]?.recommended?.buyprice
            ) {
              testArr.push(isdashboardScreenerSuccess[i][headers[j]].date);
            } else {
              testArr.push('--');
            }
          } else if (j === 1) {
            if (
              isdashboardScreenerSuccess[i]?.recommended?.sellprice &&
              isdashboardScreenerSuccess[i]?.recommended?.sellprice
            ) {
              testArr.push(isdashboardScreenerSuccess[i][headers[j]].date);
            } else {
              testArr.push('--');
            }
          } else if (j === 2) {
            testArr.push(isdashboardScreenerSuccess[i][headers[j]]?.pct);
          } else if (j === 6) {

          } else if (j === 7) {

          } else if (j === 9 || j === 10) {

          } else if (j === 14) {

          } else if (j === 15) {
            let temp = JSON.parse(isdashboardScreenerSuccess[i][headers[j]]);
            testArr.push(temp?.year_low || '--');
          } else {
            testArr.push(isdashboardScreenerSuccess[i][headers[j]]);
          }
        }
        tableData.push(testArr);
      }
      setStocksDict(tableData);
      setStockTableData(tableData.slice(0, rowsPerPage));
    } catch (error) {
    }
  };

  const handleSortColumn = (data: string) => {
    if (!['prev_candlestick', 'curr_candlestick'].includes(data)) {
      setSorteeCol(data);
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortDirection('asc');
      }
      sortData(isdashboardScreenerSuccess, data, sortDirection, isScreenerSaveData);
    }
  };
  const sortData = (response, column, direction, screenerData) => {
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
      setTableStockeData(temp);
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
      setTableStockeData(temp);
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
      setTableStockeData(buypricesArray);
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
      setTableStockeData(sellpricesArray);
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
      setTableStockeData(temp);
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
      setTableStockeData(temp);
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
      setTableStockeData(temp);
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
      setTableStockeData(temp);
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
      setTableStockeData(temp);
    } else if (column === 'seven_days_avg_vol') {
      //10 days avg volume
      let temp = [...response];
      if (direction === 'asc') {
        temp.sort(function (a, b) {
          const num1 = parseFloat(a.ten_days_avg_pChange); //string data type
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
      setTableStockeData(temp);
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
      setTableStockeData(temp);
    } else if (column === 'open') {
      let temp = [...response];
      if (direction === 'asc') {
        temp.sort(function (a, b) {
          const num1 = parseFloat(a.open);
          const num2 = parseFloat(b.open);
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
          const num1 = parseFloat(a.open);
          const num2 = parseFloat(b.open);
          if (num1 < num2) {
            return 1;
          }
          if (num1 > num2) {
            return -1;
          }
          return 0;
        });
      }
      setTableStockeData(temp);
    } else if (column === 'high') {
      let temp = [...response];
      if (direction === 'asc') {
        temp.sort(function (a, b) {
          const num1 = parseFloat(a.high);
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
      setTableStockeData(temp);
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
      setTableStockeData(temp);
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
      setTableStockeData(temp);
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
      setTableStockeData(temp);
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
      setTableStockeData(temp);
    }
  };

  const handleAlertSubscribe = async (data: any, symbol_id: number) => {
    const temp = isdashboardScreenerSuccess?.findIndex((item: any) => item?.symbol === data);
    await setActivePrice(isdashboardScreenerSuccess[temp]?.CMP);
    setActiveSymbol(data);
    setSymbolId(symbol_id);
    setShowPriceDialog(true);
  };
  const handleonChange = (txt, value_type) => {
    dispatch(
      setSelectedFilters({
        value: txt,
        filter_type: value_type,
      }),
    );
  };
  const Getdropdown = ({
    oper_type,
    oper_value,
    value_type,
    input_value,
  }: {
    oper_type: string;
    oper_value: string;
    value_type: string;
    input_value: string;
  }) => {
    return (
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
        }}>
        <View style={{ width: '40%', backgroundColor: 'white' }}>
          <DropDownElement
            data={operatorsArray}
            value={oper_value}
            onSelect={value => handleFilterData(value.value, oper_type)}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <>
            <TextInput
              style={{
                fontSize: 10,
                color: 'black',
                textAlignVertical: 'top',
              }}
              placeholderTextColor="black"
              value={input_value}
              onChangeText={txt => handleonChange(txt, value_type)}
              maxLength={4}
            />
          </>
          <>
            <TouchableOpacity onPress={() => incrementCounter(value_type, input_value)}>
              <Image source={IMAGES.increment} style={{ height: 20, width: 20, marginLeft: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => decrementCounter(value_type, input_value)}
              style={{ marginLeft: 3 }}>
              <Image source={IMAGES.decrement} style={{ height: 20, width: 20 }} />
            </TouchableOpacity>
          </>
        </View>
      </View>
    );
  };

  const handleFilterData = (value: string, oper_type: string) => {
    dispatch(
      setSelectedFilters({
        value: value,
        filter_type: oper_type,
      }),
    );
  };
  const handleFilterColumn = (value: string, pattern_value: string) => {
    setIsPrevPatternModal(false);
    setisClicked(false);
    setisPrevClicked(false);
    setModalVisible(false);
    setFilteredData(data);
    setPatternFilteredData(isPrevData);
    setSearchTerm('');
    setPrevSearchTerm('');

    dispatch(
      setSelectedFilters({
        value: value,
        filter_type: pattern_value,
      }),
    );
  };
  let filteredTableFeed =
    tableStocksData &&
    tableStocksData?.filter(item => {
      const closeOpenPct_Toggle = calcOperatorValues(
        item?.open_gap_pcnt,
        close_open_pct_operator,
        close_open_pct_value,
      );
      const fiftyTwoWeeksHighPcnt = JSON.parse(item?.year_high)?.year_high_gap_pcnt;
      const fiftyTwoWeeksHighToggle = calcOperatorValues(
        fiftyTwoWeeksHighPcnt,
        fiftytwo_weeks_high_operator,
        fiftytwo_weeks_high_value,
      );
      const fiftyTwoWeeksLowPcnt = JSON.parse(item?.year_low)?.year_low_gap_pcnt;
      const fiftyTwoWeeksLowToggle = calcOperatorValues(
        fiftyTwoWeeksLowPcnt,
        fiftytwo_weeks_low_operator,
        fiftytwo_weeks_low_value,
      );
      const date_toggle =
        recommendation_filter === 'All'
          ? true
          : item.recommended?.recommendation === recommendation_filter;
      return (
        (item?.previous_pattern === previous_pattern ||
          !previous_pattern ||
          previous_pattern === 'all') &&
        (item.pattern === current_pattern || !current_pattern || current_pattern === 'all') &&
        closeOpenPct_Toggle &&
        fiftyTwoWeeksHighToggle &&
        fiftyTwoWeeksLowToggle &&
        date_toggle
      );
    });
  const symblolColumn =
    filteredTableFeed &&
    filteredTableFeed?.map(colData => {
      return {
        symbol: colData?.symbol,
        symbol_id: colData?.symbol_id,
        added_in_watchlist: colData?.added_in_watchlist,
      };
    });

  const updateWatchlist = symbol => {
    setTableStockeData(prevState => {
      return prevState.map(item => {
        if (item.symbol === symbol) {
          return {
            ...item,
            added_in_watchlist: true,
          };
        }
        return item;
      });
    });
  };
  const updateWatchlistRemove = symbol => {
    setTableStockeData(prevState => {
      return prevState.map(item => {
        if (item.symbol === symbol) {
          return {
            ...item,
            added_in_watchlist: false,
          };
        }
        return item;
      });
    });
  };

  const getCellContent = (rowIndex: number, rowData: any, item: string) => {
    if (rowIndex === 0) {
      return (
        <>
          {rowData[item]?.buyprice && rowData[item]?.buyprice ? (
            <>
              <Text
                allowFontScaling={false}
                style={[styles.text, { textAlign: 'right', color: COLORS.Binance_green }]}>
                Green Signal
              </Text>
              <Text
                allowFontScaling={false}
                style={[styles.text, { textAlign: 'right', color: COLORS.Binance_green }]}>
                {addCommaToCurrency(rowData[item]?.buyprice) || '---'}
              </Text>
              {/* <Text allowFontScaling={false} style={[styles.text, { textAlign: 'right' }]}>
                Stop Loss:{rowData[item]?.stoploss}
              </Text> */}
              <Text allowFontScaling={false} style={[styles.text, { textAlign: 'right' }]}>
                {formatDate_InNumber(rowData[item]?.date)}
              </Text>
            </>
          ) : (
            <>
              {rowData[item]?.sellprice && rowData[item]?.sellprice ? (
                <>
                  <Text
                    allowFontScaling={false}
                    style={[styles.text, { textAlign: 'right', color: COLORS.Binance_red }]}>
                    Red Alert
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[styles.text, { textAlign: 'right', color: COLORS.Binance_red }]}>
                    {addCommaToCurrency(rowData[item]?.sellprice) || '---'}
                  </Text>
                  <Text allowFontScaling={false} style={[styles.text, { textAlign: 'right' }]}>
                    {formatDate_InNumber(rowData[item]?.date)}
                  </Text>
                </>
              ) : null}
            </>
          )}
        </>
      );
    } else if (rowIndex === 1) {
      return (
        <>
          <Text
            allowFontScaling={false}
            style={[styles.text, { textAlign: 'right', color: COLORS.Black }]}>
            {rowData[item]?.high
              ? addCommaToCurrency(rowData[item]?.high)
              : '-' || rowData[item]?.low
                ? addCommaToCurrency(rowData[item]?.low)
                : '-'}
          </Text>
          {rowData[item]?.buyprice && <Text allowFontScaling={false} style={[styles.text, { textAlign: 'right', padding: 2, fontWeight: '600' }]}>
            SL: {addCommaToCurrency(rowData[item]?.stoploss)}
          </Text>}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Image
              source={rowData[item]?.color === 'red' ? IMAGES.Down_Arrow : IMAGES.Up_Arrow}
              style={[styles.ArrowIcon, { tintColor: rowData[item]?.color, marginTop: 3 }]}
            />
            <Text
              allowFontScaling={false}
              style={[
                styles.text,
                { textAlign: 'right', color: COLORS.Binance_green, fontWeight: 'bold' },
              ]}>
              {rowData[item]?.pct || '-'}
            </Text>
          </View>
        </>
      );
    } else if (rowIndex === 3) {
      return (
        <>
          <Text
            allowFontScaling={false}
            style={[
              styles.text,
              {
                textAlign: [9, 10].includes(rowIndex) ? 'left' : 'center',
                color: rowData?.pChange >= 0 ? COLORS.Binance_green : COLORS.Binance_red,
              },
            ]}>
            {rowData?.pChange || '---'}
            {rowData?.pChange && '%'}
          </Text>
        </>
      );
    } else if (rowIndex === 4) {
      return (
        <>
          <Text allowFontScaling={false} style={[styles.text]}>
            {rowData?.volume}
          </Text>
          <Text
            allowFontScaling={false}
            style={[
              styles.text,
              {
                textAlign: [9, 10].includes(rowIndex) ? 'left' : 'center',
                color: rowData?.pvolumeChange >= 0 ? COLORS.Binance_green : COLORS.Binance_red,
              },
            ]}>
            {parseFloat(rowData?.pvolumeChange) || '---'}
            {rowData?.pvolumeChange && '%'}
          </Text>
        </>
      );
    } else if (rowIndex === 5) {
      let volObject = JSON.parse(rowData[item]);
      return (
        <>
          <Text allowFontScaling={false} style={[styles.text]}>
            {volObject?.volume}
          </Text>
          <Text
            allowFontScaling={false}
            style={[
              styles.text,
              {
                textAlign: [9, 10].includes(rowIndex) ? 'left' : 'center',
                color: volObject?.volume_pcnt >= 0 ? COLORS.Binance_green : COLORS.Binance_red,
              },
            ]}>
            {volObject?.volume_pcnt?.toString() || '---'}
            {volObject?.volume_pcnt && '%'}
          </Text>
        </>
      );
    } else if (rowIndex === 6) {
      let volObject = JSON.parse(rowData[item]);
      return (
        <>
          <Text allowFontScaling={false} style={[styles.text]}>
            {rowData?.ten_days_avgVolume}
          </Text>
          <Text
            allowFontScaling={false}
            style={[
              styles.text,
              {
                textAlign: [9, 10].includes(rowIndex) ? 'left' : 'center',
                color:
                  rowData?.ten_days_avg_pChange >= 0 ? COLORS.Binance_green : COLORS.Binance_red,
              },
            ]}>
            {rowData?.ten_days_avg_pChange || CONSTANT_TEXT.BLANK_FIELD}
            {rowData?.ten_days_avg_pChange && '%'}
          </Text>
        </>
      );
    } else if (rowIndex === 7) {
      return (
        <>
          <Text
            allowFontScaling={false}
            style={[styles.text, { textAlign: [9, 10].includes(rowIndex) ? 'left' : 'center' }]}>
            {rowData?.volume_greatest}
            {rowData?.volume_greatest > 0 ? CONSTANT_TEXT.DAYS_AGO : CONSTANT_TEXT.DAY_AGO}
          </Text>
        </>
      );
    } else if (rowIndex === 10) {
      return (
        <>
          <Text allowFontScaling={false} style={[styles.text]}>
            {addCommaToCurrency(rowData?.open)}
          </Text>
        </>
      );
    } else if (rowIndex === 14) {
      let temp = JSON.parse(rowData[item]);
      return (
        <>
          <Text
            allowFontScaling={false}
            style={[styles.text, { textAlign: [9, 10].includes(rowIndex) ? 'left' : 'center' }]}>
            {addCommaToCurrency(temp?.year_high) || CONSTANT_TEXT.BLANK_FIELD}
          </Text>
          <Text allowFontScaling={false} style={[styles.text]}>
            {temp?.year_high_gap_pcnt || CONSTANT_TEXT.BLANK_FIELD}
            {temp?.year_high_gap_pcnt > 0 && '%'}
          </Text>
          <Text allowFontScaling={false} style={[styles.text]}>
            {temp?.year_high_day_ago}
            {temp?.year_high_day_ago >= 0 ? CONSTANT_TEXT.DAYS_AGO : CONSTANT_TEXT.BLANK_FIELD}
          </Text>
        </>
      );
    } else if (rowIndex === 15) {
      let temp = JSON.parse(rowData[item]);
      return (
        <>
          <Text
            allowFontScaling={false}
            style={[styles.text, { textAlign: [9, 10].includes(rowIndex) ? 'left' : 'center' }]}>
            {addCommaToCurrency(temp?.year_low) || '---'}
          </Text>
          <Text allowFontScaling={false} style={[styles.text]}>
            {temp?.year_low_gap_pcnt || CONSTANT_TEXT.BLANK_FIELD}
            {temp?.year_low_gap_pcnt && '%'}
          </Text>
          <Text allowFontScaling={false} style={[styles.text]}>
            {temp?.year_low_day_ago}
            {temp?.year_low_day_ago >= 0 ? CONSTANT_TEXT.DAYS_AGO : CONSTANT_TEXT.BLANK_FIELD}
          </Text>
        </>
      );
    } else {
      return (
        <Text
          allowFontScaling={false}
          style={[styles.text, { textAlign: [8, 9].includes(rowIndex) ? 'center' : 'center' }]}>
          {rowData[item]}
        </Text>
      );
    }
  };

  const onCancelAlert = () => {
    setShowPriceDialog(false);
  };

   const onDoneAlert = () => {
    getWatchListTable()
  };

  const updateAlerts = async () => {
    const userid = await AsyncStorage.getItem('userId');
    if (userid) {
      dispatch(getAlert({ userid: userid }));
    }
  };

  useEffect(() => {
    if (isFocused) {
      AsyncStorage.getItem('userId').then(userid => {
        dispatch(getAlert({ userid }));
      });
    }
  }, [isFocused, getAlert]);

  const isAlerted = (symbol_id: number) => {
    const alertIndex = isGetAlertSuccess.findIndex((item: any) => item.symbol_id === symbol_id);
    if (alertIndex > -1) {
      return true;
    }
    return false;
  };
  const openModal = () => {
    setisClicked(!isClicked);
    setModalVisible(true);
  };
  const openPrev_Pattern_Modal = () => {
    setisPrevClicked(!isPrevClicked);
    setIsPrevPatternModal(true);
  };
  const ItemComponent = (props: any) => {
    //current pattern dropdown ui
    const { item, index, pattern_value } = props;
    return (
      <View>
        <TouchableOpacity
          style={[styles.ItemContainer, { backgroundColor: item.id % 2 === 0 ? '#fff' : '#f5f5f5' }]}
          onPress={value => {
            handleFilterColumn(item.value, pattern_value);
          }}>
          <Text allowFontScaling={false} style={{ color: 'black' }}>
            {item.label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const RenderComponent = (props: any) => {
    /// previoues candlestick pattern
    const { item, pattern_value } = props;
    return (
      <View>
        <TouchableOpacity
          style={[styles.ItemContainer, { backgroundColor: item.id % 2 === 0 ? '#fff' : '#f5f5f5' }]}
          onPress={value => {
            handleFilterColumn(item.value, pattern_value);
          }}>
          <Text allowFontScaling={false} style={{ color: 'black' }}>
            {item.label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  useEffect(() => {
    //use for searching in currentcandlestick pattern
    if (searchTerm === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item =>
        item.label.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );
      setFilteredData(filtered);
    }
  }, [data, searchTerm]);

  useEffect(() => {
    ///// use for searching in previous candlestick pattrn
    if (prevSearchTerm === '') {
      setPatternFilteredData(isPrevData);
    } else {
      const filtered = data.filter(item =>
        item.label.toLocaleLowerCase().includes(prevSearchTerm.toLocaleLowerCase()),
      );
      setPatternFilteredData(filtered);
    }
  }, [isPrevData, prevSearchTerm]);

  const handleSearch = text => {
    setSearchTerm(text);
  };
  const prev_pattern_Search = text => {
    setPrevSearchTerm(text);
  };
  const decrementCounter = (value_type, input_value) => {
    const newValue = parseInt(input_value) - 1;
    dispatch(
      setSelectedFilters({
        value: newValue.toString(),
        filter_type: value_type,
      }),
    );
  };
  const incrementCounter = (value_type, input_value) => {
    const newValue = parseInt(input_value) + 1;
    dispatch(
      setSelectedFilters({
        value: newValue.toString(),
        filter_type: value_type,
      }),
    );
  };

  const handleWatchlistBox = async (
    symbol: any,
    symbol_id: number,
    added_in_watchlist: boolean,
  ) => {
    setSymbol_name(symbol);
    setShowWatchlist(true);
    setShowContent(added_in_watchlist); // use to show he remove from watchlist
  };
  const onCancleWatchlist = () => {
    setShowWatchlist(false);
  };
  return (
    <View style={styles.container}>
      {/* Left Column */}
      {showPriceDialog ? ( // open modal when we click on bell icon
        <PriceAlertPopup
          isVisible={showPriceDialog} //// show modal
          onCancel={onCancelAlert}
          symbol={activeSymbol} //send symbol
          defaultPrice={activePrice} //send cmp current market price
          defaultData={defaultData}
          symbolId={symbolId} // send symbol id
          onDoneAlert={onDoneAlert}
        />
      ) : null}

      {0 == 1 ? (
        <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          overlayColor="red"
        />
      ) : (
        <>
          <View style={styles.tableContainer}>
            <View style={styles.leftCol}>
              <TouchableWithoutFeedback onPress={() => handleSortColumn('symbol')}>
                <View style={styles.blankCell}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: '#4A5568',
                      fontSize: normalizeFont(12),
                    }}>
                    Symbol
                  </Text>
                  <Image
                    resizeMode="contain"
                    style={[styles.sortIcon]}
                    source={
                      sortDirection === 'asc' && sorteeCol === 'symbol'
                        ? IMAGES.Sorting_Down
                        : IMAGES.Sorting_Up
                    }
                  />
                </View>
              </TouchableWithoutFeedback>
              {/* Left Container : scroll synced */}
              <ScrollView
                ref={leftRef}
                style={styles.mainScroll}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}>
                {isdashboardScreenerSuccess && isdashboardScreenerSuccess.length === 0 ? (
                  <View style={{ width: '100%', alignItems: 'center', }}>
                    <Image source={IMAGES.noRecord2} style={{ resizeMode: 'contain', height: 50, width: 50, alignSelf: 'center' }} />
                    <Text style={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: '#000',
                      marginTop: 10,
                    }}>No Records Found.</Text>
                  </View>
                ) : (
                  <Table>
                    {symblolColumn &&
                      symblolColumn.map(
                        (
                          {
                            symbol,
                            symbol_id,
                            added_in_watchlist,
                          }: { symbol: string; symbol_id: number; added_in_watchlist: boolean },
                          index: number,
                        ) => (
                          <View
                            key={index}
                            style={[
                              styles.rowbox,
                            ]}>
                            <View
                              style={[
                                styles.cell,
                                {
                                  width: '100%',
                                  position: 'relative',
                                  flexDirection: 'row',
                                },
                              ]}>
                              <TouchableOpacity disabled>
                                <Text onPress={() => {
                                  navigation('SearchDetailScreen', {
                                    symbol: symbol,
                                    segment: 'cash',
                                  });
                                }}
                                  allowFontScaling={false}
                                  style={[
                                    styles.text,
                                    {
                                      marginTop: 8,
                                      fontWeight: '600',
                                      paddingHorizontal: 25,
                                    },
                                  ]}>
                                  {symbol}
                                </Text>
                              </TouchableOpacity>
                              <View
                                style={{
                                  position: 'absolute',
                                  top: 30,
                                  width: '100%',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                {/* <TouchableWithoutFeedback
                                  onPress={() => handleWebViewLink(symbol)}>
                                  <Image
                                    style={[styles.alertIcon]}
                                    source={IMAGES.Chart_icon}
                                  />
                                </TouchableWithoutFeedback> */}
                                {isAlerted(symbol_id) ? (
                                  <TouchableOpacity style={{ marginLeft: 3, width: '45%', borderRadius: 12.5, flexDirection: 'row', backgroundColor: '#f5f5f5' }}
                                    onPress={() => handleAlertSubscribe(symbol, symbol_id)}>
                                    <Image
                                      style={styles.alertIcon}
                                      source={IMAGES.Bell_Ring}
                                    />
                                    <Text style={{ marginLeft: 2, fontSize: 7, color: '#0F0F0F', alignItems: 'center', alignSelf: 'center' }}>ALERT</Text>
                                  </TouchableOpacity>
                                ) : (
                                  <TouchableOpacity style={{ marginLeft: 3, width: '45%', borderRadius: 12.5, flexDirection: 'row', backgroundColor: '#f5f5f5' }}
                                    onPress={() => handleAlertSubscribe(symbol, symbol_id)}>
                                    <Image
                                      style={styles.alertIcon}
                                      source={IMAGES.Bell}
                                    />
                                    <Text style={{ marginLeft: 2, fontSize: 7, color: '#0F0F0F', alignItems: 'center', alignSelf: 'center' }}>ALERT</Text>
                                  </TouchableOpacity>
                                )}
                                {/* {added_in_watchlist ? ( 
                                  <TouchableWithoutFeedback
                                    onPress={() => {
                                      handleWatchlistBox(symbol, symbol_id, added_in_watchlist);
                                    }}>
                                    <Image
                                      style={[styles.alertIcon]}
                                      source={IMAGES.Save_Icon}
                                    />
                                  </TouchableWithoutFeedback>
                                ) : (
                                  <TouchableWithoutFeedback
                                    onPress={() => {
                                      handleWatchlistBox(symbol, symbol_id, added_in_watchlist);
                                    }}>
                                    <Image
                                      style={styles.alertIcon}
                                      source={IMAGES.unsaveicon}
                                    />
                                  </TouchableWithoutFeedback>
                                )} */}

                                <TouchableOpacity style={{ width: '50%', borderRadius: 12.5, flexDirection: 'row', marginRight: 3, backgroundColor: '#f5f5f5' }}
                                  onPress={() => handleWatchlistBox(symbol, symbol_id, added_in_watchlist)}>
                                  <Image
                                    style={styles.alertIcon}
                                    source={IMAGES.Save_Icon}
                                  />
                                  <Text style={{ marginLeft: 1, fontSize: 7, color: '#0F0F0F', alignItems: 'center', alignSelf: 'center' }}>REMOVE</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        ),
                      )}
                  </Table>
                )}
              </ScrollView>
            </View>
            {/* Right Column */}
            <View style={styles.rightCol}>
              <ScrollView horizontal={true} bounces={false}>
                {stocksDict.length > 0 ? (
                  <View>
                    {/* Right Column Tabs -> sell/buy */}
                    <ScrollView horizontal>
                      {stockTableWatchlist.tableHead.map((item, index) => (
                        <TouchableWithoutFeedback
                          key={`stock${index}`}
                          onPress={() => handleSortColumn(item.col)}>
                          <View
                            style={[
                              styles.head,
                              styles.tableHeader,
                              {
                                width: stockTableWatchlist.widthArr[index],
                                backgroundColor: '#F0F0F0',
                              },
                            ]}>
                            <View style={{ flexDirection: 'column' }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '100%',
                                  justifyContent: 'center',
                                }}>
                                <Text allowFontScaling={false} style={[styles.headertxt]}>
                                  {item?.label}
                                </Text>

                                {index == 14 && (
                                  <Popover from={<TouchableOpacity style={{ marginTop: 15 }}>
                                    <Image
                                      source={item.icon}
                                      style={{ height: 18, width: 15, marginHorizontal: 3, resizeMode: 'contain' }}
                                    />
                                  </TouchableOpacity>} popoverStyle={style.popUpStyle}><Text style={style.interText}>{SuggestiondataWatchlist[index]?.address}</Text></Popover>
                                )}
                                {index == 15 && (
                                  <Popover from={<TouchableOpacity style={{ marginTop: 15 }}>
                                    <Image
                                      source={item.icon}
                                      style={{ height: 18, width: 15, marginHorizontal: 3, resizeMode: 'contain' }}
                                    />
                                  </TouchableOpacity>} popoverStyle={style.popUpStyle}><Text style={style.interText}>{SuggestiondataWatchlist[index]?.address}</Text></Popover>
                                )}
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                }}>
                                {index !== 2 &&
                                  index !== 8 &&
                                  index !== 9 && ( //sorting icon
                                    <Image
                                      alt=""
                                      resizeMode="contain"
                                      style={[styles.sortIcon]}
                                      source={
                                        sortDirection === 'asc' && sorteeCol === item.col
                                          ? IMAGES.Sorting_Down
                                          : IMAGES.Sorting_Up
                                      }
                                    />
                                  )}
                                {index !== 2 && index !== 14 && index !== 15 && (
                                  <Popover from={<TouchableOpacity>
                                    <Image
                                      source={item.icon}
                                      style={{
                                        height: 18,
                                        width: 15,
                                        marginHorizontal: 3,
                                        marginTop: 3,
                                        resizeMode: 'contain'
                                      }}
                                    />
                                  </TouchableOpacity>} popoverStyle={style.popUpStyle}><Text style={style.interText}>{SuggestiondataWatchlist[index]?.address}</Text></Popover>

                                )}
                                {index == 8 && ( // previoues candlestick pattern
                                  <View style={{ width: '70%', height: '100%' }}>
                                    <View
                                      style={{
                                        width: '100%',
                                        backgroundColor: COLORS.White,
                                        padding: FixedValue.CONSTANT_VALUE_1,
                                      }}>
                                      <TouchableOpacity
                                        style={{
                                          width: '100%',
                                          borderColor: COLORS.gray,
                                          borderWidth: FixedValue.CONSTANT_VALUE_1,
                                          paddingLeft: scaleWidth(FixedValue.CONSTANT_VALUE_8),
                                          backgroundColor: COLORS.White,
                                          flexDirection: 'row',
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                        }}
                                        activeOpacity={0.8}
                                        onPress={openPrev_Pattern_Modal}>
                                        <Text
                                          allowFontScaling={false}
                                          style={{ color: 'black' }}
                                          numberOfLines={1}>
                                          {previous_pattern}
                                        </Text>
                                        <View>
                                          <Image
                                            alt=""
                                            resizeMode="contain"
                                            style={[
                                              styles.sortIcon,
                                              {
                                                tintColor: 'black',
                                                width: 10,
                                                height: 20,
                                              },
                                            ]}
                                            source={
                                              isPrevClicked ? IMAGES.Down_Arrow : IMAGES.Up_Arrow
                                            }
                                          />
                                        </View>
                                      </TouchableOpacity>
                                      <Modal
                                        visible={isprevPatternModal}
                                        animationType="slide"
                                        transparent>
                                        <TouchableOpacity
                                          onPress={() => {
                                            setIsPrevPatternModal(false);
                                          }}
                                          style={{
                                            flex: 1,
                                            backgroundColor: 'rgba(0,0,0,0.5)',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                          }}>
                                          <View
                                            style={{
                                              width: '70%',
                                              height: '50%',
                                              backgroundColor: '#fff',
                                              borderRadius: 10,
                                            }}>
                                            <TextInput //use for search in modal previous pattern
                                              placeholder="search"
                                              style={styles.searchInputs}
                                              onChangeText={prev_pattern_Search}
                                              value={prevSearchTerm}
                                            />
                                            <FlatList
                                              style={{ backgroundColor: '#fff', width: '100%' }}
                                              data={patternFilteredData}
                                              renderItem={({ item }) => (
                                                <RenderComponent
                                                  item={item}
                                                  pattern_value="previous_pattern"
                                                />
                                              )}
                                              keyExtractor={item => item.id.toString()}
                                            />
                                          </View>
                                        </TouchableOpacity>
                                      </Modal>
                                    </View>
                                  </View>
                                )}
                                {index == 9 && ( // use for current candlestick pattern dropdown modal
                                  <View
                                    style={{
                                      width: '70%',
                                      backgroundColor: COLORS.White,
                                      padding: FixedValue.CONSTANT_VALUE_1,
                                    }}>
                                    <TouchableOpacity
                                      style={{
                                        width: '100%',
                                        borderColor: COLORS.gray,
                                        borderWidth: FixedValue.CONSTANT_VALUE_1,
                                        paddingLeft: scaleWidth(FixedValue.CONSTANT_VALUE_8),
                                        backgroundColor: COLORS.White,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                      }}
                                      activeOpacity={0.8}
                                      onPress={openModal}>
                                      <Text
                                        allowFontScaling={false}
                                        style={{ color: 'black' }}
                                        numberOfLines={1}>
                                        {current_pattern}
                                      </Text>
                                      <View>
                                        <Image
                                          alt=""
                                          resizeMode="contain"
                                          style={[
                                            styles.sortIcon,
                                            {
                                              tintColor: 'black',
                                              width: 10,
                                              height: 20,
                                            },
                                          ]}
                                          source={isClicked ? IMAGES.Down_Arrow : IMAGES.Up_Arrow}
                                        />
                                      </View>
                                    </TouchableOpacity>
                                    <Modal visible={modalVisible} animationType="slide" transparent>
                                      <TouchableOpacity
                                        onPress={() => {
                                          setModalVisible(false);
                                        }}
                                        style={{
                                          flex: 1,
                                          backgroundColor: 'rgba(0,0,0,0.5)',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                        }}>
                                        <View
                                          style={{
                                            width: '70%',
                                            height: '50%',
                                            backgroundColor: '#fff',
                                            borderRadius: 10,
                                          }}>
                                          <TextInput
                                            placeholder="search"
                                            style={styles.searchInputs}
                                            onChangeText={handleSearch}
                                            value={searchTerm}
                                          />
                                          <FlatList
                                            style={{ backgroundColor: '#fff', width: '100%' }}
                                            data={filteredData}
                                            renderItem={({ item }) => (
                                              <ItemComponent
                                                item={item}
                                                index={index}
                                                pattern_value="current_pattern"
                                              />
                                            )}
                                            keyExtractor={item => item.id.toString()}
                                          />
                                        </View>
                                      </TouchableOpacity>
                                    </Modal>
                                  </View>
                                )}
                              </View>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      ))}
                    </ScrollView>
                    <ScrollView
                      ref={rightRef}
                      style={[styles.dataWrapper, { marginTop: scaleHeight(0) }]}
                      scrollEventThrottle={16}
                      bounces={false}
                      onScroll={e => {
                        const { y } = e.nativeEvent.contentOffset;
                        leftRef.current?.scrollTo({ y, animated: false });
                      }}>
                      {isdashboardScreenerSuccess && isdashboardScreenerSuccess.length === 0 ? (
                        <View style={{ width: '100%', alignItems: 'center', height: '100%' }}>
                          <Image
                            source={IMAGES.Alert}
                            style={styles.rightIcon}
                          />
                          <Text allowFontScaling={false} style={styles.noDataLabel}>
                            {CONSTANT_TEXT.NO_DATA_FOUNG}
                          </Text>
                        </View>
                      ) : (
                        <Table>
                          {filteredTableFeed &&
                            filteredTableFeed.map((rowData: any, index: number) => (
                              <View
                                key={`stockTab${index}`}
                                style={[
                                  styles.rowbox,
                                  { backgroundColor: index % 2 === 0 ? '#fff' : '#f5f5f5' },
                                ]}>
                                {tableHeaderWatchlist.map((item: any, rowIndex: number) => (
                                  <View
                                    key={`tableHead${rowIndex}`}
                                    style={[
                                      styles.cell,
                                      {
                                        width: stockTableWatchlist.widthArr[rowIndex],
                                        paddingRight: scaleWidth(15),
                                        backgroundColor: [1].includes(rowIndex)
                                          ? '#DFFFE8'
                                          : 'transparent',
                                      },
                                    ]}>
                                    {getCellContent(rowIndex, rowData, item)}
                                  </View>
                                ))}
                              </View>
                            ))}
                        </Table>
                      )}
                    </ScrollView>
                  </View>
                ) : null}
              </ScrollView>
            </View>
          </View>
        </>
      )}
      {showWatchlist ? (
        <WatchlistPopup
          isVisible={showWatchlist}
          onCancel={onCancleWatchlist}
          symbol_name={symbol_name}
          updateWatchlistTable={updateWatchlist}
          updateWatchlistRemove={updateWatchlistRemove}
          showContent={showContent}
          watchlist_menu={true}
          remove_Watchlist_id={watchlist_id}
        />
      ) : null}
    </View>
  );
};
export default WatchTableComponent;

const style = StyleSheet.create({
  popUpStyle: {
    backgroundColor: 'black',
  },
  interText: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    color: '#FFFFFF',
    padding: 10,
    paddingHorizontal: 20,
  },
})
