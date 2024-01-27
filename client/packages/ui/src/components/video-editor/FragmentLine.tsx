"use client";

import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";
import { Fragment } from "./Fragment";
import { FragmentData, TimelineType } from "./const";

export interface FragmentLineProps {
  type: TimelineType;
  totalDuration: number;
  fragments: FragmentData[];
}

export const FragmentLine = ({
  type,
  fragments,
  totalDuration,
}: FragmentLineProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <Droppable droppableId={`droppable-${type}`} direction="horizontal">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Box
            ref={provided.innerRef}
            position="relative"
            height="40px"
            mb={2}
            display="flex"
            width="100%"
          >
            {fragments.map((fragment, index) => (
              <Fragment
                id={fragment.id}
                totalDuration={totalDuration}
                key={fragment.id}
                type={type}
                start={fragment.start}
                duration={fragment.duration}
                thumbnail={fragment.thumbnail}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Box>
        </div>
      )}
    </Droppable>
  );
};
