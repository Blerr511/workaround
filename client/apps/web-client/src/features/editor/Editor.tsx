"use client";

import VideoView from "./VideoView";
import dynamic from "next/dynamic";

const Timeline = dynamic(
  () =>
    import("@wr/ui/src/components/video-editor").then(
      (module) => module.Timeline
    ),
  { ssr: false }
);

const Editor = () => {
  return (
    <div>
      <VideoView />
      <Timeline
        onFragmentDrag={() => {}}
        totalDuration={2000}
        audioFragments={[{ duration: 500, start: 100, id: 1 }]}
        currentTime={0}
        onTimeChange={() => {}}
        textFragments={[{ duration: 100, start: 0, id: 2 }]}
        videoFragments={[
          { duration: 300, start: 0, id: 3 },
          { duration: 200, start: 301, id: 4 },
          { duration: 100, start: 501, id: 5 },
        ]}
      />
    </div>
  );
};

export default Editor;
