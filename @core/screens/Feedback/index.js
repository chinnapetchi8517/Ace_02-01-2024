// Feedback Screen
import React, {useCallback, useState} from 'react';
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
  ActivityIndicator,
  Platform,
} from 'react-native';
import {MMKV} from 'react-native-mmkv';
import _const from '../../constant/const';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';

// Style
import styles from './styles';

// Constant
import color from '../../constant/color';

// Images
import Images from '../../assets/index';

// Component
import ErrorSuccessModal from '../../components/errorSuccessModal';
import PrimaryButton from '../../components/primarybutton';
import Secondarybutton from '../../components/secondarybutton';

// API
import graphQLApi from '../../service/graphQLApi';

// Query
import {
  INSERT_USER_FEEDBACK,
  GET_FEEDBACK,
  UPDATE_FEEDBACK,
} from '../../query/profile';

const TextAreaComponent = props => {
  const {
    isInputFocus,
    setIsInputFocus,
    value,
    setInputValue,
    defaultRating,
    editable,
  } = props;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.textAreaContainer}>
        <TextInput
          editable={editable}
          multiline={true}
          style={[
            styles.textInput,
            isInputFocus && styles.textInputFocus,
            {
              borderWidth: 1,
              borderColor:
                !value && defaultRating != 0 && defaultRating < 3
                  ? color.red
                  : isInputFocus
                  ? color.primary500
                  : color.neutral300,
            },
          ]}
          textAlignVertical="top"
          value={value}
          onChangeText={text => setInputValue(text)}
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
          maxLength={250}
          placeholder="Take a moment and share your thoughts with us!"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const Feedback = ({navigation}) => {
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [inputValue, setInputValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFeedbackExist, setIsFeedbackExist] = useState(false);
  const [isFeedbackEdit, setIsFeedbackEdit] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(true);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(null);

  const storage = new MMKV();
  const userInfo = JSON.parse(storage.getString(_const.userInfo));

  useFocusEffect(
    useCallback(() => {
      setIsScreenLoading(true);

      fetchUserFeedback();
    }, []),
  );

  const fetchUserFeedback = () => {
    let variables = {
      user_id: userInfo.id,
    };

    graphQLApi(GET_FEEDBACK, variables)
      .then(res => {
        const response = res?.data?.data?.feedback ?? [];

        const checkResponse = Array.isArray(response) && response.length == 1;

        if (checkResponse) {
          const feedbackData = response[0];

          setIsFeedbackExist(true);
          setDefaultRating(feedbackData?.rating ?? 0);
          setInputValue(feedbackData?.review_and_suggestion ?? null);
          setLastUpdatedAt(feedbackData?.updated_at ?? null);
          setIsScreenLoading(false);
        } else {
          setIsFeedbackExist(false);
          setDefaultRating(0);
          setInputValue(null);
          setLastUpdatedAt(null);
          setIsScreenLoading(false);
          setIsFeedbackEdit(false);
        }
      })
      .catch(err => {
        setIsLoading(false);
        setIsScreenLoading(false);
      });
  };

  const handleClickSumbit = () => {
    setIsLoading(true);

    if (!isFeedbackEdit) {
      insertFeedback();
    } else if (isFeedbackEdit) {
      updateFeedback();
    } else {
      setIsLoading(false);
      navigation.goBack();
    }
  };

  const insertFeedback = () => {
    let variables = {
      user_id: userInfo.id,
      topic: 'Rate the experience',
      review: inputValue || null,
      rating: defaultRating,
    };

    graphQLApi(INSERT_USER_FEEDBACK, variables, navigation)
      .then(res => {
        const response = res?.data?.data?.insert_feedback?.returning ?? [];

        const checkResponse = Array.isArray(response) && response.length == 1;

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

  const updateFeedback = () => {
    let variables = {
      user_id: userInfo.id,
      review_and_suggestion: inputValue || null,
      rating: defaultRating,
      updated_at: moment().toISOString(),
    };

    graphQLApi(UPDATE_FEEDBACK, variables)
      .then(res => {
        const response = res?.data?.data?.update_feedback?.returning ?? [];

        const checkResponse = Array.isArray(response) && response.length == 1;

        setIsLoading(false);

        if (checkResponse) {
          setLastUpdatedAt(moment().toISOString());
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

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS == _const.ios ? 'padding' : null}
        style={styles.wrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainerStyle}
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.feedbackheaderstyle}>
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
            <Text style={styles.title}>Give us Feedback</Text>
            <Text style={styles.subtitle}>
              Just wanted to check-in on how has it been going for you?
            </Text>
            {isScreenLoading ? (
              <View style={styles.screeenLoaderContainer}>
                <ActivityIndicator size={'large'} color={color.primary500} />
              </View>
            ) : (
              <>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>Rate your experience</Text>
                  <View style={styles.starImageContainer}>
                    {maxRating.map((item, index) => {
                      return (
                        <Pressable
                          key={index}
                          disabled={isFeedbackExist}
                          onPress={() => setDefaultRating(item)}>
                          <View
                            style={
                              isFeedbackExist
                                ? styles.starContentWithoutBG
                                : item <= defaultRating
                                ? [
                                    styles.starContent,
                                    styles.selectedStarContent,
                                  ]
                                : styles.starContent
                            }>
                            <Images.Star
                              width={28}
                              height={28}
                              fill={
                                item <= defaultRating
                                  ? '#F59F0B'
                                  : isFeedbackExist
                                  ? 'transparent'
                                  : '#E5E7EB'
                              }
                            />
                          </View>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
                <View style={styles.feedbackContainer}>
                  <Text style={styles.ratingText}>Feedback</Text>
                  <TextAreaComponent
                    editable={!isFeedbackExist}
                    isInputFocus={isInputFocus}
                    setIsInputFocus={setIsInputFocus}
                    value={inputValue}
                    setInputValue={setInputValue}
                    defaultRating={defaultRating}
                  />
                  {isFeedbackExist && lastUpdatedAt ? (
                    <View style={styles.lastReatedContainer}>
                      <Images.Ellipse width={5} height={5} />
                      <Text style={styles.lastReatedText}>
                        Last Rated on{' '}
                        {moment(lastUpdatedAt).format('DD MMM YYYY')}
                      </Text>
                    </View>
                  ) : !inputValue && defaultRating != 0 && defaultRating < 3 ? (
                    <View style={styles.row}>
                      <Images.InfoEmpty
                        width={16}
                        height={16}
                        fill={color.red}
                        marginTop={4}
                      />
                      <Text style={styles.errortext}>
                        Please tell us why we couldn’t surpass your
                        expectations?
                      </Text>
                    </View>
                  ) : null}
                </View>
              </>
            )}
            <ErrorSuccessModal
              buttonLabel={'Go to Dashboard'}
              errorSuccessMessage={
                'Thanks for sharing your feedback. It has been recorded successfully'
              }
              isVisible={isSuccess}
              onBackPress={() => {
                setIsFeedbackExist(true);
                setIsFeedbackEdit(false);
                setIsSuccess(false);
              }}
              onButtonPress={() => navigation.navigate('Dashboard')}
              onClose={() => {
                setIsFeedbackExist(true);
                setIsFeedbackEdit(false);
                setIsSuccess(false);
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
      {!isScreenLoading && (
        <View style={styles.bottomButtonContainer}>
          {isFeedbackExist && !isFeedbackEdit ? (
            <Secondarybutton
              label={'Edit Review'}
              onPress={() => {
                setIsFeedbackExist(false);
                setIsFeedbackEdit(true);
              }}
              disabled={
                !defaultRating ||
                (!inputValue && defaultRating != 0 && defaultRating < 3)
              }
              isLoading={isLoading}
            />
          ) : (
            <PrimaryButton
              label={'Submit'}
              onPress={() => handleClickSumbit()}
              disabled={
                !defaultRating ||
                (!inputValue && defaultRating != 0 && defaultRating < 3)
              }
              isLoading={isLoading}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Feedback;
