import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FONTS from '../../Constants/enums/Fonts';
import {COLORS, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';

const TabBarCompo = ({activeTab, setActiveTab}) => {
  return (
    <View style={[styles.tabBar, {backgroundColor: '#F4F5F7'}]}>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'OPEN_TRADE' ? styles.activeTab : styles.inactiveTab,
        ]}
        onPress={() => setActiveTab('OPEN_TRADE')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'OPEN_TRADE' ? styles.activeTabTxt : styles.inactiveTabTxt,
          ]}
          allowFontScaling={false}>
          OPEN TRADES
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'CLOSE_TRADE' ? styles.closetrade_activeTab : styles.inactiveTab,
        ]}
        onPress={() => setActiveTab('CLOSE_TRADE')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'CLOSE_TRADE' ? styles.activeTabTxt : styles.inactiveTabTxt,
          ]}
          allowFontScaling={false}>
          CLOSED TRADE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderRadius: scaleWidth(48),
    borderColor: '#D4D4D4',
  },
  tabButton: {
    paddingVertical: scaleHeight(14),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleWidth(73),
  },
  activeTab: {
    backgroundColor: COLORS.PrimaryGreen, // Active tab color
  },
  closetrade_activeTab: {
    backgroundColor: '#FF4D4F', // Active tab color
  },
  inactiveTab: {
    backgroundColor: '#F4F5F7', // Inactive tab color
  },
  tabText: {
    fontSize: normalizeFont(12),
    color: COLORS.PrimaryWhite,
    fontFamily: FONTS.RobotoBold,
    letterSpacing: 1,
    paddingHorizontal: scaleWidth(32),
  },
  activeTabTxt: {
    color: COLORS.PrimaryWhite, // Active tab color
  },
  inactiveTabTxt: {
    color: COLORS.BorderColor, // Inactive tab color
  },
});

export default React.memo(TabBarCompo);
