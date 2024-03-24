"use client";

import { KonvaEventObject } from "konva/lib/Node";
import React, { useCallback } from "react";
import { Rect, Text } from "react-konva";

import { FragmentData, TimelineType } from "./const";
import { getWidth } from "./utils";

export interface FragmentProps extends FragmentData {
  totalDuration: number;
  type: TimelineType;
  onDrag: OnFragmentDrag;
  height: number;
}

export type OnFragmentDrag = (
  pos: Pick<FragmentData, "id" | "start"> & { type: TimelineType }
) => void;

const fragmentColors: Record<TimelineType, string> = {
  [TimelineType.video]: "#5756D5",
  [TimelineType.audio]: "#249150",
  [TimelineType.text]: "#35A9DC",
} as const;

export const Fragment = ({
  duration,
  totalDuration,
  thumbnail,
  start,
  id,
  onDrag,
  type,
  height,
}: FragmentProps) => {
  const onDragEnd = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      onDrag({ id, start: e.target.x(), type });
    },
    [onDrag, id, type]
  );

  return (
    <React.Fragment key={id}>
      <Rect
        x={getWidth(start, totalDuration)}
        y={0}
        width={getWidth(duration, totalDuration)}
        height={height}
        cornerRadius={5}
        fill={fragmentColors[type]}
        draggable
        onDragEnd={onDragEnd}
        dragBoundFunc={function (pos) {
          return {
            x: pos.x > 0 ? pos.x : 0, // Limit drag to the right side
            y: this.getParent()?.y() || 0,
          };
        }}
      />
      <Text
        text={id.toString()}
        x={getWidth(start, totalDuration)}
        y={height - 17}
        fontSize={15}
      />
    </React.Fragment>
  );
};
