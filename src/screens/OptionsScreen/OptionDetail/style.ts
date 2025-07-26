import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants/enums/colorsEnum';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  //   header: {
  //     backgroundColor: '#F5F5F5',
  //     padding: 10,
  //   },
  //   headerText: {
  //     fontWeight: 'bold',
  //   },
  //   itemContainer: {
  //     //padding: 20,
  //     borderLeftWidth: 5,
  //     // borderBottomColor: '#CCCCCC',
  //     marginBottom: 20,
  //   },
  container: {
    flex: 1,
    // paddingTop: 22,
    width: windowWidth, // Set the width to 100% of the screen width
    backgroundColor:COLORS.SecondaryGreen
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  row: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  cell: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    color:COLORS.Black,
  },
  cellWidth: {
    width: windowWidth / 4, // Divide by the number of columns (4 in this case)
  },
  loaderContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
