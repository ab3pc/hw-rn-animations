import * as React from "react";
import Animated, {FadeInUp} from "react-native-reanimated";
import Svg, { Circle, G, Path } from "react-native-svg";


const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const Heart = ({
  animatedProps,
  fill,
}: {
  animatedProps?: any;
  fill?: string;
}) => {




 
  return (
   
  <Svg width={50} height={45} viewBox="0 0 342 330">
  
      <AnimatedG
        fill={fill || "none"}
        transform="rotate(225 150 121)"
        stroke={"#8b0000"}
        strokeWidth={5}
        animatedProps={animatedProps || {}}
      >
        <Path
          d="M0 200V0h200a100 100 90 0 1 0 200 100 100 90 0 1-200 0z"
          id="a"
        />
    
          
      </AnimatedG>
      <AnimatedCircle
        cx = "100%"
        cy = "100%"
        r = "100px"
        stroke-width = "5px"
        stroke-opacity = "1"
        stroke={fill || "none"}
        />
       
     </Svg>
  
 
  
  )
} ;
