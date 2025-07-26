import {StyleSheet} from 'react-native';
import {scaleWidth, scaleHeight, normalizeFont} from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  containerCard: {
    marginTop: 200,
    position: 'relative',
    backgroundColor: '#FFF',
    margin: 50,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  closeContainer: {
    position: 'absolute',
    right: -10,
    top: -10,
  },
  sortIcon: {
   height: 25,
    width: 25,
    resizeMode:'contain'
  },
  txtheading: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 28,
    color: '#181818',
    marginTop: 31,
  },
  SecondContainer: {
    marginTop: 22,
    position: 'relative',
    backgroundColor: '#FFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  txtline: {
    marginTop: 13,
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 28,
    color: '#181818',
    textAlign: 'center',
  },
  txtheader: {
    color: '#181818',
    fontSize: 12,
    // fontWeight: '200',
    marginTop: 15,
    lineHeight: 28,
    fontFamily:FONTS.RobotoRegular
  },
  mainView: {
    alignSelf: 'flex-start',
    marginTop: 15,
    flexDirection: 'row',
  },

  borderline: {
    borderWidth: 0.5,
    borderColor: '#D2D2D2',
    marginVertical: 19,
  },
  containerMargin: {
    marginHorizontal: scaleWidth(37),
  },
  txtRemovewatchlist: {
    color: '#181818',
    fontSize: 12,
    // fontWeight: '200',
    lineHeight: 28,
    fontFamily:FONTS.RobotoRegular
  },
  RemoveButtonView: {
    alignSelf: 'flex-start',
    marginTop: 21,
    marginBottom: 19,
  },
});
export default styles;
