# Dota AI Shorts Editor V1

A runnable Windows desktop prototype that turns a manually captured 60–120 second Dota 2 MP4 into an AI-selected 1080×1920 Short. It preprocesses locally, transcribes speech, samples low-resolution frames, measures motion/audio intensity, asks a multimodal AI Director for a validated edit plan, and renders locally with FFmpeg.

## Install and run (Windows)

1. Install the current **Node.js 20 LTS or newer** from nodejs.org. Open a new PowerShell and verify `node --version` and `npm --version`.
2. Open PowerShell in this repository and run `npm install`. FFmpeg and FFprobe are installed by npm; do not install them separately.
3. Create an OpenAI API key in the API dashboard and ensure the API project has billing/credits. A ChatGPT subscription by itself does not provide API credits.
4. For one PowerShell session, run `$env:OPENAI_API_KEY="sk-..."`. To persist it for future terminals, run `[Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "sk-...", "User")`, close PowerShell, and open a new one. Do not put the key in this repository.
5. Confirm that the new terminal can see it without printing the secret: `if ($env:OPENAI_API_KEY) { "API key configured" } else { "API key missing" }`.
6. Run `npm test`, then launch the desktop application with `npm start`. Keep the PowerShell window open because FFmpeg/API errors are also printed there.
7. Drop the real 90-second `.mp4` onto the large drop zone (or click **Choose video**) and click **Analyze clip**. Leave **AI Director** enabled for multimodal editing. Director OFF is an API-free diagnostic mode when no key is set; it skips transcription and chooses a rough range from local audio only.
8. Review the chosen range, story segments and Director explanation. Click **Render Short**, wait for 100%, inspect the preview, then click **Open Output Folder**.

Analyze extracts metadata/audio, calculates one-second RMS and half-second video activity, transcribes timestamped speech, samples frames at the configured interval, sends at most 36 low-detail frames plus compact timelines/transcript to the Director, and validates its structured plan. The source MP4 is never uploaded wholesale. **AI Director OFF** offers a lower-quality local audio-based fallback.

Click **Render Short** after reviewing the source range and story timeline. The output is written beside the source in `Dota AI Shorts/<original-name>-short.mp4`; **Open Output Folder** opens it. Rendering keeps 16:9 gameplay intact over a dark blurred vertical fill and burns restrained captions below the gameplay center.

## Troubleshooting data to send

Send the exact error dialog text, the complete PowerShell output from `npm start`, `node --version`, Windows version, and input resolution/FPS/duration. Also send `%APPDATA%/dota-ai-shorts-editor/logs/editor.log` and the generated `%TEMP%/dota-short-*\/analysis.json` (remove transcript text if private). Never send the API key. For render failures, include the final FFmpeg error lines. Debug details in the collapsible Director panel include model, request duration, token usage, response ID, log path, decisions, repair/fallback state and validation warnings. Cost is shown as `null` when current model pricing is not configured rather than presenting a misleading estimate.

## Current V1 boundaries

Manual facecam coordinates are persisted as a setting in the backend data model, but facecam-specific reframing is deliberately not applied until a reliable/manual rectangle editor is added. Effects remain conservative; the working render honors selected segments, cut points, speed-ups, story order, transcript timing, vertical layout, and subtitles. API analysis requires internet access and a funded API account.
