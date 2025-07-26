import {Platform, StyleSheet} from 'react-native';
import {
  COLORS,
  dynamicSize,
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../../../../Constants/enums';
import FONTS from '../../../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  Container: {
    marginTop: Platform.OS === 'android' ? scaleHeight(10) : 0,
    flexDirection: 'row',
    marginBottom: scaleHeight(20),
    marginHorizontal: scaleWidth(20),
  },
  header: {
    marginTop: scaleHeight(2),
    marginBottom: scaleHeight(20),
    marginLeft: scaleWidth(25),
    color: '#2C362C',
    fontSize: normalizeFont(17),
    fontFamily: FONTS.RobotoBold,
  },
  ActiveGainerTab: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#228B22',
    borderRadius: 15,
    color: 'white',
    overflow: 'hidden',
    textAlign: 'center',
    fontSize: normalizeFont(15.624),
    fontFamily: FONTS.RobotoRegular,
  },
  inActiveTab: {
    fontSize: 15.624,
    fontFamily: FONTS.RobotoRegular,
    color: COLORS.Black,
    fontWeight: '400',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },

  searchBox: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(8),
    // marginTop: scaleHeight(28),

    padding: Platform.OS === 'ios' ? scaleHeight(12) : scaleHeight(0),
    borderWidth: 1,
    borderColor: '#D6D6D6',
    borderRadius: scaleWidth(14),
    ...Platform.select({
      ios: {},
      android: {
        height: scaleHeight(44),
      },
    }),
  },
  searchIcon: {
    height: scaleHeight(24),
    width: scaleWidth(24),
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: normalizeFont(12),
    color: '#878787',
    fontWeight: '400',
  },
  inRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconView: {
    justifyContent: 'space-between',
    marginLeft: scaleWidth(10),
  },
  YoutubeIcon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    resizeMode: 'contain',
  },
  notificationIcon: {
    width: scaleWidth(20),
    height: scaleWidth(24),
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
});

export default styles;
