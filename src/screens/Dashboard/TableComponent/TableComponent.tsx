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
import Popover from 'react-native-popover-view'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';

import PriceAlertPopup from '../../../Components/PriceAlertModal';
import { COLORS } from '../../../Constants/enums/colorsEnum';
import { CONSTANT_TEXT } from '../../../Constants/enums/constantText';
import { FixedValue } from '../../../Constants/enums/numberEnum';
import { navigation } from '../../../Navigation/NavigationService';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import styles from './style';
import {
  candlestick_patterns_arr,
  tableHeaders,
  stockTable,
  formatDate,
  Suggestiondata,
  formatDate_InNumber,
} from './utils';
import { setSelectedFilters } from '../../../apis/Onboarding/selectedFiltersSlice';
import WatchlistPopup from '../../../Components/WatchlistModal/WatchlistModal';
import { normalizeFont, scaleHeight, scaleWidth } from '../../../Constants/enums/Dimensions';
import { showSubscriptionAlert } from '../../../utils/showSubscriptionAlert'; // Adjust the path based on your project structure
import FONTS from '../../../Constants/enums/Fonts';
import { addCommaToCurrency } from '../../../utils/digitCommaSeparator';
import { formatDateFromTimeStamp } from '../../../utils/dateConverter';


interface TableComponentProps {
  isdashboardScreenerSuccess: any;
  isScreenerSaveData: any; // You should replace 'any' with the actual type for this prop
  tableStocksData: any;
  setTableStockeData: any;
  noDataFound: boolean;
  selectData: SelectData;
}
interface SelectData {
  recommend_type: string;
  sector: string;
  segment: string;
  timeframe: string;
}
interface SuggestionData {
  address: string;
  link: string;
}
const TableComponent: React.FC<TableComponentProps> = ({
  isdashboardScreenerSuccess,
  isScreenerSaveData,
  tableStocksData,
  setTableStockeData,
  noDataFound,
  selectData,
}) => {
  // export default function TableComponent() {
  const leftRef = useRef<ScrollView>(null);
  const rightRef = useRef<ScrollView>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [sorteeCol, setSorteeCol] = useState<any>('');
  const [rowsPerPage, setRowsPerPage] = useState<any>(8);
  const [sortDirection, setSortDirection] = useState<any>('asc');
  const [showPriceDialog, setShowPriceDialog] = useState<boolean>(false);
  const [activeSymbol, setActiveSymbol] = useState<string>('');
  const [symbolId, setSymbolId] = useState<number>();
  const [defaultData, setDefaultData] = useState<any>(null);
  const [activePrice, setActivePrice] = useState<any>('');
  const [isClicked, setisClicked] = useState(false); // use for down and up arrow in current pattern
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(candlestick_patterns_arr);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  //Previous pattern
  const [isPrevClicked, setisPrevClicked] = useState(false); /// use for down arrow in previous pattern
  const [isprevPatternModal, setIsPrevPatternModal] = useState(false);
  const [isPrevData, setPrevData] = useState(candlestick_patterns_arr);
  ///search and filer or previous pattern
  const [patternFilteredData, setPatternFilteredData] = useState(isPrevData);
  const [prevSearchTerm, setPrevSearchTerm] = useState('');
  const [scrollDirection, setScrollDirection] = useState('right');
  ///open watchlist
  const [showWatchlist, setShowWatchlist] = useState<boolean>(false);
  const [symbol_name, setSymbol_name] = useState<number>();
  const dispatch = useDispatch();

  ///// for filter all dropdown data state
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

  const { completed_pattern, emerging_pattern, recommendation_filter } = selectedFilters;
  const [active_PlanCode, setActive_PlanCode] = useState('');
  AsyncStorage.getItem('active_PlanCode').then(value => {
    setActive_PlanCode(value)
  });
  const isEligiblePlan = ["NEWYEAR349", "GOLD849", "ANNUAL_UPGRADE", "NEW349", "BASIC179", "ADV4499"].includes(active_PlanCode);

  useEffect(() => {
    storeSelectedFilters();
  }, [selectedFilters]);
  //// use to store the the filters data in async storage
  const storeSelectedFilters = async () => {
    try {
      await AsyncStorage.setItem('selected_Filters', JSON.stringify(selectedFilters));
    } catch (error) { }
  };

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
    }
  }, [isdashboardScreenerSuccess]);

  const handleScroll = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: scrollDirection === 'right' ? 220 : 0, // Scroll right if right, else left
        animated: true, // Smooth scrolling
      });

      setScrollDirection(scrollDirection === 'right' ? 'left' : 'right'); // Toggle direction
    }
  };

  const formatTableData = () => {
    try {
      const headers = [
        'previous_recommendation',
        'recommendation',
        'previous_recommendation',
        'close',
        'pChange',
        'pvolumeChange',
        'week_volume_compare',
        'week_volume_compare',
        'volume_greatest',
        'completed_pattern',
        'emerging_pattern',
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

      for (let i = 0; i < isdashboardScreenerSuccess.length; i++) {
        let testArr = [];
        for (let j = 0; j < headers.length; j++) {
          if (j === 0) {
            if (isdashboardScreenerSuccess[i].previous_recommendation.buyprice) {
              testArr.push(isdashboardScreenerSuccess[i][headers[j]].date);
            } else {
              testArr.push('--');
            }
          } else if (j === 1) {
            if (isdashboardScreenerSuccess[i].previous_recommendation.sellprice) {
              testArr.push(isdashboardScreenerSuccess[i][headers[j]].date);
            } else {
              testArr.push('--');
            }
          } else if (j === 3) {
            testArr.push(isdashboardScreenerSuccess[i][headers[j]].pct);
          } else if (j === 7) {
            //
          } else if (j === 8) {
            //
          } else if (j === 10 || j === 11) {
            //
          } else if (j === 15) {
            //
          } else if (j === 16) {
            let temp = isdashboardScreenerSuccess[i][headers[j]];
            testArr.push(temp?.year_low || '--');
          } else {
            testArr.push(isdashboardScreenerSuccess[i][headers[j]]);
          }
        }
        tableData.push(testArr);
      }
    } catch (error) {
      console.log({ error });
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
      sortData(tableStocksData, data, sortDirection, isScreenerSaveData);
    }
  };
  const sortData = (response, column, direction, screenerData) => {
    if (column === 'symbol') {
      let temp = [...response];
      if (direction === 'asc') {
        temp.sort(function (a, b) {
          if (a.stock_id_id__name < b.stock_id_id__name) {
            return -1;
          }
          if (a.stock_id_id__name > b.stock_id_id__name) {
            return 1;
          }
          return 0;
        });
      } else {
        temp.sort(function (a, b) {
          if (a.stock_id_id__name < b.stock_id_id__name) {
            return 1;
          }
          if (a.stock_id_id__name > b.stock_id_id__name) {
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
          let date1 = new Date(a.previous_recommendation?.date);
          let date2 = new Date(b.previous_recommendation?.date);
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
          let date1 = new Date(a.previous_recommendation?.date);
          let date2 = new Date(b.previous_recommendation?.date);
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
      const buypricesArray = temp.filter(item => item.previous_recommendation?.buyprice);
      if (direction === 'asc') {
        buypricesArray.sort((a, b) => {
          let date1 = new Date(a.previous_recommendation?.date);
          let date2 = new Date(b.previous_recommendation?.date);
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
          let date1 = new Date(a.previous_recommendation?.date);
          let date2 = new Date(b.previous_recommendation?.date);
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
      const sellpricesArray = temp.filter(item => item.previous_recommendation?.sellprice);
      if (direction === 'asc') {
        sellpricesArray.sort((a, b) => {
          let date1 = new Date(a.previous_recommendation?.date);
          let date2 = new Date(b.previous_recommendation?.date);
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
          let date1 = new Date(a.previous_recommendation?.date);
          let date2 = new Date(b.previous_recommendation?.date);
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
          const num1 = parseFloat(a.previous_recommendation?.pct);
          const num2 = parseFloat(b.previous_recommendation?.pct);
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
          const num1 = parseFloat(a.previous_recommendation?.pct);
          const num2 = parseFloat(b.previous_recommendation?.pct);
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
          const num1 = parseFloat(a.week_volume_compare?.volume_pcnt);
          const num2 = parseFloat(b.week_volume_compare?.volume_pcnt);
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
          const num1 = parseFloat(a.week_volume_compare?.volume_pcnt);
          const num2 = parseFloat(b.week_volume_compare?.volume_pcnt);
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
          const num1 = parseFloat(a.week_pChange); //string data type
          const num2 = parseFloat(b.week_pChange);
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
          const num1 = parseFloat(a.week_pChange);
          const num2 = parseFloat(b.week_pChange);
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
          const num1 = parseFloat(a.volume_greatest); /// datatype is in string format
          const num2 = parseFloat(b.volume_greatest);
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
          const num1 = parseFloat(a.volume_greatest);
          const num2 = parseFloat(b.volume_greatest);
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
          const num1 = parseFloat(a.open); ///open_gap_pcnt is in string format
          const num2 = parseFloat(b.open); ///string datatype
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
          const num1 = parseFloat(a.open); ///parsefloat use for string data type
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
          const num1 = parseFloat(a.year_high?.year_high_gap_pcnt);
          const num2 = parseFloat(b.year_high?.year_high_gap_pcnt);
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
          const num1 = parseFloat(a.year_high?.year_high_gap_pcnt);
          const num2 = parseFloat(b.year_high?.year_high_gap_pcnt);
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
          const num1 = parseFloat(a.year_low?.year_low_gap_pcnt);
          const num2 = parseFloat(b.year_low?.year_low_gap_pcnt);
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
          const num1 = parseFloat(a.year_low?.year_low_gap_pcnt);
          const num2 = parseFloat(b.year_low?.year_low_gap_pcnt);
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
    const temp = isdashboardScreenerSuccess.findIndex(
      (item: any) => item?.stock_id_id__name === data,
    );
    await setActivePrice(isdashboardScreenerSuccess[temp]?.close);
    setActiveSymbol(data);
    setSymbolId(symbol_id);
    setShowPriceDialog(true);
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
      const date_toggle =
        recommendation_filter === 'All'
          ? true
          : item.previous_recommendation?.recommendation === recommendation_filter;
      // console.log("ssss",tableStocksData)
      return (
        (item?.completed_pattern === completed_pattern ||
          !completed_pattern ||
          completed_pattern === 'all') &&
        (item.emerging_pattern === emerging_pattern ||
          !emerging_pattern ||
          emerging_pattern === 'all')
      );
    });

  const symblolColumn =
    filteredTableFeed &&
    filteredTableFeed?.map(colData => {
      return {
        symbol: colData?.stock_id_id__name,
        symbol_id: colData?.stock_id_id,
        segment: colData?.stock_id_id__segment,
        isStar: colData?.isStar,
        isGreen: colData?.isGreen,
        is_watchlist: colData?.is_watchlist,
        is_user_alert: colData?.is_user_alert,
      };
    }); /// use for left side show list of symbol

  const updateWatchlist = value => {
    setTableStockeData(prevState => {
      return prevState.map(state => {
        if (state.stock_id_id__name === value) {
          return {
            ...state,
            is_watchlist: true,
          };
        }
        return state;
      });
    });
  };

  const updateWatchlistRemove = value => {
    setTableStockeData(prevState => {
      return prevState.map(state => {
        if (state.stock_id_id__name === value) {
          return {
            ...state,
            is_watchlist: false,
          };
        }
        return state;
      });
    });
  };
  // const isSymbolAddedToWatchlist = (symbol_name: string) => {
  //   if (!isWatchlistSuccess) {
  //     return;
  //   }
  //   // if (!symbol_name || isWatchlistSuccess?.response === 0) return;
  //   let isAdded = false;
  //   isWatchlistSuccess?.response.forEach(item => {
  //     if (item?.symbol.includes(symbol_name)) {
  //       isAdded = true;
  //       return; // If found, exit the loop early
  //     }
  //   });
  //   return isAdded;
  // };

  const getCellContent = (rowIndex: number, rowData: any, item: string) => {
    if (rowIndex === 0) {
      return (
        <>
          {rowData[item]?.buyprice ? (
            <>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginHorizontal: scaleWidth(15),
                }}>
                <Text allowFontScaling={false} style={[styles.text, { fontWeight: 'bold' }]}>
                  Screener Green Signal
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.text,
                    {
                      color: COLORS.Binance_green,
                      fontWeight: 'bold',
                    },
                  ]}>
                  {addCommaToCurrency(rowData[item]?.buyprice) || '---'}
                </Text>
              </View>
              {selectData?.timeframe === 'latest' && (
                <View style={styles.recView}>
                  <Text allowFontScaling={false} style={[styles.text]}>
                    Stop Loss
                  </Text>
                  <Text allowFontScaling={false} style={[styles.text]}>
                    {addCommaToCurrency(rowData[item]?.stoploss)}
                  </Text>
                </View>
              )}
              <View style={styles.recView}>
                <Text allowFontScaling={false} style={[styles.text]}>
                  Green Signal Date
                </Text>
                <Text style={[styles.text, { fontWeight: '700' }]} allowFontScaling={false}>
                  {/* {formatDateFromTimeStamp(rowData.modified_at)} */}
                  {formatDate_InNumber(rowData[item]?.date)}

                </Text>
              </View>
              <View style={styles.recView}>
                <Text allowFontScaling={false} style={[styles.text]}>
                  High after Green Signal
                </Text>
                <Text style={[styles.text]} allowFontScaling={false}>
                  {' '}
                  {addCommaToCurrency(rowData[item]?.high) ||
                    addCommaToCurrency(rowData[item]?.low)}
                </Text>
              </View>
              <View style={styles.recView}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.text,
                    {
                      fontWeight: 'bold',
                    },
                  ]}>
                  Maximum Profit
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={rowData[item]?.color === 'red' ? IMAGES.Down_Arrow : IMAGES.Up_Arrow}
                    style={[styles.ArrowIcon, { tintColor: rowData[item]?.color }]}
                  />
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.text,
                      {
                        fontSize: 14,
                        color: COLORS.Binance_green,
                        fontWeight: 'bold',
                      },
                    ]}>
                    {rowData[item]?.pct}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <>
              {rowData[item]?.sellprice ? (
                <>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginHorizontal: scaleWidth(15),
                    }}>
                    <Text allowFontScaling={false} style={[styles.text, { fontWeight: 'bold' }]}>
                      Screener Red Alert
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.text,
                        {
                          color: COLORS.Binance_red,
                          fontWeight: 'bold',
                        },
                      ]}>
                      {addCommaToCurrency(rowData[item]?.sellprice) || '---'}
                    </Text>
                  </View>
                  <View style={styles.recView}>
                    <Text allowFontScaling={false} style={[styles.text]}>
                      Red Alert Date
                    </Text>
                    <Text style={[styles.text, { fontWeight: '700' }]} allowFontScaling={false}>
                      {/* {formatDateFromTimeStamp(rowData.modified_at)} */}
                      {formatDate_InNumber(rowData[item]?.date)}
                    </Text>
                  </View>
                  <View style={styles.recView}>
                    <Text allowFontScaling={false} style={[styles.text]}>
                      Low After Red Alert
                    </Text>
                    <Text allowFontScaling={false} style={[styles.text]}>
                      {addCommaToCurrency(rowData[item]?.high) || addCommaToCurrency(rowData[item]?.low)}
                    </Text>
                  </View>
                  <View style={styles.recView}>
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.text,
                        {
                          fontWeight: 'bold',
                        },
                      ]}>
                      Maximum save
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={
                          rowData[item]?.color === 'red' ? IMAGES.Down_Arrow : IMAGES.Up_Arrow
                        }
                        style={[styles.ArrowIcon, { tintColor: rowData[item]?.color }]}
                      />
                      <Text
                        allowFontScaling={false}
                        style={[
                          styles.text,
                          {
                            fontSize: 14,
                            color: COLORS.Binance_green,
                            fontWeight: 'bold',
                          },
                        ]}>
                        {rowData[item]?.pct}
                      </Text>
                    </View>
                  </View>
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
            style={[
              styles.text,
              {
                fontWeight: rowData[item]?.hold === 'true' ? 'bold' : 'normal',
                color: rowData[item]?.hold === 'true' ? '#1A1A1A' : COLORS.Binance_red,
              },
            ]}>
            {rowData[item]?.hold === 'true' ? 'Hold' : `Don't Buy`}
          </Text>
          {rowData[item]?.hold === 'true' && (
            <Text
              allowFontScaling={false}
              style={[
                styles.text,
                {
                  color: COLORS.Black,
                },
              ]}>
              {formatDate(rowData?.timeframe)}
            </Text>
          )}
        </>
      );
    } else if (rowIndex === 2) {
      //1
      return (
        <>
          {/* <Text allowFontScaling={false} style={[styles.text, {}]}>
            {rowData[item]?.high || rowData[item]?.low}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={rowData[item]?.color === 'red' ? IMAGES.Down_Arrow : IMAGES.Up_Arrow}
              style={[styles.ArrowIcon, {tintColor: rowData[item]?.color}]}
            />
            <Text
              allowFontScaling={false}
              style={[
                styles.text,
                {
                  color: COLORS.Binance_green,
                  fontWeight: 'bold',
                },
              ]}>
              {rowData[item]?.pct}
            </Text>
          </View> */}
        </>
      );
    } else if (rowIndex === 4) {
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
    } else if (rowIndex === 5) {
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
    } else if (rowIndex === 6) {
      return (
        <>
          <Text allowFontScaling={false} style={[styles.text]}>
            {rowData[item]?.volume}
          </Text>
          <Text
            allowFontScaling={false}
            style={[
              styles.text,
              {
                textAlign: [9, 10].includes(rowIndex) ? 'left' : 'center',
                color: rowData[item]?.volume_pcnt >= 0 ? COLORS.Binance_green : COLORS.Binance_red,
              },
            ]}>
            {rowData[item]?.volume_pcnt?.toString() || '---'}
            {rowData[item]?.volume_pcnt && '%'}
          </Text>
        </>
      );
    } else if (rowIndex === 7) {
      return (
        <>
          <Text allowFontScaling={false} style={[styles.text]}>
            {rowData?.avgVolume}
          </Text>
          <Text
            allowFontScaling={false}
            style={[
              styles.text,
              {
                textAlign: [9, 10].includes(rowIndex) ? 'left' : 'center',
                color: rowData?.week_pChange >= 0 ? COLORS.Binance_green : COLORS.Binance_red,
              },
            ]}>
            {rowData?.week_pChange || CONSTANT_TEXT.BLANK_FIELD}
            {rowData?.week_pChange && '%'}
          </Text>
        </>
      );
    } else if (rowIndex === 8) {
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
    } else if (rowIndex === 11) {
      return (
        <>
          <Text allowFontScaling={false} style={[styles.text]}>
            {addCommaToCurrency(rowData?.open)}
          </Text>
        </>
      );
    } else if (rowIndex === 15) {
      return (
        <>
          <Text
            allowFontScaling={false}
            style={[styles.text, { textAlign: [9, 10].includes(rowIndex) ? 'left' : 'center' }]}>
            {addCommaToCurrency(rowData[item]?.year_high) || CONSTANT_TEXT.BLANK_FIELD}
          </Text>
          <Text allowFontScaling={false} style={[styles.text]}>
            {rowData[item]?.year_high_gap_pcnt || CONSTANT_TEXT.BLANK_FIELD}
            {rowData[item]?.year_high_gap_pcnt > 0 && '%'}
          </Text>
          <Text allowFontScaling={false} style={[styles.text]}>
            {rowData[item]?.year_high_day_ago}
            {rowData[item]?.year_high_day_ago >= 0
              ? CONSTANT_TEXT.DAYS_AGO
              : CONSTANT_TEXT.BLANK_FIELD}
          </Text>
        </>
      );
    } else if (rowIndex === 16) {
      return (
        <>
          <Text
            allowFontScaling={false}
            style={[styles.text, { textAlign: [9, 10].includes(rowIndex) ? 'left' : 'center' }]}>
            {addCommaToCurrency(rowData[item]?.year_low) || '---'}
          </Text>
          <Text allowFontScaling={false} style={[styles.text]}>
            {rowData[item]?.year_low_gap_pcnt || CONSTANT_TEXT.BLANK_FIELD}
            {rowData[item]?.year_low_gap_pcnt && '%'}
          </Text>
          <Text allowFontScaling={false} style={[styles.text]}>
            {rowData[item]?.year_low_day_ago}
            {rowData[item]?.year_low_day_ago >= 0
              ? CONSTANT_TEXT.DAYS_AGO
              : CONSTANT_TEXT.BLANK_FIELD}
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

  const openModal = () => {
    setisClicked(!isClicked);
    setModalVisible(true);
  };
  const openPrev_Pattern_Modal = () => {
    setisPrevClicked(!isPrevClicked);
    setIsPrevPatternModal(true);
  };
  const ItemComponent = (props: any) => {
    //current emerging_pattern dropdown ui
    const { item, index, pattern_value } = props;
    return (
      <View>
        <TouchableOpacity
          style={[styles.ItemContainer, { backgroundColor: index % 2 === 0 ? '#fff' : '#f5f5f5' }]}
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
    const { item, pattern_value, index } = props;
    return (
      <View>
        <TouchableOpacity
          style={[styles.ItemContainer, { backgroundColor: index % 2 === 0 ? '#fff' : '#f5f5f5' }]}
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
  const handleWatchlistBox = async (symbol: any, symbol_id: number) => {
    setSymbol_name(symbol);
    setShowWatchlist(true);
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
          setTableStockeData={setTableStockeData}
        />
      ) : null}
      <>
        <View style={styles.tableContainer}>
          <View style={styles.leftCol}>
            {/* Blank Cell */}
            <TouchableWithoutFeedback onPress={() => handleSortColumn('symbol')}>
              <View style={styles.blankCell}>
                <Text
                  allowFontScaling={false}
                  style={{
                    color: '#4A5568',
                    fontFamily: FONTS.RobotoRegular,
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
              {noDataFound ? (
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <Text allowFontScaling={false} style={styles.noDataLabel}>
                    No Data Found..
                  </Text>
                </View>
              ) : (
                <Table>
                  {symblolColumn &&
                    symblolColumn.map(
                      (
                        {
                          symbol,
                          symbol_id,
                          segment,
                          isStar,
                          isGreen,
                          is_watchlist,
                          is_user_alert,
                        }: {
                          symbol: string;
                          symbol_id: number;
                          segment: string;
                          isStar: boolean;
                          isGreen: boolean;
                          is_watchlist: boolean;
                          is_user_alert: boolean;
                        },
                        index: number,
                      ) => (
                        <View key={index} style={[styles.rowbox]}>
                          <View
                            style={[
                              styles.cell,
                              {
                                width: '100%',
                                alignItems: 'center',
                                backgroundColor: isGreen ? '#62cb70' : '#fff',
                              },
                            ]}>
                            <TouchableOpacity
                              style={styles.inRow}
                              onPress={() => {
                                navigation('SearchDetailScreen', {
                                  symbol: symbol,
                                  segment: segment,
                                });
                              }}>
                              <Text
                                allowFontScaling={false}
                                style={[
                                  styles.txtsymbolName,
                                  { color: isGreen ? '#fff' : '#1A1A1A' },
                                ]}>
                                {symbol?.replace('%26', '&') ?? ''}
                              </Text>
                              {isStar && (
                                <Image
                                  source={IMAGES.STAR_ICON}
                                  style={{
                                    height: scaleHeight(18),
                                    width: scaleWidth(18),
                                    marginLeft: scaleWidth(5),
                                  }}
                                />
                              )}
                            </TouchableOpacity>

                            {isEligiblePlan && <View style={styles.IconContainer}>
                              <TouchableOpacity
                                style={{ flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 10 }}
                                onPress={() => handleAlertSubscribe(symbol, symbol_id)}>
                                {is_user_alert ? (
                                  <Image
                                    alt=""
                                    resizeMode="contain"
                                    style={[styles.alertIcon]}
                                    source={IMAGES.Bell_Ring}
                                  />
                                ) : (
                                  <Image
                                    alt=""
                                    resizeMode="contain"
                                    style={[styles.alertIcon]}
                                    source={IMAGES.Bell}
                                  />
                                )}
                                <Text
                                  style={{
                                    fontSize: normalizeFont(11),
                                    color: '#37383A',
                                    fontFamily: FONTS.RobotoBold,
                                    padding: 2,
                                    paddingLeft: 0,
                                    paddingHorizontal: 6,
                                    marginTop: 10,
                                    alignItems: 'center',
                                  }}>
                                  ADD ALERT
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={{ flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 10, marginTop: 10 }}
                                onPress={() => handleWatchlistBox(symbol, symbol_id)}>
                                {is_watchlist ? (
                                  <Image //watchlist icon
                                    alt=""
                                    style={[styles.alertIcon]}
                                    source={IMAGES.Save_Icon}
                                  />
                                ) : (
                                  <Image //watchlist icon
                                    alt=""
                                    style={[styles.alertIcon]}
                                    source={IMAGES.unsaveicon}
                                  />
                                )}
                                <Text
                                  style={{
                                    fontSize: normalizeFont(11),
                                    color: '#37383A',
                                    fontFamily: FONTS.RobotoBold,
                                    padding: 2,
                                    paddingLeft: 0,
                                    paddingHorizontal: 6,
                                    marginTop: 10,
                                    alignItems: 'center',
                                  }}>
                                  WATCHLIST
                                </Text>
                              </TouchableOpacity>
                            </View>}
                          </View>

                          {!isEligiblePlan && (
                            <TouchableOpacity
                              activeOpacity={1}
                              style={styles.hideContainer}
                              onPress={() => {
                                showSubscriptionAlert();
                              }}>
                              <View style={styles.hideContainer}>
                                <Image
                                  style={[styles.LockIcon]}
                                  source={IMAGES.SUBSCRIPTION_LOCK.LOCKICON_SQUARE}
                                />
                              </View>
                            </TouchableOpacity>
                          )}
                        </View>
                      ),
                    )}
                </Table>
              )}
            </ScrollView>
          </View>
          {/* Right Column */}
          <View style={styles.rightCol}>
            <ScrollView ref={scrollViewRef} horizontal={true} bounces={false}>
              <View>
                {/* Right Column Tabs -> sell/buy */}
                <ScrollView horizontal>
                  {stockTable.tableHead.map((item, index) => (
                    <TouchableWithoutFeedback
                      key={`stock${index}`}
                      onPress={() => handleSortColumn(item.col)}>
                      <View
                        style={[
                          styles.tableHeader,
                          {
                            width:
                              selectData?.recommend_type === 'Sell' ||
                                selectData?.timeframe === 'latest'
                                ? stockTable.widthArrsell[index]
                                : stockTable.widthArr[index],
                            backgroundColor: '#F0F0F0',
                          },
                        ]}>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ flexDirection: 'column', flex: 1 }}>
                            <View style={styles.tabheaderText}>
                              <Text allowFontScaling={false} style={[styles.headertxt]}>
                                {item?.label}
                              </Text>
                            </View>

                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: scaleHeight(4),
                                height: '100%',
                              }}>
                              {index !== 1 &&
                                index !== 2 &&
                                index !== 3 &&
                                index !== 9 &&
                                index !== 10 && ( //sorting icon
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
                              {index !== 2 && index !== 3 && (

                                <Popover
                                  from={
                                    <TouchableOpacity>
                                      <Image
                                        source={item?.icon}
                                        style={{
                                          height: scaleHeight(18),
                                          width: scaleWidth(15),
                                          marginRight: scaleWidth(3),
                                          marginTop: scaleHeight(3),
                                          resizeMode: 'contain'
                                        }}
                                      />
                                    </TouchableOpacity>
                                  }
                                  popoverStyle={style.popUpStyle}>
                                  <Text style={style.interText}>{Suggestiondata[index]?.address}</Text>
                                </Popover>
                              )}

                              {index == 9 && ( // previoues candlestick pattern
                                <View style={{ width: '70%', height: '100%' }}>
                                  <View
                                    style={{
                                      width: '100%',
                                      backgroundColor: COLORS.White,
                                      padding: FixedValue.CONSTANT_VALUE_1,
                                    }}>
                                    <TouchableOpacity
                                      style={styles.candlestick}
                                      activeOpacity={0.8}
                                      onPress={openPrev_Pattern_Modal}>
                                      <Text
                                        allowFontScaling={false}
                                        style={{ color: 'black' }}
                                        numberOfLines={1}>
                                        {completed_pattern}
                                      </Text>
                                      <View>
                                        <Image
                                          alt=""
                                          resizeMode="contain"
                                          style={[styles.sortIcon2]}
                                          source={isPrevClicked ? IMAGES.Down_Arrow : IMAGES.Up_Arrow}
                                        />
                                      </View>
                                    </TouchableOpacity>
                                    <Modal
                                      visible={isprevPatternModal}
                                      animationType="none"
                                      transparent>
                                      <TouchableOpacity
                                        onPress={() => {
                                          setIsPrevPatternModal(false);
                                        }}
                                        style={styles.modalContainer}>
                                        <View style={styles.patternView}>
                                          <TextInput //use for search in modal previous pattern
                                            placeholder="search Patterns"
                                            style={styles.searchInputs}
                                            onChangeText={prev_pattern_Search}
                                            value={prevSearchTerm}
                                            placeholderTextColor={COLORS.gray}
                                          />
                                          <FlatList
                                            style={styles.flatListStyle}
                                            data={patternFilteredData}
                                            renderItem={({ item, index }) => (
                                              <RenderComponent
                                                item={item}
                                                pattern_value="completed_pattern"
                                                index={index}
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
                              {index == 10 && ( // use for current candlestick pattern dropdown modal
                                <View
                                  style={{
                                    width: '70%',
                                    height: '100%',
                                  }}>
                                  <TouchableOpacity
                                    style={styles.candlestick}
                                    activeOpacity={0.8}
                                    onPress={openModal}>
                                    <Text
                                      allowFontScaling={false}
                                      style={{ color: 'black' }}
                                      numberOfLines={1}>
                                      {emerging_pattern}
                                    </Text>
                                    <View>
                                      <Image
                                        alt=""
                                        resizeMode="contain"
                                        style={[styles.sortIcon2]}
                                        source={isClicked ? IMAGES.Down_Arrow : IMAGES.Up_Arrow}
                                      />
                                    </View>
                                  </TouchableOpacity>
                                  <Modal visible={modalVisible} animationType="slide" transparent>
                                    <TouchableOpacity
                                      onPress={() => {
                                        setModalVisible(false);
                                      }}
                                      style={styles.modalContainer}>
                                      <View style={styles.patternView}>
                                        <TextInput
                                          placeholder="search Patterns"
                                          style={styles.searchInputs}
                                          onChangeText={handleSearch}
                                          value={searchTerm}
                                          placeholderTextColor={COLORS.gray}
                                        />
                                        <FlatList
                                          style={styles.flatListStyle}
                                          data={filteredData}
                                          renderItem={({ item, index }) => (
                                            <ItemComponent
                                              item={item}
                                              index={index}
                                              pattern_value="emerging_pattern"
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
                          {index === 0 && (
                            <View style={{ paddingTop: 5, marginBottom: 5 }}>
                              <TouchableOpacity onPress={handleScroll} style={{ marginTop: 14 }}>
                                <Image
                                  source={IMAGES.scroll}
                                  style={[
                                    { height: 32, width: 32, resizeMode: 'contain' },
                                    scrollDirection === 'left' && { transform: [{ scaleX: -1 }] },
                                  ]}
                                />
                              </TouchableOpacity>
                            </View>
                          )}
                        </View>

                      </View>
                    </TouchableWithoutFeedback>
                  ))}
                </ScrollView>
                <ScrollView
                  ref={rightRef}
                  style={styles.dataWrapper}
                  scrollEventThrottle={16}
                  bounces={false}
                  onScroll={({ nativeEvent }) => {
                    const { y } = nativeEvent.contentOffset;
                    leftRef.current?.scrollTo({ y, animated: false });
                  }}>
                  {isdashboardScreenerSuccess && isdashboardScreenerSuccess.length === 0 ? (
                    <View style={styles.nodataView}>
                      <Image source={IMAGES.Alert} style={styles.rightIcon} resizeMode="contain" />
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
                            {tableHeaders.map((item: any, rowIndex: number) => (
                              <View
                                key={`tableHead${rowIndex}`}
                                style={[
                                  styles.cell,
                                  {
                                    width:
                                      selectData?.recommend_type === 'Sell' ||
                                        selectData?.timeframe === 'latest'
                                        ? stockTable.widthArrsell[rowIndex]
                                        : stockTable.widthArr[rowIndex],
                                    backgroundColor: [0].includes(rowIndex)
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
            </ScrollView>
          </View>
        </View>
      </>
      {showWatchlist ? (
        <WatchlistPopup
          isVisible={showWatchlist}
          onCancel={onCancleWatchlist}
          symbol_name={symbol_name}
          updateWatchlistTable={updateWatchlist}
          updateWatchlistRemove={updateWatchlistRemove}
        // showContent={isSymbolAddedToWatchlist}
        />
      ) : null}
    </View>
  );
};
export default TableComponent;

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