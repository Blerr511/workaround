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
  position: number;
}

export const FragmentLine = ({
  type,
  fragments,
  totalDuration,
  onDrag,
  position,
}: FragmentLineProps) => {
  return (
    <Layer y={position * 30}>
      {fragments.map((fragment) => (
        <Fragment
          id={fragment.id}
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
