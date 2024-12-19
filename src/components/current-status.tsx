import React from 'react';
import { View } from 'react-native';
import { PeakDataType } from '../data/peak-data';
import useCurrentStatus from '../hooks/use-current-status';
import { cn } from '../lib/utils';
import TimeDisplay from './time-display';
import { Text } from './ui/text';

const CurrentStatus = () => {
  const { currentStatus, secondsUntilNextPeak, nextStatus } = useCurrentStatus();

  function getStatusClassName(status: PeakDataType): string {
    return status === 'ON' ? 'text-red-500' : status === 'MID' ? 'text-yellow-500' : 'text-green-500';
  }

  const colorClassName = getStatusClassName(currentStatus);
  const nextStatusColorClassName = getStatusClassName(nextStatus);

  return (
    <View>
      <Text className={cn('text-2xl sm:text-4xl', colorClassName)}>
        Current Status:{' '}
        <Text className={cn('text-2xl font-bold sm:text-4xl', colorClassName)}>{currentStatus} PEAK</Text>
      </Text>
      <Text className='text-2xl sm:text-4xl'>
        Time until <Text className={cn('text-2xl sm:text-4xl', nextStatusColorClassName)}>{nextStatus} PEAK</Text>:{' '}
        <TimeDisplay seconds={secondsUntilNextPeak} colorClassName={colorClassName} />
      </Text>
    </View>
  );
};

export default CurrentStatus;
