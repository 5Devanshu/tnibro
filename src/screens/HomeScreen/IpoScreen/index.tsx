import React, { useEffect, useState, useCallback } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
// import WebView from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { scaleHeight } from '../../../Constants/enums';
import { WebPagesUrl } from '../../../Constants/WebPageUrl';
import BackWithCenterIcons from '../../../Components/BackButton/BackWithCenterIcons';
import MainContainer from '../../../Components/MainContainer';
import { Loader } from '../../../Components/Loader';

function IpoScreen({ route }) {
  const [uri, setUri] = useState('');
  const insets = useSafeAreaInsets();
  const { uri: url = '' } = route?.params || {};
  const topPadding = Platform.OS === 'ios' ? scaleHeight(insets.top + 40) : scaleHeight(55);

  useEffect(() => {
    setUri(url.startsWith('https://') ? url : `https://${url}`);
  }, [url]);

  const renderLoading = useCallback(() => <Loader showForBlankScreen />, []);

  return (
    <MainContainer>
      <BackWithCenterIcons />
      <View style={styles.container}>
        {/* <WebView
          source={{ uri: uri || WebPagesUrl.IPO }}
          style={styles.webView}
          domStorageEnabled
          renderLoading={renderLoading}
          startInLoadingState
          scalesPageToFit
          injectedJavaScript={`document.body.style.paddingTop = '${topPadding}px'`}
          useWebKit
        /> */}
      </View>
    </MainContainer>
  );
}

export default React.memo(IpoScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
