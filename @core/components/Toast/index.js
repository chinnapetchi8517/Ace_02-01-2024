import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, Animated} from 'react-native';
import styles from './styles';

const Toast = ({visible, message, onUndo, onDismiss}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      const timeoutId = setTimeout(() => {
        onDismiss();
      }, 3000);
      return () => clearTimeout(timeoutId);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, message]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
        },
      ]}>
      <View style={styles.snackbar}>
        <Text style={styles.message}>{message}</Text>
        <Pressable onPress={onUndo}>
          <Text style={styles.undoButton}>Undo</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default Toast;
