// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');
// Creates a client
const client = new speech.SpeechClient();

async function quickstart() {
  // The path to the remote LINEAR16 file
  const filename = 'audio/test.mp3';

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: fs.readFileSync(filename).toString('base64'),
  };
  const config = {
    encoding: 'mp3',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription: ${transcription}`);
}
quickstart();