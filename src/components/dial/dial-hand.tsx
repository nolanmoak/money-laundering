import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const DialHand = () => {
  const interval = useRef<NodeJS.Timeout | null>(null);
  const rotationDeg = useSharedValue(0);
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

  const currentTime = new Date().getHours();
  console.log(currentTime);

  useEffect(() => {
    function getCurrentTimeDeg() {
      const currentDate = new Date();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();
      const secondsFraction = seconds / 60;
      const minutesFraction = (minutes + secondsFraction) / 60;
      const hoursFraction = (hours + minutesFraction) / 24;
      const timeRadians = hoursFraction * 2 * Math.PI;
      console.log({
        currentDate,
        hours,
        minutes,
        seconds,
        secondsFraction,
        minutesFraction,
        hoursFraction,
        timeRadians,
        timeDegrees: timeRadians * (180 / Math.PI),
      });
      return timeRadians * (180 / Math.PI);
    }

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
      className='bg-foreground absolute left-1/2 top-0 h-1/2 w-[2px]'
    ></Animated.View>
  );
};

const styles = StyleSheet.create({
  dialHand: {
    transformOrigin: 'bottom',
  },
});

export default DialHand;
