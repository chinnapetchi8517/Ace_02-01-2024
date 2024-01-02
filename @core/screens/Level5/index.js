import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';

// Const
import color from '../../constant/color';

// Images
import Images from '../../assets';

// Style
import styles from './styles';

// Template
import Template from '../../Templates/template';

const Level5 = props => {
  const {
    avoidKeyboard = true,
    animationOut = 'fadeOut',
    isBookmarked,
    navigation,
    isVisible,
    onClose,
    id,
    template_id,
    tableName,
    title,
    filter,
  } = props;

  const [filterValue, setFilterValue] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setFilterValue(filter);
    setIsModalOpen(isVisible);
  }, []);

  return (
    <Modal
      style={styles.modalstyle}
      isVisible={isModalOpen}
      avoidKeyboard={avoidKeyboard}
      animationInTiming={30}
      animationOutTiming={1}
      animationOut={animationOut}>
      <View style={styles.modalContainer}>
        <Pressable style={styles.modalCloseIconContainer} onPress={onClose}>
          <Images.Cancel width={10} height={10} fill={color.black100} />
        </Pressable>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Images.Bookmark
            width={24}
            height={24}
            fill={isBookmarked ? color.neutral400 : color.neutral400}
            onPress={() => {}}
          />
        </View>
        <View style={{width: '100%'}}>
          <Template
            id={id}
            template_id={template_id}
            tableName={tableName}
            title={title}
            navigation={navigation}
            level={4}
            disableCardHeader={true}
            isModal={true}
            filter={filterValue}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Level5;
