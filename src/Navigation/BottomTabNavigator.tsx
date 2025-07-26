import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSubscriptionPlan } from '../apis/Onboarding/PaymentApi/CreateSubscSlice';
import { COLORS, TAB_BAR_NAME, normalizeFont, scaleHeight } from '../Constants/enums';
import FONTS from '../Constants/enums/Fonts';
import HomeScreen from '../screens/HomeScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import ReferScreen from '../screens/ReferScreen';
import WhatsappScreen from '../screens/Whatsapp';
import StockView from '../screens/Dashboard/Dashboard';
import UserPlanDetailScreen from '../screens/SubscriptionScreen/UserPlanDetail';
import ActiveHome from '../assets/svg/BottomTabIcon/ActiveHome';
import InactiveHome from '../assets/svg/BottomTabIcon/InactiveHome';
import InactiveStocks from '../assets/svg/BottomTabIcon/InactiveStocks';
import ActiveStocks from '../assets/svg/BottomTabIcon/ActiveStocks';
import ActiveSubscription from '../assets/svg/BottomTabIcon/ActiveSubscription';
import InactiveSubscription from '../assets/svg/BottomTabIcon/InactiveSubscription';
import ActiveWhatsapp from '../assets/svg/BottomTabIcon/ActiveWhatsapp';
import InactiveRefer from '../assets/svg/BottomTabIcon/InactiveRefer';
import ActiveRefer from '../assets/svg/BottomTabIcon/ActiveRefer';
import DiamondAnimation from '../assets/animation/diamond';


const Tab = createBottomTabNavigator();
const WHATSAPP_URL = 'https://whatsapp.com/channel/0029VaKLeAKBA1euEWO1Pk18';

const screenOptions = {
  tabBarHideOnKeyboard: true,
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: { borderTopWidth: 1, backgroundColor: COLORS.SecondaryGreen },
};

const BottomTabNavigator: React.FC = () => {
  const dispatch = useDispatch();
  const paymentData = useSelector(state => state.CreateSubscSlice);
  const lockData = useSelector(state => state.HomeScreenSlice?.lock_data);

  useEffect(() => {
    (async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) dispatch(getSubscriptionPlan({ userid: userId }));
    })();
  }, [dispatch]);

  const RenderIcons = (tabName: string, focused: boolean) => {
    const icons = {
      Home: focused ? <ActiveHome /> : <InactiveHome />,
      Stocks: focused ? <ActiveStocks /> : <InactiveStocks />,
      // Subscription: focused ? <ActiveSubscription /> : <InactiveSubscription />,
      Subscription: focused ? <DiamondAnimation focused={true} /> : <DiamondAnimation focused={false}  />,
      Refer: focused ? <ActiveRefer /> : <InactiveRefer />,
      Whatsapp: <ActiveWhatsapp />,
    };
    return icons[tabName] || null;
  };

  const MyTabBar: React.FC<any> = ({ state, descriptors, navigation }) => (
    <View style={styles.tabBarCustomStyle}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          if (label === 'Whatsapp') {
            Linking.openURL(WHATSAPP_URL).catch(() => console.log("Can't open URI: " + WHATSAPP_URL));
          } else {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        return (
          <TouchableOpacity key={route.name} onPress={onPress} activeOpacity={1} style={[styles.singleTabView, label == 'Subscription' && { marginBottom: 15 }]}>
            {RenderIcons(label, isFocused)}
            {label !== 'Subscription' && <Text style={styles.labelText(isFocused)}>{label}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const ActiveScreen = paymentData.isSubscPlanSuccess?.response?.active ? UserPlanDetailScreen : SubscriptionScreen;

  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />} screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      {!lockData && <Tab.Screen name={TAB_BAR_NAME.STOCKS} component={StockView} options={{ title: 'Stocks' }} />}
      <Tab.Screen name={TAB_BAR_NAME.SUBSCRIPTION} component={ActiveScreen} options={{ title: 'Subscription' }} />
      {!lockData && <Tab.Screen name={TAB_BAR_NAME.REFER_SCREEN} component={ReferScreen} options={{ title: 'Refer' }} />}
      {!lockData && <Tab.Screen name={TAB_BAR_NAME.WHATSAPP_SCREEN} component={WhatsappScreen} options={{ title: 'Whatsapp' }} />}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  labelText: isFocused => ({
    color: isFocused ? COLORS.TAB_GREEN : COLORS.BorderColor,
    fontSize: normalizeFont(12),
    fontFamily: isFocused ? FONTS.RobotoMedium : FONTS.RobotoRegular,
    marginTop: scaleHeight(5),
    paddingBottom: scaleHeight(5),
  }),
  tabBarCustomStyle: {
    borderRadius: 30,
    height: 90,
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: '#FFF',
    backgroundColor: '#F8F8F8',

  },
  singleTabView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingVertical: scaleHeight(20),
    marginTop: scaleHeight(10),
  },
});

export default React.memo(BottomTabNavigator);
