"use client";
import { Box } from "@chakra-ui/react";
import { FragmentData, TimelineType } from "./const";
import { Draggable } from "react-beautiful-dnd";

export interface FragmentProps extends FragmentData {
  type: TimelineType;
  totalDuration: number;
  index: number;
}

const fragmentColors: Record<TimelineType, string> = {
  [TimelineType.video]: "blue.500",
  [TimelineType.audio]: "teal.500",
  [TimelineType.text]: "purple.500",
} as const;

export const Fragment = ({
  type,
  duration,
  totalDuration,
  thumbnail,
  start,
  id,
  index,
}: FragmentProps) => {
  return (
    <Draggable draggableId={`draggable-${type}-${id}`} index={index}>
      {(provided) => {
        console.log(provided);
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Box
              ref={provided.innerRef}
              width={`${Math.round((duration / totalDuration) * 100)}%`}
              height="20px"
              display={"inline-block"}
              // left={`${Math.round((start / totalDuration) * 100)}%`}
              bg={fragmentColors[type]}
              borderRadius="md"
              // left={`${thumbnail.start}%`} // Use the start position to place the fragment
              _before={
                thumbnail
                  ? {
                      content: `url(${thumbnail})`,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      width: "100%",
                      borderRadius: "md",
                      objectFit: "cover",
                    }
                  : {}
              }
            />
          </div>
        );
      }}
    </Draggable>
  );
};
