import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { getCurrentTimeDeg } from '~/lib/utils';

const DialHand = () => {
  const interval = useRef<NodeJS.Timeout | null>(null);
  const rotationDeg = useSharedValue(getCurrentTimeDeg());
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: `${rotationDeg.value}deg`,
      },
    ],
  }));

  const setRotation = useCallback(
    (deg: number) => {
      rotationDeg.value = withTiming(deg, {
        duration: 250,
        easing: Easing.inOut(Easing.cubic),
      });
    },
    [rotationDeg]
  );

  useEffect(() => {
    interval.current = setInterval(() => {
      setRotation(getCurrentTimeDeg());
    }, 5000);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [rotationDeg, setRotation]);

  return (
    <Animated.View
      style={[styles.dialHand, animatedStyles]}
      className='bg-foreground absolute left-1/2 top-0 z-10 h-1/2 w-[4px] rounded-sm border border-black'
    ></Animated.View>
  );
};

const styles = StyleSheet.create({
  dialHand: {
    transformOrigin: 'bottom',
  },
});

export default DialHand;
