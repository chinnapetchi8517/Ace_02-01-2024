// Filter Screen
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {MMKV} from 'react-native-mmkv';
import {useRoute} from '@react-navigation/native';
import {GET_FILTER, GET_SUBPRODUCT} from '../../query/filter';

// Component
import Primarybutton from '../../components/primarybutton';

// Constant
import color from '../../constant/color';

// Images
import Images from '../../assets';

// Style
import styles from './styles';
import {useFocusEffect} from '@react-navigation/native';
import graphQLApi from '../../service/graphQLApi';
import _const from '../../constant/const';

const Filter = props => {
  const {navigation} = props;
  const route = useRoute();
  const [isloading, setLoading] = useState(true);
  const [filters, setFilters] = useState([]);
  const [selectedFilter, setFilteSelected] = useState([]);
  const [reset, setReset] = useState(false);
  const storage = new MMKV();
  let headerCache = storage.getString(_const.headerCache);
  const levelId = route?.params ? route?.params?.levelId : null;
  const id = route?.params ? route?.params?.id : null;
  const screenName = route?.params ? route?.params?.screenName : null;
  const tableName = route?.params ? route?.params?.tableName : null;

  const parent_template_id = route?.params
    ? route?.params?.parent_template_id
    : null;
  const parent_screen_id = route?.params
    ? route?.params?.parent_screen_id
    : null;
  const selectedCategory = route?.params
    ? route?.params?.selectedCategory
    : null;
  let filterDataCache = storage.getString(_const.filterDataCache)
    ? JSON.parse(storage.getString(_const.filterDataCache))
    : [];
  selectedFilters = storage.getString(_const.selectFilterCache)
    ? JSON.parse(storage.getString(_const.selectFilterCache))
    : [];
  let selectedFilters;

  useEffect(() => {
    let variable = {
      levelIds: ['1'],
    };
    if (filterDataCache.length == 0) {
      graphQLApi(GET_FILTER, variable, navigation)
        .then(res => {
          const filterData = res?.data.data.app_filter.map(item => {
            return {
              level: item.level,
              sectionValue: item.value.replace(/'/g, ''),
              sectionName: item.sectionName.replace(/'/g, ''),
              options: item?.children ?? [],
            };
          });
          getSubProduct(filterData, []);
        })
        .catch(err => {
          setLoading(false);
        });
    } else {
      getSubProduct(filterDataCache, selectedFilters);
    }
  }, [reset]);

  const getSubProduct = (filterData, selectedFilter) => {
    filterData = filterData.filter(item => item.level !== '2');
    selectedFilter = selectedFilter.filter(item => item.level !== '2');
    if (parseInt(levelId) >= 3) {
      let subProductVariable = {
        sub_product: tableName.toLowerCase().replace(/\s/g, ''),
      };
      graphQLApi(GET_SUBPRODUCT, subProductVariable, navigation)
        .then(subProductRes => {
          const subProductData = subProductRes?.data.data.app_filter.map(
            ({sectionName, level, value, children}) => {
              const options = children?.[0]?.products?.map(
                ({options, value}) => ({
                  options: options,
                  value: value,
                }),
              );
              return {
                level: level,
                sectionValue: value.replace(/'/g, '').trim(),
                sectionName: sectionName.replace(/'/g, '').trim(),
                options: options,
              };
            },
          );
          const mergedData = [...filterData, ...subProductData];
          setFilters(mergedData);

          setLoading(false);
        })
        .catch(err => {
          console.log('err', err);
          setLoading(false);
        });
    } else {
      filterData.filter(item => item.level !== '2');
      selectedFilter.filter(item => item.level !== '2');
      setFilters(filterData);
    }

    setFilteSelected(selectedFilter);
  };

  const renderFilterSections = (sectionData, sectionIndex) => {
    const sectionName = sectionData?.sectionName ?? null;
    const sectionValue = sectionData?.sectionValue ?? null;
    const sectionOptions = sectionData?.options ?? [];

    const selectedOption = sectionData?.selectedOption ?? null;

    const checkSectionOptions =
      Array.isArray(sectionOptions) && sectionOptions.length > 0;

    const handleSelection = option => {
      let helperArr = [...filters];
      addOrUpdateEntry(sectionValue, option);
      // .trim().replace(/ /g, '_')
      const updateItem = {
        ...sectionData,
        selectedOption: option,
      };
      helperArr = helperArr.map(item =>
        item?.sectionValue == sectionData?.sectionValue ? updateItem : item,
      );
      setFilters(helperArr);
      storage.set(_const.filterDataCache, JSON.stringify(helperArr));
    };

    function addOrUpdateEntry(key, value) {
      const index = selectedFilter.findIndex(entry => entry.key === key);
      if (index !== -1) {
        selectedFilter[index].value = value;
      } else {
        selectedFilter.push({key, value});
      }
      storage.set(_const.selectFilterCache, JSON.stringify(selectedFilter));
    }

    return (
      sectionName &&
      checkSectionOptions && (
        <View>
          <Text style={styles.title}>{sectionName}</Text>
          {sectionOptions.map((option, optionIndex) => {
            const checkSelectedOption = selectedOption == option?.value;

            return (
              <Pressable
                key={optionIndex}
                onPress={() => handleSelection(option.value)}
                style={styles.subView}>
                <Text style={styles.subTitle}>
                  {option?.options.replace(/'/g, '')}
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    borderColor: checkSelectedOption
                      ? color.primary500
                      : color.neutral300,
                    borderRadius: 20 / 2,
                    borderWidth: 1,
                    height: 20,
                    justifyContent: 'center',
                    width: 20,
                  }}>
                  {checkSelectedOption && (
                    <View
                      style={{
                        backgroundColor: color.primary500,
                        borderRadius: 10 / 2,
                        height: 10,
                        width: 10,
                      }}
                    />
                  )}
                </View>
              </Pressable>
            );
          })}
          <View style={styles.line} />
        </View>
      )
    );
  };

  const navigateBasedOnLevel = () => {
    switch (levelId) {
      case '1':
        navigation.navigate('Dashboard');
        break;
      case '2':
      case '3':
      case '4':
        navigation.navigate(screenName, {
          selectedCategory: selectedCategory,
          id,
          parent_template_id: parent_template_id,
          parent_screen_id: parent_screen_id,
        });
        break;

      default:
        break;
    }
  };

  return (
    <>
      <SafeAreaView backgroundColor={color.secondary200} />
      <StatusBar
        backgroundColor={color.secondary200}
        barStyle={'dark-content'}
      />
      <View style={styles.headerViewstyle}>
        <Pressable
          style={styles.navLeftBackstyle}
          onPress={() => navigateBasedOnLevel()}>
          <Images.LeftArrow fill={color.neutral900} height={14} width={14} />
        </Pressable>
        <Text style={styles.headerText}>Filter</Text>
        <Pressable
          onPress={() => {
            storage.set(_const.filterDataCache, JSON.stringify([]));
            storage.set(_const.filterParamsCache, JSON.stringify({}));
            storage.set(_const.selectFilterCache, JSON.stringify([]));
            setReset(true);
            navigateBasedOnLevel();
          }}>
          <Text style={styles.reset}>Reset</Text>
        </Pressable>
      </View>
      <FlatList
        contentContainerStyle={styles.scrollstyle}
        data={
          levelId == '1'
            ? filters.filter(item =>
                headerCache === '2'
                  ? item.level === '1' && item.sectionValue !== 'category'
                  : item.level === '1',
              )
            : filters.filter(item =>
                headerCache === '2'
                  ? item.sectionValue !== 'category' &&
                    item.sectionValue !== 'sub_product'
                  : item.sectionValue !== 'category',
              )
        }
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <View style={styles.noRecordContainer}>
            {isloading ? (
              <ActivityIndicator size={'large'} color={color.primary500} />
            ) : (
              <>
                <Images.NoResults width={80} height={80} />
                <Text style={styles.title_noRecord}>No Filters Found</Text>
              </>
            )}
          </View>
        }
        renderItem={({item, index}) => {
          return (
            <View key={index} style={styles.top32}>
              {renderFilterSections(item, index)}
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        style={styles.wrapper}
      />
      {Array.isArray(filters) && filters.length > 0 && (
        <View style={styles.bottomButtonContainer}>
          <Primarybutton
            disabled={selectedFilter.length === 0}
            label={'Apply'}
            onPress={() => {
              const filterParams = selectedFilter?.reduce((result, entry) => {
                result[entry.key] = entry.value.replace(/'/g, '');
                return result;
              }, {});
              storage.set(
                _const.filterParamsCache,
                JSON.stringify(filterParams),
              );
              navigateBasedOnLevel();
            }}
          />
        </View>
      )}
    </>
  );
};

export default Filter;
