// ReportIssue Screen
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Pressable,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import {MMKV} from 'react-native-mmkv';
import _const from '../../constant/const';

// API
import graphQLApi from '../../service/graphQLApi';

// Component
import ErrorSuccessModal from '../../components/errorSuccessModal';
import PrimaryButton from '../../components/primarybutton';

// Constant
import color from '../../constant/color';

// Images
import Images from '../../assets/index';

// Query
import {INSERT_REPORT_ISSUE} from '../../query/profile';

// Style
import styles from './styles';

const TextAreaComponent = props => {
  const {value, setInputValue} = props;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.textAreaContainer}>
        <TextInput
          multiline={true}
          style={[styles.textInput]}
          textAlignVertical="top"
          value={value}
          onChangeText={text => setInputValue(text)}
          maxLength={250}
          placeholder="Help us resolve issues you face."
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const ReportIssue = ({navigation}) => {
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const storage = new MMKV();
  const userInfo = JSON.parse(storage.getString(_const.userInfo));

  const handleClickSumbit = () => {
    setIsLoading(true);

    if (inputValue) {
      insertReportIssue();
    } else {
      setIsLoading(false);
      navigation.goBack();
    }
  };

  const insertReportIssue = () => {
    let variables = {
      user_id: userInfo.id,
      comment: inputValue || null,
    };

    graphQLApi(INSERT_REPORT_ISSUE, variables, navigation)
      .then(res => {
        const response = res?.data?.data?.sendFeedback?.emailResult ?? null;

        const checkResponse =
          Boolean(response) && Object.keys(response).length > 0
            ? Boolean(response?.status && !response?.code)
            : false;

        setIsLoading(false);

        if (checkResponse) {
          setIsSuccess(true);
        } else {
          setIsError(true);
        }
      })
      .catch(err => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  const resetFields = () => {
    setIsInputFocus(false);
    setInputValue(null);
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS == _const.ios ? 'padding' : null}
        style={styles.wrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainerStyle}
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.headerstyle}>
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
            <Text style={styles.title}>Report an issue</Text>
            <Text style={styles.subtitle}>
              Just wanted to check-in on how has it been going for you?
            </Text>
            <View style={styles.commentView}>
              <Text style={styles.commentText}>Comment</Text>
              <TextAreaComponent
                isInputFocus={isInputFocus}
                setIsInputFocus={setIsInputFocus}
                value={inputValue}
                setInputValue={setInputValue}
              />
            </View>
            <ErrorSuccessModal
              buttonLabel={'Go to Dashboard'}
              errorSuccessMessage={'Your issue has been successfully recorded.'}
              isVisible={isSuccess}
              onBackPress={() => {
                resetFields();
              }}
              onButtonPress={() => navigation.navigate('Dashboard')}
              onClose={() => {
                resetFields();
              }}
              type={'success'}
            />
            <ErrorSuccessModal
              buttonLabel={'Try Again'}
              errorSuccessMessage={
                'Oops something went wrong!\nPlease try again later'
              }
              isVisible={isError}
              onBackPress={() => setIsError(false)}
              onButtonPress={() => setIsError(false)}
              onClose={() => setIsError(false)}
              type={'error'}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.bottomButtonContainer}>
        <PrimaryButton
          label={'Submit'}
          onPress={() => handleClickSumbit()}
          disabled={!inputValue}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default ReportIssue;
