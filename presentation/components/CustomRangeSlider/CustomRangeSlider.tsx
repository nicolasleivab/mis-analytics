import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react';
import { Box, Flex } from '@mantine/core';
import { TNumericRange } from '../../../model/Excel/definitions';
import { TFilterStateItem } from '../../../model/hooks/Dashboard/useFilteredData';
import { useCallback, useState } from 'react';

type TCustomRangeSliderProps = {
  min: number;
  max: number;
  onChangeEnd: (value: TNumericRange, filter: TFilterStateItem) => void;
  filter: TFilterStateItem;
  step?: number;
};

export default function CustomRangeSlider({
  min,
  max,
  step,
  filter,
  onChangeEnd,
}: TCustomRangeSliderProps) {
  // Get the step value dynamically
  const stepValue = step ?? getStepValue(max);

  // Calculate a dynamic margin based on 5% of the range
  const margin = (max - min) * 0.05;

  // Round to the next significant step value
  const computedMin = roundToSignificance(min - margin, stepValue);
  const computedMax = roundToSignificance(max + margin, stepValue);

  const defaultValue: TNumericRange = [computedMin, computedMax];
  // Keep the displayed labels separate from the actual slider value
  const [visibleRange, setVisibleRange] = useState<TNumericRange>(defaultValue);

  // Create a stable throttled function so it doesn't get re-created on each render
  const throttledSetRange = useCallback(
    throttle((val) => {
      setVisibleRange(val as TNumericRange);
    }, 100), // update labels every 100ms (tweak to your liking)
    []
  );

  return (
    <div style={{ width: '300px' }}>
      <label>{filter.name}</label>
      <Flex align="center">
        <Box mr="10px">{visibleRange[0].toFixed(2)}</Box>
        <RangeSlider
          min={computedMin}
          max={computedMax}
          step={step ?? stepValue}
          defaultValue={defaultValue}
          onChange={(value) => {
            const formattedTo2Decimals = value.map((val) =>
              parseFloat(val.toFixed(2))
            );

            throttledSetRange(formattedTo2Decimals as TNumericRange);
          }}
          onChangeEnd={(val) => onChangeEnd(val as TNumericRange, filter)}
          style={{ width: '100%' }}
        >
          <RangeSliderTrack bg="tomato">
            <RangeSliderFilledTrack bg="#3399ff" />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} bg="#3399ff" />
          <RangeSliderThumb index={1} bg="#3399ff" />
        </RangeSlider>
        <Box ml="10px">{visibleRange[1].toFixed(2)}</Box>
      </Flex>
    </div>
  );
}

function getStepValue(max: number): number {
  if (max > 10) return 1;
  if (max > 1) return 0.1;
  return 0.01;
}

function throttle<F extends (...args: unknown[]) => void>(
  fn: F,
  delay: number
) {
  let lastCall = 0;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<F>) {
    const now = Date.now();
    // If enough time has passed, call fn immediately.
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    } else if (!timeout) {
      // Otherwise schedule a call once the delay has passed
      const remaining = delay - (now - lastCall);
      timeout = setTimeout(() => {
        lastCall = Date.now();
        timeout = null;
        fn(...args);
      }, remaining);
    }
  } as F;
}

// Helper function to round values to the nearest significant step
function roundToSignificance(value: number, step: number): number {
  return parseFloat((Math.round(value / step) * step).toFixed(2));
}
