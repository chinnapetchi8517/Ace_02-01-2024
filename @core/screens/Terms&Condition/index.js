// Terms&conditions Screen

import {
  SafeAreaView,
  ScrollView,
  Text,
  Pressable,
  View,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

// Style
import styles from './styles';
import color from '../../constant/color';
import Images from '../../assets';
import {appActiveOpacity} from '../../constant';
import graphQLApi from '../../service/graphQLApi';
import {GET_PROFILE_DETAILS} from '../../query/profile';
import RenderHtml from 'react-native-render-html';
import _const from '../../constant/const';
import moment from 'moment';
const TermCondition = ({navigation, route}) => {
  const [termsdata, setTermsdata] = useState('');
  const [lastupdated, setLastupdated] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let variables = {
      type: 'terms-of-service',
    };
    graphQLApi(GET_PROFILE_DETAILS, variables, navigation)
      .then(res => {
        let terms = res?.data?.data?.docs?.[0]?.content;
        setLastupdated(res?.data?.data?.docs?.[0]?.lastUpdated);
        setTermsdata(terms);
      })
      .catch(err => {
        setIsLoading(false);
      });
  }, []);

  const Htmlcontent = React.memo(function Htmlcontent({html}) {
    const {width} = useWindowDimensions();

    return (
      <RenderHtml
        contentWidth={width}
        source={{html}}
        systemFonts={[_const.blissRegular]}
        tagsStyles={{
          p: styles.subtitle1,
        }}
      />
    );
  });

  return (
    <SafeAreaView backgroundColor={color.white}>
      {termsdata !== '' ? (
        <>
          <View style={styles.wrapper}>
            <View style={{...styles.headerstyle, ...styles.margin}}>
              <Pressable
                activeOpacity={appActiveOpacity}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Images.Back></Images.Back>
              </Pressable>
            </View>
            <Text style={styles.title}>Terms & Conditions</Text>
            <Text style={{...styles.subtitle, ...styles.space}}>
              {lastupdated == ''
                ? ''
                : `Last updated : ${moment(lastupdated).format(
                    'MMM DD, YYYY',
                  )}`}
            </Text>

            <ScrollView>
              <View>
                <Htmlcontent html={termsdata} />
              </View>
            </ScrollView>
          </View>
        </>
      ) : (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color={color.primary500} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default TermCondition;
