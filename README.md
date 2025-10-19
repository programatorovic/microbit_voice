# Retro Voice Extension for micro:bit

This MakeCode extension adds two blocks:

## Blocks
- `voice.say(text, tuning, pitchOffset, speed, preset, language)`
- `syllable.say(text, pitchArray, tuning, speed, preset, language)`

## Parameters
- `text`: string or variable
- `tuning`: base pitch (e.g. 64)
- `pitchOffset`: +/- semitone offset per syllable (Voice block)
- `pitchArray`: array of pitch offsets (Syllable block)
- `speed`: speech speed (0–255)
- `preset`: voice preset (0–3)
- `language`: "EN" or "SK"
