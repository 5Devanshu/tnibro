import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FONTS from '../../Constants/enums/Fonts';
import {COLORS, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';

const TradingCallsTabBar = ({activeTab, setActiveTab}) => {
  return (
    <View style={styles.tabBar}>
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
          Open Trades
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'CLOSE_TRADE' ? styles.activeTab : styles.inactiveTab,
        ]}
        onPress={() => setActiveTab('CLOSE_TRADE')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'CLOSE_TRADE' ? styles.activeTabTxt : styles.inactiveTabTxt,
          ]}
          allowFontScaling={false}>
          Closed Trades
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabButton: {
    flex: 1,
    paddingBottom: scaleHeight(22),
    alignItems: 'center',
  },
  activeTab: {
    borderBottomColor: COLORS.PrimaryGreen,
    borderBottomWidth: 4,
  },
  inactiveTab: {
    borderBottomColor: COLORS.BorderColor,
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: normalizeFont(16),
    color: COLORS.BorderColor,
    fontFamily: FONTS.RobotoMedium,
    letterSpacing: 1,
  },
  activeTabTxt: {
    color: COLORS.PrimaryBlack,
  },
  inactiveTabTxt: {
    color: COLORS.BorderColor,
  },
});

export default React.memo(TradingCallsTabBar);
