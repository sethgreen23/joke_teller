"use strict";
// https://v2.jokeapi.dev/joke/Programming?type=single
const btn = document.getElementById("btn");
const context = new AudioContext();
btn.addEventListener("click", function (event) {
  speachApiHardWay();
});

async function speachApi() {
  try {
    const response = await axios.get(
      "https://v2.jokeapi.dev/joke/Programming?type=single"
    );
    console.log(response.data.joke);
    console.log(response.data);
    // await textToSpeach(response.data.joke);
    //best altirnative
    VoiceRSS.speech({
      key: "fa65e3420b1340659cb2e73ad8c8fe80",
      src: response.data.joke,
      hl: "en-us",
      v: "Linda",
      r: 0,
      c: "mp3",
      f: "44khz_16bit_stereo",
      ssml: false,
    });
  } catch (error) {
    console.log(error);
  }
}

// it is hard to implements
async function speachApiHardWay() {
  try {
    const response = await axios.get(
      "https://v2.jokeapi.dev/joke/Programming?type=single"
    );
    console.log(response.data.joke);
    console.log(response.data);
    await textToSpeach(response.data.joke);
  } catch (error) {
    console.log(error);
  }
}

async function textToSpeach(joke) {
  console.log(joke);
  const encodedParams = new URLSearchParams();
  encodedParams.set("f", "44khz_16bit_stereo");
  encodedParams.set("c", "mp3");
  encodedParams.set("r", "0");
  encodedParams.set("v", "Linda");
  encodedParams.set("hl", "en-us");
  encodedParams.set("src", joke);
  encodedParams.set("b64", true);
  encodedParams.set("ssml", false);

  const options = {
    method: "POST",
    url: "https://voicerss-text-to-speech.p.rapidapi.com/",
    params: { key: "<required>" },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "<rapidApi key>",
      "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    console.log(response);
    console.log(response.data);
    const audioBox = document.getElementById("audioBox");
    const audioSource = document.getElementById("audioSource");
    audioSource.src = response.data;
    audioBox.load();
    audioBox.play();
  } catch (error) {
    console.error(error);
  }
}
