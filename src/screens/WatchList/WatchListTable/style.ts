import {Platform, StyleSheet} from 'react-native';
import {scaleHeight, scaleWidth, normalizeFont} from '../../../Constants/enums/Dimensions';
import { COLORS } from '../../../Constants/enums';

const styles = StyleSheet.create({
  headerRight: {
    width: 80,
    height: 36,
    borderRadius: 18,
    marginRight: 25,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // This aligns text vertically
  },
  popUpStyle: {
    backgroundColor: 'black',
  },
  interText: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    color: '#FFFFFF',
    padding: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: normalizeFont(12),
    fontWeight: '500',
    textAlign: 'center',
    marginRight: 10,
    color: '#000',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#E5FFED',
  },
  backgroundcolor: {
    marginTop:5,
    backgroundColor: COLORS.PrimaryBackGround,
    flex: 1,
  },
  container: {
    paddingHorizontal: scaleWidth(20),
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 10,
  },
  backIcon: {
    height: scaleHeight(42),
    width: scaleWidth(42),
    resizeMode:'contain'
  },
  searchBox: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D6D6D6',
    borderRadius: scaleWidth(30),
    ...Platform.select({
      ios: {},
      android: {
        height: scaleHeight(45),
      },
    }),
  },
  searchIcon: {
    height: scaleHeight(24),
    width: scaleWidth(24),
    marginHorizontal:15,
    resizeMode:'contain'
  },
  searchInput: {
    flex: 1,
    fontSize: normalizeFont(10),
    height:40,
    color: '#878787',
    fontWeight: '400',
  },
  header: {
    color: '#333333',
    fontWeight: '700',
    fontSize: 22,
    marginTop: 31,
  },
  description: {
    color: '#7D7D7D',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 22,
    marginTop: 5,
  },
  symContainer: {
    alignItems: 'flex-start',
    marginBottom: scaleHeight(26),
    marginTop: scaleHeight(15),
  },
  symButton: {
    backgroundColor: '#228B22',
    marginLeft:10,
    display: 'flex',
    borderRadius: 22,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleHeight(12),
  },
  symbolText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  plusIcon: {
    height: 13.53,
    width: 13.53,
    marginLeft: 8,
  },
  tableContainer: {
    elevation: 1,
    flex: 1,
    marginBottom:15
  },
  loaderContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: 'red',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  nodataContainer: {
    marginTop:180,
    width: '100%',
    alignItems: 'center',
  },
  imageNodata: {
    width: 200,
    height: 200,
    marginBottom:20,
    resizeMode:'contain'
  },
  textNoData: {
    fontSize: 16,
  },
});
export default styles;
