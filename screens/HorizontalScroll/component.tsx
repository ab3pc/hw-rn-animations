import React, { useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
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

const HorizontalScroll = () => {
  const [stopScroll, setStopScroll] = useState<boolean>(true);
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  
  });


  const pressedHeart = useSharedValue(0);
  const pressedBroken = useSharedValue(0);

  const eventHandlerHeart = () => {
    pressedHeart.value = withTiming(1) ;
    setTimeout(() => {
      pressedHeart.value = withTiming(0);
    },500)
  }

  const eventHandlerBrokenHeart = () => {
    pressedBroken.value = withTiming(1) ;
    setTimeout(() => {
      pressedBroken.value = withTiming(0);
    },500)
  }



  const animatedPropsHeart = useAnimatedProps(() => {
    const fillValue = interpolateColor(pressedHeart.value, [0, 1], ["red", "transparent"]);  
    return {
        fill: fillValue
    }
  });
  const animatedPropsBroken = useAnimatedProps(() => {
    const fillValue = interpolateColor(pressedBroken.value, [0, 1], ["transparent", "black" ]);  
    return {
        fill: fillValue
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
          <Heart fill='red' animatedProps={animatedPropsHeart}/>
        </Pressable>
       
    
       
       
         
  
      
        <Bell />
      </View>
    </Animated.View>
  );
};

export { HorizontalScroll };
