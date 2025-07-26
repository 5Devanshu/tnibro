import React, {memo} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {COLORS, CONSTANT_TEXT, ROUTE_NAME, scaleWidth, styleBase} from '../../../Constants/enums';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import styles from './styles';
import {navigation} from '../../..//Navigation/NavigationService';
import { addCommaToCurrency } from '../../../utils/digitCommaSeparator';

interface IndexData {
  item: any;
  index: number;
}
interface MyComponentProps {
  ishowGainer?: string;
  topperData: any;
  topLooser?: any;
}
const GainerListCard: React.FC<MyComponentProps> = props => {
  const {ishowGainer = false, topperData} = props;

  const handlePress = () => {
    navigation(ROUTE_NAME.ALL_GAINER_LIST, {ishowGainer: ishowGainer});
  };

  const GainerCard: React.FC<IndexData> = ({item, index}) => {
    return (
      <View style={styles.cardContainer} key={index.toString()}>
        <TouchableOpacity
          onPress={() => {
            navigation('SearchDetailScreen', {
              symbol: item?.symbol,
              segment: item?.segment,
            });
          }}
          activeOpacity={1}>
          <View style={styles.inrow}>
            <View style={styleBase.inRow}>
              <Text style={styles.headerTxt} allowFontScaling={false}>
                {item?.symbol}
              </Text>
              {item?.isStar === true && (
                <Image source={IMAGES.STAR_ICON} style={styles.starStyle} />
              )}
            </View>
            <Image
              source={
                ishowGainer === 'gain'
                  ? IMAGES.HOME_SCREEN_ICON.GAINER_GRAPH
                  : IMAGES.HOME_SCREEN_ICON.LOOSER_GRAPH
              }
              style={styles.graphIcon}
            />
          </View>
          <View style={styles.inrow2}>
            <Text style={styles.txtPrice} allowFontScaling={false}>
              ₹{addCommaToCurrency(item?.close)}
            </Text>
            <Text
              style={[
                styles.txtPercentage,
                {color: ishowGainer === 'gain' ? COLORS.PrimaryGreen : COLORS.Binance_red},
              ]}
              allowFontScaling={false}>
              {'   '}
              {item?.valueChange}({item?.pChange})
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={[styles.container,{marginTop:10}]}>
      <View style={styles.inrows}>
        <View style={styleBase.inRow}>
          {/* <Image
            source={IMAGES.HOME_SCREEN_ICON.TOP_GAINER_LOSER_ICON}
            style={{height: scaleWidth(25), width: scaleWidth(25)}}
          /> */}
          <Text style={styles.headerText} allowFontScaling={false}>
            {ishowGainer === 'gain' ? 'Top Gainers' : 'Top Losers'}
          </Text>
        </View>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.txtSeeall} allowFontScaling={false}>
            {CONSTANT_TEXT.SEE_ALL}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.docsScrollView}>
        <ScrollView horizontal style={styles.scrollView} showsHorizontalScrollIndicator={false}>
          {topperData &&
            topperData.map((item: any, index: number) => (
              <GainerCard key={index.toString()} item={item} index={index} />
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default memo(GainerListCard);
