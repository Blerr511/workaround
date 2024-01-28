"use client";

import { KonvaEventObject } from "konva/lib/Node";
import React, { useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";

const initialFragments = [
  { id: 1, start: 10, duration: 100, name: "Clip 1" },
  { id: 2, start: 150, duration: 100, name: "Clip 2" },
  // Add more fragments as needed
];

export const VideoTimeline = () => {
  const [fragments, setFragments] = useState(initialFragments);

  const onDragEnd = (e: KonvaEventObject<DragEvent>, id: number) => {
    setFragments(
      fragments.map((frag) => {
        if (frag.id === id) {
          return { ...frag, start: e.target.x() };
        }
        return frag;
      })
    );
  };
  console.log(fragments)
  return (
    <Stage width={window.innerWidth} height={150}>
      <Layer>
        {fragments.map((fragment) => (
          <React.Fragment key={fragment.id}>
            <Rect
              x={fragment.start}
              y={20}
              width={fragment.duration}
              height={30}
              fill="lightblue"
              draggable
              onDragEnd={(e) => onDragEnd(e, fragment.id)}
              dragBoundFunc={(pos) => {
                return {
                  x: pos.x > 0 ? pos.x : 0, // Limit drag to the right side
                  y: 20, // Lock y position
                };
              }}
            />
            <Text
              text={fragment.name}
              x={fragment.start}
              y={60}
              fontSize={15}
            />
          </React.Fragment>
        ))}
      </Layer>
    </Stage>
  );
};
