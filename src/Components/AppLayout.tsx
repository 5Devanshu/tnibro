import {setNotification} from '../apis/Onboarding/authenticationSlice';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import ForegroundNotification from './ForegroundNotification';
import {useSelector} from 'react-redux';
import IMAGES from '../Constants/enums/ImagesEnum';
import {COLORS} from '../Constants/enums/colorsEnum';
import FONTS from '../Constants/enums/Fonts';
import MainComponent from './MainContainer';
import {CONSTANT_TEXT, scaleHeight, scaleWidth} from '../Constants/enums';

var Sound = require('react-native-sound');
interface Props {
  children: React.ReactNode;
  title: string;
  isDashboard?: boolean;
  rightControl?: any;
  onBackPress: () => void;
  handleSearch?: () => void;
  threeLine?: boolean;
  searchBar?: boolean;
}

const AppLayout: React.FC<Props> = ({
  children,
  title,
  isDashboard = false,
  rightControl = null,
  onBackPress,
  handleSearch,
  threeLine = false,
  searchBar = false,
}) => {
  const [soundOkay, setSoundOkay] = useState(false);

  Sound.setCategory('Playback');

  const dispatch = useDispatch();
  const authenticationData = useSelector((state: any) => state.authentication);
  const {isNotificationShown, notificationText} = authenticationData;

  const handleCloseNotification = () => {
    dispatch(
      setNotification({
        isVisible: false,
        text: '',
      }),
    );
  };

  const playSound = () => {
    let sound = new Sound('tni_notif.wav', Sound.MAIN_BUNDLE, error => {
      if (error) {
      } else {
        sound.play(); // have to put the call to play() in the onload callback
      }
    });
  };

  useEffect(() => {
    if (isNotificationShown) {
      playSound();
    }
  }, [isNotificationShown, soundOkay]);

  return (
    <MainComponent>
      <SafeAreaView style={{flex: 1, backgroundColor: '#DFFFE8'}}>
        {/* <ImageBackground source={IMAGES.Tni_Back} resizeMode="cover" style={{flex: 1}}> */}
        <View style={styles.header}>
          <TouchableWithoutFeedback hitSlop={styles.hitslop} onPress={onBackPress}>
            <View style={styles.backContainer}>
              <Image
                alt=""
                resizeMode="contain"
                style={styles.backIcon}
                source={threeLine ? IMAGES.Menu : require('../assets/arrow.png')}
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.titleContainer}>
            {isDashboard ? (
              <Image
                alt=""
                resizeMode="contain"
                style={styles.headerImg}
                source={IMAGES.Logotnibro}
              />
            ) : (
              <>
                <TouchableOpacity
                  onPress={handleSearch}
                  activeOpacity={1}
                  style={{
                    borderRadius: 8.162,
                    borderWidth: 0.816,
                    borderColor: '#E5E6ED',
                    backgroundColor: COLORS.PrimaryWhite,
                    display: 'flex',
                    paddingVertical: scaleHeight(10.2),
                    flexDirection: 'row',
                    paddingLeft: scaleWidth(11),
                    paddingRight: scaleWidth(55.41),
                    gap: 15,
                    alignItems: 'center',
                  }}>
                  <Image source={IMAGES.Search_icon} style={{height: 14, width: 14}} />
                  <Text
                    style={{
                      color: '#6D7985',
                      fontSize: 8,
                    }}>
                    {CONSTANT_TEXT.SEARCH_ANY_STOCKS}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* <View style={styles.backContainer}></View> */}
          {rightControl && rightControl()}
        </View>
        <ForegroundNotification
          isVisible={isNotificationShown}
          onCancel={handleCloseNotification}
          data={notificationText}
        />
        {isDashboard ? (
          <View
            style={[
              styles.container,
              {
                // paddingHorizontal: 10,
                backgroundColor: '#fff',
              },
            ]}>
            {children}
          </View>
        ) : (
          <View
            style={[
              styles.container,
              {
                // paddingHorizontal: isDashboard ? 0 : 10
              },
            ]}>
            {children}
          </View>
        )}
        {/* </ImageBackground> */}
      </SafeAreaView>
    </MainComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    // backgroundColor:'red',
  },
  header: {
    // height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(30),
    backgroundColor: COLORS.SecondaryGreen,
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 0 : 28,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  hitslop: {
    top: 15,
    bottom: 15,
    left: 15,
    right: 15,
  },
  backContainer: {
    // flex: 1,
  },
  titleContainer: {
    flex: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#000',
    fontWeight: '600',
    fontSize: 18,
  },
  headerImg: {
    width: 100,
    // height: 80,
    alignSelf: 'center',
  },
});

export default AppLayout;
