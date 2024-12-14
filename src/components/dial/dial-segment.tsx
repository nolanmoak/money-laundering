import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { PeakDataEntry } from '~/data/peak-data';

type DialSegmentsProps = {
  peakData: PeakDataEntry;
};

const DialSegments = ({ peakData }: DialSegmentsProps) => {
  const viewBoxSize = 20;
  const radius = viewBoxSize / 2;
  const circumference = Math.PI * radius;
  return (
    <>
      <Svg className='absolute -rotate-90' height='100%' width='100%' viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
        {peakData.ON.map((onTimes, idx) => {
          const startTime = onTimes[0];
          const endTime = onTimes[1];

          return (
            <DialSegment
              key={idx}
              startTime={startTime}
              endTime={endTime}
              circumference={circumference}
              radius={radius}
              viewBoxSize={viewBoxSize}
              strokeColor='tomato'
            />
          );
        })}
        {peakData.MID.map((midTimes, idx) => {
          const startTime = midTimes[0];
          const endTime = midTimes[1];

          return (
            <DialSegment
              key={idx}
              startTime={startTime}
              endTime={endTime}
              circumference={circumference}
              radius={radius}
              viewBoxSize={viewBoxSize}
              strokeColor='lightgray'
            />
          );
        })}
        {peakData.OFF.map((offTimes, idx) => {
          const startTime = offTimes[0];
          const endTime = offTimes[1];

          return (
            <DialSegment
              key={idx}
              startTime={startTime}
              endTime={endTime}
              circumference={circumference}
              radius={radius}
              viewBoxSize={viewBoxSize}
              strokeColor='lightgreen'
            />
          );
        })}
      </Svg>
    </>
  );
};

type DialSegmentProps = {
  viewBoxSize: number;
  radius: number;
  circumference: number;
  startTime: number;
  endTime: number;
  strokeColor: string;
};

const DialSegment = ({ viewBoxSize, radius, circumference, startTime, endTime, strokeColor }: DialSegmentProps) => {
  if (endTime > startTime) {
    // Normal case
    const sectionTimePercentage = (endTime - startTime) / 24;
    const startTimePercentage = startTime / 24;
    const sectionWidth = circumference * sectionTimePercentage;
    const startTimeOffset = -circumference * startTimePercentage;
    const offset = startTimeOffset;

    console.log(sectionTimePercentage, startTimePercentage, sectionWidth, startTimeOffset);

    return (
      <Circle
        r={radius / 2}
        cx={radius}
        cy={radius}
        strokeDashoffset={offset}
        strokeWidth={radius}
        strokeDasharray={`${sectionWidth} ${circumference}`}
        fill='transparent'
        stroke={strokeColor}
      />
    );
  } else {
    // Edge case: Range crosses midnight. Render 2 sections
    const firstSectionTimePercentage = (24 - startTime) / 24;
    const secondSectionTimePercentage = endTime / 24;

    const firstSectionStartTimePercentage = startTime / 24;
    const secondSectionStartTimePercentage = 0;

    const firstSectionWidth = circumference * firstSectionTimePercentage;
    const secondSectionWidth = circumference * secondSectionTimePercentage;

    const firstSectionStartTimeOffset = -circumference * firstSectionStartTimePercentage;
    const secondSectionStartTimeOffset = -circumference * secondSectionStartTimePercentage;

    console.log(
      firstSectionTimePercentage,
      secondSectionTimePercentage,
      firstSectionStartTimePercentage,
      secondSectionStartTimePercentage,
      firstSectionWidth,
      secondSectionWidth,
      firstSectionStartTimeOffset,
      secondSectionStartTimeOffset
    );

    return (
      <>
        {/* First segment: from startTime to 24 */}
        <Circle
          r={radius / 2}
          cx={radius}
          cy={radius}
          strokeDashoffset={firstSectionStartTimeOffset}
          strokeWidth={radius}
          strokeDasharray={`${firstSectionWidth} ${circumference}`}
          fill='transparent'
          stroke={strokeColor}
        />
        {/* Second segment: from 0 to endTime */}
        <Circle
          r={radius / 2}
          cx={radius}
          cy={radius}
          strokeDashoffset={secondSectionStartTimeOffset}
          strokeWidth={radius}
          strokeDasharray={`${secondSectionWidth} ${circumference}`}
          fill='transparent'
          stroke={strokeColor}
        />
      </>
    );
  }
};

const createBlockerStyles = (time: number) => {
  const angleRad = (time / 24) * 2 * Math.PI + Math.PI;
  const angleDeg = angleRad * (180 / Math.PI);
  const rotateZ = `${Math.floor(angleDeg)}deg`;
  console.log(rotateZ);
  return StyleSheet.create({
    blocker: {
      transformOrigin: 'left',
      transform: [{ translateX: '100%' }, { rotateZ }],
    },
  });
};

export default DialSegments;
