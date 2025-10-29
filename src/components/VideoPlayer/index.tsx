type VideoPlayerProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
  posterSrc: string;
};

export function VideoPlayer({ src, posterSrc, ...rest }: VideoPlayerProps) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      controls
      preload="metadata"
      {...rest}
      src={src}
      poster={posterSrc}
    />
  );
}
