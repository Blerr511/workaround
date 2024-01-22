export interface VideoViewProps {
  source?: string;
}

const VideoView = ({ source }: VideoViewProps) => {
  return (
    <div>
      <video controls>
        <source src={source} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoView;
