import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {MMKV} from 'react-native-mmkv';
import {removeKey} from '../../utils/helper';

// Style
import styles from './styles';

// API
import graphQLApi from '../../service/graphQLApi';

// Query
import {GET_LEVEL_2_BUSINESS, GET_LEVEL_2_PRODUCTS} from '../../query/level2';

// Template
import Template from '../../Templates/template';
import color from '../../constant/color';
import Images from '../../assets';
import HeadBackWrapper from '../../wrappers/HeadBackWrapper';
import _const from '../../constant/const';

const Level2 = props => {
  const {navigation} = props;
  const route = useRoute();
  const storage = new MMKV();
  var level2SliderData = storage.getString(_const.level2SliderCache) ?? null;
  level2SliderData = level2SliderData ? JSON.parse(level2SliderData) ?? [] : [];
  const levelList = level2SliderData?.levelList ?? [];
  const [dataItem, setDataItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [loadedItem, setLoadedItem] = useState([]);
  const [loadIndex, setLoadIndex] = useState(-1);
  const {params} = route;

  const id = params ? params.id : null;
  const selectedid = route?.params ? route?.params?.id : null;
  const [selectedindex, setSelectedindex] = useState(selectedid);
  const flatListRef = useRef(null);
  var specificindex =
    Array.isArray(levelList) && levelList.length > 0
      ? levelList.findIndex(item => item.id === selectedid) ?? 0
      : 0;

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
    let headerCache = storage.getString(_const.headerCache);
    let query =
      headerCache === '2' ? GET_LEVEL_2_PRODUCTS : GET_LEVEL_2_BUSINESS;
    graphQLApi(query, variables, navigation)
      .then(res => {
        if (headerCache === '2') {
          setDataItems(res?.data?.data?.Level_Data);
          setSelectedItem(res?.data?.data?.Level_Data?.[0]);
          setLoadedItem(res?.data?.data?.Level_Data);
        } else {
          setDataItems(res?.data?.data?.Level_Data?.[0]?.children);
          setSelectedItem(res?.data?.data?.Level_Data?.[0]);
          setLoadedItem([res?.data?.data?.Level_Data?.[0]?.children?.[0]]);
        }
        setLoadIndex(prev => prev + 1);
      })
      .catch(err => {});
  }, []);

  useEffect(() => {
    if (loadIndex >= 0 && dataItem?.length > loadIndex) {
      setLoadedItem(prev => [...prev, dataItem[loadIndex]]);
    } else {
    }
  }, [loadIndex]);

  const filter = storage.getString(_const.filterParamsCache)
    ? JSON.parse(storage.getString(_const.filterParamsCache))
    : {};
  let filterParams = {};

  if (filter != {}) {
    filterParams = removeKey(filter, 'category');
    filterParams = removeKey(filter, 'sub_product');
    storage.set(_const.filterParamsCache, JSON.stringify(filterParams));
  }

  const renderItem = ({item, index}) => {
    return (
      item && (
        <View key={index}>
          <Template
            id={item?.id}
            template_id={
              item?.template_id === 12
                ? 17
                : item?.template_id === 13
                ? 15
                : item?.template_id
            }
            tableName={isFilterSelected ? item?.name : item?.name + '_vw'}
            title={item?.ui_element_name}
            navigation={navigation}
            level={2}
            filter={filterParams}
          />
        </View>
      )
    );
  };
  const handleClick = (item, index) => {
    flatListRef.current.scrollToIndex({index, animated: true});
    setSelectedindex(item.id);
    let variables = {
      id: item.id,
    };
    let headerCache = storage.getString(_const.headerCache);
    let query =
      headerCache === '2' ? GET_LEVEL_2_PRODUCTS : GET_LEVEL_2_BUSINESS;
    graphQLApi(query, variables, navigation)
      .then(res => {
        if (headerCache === '2') {
          setDataItems(res?.data?.data?.Level_Data);
          setSelectedItem(res?.data?.data?.Level_Data?.[0]);
          setLoadedItem(res?.data?.data?.Level_Data);
        } else {
          setDataItems(res?.data?.data?.Level_Data?.[0]?.children);
          setSelectedItem(res?.data?.data?.Level_Data?.[0]);
          setLoadedItem([res?.data?.data?.Level_Data?.[0]?.children?.[0]]);
        }
      })
      .catch(err => {});
  };

  const renderHeader = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => handleClick(item, index)} key={index}>
        <View style={[styles.alignItemsCenter]}>
          <Text
            style={[
              selectedindex === item.id ? styles.selectedTitle : styles.title,
            ]}>
            {item.ui_element_name}
          </Text>
          <View style={{marginBottom: 10}}>
            {/* <View style={[styles.row]}>
              <Text
                style={[
                  selectedindex === item.id
                    ? styles.selectedsubtitle
                    : styles.subtitle,
                ]}>
                {item?.range?.value ?? 0}
              </Text>
              <View style={styles.row2}>
                {item?.range?.isIncrement ? (
                  <Images.Increment />
                ) : (
                  <Images.Decrement />
                )}
                <Text
                  style={
                    item?.range?.isIncrement
                      ? styles.subtitle1
                      : styles.subtitle2
                  }>
                  {item?.range?.previousValue ?? item?.range?.varianceValue ?? 0}
                </Text>
              </View>
            </View> */}
          </View>
        </View>
        <View
          style={[
            selectedindex === item.id
              ? styles.selectedtitleInfo
              : styles.listTitleInfo,
            {
              marginHorizontal: 16,
            },
          ]}></View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View style={styles.wrapper}>
        <StatusBar
          backgroundColor={color.secondary200}
          barStyle={'dark-content'}
        />
        <HeadBackWrapper
          headerTitle={
            level2SliderData?.headerName ?? selectedItem?.ui_element_name
          }
          navigation={navigation}
          onPressBack={() => navigation.goBack()}
        />
        <View style={{backgroundColor: color.secondary200}}>
          <FlatList
            ref={flatListRef}
            data={levelList}
            onScrollToIndexFailed={() => {}}
            horizontal
            renderItem={renderHeader}
            style={styles.listContent}
            showsHorizontalScrollIndicator={false}
            onContentSizeChange={() => {
              if (
                Array.isArray(levelList) &&
                levelList.length > 0 &&
                specificindex >= 0 &&
                specificindex < levelList.length
              ) {
                flatListRef.current.scrollToIndex({
                  animated: true,
                  index: specificindex,
                });
              }
            }}
          />
        </View>
        <FlatList
          ItemSeparatorComponent={<View style={{height: 16}} />}
          data={loadedItem}
          renderItem={renderItem}
          contentContainerStyle={styles.flatlistInner}
          style={styles.flatlistOuter}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={1}
          onEndReached={() => setLoadIndex(prev => prev + 1)}
          maxToRenderPerBatch={1}
        />
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate(_const.dashboardfilter, {
            levelId: '2',
            screenName: 'Level2',
            id,
          });
        }}
        style={styles.filterContainer}>
        <Images.Filter width={24} height={24} fill={color.white} />
      </Pressable>
    </SafeAreaView>
  );
};

export default Level2;
