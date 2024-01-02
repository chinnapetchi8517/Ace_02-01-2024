import React, {useState, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {VictoryChart, VictoryAxis, VictoryArea} from 'victory-native';

const TinyAreaChartExample = props => {
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
        <VictoryArea
          data={data}
          interpolation="natural"
          style={{
            data: {
              fill: color?.light,
              strokeWidth: 3,
              strokeLinecap: 'round',
              stroke: color?.dark,
            },
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default TinyAreaChartExample;
