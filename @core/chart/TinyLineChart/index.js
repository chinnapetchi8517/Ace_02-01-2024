import React, {useState, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {VictoryLine, VictoryChart, VictoryAxis} from 'victory-native';

const TinyLineChartExample = props => {
  const {data, color, widthRatio, height} = props;
  const [chartWidth, setChartWidth] = useState(180);

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const calculatedChartWidth = screenWidth * widthRatio;
    setChartWidth(calculatedChartWidth);
  }, []);

  return (
    <View>
      <VictoryChart
        width={chartWidth - 18}
        height={height}
        domainPadding={{x: 5}}
        padding={{top: 0, bottom: 0, left: 0, right: 0}}>
        <VictoryAxis style={{axis: {stroke: 'transparent'}}} />
        <VictoryAxis dependentAxis style={{axis: {stroke: 'transparent'}}} />
        <VictoryLine data={data} style={{data: {stroke: color}}} />
      </VictoryChart>
    </View>
  );
};

export default TinyLineChartExample;
