import {Text, View, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MMKV} from 'react-native-mmkv';
import color from '../../constant/color';
import _const from '../../constant/const';
import styles from './styles';
import Images from '../../assets';
import LineChart from '../../chart/LineChart';
// API
import graphQLApi from '../../service/graphQLApi';

// Query
import {GROUP_BY_DATA} from '../../query/template';
import CustomWrappedLegend from '../../chart/Legend';
import Temp1PlaceHolder from '../../components/skeletonPlaceholder/Template1';

const Template7 = props => {
  const {
    template_id,
    tableName,
    title,
    id,
    navigation,
    isBookmarked,
    hideTitle,
    sliderOption,
    column,
    fieldsColumn,
  } = props;

  const optionsData = [
    {label: '6M', value: 'option1'},
    {label: '1Y', value: 'option2'},
  ];

  const [responseData, setResponseData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [legendArray, setLegendArray] = useState([]);
  const [isloading, setLoading] = useState(true);
  const storage = new MMKV();
  const {width, height} = Dimensions.get('screen');
  const monthsArray =
    storage.getString(_const.month) &&
    JSON.parse(storage.getString(_const.month));

  useEffect(() => {
    let variables = {
      tableName: tableName,
      params: {
        [column]: '',
      },
      fields: fieldsColumn,
      limit: null,
      offset: null,
    };
    setLoading(true);
    graphQLApi(GROUP_BY_DATA, variables, navigation)
      .then(res => {
        const dynamicData = res?.data?.data?.GroupData;
        setResponseData(dynamicData);
        const {formattedData, boardingRates} = formatDataForLineChart(
          dynamicData,
          monthsArray,
        );
        setChartData(formattedData);
        setLegendArray(boardingRates);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  function formatDataForLineChart(data, months) {
    const formattedData = [];
    const boardingRates = [];

    data.forEach(item => {
      const boardingRate = item.result[column];
      const mtdData = item.result[fieldsColumn];

      const formattedLine = months.slice(0, 6).map((month, index) => ({
        x: month,
        y: mtdData[index],
      }));

      formattedData.push(formattedLine.reverse());
      boardingRates.push(boardingRate);
    });

    return {formattedData, boardingRates};
  }

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
        <LineChart
          allLineData={chartData}
          colorScale={['#0877A8', '#00C1DE', '#40C2FB', '#7BADFB', '#22C55E']}
          nameScale={legendArray}
          idxArr={['0', '1', '2', '3']}
        />
        <CustomWrappedLegend
          data={legendArray}
          colors={['#0877A8', '#00C1DE', '#40C2FB', '#7BADFB', '#22C55E']}
          width={width - 90}
        />
      </View>
    </View>
  ) : (
    <Temp1PlaceHolder disableHeader={true} />
  );
};

export default Template7;
