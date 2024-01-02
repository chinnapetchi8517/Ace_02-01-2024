// Card Component
import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MMKV} from 'react-native-mmkv';

// Style
import styles from './style';

// Image
import Images from '../../assets';

// Const
import color from '../../constant/color';
import _const from '../../constant/const';

// Helper
import {formatNumber, formatChartData} from '../../utils/helper';

// API
import graphQLApi from '../../service/graphQLApi';

// Query
import {TEMPLATE_DATA} from '../../query/template';

// Chart
import TinyAreaChartExample from '../../chart/TinyAreaChart';

import TinyBarChartExample from './chart';

const mockData = {
  m1: 25718389,
  m2: 25727492,
  m3: 25716165,
  m4: 25724955,
  m5: 25744478,
  m6: 25709464,
  m7: 25742920,
  m8: 25703566,
  m9: 25697094,
  m10: 25706842,
  m11: 25712810,
  m12: 25699002,
};

const Card = props => {
  const {
    title,
    tableName,
    columnKey,
    columnValue,
    chartColor,
    chartColumn,
    navigation,
    isDark,
    isAreaChart,
    filter,
  } = props;
  const [channelData, setChannelData] = useState({});

  const storage = new MMKV();
  const monthsArray =
    storage.getString(_const.month) &&
    JSON.parse(storage.getString(_const.month));
  const currentMonthIndex = 12;

  useEffect(() => {
    let variables = {
      tableName: tableName,
      params:
        columnKey !== 'NA'
          ? {
              [columnKey]: columnValue,
              ...filter,
            }
          : filter
          ? filter
          : {},
      fields: chartColumn,
    };
    graphQLApi(TEMPLATE_DATA, variables, navigation)
      .then(res => {
        setChannelData(res?.data?.data?.TemplateData?.[0]?.result);
      })
      .catch(err => {});
  }, []);

  const chartData =
    channelData &&
    formatChartData(
      channelData,
      monthsArray,
      currentMonthIndex,
      chartColumn,
      0,
      12,
    );

  let channelValue =
    channelData && formatNumber(channelData?.[chartColumn]?.[0], true);
  let channelIsIncrement =
    channelData &&
    channelData?.[chartColumn]?.[0] - channelData?.[chartColumn]?.[1] > 0;
  let channelDescription =
    channelData &&
    formatNumber(
      channelData?.[chartColumn]?.[0] - channelData?.[chartColumn]?.[1],
      false,
    );

  if (channelData && Object.keys(channelData)?.length === 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.cardWrapper,
        {backgroundColor: isDark ? color.secondary200 : color.white00},
      ]}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title}</Text>
          <View>
            <Images.ArrowLink fill={color.neutral900} />
          </View>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.leftContainer}>
            <Text style={styles.value}>{channelValue}</Text>
            <View style={styles.descriptionConatiner}>
              <View>
                {channelIsIncrement ? (
                  <Images.Increment width={15} height={15} />
                ) : (
                  <Images.Decrement width={15} height={15} />
                )}
              </View>
              <Text
                style={[
                  styles.descriptionText,
                  channelIsIncrement && styles.descriptionTextIncrement,
                ]}>
                {channelDescription} from plan
              </Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            {isAreaChart ? (
              <TinyAreaChartExample
                data={chartData}
                widthRatio={0.45}
                height={50}
                color={chartColor}
              />
            ) : (
              <TinyBarChartExample
                widthRatio={0.45}
                height={50}
                data={chartData}
                color={chartColor}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;
