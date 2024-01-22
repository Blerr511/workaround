"use client";
import { useVideoTimeline } from "./controller/use-video-timeline";

const Timeline = () => {
  const [state, setState] = useVideoTimeline();

  return <div>{JSON.stringify(state)}</div>;
};

export default Timeline;
