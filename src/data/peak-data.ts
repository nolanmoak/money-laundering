import { getNextDay } from '../lib/utils';

export type PeakDataRange = [number, number];
export type PeakDataList = PeakDataRange[];
export type PeakDataType = 'OFF' | 'ON' | 'MID';
export type PeakDataEntry = Record<PeakDataType, PeakDataList>;

export type PeakData = Record<number, PeakDataEntry>;

const PEAK_DATA_WINTER = {
  // Weekday
  1: {
    OFF: [[19, 7]],
    MID: [[11, 17]],
    ON: [
      [7, 11],
      [17, 19],
    ],
  },
  2: {
    OFF: [[19, 7]],
    MID: [[11, 17]],
    ON: [
      [7, 11],
      [17, 19],
    ],
  },
  3: {
    OFF: [[19, 7]],
    MID: [[11, 17]],
    ON: [
      [7, 11],
      [17, 19],
    ],
  },
  4: {
    OFF: [[19, 7]],
    MID: [[11, 17]],
    ON: [
      [7, 11],
      [17, 19],
    ],
  },
  5: {
    OFF: [[19, 7]],
    MID: [[11, 17]],
    ON: [
      [7, 11],
      [17, 19],
    ],
  },
  // Weekend
  0: {
    OFF: [[0, 24]],
    MID: [],
    ON: [],
  },
  6: {
    OFF: [[0, 24]],
    MID: [],
    ON: [],
  },
} satisfies PeakData;

const PEAK_DATA_SUMMER = {
  // Weekday
  1: {
    OFF: [[19, 7]],
    MID: [
      [7, 11],
      [17, 19],
    ],
    ON: [[11, 17]],
  },
  2: {
    OFF: [[19, 7]],
    MID: [
      [7, 11],
      [17, 19],
    ],
    ON: [[11, 17]],
  },
  3: {
    OFF: [[19, 7]],
    MID: [
      [7, 11],
      [17, 19],
    ],
    ON: [[11, 17]],
  },
  4: {
    OFF: [[19, 7]],
    MID: [
      [7, 11],
      [17, 19],
    ],
    ON: [[11, 17]],
  },
  5: {
    OFF: [[19, 7]],
    MID: [
      [7, 11],
      [17, 19],
    ],
    ON: [[11, 17]],
  },
  // Weekend
  0: {
    OFF: [[0, 24]],
    MID: [],
    ON: [],
  },
  6: {
    OFF: [[0, 24]],
    MID: [],
    ON: [],
  },
} satisfies PeakData;

const winterMonths = [10, 11, 0, 1, 2, 3];
// const summerMonths = [4, 5, 6, 7, 8, 9];

export type PeakSeason = 'winter' | 'summer';

export function getPeakDataForDay(day: number, season: PeakSeason) {
  let data: PeakData;
  if (season === 'winter') {
    data = PEAK_DATA_WINTER;
  } else {
    data = PEAK_DATA_SUMMER;
  }
  return data[day];
}

export function getCurrentPeakData() {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDay();
  const season: PeakSeason = winterMonths.includes(month) ? 'winter' : 'summer';
  return getPeakDataForDay(day, season);
}

export function getNextDayPeakData() {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDay();
  const nextDay = getNextDay(day);
  const season: PeakSeason = winterMonths.includes(month) ? 'winter' : 'summer';
  return getPeakDataForDay(nextDay, season);
}
