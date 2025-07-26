import {Platform, StyleSheet} from 'react-native';
import {scaleHeight, scaleWidth} from '../../Constants/enums/Dimensions';

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: '#fff',
    flex: 1,
    marginBottom: 200,
  },
  image1: {
    width: '100%',
    height: 70,
    resizeMode: 'contain',
  },
  container: {
    marginTop: 100,
  },
  selectBtnTxt: {
    color: '#000',
    fontWeight: '400',
    fontSize: 20,
    fontFamily: 'Montreal-Light',
    textAlign: 'center',
  },
  forgotDes: {
    alignItems: 'center',
    position: 'relative',
  },
  forgotDesLbl: {
    color: '#000',
    fontFamily: 'Montreal-Light',
    fontSize: 16,
    textAlign: 'center',
  },
  formCon: {
    alignItems: 'center',
  },
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: '#000',
    fontWeight: 'bold',
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  danger: {
    color: 'red',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'Montreal-Light',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(110),
    borderWidth: 1,
    backgroundColor: 'green',
    borderColor: 'green',
    marginBottom: 10,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Montreal-Light',
  },
  registerLbl: {
    color: 'green',
    justifyContent: 'flex-start',
    fontFamily: 'Montreal-Light',
  },
  // registerLbl: {
  //     color: '#0057ff',
  //     fontFamily: 'Montreal-Light',
  // },
  spaceView: {
    padding: 20,
  },
  imageBackground: {
    flex: 1,
    paddingHorizontal: scaleWidth(30),
    backgroundColor: 'pink',
    marginTop: Platform.OS === 'ios' ? 40 : 0,
  },
  bottomStyle: {bottom: 30},
  otpStyling: {
    width: '100%',
    height: 200,
    paddingHorizontal: scaleWidth(30),
  },
  error_style: {
    height: 50,
  },
});
export default styles;
