import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Temp1PlaceHolder from '../../components/skeletonPlaceholder/Template1';

// Style
import styles from './styles';

// API
import graphQLApi from '../../service/graphQLApi';

// Query
import {GROUP_BY_DATA} from '../../query/template';
import {GET_OVERVIEW_MONTH} from '../../query/home';

// Images
import Images from '../../assets';

// Helper
import {formatNumber} from '../../utils/helper';
import color from '../../constant/color';

const RenderMetricValue = props => {
  const {value, plan, variance} = props;
  let isIncrement = variance?.[0] > 0;
  return (
    <>
      <View style={styles.renderColum1}>
        <Text style={styles.renderValue}>{formatNumber(value?.[0], true)}</Text>
        {isIncrement ? (
          <Images.Increment width={11} height={11} />
        ) : (
          <Images.Decrement width={11} height={11} />
        )}
        <Text
          style={[
            styles.renderVariance,
            {color: isIncrement ? color.success600 : '#EF4444'},
          ]}>
          {formatNumber(variance?.[0], false)}
        </Text>
      </View>
      <View style={styles.renderColum2}>
        <Text style={styles.planTitle}>Plan:</Text>
        <Text style={styles.planeValue}>{formatNumber(plan?.[0], false)}</Text>
      </View>
    </>
  );
};

const Template16 = props => {
  const {id, title, tableName, navigation, level, filter} = props;

  const [dataItems, setDataItems] = useState({});
  const [isloading, setLoading] = useState(true);
  const [kpiDetails, setKpiDetails] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [isKpiLoading, setKpiLoading] = useState(true);
  const [categoryMonth, setCategoryMonth] = useState('');

  useEffect(() => {
    let variables = {
      category: `${title}`,
    };
    graphQLApi(GET_OVERVIEW_MONTH, variables)
      .then(res => {
        setCategoryMonth(res?.data?.data?.CategoryMonth?.[0]?.month?.[0]);
      })
      .catch(err => {
      });
    getDataDetails(title);
    setSelectedItem('');
  }, []);

  const getDataDetails = (title, kpi) => {
    let tempParams = kpi
      ? {category: `${title}`, kpi: `${kpi}`, business_unit: ''}
      : {category: `${title}`, kpi: ''};

    let variables = {
      tableName: tableName.replace("_vw",""),
      params: tempParams,
      fields: 'mtd,mtd_plan,mtd_variance,ytd,ytd_plan,ytd_variance',
    };
    setKpiLoading(kpi ? true : false);
    graphQLApi(GROUP_BY_DATA, variables)
      .then(res => {
        if (kpi) {
          setKpiDetails(res?.data?.data?.GroupData);
          setKpiLoading(false);
        } else {
          setDataItems(res?.data?.data?.GroupData);
          setLoading(false);
        }
      })
      .catch(err => {
        setKpiLoading(false);
        setLoading(false);
      });
  };

  const handleClickCard = (key, kpi) => {
    if (selectedItem !== key) {
      setSelectedItem(key);
      getDataDetails(title, kpi);
    } else {
      setSelectedItem('');
    }
  };

  return !isloading ? (
    <SafeAreaView>
      <ScrollView style={styles.wrapper}>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerColumn}>
          <Text style={styles.columnTitle}>METRIC</Text>
          <Text style={styles.columnTitle}>MONTH</Text>
          <Text style={styles.columnTitle}>YTD</Text>
        </View>
        {dataItems &&
          dataItems?.length &&
          dataItems?.map((item, index) => {
            return (
              <Fragment key={index}>
                <Pressable
                  style={[
                    styles.renderContent,
                    selectedItem === `${item?.result?.category}-${index}` &&
                      styles.renderSelectedContent,
                  ]}
                  onPress={() =>
                    handleClickCard(
                      `${item?.result?.category}-${index}`,
                      item?.result?.kpi,
                    )
                  }>
                  <Text
                    style={[
                      styles.contentColum,
                      styles.metricTitle,
                      {
                        color:
                          selectedItem === `${item?.result?.category}-${index}`
                            ? color.primary500
                            : color.neutral900,
                      },
                    ]}>
                    {item?.result?.kpi}
                  </Text>
                  <View style={[styles.contentColum]}>
                    <RenderMetricValue
                      value={item?.result?.mtd}
                      plan={item?.result?.mtd_plan}
                      variance={item?.result?.mtd_variance}
                    />
                  </View>
                  <View style={[styles.contentColum]}>
                    <RenderMetricValue
                      value={item?.result?.ytd}
                      plan={item?.result?.ytd_plan}
                      variance={item?.result?.ytd_variance}
                    />
                  </View>
                </Pressable>
                {selectedItem === `${item?.result?.category}-${index}` && (
                  <View style={styles.businessWrapper}>
                    <>
                      {isKpiLoading ? (
                        <View
                          style={{
                            height: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <ActivityIndicator
                            size={'small'}
                            color={color.primary600}
                          />
                        </View>
                      ) : (
                        kpiDetails &&
                        kpiDetails?.length > 0 &&
                        kpiDetails?.map((data, idx) => {
                          return (
                            <Fragment key={idx}>
                              <View style={styles.businessColumn} key={idx}>
                                <Text
                                  style={[
                                    styles.businessContentColum,
                                    styles.businessTitle,
                                  ]}>
                                  {data?.result?.business_unit}
                                </Text>
                                <View style={[styles.businessContentColum]}>
                                  <RenderMetricValue
                                    value={data?.result?.mtd}
                                    plan={data?.result?.mtd_plan}
                                    variance={data?.result?.mtd_variance}
                                  />
                                </View>
                                <View
                                  style={[
                                    styles.businessContentColum,
                                    {paddingLeft: 20},
                                  ]}>
                                  <RenderMetricValue
                                    value={data?.result?.ytd}
                                    plan={data?.result?.ytd_plan}
                                    variance={data?.result?.ytd_variance}
                                  />
                                </View>
                              </View>
                              {kpiDetails.length !== idx + 1 && (
                                <Images.DottedLine
                                  width="100%"
                                  marginVertical={1}
                                />
                              )}
                            </Fragment>
                          );
                        })
                      )}
                    </>
                  </View>
                )}
              </Fragment>
            );
          })}
        <Text style={styles.dateItem}>{`Data for ${categoryMonth}`} </Text>
        <View style={styles.solidLine} />
      </ScrollView>
    </SafeAreaView>
  ) : (
    <Temp1PlaceHolder disableHeader={true} />
  );
};

export default Template16;
