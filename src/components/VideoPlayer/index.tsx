type VideoPlayerProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
};

export function VideoPlayer({ src, ...rest }: VideoPlayerProps) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      controls
      preload="metadata"
      poster="/poster.jpg"
      {...rest}
      src={src}
    />
  );
}
