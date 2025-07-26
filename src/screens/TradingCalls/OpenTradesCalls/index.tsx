import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, LayoutAnimation, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, normalizeFont, scaleHeight, scaleWidth, styleBase } from '../../../Constants/enums';
import FONTS from '../../../Constants/enums/Fonts';
import TradingCallsCards from '../TradingCallsCards';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OpenTradesCalls = props => {
  const { activeOption, message, activeTab } = props;

  const [expandedPlan, setExpandedPlan] = useState(null);
  const [opneCashData, setOpneCashData] = useState([]); //main data listing
  const [opneFuturesData, setFuturesData] = useState([]); //main data listing
  const [active_PlanCode, setActive_PlanCode] = useState('');
  AsyncStorage.getItem('active_PlanCode').then(value => {
    setActive_PlanCode(value)
  });

  const AdvisoryTradeData = useSelector((state: any) => state.AdvisoryTradeSlice);
  const { isTradingCallsOpenCashSuccess, isloading, isTradingCallsOpenFuturesSuccess } =
    AdvisoryTradeData;

  useEffect(() => {
    setOpneCashData(isTradingCallsOpenCashSuccess?.response?.data || []);
  }, [isTradingCallsOpenCashSuccess]);

  useEffect(() => {
    setFuturesData(isTradingCallsOpenFuturesSuccess?.response?.data || []);
  }, [isTradingCallsOpenFuturesSuccess]);

  const toggleExpand = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedPlan(expandedPlan === index ? null : index);
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
    <View style={styles.container}>
      {/* {isredAlertLoads && <Loader />} */}
      <View style={styles.selectedValueContainer}>
        {activeOption === 'CASH' ? (
          <FlatList
            data={opneCashData}
            // keyExtractor={item => item.id}
            keyExtractor={(item, index) => item?.id?.toString() || index.toString()}

            renderItem={({ item, index }) => (
              <TradingCallsCards
                item={item}
                onToggle={() => toggleExpand(index)}
                isExpanded={expandedPlan === index}
                message={message}
                active_PlanCode={active_PlanCode}
                activeOption={activeTab}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmpty}
          />
        ) : (
          <FlatList
            data={opneFuturesData}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <TradingCallsCards
                item={item}
                onToggle={() => toggleExpand(index)}
                isExpanded={expandedPlan === index}
                message={message}
                active_PlanCode={active_PlanCode}
                activeOption={activeTab}
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

export default React.memo(OpenTradesCalls);
