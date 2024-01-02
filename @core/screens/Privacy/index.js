// Privacy Screen

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
const Privacy = ({navigation, route}) => {
  const [privacydata, setPrivacydata] = useState('');
  const [lastupdated, setLastupdated] = useState('');

  useEffect(() => {
    let variables = {
      type: 'privacy-policy',
    };
    graphQLApi(GET_PROFILE_DETAILS, variables, navigation)
      .then(res => {
        let listItem = res?.data?.data?.docs?.[0]?.content;
        setLastupdated(res?.data?.data?.docs?.[0]?.lastUpdated);
        setPrivacydata(listItem);
      })
      .catch(err => {
        setIsLoading(false);
      });
  }, []);

  const Htmlcontent = React.memo(function Htmlcontent({html}) {
    const {width: contentWidth} = useWindowDimensions();

    return (
      <RenderHtml
        contentWidth={contentWidth}
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
      {privacydata !== '' ? (
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
            <Text style={styles.title}>Privacy</Text>
            <Text style={{...styles.subtitle, ...styles.space}}>
              {lastupdated == ''
                ? ''
                : `Last updated : ${moment(lastupdated).format(
                    'MMM DD, YYYY',
                  )}`}
            </Text>

            <ScrollView>
              <View>
                <Htmlcontent html={privacydata} />
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

export default Privacy;
