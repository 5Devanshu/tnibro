import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import FONTS from '../../../Constants/enums/Fonts';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import { COLORS, normalizeFont, scaleHeight, scaleWidth, styleBase } from '../../../Constants/enums';
import CardList from '../CardList';
import { Loader } from '../../../Components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import SortDropDown from '../SortDropDown';
import { AdvisoryCloseTrade } from '../../../apis/Onboarding/AdvisoryTradeApi/AdvisoryTradeSlice';

const DropdownData = [
  { label: 'Short Term', value: 's' },
  { label: 'Medium Term', value: 'm' },
  { label: 'Long Term', value: 'l' },
];
const CloseTradesAdvisory = ({ message }) => {
  const dispatch = useDispatch();

  const [listOpnedata, setListOpenData] = useState(['']); //main data listing
  const [selectedItems, setSelectedItems] = useState('m');

  const AdvisoryTradeData = useSelector((state: any) => state.AdvisoryTradeSlice);
  const { isadvisoryCloseTradeSuccess, isloading } = AdvisoryTradeData;

  useEffect(() => {
    setListOpenData(isadvisoryCloseTradeSuccess?.response?.data);
  }, [isadvisoryCloseTradeSuccess]);

  const handleDropdown = data => {
    setSelectedItems(data?.value); /// state dropdown value
    dispatch(AdvisoryCloseTrade({ status: data?.value }));
  };
  const renderEmpty = () => {
    return (
      <View style={styleBase.emptyContainer}>
        <Image source={IMAGES.noRecord2} style={{ marginTop: 50, resizeMode: 'contain', height: 200, width: 200 }} />
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
    <View style={styles.card}>
      {isloading && <Loader />}
      <SortDropDown
        data={DropdownData}
        setSelectedValue={setSelectedItems}
        Value={selectedItems}
        title="Sort By"
        onSelect={value => {
          handleDropdown(value);
        }}
      />
      <View style={styles.selectedValueContainer}>
        <FlatList
          data={listOpnedata}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <CardList item={item} closeTrade={true} message={message} />}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={renderEmpty}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: scaleHeight(28),
    marginHorizontal: scaleHeight(20),
  },
  selectedValueContainer: {
    marginTop: scaleHeight(12),
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

export default React.memo(CloseTradesAdvisory);
