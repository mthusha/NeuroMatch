let voicesLoaded = false;

export const initializeSpeech = () => {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    console.warn("Speech synthesis not supported");
    return null;
  }
  return window.speechSynthesis;
};

export const getPreferredVoice = () => {
  const speechSynthesis = initializeSpeech();
  if (!speechSynthesis) return null;

  const voices = speechSynthesis.getVoices();
  const preferredVoices = voices.filter(
    (voice) =>
      voice.lang === "en-US" &&
      (voice.name.toLowerCase().includes("female") ||
        voice.name.toLowerCase().includes("samantha") ||
        voice.name.toLowerCase().includes("google us english") ||
        voice.name.toLowerCase().includes("microsoft aria"))
  );

  return preferredVoices[0] || voices[0] || null;
};

export const speakText = (text, onEnd) => {
  const speechSynthesis = initializeSpeech();
  if (!speechSynthesis || !text) return;

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = getPreferredVoice();
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;

  if (onEnd) {
    utterance.onend = onEnd;
  }

  utterance.onerror = (event) => {
    console.error("Speech synthesis error:", event);
  };

  console.log("Speaking with voice:", utterance.voice);
  speechSynthesis.speak(utterance);
  return utterance;
};

export const cancelSpeech = () => {
  const speechSynthesis = initializeSpeech();
  if (speechSynthesis) {
    speechSynthesis.cancel();
  }
};

export const loadVoices = (callback) => {
  const speechSynthesis = initializeSpeech();
  if (!speechSynthesis) return callback([]);

  if (voicesLoaded) {
    return callback(speechSynthesis.getVoices());
  }

  const checkVoices = () => {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      voicesLoaded = true;
      callback(voices);
    } else {
      setTimeout(checkVoices, 100);
    }
  };

  speechSynthesis.onvoiceschanged = checkVoices;
  checkVoices();
};
