import React, {useEffect, useState} from 'react';
import {View, Platform} from 'react-native';
import {styles} from './styles';
// import WebView from 'react-native-webview';
import BackWithoutSafeArea from '../../Components/BackButton/BackWithoutSafeArea';
import {Loader} from '../../Components/Loader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, scaleHeight} from '../../Constants/enums';
import MainContainer from '../../Components/MainContainer';
import BackWithCenterIcons from '../../Components/BackButton/BackWithCenterIcons';

function WebViewPage(props) {
  const [uri, setUri] = useState('');
  const insets = useSafeAreaInsets();
  const {uri: url} = props?.route?.params;
  const topPadding = Platform.OS === 'ios' ? scaleHeight(insets.top + 40) : scaleHeight(55);

  useEffect(() => {
    if (url.includes('https://')) setUri(url);
    else setUri('https://' + url);
  }, []);

  return (
    <MainContainer>
      <BackWithCenterIcons />
      <View style={styles.mainContainerView}>
        <View
          style={{
            flex: 1,
          }}>
          {/* <WebView
            automaticallyAdjustContentInsets={true}
            source={{uri: uri}}
            style={styles.webView}
            domStorageEnabled={true}
            renderLoading={ActivityIndicatorElement}
            startInLoadingState={true}
            scalesPageToFit={true}
            injectedJavaScript={`document.body.style.paddingTop = '${topPadding}px'`}
            useWebKit={true}
          /> */}
        </View>
      </View>
    </MainContainer>
  );
}

const ActivityIndicatorElement = () => {
  return <Loader showForBlankScreen={true} />;
};
export default React.memo(WebViewPage);
