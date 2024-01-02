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

export default HorizontalBarChart = ({
  data,
  width,
  height,
  highlightedColor,
  unhighlightedColor,
}) => {
  const [activate, setActivate] = useState(false);
  return (
    <VictoryChart
      width={width}
      height={height}
      horizontal
      domainPadding={25}
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          activateData={true}
          onTouchStart={() => setActivate(true)}
          onTouchEnd={() => setActivate(false)}
          labels={({datum}) => `${datum.x}\n${formatNumber(datum.y, true)}`}
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
              orientation={'bottom'}
            />
          }
        />
      }>
      <VictoryAxis
        dependentAxis
        style={{
          axis: {strokeWidth: 0},
          tickLabels: {
            fill: '#6B7280',
            fontSize: 11,
          },
        }}
        tickFormat={t => formatNumber(t, true)}
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
        barRatio={0.8}
        labels={({datum}) => `${datum.x}`}
        data={data}
      />
    </VictoryChart>
  );
};
