"use client";

import { Stage } from "react-konva";

import { FragmentData, TimelineType } from "./const";
import { OnFragmentDrag } from "./Fragment";
import { FragmentLine } from "./FragmentLine";

export interface TimelineProps {
  currentTime: number;
  totalDuration: number;
  onTimeChange: (val: number) => void;
  videoFragments: FragmentData[];
  audioFragments: FragmentData[];
  textFragments: FragmentData[];
  onFragmentDrag: OnFragmentDrag;
}

export const Timeline = ({
  currentTime,
  onTimeChange,
  videoFragments,
  audioFragments,
  textFragments,
  totalDuration,
}: TimelineProps) => {
  // Similarly for audio and text fragments

  const onDragEnd: OnFragmentDrag = (result) => {
    console.log(result);
    // Logic to reorder fragments based on the drag result
  };

  return (
    <Stage
      width={window.innerWidth}
      height={150}
      style={{ backgroundColor: "gray" }}
    >
      <FragmentLine
        fragments={videoFragments}
        totalDuration={totalDuration}
        type={TimelineType.video}
        onDrag={onDragEnd}
        y={0}
        height={50}
      />
      <FragmentLine
        fragments={audioFragments}
        totalDuration={totalDuration}
        type={TimelineType.audio}
        onDrag={onDragEnd}
        y={50}
        height={30}
      />
      <FragmentLine
        fragments={textFragments}
        totalDuration={totalDuration}
        type={TimelineType.text}
        onDrag={onDragEnd}
        y={80}
        height={30}
      />
    </Stage>
  );
};
