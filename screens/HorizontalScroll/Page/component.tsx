import React, { FC } from "react";
import { View, Image, Dimensions } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, TapGestureHandler  } from "react-native-gesture-handler";
import Animated, { Extrapolate, interpolate, interpolateColor, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, runOnJS, SharedValue } from "react-native-reanimated";
import { styles } from "./styles";

type IProps = {
  item: ItemType 
  index: number
  translateXOuter: Animated.SharedValue<number>
  setStopScroll: (value:boolean) => void
};
type ItemType = {
  image: any
  color?: string
};

const { width } = Dimensions.get("window");
const squereSide = width / 1.25;

const Page: FC<IProps> = ({ item, index, translateXOuter, setStopScroll }) => {
  const inputRange = [(index-1) * width, index * width, (index+1)*width]
  const handleStopScroll = (value:boolean) => {
    setStopScroll(value);
  }
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

  const startingPosition = 0;
  const currentTranslateX = useSharedValue(startingPosition);
  const currentTranslateY = useSharedValue(startingPosition);
  const pressed: SharedValue<boolean> = useSharedValue(false);

  const eventHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {
      pressed.value = true;
      runOnJS(handleStopScroll)(false)
    },
    onActive: (event) => {
      currentTranslateX.value = startingPosition + event.translationX;
      currentTranslateY.value = startingPosition + event.translationY;
    },
    onEnd: () => {
      pressed.value = false;
      currentTranslateX.value = withSpring(startingPosition);
      currentTranslateY.value = withSpring(startingPosition);
      runOnJS(handleStopScroll)(true)
    },
  });

  const imageMove = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: currentTranslateX.value },
        { translateY: currentTranslateY.value },
        { scale: withSpring(pressed.value ? 1.5 : 1)}
      ],
    };
  });

  return (
   
    <Animated.View key={index}  style={[styles.page, backgroundStyles]}>
      <Animated.View style={[styles.square, animatedSquereStyle]}></Animated.View>
        <Animated.View style={[styles.imageContainer, animatedImageStyle]}>
     
             <PanGestureHandler onGestureEvent={eventHandler}>
                <Animated.Image source={item.image} style={[styles.image, imageMove]} />
             </PanGestureHandler>
          
       </Animated.View>
    </Animated.View>
  );
};

export { Page };
