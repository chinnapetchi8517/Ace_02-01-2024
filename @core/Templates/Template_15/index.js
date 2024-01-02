import {View, Text, SafeAreaView, ScrollView, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';

// Component
import Card from '../../components/Card';

// Styles
import styles from './styles';
import Template from '../template';

// Query
import {GET_LEVEL_2_PRODUCTS} from '../../query/level2';

// API
import graphQLApi from '../../service/graphQLApi';

const CardTemplate = ({
  item,
  index,
  chartColor,
  handleClickCard,
  navigation,
  filter,
}) => {
  const color = chartColor[index % chartColor.length];
  let templateId = 1;
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
        chartColumn={templateId === 1 ? 'mtd' : 'total_inflow'}
        navigation={navigation}
        isDark={false}
        isAreaChart={true}
        filter={filter}
      />
    </Pressable>
  );
};

const Template15 = props => {
  const {navigation, id: propId, filter} = props;
  const route = useRoute();
  const [dataItem, setDataItems] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  let level = 2;
  const {params} = route;
  const id = propId ? propId : params ? params.id : null;

  useEffect(() => {
    let variables = {
      id: id,
    };
    graphQLApi(GET_LEVEL_2_PRODUCTS, variables, navigation)
      .then(res => {
        setDataItems(res?.data?.data?.Level_Data?.[0]);
      })
      .catch(err => {
      });
  }, []);

  // const chartColor = ['#1890FF', '#8543E0', '#13C2C2', '#3436C7'];
  const chartColor = [
    {light: '#F9F5FF', dark: '#8543E0'},
    {light: '#13C2C21A', dark: '#13C2C2'},
    {light: '#1890FF12', dark: '#1890FF'},
  ];

  const handleClickCard = item => {
    navigation.navigate(`Level${level + 1}`, {
      id: item.id,
      parent_template_id: dataItem?.template_id,
      parent_screen_id: id,
      selectedCategory: item,
    });
  };

  let cardArray = dataItem && dataItem?.filter && JSON.parse(dataItem?.filter);

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
        {dataItem && Object.keys(dataItem).length > 0 && (
          <>
            <Template
              id={dataItem?.id}
              template_id={1}
              tableName={dataItem?.name}
              title={dataItem?.ui_element_name}
              navigation={navigation}
              disableCardHeader={true}
              filter={filter}
              level={2}
            />
            <View style={{marginTop: 16, marginBottom: 16}}>
              {cardArray?.length > 0 &&
                cardArray.map((item, index) => {
                  return (
                    <CardTemplate
                      item={item}
                      index={index}
                      key={index}
                      chartColor={chartColor}
                      navigation={navigation}
                      handleClickCard={handleClickCard}
                      filter={filter}
                    />
                  );
                })}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Template15;
