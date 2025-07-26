import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import IMAGES from '../../Constants/enums/ImagesEnum';
import { scaleHeight, scaleWidth, normalizeFont } from '../../Constants/enums/Dimensions';
import { COLORS } from '../../Constants/enums/colorsEnum';
import FONTS from '../../Constants/enums/Fonts';
import MainContainer from '../../Components/MainContainer';
import { styleBase } from '../../Constants/enums';

const data = [
  {
    title: 'Create your Alerts',
    text: 'Set custom alerts and never miss  \nopportunity !',
    image: <Image source={IMAGES.onboarding_1} style={{ height: 300, width: 300, resizeMode: 'contain' }} />,
  },
  {
    title: 'Create your watchlist',
    text: 'Track your favorite stocks \neffortlessly !',
    image: <Image source={IMAGES.onboarding_2} style={{ height: 300, width: 300, resizeMode: 'contain' }} />,
  },
  {
    title: 'Watch Our Tutorial',
    text: ' Watch tutorial and enhance your \nexperience !',
    image: <Image source={IMAGES.onboarding_3} style={{ height: 300, width: 300, resizeMode: 'contain' }} />,
  },
];
const OnBoardingScreen = ({ navigation }) => {
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.indexContainer}>
          <Text style={styles.indextxt} allowFontScaling={false}>
            {index + 1} of 3
          </Text>
        </View>
        {item.image && <View style={styles.mainImage}>{item.image}</View>}
        <Text allowFontScaling={false} style={styles.titleText}>
          {item.title}
        </Text>
        <Text allowFontScaling={false} style={styles.descText}>
          {item.text}
        </Text>
      </View>
    );
  };
  const keyExtractor = item => item.title;

  const renderNextButton = () => {
    return (
      <View style={styleBase.inRow}>
        <View style={styles.rightTextWrapper}>
          <Text allowFontScaling={false} style={styles.rightText}>
            NEXT
          </Text>
        </View>
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <TouchableOpacity
        style={styles.donContinerr}
        onPress={() => navigation.navigate('Login')}>
        <Text allowFontScaling={false} style={styles.doneButtonText}>
          Continue
        </Text>
      </TouchableOpacity>
    );
  };
  const renderPrevButton = () => {
    return (
      <>
        <View style={styles.leftTextWrapper}>
          <Text allowFontScaling={false} style={styles.leftText}>
            SKIP
          </Text>
        </View>
      </>
    );
  };
  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <View style={{ backgroundColor: COLORS.PrimaryBackGround, flex: 1 }}>
        <AppIntroSlider
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          data={data}
          showSkipButton={true}
          renderDoneButton={renderDoneButton}
          renderNextButton={renderNextButton}
          renderSkipButton={renderPrevButton}
          dotStyle={{
            backgroundColor: COLORS.PrimaryWhite,
          }}
          activeDotStyle={{
            backgroundColor: COLORS.PrimaryGreen,
          }}
        />
      </View>
    </MainContainer>
  );
};
const styles = StyleSheet.create({
  titleText: {
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoBold,
    fontSize: normalizeFont(28),
    textAlign: 'center',
    marginTop: scaleHeight(40),
  },
  descText: {
    color: COLORS.BorderColor,
    textAlign: 'center',
    fontFamily: FONTS.RobotoRegular,
    fontSize: normalizeFont(16),
    lineHeight: scaleHeight(24),
    marginTop: scaleHeight(27),
    marginBottom: scaleHeight(37),
    paddingHorizontal: 20,
  },
  rightTextWrapper: {
    marginRight: scaleWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: scaleHeight(26),
  },
  rightText: {
    fontSize: normalizeFont(16),
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoMedium,
  },
  leftTextWrapper: {
    marginLeft: scaleWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: scaleHeight(26),
  },
  leftText: {
    fontSize: normalizeFont(16),
    lineHeight: scaleHeight(24),
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoMedium,
  },
  doneButtonText: {
    color: COLORS.PrimaryWhite,
    fontSize: normalizeFont(18),
    textAlign: 'center',
    width: scaleWidth(200),
  },
  donContinerr: {
    flex: 1,
    backgroundColor: '#228B22',
    borderRadius: scaleWidth(26),
    bottom: scaleHeight(55),
    paddingVertical: scaleHeight(15),
    marginHorizontal: scaleWidth(65),
  },
  mainImage: {
    marginTop: scaleHeight(41),
  },
  itemContainer: {
    marginHorizontal: scaleWidth(20),
    backgroundColor: COLORS.PrimaryWhite,
    borderRadius: scaleWidth(20),
    alignItems: 'center',
  },
  indexContainer: {
    backgroundColor: '#228B22',
    paddingHorizontal: scaleWidth(21),
    paddingVertical: scaleHeight(7),
    borderRadius: scaleWidth(18),
    marginTop: scaleHeight(23),
  },
  indextxt: {
    color: COLORS.PrimaryWhite,
    fontSize: normalizeFont(18),
    fontFamily: FONTS.RobotoRegular,
  },
});

export default OnBoardingScreen;
