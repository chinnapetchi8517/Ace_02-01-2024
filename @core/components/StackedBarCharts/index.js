import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  VictoryChart,
  VictoryBar,
  VictoryStack,
  VictoryAxis,
  VictoryTheme,
} from 'victory-native';
import _const from '../../constant/const';
import color from '../../constant/color';
import styles from './styles';

const VictoryStackChart = props => {
  const {data} = props;

  return (
    <View style={styles.container}>
      <VictoryChart>
        <VictoryStack
          domain={{x: [1.3, 4.8], y: [0, 7.0]}}
          domainPadding={{x: [0, 15], y: 0}}>
          <VictoryBar
            barWidth={40}
            data={data}
            x="category"
            y="value1"
            color="#1890FF"
          />
          <VictoryBar
            barWidth={40}
            data={data}
            x="category"
            y="value2"
            color="#13C2C2"
          />
          <VictoryBar
            barWidth={40}
            data={data}
            x="category"
            y="value3"
            color="#FACC14"
          />
        </VictoryStack>
        <VictoryAxis
          theme={VictoryTheme.material}
          style={styles.xAxisStyle}
        />
        <VictoryAxis
          theme={VictoryTheme.material}
          dependentAxis
          orientation="right"
          style={styles.yAxisStyle}
        />
      </VictoryChart>
    </View>
  );
};

export default VictoryStackChart;
