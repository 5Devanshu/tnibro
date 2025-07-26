import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { COLORS, normalizeFont } from '../../../Constants/enums';
import MainContainer from '../../../Components/MainContainer';
import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';
import { goBack } from '../../../Navigation/NavigationService';
import { useSelector } from 'react-redux';
import AlertScreen from '../index';
import StarStocksAlertScreen from '../StarStocksAlertScreen';

const AlertTabsScreen: React.FC = () => {
  const isStarStocksScreen = useSelector((state: any) => state.HomeScreenSlice?.isStarStocksScreen);
  const [selectedTab, setSelectedTab] = useState<'alerts' | 'starStocks'>('alerts');

  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <TitleWithBackBtnHeader centerTitle="Alerts" onPressBackArrow={() => goBack()} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selectedTab === 'alerts' && styles.activeButton]}
          onPress={() => setSelectedTab('alerts')}
        >
          <Text style={[styles.buttonText, selectedTab === 'alerts' && styles.activeButtonText]}>Your Alerts</Text>
        </TouchableOpacity>
        {isStarStocksScreen && (
          <TouchableOpacity
            style={[styles.button, selectedTab === 'starStocks' && styles.activeButton]}
            onPress={() => setSelectedTab('starStocks')}
          >
            <Text style={[styles.buttonText, selectedTab === 'starStocks' && styles.activeButtonText]}>Star Stocks</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flex: 1, marginTop: 10 }}>
        {selectedTab === 'alerts' ? <AlertScreen /> : <StarStocksAlertScreen />}
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    marginBottom:0,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 5,
    paddingBottom:0,
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#197C5D',
  },
  buttonText: {
    fontSize: normalizeFont(12),
    fontWeight: '600',
    color: '#777',
  },
  activeButtonText: {
    color: '#FFF',
  },
});

export default React.memo(AlertTabsScreen);