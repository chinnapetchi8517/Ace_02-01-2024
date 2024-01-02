import React, {Fragment} from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './styles';
import color from '../../../constant/color';
const Temp12PlaceHolder = ({}) => {
  return (
    <View style={{backgroundColor: color.white, borderRadius: 8, width: "100%"}}>
      <SkeletonPlaceholder borderRadius={8}>
        <View style={styles.TemplateContainer}>
          <View style={styles.metricValueBody}>
            <View style={{width: '90%', height: 73}} />
            <View style={{height: 2, width: '100%', marginVertical: 11}} />
            <View style={{width: '90%', height: 73}} />
          </View>
          <View style={{marginVertical: 30, width: 132, height: 32}} />
          <View style={{width: '100%', height: 210}} />
          <View style={{width: '80%', height: 20, marginVertical: 16}} />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default Temp1PlaceHolder;
