import TimelineCursor from "./timeline-cursor";
import { TimelineAudioItem, TimelineVideoItem } from "./timleine-item";

export class VideoTimeline {
  readonly cursor: TimelineCursor;

  readonly fragments: {
    video: TimelineVideoItem[];
    audio1: TimelineAudioItem[];
    audio2: TimelineAudioItem[];
  } = { audio1: [], audio2: [], video: [] };

  constructor(private readonly videoUrl: string, initialCursorPosition = 0) {
    this.cursor = new TimelineCursor(initialCursorPosition);
  }

  split() {
    const whereToSplit = this.cursor.getPosition();

    this.fragments.video
      .map((item) =>
        item.start < whereToSplit && item.end > whereToSplit
          ? [
              new TimelineVideoItem(item.start, whereToSplit),
              new TimelineVideoItem(whereToSplit, item.end),
            ]
          : item
      )
      .flat();

    this.fragments.audio1
      .map((item) =>
        item.start < whereToSplit && item.end > whereToSplit
          ? [
              new TimelineAudioItem(item.start, whereToSplit),
              new TimelineAudioItem(whereToSplit, item.end),
            ]
          : item
      )
      .flat();

    this.fragments.audio2
      .map((item) =>
        item.start < whereToSplit && item.end > whereToSplit
          ? [
              new TimelineAudioItem(item.start, whereToSplit),
              new TimelineAudioItem(whereToSplit, item.end),
            ]
          : item
      )
      .flat();
  }

  public getState() {
    return {
      fragments: this.fragments,
    };
  }
}
