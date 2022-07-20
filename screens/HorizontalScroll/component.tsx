import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
  Easing,
  withRepeat,
  withDelay,
  useAnimatedStyle,
  Extrapolate
} from "react-native-reanimated";

import { CAT_1, CAT_2, CAT_3 } from "../../assets";
import { Bell } from "../../svgComponents/Bell";
import { BrokenHeart } from "../../svgComponents/BrokenHeart";
import { Heart } from "../../svgComponents/Heart";
import { Page } from "./Page/component";
import { styles } from "./styles";

const items = [
  { id: 1, image: CAT_1, color: "violet" },
  { id: 2, image: CAT_2, color: "orange" },
  { id: 3, image: CAT_3, color: "grey" },
];


const Pulse = () => {
  const animation = useSharedValue(0);
  animation.value = withDelay(0,withRepeat(withTiming(1, {
        duration: 800,easing: Easing.linear, }), 1, false)
  );
  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      animation.value,
      [0, 1],
      [0.6, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity: opacity,
      transform: [{ scale: animation.value }],
    };
  });
  return <Animated.View style={[styles.circle, animatedStyles]} />;
};


const HorizontalScroll = () => {
  const [stopScroll, setStopScroll] = useState<boolean>(true);
  const translateX = useSharedValue(0);
  const [pulse, setPulse] = useState([1]);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  
  });


  const pressedHeart = useSharedValue(0);
  const pressedBroken = useSharedValue(0);

  const eventHandlerHeart = () => {
    setPulse((prev) => [...prev, 1]);
    pressedHeart.value = withTiming(1) ;
    setTimeout(() => {
      pressedHeart.value = withTiming(0);
    },350)
  }

  const eventHandlerBrokenHeart = () => {
    pressedBroken.value = withTiming(1) ;
    setTimeout(() => {
      pressedBroken.value = withTiming(0);
    },400)
  }

  const animatedPropsHeart = useAnimatedProps(() => {
    const fillValue = interpolateColor(pressedHeart.value, [0, 1], ["red", "transparent"]);  
   
    return {
        fill: fillValue,
    }   
  });

  const animatedPropsBroken = useAnimatedProps(() => {
    const fillValue = interpolateColor(pressedBroken.value, [0, 1], ["transparent", "black" ]);  
    return {
        fill: fillValue,
        transform: [{ scale: withTiming(pressedBroken.value ? 0.95 : 1) }],
    }
  });

  return (
    <Animated.View style={styles.container}>
      <Animated.ScrollView
        pagingEnabled
        onScroll={scrollHandler}
        style={styles.container}
        horizontal
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={stopScroll}
      >
        {items.map((item, index) => {
          return <Page index={index} item={item} key={item.id} translateXOuter={translateX} setStopScroll={setStopScroll}/>;
        })}
      </Animated.ScrollView>
      <View style={styles.reactionsContainer}>
    
      <Pressable onPress={eventHandlerBrokenHeart}>
          <BrokenHeart animatedProps={animatedPropsBroken}/>  
       </Pressable>
      
        <Pressable onPress={eventHandlerHeart }>
          <View style={{ alignItems: 'center', justifyContent: 'center'}}>
          <Heart fill='red' animatedProps={animatedPropsHeart}/>
          {pulse.map((item, index) => (
          <Pulse key={index}/>
        ))}
          </View>
         
        </Pressable>
        
         <Bell />
      </View>
    
    </Animated.View>
  );
};

export { HorizontalScroll };
