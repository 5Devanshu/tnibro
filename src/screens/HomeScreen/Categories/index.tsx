import React, { memo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Alert,
  Animated,
  Platform,
} from 'react-native';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import styles from './styles';
import { navigation } from '../../../Navigation/NavigationService';
import { ROUTE_NAME, TAB_BAR_NAME } from '../../../Constants/enums';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CategoryProps {
  category: string;
  imageSource: ImageSourcePropType;
  screen: string;
  requiresSubscription?: boolean;
  categorytitle?: string;
}

const Category: React.FC<CategoryProps> = ({
  category,
  imageSource,
  screen,
  requiresSubscription,
  categorytitle = '',
}) => {
  const [active_PlanCode, setActive_PlanCode] = useState('');
  AsyncStorage.getItem('active_PlanCode').then(value => {
    setActive_PlanCode(value)
  });
  const isEligiblePlan = ["NEWYEAR349", "GOLD849", "ANNUAL_UPGRADE", "NEW349", "ADV4499", "BASIC179"].includes(active_PlanCode);

  const handlePress = () => {
    if (requiresSubscription && !isEligiblePlan) {
      Alert.alert('Subscription Required', 'Please subscribe for this feature', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            navigation(TAB_BAR_NAME.SUBSCRIPTION);
          },
        },
      ]);
    } else {
      navigation(screen);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.categoryContainer}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.categoryText} allowFontScaling={false}>
          {category}
        </Text>
        <Text style={styles.categoryText2} allowFontScaling={false}>
          {categorytitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Categories: React.FC = () => {
  const [expanded, setExpanded] = useState(false); // State to manage expand/collapse
  const [heightAnim] = useState(new Animated.Value(0)); // Animates the height of the detail section
  const [opacityAnim] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    if (expanded) {
      // Collapse the section
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setExpanded(false));
    } else {
      // Expand the section
      setExpanded(true);
      Animated.timing(heightAnim, {
        toValue: 100, // Adjust the value according to the desired expanded height
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };
  // const toggleExpand = () => {
  //   if (expanded) {
  //     // Collapse
  //     Animated.parallel([
  //       Animated.timing(heightAnim, {
  //         toValue: 0,
  //         duration: 300,
  //         easing: Easing.inOut(Easing.ease),
  //         useNativeDriver: false,
  //       }),
  //       Animated.timing(opacityAnim, {
  //         toValue: 0,
  //         duration: 300,
  //         useNativeDriver: false,
  //       }),
  //     ]).start(() => setExpanded(false));
  //   } else {
  //     // Expand
  //     setExpanded(true);
  //     Animated.parallel([
  //       Animated.timing(heightAnim, {
  //         toValue: 150, // Adjust height as per the content
  //         duration: 300,
  //         easing: Easing.inOut(Easing.ease),
  //         useNativeDriver: false,
  //       }),
  //       Animated.timing(opacityAnim, {
  //         toValue: 1,
  //         duration: 300,
  //         useNativeDriver: false,
  //       }),
  //     ]).start();
  //   }
  // };
  return (
    <View style={[styles.container,
    {
      backgroundColor: '#FFF',
      borderRadius: 15,
      paddingBottom: 10,
      marginBottom: 5,
      top: -75,
      borderColor: '#ccc',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 14 },
      shadowOpacity: 0.04,
      shadowRadius: 21.52,
      elevation: 5, // Android equivalent
      borderWidth: Platform.OS === 'android' ? 0 : .5
    }
    ]}>
      <View style={styles.rows}>
        <Category
          category={`Screener\n`}
          imageSource={IMAGES.HOME_SCREEN_ICON.SCREENER_ICON}
          screen={TAB_BAR_NAME.STOCKS}
        />
        <Category
          category={`Trading\nCalls`}
          imageSource={IMAGES.HOME_SCREEN_ICON.NEWS_ICON}
          screen={ROUTE_NAME.TRADING_CALLS}
        />
        <Category
          category={`Trades\n`}
          imageSource={IMAGES.HOME_SCREEN_ICON.PRICE_ACTION_ICON}
          screen={ROUTE_NAME.ADVISORY_SCREEN}
        />
        <Category
          category={`Nifty/Bank`}
          categorytitle={`Nifty/FinNifty\n`}
          imageSource={IMAGES.HOME_SCREEN_ICON.NIFTY_ICON}
          screen={ROUTE_NAME.NIFTYBANKNIFTYSCREEN}
        />
      </View>
      <View style={styles.row2}>
        <Category
          category={`Trade\nPerformance`}
          imageSource={IMAGES.HOME_SCREEN_ICON.ALERT_ICON}
          screen={ROUTE_NAME.OPEN_TRADE}
        />
        <Category
          category={`Watchlist\n`}
          imageSource={IMAGES.HOME_SCREEN_ICON.WATCHLIST_ICON}
          screen={ROUTE_NAME.WATCHLIST_SCREEN}
        />
        <Category
          category={`Sectors\n`}
          imageSource={IMAGES.HOME_SCREEN_ICON.SECTOR_ICON}
          screen={ROUTE_NAME.SECTORS_SCREEN}
        />
        <Category
          category={`New Listing\n`}
          imageSource={IMAGES.HOME_SCREEN_ICON.NEW_LISTING_ICON}
          screen={ROUTE_NAME.NEW_LISTING}
        />
        {/* <Category
              category={`News`}
              imageSource={IMAGES.HOME_SCREEN_ICON.NEWS_ICON}
              screen={ROUTE_NAME.NEWS_SCREEN}
            /> */}
        {/* <Category
           imageSource={IMAGES.HOME_SCREEN_ICON.NEW_LISTING_ICON}
          category={`IPO`}
          screen={ROUTE_NAME.IPO_SCREEN}
          requiresSubscription={true}
        /> */}
      </View>
      {/* <Animated.View
        style={[
          styles.detailContainer,
          {
            height: heightAnim,
          },
        ]}>
      </Animated.View> */}

      {/* <TouchableOpacity
        style={{
          position: 'absolute',
          alignSelf: 'center',
          bottom: -20,
        }}
        onPress={toggleExpand}>
        <Image
          source={expanded ? IMAGES.ArrowUP : IMAGES.HOME_SCREEN_ICON.EXPAND_AROW}
          style={{height: scaleHeight(32), width: scaleWidth(30), resizeMode: 'contain'}}
        />
      </TouchableOpacity> */}
    </View>
  );
};

export default memo(Categories);
