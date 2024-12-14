import { cn } from '#/src/lib/utils';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type DialSegmentProps = {
  startTime: number;
  endTime: number;
  backgroundColorClassName: string;
};

type DialSegmentBlockerProps = {
  time: number;
};

const DialSegmentBlocker = ({ time }: DialSegmentBlockerProps) => {
  const styles = createBlockerStyles(time);
  return (
    <View style={styles.blocker} className='bg-background border-border absolute -z-10 h-full w-1/2 border'></View>
  );
};

const DialSegment = ({ startTime, endTime, backgroundColorClassName }: DialSegmentProps) => {
  return (
    <>
      <View className={cn('origin- absolute -z-20 h-full w-full rounded-full', backgroundColorClassName)}></View>
      <DialSegmentBlocker time={startTime} />
    </>
  );
};

const createBlockerStyles = (time: number) => {
  const angleRad = (time / 24) * 2 * Math.PI;
  const angleDeg = angleRad * (180 / Math.PI);
  return StyleSheet.create({
    blocker: {
      transformOrigin: 'bottom',
      transform: [{ translateX: '50%' }, { rotateZ: `${angleDeg * 0}deg` }],
    },
  });
};

export default DialSegment;
