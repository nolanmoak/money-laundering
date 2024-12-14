type PeakDataRange = [number, number];
type PeakDataList = PeakDataRange[];
export type PeakDataEntry = { OFF: PeakDataList; ON: PeakDataList; MID: PeakDataList };

type PeakData = Record<number, PeakDataEntry>;

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

export function getCurrentPeakData() {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDay();
  const season: 'summer' | 'winter' = winterMonths.includes(month) ? 'winter' : 'summer';
  let data: PeakData;
  if (season === 'winter') {
    data = PEAK_DATA_WINTER;
  } else {
    data = PEAK_DATA_SUMMER;
  }
  return day in data ? data[day] : null;
}
