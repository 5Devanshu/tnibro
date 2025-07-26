import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import VideoComponent from './VideoComponent';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../../Components/Loader';
import { useIsFocused } from '@react-navigation/native';
import { goBack } from '../../../Navigation/NavigationService';
import MainContainer from '../../../Components/MainContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  COLORS,
  normalizeFont,
  scaleHeight,
  scaleWidth,
  styleBase,
} from '../../../Constants/enums';
import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';
import { advertisement_videos } from '../../../apis/Onboarding/HomeScreenApi/HomeScreenSlice';

interface VideoData {
  sequence: string;
  thumbnail: string;
  title: string;
  video_link: string;
}

interface RootState {
  HomeScreenSlice: {
    isVideoLoad: boolean;
    isVideoSuccess: { response: VideoData[] } | null;
    isVideoError: any;
    isVideoLength: number;
  };
}

const VideoPlayerScreen: React.FC = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { isVideoLoad, isVideoSuccess, isVideoLength } = useSelector(
    (state: RootState) => state.HomeScreenSlice
  );

  const [videoData, setVideoData] = useState<VideoData[]>([]);

  const getVideoScreenData = async () => {
    try {
      const userid = await AsyncStorage.getItem('userId');
      if (userid) {
        dispatch(advertisement_videos({ userid }));
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  // Fetch videos when the screen is focused
  useEffect(() => {
    if (isFocused) {
      getVideoScreenData();
    }
  }, [isFocused]);

  // Update video data when API call is successful
  useEffect(() => {
    if (isVideoSuccess?.response) {
      setVideoData(isVideoSuccess.response);
    }
  }, [isVideoSuccess]);

  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <TitleWithBackBtnHeader
        centerTitle="Watch & Learn"
        onPressBackArrow={() => goBack()}
      />
      {isVideoLoad ? (
        <Loader />
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            {videoData.map((video, index) => (
              <VideoComponent key={index} video={video} />
            ))}
          </View>
          {isVideoLength === 0 && (
            <Text style={styles.noVideosText}>
              Currently No Videos Available
            </Text>
          )}
        </ScrollView>
      )}
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    marginHorizontal: scaleWidth(25),
  },
  noVideosText: {
    fontSize: normalizeFont(20),
    marginTop: scaleHeight(50),
    color: COLORS.PrimaryBlack,
    textAlign: 'center',
  },
});

export default VideoPlayerScreen;
