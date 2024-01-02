import React from 'react';
import {View, Text, FlatList} from 'react-native';
import _const from '../../constant/const';
import Images from '../../assets';
import styles from './styles';
import VictoryStackChart from '../StackedBarCharts';
import SwitchSelector from '../SwitchSelector';
import YearMonthToDate from '../YearMonthToDate';
import AsYesterday from '../AsYesterday';
import GrowthYearMonth from '../GrowthYearMonth';

const TemplateContainer = props => {
  const {title, isBookmarked, data, hideTitle, sliderOption} = props;

  const monthToDate = _const.monthToDate;
  const yearToDate = _const.yearToDate;
  const growthMonth = _const.growthMonth;
  const growthYear = _const.growthYear;
  const asYesterday = _const.asYesterday;

  return (
    <View style={styles.container}>
      {!hideTitle ? (
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {isBookmarked ? (
              <Images.Bookmark></Images.Bookmark>
            ) : (
              <Images.NoBookmark></Images.NoBookmark>
            )}
          </View>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>
        </View>
      ) : (
        <View></View>
      )}
      <YearMonthToDate
        value={monthToDate.value}
        isIncrement={monthToDate.isIncrement}
        isMonth={monthToDate.isMonth}
        targetValue={monthToDate.targetValue}
        isTargetIncrement={monthToDate.isTargetIncrement}
        previousValue={monthToDate.previousValue}></YearMonthToDate>
      <Images.DottedLine width="100%"></Images.DottedLine>
      <View style={styles.rowContainer}>
        <GrowthYearMonth
          value={growthMonth.value}
          isIncrement={growthMonth.isIncrement}
          isMonth={growthMonth.isMonth}
          varianceValue={growthMonth.varianceValue}></GrowthYearMonth>
        <GrowthYearMonth
          value={growthYear.value}
          isIncrement={growthYear.isIncrement}
          isMonth={growthYear.isMonth}
          varianceValue={growthYear.varianceValue}></GrowthYearMonth>
      </View>
      <AsYesterday
        value={asYesterday.value}
        isIncrement={asYesterday.isIncrement}
        planName={asYesterday.planName}
        varianceValue={asYesterday.varianceValue}></AsYesterday>
      <YearMonthToDate
        value={yearToDate.value}
        isIncrement={yearToDate.isIncrement}
        isMonth={yearToDate.isMonth}
        targetValue={yearToDate.targetValue}
        isTargetIncrement={yearToDate.isTargetIncrement}
        previousValue={yearToDate.previousValue}></YearMonthToDate>
      <SwitchSelector options={sliderOption}></SwitchSelector>
      <VictoryStackChart data={data}></VictoryStackChart>
    </View>
  );
};

export default TemplateContainer;
