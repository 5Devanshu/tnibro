import {StyleSheet} from 'react-native';
import {COLORS} from '../../Constants/enums/colorsEnum';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
  },
  itemContainer: {
    //padding: 20,
    borderLeftWidth: 5,
    // borderBottomColor: '#CCCCCC',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.SecondaryGreen,
  },
  loaderContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
