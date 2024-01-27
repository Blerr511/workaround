import React from "react";
import { Box } from "@chakra-ui/react";
import { DragDropContext } from "react-beautiful-dnd";
import { FragmentLine } from "./FragmentLine";
import { FragmentData, TimelineType } from "./const";

export interface TimelineProps {
  currentTime: number;
  totalDuration: number;
  onTimeChange: (val: number) => void;
  videoFragments: FragmentData[];
  audioFragments: FragmentData[];
  textFragments: FragmentData[];
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

  const onDragEnd = (result: any) => {
    console.log(result);
    // Logic to reorder fragments based on the drag result
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box bg="gray.900" p={4} borderRadius="md" overflow="hidden">
        {/* ... Time indicators ... */}

        {/* Draggable fragment lines for different types */}
        <FragmentLine
          type={TimelineType.video}
          fragments={videoFragments}
          totalDuration={totalDuration}
        />
        <FragmentLine
          type={TimelineType.audio}
          fragments={audioFragments}
          totalDuration={totalDuration}
        />
        <FragmentLine
          type={TimelineType.text}
          fragments={textFragments}
          totalDuration={totalDuration}
        />
        {/* Similarly for audio and text */}

        {/* Timeline Cursor */}
        {/* ... */}
      </Box>
    </DragDropContext>
  );
};
