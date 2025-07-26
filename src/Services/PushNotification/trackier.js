import { Platform } from "react-native";
import { TrackierSDK } from 'react-native-trackier';
import analytics from '@react-native-firebase/analytics';

export const getTrackierId = async (): Promise<string | null> => {
  try {
    const id = await TrackierSDK.getTrackierId();
    return id;
  } catch (e) {
    return null;
  }
};

export async function sendTrackierEvent(eventData) {
    const url = "https://events.trackier.io/v1/s2s-event";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "x-api-key": Platform.OS === 'android' ? '02b22355-5ef7-4018-82b9-2eff558e4a8c' : 'c84af5fa-426f-4dea-8d3c-5ecf90f9c662'
            },
            body: JSON.stringify(eventData)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function setUserPropertyWithTrackierId() {
  try {
    const trackierId = await getTrackierId();
    await analytics().setUserProperty('app_remove', trackierId);
  } catch (error) {
  }
}