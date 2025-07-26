import analytics from '@react-native-firebase/analytics';

const setUserProperty = async (key, value) => {
    try {
        await analytics().setUserProperties({ key: value });
    }
    catch (e) {
        console.log('Analytics UP Error : ', e);
    }
}

const setScreen = async (screen_name, screen_class) => {
    try {
        await analytics().logScreenView({
            screen_name,
            screen_class,
        });
    } catch (e) {
        console.log('Analytics Screen Error : ', e);
    }
}

const logEvent = async (event) => {
    try {
        await analytics().logEvent(event);
    }
    catch (e) {
        console.log('Analytics Event Error: ', e);
    }
}

export default {
    setUserProperty,
    setScreen,
    logEvent
}