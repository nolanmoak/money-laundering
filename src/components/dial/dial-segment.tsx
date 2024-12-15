import React from 'react';
import Svg, { Circle, Text } from 'react-native-svg';
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
      <Svg
        className='absolute -rotate-90'
        height='100%'
        width='100%'
        rotation={-90}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      >
        {peakData.ON.map((onTimes, idx) => {
          const startTime = onTimes[0];
          const endTime = onTimes[1];

          return (
            <DialSegment
              key={idx}
              label='$$$'
              labelColor='white'
              startTime={startTime}
              endTime={endTime}
              circumference={circumference}
              radius={radius}
              segmentColor='#d91212'
            />
          );
        })}
        {peakData.MID.map((midTimes, idx) => {
          const startTime = midTimes[0];
          const endTime = midTimes[1];

          return (
            <DialSegment
              key={idx}
              label='$$'
              labelColor='white'
              startTime={startTime}
              endTime={endTime}
              circumference={circumference}
              radius={radius}
              segmentColor='#fad365'
            />
          );
        })}
        {peakData.OFF.map((offTimes, idx) => {
          const startTime = offTimes[0];
          const endTime = offTimes[1];

          return (
            <DialSegment
              key={idx}
              label='$'
              labelColor='white'
              startTime={startTime}
              endTime={endTime}
              circumference={circumference}
              radius={radius}
              segmentColor='#13e539'
            />
          );
        })}
      </Svg>
    </>
  );
};

type DialSegmentProps = {
  label: string;
  labelColor: string;
  radius: number;
  circumference: number;
  startTime: number;
  endTime: number;
  segmentColor: string;
};

const DialSegment = ({
  label,
  labelColor,
  radius,
  circumference,
  startTime,
  endTime,
  segmentColor,
}: DialSegmentProps) => {
  const fontSize = radius / 5;

  if (endTime > startTime) {
    // Normal case
    const sectionTimePercentage = (endTime - startTime) / 24;
    const startTimePercentage = startTime / 24;
    const sectionWidth = circumference * sectionTimePercentage;
    const startTimeOffset = -circumference * startTimePercentage;

    return (
      <>
        <Circle
          r={radius / 2}
          cx={radius}
          cy={radius}
          strokeDashoffset={startTimeOffset}
          strokeWidth={radius}
          strokeDasharray={`${sectionWidth} ${circumference}`}
          fill='transparent'
          stroke={segmentColor}
        />
        <DialSegmentLabel
          label={label}
          labelColor={labelColor}
          fontSize={fontSize}
          startTime={startTime}
          endTime={endTime}
          cx={radius}
          cy={-radius}
          r={radius * 0.75}
        />
      </>
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
          stroke={segmentColor}
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
          stroke={segmentColor}
        />
        <DialSegmentLabel
          label={label}
          labelColor={labelColor}
          fontSize={fontSize}
          startTime={startTime}
          endTime={endTime}
          cx={radius}
          cy={-radius}
          r={radius * 0.75}
        />
      </>
    );
  }
};

type DialSegmentLabelProps = {
  label: string;
  labelColor: string;
  fontSize: number;
  startTime: number;
  endTime: number;
  cx: number;
  cy: number;
  r: number;
};

const DialSegmentLabel = ({ label, labelColor, fontSize, startTime, endTime, cx, cy, r }: DialSegmentLabelProps) => {
  let centerTime;

  if (endTime > startTime) {
    // Normal case: range does not cross midnight
    centerTime = (startTime + endTime) / 2;
  } else {
    // Edge case: range crosses midnight
    const totalTimeSpan = 24 - startTime + endTime; // Total span across midnight
    const midpointTime = totalTimeSpan / 2;

    if (midpointTime <= 24 - startTime) {
      // Midpoint is in the first segment (startTime to midnight)
      centerTime = startTime + midpointTime;
    } else {
      // Midpoint is in the second segment (midnight to endTime)
      centerTime = midpointTime - (24 - startTime);
    }
  }

  // Convert centerTime to an angle in radians
  const angle = 2 * Math.PI * (centerTime / 24) - Math.PI / 2;

  // Calculate Cartesian coordinates
  const x = cx + r * Math.cos(angle);
  const y = cy + r * Math.sin(angle) + fontSize / 4;

  return (
    <Text
      x={x}
      y={y}
      textAnchor='middle'
      fontSize={fontSize}
      rotation={90}
      fill={labelColor}
      stroke='black'
      strokeWidth={fontSize / 30}
    >
      {label}
    </Text>
  );
};

export default DialSegments;
