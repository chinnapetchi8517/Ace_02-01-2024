import React,{useEffect,useRef} from "react";
import { TouchableOpacity,View,Animated,StyleSheet,Text} from "react-native";
import color from "../../constant/color";
import Icons from "../../assets/index"
import _const from "../../constant/const";

const TabButton = ({ label, onPress, accessibilityState, icon }) => {
    const focused = accessibilityState.selected;
    const textViewRef = useRef(new Animated.Value(0)).current;
    const viewRef = useRef(new Animated.Value(0)).current;

  const startAnimation = (toval) => {
    Animated.timing(viewRef, {
      toValue: toval,
      duration: 1000,
      useNativeDriver: true, 
    }).start();
  };
  const textAnimation = (toval) => {
    Animated.timing(textViewRef, {
      toValue: toval,
      duration: 1000, 
      useNativeDriver: true, 
    }).start();
  };

    useEffect(() => {
      if (focused) { 
        startAnimation(1);
        textAnimation(1)
      } else {
        startAnimation(0);
        textAnimation(0)
      }
    }, [focused])
  
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={[styles.container, {flex: focused ? 1 : 0.45}]}>
        <View>
          <Animated.View
            ref={viewRef}
            style={[StyleSheet.absoluteFillObject, { backgroundColor: color.primary500, borderRadius: 22}]} />
          <View style={[styles.btn, { backgroundColor: focused ? color.primary500:color.secondary200 ,width:focused ? 140:60}]}>
            {icon}
            <Animated.View
              ref={textViewRef}>
              {focused && <Text style={
                styles.txt
              }>{label}</Text>}
            </Animated.View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  export default TabButton;

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 22,
      paddingHorizontal:18,
      paddingVertical:10
    },
    txt:{
      color: color.white,
      marginLeft:6,
      fontSize:14,
      fontFamily:_const.blissMedium
    }
  })
  