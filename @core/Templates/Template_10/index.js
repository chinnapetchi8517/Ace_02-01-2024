import {View, ScrollView, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import TableComponentSample from '../../components/table/sample';

// API
import graphQLApi from '../../service/graphQLApi';
// Query
import {GROUP_BY_DATA, TEMPLATE_DATA} from '../../query/template';
import TemplateQuery from '../../query/template';
import Template from '../template';

const Template10 = props => {
  const {
    template_id,
    tableName,
    title,
    id,
    navigation,
    isBookmarked,
    hideTitle,
    sliderOption,
    parent_template_id,
    handleClickColumn,
    filter,
    selectedCategory,
  } = props;

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let query = TemplateQuery({template_id: 10, tableName: ''});

    let variables = {
      tableName: tableName,
      params: {
        channel: selectedCategory?.value,
        sub_channel: '',
        ...filter,
      },
      fields:
        parent_template_id === 1
          ? 'mtd,ytd,mtd_target,ytd_target'
          : 'growth_this_year,last_year_end,month_end',
      limit: null,
      offset: null,
    };

    setIsLoading(true);
    graphQLApi(GROUP_BY_DATA, variables)
      .then(res => {
        setTableData(res?.data?.data?.GroupData);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  }, []);

  const transformedData =
    tableData &&
    tableData?.length &&
    tableData.map(item => ({
      branch: item?.result?.sub_channel,
      mon: {
        value:
          parent_template_id === 1
            ? item?.result?.mtd[0].toString()
            : item?.result?.month_end[0].toString(),
        plan:
          parent_template_id === 1
            ? item?.result?.mtd_target[0].toString()
            : item?.result?.month_end[1].toString(),
        monthPlan:
          parent_template_id === 1
            ? item?.result?.mtd[0] - item?.result?.mtd[1]
            : item?.result?.month_end[0] - item?.result?.month_end[1],
      },
      yr: {
        value:
          parent_template_id === 1
            ? item?.result?.ytd[0].toString()
            : item?.result?.growth_this_year[0].toString(),
        plan:
          parent_template_id === 1
            ? item?.result?.ytd_target[0].toString()
            : item?.result?.last_year_end[0].toString(),
        yearPlan:
          parent_template_id === 1
            ? item?.result?.ytd[0] - item?.result?.ytd[1]
            : item?.result?.last_year_end[0] - item?.result?.last_year_end[1],
      },
    }));

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: Dimensions.get('window').height * 0.1875,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <Template
            id={id}
            template_id={parent_template_id}
            tableName={tableName}
            title={title}
            navigation={navigation}
            level={4}
            disableCardHeader={true}
            filter={filter}
          />
        </View>
        <View>
          <TableComponentSample
            tableData={transformedData}
            handleClickColumn={handleClickColumn}
            loading={isLoading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Template10;
