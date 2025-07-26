import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {normalizeFont, ROUTE_NAME, scaleHeight} from '../../Constants/enums';
import {WebPagesUrl} from '../../Constants/WebPageUrl';
import FONTS from '../../Constants/enums/Fonts';
import {navigation} from '../../Navigation/NavigationService';

const SubscriptionAgreementText = () => {
  return (
    <Text style={styles.text} allowFontScaling={false}>
      By placing this order, you agree to our{' '}
      <Text
        style={styles.boldText}
        onPress={() => {
          navigation(ROUTE_NAME.WEB_VIEW_PAGE, {
            uri: WebPagesUrl.TERMS_OF_USE,
          });
        }}>
        Terms of Service,{' '}
        <Text
          style={styles.boldText}
          onPress={() => {
            navigation(ROUTE_NAME.WEB_VIEW_PAGE, {
              uri: WebPagesUrl.REFUND_POLICY,
            });
          }}>
          {' '}
          Refund Policy, Disclaimer
        </Text>
      </Text>
      and{' '}
      <Text
        style={styles.boldText}
        onPress={() => {
          navigation(ROUTE_NAME.WEB_VIEW_PAGE, {
            uri: WebPagesUrl.PRIVACY_POLICY,
          });
        }}>
        Privacy Policy
      </Text>
      . Your subscription will auto-renew unless you cancel your subscription at least 24 hours
      before the current term expires.
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: scaleHeight(5),
    textAlign: 'center',
    fontSize: normalizeFont(9),
    marginBottom: scaleHeight(5),
    color: '#000',
  },
  boldText: {
    fontFamily: FONTS.RobotoBold,
  },
});

export default SubscriptionAgreementText;
