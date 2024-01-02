/* eslint-disable react-hooks/exhaustive-deps */
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  LogBox,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {MMKV} from 'react-native-mmkv';
import styles from './styles';

import Search from '../../components/search';
import Images from '../../assets';

// Constant
import color from '../../constant/color';
import _const from '../../constant/const';

// API
import graphQLApi from '../../service/graphQLApi';

// Query
import {GLOBAL_SEARCH, UPDATE_RECENT_SEARCH} from '../../query/search';
import Template from '../../Templates/template';

const Assisant = ({navigation}) => {
  const [searchtext, setSearchText] = useState('');
  const [recentData, setRecentData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [showNoReslut, setShowNoResult] = useState(false);
  const [isLoadingNoResult, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);
  const storage = new MMKV();
  const userInfo = JSON.parse(storage.getString(_const.userInfo));
  const searchInfo = JSON.parse(storage.getString(_const.searchHistoryCache));

  useEffect(() => {
    LogBox.ignoreLogs(['flexWrap']);
  }, [recentData]);

  useEffect(() => {
    setRecentData(searchInfo);
  }, []);

  const removeitem = (value, ind) => {
    const filterdata = recentData.filter((item, i) => i != ind);
    setRecentData(filterdata);
    updateRecentSearch(filterdata);
    storage.set(_const.recentSearch, JSON.stringify(filterdata));
  };

  const handleChangeSearch = value => {
    if (value === '' || (value.trim() !== '' && value.trim().length !== 0)) {
      setSearchText(value);
      delaySaveToDb(value);
      result && setResult(null);
    }
  };

  const delaySaveToDb = useCallback(
    debounce(val => {
      const trimmedSearchTerm = val.trim();
      if (trimmedSearchTerm !== '') {
        getSearchResult(trimmedSearchTerm);
      } else {
        setSearchResult([]);
      }
    }, 500),
    [searchResult],
  );

  function buildSearchCondition(searchValue) {
    // Split the search value into individual words
    const words = searchValue.split(/\s+/);

    // Construct a list of conditions for each word
    const conditions = words.map(word => ({
      ui_element_name: {_ilike: `%${word}%`},
    }));

    // Combine conditions with the "_and" operator
    const combinedCondition = {_and: conditions};

    return combinedCondition;
  }

  const getSearchResult = searchValue => {
    const condition = buildSearchCondition(searchValue);

    let variables = {
      condition,
    };
    setLoading(true);
    setShowNoResult(false);
    graphQLApi(GLOBAL_SEARCH, variables, navigation)
      .then(res => {
        const formattedArray = formatApiData(res?.data?.data?.search);
        setSearchResult(formattedArray);
        setLoading(false);
        if (formattedArray.length === 0) {
          setShowNoResult(true);
        }
      })
      .catch(err => {
        setLoading(false);
        setShowNoResult(false);
      });
  };

  function debounce(fn, delay) {
    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  }

  const formatApiData = data => {
    const formattedData = data?.map(item => {
      const formattedItem = {
        id: item.id,
        name: item.ui_element_name,
        parent: [],
        template_id: item.template_id,
        tablename: item.name,
      };

      let currentParent = item.parent;
      while (currentParent) {
        formattedItem.parent.unshift(currentParent.ui_element_name);
        currentParent = currentParent.parent;
      }

      return formattedItem;
    });

    return formattedData;
  };

  const updateRecentSearch = tempSearch => {
    let variables = {
      user_id: userInfo.id,
      recent_search: JSON.stringify(tempSearch),
    };
    storage.set(_const.searchHistoryCache, JSON.stringify(tempSearch));
    graphQLApi(UPDATE_RECENT_SEARCH, variables, navigation)
      .then(res => {
        if (res) {
        }
      })
      .catch(err => {
        setIsLoading(false);
      });
  };

  const handleClickClear = () => {
    setRecentData([]);
    updateRecentSearch([]);
  };

  const renderItem = ({item, index}) => {
    const formatParent = parentArray => {
      if (parentArray.length > 2) {
        return `${parentArray[0]} / ${parentArray[1]} / ...`;
      }
      return parentArray.join(' / ');
    };

    const handleClickSearch = selectedKpi => {

      // Convert all elements in recentData to lowercase for case-insensitive comparison
      const recentDataLowercase = recentData.map(item => item.toLowerCase());

      // Check if the searchtext is not already in recentData (case-sensitive comparison)
      if (!recentDataLowercase.includes(searchtext.trim().toLowerCase())) {
        let tempSearch =
          recentData?.length > 2
            ? [searchtext.trim(), ...recentData.slice(0, -1)]
            : [searchtext.trim(), ...recentData];
        setRecentData(tempSearch);
        updateRecentSearch(tempSearch);
      }

      setResult(selectedKpi);
    };

    const isLastItem = index === searchResult.length - 1;

    return (
      <View key={index} style={styles.itemViewStyle}>
        <Pressable
          onPress={() => handleClickSearch(item)}
          style={
            !isLastItem
              ? styles.searchReslutContainer
              : [styles.searchReslutContainer, styles.lastChild]
          }>
          {item?.parent?.length > 0 && (
            <Text style={styles.cardText}>{formatParent(item.parent)} / </Text>
          )}
          <Text style={styles.cardText}>{item.name}</Text>
        </Pressable>
      </View>
    );
  };

  const handleClickRecentItem = item => {
    setSearchText(item);
    delaySaveToDb(item);
  };

  return (
    <>
      <SafeAreaView backgroundColor={color.secondary100} />
      <View style={styles.wrapper}>
        <Search
          placeholder={'Search for KPIs and metrics'}
          value={searchtext}
          setValue={handleChangeSearch}
          containerStyles={styles.search}
          inputstyle={styles.input}
        />
        {result == null ? (
          <React.Fragment>
            {searchtext === '' && searchResult.length === 0 && (
              <>
                <View style={styles.row}>
                  <View style={styles.viewStyle}>
                    <Images.Clock />
                    <Text style={styles.recentText}>Recent Searches</Text>
                  </View>
                  {recentData?.length != 0 ? (
                    <Pressable onPress={() => handleClickClear()}>
                      <Text style={styles.clear}>Clear All</Text>
                    </Pressable>
                  ) : null}
                </View>
                <View style={styles.list}>
                  {recentData?.length > 0 ? (
                    recentData?.map((item, index) => {
                      return (
                        <View style={styles.wrap} key={index}>
                          <View key={index} style={styles.metricsContainer}>
                            <View style={styles.metrics}>
                              <View style={styles.rowstyle}>
                                <Pressable
                                  onPress={() => handleClickRecentItem(item)}>
                                  <Text style={styles.itemtext}>{item}</Text>
                                </Pressable>
                                <Pressable
                                  onPress={() => removeitem(item, index)}>
                                  <Images.Cancel
                                    width={10}
                                    height={10}
                                    fill={color.neutral700}
                                  />
                                </Pressable>
                              </View>
                            </View>
                          </View>
                        </View>
                      );
                    })
                  ) : (
                    <View style={styles.centerView}>
                      <Images.SearchIcon
                        width={40}
                        height={40}
                        fill={color.neutral500}
                        marginRight={8}
                      />
                      <Text style={styles.notext}>No Recent Searches</Text>
                    </View>
                  )}
                </View>
              </>
            )}

            {isLoading ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size={'large'} color={color.primary500} />
              </View>
            ) : searchResult.length === 0 &&
              searchtext !== '' &&
              showNoReslut ? (
              <View style={styles.noResultFound}>
                <View style={styles.imageContainer}>
                  <Images.NoResults />
                </View>
                <Text style={styles.noResultDescription}>No Results Found</Text>
              </View>
            ) : (
              <>
                <View style={{marginTop: 15}} />
                <FlatList
                  data={searchResult}
                  renderItem={renderItem}
                  ItemSeparatorComponent={props => {
                    return <View style={styles.separatorstyle} />;
                  }}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  ListFooterComponent={<View />}
                  ListFooterComponentStyle={{
                    height: Platform.OS == _const.ios ? 10 : 10,
                  }}
                />
              </>
            )}
          </React.Fragment>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 40}}
            style={{marginTop: 20}}>
            <Template
              template_id={result?.template_id}
              tableName={result?.tablename}
              title={result?.name}
              id={result?.id}
              disableCardHeader={false}
            />
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default Assisant;
