"use client";
import { Box } from "@chakra-ui/react";
import { FragmentData, TimelineType } from "./const";
import { Draggable } from "react-beautiful-dnd";
import React, { useCallback } from "react";
import { Rect, Text } from "react-konva";
import { getWidth } from "./utils";
import { KonvaEventObject } from "konva/lib/Node";

export interface FragmentProps extends FragmentData {
  totalDuration: number;
  type: TimelineType;
  onDrag: OnFragmentDrag;
}

export type OnFragmentDrag = (
  pos: Pick<FragmentData, "id" | "start"> & { type: TimelineType }
) => void;

const fragmentColors: Record<TimelineType, string> = {
  [TimelineType.video]: "blu",
  [TimelineType.audio]: "teal",
  [TimelineType.text]: "purple",
} as const;

export const Fragment = ({
  duration,
  totalDuration,
  thumbnail,
  start,
  id,
  onDrag,
  type,
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
        height={30}
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
        y={30}
        fontSize={15}
      />
    </React.Fragment>
  );
};
