import React, {useState} from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryTooltip,
} from 'victory-native';
import color from '../../constant/color';
import _const from '../../constant/const';
import {formatNumber} from '../../utils/helper';
const ColumnChart = ({
  data,
  width,
  height,
  highlightedColor,
  unhighlightedColor,
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
          labels={({datum}) => `${datum.x}\n${formatNumber(datum.y)}`}
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
      <VictoryBar
        name="M0"
        style={{
          data: {
            fill: ({active}) =>
              activate
                ? active
                  ? highlightedColor
                  : unhighlightedColor
                : highlightedColor,
          },
          labels: {
            fontFamily: _const.blissBold,
            fontSize: 10,
            fill: color.neutral800,
          },
        }}
        barRatio={0.7}
        labels={({datum}) => `${formatNumber(datum.y)}`}
        data={data}
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
    </VictoryChart>
  );
};

export default ColumnChart;
