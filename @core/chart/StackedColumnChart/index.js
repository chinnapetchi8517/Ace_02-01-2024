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
            />
          }
        />
      }>
      <VictoryAxis
        dependentAxis
        orientation="right"
        standalone={false}
        tickFormat={label => (label > 0 ? formatNumber(label) : '')}
        style={{
          axis: {strokeWidth: 0},
          tickLabels: {
            fill: '#6B7280',
            fontSize: 11,
          },
          grid: {stroke: '#9CA3AF', strokeWidth: 0.5, strokeDasharray: 3},
        }}
      />
      <VictoryAxis
        style={{
          axis: {strokeWidth: 0},
          tickLabels: {
            fill: '#6B7280',
            fontSize: 11,
          },
        }}
      />
      <VictoryStack
        colorScale={colorScale}
        animate={{
          duration: 1000,
          onLoad: {duration: 1000},
        }}
        style={{
          data: {
            fillOpacity: ({active}) => (activate ? (active ? 1 : 0.45) : 1),
          },
        }}>
        <VictoryBar barRatio={0.8} name={nameScale[0]} data={stack1Data} />
        <VictoryBar barRatio={0.8} name={nameScale[1]} data={stack2Data} />
        <VictoryBar barRatio={0.8} name={nameScale[2]} data={stack3Data} />
      </VictoryStack>
    </VictoryChart>
  );
};
