/* eslint-disable react/no-unstable-nested-components */
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {MMKV} from 'react-native-mmkv';
// API
import graphQLApi from '../../service/graphQLApi';
// Query
import {GET_LEVEL_3_Products} from '../../query/level3';
// Template
import Template from '../../Templates/template';
// Component
import Card from '../../components/Card';
import HeadBackWrapper from '../../wrappers/HeadBackWrapper';
// Constant
import _const from '../../constant/const';
// Style
import styles from './style';
import Images from '../../assets';
import color from '../../constant/color';
const Level3 = props => {
  const {navigation} = props;
  const route = useRoute();
  const [dataItem, setDataItems] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  let level = 3;
  const {params} = route;
  const id = params ? params.id : null;
  const storage = new MMKV();
  let headerCache = storage.getString(_const.headerCache);

  let selectedFilter = storage.getString(_const.selectFilterCache)
    ? JSON.parse(storage.getString(_const.selectFilterCache))
    : [];

  let isFilterSelected = false;

  if (selectedFilter.length !== 0) {
    isFilterSelected = true;
  }
  useEffect(() => {
    let variables = {
      id: id,
    };
    graphQLApi(GET_LEVEL_3_Products, variables, navigation)
      .then(res => {
        if (headerCache === '2') {
          setDataItems(res?.data?.data?.Level_Data?.[0]);
          setSelectedItem(res?.data?.data?.Level_Data?.[0]);
        } else {
          setDataItems(res?.data?.data?.Level_Data?.[0]?.children?.[0]);
          setSelectedItem(res?.data?.data?.Level_Data?.[0]);
        }
      })
      .catch(err => {});
  }, []);
  const chartColor = ['#1890FF', '#8543E0', '#13C2C2', '#3436C7'];
  const handleClickCard = item => {
    navigation.navigate(`Level${level + 1}`, {
      id: item.id,
      parent_template_id: dataItem?.template_id,
      parent_screen_id: headerCache === '2' ? id : dataItem?.parent_screen_id,
      selectedCategory: item,
    });
  };
  const filterParams = storage.getString(_const.filterParamsCache)
    ? JSON.parse(storage.getString(_const.filterParamsCache))
    : {};
  let filter = [
    {
      name: 'Branch',
      column: 'channel',
      value: 'branch',
      tableName: 'asset_sales_pf',
    },
    {name: 'DTS', column: 'channel', value: 'dts', tableName: 'asset_sales_pf'},
    {name: 'DSU', column: 'channel', value: 'dsu', tableName: 'asset_sales_pf'},
  ];
  const CardTemplate = ({item, index}) => {
    const color = chartColor[index % chartColor.length];
    function removeKey(obj, keyToRemove) {
      const updatedObj = {...obj}; // Create a shallow copy of the original object
      delete updatedObj[keyToRemove]; // Remove the specified key
      return updatedObj;
    }
    const keyToRemove = 'channel';
    let updateFilter = removeKey(filterParams, keyToRemove);
    return (
      <Pressable
        key={index}
        onPress={() => handleClickCard(item)}
        style={{marginTop: 16}}>
        <Card
          title={item?.name}
          tableName={item?.tableName}
          columnKey={item?.column}
          columnValue={item?.value}
          chartColor={color}
          chartColumn={dataItem?.template_id === 1 ? 'mtd' : 'total_inflow'}
          navigation={navigation}
          isDark={true}
          isAreaChart={false}
          filter={updateFilter}
        />
      </Pressable>
    );
  };
  let cardArray = dataItem && dataItem?.filter && JSON.parse(dataItem?.filter);
  let idBack = selectedItem?.parent_screen_id;
  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View style={styles.viewWrapper}>
        <HeadBackWrapper
          headerTitle={dataItem?.ui_element_name}
          navigation={navigation}
          onPressBack={() =>
            navigation.navigate(`Level2`, {
              id: idBack,
            })
          }
        />

        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.wrapper}>
            <View>
              {dataItem && Object.keys(dataItem).length > 0 && (
                <>
                  <View>
                    <Template
                      id={dataItem?.id}
                      template_id={dataItem?.template_id}
                      tableName={
                        isFilterSelected
                          ? dataItem?.name
                          : dataItem?.name + '_vw'
                      }
                      title={dataItem?.ui_element_name}
                      navigation={navigation}
                      disableCardHeader={true}
                      level={3}
                      filter={filterParams}
                    />
                  </View>
                  <View>
                    {cardArray?.length > 0 &&
                      cardArray.map((item, index) => {
                        return (
                          <CardTemplate item={item} index={index} key={index} />
                        );
                      })}
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate(_const.dashboardfilter, {
            levelId: '3',
            id,
            screenName: 'Level3',
            tableName: dataItem?.ui_element_name,
          });
        }}
        style={styles.filterContainer}>
        <Images.Filter width={24} height={24} fill={color.white} />
      </Pressable>
    </SafeAreaView>
  );
};
export default Level3;
