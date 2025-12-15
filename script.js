console.log("CPET 12.0 — TFPS ENGINE LOADED");

// ===============================
// 1. WCZYTYWANIE KORPUSU
// ===============================

let CORPUS = [];

async function loadCorpus() {
    try {
        const r = await fetch("corpus.txt");
        const text = await r.text();
        CORPUS = autosplit(text);
        console.log("Załadowano korpus:", CORPUS.length, "linii");
    } catch (e) {
        console.error("Błąd ładowania korpusu:", e);
    }
}

loadCorpus();

// ===============================
// 2. AUTOSPLIT — czyszczenie tekstu
// ===============================

function autosplit(raw) {
    const clean = raw.replace(/\s+/g, " ").trim();
    const parts = clean.split(/(?<=[.?!])\s+/);

    let out = [];
    for (let p of parts) {
        p = p.trim();
        if (p.length > 5) out.push(p);
    }
    return out;
}

// ===============================
// 3. NORMALIZACJA
// ===============================

function normalize(t) {
    const map = { "ą":"a","ć":"c","ę":"e","ł":"l","ń":"n","ó":"o","ś":"s","ż":"z","ź":"z" };
    t = t.toLowerCase();
    for (let k in map) t = t.replaceAll(k, map[k]);
    return t.replace(/[^a-z0-9 ]/g, "").trim();
}

// ===============================
// 4. SZUKANIE NAJLEPSZEJ LINII
// ===============================

function bestLineFor(word) {
    let best = null;
    let bestPos = 999999;

    const key = normalize(word);

    for (let line of CORPUS) {
        const nline = normalize(line);
        const pos = nline.indexOf(key);
        if (pos !== -1 && pos < bestPos) {
            bestPos = pos;
            best = line;
        }
    }
    return best;
}

// ===============================
// 5. SKRÓT DO 2 ZDAŃ
// ===============================

function trimTwo(text) {
    let parts = text.split(".");
    parts = parts.map(s => s.trim()).filter(s => s);
    if (parts.length >= 2) return parts[0] + ". " + parts[1] + ".";
    return parts[0] + ".";
}

// ===============================
// 6. GŁÓWNY SILNIK AI
// ===============================

function answer(msg) {
    if (!msg.trim()) return "Powiedz coś więcej 🙂";

    const words = msg.trim().split(" ");
    const key = words[words.length - 1];

    const line = bestLineFor(key);
    if (!line) return "Interesujące. Rozwiń proszę swój wątek — możemy wejść głębiej w temat.";

    return trimTwo(line);
}

// ===============================
// 7. SYSTEM WIADOMOŚCI
// ===============================

function addMessage(author, text) {
    const chat = document.getElementById("chat");

    const div = document.createElement("div");
    div.className = author === "Ty" ? "msg-user" : "msg-ai";
    div.textContent = text;

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// ===============================
// 8. OBSŁUGA WYŚLIJ
// ===============================

document.getElementById("sendBtn").addEventListener("click", sendMsg);
document.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMsg();
});

function sendMsg() {
    const input = document.getElementById("userInput");
    const msg = input.value.trim();

    if (!msg) return;

    addMessage("Ty", msg);
    input.value = "";

    const ai = answer(msg);
    setTimeout(() => addMessage("AI", ai), 200);
}
