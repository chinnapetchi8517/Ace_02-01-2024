import React, {useState} from 'react';
import {
  VictoryChart,
  VictoryArea,
  VictoryAxis,
  VictoryBar,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryScatter,
} from 'victory-native';
import color from '../../constant/color';
import _const from '../../constant/const';
import {formatNumber} from '../../utils/helper';
export default FlowMetricChart = ({
  areaData,
  bar1Data,
  bar2Data,
  bar3Data,
  width = 300,
  height = 300,
  colorScale,
  nameScale,
  numberOfMonths,
}) => {
  const [activate, setActivate] = useState(false);
  return (
    <VictoryChart
      width={width}
      height={height}
      domainPadding={{x: [0, 20]}}
      containerComponent={
        <VictoryVoronoiContainer
          height={height}
          voronoiDimension="x"
          voronoiBlacklist={[nameScale[3]]}
          activateData={true}
          onTouchStart={() => setActivate(true)}
          onTouchEnd={() => setActivate(false)}
          labels={({datum}) => `${datum.childName}:${formatNumber(datum.y, true)}`}
          labelComponent={
            <VictoryTooltip
              constrainToVisibleArea={true}
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
        style={{
          axis: {strokeWidth: 0},
          tickLabels: {
            fill: '#6B7280',
            fontSize: 11,
          },
        }}
        // tickFormat={(t, index) =>
        //   numberOfMonths > 6 && index % 2 === 0 ? '' : t
        // }
        fixLabelOverlap={true}
      />

      <VictoryArea
        name={nameScale[0]}
        interpolation="natural"
        style={{
          data: {
            stroke: colorScale[0],
            strokeWidth: 1.5,
            strokeLinecap: 'round',
            fill: colorScale[1],
          },
        }}
        data={areaData}
        height={height}
      />

      <VictoryAxis
        dependentAxis
        orientation="right"
        standalone={false}
        style={{
          axis: {strokeWidth: 0},
          tickLabels: {
            fill: '#6B7280',
            fontSize: 11,
          },
          grid: {stroke: '#9CA3AF', strokeWidth: 0.5, strokeDasharray: 3},
        }}
        tickFormat={t => formatNumber(t, true)}
      />

      <VictoryBar
        name={nameScale[1]}
        style={{
          data: {
            fill: colorScale[2],
            fillOpacity: ({active}) => (activate ? (active ? 1 : 0.45) : 1),
          },
        }}
        barRatio={0.7}
        data={bar1Data}
        height={height}
      />
      <VictoryBar
        name={nameScale[2]}
        style={{
          data: {
            fill: colorScale[3],
            fillOpacity: ({active}) => (activate ? (active ? 1 : 0.3) : 1),
          },
        }}
        barRatio={0.7}
        data={bar2Data}
        height={height}
      />
      <VictoryScatter
        name={nameScale[3]}
        style={{
          data: {
            fill: colorScale[4],
            fillOpacity: ({active}) => (activate ? (active ? 1 : 0.3) : 1),
          },
        }}
        data={bar3Data}
        symbol={'minus'}
        size={6}
        height={height}

        // barWidth={8}
      />
    </VictoryChart>
  );
};
