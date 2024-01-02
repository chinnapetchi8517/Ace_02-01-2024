import React from 'react';
import {View, Text} from 'react-native';
import _const from '../../constant/const';
import Images from '../../assets';
import styles from './styles';
import color from '../../constant/color';

const AsYesterday = props => {
  const {value, isIncrement, varianceValue, planName} = props;

  return (
    <React.Fragment>
      <Text style={styles.title}>As of Yesterday</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.value}>{value}</Text>
        <View>
          <View style={styles.varianceContainer}>
            {isIncrement ? (
              <Images.Increment></Images.Increment>
            ) : (
              <Images.Decrement></Images.Decrement>
            )}
            <Text
              style={[styles.varianceValue,
              {color:isIncrement ? color.success600 : color.error500}]}>
            {varianceValue}</Text>
          </View>
        </View>
        <Text style={styles.planNameLabel}>{'vs' + planName}</Text>
      </View>
    </React.Fragment>
  );
};

export default AsYesterday;
