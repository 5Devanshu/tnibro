import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
// import WebView from 'react-native-webview';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import {COLORS} from '../../../Constants/enums/colorsEnum';

interface OptionListProps {
  navigation: any;
  route: any;
}
const ChartScreen: React.FC<OptionListProps> = ({navigation, route}) => {
  const {url} = route.params;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.PrimaryWhite}}>
      <View style={{marginHorizontal: 30}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={IMAGES.Back_Icon} style={{height: 42, width: 42}} />
        </TouchableOpacity>
      </View>
      {/* <WebView
        allowsBackForwardNavigationGestures={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        // onLoad={() => {
        //   setIsLoading(false);
        // }}
        source={{
          uri: url,
        }}
        style={{flex: 1}}
      /> */}
    </SafeAreaView>
  );
};
export default ChartScreen;
