import React, {useState} from 'react';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryScatter,
} from 'victory-native';
import color from '../../constant/color';
import _const from '../../constant/const';
import { formatNumber } from '../../utils/helper';
export default LineChart = ({
  allLineData,
  width,
  height,
  nameScale,
  colorScale,
  idxArr,
}) => {
  const [activate, setActivate] = useState('');
  return (
    <VictoryChart
      domainPadding={25}
      width={width}
      height={height}
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          voronoiBlacklist={['Marker', ...idxArr]}
          onTouchEnd={() => setActivate('')}
          onActivated={points => setActivate(points?.[0]?.x)}
          labels={({datum}) => `${datum?.childName}:${formatNumber(datum?.y)}`}
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
              orientation={'left'}
            />
          }
        />
      }
      >
      {allLineData?.map((data, index) => (
        <VictoryLine
          key={'Line' + index}
          name={nameScale[index]}
          style={{data: {stroke: colorScale[index], strokeWidth: 1.5}}}
          data={data}
        />
      ))}
      {activate != '' && (
        <VictoryLine
          name="Marker"
          style={{
            data: {stroke: '#111827', strokeWidth: 1},
          }}
          x={() => activate}
        />
      )}
      {allLineData?.map((data, index) => (
        <VictoryScatter
          key={'Scatter' + index}
          style={{
            data: {
              fill: ({datum}) =>
                datum.x == activate ? color.neutral900 : 'transparent',
              stroke: ({datum}) =>
                datum.x == activate ? color.white00 : 'transparent',
              strokeWidth: 3,
            },
          }}
          size={5}
          data={data}
          name={`${index}`}
        />
      ))}
      <VictoryAxis
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
        dependentAxis
        orientation="right"
        crossAxis={true}
        standalone={false}
        style={{
          axis: {strokeWidth: 0},
          tickLabels: {
            fill: '#6B7280',
            fontSize: 11,
          },
          grid: {stroke: '#9CA3AF', strokeWidth: 0.5, strokeDasharray: 3},
        }}
        tickFormat={t => formatNumber(t)}
      />
    </VictoryChart>
  );
};
