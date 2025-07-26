import React from 'react';
import {StyleSheet, View, Text, Image, Platform} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';

import ModalContainer from '../layout/ModalContainer';
import {
  normalizeFont,
  scaleHeight,
  Percentage,
  GlobalStyleValues,
  FixedValue,
  styleBase,
  CONSTANT_TEXT,
  COLORS,
  scaleWidth,
} from '../../Constants/enums';
import IMAGES from '../../Constants/enums/ImagesEnum';
const styles = StyleSheet.create({
  containerView: {
    ...styleBase.inCenter,
    height: scaleHeight(FixedValue.CONSTANT_VALUE_229),
    backgroundColor: COLORS.White,
    width: Percentage.PRECENTAGE_100,
    borderTopRightRadius: FixedValue.CONSTANT_VALUE_24,
    borderTopLeftRadius: FixedValue.CONSTANT_VALUE_24,
    shadowColor: Platform.OS === 'android' ? '52006A' : '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
  titleText: {
    fontSize: normalizeFont(FixedValue.CONSTANT_VALUE_20),
    lineHeight: scaleHeight(FixedValue.CONSTANT_VALUE_24),
    color: 'black',
    textAlign: GlobalStyleValues.CENTER,
    marginTop: scaleHeight(FixedValue.CONSTANT_VALUE_30),
    marginBottom: scaleHeight(FixedValue.CONSTANT_VALUE_10),
  },
  descText: {
    fontSize: normalizeFont(FixedValue.CONSTANT_VALUE_14),
    lineHeight: scaleHeight(FixedValue.CONSTANT_VALUE_17),
    color: 'black',
    textAlign: GlobalStyleValues.CENTER,
  },
});

const NoInternetModal = (): JSX.Element => {
  const {isConnected} = useNetInfo();
  const onPressOutside = () => {};
  return (
    <ModalContainer
      visible={isConnected === null ? false : !isConnected}
      onPressOutside={onPressOutside}>
      <View style={styles.containerView}>
        <Image
          source={IMAGES.NoNetwork}
          style={{height: scaleHeight(40.61), width: scaleWidth(45)}}
        />
        <Text style={styles.titleText} allowFontScaling={false}>
          {CONSTANT_TEXT.NO_INTERNET_TITLE}
        </Text>
        <Text style={styles.descText} allowFontScaling={false}>
          {CONSTANT_TEXT.NO_INTERNET_DESC}
        </Text>
      </View>
    </ModalContainer>
  );
};

export default NoInternetModal;
