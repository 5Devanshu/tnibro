import React from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import FONTS from '../../../Constants/enums/Fonts';

const FeaturesList = ({ selectPlan, planDetails }) => {
  const planID = planDetails?.[0]?.id || '';
  // Define excluded features based on plan name
  let excludedFeatures = [];

  if (planID === 8) {
    excludedFeatures = ['Nifty | Bank Nifty | Fin Nifty',];
  } else if (planID === 9) {
    excludedFeatures = ["MCX(Gold,Silver)",'Nifty | Bank Nifty | Fin Nifty'];
  }

  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        borderColor: '#4A4A4A',
        borderWidth: 0.5,
        marginTop: 20,
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          marginBottom: 10,
          borderRadius: 25,
          borderColor: '#4A4A4A',
          borderWidth: 0.5,
          alignSelf: 'center',
          position: 'absolute',
          top: -15,
        }}>
        <Text
          style={{ fontSize: 12, textAlign: 'center', padding: 10, color: '#151716', fontWeight: '700' }}
          allowFontScaling={false}>
          Features
        </Text>
      </View>

      <FlatList
        data={selectPlan}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
            <Text
              style={{
                fontSize: 18,
                color: 'green',
                marginRight: 10,
                fontFamily: FONTS.RobotoBold,
              }}
              allowFontScaling={false}>
              ✓
            </Text>
            <Text
              style={{ fontSize: 16, color: '#000', fontFamily: FONTS.RobotoMedium }}
              allowFontScaling={false}>
              {item}
            </Text>
          </View>
        )}
        keyExtractor={item => item.toString()}
      />

      {excludedFeatures.length > 0 && (
        <View>
          {excludedFeatures.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'red',
                  marginRight: 12,
                  fontFamily: FONTS.RobotoBold,
                }}
                allowFontScaling={false}>
                ✕
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  fontFamily: FONTS.RobotoMedium,
                  // textDecorationLine: 'line-through',
                }}
                allowFontScaling={false}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default React.memo(FeaturesList);
