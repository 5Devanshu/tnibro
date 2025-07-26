import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../Constants/enums/colorsEnum';
import {normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums/Dimensions';
import { CONSTANT_TEXT } from '../../Constants/enums/constantText';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5FFED',
    flex: 1,
  },
  mainCon: {
    backgroundColor: '#E5FFED',
    flex: 1,
    marginBottom: 200,
  },
  backButtonContainer: {
    marginTop: Platform.OS === 'ios' ? 60 : 30,
    marginHorizontal: 32,
  },
  hitSlop: {
    top: 20,
    bottom: 20,
    left: 50,
    right: 50,
  },
  backButton: {
    height: scaleHeight(42),
    width: scaleWidth(42),
  },
  forgotPasswordContainer: {
    position: 'relative',
    marginHorizontal: 32,
  },
  headline: {
    marginTop: 70,
    color: '#17181A',
    fontSize: 24,
    fontWeight: '700',
  },
title:{
    color: '#5D6166',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 12,
    marginBottom: 49,
},
emailheader:{
  color: '#5D6166',
   fontSize: 12,
    fontWeight: '400'
  },
  imputfield:{
    backgroundColor: '#FFFFFF',
    color: '#8B9199',
    paddingVertical: scaleHeight(14),
    paddingHorizontal: scaleWidth(16),
    fontSize: 16,
    marginTop: 8,
    borderRadius: 12,
  },
  error:{
    color: 'red'
  },
  margintop:{marginTop: 63},
  LoginBtn: {
    backgroundColor: '#339502',
    borderRadius: 16,
    alignSelf: 'center',
  },
  loginBtnLbl: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    paddingVertical: scaleHeight(20),
    paddingHorizontal: scaleWidth(78),
  },
});
export default styles;
