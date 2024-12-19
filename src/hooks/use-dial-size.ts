import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export default function useDialSize(padding: number, minSize: number, maxSize: number): number {
  const dimensions = useWindowDimensions();
  const size = useMemo(() => {
    return Math.max(Math.min((Math.min(dimensions.width, dimensions.height) * 0.95) / 2 - padding, maxSize), minSize);
  }, [dimensions.height, dimensions.width, maxSize, minSize, padding]);
  return size;
}
