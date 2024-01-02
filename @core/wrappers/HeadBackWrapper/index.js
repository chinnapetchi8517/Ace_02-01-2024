import React from 'react';
import {View, Text, StatusBar, Pressable} from 'react-native';
import Images from '../../assets';
import _const from '../../constant/const';
import styles from './styles';
import color from '../../constant/color';

const HeadBackWrapper = ({navigation, headerTitle, children, onPressBack}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Pressable style={styles.backContainer} onPress={onPressBack}>
            <Images.LeftArrow width={13} height={13} fill={color.black100} />
          </Pressable>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
        </View>
        <Images.Bookmark width={24} height={24} fill={color.neutral400} />
      </View>
      <View style={{width: '100%'}}>{children}</View>
    </View>
  );
};

export default HeadBackWrapper;
