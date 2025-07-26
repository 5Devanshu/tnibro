import {Platform, StyleSheet} from 'react-native';
import {
  COLORS,
  FixedValue,
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../../../../Constants/enums';
import FONTS from '../../../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  Container: {
    marginTop: Platform.OS === 'android' ? scaleHeight(10) : 0,
  },
  header: {
    // marginTop: scaleHeight(2),
    // marginBottom: scaleHeight(20),
    // marginLeft: scaleWidth(25),
    // color: '#2C362C',
    // fontSize: normalizeFont(17),
    // fontFamily: FONTS.RobotoBold,
  },

  searchBox: {
    backgroundColor: COLORS.PrimaryBackGround,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scaleWidth(25),
    paddingHorizontal: scaleWidth(8),
    marginTop: scaleHeight(28),
    marginBottom: scaleHeight(19),
    padding: Platform.OS === 'ios' ? scaleHeight(12) : scaleHeight(0),
    borderWidth: scaleWidth(1),
    borderColor: '#D6D6D6',
    borderRadius: scaleWidth(13),
    ...Platform.select({
      ios: {},
      android: {
        height: scaleHeight(44),
      },
    }),
  },
  searchIcon: {
    height: scaleWidth(24),
    width: scaleWidth(24),
    marginRight: scaleWidth(10),
  },
  searchInput: {
    flex: 1,
    fontSize: normalizeFont(12),
    color: '#878787',
    fontWeight: '400',
  },
  cardContainer: {
    // marginTop: scaleHeight(FixedValue.CONSTANT_VALUE_35),
    paddingBottom: scaleHeight(FixedValue.CONSTANT_VALUE_70),
  },
});

export default styles;
