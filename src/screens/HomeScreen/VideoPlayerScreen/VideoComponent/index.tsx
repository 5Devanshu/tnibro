import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import YouTube from 'react-native-youtube-iframe';
import { COLORS, normalizeFont, scaleHeight, scaleWidth, styleBase } from '../../../../Constants/enums';
import FONTS from '../../../../Constants/enums/Fonts';

interface VideoProps {
  video: {
    sequence: string;
    thumbnail_url: string;
    title: string;
    video_link: string;
  };
}

const VideoComponent: React.FC<VideoProps> = ({ video }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = useCallback(() => setIsExpanded(prev => !prev), []);

  const extractVideoId = (url: string): string | null => {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(video.video_link);
  if (!videoId) return <Text>Invalid video link</Text>;

  return (
    <View style={styles.container}>
      {!isExpanded ? (
        <TouchableOpacity onPress={toggleExpand}>
          <View style={styleBase.inrowspaceBetween}>
            <View style={styles.thumbnailContainer}>
              <Image source={{ uri: video.thumbnail_url }} style={styles.thumbnail} />
            </View>
            <View style={styles.videoDetails}>
              <Text style={styles.title} numberOfLines={3}>
                {video.title}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.expandedContainer}>
          {/* <YouTube
            videoId={videoId}
            height={200}
            play={false}
            onReady={() => console.log('YouTube Ready')}
            onChangeState={e => console.log('YouTube State Change:', e)}
            onError={e => console.log('YouTube Error:', e)}
          /> */}
          <Text style={styles.title} numberOfLines={3}>
            {video.title}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scaleHeight(25),
    padding: 10,
    borderRadius: scaleWidth(10),
    borderColor: COLORS.borderGray,
    borderWidth: 1,
  },
  thumbnailContainer: {
    backgroundColor: 'gray',
    borderWidth: 0.5,
    borderColor: COLORS.borderGray,
    borderRadius: scaleWidth(10),
  },
  thumbnail: {
    borderRadius: scaleWidth(10),
    height: scaleHeight(67),
    width: scaleWidth(112),
  },
  videoDetails: {
    flex: 1,
    marginLeft: scaleWidth(16),
  },
  title: {
    fontSize: normalizeFont(12),
    fontWeight: 'bold',
    marginVertical: scaleHeight(5),
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoBold,
  },
  expandedContainer: {
    padding: 5,
  },
});

export default React.memo(VideoComponent);
