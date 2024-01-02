// Progress Bar Component
import React, {useEffect, useState} from 'react';
import {Animated, Text, View} from 'react-native';

// Constant
import color from '../../constant/color';

const ProgressBar = ({
  backgroundColor = color.neutral100,
  borderRadius = 4,
  height = 4,
  progress = 0,
  progressBarColor = color.dodgerBlue,
  useNativeDriver = false,
  width = '100%',
}) => {
  const [progressValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progressValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver,
    }).start();
  }, [progress]);

  return (
    <View
      style={{
        backgroundColor,
        borderRadius,
        height,
        width,
      }}>
      <Animated.View
        style={{
          backgroundColor: progressBarColor,
          borderRadius,
          height,
          width: progressValue,
        }}
      />
      <Text></Text>
    </View>
  );
};

export default ProgressBar;
