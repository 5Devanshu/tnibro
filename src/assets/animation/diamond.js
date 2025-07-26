import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';

const DiamondAnimation = ({ focused }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animation/diamond.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={[focused ? { color: '#228B22' } : { color: '#4A4A4A' }, { fontSize: 11, fontWeight: '700',marginTop:-5 }]}>Go Premium</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:-15
  },
  animation: {
    width: 70,
    height: 70,
    resizeMode:"contain"
  },
});

export default DiamondAnimation;
