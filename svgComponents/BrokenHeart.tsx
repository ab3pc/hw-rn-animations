import * as React from "react";
import Animated, {FadeInUp} from "react-native-reanimated";
import Svg, { G, Path, LinearGradient, Stop, Defs  } from "react-native-svg";

const AnimatedG = Animated.createAnimatedComponent(G);

export const BrokenHeart = ({
  animatedProps,
  fill,
}: {
  animatedProps?: any;
  fill?: string;
}) => (
  <Svg  width={50} height={45} viewBox="0 0 50 50">
      
    <AnimatedG
      entering={FadeInUp}
      fill={fill || "none"}
      stroke={"black"}
      strokeWidth={1}
      animatedProps={animatedProps || {}}
    >
      <Path d="M7.402 32.471C4.049 29.433 1.562 25.45.504 20.968-.273 17.677.08 15.849.08 15.849.734 8.485 5.936 2.306 13.159 2.306c4.51 0 8.271 2.369 10.555 5.966l-.02-.013L16.26 19.16l14.487 1.932-11.392 10.443 8.447 5.279-3.626 10.879L7.402 32.471zM49.496 20.97c-1.058 4.482-3.545 8.464-6.898 11.502L26.6 46.745l3.597-10.792-7.553-4.721 12.608-11.557-15.512-2.067 5.362-7.864a.397.397 0 0 0 .132-.143c2.181-4.334 6.56-7.294 11.606-7.294 7.223 0 12.425 6.179 13.079 13.543.001 0 .354 1.829-.423 5.12z" />
      
    </AnimatedG>
  </Svg>
);
