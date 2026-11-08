# Namu API developer docs

The public documentation for the Namu API: speech recognition, speech synthesis, translation and a voice agent for
Hausa, Zarma and French. A [Mintlify](https://mintlify.com) site modelled on the OpenAI API platform docs and the
ElevenLabs developer docs. Every push to `main` deploys the site; every pull request gets a preview link.

The libraries it documents live in [namu-ai-lab/namu-sdks](https://github.com/namu-ai-lab/namu-sdks).

## Preview

The Mintlify CLI needs a Node LTS release (20 or 22; it refuses Node 25).

```bash
npm i -g mint
mint dev            # http://localhost:3000
mint broken-links   # every internal link resolves
mint validate       # the site builds
```

## What is where

| Path | What |
| --- | --- |
| `docs.json` | Navigation (Documentation, API reference, SDKs, Tutorials, Resources), theme, banner, navbar, footer |
| `index.mdx`, `quickstart.mdx`, `models.mdx`, `voices-and-languages.mdx`, `pricing-and-limits.mdx` | Get started |
| `capabilities/` | Text to speech, speech to text, translation, voice agent |
| `guides/` | API keys, audio formats, weak networks, errors, usage and rate limits, production checklist |
| `api-reference/openapi.yaml` | The API in OpenAPI 3.1; Mintlify builds each endpoint page and its "Try it" panel from it |
| `sdks/` | Python and JavaScript libraries (`namu-ai`), any language (HTTP), Android, iOS |
| `tutorials/` | The video gallery and seven tutorials |
| `resources/` | Changelog, help, responsible use, glossary |
| `snippets/video.jsx` | `VideoSlot` (a video frame at the top of a page) and `VideoCard` (a gallery card) |
| `snippets/voices.jsx` | The voice gallery: real recordings from namuai-lab.com, loaded only when played |
| `style.css` | The Namu look on Mintlify's Maple theme: cream paper, warm Ink, a little Kola, DM Sans |

## Connect a video

Every video frame is empty until it gets a link. Add `src` with any YouTube link:

```mdx
<VideoSlot title="Your first call in five minutes" duration="5 min" src="https://youtu.be/VIDEO_ID" />
```

The frame then shows "Watch" and loads the player (youtube-nocookie) only when someone taps it, so a page costs nothing
extra on mobile data until the video is wanted. Update `duration` to the real length. The frames are on:

| Page | Video title |
| --- | --- |
| `quickstart.mdx`, `tutorials/first-call.mdx` | Your first call in five minutes |
| `capabilities/text-to-speech.mdx` | Text to speech in Hausa, Zarma and French |
| `capabilities/speech-to-text.mdx` | Speech to text: from a voice note to text |
| `capabilities/translation.mdx` | Translate between Hausa and French |
| `capabilities/voice-agent.mdx` | Talking with the voice agent |
| `guides/weak-networks.mdx` | Making voice apps work on 2G and 3G |
| `sdks/overview.mdx` | Choosing how to call the Namu API |
| `sdks/python.mdx` | The Namu API from Python |
| `sdks/javascript.mdx` | The Namu API from Node.js |
| `sdks/android.mdx` | Voice in an Android app |
| `sdks/ios.mdx` | Voice in an iPhone app |
| `tutorials/read-aloud-in-hausa.mdx` | Read messages aloud in Hausa |
| `tutorials/transcribe-a-voice-note.mdx` | Transcribe a WhatsApp voice note |
| `tutorials/hausa-french-interpreter.mdx` | Build a Hausa ⇄ French interpreter |
| `tutorials/voice-messages-for-a-clinic.mdx` | Voice reminders for a health centre |
| `tutorials/talk-to-the-voice-agent.mdx` | Talk to the voice agent |
| `tutorials/watch-your-usage.mdx` | Watch your usage |

The cards on `index.mdx` and `tutorials/index.mdx` (`VideoCard`) link to these pages; give them the same durations.

## The libraries

The SDK pages document the official libraries, `namu-ai` on PyPI and npm, whose code lives in
[namu-ai-lab/namu-sdks](https://github.com/namu-ai-lab/namu-sdks). When a library changes its methods or errors, update
`sdks/python.mdx` or `sdks/javascript.mdx` and the changelog.

## Keeping it true

These pages describe the API as Namu's gateway serves it. When the API changes, update `api-reference/openapi.yaml`,
the page that describes the change, and `resources/changelog.mdx`, in the same pull request. Do not publish a number
(accuracy, latency) without the measurement behind it, and keep Hausa and Zarma examples for native review.

Found a mistake? Open an issue or a pull request, or write to contact@namuai.org.
