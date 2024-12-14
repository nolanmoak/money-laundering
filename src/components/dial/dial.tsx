import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getCurrentPeakData } from '~/data/peak-data';
import DialHand from './dial-hand';
import DialSegments from './dial-segment';
import DialTime from './dial-time';

type DialProps = {
  radius: number;
  numberPadding: number;
};

const Dial = ({ radius, numberPadding }: DialProps) => {
  const styles = createStyles(radius);
  const currentPeakData = getCurrentPeakData();

  return (
    <>
      <View style={styles.dial} className='relative rounded-full border-2 border-foreground bg-muted'>
        {currentPeakData && (
          <View className='relative left-[10%] top-[10%] h-[80%] w-[80%]'>
            <DialSegments peakData={currentPeakData} />
          </View>
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
