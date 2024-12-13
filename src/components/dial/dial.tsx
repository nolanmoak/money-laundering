import React from 'react';
import { StyleSheet, View } from 'react-native';
import DialHand from './dial-hand';
import DialTime from './dial-time';

type DialProps = {
  radius: number;
  numberPadding: number;
};

const Dial = ({ radius, numberPadding }: DialProps) => {
  const styles = createStyles(radius);

  return (
    <>
      <View style={styles.dial} className='border-foreground relative rounded-full border-2'>
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
