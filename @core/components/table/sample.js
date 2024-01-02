// TableComponentSample Screen
import React, {useState, useEffect} from 'react';
import {FlatList, Text, View, Pressable, ActivityIndicator} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';

// Component
import ProgressBar from '../progressBar';
import {Table, TableHeader} from '.';

// Constant
import color from '../../constant/color';

// Images
import Images from '../../assets';

// Style
import tableStyles from './styles';

import {formatNumber} from '../../utils/helper';
import Search from '../../components/search';
import styles from './styles';

const TableComponentSample = props => {
  const {tableData = [], handleClickColumn, loading} = props;
  const [selectMonthIndex, setMonthIndex] = useState(null);
  const [selectYearIndex, setYearIndex] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = text => {
    const helperArray = [...tableData];
    setSearchText(text);
    const filtered = helperArray.filter(item =>
      item?.branch?.toLowerCase()?.includes(text?.toLowerCase()?.trim()),
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    setIsLoading(loading);

    if (tableData && tableData?.length) {
      setFilteredData(tableData);
      setIsLoading(false);
    }
    // setTimeout(() => {
    //   setFilteredData(tableData);
    //   setIsLoading(false)
    // }, 1000);
  }, [tableData, loading]);

  const rendercontent = (contentData, contentIndex, contents = []) => {
    const branchName = contentData?.branch ?? null;

    const checkContents =
      Array.isArray(contents) &&
      contents.length > 0 &&
      contents.length != contentIndex + 1;

    const customContentPrimaryContainer = {
      borderBottomWidth: checkContents ? 1 : 0,
    };

    const monthValue = contentData?.mon?.value ?? 0;

    const montPlan = contentData?.mon?.plan ?? 0;

    const monthPlanValue = contentData?.mon?.monthPlan ?? 0;

    const monthProgress =
      monthValue && montPlan
        ? ((Number(monthValue) / Number(montPlan)) * 100).toFixed(0)
        : 0;

    const yearValue = contentData?.yr?.value ?? 0;

    const yearplan = contentData?.yr?.plan ?? 0;

    const yearPlanValue = contentData?.yr?.yearPlan ?? 0;

    const yearProgress =
      yearValue && yearplan
        ? ((Number(yearValue) / Number(yearplan)) * 100).toFixed(0)
        : 0;

    const renderValueChange = key => {
      const compareValueI = contentData?.[key]?.value
        ? Number(contentData?.[key]?.value)
        : 0;

      const compareValueII = contentData?.[key]?.plan
        ? Number(contentData?.[key]?.plan)
        : 0;

      const isHigh = compareValueI > compareValueII;

      const value =
        compareValueI > compareValueII
          ? compareValueI - compareValueII
          : compareValueII - compareValueI;

      return (
        value && (
          <View style={tableStyles.contentValueArrowIconContainer}>
            {isHigh ? (
              <Images.VectorHigh width={16} height={16} fill={color.error500} />
            ) : (
              <Images.VectorLow width={16} height={16} fill={color.error500} />
            )}
            <Text
              style={
                isHigh
                  ? tableStyles.contentValueChangeHighText
                  : tableStyles.contentValueChangeLowText
              }>
              {formatNumber(value, true)}
            </Text>
          </View>
        )
      );
    };

    return (
      branchName && (
        <View
          key={contentIndex}
          style={[
            tableStyles.contentPrimaryContainer,
            customContentPrimaryContainer,
          ]}>
          <View style={tableStyles.contentContainerI}>
            <Pressable onPress={() => handleClickColumn(contentData)}>
              <View style={tableStyles.contentLabelContainer}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={tableStyles.contentLabelText}>
                  {contentData?.branch}
                </Text>
              </View>
            </Pressable>
          </View>
          <View style={tableStyles.contentContainerII}>
            <Tooltip
              arrowSize={tableStyles.toolTipArrrow}
              backgroundColor="transparent"
              content={
                <>
                  <Text style={tableStyles.toolTipTextI}>
                    MTD:{' '}
                    <Text style={tableStyles.toolTipTextII}>
                      {`${formatNumber(monthValue, true) ?? '-'}`}
                    </Text>{' '}
                    {/* {`(Plan: ${formatNumber(montPlan, true) ?? '-'})`} */}
                    {`(${formatNumber(monthProgress, false) ?? '-'}%)`}
                  </Text>
                  <View style={tableStyles.marginTop4}>
                    <Text style={tableStyles.toolTipTextI}>
                      Month Plan:{' '}
                      <Text style={tableStyles.toolTipTextII}>
                        {formatNumber(montPlan, true) ?? '-'}
                      </Text>
                    </Text>
                  </View>
                </>
              }
              contentStyle={tableStyles.toolTipContentStyle}
              isVisible={contentIndex == selectMonthIndex}
              onClose={() => {
                setMonthIndex(null);
              }}
              placement="bottom"
              showChildInTooltip={false}>
              <Pressable
                onPress={() => {
                  setMonthIndex(contentIndex);
                }}>
                <View style={tableStyles.contentValueContainer}>
                  <Text style={tableStyles.contentValueText}>{`${
                    formatNumber(monthValue, true) ?? '-'
                  }`}</Text>
                  {renderValueChange('mon')}
                </View>
                <View style={tableStyles.progressBarContainer}>
                  <ProgressBar progress={monthProgress} />
                </View>
              </Pressable>
            </Tooltip>
          </View>
          <View style={tableStyles.contentContainerI}>
            <Tooltip
              arrowSize={tableStyles.toolTipArrrow}
              backgroundColor="transparent"
              content={
                <>
                  <Text style={tableStyles.toolTipTextI}>
                    YTD:{' '}
                    <Text style={tableStyles.toolTipTextII}>
                      {`${formatNumber(yearValue, true) ?? '-'}`}
                    </Text>{' '}
                    {/* {`(Plan: ${formatNumber(yearplan, true) ?? '-'})`} */}
                    {`(${formatNumber(yearProgress, true) ?? '-'}%)`}
                  </Text>
                  <View style={tableStyles.marginTop4}>
                    <Text style={tableStyles.toolTipTextI}>
                      Year Plan:{' '}
                      <Text style={tableStyles.toolTipTextII}>
                        {formatNumber(yearplan, true) ?? '-'}
                      </Text>
                    </Text>
                  </View>
                </>
              }
              contentStyle={tableStyles.toolTipContentStyle}
              isVisible={contentIndex == selectYearIndex}
              onClose={() => {
                setYearIndex(null);
              }}
              placement="bottom"
              showChildInTooltip={false}>
              <Pressable
                onPress={() => {
                  setYearIndex(contentIndex);
                }}>
                <View style={tableStyles.contentValueContainer}>
                  <Text style={tableStyles.contentValueText}>{`${
                    formatNumber(yearValue, true) ?? '-'
                  }`}</Text>
                  <Text>{renderValueChange('yr')}</Text>
                </View>
                <View style={tableStyles.progressBarContainer}>
                  <ProgressBar progress={yearProgress} />
                </View>
              </Pressable>
            </Tooltip>
          </View>
        </View>
      )
    );
  };
  const handleSort = (index, sortBy) => {
    const helperArray = [...filteredData];

    if (sortBy) {
      const sortedArr = helperArray.sort((a, b) => {
        const keys = Object.keys(a);

        const obj1 = a[keys[index]];

        const obj2 = b[keys[index]];

        return obj1?.value == obj2?.value
          ? 0
          : (sortBy == 'asc'
              ? obj1?.value > obj2?.value
              : obj2?.value > obj1?.value) || -1;
      });

      setFilteredData(sortedArr);
    } else {
      setFilteredData(tableData);
    }
  };
  return (
    <View style={styles.templateContainer}>
      <Text style={styles.titleText}>Branch Details</Text>
      <Search
        placeholder={'Search for Branch Name'}
        value={searchText}
        setValue={handleSearch}
        containerStyles={styles.search}
        inputstyle={styles.input}
      />
      <Table>
        <FlatList
          bounces={false}
          data={filteredData}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={
            <TableHeader
              onSort={(index, sortBy) => handleSort(index, sortBy)}
            />
          }
          ListEmptyComponent={
            <View style={styles.noResultContainer}>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <>
                  <Images.NoResults width={60} height={60} />
                  <Text style={styles.noResultDescription}>
                    No result(s) found
                  </Text>
                </>
              )}
            </View>
          }
          nestedScrollEnabled={true}
          renderItem={({item, index}) =>
            rendercontent(item, index, filteredData)
          }
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </Table>
    </View>
  );
};

export default TableComponentSample;
