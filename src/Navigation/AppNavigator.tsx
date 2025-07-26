import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import Routes from '../../AppRoutes';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff', // Setting background color to white
  },
};

type IMainNavigation = {};

const AppNavigator: React.FC<IMainNavigation> = (props: IMainNavigation) => {

  return (
    <NavigationContainer ref={navigationRef} theme={MyTheme}>
      <Routes />
    </NavigationContainer>
  );
};

export default React.memo(AppNavigator);
