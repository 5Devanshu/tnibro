import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FONTS from '../../../Constants/enums/Fonts';
import {
  COLORS,
  dynamicSize,
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../../../Constants/enums';
import IMAGES from '../../../Constants/enums/ImagesEnum';

interface FloatingButtonProps {
  onPress: () => void;
  isChecked?: boolean;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({onPress, isChecked}) => {
  return (
    <View style={styles.container}>
      {!isChecked && (
        <View>
          <Image source={IMAGES.raiseticketIcon} style={{height:250,width:250,resizeMode:'contain',alignSelf:'center'}} />
          <Text style={styles.headerTxt} allowFontScaling={false}>
            How Can I Help You?
          </Text>
          <Text style={styles.description} allowFontScaling={false}>
            You can raise a ticket if you have any queries or issues with the app. Our dedicated
            agent will respond within 1-2 business days.
          </Text>
        </View>
      )}
      <TouchableOpacity style={[styles.button]} onPress={onPress}>
        <Text style={styles.buttontxt} allowFontScaling={false}>
          Any problem
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: scaleHeight(50),
    marginHorizontal: scaleWidth(30),
    alignSelf: 'center',
  },
  raiseticketicon: {
    height: scaleHeight(296),
    width: scaleWidth(283),
    alignSelf: 'center',
    marginBottom: scaleHeight(100),
  },
  headerTxt: {
    color: '#151716',
    fontSize: normalizeFont(22),
    fontFamily: FONTS.RobotoBold,
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: scaleHeight(100),
  },
  description: {
    color: '#4A4A4A',
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoRegular,
    marginTop: scaleHeight(17),
    textAlign: 'center',
    lineHeight: dynamicSize(19),
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(90),
    paddingVertical: scaleHeight(16),
    borderRadius: scaleWidth(26),
    marginTop: scaleHeight(48),
    backgroundColor: '#228B22',
  },

  buttontxt: {
    color: COLORS.PrimaryWhite,
    fontSize: normalizeFont(16),
    fontFamily: FONTS.RobotoMedium,
  },
});

export default React.memo(FloatingButton);
