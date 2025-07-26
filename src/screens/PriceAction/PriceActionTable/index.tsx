import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import {Table} from 'react-native-table-component';
import {useDispatch} from 'react-redux';
import {COLORS} from '../../../Constants/enums/colorsEnum';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import {CONSTANT_TEXT} from '../../../Constants/enums/constantText';
import {navigation, goBack} from '../../../Navigation/NavigationService';
import styles from './style';
import {
  stockTable,
  formatDate,
  formatDate_InNumber,
} from '../../../screens/Dashboard/TableComponent/utils';
import {normalizeFont, scaleHeight, scaleWidth} from '../../../Constants/enums/Dimensions';
import {useIsFocused} from '@react-navigation/native';
import {PricestockTable} from './utils';

interface PriceActionTableProps {
  isdashboardScreenerSuccess: any;
  isScreenerSaveData: any; // You should replace 'any' with the actual type for this prop
  tableStocksData: any;
  setTableStockeData: any;
  noDataFound: boolean;
}
export const tableHeaders = [
  'price_action',
  'CMP',
  'pChange',
  'pvolumeChange',
  'week_volume_compare',
  'ten_days_avg_pChange',
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
const PriceActionTable: React.FC<PriceActionTableProps> = ({
  isdashboardScreenerSuccess,
  isScreenerSaveData,
  tableStocksData,
  setTableStockeData,
  noDataFound,
}) => {
  // export default function PriceActionTable() {
  const leftRef = useRef<ScrollView>(null);
  const rightRef = useRef<ScrollView>(null);
  const [stocksDict, setStocksDict] = useState<any>([]);
  const [activePage, setActivePage] = useState<any>(1);
  const [stockTableData, setStockTableData] = useState<any>([]);
  const [paginationFaceSet, setPaginationFaceSet] = useState<any>([]);
  const [paginationSet, setPaginationSet] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = useState<any>(8);
  const [assetList, setAssetList] = useState<any>([]);
  const [assetDict, setAssetDict] = useState<any>([]);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

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
        'price_action',
        'CMP',
        'pChange',
        'pvolumeChange',
        'week_volume_compare',
        'ten_days_avg_pChange',
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
            if (isdashboardScreenerSuccess[i].price_action?.buyprice) {
              testArr.push(isdashboardScreenerSuccess[i][headers[j]].date);
            } else {
              testArr.push('--');
            }
          } else if (j === 1) {
            if (isdashboardScreenerSuccess[i].price_action?.sellprice) {
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
      console.log({error});
    }
  };
  let filteredTableFeed = tableStocksData && tableStocksData;

  const symblolColumn =
    filteredTableFeed &&
    filteredTableFeed?.map(colData => {
      return {
        symbol: colData?.symbol,
        symbol_id: colData?.symbol_id,
        segment: colData?.segment,
      };
    }); /// use for left side show list of symbol
  const getCellContent = (rowIndex: number, rowData: any, item: string) => {
    if (rowIndex === 0) {
      return (
        <>
          {rowData[item]?.buyprice && (
            <>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginHorizontal: scaleWidth(15),
                }}>
                <Text allowFontScaling={false} style={[styles.text, {fontWeight: 'bold'}]}>
                  Green Signal Price
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
                  {rowData[item]?.buyprice || '---'}
                </Text>
              </View>
              <View style={styles.recView}>
                <Text allowFontScaling={false} style={[styles.text]}>
                  Green Signal Date
                </Text>
                <Text style={[styles.text]} allowFontScaling={false}>
                  {formatDate_InNumber(rowData[item]?.date)}
                </Text>
              </View>
              <View style={styles.recView}>
                <Text allowFontScaling={false} style={[styles.text]}>
                  Stop Loss
                </Text>
                <Text allowFontScaling={false} style={[styles.text]}>
                  {rowData[item]?.stoploss}
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
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                </View>
              </View>
            </>
          )}
        </>
      );
    } else if (rowIndex === 2) {
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
    } else if (rowIndex === 3) {
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
    } else if (rowIndex === 4) {
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
    } else if (rowIndex === 5) {
      // let volObject = JSON.parse(rowData[item]);
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
    } else if (rowIndex === 6) {
      return (
        <>
          <Text
            allowFontScaling={false}
            style={[styles.text, {textAlign: [9, 10].includes(rowIndex) ? 'left' : 'center'}]}>
            {rowData?.volume_greatest}
            {rowData?.volume_greatest > 0 ? CONSTANT_TEXT.DAYS_AGO : CONSTANT_TEXT.DAY_AGO}
          </Text>
        </>
      );
    } else if (rowIndex === 9) {
      return (
        <>
          <Text allowFontScaling={false} style={[styles.text]}>
            {rowData?.open}
          </Text>
        </>
      );
    } else if (rowIndex === 13) {
      let temp = JSON.parse(rowData[item]);
      return (
        <>
          <Text
            allowFontScaling={false}
            style={[styles.text, {textAlign: [9, 10].includes(rowIndex) ? 'left' : 'center'}]}>
            {temp?.year_high || CONSTANT_TEXT.BLANK_FIELD}
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
    } else if (rowIndex === 14) {
      let temp = JSON.parse(rowData[item]);
      return (
        <>
          <Text
            allowFontScaling={false}
            style={[styles.text, {textAlign: [9, 10].includes(rowIndex) ? 'left' : 'center'}]}>
            {temp?.year_low || '---'}
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
          style={[styles.text, {textAlign: [8, 9].includes(rowIndex) ? 'center' : 'center'}]}>
          {rowData[item]}
        </Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Left Column */}
      <View style={styles.tableContainer}>
        <View style={styles.leftCol}>
          {/* Symbol Cell */}
          <TouchableWithoutFeedback>
            <View style={styles.blankCell}>
              <Text
                allowFontScaling={false}
                style={{
                  color: '#4A5568',
                  fontSize: normalizeFont(14),
                  fontWeight: '400',
                }}>
                Symbol
              </Text>
            </View>
          </TouchableWithoutFeedback>
          {/* Left Container : scroll synced */}
          <ScrollView
            ref={leftRef}
            style={styles.mainScroll}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}>
            <Table>
              {symblolColumn &&
                symblolColumn.map(
                  (
                    {
                      symbol,
                      symbol_id,
                      segment,
                    }: {symbol: string; symbol_id: number; segment: string},
                    index: number,
                  ) => (
                    <View key={index} style={[styles.rowbox]}>
                      <Text
                        allowFontScaling={false}
                        style={styles.txtsymbolName}
                        onPress={() => {
                          navigation('SearchDetailScreen', {
                            symbol: symbol,
                            segment: segment,
                          });
                        }}>
                        {symbol?.replace('%26', '&') ?? ''}
                      </Text>
                    </View>
                  ),
                )}
            </Table>
          </ScrollView>
        </View>
        {/* Right Column */}
        <View style={styles.rightCol}>
          <ScrollView horizontal={true} bounces={false}>
            <View>
              <ScrollView horizontal>
                {PricestockTable.tableHead.map((item, index) => (
                  <View
                    key={`stock${index}`}
                    style={[
                      styles.tableHeader,
                      {
                        width: PricestockTable.widthArrsell[index],
                      },
                    ]}>
                    <Text allowFontScaling={false} style={[styles.headertxt]}>
                      {item?.label}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <ScrollView
                ref={rightRef}
                style={styles.dataWrapper}
                scrollEventThrottle={16}
                bounces={false}
                onScroll={({nativeEvent}) => {
                  const {y} = nativeEvent.contentOffset;
                  leftRef.current?.scrollTo({y, animated: false});
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
                            {backgroundColor: index % 2 === 0 ? '#fff' : '#f5f5f5'},
                          ]}>
                          {tableHeaders.map((item: any, rowIndex: number) => (
                            <View
                              key={`tableHead${rowIndex}`}
                              style={[
                                styles.cell,
                                {
                                  width: PricestockTable.widthArrsell[rowIndex],
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
    </View>
  );
};
export default PriceActionTable;
