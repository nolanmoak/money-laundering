import React from 'react';
import { View } from 'react-native';
import useCurrentStatus from '../hooks/use-current-status';
import { cn } from '../lib/utils';
import TimeDisplay from './time-display';
import { Text } from './ui/text';

const CurrentStatus = () => {
  const { currentStatus, secondsUntilNextPeak } = useCurrentStatus();

  const colorClassName =
    currentStatus === 'on' ? 'text-red-500' : currentStatus === 'mid' ? 'text-yellow-500' : 'text-green-500';

  return (
    <View>
      <Text className={cn('text-4xl', colorClassName)}>
        Current Status:{' '}
        <Text className={cn('text-4xl font-bold', colorClassName)}>{currentStatus.toUpperCase()} PEAK</Text>
      </Text>
      <Text className='text-4xl'>
        Time until next: <TimeDisplay seconds={secondsUntilNextPeak} colorClassName={colorClassName} />
      </Text>
    </View>
  );
};

export default CurrentStatus;
