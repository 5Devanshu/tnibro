import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';

const WatchNowAnimation = ({  }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animation/watchNow.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 50,
    height: 50,
    resizeMode:"contain"
  },
});

export default WatchNowAnimation;
