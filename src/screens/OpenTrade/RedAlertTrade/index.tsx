import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text ,Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {sortAllData} from '../sortUtils';
import {Loader} from '../../../Components/Loader';
import {COLORS, normalizeFont, scaleHeight, styleBase} from '../../../Constants/enums';
import FONTS from '../../../Constants/enums/Fonts';
import {OpenTradeRedAlert} from '../../../apis/Onboarding/HomeScreenApi/HomeScreenSlice';
import {useIsFocused} from '@react-navigation/native';
import OpenTradeTable from '../OpenTradeTable';
import IMAGES from '../../../Constants/enums/ImagesEnum';

const RedAlertTrade = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [selectedSort, setSelectedSort] = useState('all');
  const [sortedData, setSortedData] = useState([]);
  const [listOpnedata, setListOpenData] = useState(['']);
  const [sortDirection, setSortDirection] = useState<any>('asc');

  const HomeScreeneData = useSelector((state: any) => state.HomeScreenSlice);
  const {isOpenTradeRedAlertSuccess, isredAlertLoads, openTradelength} = HomeScreeneData;

  const getOpenTradeLData = () => {
    dispatch(OpenTradeRedAlert());
  };

  useEffect(() => {
    if (isFocused) {
      getOpenTradeLData();
    }
  }, [isFocused]);

  let filteredTableFeed =
    sortedData &&
    sortedData.map(item => {
      return item;
    });

  const symbolList =
    filteredTableFeed &&
    filteredTableFeed.map(colData => {
      return {
        symbol_name: colData?.symbol_name,
        segment: colData?.segment,
        is_star: colData?.is_star,
      };
    });
  useEffect(() => {
    setListOpenData(isOpenTradeRedAlertSuccess[0]?.data);
    if (selectedSort === 'all') {
      setSortedData(isOpenTradeRedAlertSuccess[0]?.data);
    }
  }, [isOpenTradeRedAlertSuccess]);

  const handleDropdown = (data: string) => {
    setSelectedSort(data);
    if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortDirection('asc');
    }
    sortAllData(data, listOpnedata, sortDirection, setSortedData); // Default to 'asc' when a new column is selected
  };
  const RenderEmpty = () => {
    return (
      <View style={styleBase.emptyContainer}>
        <Image source={IMAGES.noRecord2} style={{ resizeMode: 'contain', height: 200, width: 200 }}/>
        <Text allowFontScaling={false} style={styles.emptytexthead}>
          No Data Available Yet
        </Text>
        <Text style={styles.emptytexttitle} allowFontScaling={false}>
          "No records found at this moment. Stay tuned for updates!"
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {isredAlertLoads && <Loader />}
      <View style={styles.selectedValueContainer}>
        <>
          {openTradelength > 0 ? (
            <OpenTradeTable
              symbolList={symbolList}
              filteredTableFeed={filteredTableFeed}
              sortDirection={sortDirection}
              selectedSort={selectedSort}
              handleDropdown={handleDropdown}
            />
          ) : (
            <RenderEmpty />
          )}
        </>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: scaleHeight(10),
  },
  selectedValueContainer: {
    // marginTop: scaleHeight(19),
    flex: 1,
  },
  emptytexthead: {
    color: COLORS.Black,
    fontSize: normalizeFont(25),
    fontFamily: FONTS.RobotoBlack,
  },
  emptytexttitle: {
    color: COLORS.Black,
    fontSize: normalizeFont(15),
    marginTop: scaleHeight(10),
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: FONTS.RobotoRegular,
  },
});

export default React.memo(RedAlertTrade);
