import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FONTS from '../../Constants/enums/Fonts';
import {COLORS, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';

const TabBarComponent = ({activeTab, setActiveTab}) => {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'GREEN_SIGNAL' ? styles.activeTab : styles.inactiveTab,
        ]}
        onPress={() => setActiveTab('GREEN_SIGNAL')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'GREEN_SIGNAL' ? styles.activeTabTxt : styles.inactiveTabTxt,
          ]}
          allowFontScaling={false}>
          GREEN SIGNAL
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'RED_ALERT' ? styles.activeTabRed : styles.inactiveTab,
        ]}
        onPress={() => setActiveTab('RED_ALERT')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'RED_ALERT' ? styles.activeTabTxt : styles.inactiveTabTxt,
          ]}
          allowFontScaling={false}>
          RED ALERT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: scaleWidth(53),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D4D4D4',
    marginHorizontal: scaleWidth(25),
    backgroundColor: '#F3F9F4',
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(5),
  },
  tabButton: {
    flex: 1,
    paddingVertical: scaleHeight(14),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleWidth(81),
  },
  activeTab: {
    backgroundColor: 'green', // Active tab color
  },
  inactiveTab: {
    backgroundColor: '#F3F9F4', // Inactive tab color
  },
  tabText: {
    fontSize: normalizeFont(12),
    color: '#FFF',
    fontFamily: FONTS.RobotoBlack,
    letterSpacing: 1,
  },
  activeTabTxt: {
    color: '#FFF', // Active tab color
  },
  inactiveTabTxt: {
    color: '#9A9A9A', // Inactive tab color
  },
  activeTabRed: {
    backgroundColor: '#FF3838', // Active tab color for Red Alert
  },
});

export default React.memo(TabBarComponent);
