import React from 'react';
import {View, Text} from 'react-native';
import _const from '../../constant/const';
import Images from '../../assets';
import styles from './styles';
import color from '../../constant/color';

const GrowthYearMonth = props => {
  const {value, isMonth, isIncrement, varianceValue,} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isMonth ? 'Growth this Month' : 'Growth this Year'}
      </Text>
      <View>
        <Text style={styles.value}>{value}</Text>
        <View style={styles.rowContainer}>
          <View style={styles.varianceContainer}>
            {isIncrement ? (
              <Images.Increment></Images.Increment>
            ) : (
              <Images.Decrement></Images.Decrement>
            )}
            <Text
              style={[styles.varianceValue,
              {color:isIncrement ? color.success600 : color.error500}]}>
              {varianceValue} 
            </Text>
          </View>
          <Text style={styles.planNameLabel}>
            {isMonth ? 'vs. MTD last month' : 'vs. YTD last year'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default GrowthYearMonth;
