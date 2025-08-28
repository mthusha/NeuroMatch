// src/utils/mouthCuesService.js

export const corresponding = {
  A: "mouthOpen",
  B: "mouthClose",
  C: "mouthSmile",
  D: "mouthFrown",
  E: "mouthWide",
  F: "mouthNarrow",
  G: "mouthO",
  H: "mouthI",
  X: "mouthRest",
};

// Simple mapping from letters to viseme groups
const LETTER_TO_VISEME = {
  a: "A",
  e: "E",
  i: "H",
  o: "G",
  u: "F",
  b: "B",
  p: "B",
  m: "B",
  c: "C",
  d: "D",
  f: "F",
  g: "G",
  h: "H",
  default: "X",
};

export function generateMouthCuesFromText(text) {
  const cues = [];
  let currentTime = 0;
  const durationPerChar = 0.12;

  for (const char of text.toLowerCase()) {
    if (!/[a-zA-Z]/.test(char)) continue;
    const value = LETTER_TO_VISEME[char] || LETTER_TO_VISEME.default;
    cues.push({
      start: currentTime,
      end: currentTime + durationPerChar,
      value,
    });
    currentTime += durationPerChar;
  }

  return cues;
}

