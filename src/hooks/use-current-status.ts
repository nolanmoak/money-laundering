import { useEffect, useRef, useState } from 'react';
import { getCurrentPeakData, getNextDayPeakData, PeakDataList, PeakDataRange, PeakDataType } from '../data/peak-data';

export type UseCurrentStatus = {
  currentStatus: PeakDataType;
  nextStatus: PeakDataType;
  secondsUntilNextPeak: number;
};

export default function useCurrentStatus(): UseCurrentStatus {
  const peakData = getCurrentPeakData();
  const [currentStatus, setCurrentStatus] = useState<PeakDataType>('OFF');
  const [nextStatus, setNextStatus] = useState<PeakDataType>('OFF');
  let interval = useRef<NodeJS.Timeout | null>(null);
  const [secondsUntilNextPeak, setSecondsUntilNextPeak] = useState(0);

  useEffect(() => {
    function getPeakEndingHourAndStatus(hour: number): [number, PeakDataType] {
      let peakEndingHour = getPeakEndingHourInPeakDataList(hour, peakData.ON, 'ON');
      let status: PeakDataType = 'ON';

      if (peakEndingHour === null) {
        peakEndingHour = getPeakEndingHourInPeakDataList(hour, peakData.MID, 'MID');
        status = 'MID';
      }

      if (peakEndingHour === null) {
        peakEndingHour = getPeakEndingHourInPeakDataList(hour, peakData.OFF, 'OFF');
        status = 'OFF';
      }

      if (peakEndingHour === null) {
        throw new Error('Unable to find peak ending hour!');
      }

      return [peakEndingHour, status];
    }

    interval.current = setInterval(() => {
      const currentHour = new Date().getHours();
      const [currentPeakEndingHour, status] = getPeakEndingHourAndStatus(currentHour);
      setSecondsUntilNextPeak(getSecondsUntilHour(currentPeakEndingHour));
      setCurrentStatus(status);
      const [_, nextStatus] = getPeakEndingHourAndStatus(currentPeakEndingHour);
      setNextStatus(nextStatus);
    }, 500);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [peakData.MID, peakData.OFF, peakData.ON]);

  return {
    get currentStatus() {
      return currentStatus;
    },
    get secondsUntilNextPeak() {
      return secondsUntilNextPeak;
    },
    get nextStatus() {
      return nextStatus;
    },
  };
}

function getSecondsUntilHour(hour: number): number {
  const date = new Date();
  let currentHour = date.getHours();
  const hoursLeft = (currentHour > hour ? hour - (currentHour - 24) : hour - currentHour) - 1;
  const minutesLeft = 60 - date.getMinutes() - 1;
  const secondsLeft = 60 - date.getSeconds();
  return hoursLeft * 60 * 60 + minutesLeft * 60 + secondsLeft;
}

function getPeakEndingHourInPeakDataList(
  currentHour: number,
  peakDataList: PeakDataList,
  type: PeakDataType,
  isNextDay = false
): number | null {
  for (let times of peakDataList) {
    const nextHour = getPeakEndingHourInRangeIfExists(currentHour, times, type, isNextDay);
    if (nextHour !== null) {
      return nextHour;
    }
  }
  return null;
}

function getPeakEndingHourInRangeIfExists(
  currentHour: number,
  range: PeakDataRange,
  type: PeakDataType,
  isNextDay = false
): number | null {
  if (range[0] < range[1]) {
    if (currentHour >= range[0] && currentHour < range[1]) {
      return range[1];
    }
  } else if (range[0] === range[1]) {
    if (currentHour === range[0]) {
      return range[0];
    }
  } else {
    if (!isNextDay && currentHour >= range[0]) {
      return getPeakEndingHourInPeakDataList(currentHour, getNextDayPeakData()[type], type, true);
    } else {
      return range[1];
    }
  }
  return null;
}
