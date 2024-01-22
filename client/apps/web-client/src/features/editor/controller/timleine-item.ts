export abstract class TimelineItem {
  protected abstract readonly type: "video" | "audio";

  constructor(public start: number, public end: number) {}

  cutStart(newStart: number) {
    this.start = newStart;
  }

  cutEnd(newEnd: number) {
    this.end = newEnd;
  }
}

export class TimelineVideoItem extends TimelineItem {
  protected type: "video" = "video";
}

export class TimelineAudioItem extends TimelineItem {
  protected type: "audio" = "audio";
}
