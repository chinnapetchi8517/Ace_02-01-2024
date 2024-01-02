import {View, Text, Pressable, FlatList, ScrollView} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {MMKV} from 'react-native-mmkv';

// Styles
import styles from './styles';

// Images
import Images from '../../assets';

// Const
import color from '../../constant/color';

// API
import graphQLApi from '../../service/graphQLApi';

// Query
import {GET_PRODUCTS} from '../../query/home';

// Component
import Template from '../template';
import Insight from '../../screens/Insights';
import _const from '../../constant/const';

const Template11 = props => {
  const {
    template_id,
    tableName,
    title,
    disableCardHeader,
    id,
    navigation,
    level,
    isBookmarked,
    sliderOption,
    isModal,
    productSegement,
    filter,
  } = props;
  const [productList, setProductList] = useState([]);
  const storage = new MMKV();

  useEffect(() => {
    let variables = {
      id: id,
    };
    graphQLApi(GET_PRODUCTS, variables)
      .then(res => {
        setProductList(res?.data?.data?.Products?.[0]);
      })
      .catch(err => {
      });
  }, []);

  const handleClickTemplate = () => {
    navigation.navigate(`Level${level + 1}`, {id});
  };

  return (
    <View style={styles.TemplateContainer}>
      {!disableCardHeader ? (
        <Fragment>
          <View style={styles.titleContainer}>
            {/* <Pressable onPress={() => handleClickTemplate()}> */}
            <Text style={styles.title}>{title}</Text>
            {/* </Pressable> */}
            <View style={{gap: 16, flexDirection: 'row'}}>
              <Pressable onPress={() => {
                  navigation.navigate(_const.insights, {title: title});
                }}>
              <Images.Insight
                width={24}
                height={24}
              />
              </Pressable>
              <Images.Bookmark
                width={24}
                height={24}
                fill={isBookmarked ? color.neutral400 : color.neutral400}
                onPress={() => {}}
              />
            </View>
          </View>
          <View style={styles.line} />
        </Fragment>
      ) : null}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}
        style={{marginBottom: 36}}>
        <FlatList
          initialNumToRender={4}
          contentContainerStyle={{backgroundColor: 'yellow'}}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={productList?.children}
          renderItem={({item, index}) => {
            const level2SliderData = {
              headerName: title,
              levelList: productList?.children,
            };
            // storage.set(
            //   _const.level2SliderCache,
            //   JSON.stringify(level2SliderData),
            // );

            return (
              <Template
                id={item?.id}
                template_id={item?.template_id}
                tableName={item?.name}
                title={item?.ui_element_name}
                navigation={navigation}
                level={level}
                productSegement={productSegement}
                filter={filter}
                level2SliderData={level2SliderData}
              />
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Template11;
