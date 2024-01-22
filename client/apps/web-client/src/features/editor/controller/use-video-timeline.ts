"use client";
import { useCallback, useMemo, useState } from "react";
import { VideoTimeline } from "./video-timeline";

export const useVideoTimeline = () => {
  const [state, setState] = useState(new VideoTimeline(""));

  const memoState = {
    fragments: {
      video: state.fragments.video.map(({ start, end }) => ({ start, end })),
      audio1: state.fragments.audio1.map(({ start, end }) => ({
        start,
        end,
      })),
      audio2: state.fragments.audio2.map(({ start, end }) => ({
        start,
        end,
      })),
    },
    cursor: {
      position: state.cursor.position,
    },
  };

  const updateState = useCallback(
    (updater: (inst: VideoTimeline) => VideoTimeline | void) => {
      setState((inst) => {
        const newState = updater(inst);

        const copy = Object.assign(
          Object.create(VideoTimeline.prototype),
          newState || inst
        );

        return copy;
      });
    },
    []
  );

  return [memoState, updateState] as const;
};
