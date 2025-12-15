// ===============================================
// TFPS-23 JS — Koniszewski Model (wersja browser)
// Ładowanie dużego korpusu z corpus.txt
// ===============================================

let RAW_CORPUS = "";
let CORPUS = [];

// === Normalizacja tekstu ========================
function normalize(t) {
    t = t.toLowerCase();
    const repl = {
        "ą":"a","ć":"c","ę":"e","ł":"l","ń":"n",
        "ó":"o","ś":"s","ż":"z","ź":"z"
    };
    for (const a in repl) t = t.replaceAll(a, repl[a]);
    return t.replace(/[^a-z0-9 ]/g, " ").trim();
}

// === Dzielenie na zdania (bez usuwania treści!) ===
function autosplit(raw) {
    let clean = raw.replace(/\s+/g, " ").trim();
    let parts = clean.split(/(?<=[.?!])\s+/);

    let out = [];
    for (let p of parts) {
        p = p.trim();
        if (p.length < 5) continue;
        if (!/[.?!]$/.test(p)) p += ".";
        out.push(p);
    }
    return out;
}

// === Szukanie najlepszego zdania ==================
function bestLineFor(word) {
    const nword = normalize(word);
    let best = null;
    let bestPos = 999999999;

    for (const line of CORPUS) {
        const nline = normalize(line);
        const pos = nline.indexOf(nword);
        if (pos !== -1 && pos < bestPos) {
            bestPos = pos;
            best = line;
        }
    }

    return best;
}

// === Przycięcie do dwóch zdań =====================
function trimTwo(text) {
    const parts = text.split(".");
    const good = parts.filter(x => x.trim().length > 0);
    if (good.length >= 2)
        return good[0].trim() + ". " + good[1].trim() + ".";
    return good[0].trim() + ".";
}

// === Główna funkcja odpowiedzi =====================
function generateResponse(userText) {
    const norm = normalize(userText);
    if (!norm) return "Napisz coś więcej 🙂";

    const key = norm.split(" ").pop();
    const line = bestLineFor(key);

    if (!line)
        return `Nie mam jeszcze informacji o słowie: "${key}".`;

    return trimTwo(line);
}

// === Ładowanie korpusu z pliku =====================

console.log("TFPS-23 JS — ładowanie corpus.txt...");

fetch("corpus.txt")
    .then(r => r.text())
    .then(text => {
        RAW_CORPUS = text;
        CORPUS = autosplit(text);

        console.log("Model gotowy.");
        console.log("Załadowano:", CORPUS.length, "zdań.");
    })
    .catch(err => console.error("Błąd ładowania corpus.txt:", err));

// === Interfejs HTML =================================

function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");

    const reply = generateResponse(text);
    addMessage(reply, "ai");

    input.value = "";
}

function addMessage(text, who) {
    const chat = document.getElementById("chat");
    const div = document.createElement("div");
    div.className = who === "user" ? "userMsg" : "aiMsg";
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sendBtn").onclick = sendMessage;
    document.getElementById("userInput").addEventListener("keydown", e => {
        if (e.key === "Enter") sendMessage();
    });
});
