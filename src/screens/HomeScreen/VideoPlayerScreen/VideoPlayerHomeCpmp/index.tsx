import React, {memo} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
// import YoutubeIframe from 'react-native-youtube-iframe';
import {
  COLORS,
  CONSTANT_TEXT,
  ROUTE_NAME,
  normalizeFont,
  scaleHeight,
  scaleWidth,
  styleBase,
} from '../../../../Constants/enums';
import {navigation} from '../../../../Navigation/NavigationService';
import FONTS from '../../../../Constants/enums/Fonts';

interface IndexData {
  video: any;
  index: number;
}

interface MyComponentProps {
  VideoData: any;
}

const VideoCard: React.FC<IndexData> = ({video, index}) => {
  const extractVideoId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=|\?v=|\&v=|v=|youtu.be\/|\/shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = extractVideoId(video?.video_link);

  if (!videoId) {
    return <Text style={styles.errorText}>{''}</Text>;
  }

  return (
    <View style={styles.cardContainer} key={index.toString()}>
      <View style={styles.videoWrapper}>
        {/* <YoutubeIframe
          videoId={videoId}
          height={180}
          play={false}
          onReady={() => console.log('Video is ready')}
          onChangeState={state => console.log('Video state changed:', state)}
          onError={error => console.log('Video error:', error)}
        /> */}
      </View>
      <Text style={styles.title} numberOfLines={3}>
        {video?.title}
      </Text>
    </View>
  );
};

const VideoPlayerHome: React.FC<MyComponentProps> = ({VideoData}) => {
  const handlePress = () => {
    navigation(ROUTE_NAME.VIDEO_PLAYER_SCREEN);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Watch & Learn</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.seeAllText}>{CONSTANT_TEXT.SEE_ALL}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {VideoData?.map((video: any, index: number) => (
          <VideoCard video={video} index={index} key={index.toString()} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(24),
  },
  headerText: {
    color: '#010F07',
    fontSize: normalizeFont(20),
    fontWeight: '600',
    fontFamily: FONTS.RobotoBold,
  },
  seeAllText: {
    color: '#22A45D',
    fontSize: normalizeFont(14),
    fontWeight: '600',
    fontFamily: FONTS.RobotoRegular,
  },
  cardContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: scaleWidth(20),
    borderWidth: 1,
    borderColor: '#DAE3E9',
    borderRadius: scaleWidth(16),
    width: scaleWidth(280),
  },
  title: {
    marginTop:5,
    fontSize: normalizeFont(12),
    fontWeight: 'bold',
    marginBottom: scaleHeight(10),
    color: '#2C362C',
    marginHorizontal: scaleWidth(7),
  },
  errorText: {
    color: 'red',
    fontSize: normalizeFont(12),
    marginHorizontal: scaleWidth(20),
  },
  videoWrapper: {
    borderRadius: scaleWidth(16), // Same as the card border radius
    overflow: 'hidden', // Ensures the child components respect the border radius
  },
});

export default memo(VideoPlayerHome);
