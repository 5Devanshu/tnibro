import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import FONTS from '../../../Constants/enums/Fonts';
import { COLORS, normalizeFont, scaleHeight, scaleWidth, styleBase } from '../../../Constants/enums';
import CardList from '../CardList';
import { Loader } from '../../../Components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import SortDropDown from '../SortDropDown';
import { AdvisoryOpenTrade } from '../../../apis/Onboarding/AdvisoryTradeApi/AdvisoryTradeSlice';
import IMAGES from '../../../Constants/enums/ImagesEnum';

const DropdownData = [
  { label: 'Short Term', value: 's' },
  { label: 'Medium Term', value: 'm' },
  { label: 'Long Term', value: 'l' },
];
const OpenTradeAdvisory = ({ activeTab, active_PlanCode ,message }) => {
  const dispatch = useDispatch();

  const [listOpendata, setListOpenData] = useState(['']); //main data listing
  const [selectedItems, setSelectedItems] = useState('m');

  const AdvisoryTradeData = useSelector((state: any) => state.AdvisoryTradeSlice);
  const { isadvisoryOpenTradeSuccess, isloader } = AdvisoryTradeData;

  useEffect(() => {
    setListOpenData(isadvisoryOpenTradeSuccess?.response?.data);
  }, [isadvisoryOpenTradeSuccess]);

  const handleDropdown = data => {
    setSelectedItems(data?.value); /// state dropdown value
    dispatch(AdvisoryOpenTrade({ status: data?.value }));
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
      {isloader && <Loader />}
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
          data={listOpendata}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <CardList item={item} active_PlanCode={active_PlanCode} activeTab={activeTab} message={message} />}
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

export default React.memo(OpenTradeAdvisory);
