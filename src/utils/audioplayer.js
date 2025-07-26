import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, TouchableOpacity, Animated, ActivityIndicator, Image } from "react-native";
import Sound from "react-native-sound";
import IMAGES from "../Constants/enums/ImagesEnum"; // Make sure the path is correct

const AudioPlayer = ({ audioUrl }) => {
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const borderColor = useRef(new Animated.Value(0)).current;
  const progressInterval = useRef(null);

  useEffect(() => {
    const audio = new Sound(audioUrl, null, (error) => {
      if (error) {
        console.error("Error loading sound:", error);
        setLoading(false);
        return;
      }
      setSound(audio);
      setLoading(false);
    });

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (audio.isPlaying()) {
        audio.stop(() => audio.release());
      } else {
        audio.release();
      }
    };
  }, [audioUrl]);

  const togglePlayPause = useCallback(() => {
    if (!sound) return;

    if (playing) {
      sound.pause();
      stopTrackingProgress();
      setPlaying(false);
    } else {
      sound.play((success) => {
        setPlaying(false);
        stopTrackingProgress();
        animateBorder(0);
        setProgress(0);

        if (!success) {
          console.warn("Playback failed due to audio decoding errors");
        }
      });

      startTrackingProgress();
      setPlaying(true);
    }
  }, [sound, playing]);

  const startTrackingProgress = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    progressInterval.current = setInterval(() => {
      if (sound && playing) {
        sound.getCurrentTime((seconds) => {
          const duration = sound.getDuration();
          if (duration > 0) {
            const progressValue = seconds / duration;
            setProgress(progressValue);
            animateBorder(progressValue);

            if (progressValue >= 1) {
              stopTrackingProgress();
            }
          }
        });
      }
    }, 500);
  };

  const stopTrackingProgress = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const animateBorder = (toValue) => {
    Animated.timing(borderColor, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const borderColorInterpolation = borderColor.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["red", "yellow", "green"],
  });

  return (
    <View>
      <Animated.View
        style={{
          padding: 7,
          borderRadius: 50,
          alignSelf: "flex-start",
        }}
      >
        <TouchableOpacity onPress={togglePlayPause} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Image
              source={playing ? IMAGES.audioOFF : IMAGES.audioON}
              style={{ width: 25, height: 25 ,resizeMode:'contain'}}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default AudioPlayer;
