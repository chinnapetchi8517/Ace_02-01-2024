import {Pressable, StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useEffect, Fragment, useState} from 'react';

// API
import graphQLApi from '../../service/graphQLApi';

// Query
import TemplateQuery from '../../query/template';
import {TEMPLATE_DATA, TEMPLATE_LEGEND_DATA} from '../../query/template';

import color from '../../constant/color';
import _const from '../../constant/const';
import styles from './styles';
import Images from '../../assets';
import AsYesterday from '../../components/AsYesterday';
import GrowthYearMonth from '../../components/GrowthYearMonth';
import Switch from '../../components/SwitchSelector';
import CustomWrappedLegend from '../../chart/Legend';
import StockMetricChart from '../../chart/StockMetricChart';
import Temp2PlaceHolder from '../../components/skeletonPlaceholder/Template2';
import {formatNumber} from '../../utils/helper';
import {MMKV} from 'react-native-mmkv';

const optionsData = [
  {label: '6M', value: 6},
  {label: '1Y', value: 12},
];

const {width, height} = Dimensions.get('screen');
const Template2 = props => {
  const {
    template_id,
    tableName,
    title,
    id,
    navigation,
    isBookmarked,
    disableCardHeader,
    sliderOption,
    level,
    isModal,
    filter,
  } = props;
  const [selectedOption, setSelectedOption] = useState(optionsData[0].value);
  const [isLoading, setLoading] = useState(true);
  const [dataItem, setDataItem] = useState({});
  const [lineChart, setLineChart] = useState([]);
  const [bar1Chart, setBar1Chart] = useState([]);
  const [bar2Chart, setBar2Chart] = useState([]);
  const [bar3Chart, setBar3Chart] = useState([]);
  const [bar4Chart, setBar4Chart] = useState([]);
  const [legends, setLegends] = useState([]);
  const storage = new MMKV();
  const monthsArray =
    storage.getString(_const.month) &&
    JSON.parse(storage.getString(_const.month));
  const currentMonthIndex = 12;

  useEffect(() => {
    let query = TemplateQuery({template_id: template_id, tableName: tableName});
    let tempVariables = {
      tableName: tableName,
      params: filter && Object.keys(filter).length > 0 ? filter : {},
      fields:
        'as_of_yesterday,growth_this_month,growth_this_year,total_inflow,total_outflow,month_end,targets',
    };
    setLoading(true);
    graphQLApi(TEMPLATE_DATA, tempVariables)
      .then(res => {
        let data = res?.data?.data?.TemplateData?.[0]?.result;
        setDataItem(data);
        fomatCharts(data, 6);
        fetchLegends();
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  const fetchLegends = () => {
    const variables = {
      id: template_id,
    };
    graphQLApi(TEMPLATE_LEGEND_DATA, variables)
      .then(res => {
        let data = res?.data?.data?.template ?? [];
        if (Array.isArray(data) && data.length > 0) {
          data = data[0];
          if (Array.isArray(data?.legend) && data?.legend.length > 0) {
            setLegends(data.legend);
          } else {
            setLegends([]);
          }
        } else {
          setLegends([]);
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const fomatCharts = (data, selectedMonth) => {
    let fomatLineChart = formatChartData(
      data,
      monthsArray,
      currentMonthIndex,
      'month_end',
      12,
      selectedMonth + 12,
    );
    let formatbar2data = formatChartData(
      data,
      monthsArray,
      currentMonthIndex,
      'total_inflow',
      0,
      selectedMonth,
    );
    const formatbar1data = formatChartData(
      data,
      monthsArray,
      currentMonthIndex,
      'month_end',
      0,
      selectedMonth,
    );
    const formatbar3data = formatChartData(
      data,
      monthsArray,
      currentMonthIndex,
      'targets',
      0,
      selectedMonth,
    );
    const formatbar4data = formatChartData(
      data,
      monthsArray,
      currentMonthIndex,
      'total_outflow',
      0,
      selectedMonth,
    );
    setLineChart(fomatLineChart);
    setBar1Chart(formatbar1data);
    setBar2Chart(formatbar2data);
    setBar3Chart(formatbar3data);
    setBar4Chart(formatbar4data);
  };

  const formatChartData = (
    data,
    months,
    currentIndex,
    key,
    intialValue,
    totalCount,
  ) => {
    const formattedData = [];

    const values = data[key];

    // Check if values is an array before attempting to iterate
    if (Array.isArray(values)) {
      for (let i = intialValue; i < totalCount; i++) {
        const index = i % values.length;
        const monthIndex = (currentIndex + index) % 12;
        const month = months[monthIndex];

        formattedData.push({
          x: month,
          y: key === 'total_outflow' ? -values[index] : values[index],
        });
      }
    }

    return formattedData.reverse();
  };

  // const data = [
  //   {x: 'branch', y: 60},
  //   {
  //     x: 'dev',
  //     y: 10,
  //   },
  //   {x: 'red', y: 12},
  //   {x: 'test', y: 18},
  // ];

  // const stack1data = [
  //   {x: 'branch', y: 60},
  //   {
  //     x: 'dev',
  //     y: 10,
  //   },
  //   {x: 'red', y: 12},
  //   {x: 'test', y: 18},
  // ];
  // const stack2data = [
  //   {x: 'branch', y: 50},
  //   {
  //     x: 'dev',
  //     y: 10,
  //   },
  //   {x: 'red', y: 12},
  //   {x: 'test', y: 18},
  // ];

  // const stack3data = [
  //   {x: 'branch', y: 20},
  //   {
  //     x: 'dev',
  //     y: 10,
  //   },
  //   {x: 'red', y: 12},
  //   {x: 'test', y: 18},
  // ];

  // const stack4data = [
  //   {x: 'branch', y: -20},
  //   {
  //     x: 'dev',
  //     y: -10,
  //   },
  //   {x: 'red', y: -12},
  //   {x: 'test', y: -18},
  // ];

  const handleClickTemplate = () => {
    navigation.navigate(`Level${level + 1}`, {id});
  };

  const yesterdayData = {
    value: formatNumber(dataItem?.as_of_yesterday?.[0], true),
    isIncrement: dataItem?.as_of_yesterday?.[1] > 0,
    varianceValue: formatNumber(dataItem?.as_of_yesterday?.[1], true),
    planName: '. Plan',
  };

  const growthMonthData = {
    value: formatNumber(dataItem?.growth_this_month?.[0], true),
    isIncrement: dataItem?.growth_this_month?.[1] > 0,
    varianceValue: formatNumber(dataItem?.growth_this_month?.[1], true),
  };

  const growthYearData = {
    value: formatNumber(dataItem?.growth_this_year?.[0], true),
    isIncrement: dataItem?.growth_this_year?.[1] > 0,
    varianceValue: formatNumber(dataItem?.growth_this_year?.[1], true),
  };

  const handleClickSegment = value => {
    setSelectedOption(value);
    fomatCharts(dataItem, value);
  };

  return !isLoading ? (
    <View style={isModal ? styles.modalConatiner : styles.TemplateContainer}>
      {!disableCardHeader ? (
        <Fragment>
          <View style={styles.titleContainer}>
            <Pressable onPress={() => handleClickTemplate()}>
              <Text style={styles.title}>{title}</Text>
            </Pressable>
            <Images.Bookmark
              width={24}
              height={24}
              fill={isBookmarked ? color.neutral400 : color.neutral400}
              onPress={() => {}}
            />
          </View>
          <View style={styles.line} />
        </Fragment>
      ) : null}
      <View style={styles.metricValueBody}>
        <AsYesterday
          value={yesterdayData?.value}
          isIncrement={yesterdayData.isIncrement}
          planName={yesterdayData.planName}
          varianceValue={yesterdayData.varianceValue}
        />
        <View style={styles.rowContainer}>
          <GrowthYearMonth
            value={growthMonthData.value}
            isIncrement={growthMonthData.isIncrement}
            isMonth={true}
            varianceValue={growthMonthData.varianceValue}
          />
          <GrowthYearMonth
            value={growthYearData.value}
            isIncrement={growthYearData.isIncrement}
            isMonth={false}
            varianceValue={growthYearData.varianceValue}
          />
        </View>
      </View>
      <Switch
        options={optionsData}
        selectedOption={selectedOption}
        handleClick={handleClickSegment}
        containerStyles={{marginVertical: 30}}
      />
      <StockMetricChart
        areaData={lineChart}
        bar1Data={bar1Chart}
        bar2Data={bar2Chart}
        bar3Data={bar3Chart}
        bar4Data={bar4Chart}
        width={isModal ? width : width - 32}
        height={210}
        colorScale={[
          '#8543E0',
          '#F9F5FF',
          '#13C2C2',
          '#1890FF',
          '#223273',
          '#9CA3AF',
        ]}
        nameScale={legends}
      />
      <CustomWrappedLegend
        data={legends}
        colors={['#1890FF', '#9CA3AF', '#13C2C2', '#223273', '#8543E0']}
        width={'100%'}
      />
    </View>
  ) : (
    <Temp2PlaceHolder disableHeader={disableCardHeader} />
  );
};

export default Template2;
