import { useEffect, useRef, useState } from 'react';
import { getCurrentPeakData, PeakDataList, PeakDataRange } from '../data/peak-data';

export type CurrentStatus = 'on' | 'mid' | 'off';

export type UseCurrentStatus = {
  currentStatus: CurrentStatus;
  secondsUntilNextPeak: number;
};

export default function useCurrentStatus(): UseCurrentStatus {
  const peakData = getCurrentPeakData();
  const [currentStatus, setCurrentStatus] = useState<CurrentStatus>('off');
  let interval = useRef<NodeJS.Timeout | null>(null);
  const [secondsUntilNextPeak, setSecondsUntilNextPeak] = useState(0);

  if (peakData.ON.length === 1 && peakData.ON[1][1] - peakData.ON[1][0] === 24) {
  }

  useEffect(() => {
    interval.current = setInterval(() => {
      const currentHour = new Date().getHours();
      let nextHour: number | null = getNextPeakHourInPeakDataList(currentHour, peakData.ON);
      if (nextHour !== null) {
        setSecondsUntilNextPeak(getSecondsUntilHour(nextHour));
        setCurrentStatus('on');
        return;
      }
      nextHour = getNextPeakHourInPeakDataList(currentHour, peakData.MID);
      if (nextHour !== null) {
        setSecondsUntilNextPeak(getSecondsUntilHour(nextHour));
        setCurrentStatus('mid');
      }
      nextHour = getNextPeakHourInPeakDataList(currentHour, peakData.OFF);
      if (nextHour !== null) {
        setSecondsUntilNextPeak(getSecondsUntilHour(nextHour));
        setCurrentStatus('off');
      }
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
  };
}

function getSecondsUntilHour(hour: number): number {
  const date = new Date();
  let currentHour = date.getHours();
  const hoursLeft = Math.abs(hour - currentHour) - 1;
  const minutesLeft = 60 - date.getMinutes() - 1;
  const secondsLeft = 60 - date.getSeconds();
  return hoursLeft * 60 * 60 + minutesLeft * 60 + secondsLeft;
}

function getNextPeakHourInPeakDataList(currentHour: number, peakDataList: PeakDataList): number | null {
  for (let times of peakDataList) {
    const nextHour = getNextPeakHourInRangeIfExists(currentHour, times);
    if (nextHour !== null) {
      return nextHour;
    }
  }
  return null;
}

function getNextPeakHourInRangeIfExists(currentHour: number, range: PeakDataRange): number | null {
  if (range[0] < range[1]) {
    if (currentHour >= range[0] && currentHour < range[1]) {
      return range[1];
    }
  } else if (range[0] === range[1]) {
    if (currentHour === range[0]) {
      return range[0];
    }
  } else {
    if (currentHour >= range[0] || currentHour < range[1]) {
      return range[1];
    }
  }
  return null;
}
