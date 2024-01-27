export enum TimelineType {
  video = "video",
  audio = "audio",
  text = "text",
}

export interface FragmentData {
  start: number;
  duration: number;
  thumbnail?: string;
  id: number;
}
