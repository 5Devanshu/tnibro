import React from 'react';
import {Text, View, Dimensions, Image, TouchableOpacity, Linking, Alert} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styles';
// import YoutubeIframe from 'react-native-youtube-iframe';
import GradientButton from '../Button/GradientButton';
import {scaleHeight, styleBase, TAB_BAR_NAME} from '../../Constants/enums';
import IMAGES from '../../Constants/enums/ImagesEnum';

interface IndexData {
  video: any;
  onClose: any;
  seeAllModal: boolean;
}
const VideoModal: React.FC<IndexData> = props => {
  const {onClose, seeAllModal, video} = props;
  const {height: screenHeight} = Dimensions.get('window');

  const videoHeight = screenHeight * 0.4; // 40% of screen height

  const extractVideoId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=|\?v=|\&v=|v=|youtu.be\/|\/shorts\/)([^#\&\?]*).*/;
    const match = url && url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  const videoId = extractVideoId(video?.video_link);
  if (!videoId) {
    return <Text>{''}</Text>;
  }
  const phoneNumber = '9355789123';
  const URL = `whatsapp://send?phone=91${phoneNumber}`;

  return (
    <Modal
      propagateSwipe={true}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      animationInTiming={400}
      animationOutTiming={400}
      onBackdropPress={onClose}
      isVisible={seeAllModal}
      style={styles.bottomModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
      backdropOpacity={0.1}>
      <View style={styles.modalContainer}>
        <View style={{marginTop: 60, paddingBottom: 10}}>
          {/* <YoutubeIframe
            videoId={videoId}
            height={200}
            play={false}
            onReady={() => console.log('ready---')}
            onChangeState={e => console.log('onchange', e)}
            onError={e => console.log('error', e)}
          /> */}
          <View style={styleBase.inrowspaceBetween}>
            <TouchableOpacity
              onPress={() => {
                Linking.canOpenURL(URL).then(supported => {
                  if (supported) {
                    Linking.openURL(URL);
                  } else {
                    Alert.alert(
                      'WhatsApp not found',
                      'Please install WhatsApp to contact support.',
                    );
                  }
                });
              }}>
              <Image
                source={IMAGES.whatsapp}
                style={{height: 45, width: 45, marginTop: scaleHeight(25)}}
              />
            </TouchableOpacity>

            <GradientButton
              text={`Go to Subscription`}
              onPress={() => {
                onClose();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default VideoModal;
