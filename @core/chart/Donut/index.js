// Donut Chart
import React, {useState} from 'react';
import {VictoryPie, VictoryTooltip} from 'victory-native';
import color from '../../constant/color';
import _const from '../../constant/const';
import { formatNumber } from '../../utils/helper';
// Component
import CustomWrappedLegend from '../Legend/index';

// Style
import styles from './styles';

const DonutChart = ({data, colors, width = 362, height = 406}) => {
  const [activate, setActivate] = useState(false);

  return (
    <VictoryPie
      width={width}
      height={height}
      data={data}
      x={'x'}
      y={'y'}
      innerRadius={width / 5.5}
      labelRadius={width / 4.5}
      labels={({datum, index}) => `${datum.x}\n${formatNumber(datum.y)}`}
      style={{
        data: {fillOpacity: ({active}) => (activate ? (active ? 1 : 0.45) : 1)},
      }}
      animate={{
        duration: 1000,
        onLoad: {duration: 1000},
      }}
      padAngle={1}
      colorScale={colors}
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

export default DonutChart;
