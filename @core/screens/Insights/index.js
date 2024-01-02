import React, {useEffect, useState} from 'react';
import color from '../../constant/color';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useRoute} from '@react-navigation/native';

// API
import graphQLApi from '../../service/graphQLApi';

// Query
import {GROUP_BY_DATA} from '../../query/template';

// Constant
import HeadBackWrapper from '../../wrappers/HeadBackWrapper';
import Template8 from '../../Templates/Template_8';
import Template4 from '../../Templates/Template_4';
import Template5 from '../../Templates/Template_5';
import Template6 from '../../Templates/Template_6';
import styles from './styles';
import Template3 from '../../Templates/Template_3';
import Template7 from '../../Templates/Template_7';
import Template9 from '../../Templates/Template_9';

const Insight = ({navigation}) => {
  const [responseData, setResponseData] = useState([]);
  const route = useRoute();
  const {params} = route;
  const title = params ? params.title : null;

  useEffect(() => {
    // let variables = {
    //   tableName: 'pf_attrition',
    //   params: {
    //     att_category: '',
    //   },
    //   fields: 'mtd,ytd',
    //   limit: null,
    //   offset: null,
    // };
    // graphQLApi(GROUP_BY_DATA, variables, navigation)
    //   .then(res => {
    //     const dynamicData = res?.data?.data?.GroupData;
    //     setResponseData(dynamicData);
    //   })
    //   .catch(err => {
    //   });
  }, []);

  return (
    <SafeAreaView backgroundColor={color.secondary50}>
      <HeadBackWrapper
        headerTitle={`Insights -${title} `}
        navigation={navigation}
        onPressBack={() => navigation.navigate('Dashboard', {id: 2})}
      />
      <ScrollView style={{paddingBottom: 100}}>
        <View style={styles.flatlistInner}>
          <Template7
            title={'Cross sell'}
            tableName="pr_pf_insg_cross_sell"
            column="product_name"
            fieldsColumn="month"
          />
          <Template3
            title={'Buyout'}
            tableName="pr_pf_insg_buyout"
            column="bank_name"
            fieldsColumn="buy_out_amt"
          />
          <Template7
            title={'Boarding Rate'}
            tableName="pr_pf_insg_boarding_rate"
            column="product_name"
            fieldsColumn="boarding_rate"
          />
          <Template4
            title={'Attrition'}
            tableName="pr_pf_insg_attrition"
            column="type"
            fieldsColumn="attr_percent"
            hideTitle={false}
          />

          {/* <Template8
            data={responseData}
            title={'Attrition by MoB'}
            hideTitle={false}
          />
         
          <Template5
            data={responseData}
            title={'Attrition by Type'}
            hideTitle={false}
          />
    
          <Template3 data={responseData} title={'Buyout'} />
          <Template6 data={responseData} title={'Attrition by MoB'} />
          <Template9 data={responseData} title={'Attrition by MoB'} /> */}
        </View>
      </ScrollView>
      {/* </HeadBackWrapper> */}
    </SafeAreaView>
  );
};

export default Insight;
