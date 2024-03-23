"use client";

import { Timeline } from "@wr/ui";
import VideoView from "./VideoView";

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
