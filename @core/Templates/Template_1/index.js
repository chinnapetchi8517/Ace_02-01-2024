import {Text, View, Pressable, Dimensions} from 'react-native';
import React, {useEffect, useState, Fragment} from 'react';

// Chart
// import PieChart from '../../charts/Pie';

// API
import graphQLApi from '../../service/graphQLApi';

// Query
import TemplateQuery from '../../query/template';

import YearMonthToDate from '../../components/YearMonthToDate';
import {formatNumber} from '../../utils/helper';
import _const from '../../constant/const';
import Images from '../../assets';
import Switch from '../../components/SwitchSelector';
import styles from './styles';
import FlowMetricChart from '../../chart/FlowMetricChart';
import color from '../../constant/color';
import CustomWrappedLegend from '../../chart/Legend';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Temp1PlaceHolder from '../../components/skeletonPlaceholder/Template1';
import {TEMPLATE_DATA, TEMPLATE_LEGEND_DATA} from '../../query/template';
import {MMKV} from 'react-native-mmkv';

const {width, height} = Dimensions.get('screen');
const mockData = {
  data: {
    stage1: {
      aggregate: {
        sum: {
          m1: 528365,
          m2: 522097,
          m3: 527494,
          m4: 520627,
          m5: 523447,
          m6: 524059,
          m7: 521150,
          m8: 523443,
          m9: 528960,
          m10: 523930,
          m11: 525108,
          m12: 524942,
          y1: 1552659,
          y2: 1565351,
          mtd_target_m1: 1044395,
          mtd_target_m2: 1041906,
          mtd_target_m3: 1036223,
          mtd_target_m4: 1041585,
          mtd_target_m5: 1033207,
          mtd_target_m6: 1039922,
          mtd_target_m7: 1035851,
          mtd_target_m8: 1045795,
          mtd_target_m9: 1033142,
          mtd_target_m10: 1040928,
          mtd_target_m11: 1038907,
          mtd_target_m12: 1035067,
          ytd_target_y1: 2580219,
        },
      },
    },
    stage2: {
      aggregate: {
        sum: {
          month_end_m1: 64862382,
          month_end_m2: 64890776,
          month_end_m3: 64870009,
          month_end_m4: 64862923,
          month_end_m5: 64845529,
          month_end_m6: 64834108,
          month_end_m7: 64810289,
          month_end_m8: 64855569,
          month_end_m9: 64839924,
          month_end_m10: 64859190,
          month_end_m11: 64795034,
          month_end_m12: 64849564,
          month_end_m13: 64827511,
          month_end_m14: 64843082,
          month_end_m15: 64809408,
          month_end_m16: 64843647,
          month_end_m17: 64826323,
          month_end_m18: 64839690,
          month_end_m19: 64835613,
          month_end_m20: 64848633,
          month_end_m21: 64871062,
          month_end_m22: 64808753,
          month_end_m23: 64845019,
          month_end_m24: 64860896,
        },
      },
    },
  },
};

const optionsData = [
  {label: '6M', value: 6},
  {label: '1Y', value: 12},
];

const Template1 = props => {
  const {
    template_id,
    tableName,
    title,
    disableCardHeader,
    id,
    navigation,
    level,
    isBookmarked,
    sliderOption,
    isModal,
    filter,
  } = props;

  const [dataitem, setDataItem] = useState({});
  const [isloading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(optionsData[0].value);
  const [lineChart, setLineChart] = useState([]);
  const [bar1Chart, setBar1Chart] = useState([]);
  const [bar2Chart, setBar2Chart] = useState([]);
  const [bar3Chart, setBar3Chart] = useState([]);
  const [legends, setLegends] = useState([]);
  const storage = new MMKV();
  const monthsArray =
    storage.getString(_const.month) &&
    JSON.parse(storage.getString(_const.month));
  const currentMonthIndex = 12;

  useEffect(() => {
    setLoading(true);
    let variables = {
      tableName: tableName,
      params: filter && Object.keys(filter).length > 0 ? filter : {},
      fields: 'mtd,ytd,month_end,mtd_target,ytd_target',
    };
    graphQLApi(TEMPLATE_DATA, variables)
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
    let fomatLineChart = formatChartDataV3(
      data,
      monthsArray,
      currentMonthIndex,
      'month_end',
      12,
      selectedMonth + 12,
    );
    let formatbar1data = formatChartDataV3(
      data,
      monthsArray,
      currentMonthIndex,
      'month_end',
      0,
      selectedMonth,
    );
    const formatbar2data = formatChartDataV3(
      data,
      monthsArray,
      currentMonthIndex,
      'mtd',
      0,
      selectedMonth,
    );
    const formatbar3data = formatChartDataV3(
      data,
      monthsArray,
      currentMonthIndex,
      'mtd_target',
      0,
      selectedMonth,
    );
    setLineChart(fomatLineChart);
    setBar1Chart(formatbar1data);
    setBar2Chart(formatbar2data);
    setBar3Chart(formatbar3data);
  };

  const monthToDate = {
    targetValue: formatNumber(
      dataitem?.mtd_target?.[0] - dataitem?.mtd?.[0],
      true,
    ),
    value: formatNumber(dataitem?.mtd?.[0], true),
    isIncrement: dataitem?.mtd?.[0] - dataitem?.mtd?.[1] > 0,
    isMonth: true,
    isTargetIncrement: dataitem?.mtd_target?.[0] - dataitem?.mtd?.[0] > 0,
    previousValue: formatNumber(dataitem?.mtd?.[0] - dataitem?.mtd?.[1], true),
  };

  const yearToDate = {
    targetValue: formatNumber(
      dataitem?.ytd_target?.[0] - dataitem?.ytd?.[0],
      true,
    ),
    value: formatNumber(dataitem?.ytd?.[0], true),
    isIncrement: dataitem?.ytd?.[0] - dataitem?.ytd?.[1] > 0,
    isMonth: false,
    isTargetIncrement: dataitem?.ytd_target?.[0] - dataitem?.ytd?.[0] > 0,
    previousValue: formatNumber(dataitem?.ytd?.[0] - dataitem?.ytd?.[1], true),
  };

  const handleClickTemplate = () => {
    navigation.navigate(`Level${level + 1}`, {
      id,
    });
  };

  // const formatChartData = (
  //   dataValue,
  //   months,
  //   currentIndex,
  //   keyValue,
  //   intialValue,
  //   totalCount,
  // ) => {
  //   const data = [];

  //   for (let i = intialValue; i < totalCount; i++) {
  //     const monthIndex =
  //       intialValue === 12
  //         ? (currentIndex + (i - 12)) % 12
  //         : (currentIndex + i) % 12;

  //     // Extracting month and year from the month string
  //     const [, monthName, year] = /(\w+)'(\d+)/.exec(months[monthIndex]);

  //     // Constructing the correct key based on the month and year
  //     const key = `${keyValue}${i + 1}`;

  //     const value = dataValue[key];

  //     if (value !== undefined) {
  //       data.push({
  //         x: months[monthIndex],
  //         y: value,
  //       });
  //     }
  //   }

  //   return data.reverse();
  // };

  const formatChartDataV3 = (
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
          y: values[index],
        });
      }
    }

    return formattedData.reverse();
  };

  const handleClickSegment = value => {
    setSelectedOption(value);
    fomatCharts(dataitem, value);
  };

  return !isloading ? (
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
        <YearMonthToDate
          value={monthToDate.value}
          isIncrement={monthToDate.isIncrement}
          isMonth={monthToDate.isMonth}
          targetValue={monthToDate.targetValue}
          isTargetIncrement={monthToDate.isTargetIncrement}
          previousValue={monthToDate.previousValue}
          width={'90%'}
        />
        <Images.DottedLine width="100%" marginVertical={11} />
        <YearMonthToDate
          value={yearToDate.value}
          isIncrement={yearToDate.isIncrement}
          isMonth={yearToDate.isMonth}
          targetValue={yearToDate.targetValue}
          isTargetIncrement={yearToDate.isTargetIncrement}
          previousValue={yearToDate.previousValue}
          width={'90%'}
        />
      </View>
      <Switch
        options={optionsData}
        selectedOption={selectedOption}
        handleClick={handleClickSegment}
        containerStyles={{marginVertical: 30}}
      />
      <FlowMetricChart
        areaData={lineChart}
        bar1Data={bar1Chart}
        bar2Data={bar2Chart}
        bar3Data={bar3Chart}
        width={isModal ? width : width - 32}
        height={210}
        colorScale={['#8543E0', '#F9F5FF', '#13C2C2', '#1890FF', '#223273']}
        nameScale={legends}
        numberOfMonths={selectedOption}
      />
      <CustomWrappedLegend
        data={legends}
        colors={['#13C2C2', '#1890FF', '#223273', '#8543E0']}
        width={width - 90}
      />
    </View>
  ) : (
    <Temp1PlaceHolder disableHeader={disableCardHeader} />
  );
};

export default Template1;
