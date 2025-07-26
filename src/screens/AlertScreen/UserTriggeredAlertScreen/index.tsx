import React, { useEffect, useMemo } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { useralertTriggeredList } from '../../../apis/Onboarding/totalAlertSlice';
import MainContainer from '../../../Components/MainContainer';
import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';
import { goBack } from '../../../Navigation/NavigationService';
import {
  COLORS,
  CONSTANT_TEXT,
  HEADER_TITLE,
  normalizeFont,
  scaleHeight,
  scaleWidth,
  styleBase,
} from '../../../Constants/enums';
import FONTS from '../../../Constants/enums/Fonts';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import { addCommaToCurrency } from '../../../utils/digitCommaSeparator';
import { formatDateNew, formatDateNewRev } from '../../../utils/dateConverter';

const UserTriggeredAlertScreen: React.FC = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const totalalertData = useSelector((state: any) => state.totalalert);
  const { isUserTriggeredAlertLoad, isUSerTriggeredAlertSuccess } = totalalertData;

  useEffect(() => {
    if (isFocused) {
      dispatch(useralertTriggeredList());
    }
  }, [isFocused, dispatch]);

  // Memoizing ListHeader
  const ListHeaderUserAlert = useMemo(() => (
    <Text style={styles.headerText} allowFontScaling={false}>
      {CONSTANT_TEXT.TOTAL_TRIGGER_ALERTS} : {isUSerTriggeredAlertSuccess?.total_length}
    </Text>
  ), [isUSerTriggeredAlertSuccess]);

  // Memoizing RenderTriggerStock
  const RenderTriggerStock = React.memo(({ item }: { item: any }) => (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.icon} />
        <Text style={styles.symbolValue} allowFontScaling={false}>
          {item?.symbol_id?.name}
        </Text>
        <Image source={IMAGES.STAR_ICON} style={styles.starIcon} />
      </View>
      <View style={styles.alertDetails}>
        <View style={styles.alertContainer}>
          <Text style={styles.Alerttitle} allowFontScaling={false}>
            Alert Price
          </Text>
          <Text style={styles.alertvalue} allowFontScaling={false}>
            {addCommaToCurrency(item?.price)}
          </Text>
        </View>
        <View style={styles.alertContainer}>
          <Text style={styles.Alerttitle} allowFontScaling={false}>
            Alert Type
          </Text>
          <Text style={styles.alertvalue} allowFontScaling={false}>
            {item?.alert_type && item?.alert_type === 'Sell Alert' ? 'Red Alert' : ''}
            {item?.alert_type && item?.alert_type === 'Buy Alert' ? 'Green Signal' : ''}
            {item?.alert_type && item?.alert_type === 'Price Alert' ? 'Price Alert' : ''}
          </Text>
        </View>
      </View>
      <View style={styles.alertTimes}>
        <Text style={[styles.alertTriggeron, { paddingBottom: 5 }]} allowFontScaling={false}>
          ALERT CREATED ON : {formatDateNew(item?.set_alert_time)}
        </Text>
        <Text style={styles.alertTriggeron} allowFontScaling={false}>
          ALERT TRIGGERED ON : {formatDateNewRev(item?.triggered_alert_time)}
        </Text>
      </View>
    </View>
  ));

  const EmptyList = () => (
    <View style={[styleBase.emptyContainer, { flex: 1, marginTop: 100 }]}>
     <Image source={IMAGES.noRecord2} style={{ resizeMode: 'contain', height: 200, width: 200 ,marginBottom:20 }} />
      <Text style={{ color: '#2C362C', fontFamily: FONTS.RobotoRegular, fontSize: normalizeFont(20) }}>
        No Alerts Triggered !
      </Text>
    </View>
  );

  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <TitleWithBackBtnHeader
        centerTitle={HEADER_TITLE.YOUR_STOCK_ALERT}
        onPressBackArrow={() => goBack()}
      />
      {isUserTriggeredAlertLoad ? (
        <View style={styleBase.emptyContainer}>
          <ActivityIndicator color={COLORS.LOADER_COLOR} size={'large'} />
        </View>
      ) : (
        <View style={styles.screenContainer}>
          <FlatList
            data={isUSerTriggeredAlertSuccess?.response || []}
            renderItem={({ item }) => <RenderTriggerStock item={item} />}
            ListHeaderComponent={ListHeaderUserAlert}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={EmptyList}
          />
        </View>
      )}
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginHorizontal: scaleWidth(30),
  },
  headerText: {
    marginTop: 15,
    color: '#2C362C',
    fontFamily: FONTS.RobotoRegular,
    marginBottom: scaleHeight(16),
    fontSize: normalizeFont(15),
  },
  container: {
    backgroundColor: '#FFF',
    paddingVertical: scaleHeight(15),
    borderLeftWidth: scaleWidth(4),
    borderLeftColor: '#ADADAD',
    paddingHorizontal: scaleWidth(20),
    marginBottom: scaleHeight(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: scaleWidth(8),
    width: scaleWidth(8),
    borderRadius: scaleWidth(8),
    backgroundColor: '#ADADAD',
  },
  symbolValue: {
    fontSize: normalizeFont(18),
    color: '#2C362C',
    fontFamily: FONTS.RobotoBold,
    marginLeft: scaleWidth(10),
  },
  starIcon: styleBase.starStyle,
  alertDetails: {
    flexDirection: 'row',
    marginTop: scaleHeight(6),
    marginLeft: scaleWidth(17),
    marginBottom: scaleHeight(12),
  },
  alertContainer: {
    borderWidth: scaleWidth(1),
    borderColor: '#B8B8B8',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleWidth(5),
    marginRight: scaleWidth(5),
  },
  Alerttitle: {
    color: '#2C362C',
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoMedium,
  },
  alertvalue: {
    color: '#4E4E4E',
    fontSize: normalizeFont(11),
    fontFamily: FONTS.RobotoRegular,
    marginTop: scaleHeight(2),
  },
  alertTimes: {
    marginLeft: scaleWidth(17),
  },
  alertTriggeron: {
    color: '#2C362C',
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoRegular,
    letterSpacing: 0.8,
  },
});

export default React.memo(UserTriggeredAlertScreen);
