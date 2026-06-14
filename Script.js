const output = document.getElementById("output");

// 🎤 Voice recognition
function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = function () {
        output.innerHTML = "Listening...";
    };

    recognition.onresult = function (event) {
        let command = event.results[0][0].transcript.toLowerCase();
        output.innerHTML = "You said: " + command;

        respond(command);
    };

    recognition.start();
}

// 🤖 Jarvis Brain
function respond(command) {

    if (command.includes("youtube")) {
        window.open("https://youtube.com");
        speak("Opening YouTube");

    } else if (command.includes("google")) {
        window.open("https://google.com");
        speak("Opening Google");

    } else if (command.includes("time")) {
        let time = new Date().toLocaleTimeString();
        speak("Current time is " + time);

    } else if (command.includes("hello")) {
        speak("Hello sir, I am Jarvis");

    } else {
        speak("Searching on Google");
        window.open(`https://www.google.com/search?q=${command}`);
    }
}

// 🔊 Text to speech
function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
}
