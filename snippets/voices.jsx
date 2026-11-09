/*
  The voices the API serves (GET /v1/voices), each with a real recording made through the API and its outline (40
  peaks, the same numbers the Lab site's voice picker draws). Audio is fetched only when someone presses play
  (preload="none"): a page of voices costs nothing on a weak connection until it is used.
*/

const SITE = "https://www.namuai-lab.com";

export const VOICES = [
  {
    id: "nadia",
    name: "Nadia",
    languages: ["ha"],
    description: "Warm and patient. Female, Hausa.",
    description_fr: "Chaleureuse et patiente. Voix féminine, haoussa.",
    alias: "warm",
    sample: {
      lang: "ha",
      src: `${SITE}/converse/nadia/hello.m4a`,
      outline: [3, 87, 47, 96, 100, 32, 59, 99, 83, 63, 55, 14, 0, 36, 89, 85, 89, 90, 60, 84, 76, 67, 56, 80, 31, 44, 0, 0, 48, 82, 89, 87, 77, 71, 55, 34, 60, 24, 3, 0],
    },
  },
  {
    id: "mouhamad",
    name: "Mouhamad",
    languages: ["dje", "ha"],
    description: "Male. Zarma first, and Hausa.",
    description_fr: "Voix masculine. Zarma d’abord, et haoussa.",
    sample: {
      lang: "dje",
      src: `${SITE}/voices/mouhamad/dje.m4a`,
      outline: [99, 100, 73, 74, 65, 11, 2, 1, 10, 66, 66, 52, 51, 41, 44, 37, 23, 16, 60, 58, 47, 36, 46, 27, 47, 72, 77, 64, 5, 1, 1, 42, 65, 72, 62, 57, 49, 38, 29, 1],
    },
  },
  {
    id: "fr",
    name: "Français",
    languages: ["fr"],
    description: "The French reference voice.",
    description_fr: "La voix de référence en français.",
    sample: {
      lang: "fr",
      src: `${SITE}/usecases/translation-fr-story.m4a`,
      outline: [0, 0, 9, 0, 0, 10, 73, 48, 29, 27, 43, 42, 10, 60, 93, 66, 70, 42, 54, 75, 68, 25, 23, 45, 49, 29, 73, 70, 17, 60, 61, 95, 100, 39, 63, 46, 34, 25, 1, 0],
    },
  },
];

const LANGS = {
  en: { ha: "Hausa", dje: "Zarma", fr: "French", play: "Play", pause: "Pause" },
  fr: { ha: "Haoussa", dje: "Zarma", fr: "Français", play: "Écouter", pause: "Pause" },
};

export const VoiceCard = ({ voice, lang = "en" }) => {
  const LANG = LANGS[lang] || LANGS.en;
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) { a.play().catch(() => setPlaying(false)); } else { a.pause(); }
  };
  const bars = voice.sample.outline;
  return (
    <div className="namu-voice not-prose">
      <div className="namu-voice-head">
        <button
          type="button"
          className="namu-voice-play"
          onClick={toggle}
          aria-label={`${playing ? LANG.pause : LANG.play} ${voice.name} (${LANG[voice.sample.lang]})`}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
          )}
        </button>
        <div className="namu-voice-meta">
          <span className="namu-voice-name">{voice.name}</span>
          <code className="namu-voice-id">{voice.id}</code>
        </div>
      </div>
      <svg className="namu-voice-wave" viewBox={`0 0 ${bars.length * 5} 40`} preserveAspectRatio="none" aria-hidden="true">
        {bars.map((p, i) => {
          const h = Math.max(2, (p / 100) * 36);
          const done = i / bars.length < progress;
          return <rect key={i} x={i * 5 + 1} y={(40 - h) / 2} width="3" height={h} rx="1.5" className={done ? "is-done" : ""} />;
        })}
      </svg>
      <p className="namu-voice-text">{lang === "fr" && voice.description_fr ? voice.description_fr : voice.description}</p>
      <div className="namu-voice-langs">
        {voice.languages.map((l) => (
          <span key={l} className="namu-chip">{LANG[l]} <code>{l}</code></span>
        ))}
        {voice.alias && <span className="namu-chip namu-chip--quiet">alias <code>{voice.alias}</code></span>}
      </div>
      <audio
        ref={audio}
        src={voice.sample.src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setProgress(0); }}
        onTimeUpdate={(e) => { const a = e.currentTarget; if (a.duration) setProgress(a.currentTime / a.duration); }}
      />
    </div>
  );
};

export const VoiceGallery = ({ lang = "en" }) => (
  <div className="namu-voice-grid not-prose">
    {VOICES.map((v) => <VoiceCard key={v.id} voice={v} lang={lang} />)}
  </div>
);
