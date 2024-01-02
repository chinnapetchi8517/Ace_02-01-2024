/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
//Bookmarks
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  FlatList,
  Platform,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {MMKV} from 'react-native-mmkv';

// Style
import styles from './styles';

// Constant
import color from '../../constant/color';
import _const from '../../constant/const';

// Image
import Images from '../../assets';

// Component
import Search from '../../components/search';
import Toast from '../../components/Toast';

// API
import graphQLApi from '../../service/graphQLApi';

// Query
import {GET_BOOKMARK_LIST, UPDATE_USER_BOOKMARK} from '../../query/bookmark';

const Bookmark = ({navigation}) => {
  const [bookmarkList, setBookmarkList] = useState([]);
  const [searchtext, setSearchText] = useState('');
  const [toastVisiable, settoastVisiable] = useState(false);
  const [selectitem, setSelectitem] = useState();
  const [removedBookmark, setRemovedBookmark] = useState(null);
  const [removedIndex, setRemovedIndex] = useState(null);
  const [removedBookmarkItem, setRemovedBookmarkItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userBookMarkedID, setUserBookMarkedID] = useState([]);

  const storage = new MMKV();
  const userInfo = JSON.parse(storage.getString(_const.userInfo));
  const boomarkInfo = JSON.parse(storage.getString(_const.bookmarkCache));

  useEffect(() => {
    let variables = {
      id: boomarkInfo,
    };
    setUserBookMarkedID(boomarkInfo);

    graphQLApi(GET_BOOKMARK_LIST, variables, navigation)
      .then(res => {
        const formattedArray = formatApiData(res?.data?.data?.Bookmark_List);
        setIsLoading(false);
        setBookmarkList(formattedArray);
      })
      .catch(err => {
        setIsLoading(false);
      });
  }, []);

  function formatApiData(apiData) {
    return apiData?.map((item, index) => {
      const formattedItem = {
        id: index,
        name: item.ui_element_name,
        kpi_id: item.id,
        parent: getParentList(item.parent),
      };

      return formattedItem;
    });
  }

  function getParentList(parentList) {
    const result = [];

    while (parentList) {
      result.unshift(parentList.ui_element_name);
      parentList = parentList.parent;
    }

    return result;
  }

  const undoAction = () => {
    settoastVisiable(false);
    if (removedBookmark !== null && removedIndex !== null) {
      setBookmarkList(prevList => {
        const newList = [...prevList];
        newList.splice(removedIndex, 0, removedBookmark);
        return newList;
      });
      let removeFilterItem = removedBookmarkItem.filter(
        data => data !== removedBookmark.kpi_id,
      );
      setRemovedBookmarkItem(removeFilterItem);

      const updatedList = [...userBookMarkedID];
      updatedList.splice(removedIndex, 0, removedBookmark.kpi_id);
      setUserBookMarkedID(prevList => updatedList);

      let variables = {
        user_id: userInfo.id,
        bookmark: JSON.stringify(updatedList),
      };
      storage.set(_const.bookmarkCache, JSON.stringify(updatedList));
      graphQLApi(UPDATE_USER_BOOKMARK, variables, navigation)
        .then(res => {
          if (res) {
          }
        })
        .catch(err => {
        });
      setRemovedBookmark(null);
      setRemovedIndex(null);
    }
  };

  const removeAction = (i, value, id) => {
    let tempArr = removedBookmarkItem;
    setRemovedBookmarkItem([...tempArr, id]);
    settoastVisiable(true);

    setSelectitem(value);
    const removedItem = bookmarkList[i];
    let filterSelectID = userBookMarkedID.filter(
      item => item !== removedItem.kpi_id,
    );
    setUserBookMarkedID(filterSelectID);

    setRemovedBookmark(removedItem);
    setRemovedIndex(i);

    const filteredData = bookmarkList.filter((item, ind) => ind !== i);
    setBookmarkList(filteredData);
  };

  const handleCloseToast = () => {
    settoastVisiable(false);
    storage.set(_const.bookmarkCache, JSON.stringify(userBookMarkedID));
    let variables = {
      user_id: userInfo.id,
      bookmark: JSON.stringify(userBookMarkedID),
    };
    graphQLApi(UPDATE_USER_BOOKMARK, variables, navigation)
      .then(res => {
        if (res) {
        }
      })
      .catch(err => {
      });
  };

  const filteredBookmarkList = bookmarkList.filter(item =>
    searchtext
      .toLowerCase()
      .split(' ')
      .every(word => item.name.toLowerCase().includes(word)),
  );

  const renderItem = ({item, index}) => {
    const formatParent = parentArray => {
      if (parentArray.length > 2) {
        return `${parentArray[0]} / ... / ${
          parentArray[parentArray.length - 1]
        }`;
      }
      return parentArray.join(' / ');
    };

    const handleClickBookmark = id => {
      navigation.navigate('Dashboard', {id});
    };

    return (
      <View key={index} style={styles.itemViewStyle}>
        <Pressable
          onPress={() => handleClickBookmark(item?.kpi_id)}
          style={styles.titleContainer}>
          <Text style={styles.cardText}>{item.name}</Text>
          <Text style={styles.cardsubtext}>{formatParent(item.parent)}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            removeAction(index, item.name, item.kpi_id);
          }}>
          <Images.Bookmark width={24} height={24} />
        </Pressable>
      </View>
    );
  };

  const handleChangeSearch = value => {
    if (value === '' || (value.trim() !== '' && value.trim().length !== 0)) {
      setSearchText(value);
    }
  };

  return (
    <>
      <SafeAreaView backgroundColor={color.secondary200} />
      <StatusBar
        backgroundColor={color.secondary200}
        barStyle={'dark-content'}
      />
      <View style={styles.titleViewstyle}>
        <Text style={styles.title}>Bookmarks</Text>
      </View>
      <View style={styles.wrapper}>
        <Search
          placeholder={'Search bookmarks...'}
          value={searchtext}
          setValue={handleChangeSearch}
          containerStyles={styles.search}
          inputstyle={styles.input}
        />
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={'large'} color={color.primary500} />
          </View>
        ) : filteredBookmarkList.length > 0 ? (
          <FlatList
            data={filteredBookmarkList}
            renderItem={renderItem}
            ItemSeparatorComponent={props => {
              return <View style={styles.separatorstyle} />;
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{
              height: Platform.OS == _const.ios ? 150 : 110,
            }}
          />
        ) : (
          <View style={styles.noResultFound}>
            <View style={styles.imageContainer}>
              {searchtext !== '' ? <Images.NoResults /> : <Images.NoBookmark />}
            </View>
            <Text style={styles.noResultDescription}>
              {searchtext !== '' ? 'No Results Found' : 'No Bookmarks Yet'}
            </Text>
          </View>
        )}
      </View>
      <Toast
        visible={toastVisiable}
        message={selectitem + ' Bookmark Removed'}
        onUndo={undoAction}
        onDismiss={() => handleCloseToast()}
      />
    </>
  );
};

export default Bookmark;
