import React, { FC } from "react";
import { View, Image, Dimensions } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, { Extrapolate, interpolate, interpolateColor, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { styles } from "./styles";

type IProps = {
  item: ItemType 
  index: number
  translateXOuter: Animated.SharedValue<number>
};
type ItemType = {
  image: any
  color?: string
};

const { width } = Dimensions.get("window");
const squereSide = width / 1.25;

const Page: FC<IProps> = ({ item, index, translateXOuter }) => {
  const inputRange = [(index-1) * width, index * width, (index+1)*width]

  const animatedSquereStyle = useAnimatedStyle(() => {
    const scale = interpolate(translateXOuter.value, 
      inputRange,
      [0,1,0],
      Extrapolate.CLAMP
      );

     const borderRadius = interpolate(translateXOuter.value,
      inputRange,
      [0,squereSide / 2,0],
      Extrapolate.CLAMP
      )
    return {
      borderRadius,
      transform: [{scale}],
    }
  })

  const animatedImageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateXOuter.value,
      inputRange,
      [-1,1,-1],
      Extrapolate.CLAMP
      )
    return {
      opacity
    }
  })

  const backgroundStyles = useAnimatedStyle(() => {

    const backgroundColor = interpolateColor(
      translateXOuter.value,
      [0, width, width * 2],
      ["violet", "orange", "grey"]
    );
    
    return {backgroundColor};
  }, []);

  const currentTranslateX = useSharedValue(0);
  const currentTranslateY = useSharedValue(0);
  const context = useSharedValue({ x: 0, y: 0 });
  const SIZE = 80;
  const gesture = Gesture.Pan()
  .onStart(() => {
    context.value = { x: currentTranslateX.value, y: currentTranslateY.value };
  })
  .onUpdate((event) => {
    console.log(event.translationX);
    console.log(event.translationY);
    // currentTranslateX.value = event.translationX + context.value.x;
    // currentTranslateY.value = event.translationY + context.value.y;
  })
  .onEnd(() => {
    // if (currentTranslateX.value > width / 2) {
    //   currentTranslateX.value = width - SIZE;
    // } else {
    //   currentTranslateX.value = 0;
    // }
  });
  // .onActive: (event, context) => {
  //   currentTranslateX.value = event.translationX + context.translateX;
  //   currentTranslateY.value = event.translationY + context.translateY;

  //   console.log(event.translationX);
    
  // },
  // .onEnd: (e) => {}

  // const panGuestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
  //   onStart: (e, context) => {
  //     context.translateX = currentTranslateX.value;
  //     context.translateY = currentTranslateX.value;
  //   },
  //   onActive: (event, context) => {
  //     currentTranslateX.value = event.translationX + context.translateX;
  //     currentTranslateY.value = event.translationY + context.translateY;

  //     console.log(event.translationX);
      
  //   },
  //   onEnd: (e) => {}
  // })

  const moveImageStyle = useAnimatedStyle(() => {
     return {
      transform: [
        {
          translateX: currentTranslateX.value
        },
        {
          translateY: currentTranslateY.value
        },
      ]
     }
  })

  return (
   
    <Animated.View key={index}  style={[styles.page, backgroundStyles]}>
      <Animated.View style={[styles.square, animatedSquereStyle]}></Animated.View>
 
     
    
      <Animated.View style={[styles.imageContainer, animatedImageStyle]}>
      <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
      <Image source={item.image} style={[styles.image]} />
        </GestureDetector>
  
        </GestureHandlerRootView> 
       
      </Animated.View>
      
    </Animated.View>
    
  );
};

export { Page };
