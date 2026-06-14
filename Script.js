let screen = document.getElementById("screen");

// Voice speak
function speak(text) {
  let speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
}

// Start Jarvis
function startJarvis() {
  speak("JARVIS online. All systems functional.");
  listen();
}

// Voice recognition
function listen() {
  let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = async function(event) {
    let command = event.results[0][0].transcript.toLowerCase();
    screen.innerText = command;

    // BASIC SYSTEM COMMANDS
    if (command.includes("hello")) {
      speak("Hello sir. How can I assist you?");
    }

    else if (command.includes("time")) {
      speak("Current time is " + new Date().toLocaleTimeString());
    }

    else if (command.includes("date")) {
      speak("Today is " + new Date().toDateString());
    }

    else if (command.includes("open youtube")) {
      speak("Opening YouTube");
      window.open("https://youtube.com");
    }

    else if (command.includes("google")) {
      speak("Opening Google");
      window.open("https://google.com");
    }

    else {
      // 🔥 AI BRAIN (ChatGPT API)
      let reply = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_API_KEY"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: command }]
        })
      });

      let data = await reply.json();
      let text = data.choices[0].message.content;

      screen.innerText = text;
      speak(text);
    }

    listen(); // continuous listening
  };
}
