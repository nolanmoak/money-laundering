import peakData from '#/src/data/peak-data';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { cn } from '~/lib/utils';
import DialHand from './dial-hand';
import DialSegment from './dial-segment';
import DialTime from './dial-time';

type DialProps = {
  radius: number;
  numberPadding: number;
};

const weekendDays = [0, 6];

const Dial = ({ radius, numberPadding }: DialProps) => {
  const styles = createStyles(radius);

  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const isWeekend = weekendDays.includes(currentDay);

  const currentPeakData = peakData[currentDay];

  const currentOffTime = currentPeakData ? currentPeakData.OFF : null;
  const currentOnTime = currentPeakData ? currentPeakData.ON : null;

  return (
    <>
      <View
        style={styles.dial}
        className={cn('border-foreground relative rounded-full border-2', isWeekend && 'bg-green-500')}
      >
        {!isWeekend && currentOffTime && currentOnTime && (
          <>
            <DialSegment startTime={currentOffTime} endTime={currentOnTime} backgroundColorClassName='bg-green-500' />
            <DialSegment startTime={currentOnTime} endTime={currentOffTime} backgroundColorClassName='bg-red-500' />
          </>
        )}
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
