import React from 'react';
import { cn } from '../lib/utils';
import { Text } from './ui/text';

type TimeDisplayProps = {
  seconds: number;
  colorClassName: string;
};

const TimeDisplay = ({ seconds, colorClassName }: TimeDisplayProps) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsDisplay = (seconds % 3600) % 60;

  return (
    <Text className={cn('font-mono text-2xl font-bold sm:text-4xl', colorClassName)}>
      {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:
      {secondsDisplay.toString().padStart(2, '0')}
    </Text>
  );
};

export default TimeDisplay;
