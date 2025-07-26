import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import FONTS from '../../Constants/enums/Fonts';
import IMAGES from '../../Constants/enums/ImagesEnum';
import { COLORS, normalizeFont, scaleHeight, scaleWidth, styleBase } from '../../Constants/enums';
import { formatDate_InNumber } from '../Dashboard/TableComponent/utils';
import { formatDateTime } from '../../utils/dateConverter';
import { addCommaToCurrency } from '../../utils/digitCommaSeparator';
import { navigation } from '../../Navigation/NavigationService';
import { showSubscriptionAlert } from '../../utils/showSubscriptionAlert';
import { deepLinkPayment } from '../../apis/Onboarding/authenticationSlice';
import { useDispatch } from 'react-redux';

const CardList = ({ item, closeTrade = false, activeTab, active_PlanCode, message }) => {
  const screenWidth = Dimensions.get('window').width;
  const dropdownWidth = screenWidth - 100
  const dispatch = useDispatch();

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {/* Header with Date and Status */}
        <View style={styles.header}>
          <Image source={IMAGES.CalenderTrade} style={styles.calenderImage} />
          <Text style={styles.postedDate} allowFontScaling={false}>
            Posted on {formatDateTime(item?.created_at) || '-'}
          </Text>
        </View>
        {/* closed Trade  */}
        {item?.adviosry_status === 'CLOSED' && (
          <View style={[styles.header2, { marginTop: scaleHeight(10) }]}>
            <Image source={IMAGES.closedIcon} style={styles.calenderImage} />
            <Text style={styles.txtCloseTrade} allowFontScaling={false}>
              Trade Closed on {formatDate_InNumber(item?.advisoury_end_date) || '-'}
            </Text>
          </View>
        )}
        {/* Stock Info */}
        <View style={styles.stockInfoContainer}>
          <View style={styles.stockHeader}>
            {/* stock Name */}
            {(active_PlanCode !== 'ADV4499' && activeTab === 'OPEN_TRADE') ?
              <TouchableOpacity onPress={() => {
                dispatch(deepLinkPayment("ADV4499"));
                return setTimeout(() => {
                  showSubscriptionAlert();
                }, 500);
              }}>
                <Image source={IMAGES.SUBSCRIPTION_LOCK.BlurRectangle} style={{ height: 50, width: dropdownWidth, resizeMode: 'contain' }} />
              </TouchableOpacity> : <View style={styleBase.inRow}>
                <TouchableOpacity onPress={() => {
                  navigation('SearchDetailScreen', {
                    symbol: item?.symbol_name,
                    segment: 'cash',
                  });
                }}>
                  <Text style={styles.stockName} allowFontScaling={false}>
                    {item?.symbol_name || '-'}
                  </Text>
                </TouchableOpacity>

                {item?.is_star ?? <Image source={IMAGES.STAR_ICON} style={styleBase.starStyle} />}
              </View>}
            {/* Net Gain */}
            {item?.adviosry_status === 'CLOSED' && (
              <View style={styles.netGainContainer}>
                <Text style={styles.netGainLabel} allowFontScaling={false}>
                  Net gain:{' '}
                </Text>
                {item?.profit_loss ? (
                  <View
                    style={[
                      styles.netGainBox,
                      {
                        backgroundColor:
                          item?.profit_loss && parseFloat(item?.profit_loss) > 0
                            ? COLORS.PrimaryGreen
                            : '#FF4D4F',
                      },
                    ]}>
                    <Image
                      source={
                        item?.profit_loss && parseFloat(item?.profit_loss) > 0
                          ? IMAGES.WhiteUpicon
                          : IMAGES.GreenDownIcon
                      }
                      style={styles.gainIcon}
                    />
                    <Text style={styles.netGainValue} allowFontScaling={false}>
                      {item?.profit_loss || '-'}
                    </Text>
                  </View>
                ) : (
                  <Text>-</Text>
                )}
              </View>
            )}
          </View>
          {(active_PlanCode !== 'ADV4499' && activeTab === 'OPEN_TRADE') && (
            <Text style={{ fontSize: 12, paddingTop: 3, color: 'red', fontWeight: '700' }}>
              {'These trading calls are only for PRO ADVISORY plan'}
            </Text>
          )}

          {(activeTab === 'OPEN_TRADE' ? active_PlanCode === 'ADV4499' : true) && <Text style={{ fontSize: 10, color: '#000' }}>{item?.company_name}</Text>}
        </View>
        {/* Deccription */}
        {item?.description &&
          (activeTab === 'OPEN_TRADE' ? active_PlanCode === 'ADV4499' : true) && (
            <Text
              style={{
                color: COLORS.PrimaryBlack,
                fontSize: normalizeFont(10),
                fontFamily: FONTS.RobotoRegular,
                marginTop: scaleHeight(6),
              }}>
              {item?.description}
            </Text>
          )}

        {/* { Target Hit - Miss } */}
        {item?.adviosry_status === 'CLOSED' && !item?.exit_price && !item?.exit_price_date && (
          <View
            style={{
              backgroundColor: item?.is_target_hit === true ? COLORS.PrimaryGreen : '#FF4D4F',
              marginTop: scaleHeight(12),
            }}>
            <Text style={styles.targetHitTxt} allowFontScaling={false}>
              {item?.is_target_hit === true ? 'TARGET HIT' : 'TARGET MISS'}
            </Text>
          </View>
        )}
        {/* Early Exit */}
        {item?.adviosry_status === 'CLOSED' && item?.exit_price && item?.exit_price_date && (
          <View
            style={{
              backgroundColor: '#4A4A4A',
              marginTop: scaleHeight(12),
            }}>
            <Text style={styles.targetHitTxt} allowFontScaling={false}>
              {'EARLY EXIT'}
            </Text>
          </View>
        )}
        {/* Suggested Entry */}
        <View style={styles.suggestedView}>
          <Text style={styles.suggestedEntryText} allowFontScaling={false}>
            Suggested Entry At {addCommaToCurrency(item?.entry_price || '-')}
          </Text>
        </View>

        {/* Exite Price */}
        {item?.adviosry_status === 'CLOSED' && item?.exit_price && item?.exit_price_date && (
          <View style={styles.entry_rangeContainer}>
            <Text style={styles.suggestedEntryText2} allowFontScaling={false}>
              EXIT PRICE {addCommaToCurrency(item?.exit_price || '-')}
            </Text>
          </View>
        )}
        {/* Entry Range */}
        {item?.adviosry_status === 'OPEN' && (
          <View style={styles.entry_rangeContainer}>
            <Text style={styles.suggestedEntryText2} allowFontScaling={false}>
              ENTRY RANGE {item?.price_range || '-'}
            </Text>
          </View>
        )}
        {/* </View> */}
        {/* Details: Stoploss, Target, Duration */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel} allowFontScaling={false}>
              Stoploss
            </Text>
            <Text style={styles.detailValue} allowFontScaling={false}>
              {item?.stoploss_price ? '₹ ' : ''} {addCommaToCurrency(item?.stoploss_price || '-')}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel} allowFontScaling={false}>
              Target
            </Text>
            <Text style={styles.detailValue} allowFontScaling={false}>
              ₹ {addCommaToCurrency(item?.target_price || '-')}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel} allowFontScaling={false}>
              Hold
            </Text>
            <Text style={styles.detailValue} allowFontScaling={false}>
              {item?.adviosry_duration || '-'}
            </Text>
          </View>
        </View>

        {/* PDF and Share Button */}
        {(activeTab === 'OPEN_TRADE' ? active_PlanCode === 'ADV4499' : true) && <View style={styles.pdfContainer}>
          <TouchableOpacity style={styles.pdfButton}>
            <Image source={IMAGES.pdfIcon} style={styles.pdfIcon} />
            <Text style={styles.pdfText} allowFontScaling={false} numberOfLines={1}>
              {item?.file_name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              () => {
                message('Downloaded Successfully', 'success')
                setTimeout(() => {
                  Linking.openURL(item?.file)
                }, 3000)
              }}>
            <Image source={IMAGES.DownloadIcon} style={styles.shareIcon} />
          </TouchableOpacity>
        </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F4F5F7',
    borderRadius: scaleWidth(18),
    borderColor: '#B8B8B8',
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(18),
    marginBottom: scaleHeight(16),
  },
  cardContent: {
    backgroundColor: COLORS.PrimaryWhite,
    borderColor: '#4BD874',
    borderWidth: 0.5,
    borderRadius: scaleWidth(31),
    paddingHorizontal: scaleWidth(15),
    paddingTop: scaleHeight(15),
    paddingBottom: scaleHeight(10),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PrimaryGreen,
    position: 'absolute',
    alignSelf: 'center',
    marginTop: -15,
    padding: 7,
    borderRadius: 17,
  },
  calenderImage: {
    height: scaleHeight(20),
    width: scaleWidth(20),
    resizeMode: 'contain'
  },
  header2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postedDate: {
    color: COLORS.PrimaryWhite,
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoMedium,
    marginLeft: scaleWidth(5),
  },
  txtCloseTrade: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(14),
    fontWeight: '700',
    fontFamily: FONTS.RobotoRegular,
    marginLeft: scaleWidth(5),
  },
  targetHitTxt: {
    alignSelf: 'center',
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoMedium,
    paddingVertical: scaleHeight(6),
    color: COLORS.PrimaryWhite,
  },
  stockInfoContainer: {
    marginTop: scaleHeight(13),
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stockName: {
    fontSize: normalizeFont(20),
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoBold,
    letterSpacing: 1,
  },
  netGainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  netGainLabel: {
    fontSize: normalizeFont(12),
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoRegular,
    letterSpacing: 0.4,
  },
  netGainBox: {
    flexDirection: 'row',
    backgroundColor: '#007424',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(2),
    paddingVertical: scaleHeight(2),
    borderRadius: scaleWidth(3),
  },
  gainIcon: {
    height: scaleHeight(10),
    width: scaleWidth(12),
    resizeMode: 'contain'
  },
  netGainValue: {
    fontSize: normalizeFont(12),
    color: COLORS.PrimaryWhite,
    fontFamily: FONTS.RobotoRegular,
    marginLeft: scaleWidth(5),
  },
  suggestedView: {
    borderRadius: scaleWidth(10),
    paddingVertical: scaleHeight(9),
    backgroundColor: '#265B26',
    marginTop: scaleHeight(12),
  },
  entry_rangeContainer: {
    borderRadius: scaleWidth(10),
    borderColor: COLORS.PrimaryGreen,
    borderWidth: 1,
    paddingVertical: scaleHeight(10),
    marginTop: scaleHeight(9),
  },
  suggestedEntryText: {
    textAlign: 'center',
    fontFamily: FONTS.RobotoMedium,
    fontSize: normalizeFont(14),
    color: COLORS.PrimaryWhite,
  },
  suggestedEntryText2: {
    textAlign: 'center',
    fontFamily: FONTS.RobotoMedium,
    fontSize: normalizeFont(13),
    color: COLORS.PrimaryBlack,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(18),
    marginTop: scaleHeight(15),
  },
  detailItem: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.PrimaryGreen,
    paddingVertical: scaleHeight(13),
    paddingHorizontal: scaleWidth(10),
    borderRadius: 8,
  },
  detailLabel: {
    fontSize: normalizeFont(14),
    color: COLORS.BorderColor,
    fontFamily: FONTS.RobotoMedium,
  },
  detailValue: {
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoRegular,
    color: COLORS.PrimaryBlack,
    marginTop: scaleHeight(7),
  },
  pdfContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    paddingVertical: scaleHeight(7),
    paddingHorizontal: scaleWidth(10),
    borderColor: '#D3D3D3',
    borderWidth: 0.5,
    borderRadius: scaleWidth(65),
    marginBottom: scaleHeight(12),
  },
  pdfButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfIcon: {
    width: scaleWidth(26),
    height: scaleHeight(26),
    marginRight: scaleWidth(10),
    resizeMode: 'contain',
  },
  pdfText: {
    fontSize: normalizeFont(11),
    color: '#1C1C1C',
    fontFamily: FONTS.RobotoRegular,
    width: '75%',
  },
  shareIcon: {
    width: scaleWidth(27.345),
    height: scaleHeight(16.127),
    resizeMode: 'contain',
  },
});

export default React.memo(CardList);
