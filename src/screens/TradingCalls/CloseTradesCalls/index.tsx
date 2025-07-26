import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, LayoutAnimation, FlatList, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS, normalizeFont, scaleHeight, scaleWidth, styleBase} from '../../../Constants/enums';
import FONTS from '../../../Constants/enums/Fonts';
import {Loader} from '../../../Components/Loader';
import TradingCallsCards from '../TradingCallsCards';
import IMAGES from '../../../Constants/enums/ImagesEnum';

const CloseTradesCalls = props => {
  const {activeOption,message} = props;

  const [expandedPlan, setExpandedPlan] = useState(null);
  const [closeCashData, setCloseCashData] = useState(['']); //main data listing
  const [closeFuturesData, setFuturesData] = useState(['']); //main data listing

  const AdvisoryTradeData = useSelector((state: any) => state.AdvisoryTradeSlice);
  const {isTradingCallsCloseCashSuccess, isloading, isTradingCallsCloseFuturesSuccess} =
    AdvisoryTradeData;

  useEffect(() => {
    setCloseCashData(isTradingCallsCloseCashSuccess?.response?.data);
  }, [isTradingCallsCloseCashSuccess]);

  useEffect(() => {
    setFuturesData(isTradingCallsCloseFuturesSuccess?.response?.data);
  }, [isTradingCallsCloseFuturesSuccess]);

  const toggleExpand = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedPlan(expandedPlan === index ? null : index);
  };
  const renderEmpty = () => {
    return (
      <View style={styleBase.emptyContainer}>
        <Image source={IMAGES.noRecord2} style={{ marginTop: 50, resizeMode: 'contain', height: 200, width: 200 }}/>
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
      {/* {isredAlertLoads && <Loader />} */}
      <View style={styles.selectedValueContainer}>
        {activeOption === 'CASH' ? (
          <FlatList
            data={closeCashData}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <TradingCallsCards
                item={item}
                onToggle={() => toggleExpand(index)}
                isExpanded={expandedPlan === index}
                CloseTrade={true}
                message={message}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmpty}
          />
        ) : (
          <FlatList
            data={closeFuturesData}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <TradingCallsCards
                item={item}
                onToggle={() => toggleExpand(index)}
                isExpanded={expandedPlan === index}
                CloseTrade={true}
                message={message}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmpty}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: scaleHeight(20),
  },
  selectedValueContainer: {
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

export default React.memo(CloseTradesCalls);
