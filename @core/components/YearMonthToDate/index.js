import React from 'react';
import {View, Text} from 'react-native';
import _const from '../../constant/const';
import Images from '../../assets';
import styles from './styles';
import color from '../../constant/color';

const YearMonthToDate = props => {
  const {
    value,
    isIncrement,
    isMonth,
    targetValue,
    previousValue,
    isTargetIncrement,
    width,
  } = props;

  return (
    <View style={[styles.container, {width: width}]}>
      <Text style={styles.title}>
        {isMonth ? 'Month to Date' : 'Year to Date'}
      </Text>
      <View style={styles.rowContainer}>
        <Text style={styles.value}>{value}</Text>
        <View>
          <View style={styles.previousTargetContainer}>
            {isIncrement ? (
              <Images.Increment></Images.Increment>
            ) : (
              <Images.Decrement></Images.Decrement>
            )}
            <Text
              style={[
                styles.previousValue,
                {color: isIncrement ? color.success600 : color.error500},
              ]}>
              {previousValue}
            </Text>
          </View>
          <Text style={styles.previousTargetLabel}>
            {isMonth ? 'Previous Month' : 'Previous Year'}
          </Text>
        </View>
        <View>
          <View style={styles.previousTargetContainer}>
            {targetValue != 0 &&
              (isTargetIncrement ? (
                <Images.Increment></Images.Increment>
              ) : (
                <Images.Decrement></Images.Decrement>
              ))}

            <Text
              style={[
                styles.targetValue,
                {
                  color:
                    targetValue == 0
                      ? color.neutral900
                      : isTargetIncrement
                      ? color.success600
                      : color.error500,
                },
              ]}>
              {targetValue != 0 ? targetValue : '-'}
            </Text>
          </View>
          <Text style={styles.previousTargetLabel}>Target Plan</Text>
        </View>
      </View>
    </View>
  );
};

export default YearMonthToDate;
