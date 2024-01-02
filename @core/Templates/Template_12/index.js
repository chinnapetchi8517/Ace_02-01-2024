import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MMKV} from 'react-native-mmkv';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

// Styles
import styles from './styles';

// Images
import Images from '../../assets';

// Const
import color from '../../constant/color';
import _const from '../../constant/const';

// Chart
import TinyBarChartExample from '../../components/Card/chart';

// Query
import {TEMPLATE_DATA} from '../../query/template';

// API
import graphQLApi from '../../service/graphQLApi';

// Helper
import {formatChartData, formatNumber} from '../../utils/helper';

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

const Template12 = props => {
  const {
    id,
    template_id,
    tableName,
    title,
    navigation,
    level,
    productSegement,
    filter,
    level2SliderData,
  } = props;
  const [isloading, setLoading] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const storage = new MMKV();
  const monthsArray =
    storage.getString(_const.month) &&
    JSON.parse(storage.getString(_const.month));
  const currentMonthIndex = 12;

  useEffect(() => {
    let variables = {
      tableName: tableName,
      params: filter && Object.keys(filter).length > 0 ? filter : {},
      fields: 'month_end,last_year_end',
    };
    setLoading(true);
    graphQLApi(TEMPLATE_DATA, variables, navigation)
      .then(res => {
        setDataItem(res?.data?.data?.TemplateData?.[0]?.result);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  const templateData = {
    value:
      productSegement === 2
        ? formatNumber(dataItem?.month_end?.[0], true)
        : productSegement === 1
        ? formatNumber(dataItem?.month_end?.[1], true)
        : formatNumber(dataItem?.last_year_end?.[0], true),
    previousValue:
      productSegement === 2
        ? formatNumber(
            dataItem?.month_end?.[0] - dataItem?.month_end?.[1],
            true,
          )
        : productSegement === 1
        ? formatNumber(
            dataItem?.month_end?.[1] - dataItem?.month_end?.[2],
            true,
          )
        : formatNumber(
            dataItem?.last_year_end?.[0] - dataItem?.last_year_end?.[1],
            true,
          ),
    isIncrement:
      productSegement === 2
        ? dataItem?.month_end?.[0] - dataItem?.month_end?.[1] > 0
        : productSegement === 1
        ? dataItem?.month_end?.[1] - dataItem?.month_end?.[2] > 0
        : dataItem?.last_year_end?.[0] - dataItem?.last_year_end?.[1] > 0,
  };

  const chartData =
    dataItem &&
    formatChartData(
      dataItem,
      monthsArray,
      currentMonthIndex,
      'month_end',
      0,
      12,
    );

  const handleClickCard = () => {
    storage.set(_const.level2SliderCache, JSON.stringify(level2SliderData));
    navigation.navigate(`Level${level + 1}`, {id});
  };

  return (
    <Pressable
      style={styles.templateWrapper}
      onPress={() => handleClickCard(id)}>
      <SkeletonPlaceholder
        enabled={isloading}
        backgroundColor={color.primary200}
        highlightColor={color.primary300}>
        <View style={styles.templateContent}>
          <Text style={styles.templateTitle}>{title}</Text>
          <Text style={styles.templateValue}>{templateData?.value}</Text>
          <View style={styles.averageConatiner}>
            <View
              style={[
                styles.averageValueConatiner,
                {
                  borderColor: templateData?.isIncrement
                    ? color.success500
                    : color.error500,
                },
              ]}>
              {templateData?.isIncrement ? (
                <Images.Increment></Images.Increment>
              ) : (
                <Images.Decrement></Images.Decrement>
              )}
              <Text
                style={[
                  styles.averageText,
                  {
                    color: templateData?.isIncrement
                      ? color.success500
                      : color.error500,
                  },
                ]}>
                {templateData?.previousValue}
              </Text>
            </View>
            <Text style={styles.lastMonthText}>
              {productSegement === 3 ? 'Prev Year' : 'Prev Month'}
            </Text>
          </View>
          <View style={{marginTop: 16}}>
            <TinyBarChartExample
              data={chartData}
              widthRatio={0.35}
              height={30}
              color={'#1890FF'}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
    </Pressable>
  );
};

export default Template12;
