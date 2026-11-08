/*
  Video frames for tutorials. Every frame is empty until a video is connected: pass `src` (any YouTube link, or another
  iframe URL) and the frame becomes a button that loads the player when tapped. Until then it shows the title, the
  planned length and "Video coming soon", drawn with CSS and one small SVG: nothing is downloaded, which matters on a
  phone in Niamey or Kano.

  <VideoSlot title="Your first call" duration="4 min" />
  <VideoSlot title="Your first call" duration="4 min" src="https://youtu.be/VIDEO_ID" />   (any YouTube link)
  <VideoCard title="…" duration="…" href="/tutorials/first-call" level="Beginner" />
*/

// A fixed waveform (not random, so the server and the browser draw the same bars).
const BARS = [6, 10, 16, 9, 22, 30, 18, 26, 38, 24, 14, 28, 44, 32, 20, 36, 26, 12, 30, 40, 22, 16, 28, 18, 10, 24, 14, 8];

export const Waveform = ({ height = 44, color = "currentColor", opacity = 0.32 }) => (
  <svg
    viewBox={`0 0 ${BARS.length * 6} 48`}
    height={height}
    aria-hidden="true"
    style={{ display: "block", color, opacity }}
  >
    {BARS.map((h, i) => (
      <rect key={i} x={i * 6 + 1} y={(48 - h) / 2} width="3" height={h} rx="1.5" fill="currentColor" />
    ))}
  </svg>
);

const PlayMark = ({ size = 56 }) => (
  <span
    aria-hidden="true"
    style={{
      width: size,
      height: size,
      borderRadius: "999px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#1C1410",
      color: "#FFFAF1",
      flex: "none",
    }}
  >
    <svg width={size * 0.36} height={size * 0.36} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  </span>
);

/* A YouTube watch or share link becomes a privacy-friendly embed (youtube-nocookie), with autoplay once tapped. */
const embedUrl = (src) => {
  const m = String(src).match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0`;
  return src;
};

export const VideoSlot = ({ title, duration, src, caption }) => {
  // The player loads only when someone taps it: a YouTube embed is close to a megabyte before anything plays.
  const [open, setOpen] = useState(false);
  if (src && open) {
    return (
      <figure className="namu-video not-prose" style={{ margin: "1.5rem 0" }}>
        <iframe
          className="w-full aspect-video rounded-2xl"
          src={embedUrl(src)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        {caption && <figcaption className="namu-video-caption">{caption}</figcaption>}
      </figure>
    );
  }
  const ready = Boolean(src);
  const Frame = ready ? "button" : "div";
  return (
    <figure className="namu-video not-prose" style={{ margin: "1.5rem 0" }}>
      <Frame
        type={ready ? "button" : undefined}
        onClick={ready ? () => setOpen(true) : undefined}
        className={`namu-video-frame${ready ? " is-ready" : ""}`}
        role={ready ? undefined : "img"}
        aria-label={ready ? `Play video: ${title}` : `${title}: video coming soon`}
      >
        <span className="namu-video-top">
          <span className="namu-video-pill">{ready ? "Watch" : "Video coming soon"}</span>
          {duration && <span className="namu-video-duration">{duration}</span>}
        </span>
        <span className="namu-video-middle">
          <PlayMark />
          <Waveform />
        </span>
        <span className="namu-video-title">{title}</span>
      </Frame>
      {caption && <figcaption className="namu-video-caption">{caption}</figcaption>}
    </figure>
  );
};

export const VideoCard = ({ title, duration, href, level, children }) => (
  <a href={href} className="namu-video-card not-prose">
    <div className="namu-video-thumb" aria-hidden="true">
      <PlayMark size={40} />
      <Waveform height={30} />
      {duration && <span className="namu-video-duration namu-video-duration--thumb">{duration}</span>}
    </div>
    <div className="namu-video-card-body">
      {level && <span className="namu-video-level">{level}</span>}
      <span className="namu-video-card-title">{title}</span>
      {children && <span className="namu-video-card-text">{children}</span>}
    </div>
  </a>
);
