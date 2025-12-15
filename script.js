// ============================================================
// CPET 13.0 — Real Thinking AI (JS Version)
// Ładowanie ogromnego korpusu + inteligentne zdania
// ============================================================

console.log("CPET 13.0 — uruchomiony");

// ======== 1. Wczytanie korpusu z pliku =======================

let CORPUS = [];

async function loadCorpus() {
    try {
        const res = await fetch("corpus.txt");
        const text = await res.text();
        CORPUS = splitCorpus(text);
        console.log("Załadowano linijek:", CORPUS.length);
    } catch (e) {
        console.error("Błąd ładowania korpusu:", e);
    }
}

// ======== 2. Normalizacja tekstu ============================

function normalize(t) {
    return t
        .toLowerCase()
        .replace(/[ąćęłńóśżź]/g, c => (
            { "ą": "a", "ć": "c", "ę": "e", "ł": "l", "ń": "n", "ó": "o", "ś": "s", "ż": "z", "ź": "z" }[c]
        ))
        .replace(/[^a-z0-9 ]/g, " ")
        .trim();
}

// ======== 3. Split korpusu na linie ========================

function splitCorpus(raw) {
    return raw.split(/\n+/).map(x => x.trim()).filter(x => x.length > 5);
}

// ======== 4. Inteligentny podział zdań =======================
// ignoruje skróty typu: ang., np., itp., m.in., itd.

const ABBREV = [
    "ang", "np", "itp", "tj", "tzn", "m.in", "al", "dr", "hab",
    "prof", "rys", "fr", "niem", "łac", "wł", "zob", "źródło"
];

function splitSentences(text) {
    const parts = text.split(/(?<=\.)/);
    const result = [];
    let buffer = "";

    for (let p of parts) {
        buffer += p.trim();
        let last = buffer.split(/\s+/).slice(-1)[0].replace(".", "");
        if (buffer.endsWith(".") && !ABBREV.includes(last.toLowerCase())) {
            result.push(buffer.trim());
            buffer = "";
        }
    }

    if (buffer.length > 0) result.push(buffer.trim());

    return result;
}

// ======== 5. Szukanie najlepszego zdania ======================

function findBestLine(msg) {
    let key = normalize(msg).split(" ").pop();
    let best = null;
    let bestPos = 999999;

    for (let line of CORPUS) {
        let norm = normalize(line);
        let pos = norm.indexOf(key);
        if (pos !== -1 && pos < bestPos) {
            best = line;
            bestPos = pos;
        }
    }
    return best;
}

// ======== 6. Generator odpowiedzi GPT-style ==================

function generateResponse(msg) {
    const line = findBestLine(msg);

    if (!line)
        return "Interesujące pytanie. Możesz powiedzieć więcej, co masz na myśli?";

    const sentences = splitSentences(line);

    if (sentences.length >= 2)
        return sentences[0] + " " + sentences[1];

    return sentences[0];
}

// ======== 7. Interfejs — obsługa czatu =======================

const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chat");

function addMessage(text, sender) {
    const box = document.createElement("div");
    box.className = sender;
    box.textContent = text;
    chatBox.appendChild(box);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleSend() {
    const msg = input.value.trim();
    if (!msg) return;

    addMessage(msg, "me");
    input.value = "";

    setTimeout(() => {
        const reply = generateResponse(msg);
        addMessage(reply, "ai");
    }, 100);
}

sendBtn.addEventListener("click", handleSend);
input.addEventListener("keydown", e => {
    if (e.key === "Enter") handleSend();
});

// ======== 8. Start systemu ==================================

loadCorpus();
