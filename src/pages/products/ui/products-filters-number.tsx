import { useDebouncedValue } from "@/shared/lib/hooks";
import { Slider } from "@/shared/ui";
import { useEffect, useState } from "react";

interface ProductsFiltersNumberProps {
  minValue: number;
  maxValue: number;
  min: number;
  max: number;
  onChange: (key: string, value: number) => void;
  minKey: string;
  maxKey: string;
  step?: number;
  minStepsBetweenThumbs?: number;
}

export const ProductsFiltersNumber = ({
  minValue: initialMinValue,
  maxValue: initialMaxValue,
  min,
  max,
  onChange,
  maxKey,
  minKey,
  minStepsBetweenThumbs = 1,
  step = 1,
}: ProductsFiltersNumberProps) => {
  const [minValue, setMinValue] = useState<number | undefined>(initialMinValue);
  const [maxValue, setMaxValue] = useState<number | undefined>(initialMaxValue);
  const [debouncedMinValue] = useDebouncedValue(minValue, 1000);
  const [debouncedMaxValue] = useDebouncedValue(maxValue, 1000);

  useEffect(() => {
    if (!debouncedMaxValue || debouncedMaxValue > max) {
      setMaxValue(max);
      onChange(maxKey, max);
      return;
    }
    if (debouncedMinValue === undefined) {
      setMinValue(min);
      onChange(minKey, min);
      return;
    }

    if (debouncedMaxValue < debouncedMinValue)
      return setMaxValue(debouncedMinValue);

    onChange(maxKey, Math.min(debouncedMaxValue, max));
  }, [debouncedMaxValue, debouncedMinValue]);

  useEffect(() => {
    if (debouncedMinValue === undefined) {
      setMinValue(min);
      onChange(minKey, min);
      return;
    }

    onChange(minKey, Math.max(min, debouncedMinValue));
  }, [debouncedMinValue]);

  return (
    <>
      <div className="flex items-center justify-center gap-4 md:gap-6 mb-6">
        <input
          value={minValue}
          onChange={(e) => {
            if (!e.target.value) return setMinValue(undefined);

            if (
              +e.target.value > (maxValue || max) ||
              !e.target.value.match(/^\d+$/)
            )
              return;

            setMinValue(+e.target.value);
          }}
          inputMode="numeric"
          pattern="[0-9]*"
          type="text"
          className="p-2 text-center rounded-lg border border-gray-600 font-light placeholder:text-gray-400 text-xl w-20"
          placeholder="min."
        />
        <input
          value={maxValue}
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={(e) => {
            if (!e.target.value) return setMaxValue(undefined);

            if (!e.target.value.match(/^\d+$/)) return;

            setMaxValue(+e.target.value);
          }}
          type="text"
          className="p-2 text-center rounded-lg border border-gray-600 font-light placeholder:text-gray-400 text-xl w-20"
          placeholder="max."
        />
      </div>
      <Slider
        onValueChange={(values) => {
          const [min, max] = values;
          setMinValue(min);
          setMaxValue(max);
        }}
        value={[minValue ?? min, maxValue ?? max]}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        step={step}
        defaultValue={[initialMinValue, initialMaxValue]}
        min={min}
        max={max}
        secondThumb
      />
    </>
  );
};
