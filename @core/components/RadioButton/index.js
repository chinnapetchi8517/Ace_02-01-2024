import React, {useState, useEffect} from 'react';
import {View, Pressable} from 'react-native';

// Style
import styles from './style';

const RadioButton = props => {
  const {selected, onPress, title} = props;
  const [selectedItem, setSelected] = useState(false);

  useEffect(() => {
    setSelected(selected);
  }, [selected]);

  const toggleRadio = () => {
    if (onPress) {
      onPress(title);
    }
  };

  return (
    <Pressable onPress={toggleRadio}>
      <View
        style={[styles.radioButton, selectedItem && styles.radioButtonPressed]}>
        {selectedItem ? <View style={styles.radioInner} /> : null}
      </View>
    </Pressable>
  );
};

export default RadioButton;
