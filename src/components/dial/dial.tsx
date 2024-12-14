import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getCurrentPeakData } from '~/data/peak-data';
import { cn } from '~/lib/utils';
import DialHand from './dial-hand';
import DialSegments from './dial-segment';
import DialTime from './dial-time';

type DialProps = {
  radius: number;
  numberPadding: number;
};

const weekendDays = [-1];

const Dial = ({ radius, numberPadding }: DialProps) => {
  const styles = createStyles(radius);

  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const isWeekend = weekendDays.includes(currentDay);

  const currentPeakData = getCurrentPeakData();

  const offTimes = currentPeakData?.OFF ?? null;
  const midTimes = currentPeakData?.MID ?? null;
  const onTimes = currentPeakData?.ON ?? null;

  return (
    <>
      <View
        style={styles.dial}
        className={cn('relative rounded-full border-2 border-foreground', isWeekend && 'bg-green-500')}
      >
        {!isWeekend && currentPeakData && <DialSegments peakData={currentPeakData} />}
        <DialHand />
        {[...Array(25).keys()].slice(1).map((time) => (
          <DialTime key={time} time={time} radius={radius - numberPadding} />
        ))}
      </View>
    </>
  );
};

const createStyles = (radius: number) =>
  StyleSheet.create({
    dial: {
      width: radius * 2,
      height: radius * 2,
    },
  });

export default Dial;
