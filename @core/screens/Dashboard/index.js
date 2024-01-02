// Dashboard Screen
import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, Pressable, SafeAreaView, View} from 'react-native';
import {MMKV} from 'react-native-mmkv';

// API
import graphQLApi from '../../service/graphQLApi';

// Components
import Header from '../../components/Header/Header';
import Template from '../../Templates/template';

// Constant
import _const from '../../constant/const';

// Images
import Images from '../../assets';

// Query
import {GET_DASHBOARD_DATA} from '../../query/home';
import color from '../../constant/color';
// import { SafeAreaView } from 'react-native-safe-area-context';

// Style
import styles from './styles';
import Switch from '../../components/SwitchSelector';

const optionsData = [
  {label: 'Last Month', value: 1},
  {label: 'This Month', value: 2},
  {label: 'This Year', value: 3},
];

const Dashboard = ({navigation, route}) => {
  // Dashboard Variables
  const [dataItems, setDataItems] = useState([]);
  const [businessUnit, setBusinessUnit] = useState([]);
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState(0);
  const [level1List, setLevel1List] = useState([]);
  const [loadIndex, setLoadIndex] = useState(-1);
  const [selectedOption, setSelectedOption] = useState(2);
  // const [response,setResponse]=useState([]);
  // Ref Variables
  const offset = useRef(new Animated.Value(0)).current;

  const storage = new MMKV();

  let selectedFilter = storage.getString(_const.selectFilterCache)
    ? JSON.parse(storage.getString(_const.selectFilterCache))
    : [];

  let isFilterSelected = false;

  if (selectedFilter.length !== 0) {
    isFilterSelected = true;
  }

  useEffect(() => {
    let variables = {};
    graphQLApi(GET_DASHBOARD_DATA, variables, navigation)
      .then(res => {
        setDataItems(res?.data?.data?.Dashboard);
        const levelList = res?.data?.data?.Dashboard.find(
          item => item.ui_element_name === 'Business',
        ).children;
        const level2SliderData = {
          headerName: 'Business',
          levelList: levelList,
        };
        storage.set(_const.level2SliderCache, JSON.stringify(level2SliderData));

        const names = extractTopLevelNames(res?.data?.data?.Dashboard);
        setBusinessUnit(names);
        let businessUnitValue = storage.getString(_const.headerCache)
          ? JSON.parse(storage.getString(_const.headerCache))
          : 0;

        // setSelectedBusinessUnit(route.params?.id ?? 0); //nullish check for routing from insights back to products
        setSelectedBusinessUnit(businessUnitValue);

        setLoadIndex(prev => prev + 1);
      })
      .catch(err => {});
    setSelectedOption(2);
  }, []);

  useEffect(() => {
    if (
      loadIndex >= 0 &&
      dataItems[selectedBusinessUnit]?.children?.length > loadIndex
    ) {
      setLevel1List(prev => [
        ...prev,
        dataItems[selectedBusinessUnit]?.children[loadIndex],
      ]);
    } else {
    }
  }, [loadIndex, selectedBusinessUnit]);

  const renderItem = ({item, index}) => {
    const filter = storage.getString(_const.filterParamsCache)
      ? JSON.parse(storage.getString(_const.filterParamsCache))
      : {};

    return (
      <View key={index}>
        <Template
          id={item?.id}
          template_id={item?.template_id}
          tableName={isFilterSelected ? item?.name : item?.name + '_vw'}
          title={item?.ui_element_name}
          navigation={navigation}
          level={1}
          productSegement={selectedOption}
          filter={filter}
        />
      </View>
    );
  };

  function extractTopLevelNames(data) {
    return data.map(category => category.ui_element_name);
  }

  function storeChildrenList(data) {
    // Find the category with the selected name
    // const selectedCategory = data.find(
    //   category => category.ui_element_name === selectedCategoryName,
    // );

    // if (data[index]) {
    //   // Extract and store the children_list in the state
    //   setLevel1List(data[index].children);
    // } else {
    //   // Handle the case where the selected category is not found
    //   console.error('Selected category not found');
    // }
    setLevel1List(prev => [...prev, data.children]);
  }

  const handleClickBusinessUnit = (selectedid, item) => {
    setLevel1List([]);
    setSelectedBusinessUnit(selectedid);
    setLoadIndex(0);
    storage.set(_const.filterDataCache, JSON.stringify([]));
    storage.set(_const.filterParamsCache, JSON.stringify({}));
    storage.set(_const.selectFilterCache, JSON.stringify([]));
    storage.set(_const.headerCache, JSON.stringify(selectedid));
    if (item === 'Business') {
      const levelList = dataItems.find(
        item => item.ui_element_name === 'Business',
      ).children;
      const level2SliderData = {
        headerName: 'Business',
        levelList: levelList,
      };

      storage.set(_const.level2SliderCache, JSON.stringify(level2SliderData));
    } else {
      storage.set(_const.level2SliderCache, '');
    }
    // storeChildrenList(item, dataItems);
  };

  const handleClickSegment = value => {
    setSelectedOption(value);
  };

  return (
    <>
      <SafeAreaView backgroundColor={color.secondary200} />
      <View style={styles.wrapper}>
        <Header
          animatedValue={offset}
          businessUnit={businessUnit}
          selectedBusinessUnit={selectedBusinessUnit}
          handleClickBusinessUnit={handleClickBusinessUnit}
          navigation={navigation}
        />
        {selectedBusinessUnit === 2 && (
          <View style={{alignItems: 'center'}}>
            <Switch
              options={optionsData}
              selectedOption={selectedOption}
              handleClick={handleClickSegment}
              containerStyles={{
                marginTop: 26,
                width: '80%',
              }}
              initialValue={1}
              backgroundColor={color.white00}
            />
          </View>
        )}
        <FlatList
          contentContainerStylre={styles.flatlistInner}
          data={level1List}
          ItemSeparatorComponent={<View style={{height: 16}} />}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: offset}}}],
            {useNativeDriver: false},
          )}
          renderItem={renderItem}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          style={styles.flatlistOuter}
          onEndReachedThreshold={1}
          onEndReached={() => setLoadIndex(prev => prev + 1)}
        />
      </View>
      {selectedBusinessUnit !== 0 && (
        <Pressable
          onPress={() => {
            navigation.navigate(_const.dashboardfilter, {
              levelId: '1',
            });
          }}
          style={styles.filterContainer}>
          <Images.Filter width={24} height={24} fill={color.white} />
        </Pressable>
      )}
    </>
  );
};

export default Dashboard;
