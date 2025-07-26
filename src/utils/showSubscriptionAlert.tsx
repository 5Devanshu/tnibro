import { Alert } from 'react-native';
import { navigation } from '../Navigation/NavigationService'; // Adjust the path based on your project structure
import { ROUTE_NAME } from '../Constants/enums'; // Adjust the path based on your project structure

export const showSubscriptionAlert = () => {
  Alert.alert('Subscription Required', 'Please subscribe for this feature', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'Yes',
      onPress: () => {
        navigation(ROUTE_NAME.SUBSCRIPTION_SCREEN);
      },
    },
  ]);
};
