import { Text, SafeAreaView, StyleSheet, ScrollView, Platform } from 'react-native';
import React from 'react';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import { CONSTANT_TEXT, scaleHeight } from '../../Constants/enums';
import { goBack } from '../../Navigation/NavigationService';
import { COLORS } from '../../Constants/enums';
// import WebView from 'react-native-webview';
import { WebPagesUrl } from '../../Constants/WebPageUrl';
import { Loader } from '../../Components/Loader';


export default function AboutUsScreen() {
  const topPadding = Platform.OS === 'ios' ? scaleHeight(insets.top + 40) : scaleHeight(55);
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.PrimaryBackGround }]}>
      <TitleWithBackBtnHeader
        centerTitle={CONSTANT_TEXT.ABOUT_US}
        onPressBackArrow={() => goBack()}
      />
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.heading}>Welcome to Stock Yaari Technologies Private Limited</Text>
        <Text style={styles.paragraph}>
          It is with great pride and excitement that I share my thoughts with you from the founder's desk. When we embarked on the journey to create StockYaari app under our company Stock Yaari Technologies Private Limited, our vision was clear: to empower individuals in their pursuit of financial success through informed and strategic stock market decisions.
        </Text>
        <Text style={styles.paragraph}>
          At Stock Yaari Technologies Private Limited, we believe that everyone should have access to reliable and accurate predictions in the dynamic world of stock trading. Our team of dedicated professionals has worked tirelessly to develop an app that not only provides precise market insights but also enhances the overall trading experience. We understand the challenges and uncertainties that come with navigating the stock market.
        </Text>
        <Text style={styles.paragraph}>
          As we continue to evolve and innovate, our commitment to excellence remains unwavering. We are grateful for the trust and support you've placed in us. Together, let's redefine the way we approach stock trading and create a community of successful and empowered traders.
        </Text>
        <Text style={styles.paragraph}>
          Thank you for being part of the StockYaari journey.
        </Text>
      </ScrollView>
      {/* <WebView
            automaticallyAdjustContentInsets={true}
            source={{uri: WebPagesUrl.ABOUT_US}}
            style={styles.webView}
            domStorageEnabled={true}
            renderLoading={ActivityIndicatorElement}
            startInLoadingState={true}
            scalesPageToFit={true}
            injectedJavaScript={`document.body.style.paddingTop = '${topPadding}px'`}
            useWebKit={true}
          /> */}
    </SafeAreaView>
  );
}
const ActivityIndicatorElement = () => {
  return <Loader showForBlankScreen={true} />;
};

const styles = StyleSheet.create({
  mainContainerView: {
    flex: 1,
    // backgroundColor: COLORS.primaryBG,
  },
  webView: {
    // backgroundColor: COLORS.primaryBG
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingHorizontal: 20
  },
  heading: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 14,
    marginBottom: 16,
    color: '#000'
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 16,
    color: '#000'
  },
});
