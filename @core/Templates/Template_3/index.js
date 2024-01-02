import {Dimensions, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import color from '../../constant/color';
import _const from '../../constant/const';
import styles from './styles';
import Images from '../../assets';

import SwitchSelector from '../../components/SwitchSelector';

import Temp1PlaceHolder from '../../components/skeletonPlaceholder/Template1';

// API
import graphQLApi from '../../service/graphQLApi';
// Query
import {GROUP_BY_DATA} from '../../query/template';

import HorizontalBarChart from '../../chart/HorizontalBarchart';
import CustomWrappedLegend from '../../chart/Legend';
import isEmpty from '../../utils/empty_checks';

const optionsData = [
  {label: 'Last Month', value: 1},
  {label: 'This Month', value: 2},
  {label: 'This Year', value: 3},
];

const Template3 = props => {
  const {
    template_id,
    tableName,
    title,
    id,
    navigation,
    isBookmarked,
    hideTitle,
    sliderOption,
    data,
    column,
    fieldsColumn,
  } = props;
  const [chartData, setChartData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const {width, height} = Dimensions.get('screen');

  useEffect(() => {
    setLoading(true);
    let variables = {
      tableName: tableName,
      params: {
        [column]: '',
      },
      fields: fieldsColumn,
      limit: null,
      offset: null,
    };
    graphQLApi(GROUP_BY_DATA, variables, navigation)
      .then(res => {
        const dynamicData = res?.data?.data?.GroupData;
        formatChartData(dynamicData, 2);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, [data]);

  const formatChartData = (data, value) => {
    let formatData = data.map(item => ({
      x: item.result[column],
      y: item.result[fieldsColumn][0],
    }));
    setChartData(formatData);
  };

  return !isloading ? (
    <View style={styles.container}>
      {!hideTitle ? (
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <Images.Bookmark
              width={24}
              height={24}
              fill={isBookmarked ? color.neutral400 : color.neutral400}
              onPress={() => {}}
            />
          </View>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>
        </View>
      ) : (
        <View></View>
      )}
      <View style={styles.body}>
        {/* <SwitchSelector
          options={optionsData}
          handleClick={option => {
            handleClickSelector(option);
          }}
          containerStyles={{
            width: '80%',
          }}
          initialValue={1}
          backgroundColor={color.white00}
        /> */}
        <HorizontalBarChart
          highlightedColor={'#1890FF'}
          unhighlightedColor={color.neutral200}
          data={chartData}
        />
      </View>
    </View>
  ) : (
    <Temp1PlaceHolder disableHeader={true} />
  );
};

export default Template3;
