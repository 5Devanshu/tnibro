import React, {useState} from 'react';
import {COLORS} from '../../../Constants/enums/colorsEnum';
import {View, ScrollView, TouchableOpacity, Text, StyleSheet, Platform} from 'react-native';
import {CONSTANT_TEXT} from '../../../Constants/enums/constantText';
import SwitchToggle from 'react-native-switch-toggle';
import {scaleHeight, scaleWidth} from '../../../Constants/enums';
import RefreshDropdown from '../../../Components/DropdownComponent/RefreshDropdown';
import {useSelector} from 'react-redux';

interface Tab {
  text: string;
  onPress: () => void;
}
interface HorizontalButtonGroupProps {
  Taabs: Tab[];
  isAutoRefreshEnabled: boolean;
  handleToggle: () => void;
  handleRefresh: () => void;
  isrefreshTime: string;
}
interface DropdownItem {
  label1: string;
  value: string;
}

const HorizontalButtonGroup: React.FC<HorizontalButtonGroupProps> = ({
  Taabs,
  isAutoRefreshEnabled,
  handleToggle,
  handleRefresh,
  isrefreshTime,
}) => {
  const paymentData = useSelector((state: any) => state.CreateSubscSlice);
  const {isSubscribed} = paymentData;
  const [selectedButtonColor, setSelectedButtonColor] = useState(null);
  const handleButtonPress = index => {
    setSelectedButtonColor(index);
    Taabs[index].onPress();
  };
  const timerefresh = [
    {index: '1', value: '3', label: '3-min'},
    {index: '2', value: '5', label: '5-min'},
    {index: '3', value: '15', label: '15-min'},
  ];
  const nonPrimetimerefresh = [{index: '1', value: '15', label: '15-min'}];
  return (
    <ScrollView
      horizontal
      style={{}}
      contentContainerStyle={styles.scrollContainer}
      showsHorizontalScrollIndicator={false}>
      <View style={{alignItems: 'center', justifyContent: 'center', marginLeft: scaleWidth(30)}}>
        <SwitchToggle
          switchOn={isAutoRefreshEnabled}
          onPress={handleToggle}
          circleColorOn="white"
          circleColorOff="white"
          backgroundColorOn={COLORS.PrimaryGreen}
          backgroundColorOff="lightgray"
          containerStyle={{
            width: scaleWidth(47),
            height: scaleHeight(23),
            borderRadius: scaleWidth(25),
            padding: 5,
          }}
          circleStyle={{
            width: scaleWidth(16),
            height: scaleHeight(16),
            borderRadius: scaleWidth(10),
          }}
        />
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center', marginLeft: scaleWidth(10)}}>
        <RefreshDropdown
          title="Screen Refresh"
          height={550}
          disable={isAutoRefreshEnabled === true ? false : true}
          Value={isrefreshTime}
          data={isSubscribed ? timerefresh : nonPrimetimerefresh}
          defaultValue="all"
          onSelect={(Recommended: DropdownItem) => {
            handleRefresh('refreshtime', Recommended);
          }}
        />
      </View>
      {Taabs.map((Taabs, index) => (
        <View style={{justifyContent: 'flex-end', marginLeft: scaleWidth(10)}}>
          <TouchableOpacity
            key={index}
            style={[styles.button]}
            onPress={() => handleButtonPress(index)}>
            <Text allowFontScaling={false} style={[styles.buttonText]}>
              {Taabs.text}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {},
  button: {
    backgroundColor: '#DFF1E5',
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleHeight(7),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: COLORS.PrimaryGreen, // Change background color for selected button
  },
  selectedTxt: {
    color: COLORS.PrimaryWhite, // Change background color for selected button
  },
  buttonText: {
    color: '#525151',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  switch: {
    transform: Platform.OS === 'ios' ? [{scaleX: 0.7}, {scaleY: 0.7}] : [{scaleX: 1}, {scaleY: 1}],
  },
});

export default HorizontalButtonGroup;
