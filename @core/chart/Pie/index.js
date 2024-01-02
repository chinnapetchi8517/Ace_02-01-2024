// Pie Chart
import React, {useState} from 'react';
import {
  VictoryPie,
  Slice,
  VictoryTooltip,
  VictoryLabel,
  VictoryGroup,
} from 'victory-native';
import color from '../../constant/color';
import _const from '../../constant/const';
import { formatNumber } from '../../utils/helper';
// Component

// Style

const PieChart = ({data, width, height, colors}) => {
  const [activate, setActivate] = useState(false);
  return (
    <VictoryPie
      data={data}
      height={height}
      width={width}
      colorScale={colors}
      x={'x'}
      y={'y'}
      labelRadius={width / 5}
      style={{
        data: {fillOpacity: ({active}) => (activate ? (active ? 1 : 0.45) : 1)},
      }}
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
          renderInPortal={false}
        />
      }
      events={[
        {
          target: 'data',
          eventHandlers: {
            onPressIn: ({nativeEvent}) => {
              setActivate(true);
              return [
                {
                  // Add an event to reset all the points to the original color
                  target: 'data',
                  mutation: () => ({active: true}),
                },
                {
                  target: 'labels',
                  mutation: () => ({active: true}),
                },
              ];
            },
            onPressOut: ({nativeEvent}) => {
              setActivate(false);
              return [
                {
                  target: 'data',
                  mutation: () => ({active: false}),
                },
                {
                  target: 'labels',
                  mutation: () => ({active: false}),
                },
              ];
            },
          },
        },
      ]}
    />
  );
};

export default PieChart;
