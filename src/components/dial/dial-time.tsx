import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../ui/text';

type DialTimeProps = {
  time: number;
  radius: number;
};

const DialTime = ({ time, radius }: DialTimeProps) => {
  const styles = createStyles(time, radius);

  const renderTime = useMemo(() => {
    if (time < 12) {
      return `${time} AM`;
    }
    if (time === 12) {
      return `${time} PM`;
    }
    if (time === 24) {
      return `${time - 12} AM`;
    }
    return `${time - 12} PM`;
  }, [time]);

  return (
    <View className='absolute h-full w-full items-center justify-center'>
      <Text className='text-muted-foreground font-mono text-sm font-bold' style={styles.dial}>
        {renderTime}
      </Text>
    </View>
  );
};

const createStyles = (time: number, radius: number) => {
  const angleRad = (time / 24) * 2 * Math.PI - Math.PI / 2;
  const translateX = radius * Math.cos(angleRad);
  const translateY = radius * Math.sin(angleRad);
  return StyleSheet.create({
    dial: {
      transform: [{ translateX }, { translateY }],
    },
  });
};

export default DialTime;
