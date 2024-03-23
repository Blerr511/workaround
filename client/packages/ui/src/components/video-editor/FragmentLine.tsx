"use client";

import React from "react";
import { Fragment, OnFragmentDrag } from "./Fragment";
import { FragmentData, TimelineType } from "./const";
import { Layer } from "react-konva";

export interface FragmentLineProps {
  type: TimelineType;
  totalDuration: number;
  fragments: FragmentData[];
  onDrag: OnFragmentDrag;
  y: number;
  height: number;
}

export const FragmentLine = ({
  type,
  fragments,
  totalDuration,
  onDrag,
  y,
  height,
}: FragmentLineProps) => {
  return (
    <Layer y={y} height={height}>
      {fragments.map((fragment) => (
        <Fragment
          id={fragment.id}
          height={height}
          duration={fragment.duration}
          start={fragment.start}
          totalDuration={totalDuration}
          key={fragment.id}
          thumbnail={fragment.thumbnail}
          onDrag={onDrag}
          type={type}
        />
      ))}
    </Layer>
  );
};
