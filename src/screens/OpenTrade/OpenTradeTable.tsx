import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, ScrollView} from 'react-native';
import {COLORS, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';
import IMAGES from '../../Constants/enums/ImagesEnum';
import {navigation} from '../../Navigation/NavigationService';
import {Table} from 'react-native-table-component';
import {stockTable, stockTableRedALert, tableHeaders} from './sortUtils';
import { addCommaToCurrency } from '../../utils/digitCommaSeparator';

const OpenTradeTable = ({
  symbolList = [],
  filteredTableFeed = [],
  sortDirection,
  selectedSort,
  handleDropdown,
  GreenTab,
}) => {
  const leftRef = useRef<ScrollView>(null);
  const rightRef = useRef<ScrollView>(null);

  const getCellContent = (rowIndex: number, rowData: any, item: string) => {
    if (rowIndex === 0) {
      return (
        <Text allowFontScaling={false} style={styles.profitLossText}>
        {rowData?.profit_loss_as_per_high_price || rowData?.profit_loss_as_per_low_price}%
      </Text>
        
      );
    } 
    else if (rowIndex === 1) {
      return (
       <>
          <Text
            allowFontScaling={false}
            style={[
              styles.recommendationText,
              {
                color:
                  rowData?.recommendation === 'Buy' ? COLORS.Binance_green : COLORS.Binance_red,
              },
            ]}>
            {addCommaToCurrency(rowData?.recommendation_price)}
          </Text>
          <Text allowFontScaling={false} style={styles.recommendationDate}>
            {rowData?.recommendation_date}
          </Text>
        </>
      );
    } 
    else if (rowIndex === 2) {
      return (
        <>
          <Text allowFontScaling={false} style={styles.recommendationDate}>
            {addCommaToCurrency(rowData?.max_high_price)  || addCommaToCurrency(rowData?.min_low_price) }
          </Text>
          <Text allowFontScaling={false} style={styles.recommendationDate}>
            {rowData?.max_high_price_date || rowData?.min_low_price_date}
          </Text>
        </>
      );
    } 
    else if (rowIndex === 3) {
      return (
        <Text allowFontScaling={false} style={styles.recommendationDate}>
          {rowData[item]} days ago
        </Text>
      );
    } 
    else {
      return (
        <Text allowFontScaling={false} style={styles.recommendationDate}>
          {rowData[item]}
        </Text>
      );
    }
  };
  return (
    <View style={styles.container}>
      {/* Left Column */}
      <View style={styles.leftColumn}>
        <TouchableOpacity onPress={() => handleDropdown('symbol')}>
          <View style={styles.header}>
            <Text allowFontScaling={false} style={styles.headerText}>
              Symbol
            </Text>
            <Image
              resizeMode="contain"
              style={styles.sortIcon}
              source={
                sortDirection === 'asc' && selectedSort === 'symbol'
                  ? IMAGES.Sorting_Down
                  : IMAGES.Sorting_Up
              }
            />
          </View>
        </TouchableOpacity>
        <ScrollView
          ref={leftRef}
          style={styles.flex}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}>
          <Table>
            {symbolList &&
              symbolList.map(({symbol_name, segment, is_star}, index: number) => (
                <View key={index} style={styles.row}>
                  <TouchableOpacity
                    style={styles.rowContent}
                    onPress={() => {
                      navigation('SearchDetailScreen', {
                        symbol: symbol_name,
                        segment: segment,
                      });
                    }}>
                    <Text allowFontScaling={false} style={styles.symbolText}>
                      {symbol_name}
                    </Text>
                    {is_star && <Image source={IMAGES.STAR_ICON} style={styles.starIcon} />}
                  </TouchableOpacity>
                </View>
              ))}
          </Table>
        </ScrollView>
      </View>
      {/* Right Column */}
      <View style={styles.rightColumn}>
        <ScrollView horizontal={true} bounces={false}>
          <View>
            <View>
              <ScrollView horizontal>
                {GreenTab
                  ? stockTable.tableHead.map((item, index) => (
                      <TouchableOpacity
                        style={styles.flex}
                        key={`stock${index}`}
                        onPress={() => handleDropdown(item.col)}>
                        <View style={[styles.header2, {width: stockTable.widthArr[index]}]}>
                          <Text allowFontScaling={false} style={styles.headerText}>
                            {item?.label}
                          </Text>
                          <Image
                            resizeMode="contain"
                            style={styles.sortIcon}
                            source={
                              sortDirection === 'asc' && selectedSort === item.col
                                ? IMAGES.Sorting_Down
                                : IMAGES.Sorting_Up
                            }
                          />
                        </View>
                      </TouchableOpacity>
                    ))
                  : stockTableRedALert.tableHead.map((item, index) => (
                      <TouchableOpacity
                        style={styles.flex}
                        key={`stock${index}`}
                        onPress={() => handleDropdown(item.col)}>
                        <View style={[styles.header2, {width: stockTable.widthArr[index]}]}>
                          <Text allowFontScaling={false} style={styles.headerText}>
                            {item?.label}
                          </Text>
                          <Image
                            resizeMode="contain"
                            style={styles.sortIcon}
                            source={
                              sortDirection === 'asc' && selectedSort === item.col
                                ? IMAGES.Sorting_Down
                                : IMAGES.Sorting_Up
                            }
                          />
                        </View>
                      </TouchableOpacity>
                    ))}
              </ScrollView>
            </View>
            <ScrollView
              ref={rightRef}
              scrollEventThrottle={16}
              onScroll={({nativeEvent}) => {
                const {y} = nativeEvent.contentOffset;
                leftRef.current?.scrollTo({y, animated: false});
              }}
              bounces={false}>
              <Table>
                {filteredTableFeed &&
                  filteredTableFeed.map((rowData: any, index: number) => (
                    <View key={`stockTab${index}`} style={styles.tableRow}>
                      {tableHeaders.map((item: any, rowIndex: number) => (
                        <View
                          key={`tableHead${rowIndex}`}
                          style={[
                            styles.cell,
                            {
                              width: stockTable.widthArr[rowIndex],
                            },
                          ]}>
                          {getCellContent(rowIndex, rowData, item)}
                        </View>
                      ))}
                    </View>
                  ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  leftColumn: {
    width: scaleWidth(130),
  },
  rightColumn: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    height: scaleHeight(85),
    backgroundColor: COLORS.PrimaryWhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  headerText: {
    alignSelf: 'center',
    color: '#2C362C',
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoMedium,
  },
  sortIcon: {
    width: scaleWidth(25),
    height: scaleHeight(25),
  },
  flex: {
    flex: 1,
  },
  row: {
    height: scaleHeight(55),
    backgroundColor: COLORS.PrimaryWhite,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderRightColor: '#DDDDDD',
    borderBottomColor: '#DDDDDD',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  symbolText: {
    alignSelf: 'center',
    color: '#2C362C',
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoMedium,
  },
  starIcon: {
    height: scaleHeight(18),
    width: scaleWidth(18),
    marginLeft: scaleWidth(5),
  },
  header2: {
    height: scaleHeight(85),
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    borderBottomColor: '#DDDDDD',
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableRow: {
    height: scaleHeight(55),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  cell: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationText: {
    textAlign: 'center',
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoRegular,
  },
  recommendationDate: {
    textAlign: 'center',
    color: '#37383A',
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoRegular,
  },
  profitLossText: {
    textAlign: 'center',
    fontSize: normalizeFont(12),
    color: COLORS.Binance_green,
    fontFamily: FONTS.RobotoBold,
  },
});

export default OpenTradeTable;
