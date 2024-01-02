import React, {useState} from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryTooltip,
  VictoryStack,
} from 'victory-native';
import color from '../../constant/color';
import _const from '../../constant/const';

import {formatNumber} from '../../utils/helper';
export default ColumnChart = ({
  colorScale,
  stack1Data,
  stack2Data,
  stack3Data,
  nameScale,
  width,
  height,
}) => {
  const [activate, setActivate] = useState(false);
  return (
    <VictoryChart
      domainPadding={25}
      width={width}
      height={height}
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          activateData={true}
          onTouchStart={() => setActivate(true)}
          onTouchEnd={() => setActivate(false)}
          labels={({datum}) => `${datum.childName}:${formatNumber(datum.y)}`}
          labelComponent={
            <VictoryTooltip
              cornerRadius={4}
              style={{fill: color.white}}
              flyoutStyle={{
                fill: color.neutral900,
                padding: 11,
                fontSize: 11,
                fontFamily: _const.blissRegular,
              }}
              orientation={'top'}
            />
          }
        />
      }>
      <VictoryAxis
        dependentAxis
        standalone={false}
        style={{
          axis: {strokeWidth: 0},
          tickLabels: {
            fill: '#6B7280',
            fontSize: 11,
          },
        }}
        tickFormat={t => formatNumber(t)}
      />
      <VictoryStack
        horizontal
        colorScale={colorScale}
        labels={({datum}) => datum.x}
        style={{
          data: {
            fillOpacity: ({active}) => (activate ? (active ? 1 : 0.45) : 1),
          },
          labels: {
            fontFamily: _const.blissBold,
            fontSize: 10,
            fill: color.neutral800,
          },
        }}>
        <VictoryBar name={nameScale[0]} data={stack1Data} />
        <VictoryBar name={nameScale[1]} data={stack2Data} />
        <VictoryBar name={nameScale[2]} data={stack3Data} />
      </VictoryStack>
    </VictoryChart>
  );
};
