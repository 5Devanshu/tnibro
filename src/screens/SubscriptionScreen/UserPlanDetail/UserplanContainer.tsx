import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import { normalizeFont, scaleHeight, scaleWidth } from '../../../Constants/enums';
import FONTS from '../../../Constants/enums/Fonts';
import GradientButton from '../../../Components/Button/GradientButton';
import Clipboard from '@react-native-clipboard/clipboard';
import { ToastHandler } from '../../../utils/utils';
import { addCommaToCurrency } from '../../../utils/digitCommaSeparator';

export const UserplanContainer = ({ item, isExpanded, onToggle }) => {
  return (
    <View
      style={[
        styles.planContainer,
        {
          backgroundColor: item?.is_topup ? '#fff' : '#fff',
          borderColor: item?.is_topup ? '#228B22' : '#4A4A4A',
        },
      ]}>
      {!item?.is_topup && (
        <View style={styles.planHeader}>
          <View style={styles.planDetails}>
            <Image source={IMAGES.LOGOSTOCKYAARI} style={styles.planIcon} />
            <View style={styles.planTextContainer}>
              <View style={styles.planStatus}>
                <Text style={styles.planName} allowFontScaling={false}>
                  {item?.plan_name[0]?.name}
                </Text>
                <View style={styles.activeIndicator} />
                <Text style={styles.txtactive} allowFontScaling={false}>
                  Active
                </Text>
              </View>
              <Text style={styles.date} allowFontScaling={false}>
                {item?.payment_date} - {item?.payment_end_date}
              </Text>
            </View>
          </View>

          <View style={styles.planPriceContainer}>
            <Text style={styles.planPrice} allowFontScaling={false}>
              ₹ {addCommaToCurrency(item?.amount)}
            </Text>
            <Text style={styles.planBilling} allowFontScaling={false}>
              {item?.plan_name[0]?.interval}-{item?.plan_name[0]?.interval_unit}
            </Text>
          </View>
        </View>
      )}
      <View>
        <View style={styles.planHeader}>
          <View style={styles.planDetails}>
            <Image source={IMAGES.Subscription_Alert} style={styles.AlertIcon} />
            <View>
              <Text style={styles.planName} allowFontScaling={false}>
                Alerts
              </Text>
              {item?.is_topup && (
                <Text style={[styles.alertMonthly]} allowFontScaling={false}>
                  Alerts Top up
                </Text>
              )}
            </View>
          </View>
          <Text style={styles.alertNumbers} allowFontScaling={false}>
            {item?.used_alerts}/{item?.total_alerts}
          </Text>
        </View>
        {(!item?.is_topup && item?.provider_order_id) && <Text
          allowFontScaling={false}
          onLongPress={() => {
            Clipboard.setString(item?.provider_order_id);
            ToastHandler(true, 'Copied Successfully');
          }}
          style={[styles.alertMonthly, { marginVertical: 5, flex: 1 }]}
          numberOfLines={1}>
          Transaction No: {item?.provider_order_id}
        </Text>}

        {item?.is_topup && (
          <View style={styles.planHeader}>
            <View style={{ flex: 1 }}>
              <Text
                allowFontScaling={false}
                onLongPress={() => {
                  Clipboard.setString(item?.provider_order_id);
                  ToastHandler(true, 'Copied Successfully');
                }}
                style={[styles.alertMonthly, { marginVertical: 5, flex: 1 }]}
                numberOfLines={1}>
                Transaction No: {item?.provider_order_id}
              </Text>
              <Text style={styles.alertMonthly} allowFontScaling={false}>
                Payment Date: {item?.payment_date}
              </Text>
            </View>
            <Text style={[styles.alertNumbers, { color: '#2C362C' }]} allowFontScaling={false}>
              ₹{item?.amount}
            </Text>
          </View>
        )}
      </View>

      {!item?.is_topup && (
        <GradientButton
          onPress={onToggle}
          text={isExpanded ? 'Currently You Have ▲' : 'Currently You Have ▼'}
          style={{
            paddingVertical: scaleHeight(6),
            paddingHorizontal: scaleWidth(15),
          }}
          mainstyle={{
            borderRadius: scaleWidth(25),
            marginTop: scaleHeight(10),
          }}
        />
      )}

      {/* Features List */}
      {isExpanded && (
        <View style={styles.featuresContainer}>
          {item?.plan_name[0]?.plan_description.split(', ').map((feature, index) => (
            <View style={styles.featureItem} key={index}>
              <Text style={styles.featureCheck} allowFontScaling={false}>
                ✓
              </Text>
              <Text style={styles.featureText} allowFontScaling={false}>
                {feature}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
export default UserplanContainer;
const styles = StyleSheet.create({
  planContainer: {
    backgroundColor: '#fff',
    borderRadius: scaleWidth(5),
    borderWidth: 1,
    borderColor: '#9E9E9E',
    marginBottom: scaleHeight(20),
    paddingVertical: scaleHeight(15),
    paddingHorizontal: scaleWidth(10),
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(5),
    flex: 1,
  },
  planDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  planIcon: {
    height: scaleHeight(32),
    width: scaleWidth(32),
    backgroundColor: '#4BD874',
    borderRadius: scaleWidth(20),
    marginRight: scaleWidth(10),
    resizeMode: 'contain'
  },
  AlertIcon: {
    height: scaleHeight(32),
    width: scaleWidth(32),
    padding: 10,
    marginRight: scaleWidth(10),
    resizeMode: 'contain'
  },
  alertMonthly: {
    fontSize: normalizeFont(12),
    color: '#777',
  },
  planTextContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  planStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  planName: {
    fontSize: normalizeFont(14),
    marginRight: scaleWidth(5),
    color: '#2C362C',
    fontFamily: FONTS.RobotoBold,
    flex: 1,
  },
  alertNumbers: {
    fontSize: normalizeFont(24),
    color: '#228B22',
    fontFamily: FONTS.RobotoBold,
  },
  txtactive: {
    fontSize: normalizeFont(12),
    marginRight: scaleWidth(15),
    color: '#4A4A4A',
    fontFamily: FONTS.RobotoLight,
  },
  date: {
    fontSize: normalizeFont(12),
    marginRight: scaleWidth(5),
    color: '#2B2B2B',
    fontFamily: FONTS.RobotoLight,
    marginTop: scaleHeight(3),
  },
  activeIndicator: {
    backgroundColor: '#228B22',
    height: scaleHeight(9),
    width: scaleWidth(9),
    borderRadius: scaleWidth(10),
    marginHorizontal: scaleWidth(5),
  },
  planPriceContainer: {
    alignItems: 'flex-end',
  },
  planPrice: {
    fontSize: normalizeFont(26),
    fontFamily: FONTS.RobotoBold,
    color: '#2C362C',
  },
  planBilling: {
    fontSize: normalizeFont(13),
    color: '#4A4A4A',
    fontWeight: '700',
    fontFamily: FONTS.RobotoLight,
  },
  featuresContainer: {
    marginTop: scaleHeight(10),
    backgroundColor: '#F4F5F7',
    padding: 15,
    borderRadius: scaleWidth(6),
    borderWidth: scaleWidth(1),
    borderColor: '#228B22',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(10),
  },
  featureCheck: {
    fontSize: normalizeFont(18),
    color: 'green',
    marginRight: scaleWidth(10),
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: normalizeFont(16),
    flex: 1,
    color: '#2C362C',
    fontFamily: FONTS.RobotoMedium,
  },
});
