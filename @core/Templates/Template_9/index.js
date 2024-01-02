import {Dimensions, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import color from '../../constant/color';
import _const from '../../constant/const';
import styles from './styles';
import Images from '../../assets';
import StackedBarChart from '../../chart/StackedBarChart';
import CustomWrappedLegend from '../../chart/Legend';

// API
import graphQLApi from '../../service/graphQLApi';
// Query
import TemplateQuery from '../../query/template';
import isEmpty from '../../utils/empty_checks';

const Template9 = props => {
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

  const [chartData, setChartData] = useState({});
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
    setChartData(formatData(data));
  }, [data]);

  function formatData(apiResponse) {
    const formattedData = {stack1: [], stack2: [], stack3: []};
    const numMonths = 24;

    apiResponse?.forEach(groupData => {
      const result = groupData.result;
      const attCategory = result.att_category;
      const mtdValues = result.mtd;
      const ytdValues = result.ytd;

      // Calculate the sum of values for every group of 3 months
      for (let i = 0; i < numMonths; i += 3) {
        const rangeStart = i + 1;
        const rangeEnd = i + 3;
        const xLabel = `${rangeStart}-${rangeEnd}`;

        const last3MonthsSum = ytdValues
          .slice(i, i + 3)
          .reduce((acc, val) => acc + val, 0);
        formattedData.stack1.push({x: xLabel, y: last3MonthsSum});
        formattedData.stack2.push({
          x: xLabel,
          y: mtdValues.slice(i, i + 3).reduce((acc, val) => acc + val, 0),
        });
        formattedData.stack3.push({x: xLabel, y: last3MonthsSum});
      }
    });

    return formattedData;
  }

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
        <StackedBarChart
          colorScale={_const.colorScale}
          stack1Data={chartData.stack1}
          stack2Data={chartData.stack2}
          stack3Data={chartData.stack3}
          nameScale={nameScale}
        />
        <CustomWrappedLegend
          data={nameScale}
          colors={['#3BA1FF', '#FBD437', '#36CBCB']}
          width={width - 90}
        />
      </View>
    </View>
  );
};

export default Template9;
