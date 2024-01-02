import React from 'react';
import {View, Dimensions} from 'react-native';
import {VictoryBar, VictoryChart, VictoryAxis} from 'victory-native';
const screenWidth = Dimensions.get('window').width;

const TinyBarChartExample = props => {
  const {data, color, widthRatio, height} = props;

  return (
    <View>
      <VictoryChart
        width={(screenWidth*widthRatio) - 18}
        height={height}
        domainPadding={{x: 5}}
        padding={{top: 0, bottom: 0, left: 0, right: 0}}>
        <VictoryAxis style={{axis: {stroke: 'transparent'}}} />
        <VictoryAxis dependentAxis style={{axis: {stroke: 'transparent'}}} />
        <VictoryBar barWidth={8} data={data} style={{data: {fill: color}}} />
      </VictoryChart>
    </View>
  );
};

export default TinyBarChartExample;
