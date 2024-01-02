import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, Pressable, ActivityIndicator} from 'react-native';
import {MMKV} from 'react-native-mmkv';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';

// Style
import styles from './styles';

// Component
import Primarybutton from '../../components/primarybutton';
import Search from '../../components/search';
import Images from '../../assets';
import color from '../../constant/color';

import _const from '../../constant/const';

import graphQLApi from '../../service/graphQLApi';
import {GET_KPI_LIST, UPDATE_USER_KPI} from '../../query/personalise';

const PersonalizeKpi = ({navigation, route}) => {
  const [selectedmetricsid, setSelectedMetricsId] = useState([]);
  const [searchtext, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [isAllKpiSelected, setAllKpiSelected] = useState([]);
  const [ismodalvisible, setIsmodalvisible] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [ispending, setPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const storage = new MMKV();
  const userInfo = JSON.parse(storage.getString(_const.userInfo));
  const kpiInfo = JSON.parse(storage.getString(_const.kpiCache));
  const navigatedFrom = route.params.navigatedFrom;

  useEffect(() => {
    let variables = {
      level: 1,
    };
    setLoading(true);
    graphQLApi(GET_KPI_LIST, variables, navigation)
      .then(res => {
        let personaliseDetails = res?.data?.data?.KPI;
        setLoading(false);
        setData(personaliseDetails);
        setSelectedMetricsId(kpiInfo);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  const handleClickSumbit = () => {
    if (selectedmetricsid.length > 0) {
      setPending(true);
      let variables = {
        user_id: userInfo.id,
        kpi: JSON.stringify(selectedmetricsid),
      };
      storage.set(_const.kpiCache, JSON.stringify(selectedmetricsid));
      graphQLApi(UPDATE_USER_KPI, variables, navigation)
        .then(res => {
          if (res) {
            setIsmodalvisible(true);
            setPending(false);
          }
        })
        .catch(err => {
          setIsLoading(false);
          setPending(false);
        });
    }
  };

  const handleSelectedMetrics = (id, allIndex) => {
    if (selectedmetricsid.includes(id)) {
      setSelectedMetricsId(prev => prev.filter(item => item != id));
      setAllKpiSelected(prev => prev.filter(item => item != allIndex));
    } else {
      setSelectedMetricsId(prev => [...prev, id]);
    }
  };

  const handleAccordion = id => {
    setData(prev =>
      prev.map(item => {
        return item.id != id ? item : {...item, show: !item.show};
      }),
    );
  };

  const onPressAll = parentidx => {
    if (!isAllKpiSelected.includes(parentidx)) {
      setAllKpiSelected(prev => [...prev, parentidx]);
      setSelectedMetricsId(prev => [
        ...new Set([
          ...prev,
          ...data[parentidx]?.children?.map(eachitem => eachitem.id),
        ]),
      ]);
    } else {
      setAllKpiSelected(prev => prev.filter(item => item != parentidx));
      setSelectedMetricsId(prev =>
        prev.filter(
          item =>
            !data[parentidx]?.children
              ?.map(eachChild => eachChild.id)
              .includes(item),
        ),
      );
    }
  };

  const renderItem = ({item, index}) => {
    const selectedMetrics = selectedmetricsid.filter(id =>
      item?.children.find(eachmetrics => eachmetrics.id == id),
    );
    const count = selectedMetrics.length;
    const isSelected = count > 0 ? true : false;
    const AllSelected = item.children
      .map(eachitem => eachitem.id)
      .every(eachid => selectedmetricsid.includes(eachid));

    return (
      <View style={styles.kpiContainer}>
        <View style={styles.accordionHeader}>
          <View style={styles.titleCheckbox}>
            <View
              style={
                isSelected
                  ? [styles.checkBox, styles.isSelectedCheckbox]
                  : styles.checkBox
              }>
              <Images.Check width={20} height={20} />
            </View>
            <Pressable onPress={() => handleAccordion(item.id)}>
              <Text style={styles.l1}>{item.ui_element_name}</Text>
            </Pressable>
            <View style={styles.countContainer}>
              <Text style={styles.countText}>{count}</Text>
            </View>
          </View>
          <Pressable
            style={{width: 18, height: 8}}
            onPress={() => handleAccordion(item.id)}>
            <Images.Accordion width={18} height={8} />
          </Pressable>
        </View>
        <View
          style={
            item.show
              ? styles.metricsContainer
              : [styles.metricsContainer, {display: 'none'}]
          }>
          {item.children.length > 0 && searchtext == '' ? (
            <Pressable
              style={
                AllSelected
                  ? [styles.metrics, styles.selectedmetrics]
                  : styles.metrics
              }
              key={'all'}
              onPress={() => onPressAll(index)}>
              <Text
                style={
                  AllSelected ? [styles.l2, styles.selectedl2] : styles.l2
                }>
                All
              </Text>
            </Pressable>
          ) : null}
          {item.children.map((data, idx) => (
            <Pressable
              style={
                selectedmetricsid.includes(data.id)
                  ? [styles.metrics, styles.selectedmetrics]
                  : styles.metrics
              }
              key={idx}
              onPress={() => handleSelectedMetrics(data.id, index)}>
              <Text
                style={
                  selectedmetricsid.includes(data.id)
                    ? [styles.l2, styles.selectedl2]
                    : styles.l2
                }>
                {data.ui_element_name}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  };

  const filteredData = data?.reduce((results, eachItem, index) => {
    const searchWords = searchtext.toLowerCase().split(' ');

    // Check if any word in the search term is present in the current item's name
    const matchesItem = searchWords.some(word =>
      eachItem.ui_element_name.toLowerCase().includes(word),
    );

    if (matchesItem) {
      results.push(eachItem);
    } else {
      const subresults = eachItem.children.filter(item =>
        searchWords.every(word =>
          item.ui_element_name.toLowerCase().includes(word),
        ),
      );

      if (subresults.length > 0) {
        results.push({...eachItem, children: subresults, show: true});
      }
    }
    return results;
  }, []);

  const handleChangeSearch = value => {
    if (value === '' || (value.trim() !== '' && value.trim().length !== 0)) {
      setSearchText(value);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      {navigatedFrom == 'Profile' ? (
        <Images.Back
          width={32}
          height={32}
          fill={color.neutral900}
          marginTop={19}
          marginBottom={28}
          onPress={() => navigation.goBack()}
        />
      ) : (
        <Pressable
          style={styles.skipButton}
          onPress={() => {
            navigation.replace(_const.bottomTab);
          }}>
          <Text styles={styles.skipButtonText}>Skip</Text>
          <Images.Navleft
            width={12}
            height={12}
            fill={color.neutral600}
            marginLeft={8}
          />
        </Pressable>
      )}
      {navigatedFrom == 'Profile' ? (
        <React.Fragment>
          <Text style={styles.title}>Personalize your</Text>
          <Text style={styles.title}>Dashboard</Text>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Text style={styles.welcomeUser}>Hello, {userInfo.displayName}</Text>
          <Text style={styles.title_skip}>Personalize your Dashboard</Text>
        </React.Fragment>
      )}
      <Search
        placeholder={'Search for KPIs and metrics'}
        value={searchtext}
        setValue={handleChangeSearch}
        containerStyles={{marginTop: 32, marginBottom: 40}}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        ListEmptyComponent={
          isloading ? (
            <ActivityIndicator size={'large'} color={color.primary500} />
          ) : (
            <View style={styles.noRecordContainer}>
              <Images.NoResults
                width={70}
                height={81}
                marginTop={61}
                alignSelf={'center'}
              />
              <Text style={styles.title_noRecord}>No Results Found</Text>
            </View>
          )
        }
        contentContainerStyle={styles.flatlistInner}
        style={styles.flatlistOuter}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.bottomButtonContainer}>
        <Primarybutton
          label={'Proceed'}
          onPress={() => handleClickSumbit()}
          disabled={!selectedmetricsid.length}
          isLoading={ispending}
        />
      </View>

      <Modal
        style={styles.modalstyle}
        onBackdropPress={() => {
          navigatedFrom == 'Profile'
            ? navigation.navigate('Dashboard')
            : navigation.replace(_const.bottomTab);
        }}
        onBackButtonPress={() => navigation.navigate()}
        useNativeDriverForBackdrop={true}
        isVisible={ismodalvisible}
        avoidKeyboard={true}
        animationInTiming={30}
        animationOutTiming={1}
        animationOut={'fadeOut'}>
        <View
          style={{
            height: 500,
            backgroundColor: color.white00,
            alignItems: 'center',
            paddingHorizontal: 16,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          }}>
          <Pressable
            style={{
              width: 30,
              height: 30,
              backgroundColor: color.neutral100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-end',
              marginTop: 24,
              right: 2,
            }}
            onPress={() => {
              navigatedFrom == 'Profile'
                ? navigation.navigate('Dashboard')
                : navigation.replace(_const.bottomTab);
            }}>
            <Images.Cancel width={14} height={14} fill={color.black100} />
          </Pressable>
          <Images.Success width={190} height={163} marginTop={21} />
          <Text
            style={{
              marginTop: 12,
              fontSize: 28,
              fontFamily: _const.blissRegular,
              fontWeight: '700',
              lineHeight: 36.4,
            }}>
            Success!
          </Text>
          <Text
            style={{
              marginTop: 12,
              fontSize: 18,
              fontFamily: _const.blissRegular,
              fontWeight: '400',
              lineHeight: 27,
              textAlign: 'center',
              marginBottom: 48,
            }}>
            Your personalized KPIs and metrics are updated successfully. Go to
            the Dashboard to view them in detail.
          </Text>
          <Primarybutton
            label={'Go to Dashboard'}
            onPress={() => {
              navigatedFrom == 'Profile'
                ? navigation.navigate('Dashboard')
                : navigation.replace(_const.bottomTab);
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PersonalizeKpi;
