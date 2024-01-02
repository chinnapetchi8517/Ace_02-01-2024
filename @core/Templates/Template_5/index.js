import {Dimensions, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import color from '../../constant/color';
import _const from '../../constant/const';
import styles from './styles';
import Images from '../../assets';

import DonutChart from '../../chart/Donut';
import SwitchSelector from '../../components/SwitchSelector';
import CustomWrappedLegend from '../../chart/Legend';

// API
import graphQLApi from '../../service/graphQLApi';
import isEmpty from '../../utils/empty_checks';

// Query
import TemplateQuery from '../../query/template';

const optionsData = [
  {label: 'Last Month', value: 1},
  {label: 'This Month', value: 2},
  {label: 'This Year', value: 3},
];

const Template5 = props => {
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
  } = props;

  const [chartData, setChartData] = useState([]);
  const {width, height} = Dimensions.get('screen');
  const nameScale = ['Buyout', 'Pre-closures', 'Maturity'];

  useEffect(() => {
    if (isEmpty(data)) {
      let query = TemplateQuery({
        template_id: template_id,
        tableName: tableName,
      });
      graphQLApi(query)
        .then(res => {
        })
        .catch(err => {
        });
    }
    formatChartData(data, 2);
  }, [data]);

  const formatChartData = (data, value) => {
    let formatData = data.map(item => ({
      x: item.result.att_category,
      y:
        value === 2
          ? item.result.mtd[0]
          : value === 1
          ? item?.result.mtd[1]
          : item?.result.ytd[0],
    }));
    setChartData(formatData);
  };

  const handleClickSelector = option => {
    formatChartData(data, option);
  };

  return (
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
        <SwitchSelector
          options={optionsData}
          handleClick={option => {
            handleClickSelector(option);
          }}
          containerStyles={{
            width: '80%',
          }}
          initialValue={1}
          backgroundColor={color.white00}
        />
        <DonutChart data={chartData} colors={_const.colorScale} />
        <CustomWrappedLegend
          data={nameScale}
          colors={['#3BA1FF', '#FBD437', '#36CBCB']}
          width={width - 90}
        />
      </View>
    </View>
  );
};

export default Template5;
