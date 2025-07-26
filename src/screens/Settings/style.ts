import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 30,
    },
    settingsHeader: {
      flexDirection:'row',
      justifyContent:'flex-start',
      marginTop: 50
    },
    settingsHeaderTitle: {
      color: '#2B5B1E',
      fontWeight: '400',
      fontSize: 30,
      fontFamily: 'Montreal-Light',
    },
    settingsItem: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-start',
      marginTop: 20,
    },
    settingsItemText: {
      color: '#000',
      fontSize: 16
    },
    settingIcon: {
      width: 20,
      height: 20,
      margin: 10,
    }
  });
  export default styles;