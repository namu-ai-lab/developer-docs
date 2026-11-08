# developer-docs: the public Namu API docs

Agent map, not a manual. Truth order: the Namu API's behaviour (the gateway code) > `api-reference/openapi.yaml` > these pages.

## What this repository is
A public Mintlify site for the Namu API (speech recognition, speech synthesis, translation, voice agent; Hausa, Zarma,
French). Tabs: Documentation, API reference (generated from `api-reference/openapi.yaml`), SDKs, Tutorials, Resources.
Every push to `main` deploys. Internal knowledge lives in the private hub (`namu-ai-lab/namu-docs`), reachable through
the namu MCP server (namu-core plugin): use `team_context("web")` or `("cloud")` and `api_catalog` before changing facts.

## Commands
- Preview: `npm i -g mint && mint dev` (Node 20 or 22)
- Check: `mint broken-links` and `mint validate`

## Rules
- Public copy: run the namu MCP tool `check_copy` (or `copy_check.py` from namu-core) on every page you change. No
  invented numbers, no unproven firsts, no unbuilt features, no em dashes.
- Every API fact must match the gateway; change `api-reference/openapi.yaml`, the page and `resources/changelog.mdx` together.
- The libraries are `namu-ai` on PyPI and npm (`namu-ai-lab/namu-sdks`); keep `sdks/python.mdx` and `sdks/javascript.mdx` in step with them.
- Video frames (`snippets/video.jsx` `VideoSlot`) stay empty until a real video link exists; the README lists them.
- Name the third party where data goes: translation and the voice agent's replies use Google Gemini through OpenRouter.
- Hausa and Zarma examples are marked for native review.
