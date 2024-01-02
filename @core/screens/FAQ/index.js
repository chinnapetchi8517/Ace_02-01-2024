// FAQ Screen
import {
  SafeAreaView,
  ScrollView,
  Text,
  Pressable,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Accordion from 'react-native-collapsible/Accordion';

// Style
import styles from './style';

// Constant
import color from '../../constant/color';

// Image
import Images from '../../assets/index';

// API
import graphQLApi from '../../service/graphQLApi';

// Query
import {GET_PROFILE_DETAILS} from '../../query/profile';

// Helper
import {faqContent} from '../../utils/helper';

const Faq = ({navigation, route}) => {
  const [activeSections, setActivesections] = useState([]);
  const [faqsList, setFaqsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let variables = {
      type: 'faqs',
    };
    graphQLApi(GET_PROFILE_DETAILS, variables, navigation)
      .then(res => {
        let listItem = res?.data?.data?.docs?.[0]?.content;
        setFaqsList(JSON.parse(listItem));
      })
      .catch(err => {
        setIsLoading(false);
      });
  }, []);

  const renderHeader = (section, index, isActive) => {
    return (
      <>
        <View
          style={
            isActive ? styles.accordianActive : styles.accordionheaderStyle
          }>
          <Text
            style={
              isActive
                ? [styles.headerText, styles.headerTextActive]
                : styles.headerText
            }>
            {section.title}
          </Text>
          <View style={styles.downiconstyle}>
            {isActive ? (
              <Images.UpArrow width={18} height={18} fill={color.black100} />
            ) : (
              <Images.DownArrow width={18} height={18} fill={color.black100} />
            )}
          </View>
        </View>
      </>
    );
  };

  const renderContent = (section, index, isActive) => {
    return (
      <View
        style={
          isActive
            ? styles.accordionContentActive
            : styles.accordionContentheaderStyle
        }>
        <Text
          style={
            isActive
              ? [styles.accordioncontentStyle, styles.accordioncontentActive]
              : styles?.accordioncontentStyle
          }>
          {section.info}
        </Text>
      </View>
    );
  };

  const updateSections = item => {
    setActivesections(item);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      {faqsList?.length > 0 ? (
        <>
          <View style={styles.faqheaderstyle}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}>
              <View style={styles.backButtonContainer}>
                <Images.LeftArrow
                  width={14}
                  height={14}
                  fill={color.black100}
                />
              </View>
            </Pressable>
          </View>

          <Text style={styles.title}>FAQs</Text>
          <Text style={styles.subtitle}>Need answers? Find them here...</Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContainerStyle}>
            <Accordion
              sections={faqsList}
              activeSections={activeSections}
              renderHeader={renderHeader}
              renderContent={renderContent}
              onChange={updateSections}
              underlayColor={'transparent'}
              expandMultiple={false}
            />
          </ScrollView>
        </>
      ) : (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color={color.primary500} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Faq;
