import {Pressable, SafeAreaView, View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import HeadBackWrapper from '../../wrappers/HeadBackWrapper';
import React, {useEffect, useState} from 'react';
import graphQLApi from '../../service/graphQLApi';
import {GET_LEVEL_4_Products} from '../../query/level4';
import Template10 from '../../Templates/Template_10';
import {MMKV} from 'react-native-mmkv';

import Level5 from '../Level5';
import _const from '../../constant/const';
import Images from '../../assets';
import styles from './styles';
import color from '../../constant/color';

const Level4 = props => {
  const {navigation} = props;
  const route = useRoute();
  const {params} = route;
  const [dataItem, setDataItem] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [filterData, setFilterData] = useState({filter: {}});
  const storage = new MMKV();
  const id = params ? params.id : null;
  const parent_template_id = params ? params?.parent_template_id : null;
  const parent_screen_id = params ? params?.parent_screen_id : null;
  const selectedCategory = params ? params?.selectedCategory : null;

  const filterParams = storage.getString(_const.filterParamsCache)
    ? JSON.parse(storage.getString(_const.filterParamsCache))
    : {};

  const {channel, ...level4Filter} = filterParams;

  useEffect(() => {
    let variables = {
      id: id,
    };
    setFilterData(prevFilterData => {
      return {
        filter: {
          ...prevFilterData.filter,
          [selectedCategory.column]: selectedCategory.value,
          ...level4Filter,
        },
      };
    });

    graphQLApi(GET_LEVEL_4_Products, variables, navigation)
      .then(res => {
        setDataItem(res?.data?.data?.Level_Data?.[0]);
      })
      .catch(err => {});
  }, []);

  const handleClickColumn = data => {
    setFilterData(prevFilterData => ({
      filter: {
        ...prevFilterData.filter,
        sub_channel: data.branch,
      },
    }));
    setSelectedItem(data);
    setIsVisible(true);
  };

  const handleClickClose = () => {
    setIsVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View style={styles.wrapper}>
        <HeadBackWrapper
          headerTitle={dataItem?.ui_element_name}
          navigation={navigation}
          onPressBack={() =>
            navigation.navigate('Level3', {
              id: parent_screen_id,
            })
          }></HeadBackWrapper>
        {dataItem && Object.keys(dataItem).length > 0 && (
          <View style={{paddingHorizontal: 16}}>
            <Template10
              id={dataItem?.id}
              template_id={dataItem?.template_id}
              tableName={dataItem?.name}
              title={dataItem?.ui_element_name}
              navigation={navigation}
              level={4}
              parent_template_id={parent_template_id}
              handleClickColumn={handleClickColumn}
              filter={filterData?.filter}
              selectedCategory={selectedCategory}
            />
          </View>
        )}

        {isVisible && (
          <Level5
            isVisible={isVisible}
            navigation={navigation}
            onClose={handleClickClose}
            id={id}
            template_id={parent_template_id}
            tableName={selectedCategory?.tableName}
            title={selectedItem?.branch}
            filter={filterData?.filter}
          />
        )}
      </View>
      <Pressable
        onPress={() => {
          navigation.replace(_const.bottomTab);
        }}
        style={styles.backtohomeContainer}>
        <Images.DashboardIcon
          width={20}
          height={20}
          marginLeft={8}
          fill={color.white}
        />
        <Text style={styles.backText}>Back to Home</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate(_const.dashboardfilter, {
            levelId: '4',
            screenName: 'Level4',
            id,
            selectedCategory: selectedCategory,
            parent_template_id: parent_template_id,
            parent_screen_id: parent_screen_id,
            tableName: dataItem?.ui_element_name,
          });
        }}
        style={styles.filterContainer}>
        <Images.Filter width={24} height={24} fill={color.white} />
      </Pressable>
    </SafeAreaView>
  );
};

export default Level4;
