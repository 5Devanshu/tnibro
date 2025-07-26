import * as React from 'react';
import { Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import IMAGES from '../Constants/enums/ImagesEnum';
import {
  COLORS,
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../Constants/enums';
import CustomDrawerContent from '../Components/CustomDrawer';
import HelpScreen from '../screens/HelpScreen';
import BottomTabNavigator from './BottomTabNavigator';
import RefundScreen from '../screens/RefundScreen';
import SupportScreen from '../screens/SupportScreen';
import { useSelector } from 'react-redux';
import AboutUsScreen from '../screens/AboutUs';
import Profile from '../screens/Profile/Profile';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const isRefunButton = useSelector((state: any) => state.HomeScreenSlice?.isRefunButton);
  const isSupportButton = useSelector((state: any) => state.HomeScreenSlice?.isSupportButton);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: COLORS.PrimaryBackGround,
          width: scaleWidth(280),
        },
        drawerActiveTintColor: 'blue',
        drawerLabelStyle: {
          color: 'black',
          fontSize: normalizeFont(14),
        },
      }}>
      <Drawer.Screen
        name="Drawer Home"
        component={BottomTabNavigator}
        options={{
          drawerLabel: () => null, // Hides the label in the drawer
          title: 'Drawer Home',
          headerShadowVisible: false,
          drawerIcon: () => null, // Hides the icon in the drawer
          drawerStyle: {
            backgroundColor: '#fff', // Set the background for this specific drawer screen
          },
        }}
        
      />
      <Drawer.Screen
        name="My Profile"
        component={Profile}
        options={{
          drawerLabel: 'My Profile',
          title: 'My Profile',
          headerShadowVisible: false,
          drawerIcon: () => (
            <Image
              source={IMAGES.DRAWER_TAB_ICON.MY_PROFILE_ICON}
              style={{ height: scaleHeight(30), width: scaleWidth(30) }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUsScreen}
        options={{
          drawerLabel: 'About Us',
          title: 'About Us',
          headerShadowVisible: false,
          drawerIcon: () => (
            <Image
              source={IMAGES.DRAWER_TAB_ICON.ABOUT_US_ICON}
              style={{ height: scaleHeight(30), width: scaleWidth(30) }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="How it works"
        component={HelpScreen}
        options={{
          drawerLabel: 'How it works',
          title: 'How it works',
          headerShadowVisible: false,
          drawerIcon: () => (
            <Image
              source={IMAGES.DRAWER_TAB_ICON.HELP_ICON}
              style={{ height: 30, width: 30 }}
            />
          ),
        }}
      />
      {isRefunButton && (
        <Drawer.Screen
          name="Refund"
          component={RefundScreen}
          options={{
            drawerLabel: 'Refund',
            title: 'Refund',
            headerShadowVisible: false,
            drawerIcon: () => (
              <Image
                source={IMAGES.DRAWER_TAB_ICON.REFUND_ICON}
                style={{ height: 30, width: 30 }}
              />
            ),
          }}
        />
      )}

      {isSupportButton && (
        <Drawer.Screen
          name="Support"
          component={SupportScreen}
          options={{
            drawerLabel: 'Support',
            title: 'Support',
            headerShadowVisible: false,
            drawerIcon: () => (
              <Image
                source={IMAGES.DRAWER_TAB_ICON.SUPPORT_ICON}
                style={{ height: 30, width: 30 }}
              />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default React.memo(DrawerNavigation);
